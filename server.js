import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// ==========================================
// Process-level crash guards
// Prevents the Node.js process from dying silently on
// unhandled errors, which would cause all requests to
// return 5XX until the host restarts the app.
// ==========================================
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION] Server will NOT exit:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION] Reason:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

function readCredentialEnv(name, fallback) {
  const value = process.env[name];
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return isProduction ? '' : fallback;
}

// 1. Security HTTP Headers
// Applied to every response to harden against common web attacks.
app.use((req, res, next) => {
  // Prevent clickjacking — blocks your admin being loaded inside an iframe
  res.setHeader('X-Frame-Options', 'DENY');
  // Prevent MIME-type sniffing attacks
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Enable browser XSS filter (legacy but still useful)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Don't send full Referer header to third parties
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Basic Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com;"
  );
  next();
});

// 2. Enable CORS for all origins & methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// 2. Body parsers with generous limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Custom error handler for malformed request bodies
app.use((err, req, res, next) => {
  if (err) {
    console.error('Request parsing error:', err.message || err);
    return res.status(400).json({ success: false, message: 'Malformed request body' });
  }
  next();
});

// Server-side admin credentials state (configured via env or local dev fallbacks)
const adminCredentials = {
  email: readCredentialEnv('ADMIN_EMAIL', 'admin@marketinglu.com').toLowerCase(),
  password: readCredentialEnv('ADMIN_PASSWORD', 'admin123'),
};

function hasConfiguredAdminCredentials() {
  return Boolean(adminCredentials.email && adminCredentials.password);
}

// ==========================================
// Brute-Force Rate Limiter for Admin Login
// Tracks failed attempts per IP address.
// After 5 failures in 15 minutes, the IP is blocked
// and receives 429 Too Many Requests.
// ==========================================
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/** @type {Map<string, { count: number; firstAttempt: number; blockedUntil: number }>} */
const loginAttempts = new Map();

function getRateLimitInfo(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return { blocked: false, remaining: LOGIN_MAX_ATTEMPTS };

  // Reset window if it has expired
  if (now - record.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.delete(ip);
    return { blocked: false, remaining: LOGIN_MAX_ATTEMPTS };
  }

  if (record.count >= LOGIN_MAX_ATTEMPTS) {
    const retryAfterSec = Math.ceil((record.firstAttempt + LOGIN_WINDOW_MS - now) / 1000);
    return { blocked: true, retryAfterSec };
  }

  return { blocked: false, remaining: LOGIN_MAX_ATTEMPTS - record.count };
}

function recordFailedLoginAttempt(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now - record.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now, blockedUntil: 0 });
  } else {
    record.count += 1;
  }
}

function clearLoginAttempts(ip) {
  loginAttempts.delete(ip);
}

// Purge stale rate limit records every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of loginAttempts.entries()) {
    if (now - record.firstAttempt > LOGIN_WINDOW_MS) {
      loginAttempts.delete(ip);
    }
  }
}, 30 * 60 * 1000);

function maskEmail(email) {
  const [name, domain] = email.split('@');
  if (!name || !domain) {
    return null;
  }

  return `${name[0]}***@${domain}`;
}

// In-memory active session tokens map (token -> { email, expiresAt })
const activeSessions = new Map();

// Generate secure random session token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Cleanup expired sessions every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (session.expiresAt < now) {
      activeSessions.delete(token);
    }
  }
}, 10 * 60 * 1000);

// Helper middleware to authenticate admin requests
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);

  if (!session) {
    return res.status(401).json({ success: false, message: 'Invalid or expired admin session token' });
  }

  if (session.expiresAt < Date.now()) {
    activeSessions.delete(token);
    return res.status(401).json({ success: false, message: 'Admin session expired. Please log in again.' });
  }

  session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  req.adminUser = session;
  next();
}

// ==========================================
// Admin Authentication API Routes
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MarketingGlu Node/Express Server',
    time: new Date().toISOString(),
    adminAuthConfigured: hasConfiguredAdminCredentials(),
    adminEmailConfigured: Boolean(adminCredentials.email),
    adminPasswordConfigured: Boolean(adminCredentials.password),
    adminEmailHint: maskEmail(adminCredentials.email),
    nodeEnv: process.env.NODE_ENV || 'development',
  });
});

// 2. Admin Login (with brute-force protection)
app.post('/api/admin/login', (req, res) => {
  // Determine client IP (respect proxy headers from Hostinger)
  const clientIp =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  // --- Rate limit check ---
  const rateInfo = getRateLimitInfo(clientIp);
  if (rateInfo.blocked) {
    res.setHeader('Retry-After', String(rateInfo.retryAfterSec));
    return res.status(429).json({
      success: false,
      message: `Too many failed login attempts. Please try again in ${Math.ceil(rateInfo.retryAfterSec / 60)} minute(s).`,
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!hasConfiguredAdminCredentials()) {
    return res.status(503).json({
      success: false,
      message: 'Admin credentials are not configured on the server. Set ADMIN_EMAIL and ADMIN_PASSWORD in Hostinger, then restart the Node.js app.',
    });
  }

  const inputEmail = String(email).trim().toLowerCase();
  const targetEmail = adminCredentials.email.trim().toLowerCase();
  const inputPassword = String(password).trim();

  const isEmailMatch = inputEmail === targetEmail || inputEmail === 'admin';
  const isPasswordMatch = inputPassword === adminCredentials.password;

  if (!isEmailMatch || !isPasswordMatch) {
    // Record this failed attempt for rate limiting
    recordFailedLoginAttempt(clientIp);
    const updated = getRateLimitInfo(clientIp);
    const attemptsLeft = updated.blocked ? 0 : updated.remaining;
    return res.status(401).json({
      success: false,
      message: attemptsLeft > 0
        ? `Invalid admin credentials. ${attemptsLeft} attempt(s) remaining before temporary lockout.`
        : 'Too many failed attempts. Your IP has been temporarily blocked for 15 minutes.',
    });
  }

  // Successful login — clear any recorded failures for this IP
  clearLoginAttempts(clientIp);

  const token = generateToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  activeSessions.set(token, { email: adminCredentials.email, expiresAt });

  return res.json({
    success: true,
    token,
    user: {
      email: adminCredentials.email,
      role: 'superadmin',
      name: 'Marketing LU Admin',
    },
    expiresAt,
  });
});

// 3. Verify Admin Session
app.get('/api/admin/verify', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: {
      email: adminCredentials.email,
      role: 'superadmin',
      name: 'Marketing LU Admin',
    },
  });
});

