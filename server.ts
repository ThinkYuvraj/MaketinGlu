import express from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isBackendOnly = process.env.BACKEND_ONLY === 'true' || process.argv.includes('--backend-only');
const isProduction = process.env.NODE_ENV === 'production';

function readCredentialEnv(name: string, fallback: string): string {
  const value = process.env[name];
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return isProduction ? '' : fallback;
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow Vite local dev server (port 5173 or custom) to query the backend (port 3000)
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

// Server-side admin credentials state (configured via env or local dev fallbacks)
const adminCredentials = {
  email: readCredentialEnv('ADMIN_EMAIL', 'admin@marketinglu.com').toLowerCase(),
  password: readCredentialEnv('ADMIN_PASSWORD', 'admin123'),
};

function hasConfiguredAdminCredentials(): boolean {
  return Boolean(adminCredentials.email && adminCredentials.password);
}

// In-memory active session tokens map (token -> { email, expiresAt })
const activeSessions = new Map<string, { email: string; expiresAt: number }>();

// Generate secure random session token
function generateToken(): string {
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
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
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

  // Renew token for 24 hours of activity
  session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  (req as unknown as { adminUser: { email: string; expiresAt: number } }).adminUser = session;
  next();
}

// ==========================================
// Admin Authentication API Routes FIRST
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MarketingGlu Admin Backend',
    time: new Date().toISOString(),
    adminAuthConfigured: hasConfiguredAdminCredentials(),
    adminEmailConfigured: Boolean(adminCredentials.email),
    adminPasswordConfigured: Boolean(adminCredentials.password),
  });
});

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
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
  const inputPassword = String(password);

  // Match against configured credentials (or 'admin' alias for convenience)
  const isEmailMatch = inputEmail === targetEmail || inputEmail === 'admin';
  const isPasswordMatch = inputPassword === adminCredentials.password;

  if (!isEmailMatch || !isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid admin credentials. Please verify your email and password.',
    });
  }

  // Create new session token (24h expiry)
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

async function startServer() {
  if (isBackendOnly) {
    console.log(`MarketingGlu API backend running in standalone mode on http://0.0.0.0:${PORT}`);
  } else if (process.env.NODE_ENV !== 'production' && !process.env.SERVE_DIST) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MarketingGlu backend server running on http://0.0.0.0:${PORT}`);
    if (!hasConfiguredAdminCredentials()) {
      console.warn('Admin login is disabled until ADMIN_EMAIL and ADMIN_PASSWORD are configured.');
    }
  });
}

startServer();