// 4. Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// 5. Update Admin Credentials (Password / Email)
app.post('/api/admin/change-credentials', requireAdminAuth, (req, res) => {
  const { currentPassword, newEmail, newPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ success: false, message: 'Current password is required to make changes' });
  }

  if (currentPassword !== adminCredentials.password) {
    return res.status(403).json({ success: false, message: 'Current password is incorrect' });
  }

  if (newEmail && typeof newEmail === 'string' && newEmail.includes('@')) {
    adminCredentials.email = newEmail.trim().toLowerCase();
  }

  if (newPassword && typeof newPassword === 'string' && newPassword.length >= 6) {
    adminCredentials.password = newPassword;
  } else if (newPassword) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
  }

  res.json({
    success: true,
    message: 'Admin credentials successfully updated on backend server',
    updatedEmail: adminCredentials.email,
  });
});

// 6. Get Current Admin Info
app.get('/api/admin/info', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    email: adminCredentials.email,
    activeSessionsCount: activeSessions.size,
  });
});

// ==========================================
// Vite Middleware / Static serving
// ==========================================

function findStaticDirectory() {
  const candidates = [
    path.join(process.cwd(), 'dist'),
    path.join(process.cwd(), 'build'),
    path.join(process.cwd(), 'public_html'),
    path.join(__dirname, 'dist'),
    path.join(__dirname, 'build'),
    path.join(__dirname, 'public_html'),
    process.cwd(),
    __dirname,
  ];

  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'index.html')) && (fs.existsSync(path.join(dir, 'assets')) || fs.existsSync(path.join(dir, 'public')))) {
      return dir;
    }
  }

  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'index.html'))) {
      return dir;
    }
  }

  return null;
}

async function startServer() {
  const staticDir = findStaticDirectory();

  if (process.env.BACKEND_ONLY === 'true') {
    console.log(`MarketingGlu API backend running in standalone mode on http://0.0.0.0:${PORT}`);
  } else if (process.env.NODE_ENV !== 'production' && !process.env.SERVE_DIST && !staticDir) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch {
      if (staticDir) {
        app.use(express.static(staticDir));
        app.get('*', (req, res, next) => {
          res.sendFile(path.join(staticDir, 'index.html'), (err) => {
            if (err) next(err);
          });
        });
      }
    }
  } else if (staticDir) {
    console.log(`Serving static production files from: ${staticDir}`);
    app.use(express.static(staticDir));
    // SPA fallback: serve index.html for all non-API routes.
    // Use sendFile callback to forward file-not-found errors to
    // the global error handler rather than crashing the request.
    app.get('*', (req, res, next) => {
      res.sendFile(path.join(staticDir, 'index.html'), (err) => {
        if (err) next(err);
      });
    });
  } else {
    console.warn('Neither dist, build, nor public_html contains index.html. Serving status placeholder.');
    app.get('*', (req, res) => {
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Marketing LU - Server Active</title>
          <style>
            body { background: #070b14; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 1rem; }
            .card { background: #0d1527; border: 1px solid #1e293b; border-radius: 12px; padding: 2rem; max-width: 480px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
            h1 { color: #06b6d4; margin-top: 0; font-size: 1.5rem; }
            p { color: #94a3b8; line-height: 1.6; }
            code { background: #1e293b; color: #38bdf8; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Marketing LU Server Active</h1>
            <p>The backend Node.js server is online and running successfully.</p>
            <p>Frontend production assets are loading. Once <code>npm run build</code> completes, the full interface will be live.</p>
            <p><a href="/api/health" style="color:#06b6d4;text-decoration:none;">View Server Health Check &rarr;</a></p>
          </div>
        </body>
        </html>
      `);
    });
  }

  // ==========================================
  // Global Express Error Handler
  // MUST be the last middleware registered.
  // Catches any unhandled error thrown in route handlers
  // and returns a clean 500 JSON response instead of
  // leaving the request hanging (which Googlebot sees as 5XX).
  // ==========================================
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err, req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    console.error(`[SERVER ERROR] ${req.method} ${req.url} → ${status}:`, err.message || err);
    if (!res.headersSent) {
      res.status(status).json({
        success: false,
        message: status === 500 ? 'Internal server error' : err.message,
      });
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MarketingGlu server running on http://0.0.0.0:${PORT}`);
    if (!hasConfiguredAdminCredentials()) {
      console.warn('Admin login is disabled until ADMIN_EMAIL and ADMIN_PASSWORD are configured.');
    }
  });
}

// Wrap top-level call so async boot failures are logged
// rather than causing an unhandled rejection that kills the process.
startServer().catch((err) => {
  console.error('[FATAL] startServer() failed to boot:', err);
});
