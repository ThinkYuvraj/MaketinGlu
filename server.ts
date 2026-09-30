import express from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import nodemailer from 'nodemailer';

dotenv.config();

// ==========================================
// Process-level crash guards
// Prevents the Node.js process from dying silently on
// unhandled errors, which would cause all requests to
// return 5XX until the host restarts the app.
// ==========================================
process.on('uncaughtException', (err: Error) => {
  console.error('[UNCAUGHT EXCEPTION] Server will NOT exit:', err);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('[UNHANDLED REJECTION] Reason:', reason);
});

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

function readCredentialEnv(name: string, fallback: string): string {
  const value = process.env[name];
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return fallback;
}

// 1. Security HTTP Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// 2. Enable CORS first for all origins & methods
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

// 3. Custom error handler for JSON body parse errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err) {
    console.error('Request parsing error:', err.message || err);
    return res.status(400).json({ success: false, message: 'Malformed request body' });
  }
  next();
});

// Server-side admin credentials state (configured via env or local dev fallbacks)
const adminCredentials = {
  email: readCredentialEnv('ADMIN_EMAIL', 'marketing2glue@gmail.com').toLowerCase(),
  password: readCredentialEnv('ADMIN_PASSWORD', 'Admin@4321'),
};

function hasConfiguredAdminCredentials(): boolean {
  return Boolean(adminCredentials.email && adminCredentials.password);
}

function maskEmail(email: string): string | null {
  const [name, domain] = email.split('@');
  if (!name || !domain) {
    return null;
  }

  return `${name[0]}***@${domain}`;
}

// ==========================================
// Brute-Force Rate Limiter for Admin Login
// Tracks failed attempts per IP address.
// After 5 failures in 15 minutes, the IP is blocked
// and receives 429 Too Many Requests.
// ==========================================
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

interface LoginAttemptRecord {
  count: number;
  firstAttempt: number;
  blockedUntil: number;
}

const loginAttempts = new Map<string, LoginAttemptRecord>();

function getRateLimitInfo(ip: string): { blocked: boolean; remaining?: number; retryAfterSec?: number } {
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

function recordFailedLoginAttempt(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now - record.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now, blockedUntil: 0 });
  } else {
    record.count += 1;
  }
}

function clearLoginAttempts(ip: string): void {
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
    adminEmailHint: maskEmail(adminCredentials.email),
    nodeEnv: process.env.NODE_ENV || 'development',
  });
});

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
  const forwardedHeader = req.headers['x-forwarded-for'];
  const forwardedIp = Array.isArray(forwardedHeader) ? forwardedHeader[0] : forwardedHeader;
  const clientIp =
    (forwardedIp || '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const rateInfo = getRateLimitInfo(clientIp);
  if (rateInfo.blocked && rateInfo.retryAfterSec) {
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
      message: 'Admin credentials are not configured on the server. Set ADMIN_EMAIL and ADMIN_PASSWORD in environment, then restart.',
    });
  }

  const inputEmail = String(email).trim().toLowerCase();
  const targetEmail = adminCredentials.email.trim().toLowerCase();
  const inputPassword = String(password).trim();

  // Match against configured credentials (or 'admin' alias for convenience)
  const isEmailMatch = inputEmail === targetEmail || inputEmail === 'admin';
  const isPasswordMatch = inputPassword === adminCredentials.password;

  if (!isEmailMatch || !isPasswordMatch) {
    recordFailedLoginAttempt(clientIp);
    const updated = getRateLimitInfo(clientIp);
    const attemptsLeft = updated.blocked ? 0 : updated.remaining;
    return res.status(401).json({
      success: false,
      message: typeof attemptsLeft === 'number' && attemptsLeft > 0
        ? `Invalid admin credentials. ${attemptsLeft} attempt(s) remaining before temporary lockout.`
        : 'Too many failed attempts. Your IP has been temporarily blocked for 15 minutes.',
    });
  }

  clearLoginAttempts(clientIp);

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
      name: 'MarketingGlu Admin',
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
      name: 'MarketingGlu Admin',
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
// Customer Inquiries & Leads Handler
// ==========================================
function getInquiryReceiverEmail(): string {
  if (process.env.INQUIRY_EMAIL && process.env.INQUIRY_EMAIL.trim()) {
    return process.env.INQUIRY_EMAIL.trim();
  }
  if (process.env.SMTP_USER && process.env.SMTP_USER.trim()) {
    return process.env.SMTP_USER.trim();
  }
  return 'marketing2glue@gmail.com';
}

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  notes?: string;
  receivedAt: string;
  receiverEmail: string;
}

const receivedInquiries: InquiryRecord[] = [];

async function sendInquiryEmail(inquiry: InquiryRecord): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // Always refresh .env dynamically across multiple potential directories (Hostinger/cPanel support)
  try {
    const candidates = [
      path.resolve(process.cwd(), '.env'),
      path.resolve(__dirname, '.env'),
      path.resolve(__dirname, '..', '.env'),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand)) {
        dotenv.config({ path: cand, override: false });
      }
    }
  } catch (e) {
    // ignore
  }

  const rawHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const rawUser = (process.env.SMTP_USER || '').trim();
  const rawPass = (process.env.SMTP_PASS || '').trim();
  const rawPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const targetReceiver = getInquiryReceiverEmail();

  // Sanitize credentials: strip leading/trailing quotes and internal spaces from app passwords
  const user = rawUser.replace(/^["']|["']$/g, '').trim();
  const pass = rawPass.replace(/^["']|["']$/g, '').replace(/\s+/g, '');
  const host = rawHost.replace(/^["']|["']$/g, '').trim();

  console.log(`[EMAIL DISPATCHER] Preparing lead email for ${targetReceiver}:`, {
    leadName: inquiry.name,
    leadEmail: inquiry.email,
    leadPhone: inquiry.phone,
    service: inquiry.service,
    smtpUser: user,
    smtpHost: host,
    hasPassword: Boolean(pass),
    passLength: pass.length,
  });

  if (!user || !pass) {
    const errorMsg = `SMTP credentials (SMTP_USER/SMTP_PASS) not configured in .env or environment variables.`;
    console.warn(`[EMAIL NOTICE] ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  const fromHeader = inquiry.name 
    ? `"${inquiry.name} (Marketing LU Lead)" <${user}>`
    : `"Marketing LU Service Enquiry" <${user}>`;

  const replyToHeader = inquiry.email 
    ? `"${inquiry.name}" <${inquiry.email}>` 
    : undefined;

  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 540px; margin: 0 auto; background-color: #0c1424; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
      <!-- Header -->
      <div style="padding: 24px; text-align: center; border-bottom: 1px solid #1e293b; background: linear-gradient(180deg, #0f172a 0%, #0c1424 100%);">
        <div style="font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin-bottom: 4px;">
          MARKETING<span style="color: #38bdf8;">LU</span>
        </div>
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #38bdf8; text-transform: uppercase;">
          NEW SERVICE ENQUIRY
        </div>
      </div>

      <!-- Body Content -->
      <div style="padding: 24px;">
        <!-- Customer -->
        <div style="margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Customer</div>
          <div style="font-size: 15px; font-weight: 700; color: #ffffff;">${inquiry.name}</div>
        </div>

        <!-- Email -->
        <div style="margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</div>
          <div style="font-size: 14px; font-weight: 600;">
            <a href="mailto:${inquiry.email}" style="color: #38bdf8; text-decoration: none;">${inquiry.email || 'N/A'}</a>
          </div>
        </div>

        <!-- Phone -->
        <div style="margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Phone</div>
          <div style="font-size: 14px; font-weight: 600;">
            <a href="tel:${inquiry.phone}" style="color: #38bdf8; text-decoration: none;">${inquiry.phone || 'N/A'}</a>
          </div>
        </div>

        <!-- Service -->
        <div style="margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Service</div>
          <div style="font-size: 13px; font-weight: 700; color: #38bdf8; background-color: #0f2b45; padding: 6px 12px; border-radius: 6px; display: inline-block;">${inquiry.service}</div>
        </div>

        <!-- Requirements / Notes -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Requirements</div>
          <div style="font-size: 13px; color: #cbd5e1; background-color: #080d1a; padding: 12px; border-radius: 8px; border: 1px solid #1e293b; line-height: 1.5;">${inquiry.notes || 'None provided'}</div>
        </div>

        <!-- Action Button -->
        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:${inquiry.email}?subject=Re:%20${encodeURIComponent(inquiry.service || 'Service Enquiry')}" style="display: block; width: 100%; padding: 14px 0; background: linear-gradient(90deg, #38bdf8, #0284c7); color: #0c1424; text-decoration: none; border-radius: 10px; font-weight: 900; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; text-align: center; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);">
            [ VIEW ENQUIRY ]
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 14px; text-align: center; background-color: #080d1a; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
        Delivered directly to <strong>${targetReceiver}</strong>
      </div>
    </div>
  `;

  const mailOptions = {
    from: fromHeader,
    to: targetReceiver,
    replyTo: replyToHeader,
    subject: `🔥 New Lead: ${inquiry.name} - ${inquiry.service || 'Service Enquiry'}`,
    html: htmlContent,
  };

  // Hostinger-compatible multi-strategy dispatch:
  // Strategy 1: Direct SSL on port 465 (Forced IPv4)
  // Strategy 2: STARTTLS on port 587 (Forced IPv4)
  // Strategy 3: Standard Gmail service transporter
  const strategies: Array<{
    name: string;
    createTransporter: () => nodemailer.Transporter;
  }> = [
    {
      name: 'Direct SSL Port 465 (IPv4)',
      createTransporter: () =>
        nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user, pass },
          family: 4, // Prevents Hostinger IPv6 connection timeout
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
          tls: { rejectUnauthorized: false },
        }),
    },
    {
      name: 'STARTTLS Port 587 (IPv4)',
      createTransporter: () =>
        nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: { user, pass },
          family: 4,
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
          tls: { rejectUnauthorized: false },
        }),
    },
    {
      name: 'Nodemailer Gmail Service',
      createTransporter: () =>
        nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass },
          connectionTimeout: 10000,
        }),
    },
  ];

  let lastError: any = null;

  for (const strategy of strategies) {
    try {
      console.log(`[EMAIL DISPATCHER] Attempting dispatch via ${strategy.name}...`);
      const transporter = strategy.createTransporter();
      const info = await transporter.sendMail(mailOptions);
      console.log(`[EMAIL DISPATCH SUCCESS] Lead email sent to ${targetReceiver} via ${strategy.name}, Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      lastError = err;
      const msg = err?.message || String(err);
      console.warn(`[EMAIL DISPATCH WARNING] Strategy '${strategy.name}' failed: ${msg}. Trying next strategy...`);
    }
  }

  const finalErrMsg = lastError?.message || String(lastError);
  console.error(`[EMAIL DISPATCH ERROR] All dispatch strategies failed for ${targetReceiver}:`, finalErrMsg);
  return { success: false, error: finalErrMsg };
}

app.post(['/api/inquiry', '/api/enquiry', '/api/contact', '/api/consultation'], (req, res) => {
  const { name, email, phone, service, notes, message } = req.body || {};

  if (!name || (!email && !phone)) {
    return res.status(400).json({
      success: false,
      message: 'Name and either email or phone are required to submit an inquiry.',
    });
  }

  const targetReceiver = getInquiryReceiverEmail();
  const inquiry: InquiryRecord = {
    id: crypto.randomBytes(8).toString('hex'),
    name: String(name).trim(),
    email: String(email || '').trim(),
    phone: String(phone || '').trim(),
    service: String(service || 'General Inquiry').trim(),
    notes: String(notes || message || '').trim(),
    receivedAt: new Date().toISOString(),
    receiverEmail: targetReceiver,
  };

  receivedInquiries.unshift(inquiry);
  // Keep last 200 in memory
  if (receivedInquiries.length > 200) {
    receivedInquiries.pop();
  }

  console.log(`[INQUIRY RECEIVED] Forwarding to ${targetReceiver}:`, {
    from: `${inquiry.name} <${inquiry.email}>`,
    phone: inquiry.phone,
    service: inquiry.service,
    date: inquiry.receivedAt,
  });

  // Trigger email sending asynchronously
  sendInquiryEmail(inquiry).catch(err => {
    console.error('[ASYNC EMAIL ERROR]', err);
  });

  return res.json({
    success: true,
    message: `Inquiry successfully received and routed to ${targetReceiver}. Our team will contact you shortly!`,
    inquiryId: inquiry.id,
    receiverEmail: targetReceiver,
  });
});

// Diagnostic route to test lead email delivery directly
app.all(['/api/inquiry/test-send', '/api/test-email'], async (req, res) => {
  const targetReceiver = getInquiryReceiverEmail();
  const testInquiry: InquiryRecord = {
    id: 'test-' + crypto.randomBytes(4).toString('hex'),
    name: (req.query.name as string) || (req.body?.name as string) || 'Test Diagnostic Client',
    email: (req.query.email as string) || (req.body?.email as string) || targetReceiver,
    phone: '+91 96545 96149',
    service: 'Diagnostic Email Test',
    notes: 'Testing real-time Gmail SMTP dispatch from MarketinGlu server.',
    receivedAt: new Date().toISOString(),
    receiverEmail: targetReceiver,
  };

  const result = await sendInquiryEmail(testInquiry);
  return res.json({
    diagnostic: true,
    result,
    sentTo: targetReceiver,
    smtpUser: process.env.SMTP_USER,
    smtpHost: process.env.SMTP_HOST,
    timestamp: new Date().toISOString(),
  });
});

// Admin endpoint to view received inquiries
app.get('/api/admin/inquiries', requireAdminAuth, (_req, res) => {
  res.json({
    success: true,
    count: receivedInquiries.length,
    receiverEmail: getInquiryReceiverEmail(),
    inquiries: receivedInquiries,
  });
});

// ==========================================
// Vite Middleware / Static serving
// ==========================================

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    console.log('Starting Vite in middleware mode for development...');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        if (!fs.existsSync(indexPath)) {
          return next();
        }
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production: serve built static files from dist, build, public_html, or directory of this script
    const candidates = [
      path.resolve(process.cwd(), 'dist'),
      path.resolve(process.cwd(), 'build'),
      path.resolve(process.cwd(), 'public_html'),
      path.resolve(process.cwd()),
      path.resolve(__dirname),
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, '..'),
      path.resolve(__dirname, '..', 'dist'),
      path.resolve(__dirname, '..', 'public_html'),
    ];

    const staticDir = candidates.find(
      (dir) => fs.existsSync(dir) && fs.existsSync(path.join(dir, 'index.html'))
    );

    if (staticDir) {
      console.log(`Serving static production files from: ${staticDir}`);
      app.use(express.static(staticDir));
      app.get('*', (_req, res, next) => {
        res.sendFile(path.join(staticDir, 'index.html'), (err) => {
          if (err) next(err);
        });
      });
    } else {
      console.warn('[SERVER NOTICE] No static index.html found in candidate paths. API routes remain active.');
      app.get('/', (_req, res) => {
        res.status(200).json({
          status: 'ok',
          service: 'MarketingGlu Production Server',
          inquiryEndpoint: '/api/inquiry',
          testEmailEndpoint: '/api/test-email',
          time: new Date().toISOString(),
        });
      });
    }
  }

  // ==========================================
  // Global Express Error Handler
  // ==========================================
  app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status: number = err.status || err.statusCode || 500;
    console.error(`[SERVER ERROR] ${req.method} ${req.url} → ${status}:`, err.message || err);
    if (!res.headersSent) {
      res.status(status).json({
        success: false,
        message: status === 500 ? 'Internal server error' : err.message,
      });
    }
  });

  // ==========================================
  // Resilient Port Listening with Collision Handling & Passenger Support
  // ==========================================
  const rawPort = process.env.PORT;
  const isPassenger = typeof (global as any).PhusionPassenger !== 'undefined' || rawPort === 'passenger';
  const isSocketOrPipe = typeof rawPort === 'string' && (isNaN(Number(rawPort)) || rawPort.startsWith('/') || rawPort.startsWith('\\\\'));
  const startPort = !isSocketOrPipe && rawPort && !isNaN(Number(rawPort)) ? parseInt(rawPort, 10) : 3000;
  const maxAttempts = 10;

  function tryListen(portToTry: number, attempt = 1) {
    const serverInstance = app.listen(portToTry, '0.0.0.0');

    serverInstance.on('listening', () => {
      console.log('\n======================================================');
      console.log(`🚀 MarketingGlu Server is Online & Ready!`);
      console.log(`➜  Local:    http://localhost:${portToTry}/`);
      console.log(`➜  Network:  http://127.0.0.1:${portToTry}/`);
      console.log(`➜  Admin:    http://localhost:${portToTry}/#/admin`);
      console.log(`➜  Inquiries: Receiver -> ${getInquiryReceiverEmail()}`);
      console.log(`➜  Mode:     ${isDev ? 'Development (Vite Middleware)' : 'Production'}`);
      console.log('======================================================\n');
    });

    serverInstance.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`[PORT WARNING] Port ${portToTry} is currently in use.`);
        if (attempt < maxAttempts) {
          const nextPort = portToTry + 1;
          console.log(`[PORT RETRY] Attempting to bind on fallback port ${nextPort}...`);
          tryListen(nextPort, attempt + 1);
        } else {
          console.error(`[PORT ERROR] Unable to bind to any port from ${startPort} to ${portToTry}.`);
        }
      } else {
        console.error('[SERVER LISTEN ERROR]', err);
      }
    });
  }

  if (isPassenger) {
    app.listen('passenger', () => {
      console.log('🚀 MarketingGlu Server is Online & Ready (Phusion Passenger mode)!');
    });
  } else if (isSocketOrPipe && rawPort) {
    app.listen(rawPort, () => {
      console.log(`🚀 MarketingGlu Server is Online & Ready on socket: ${rawPort}`);
    });
  } else {
    tryListen(startPort);
  }
}

// Wrap top-level call so async boot failures are logged
// rather than causing an unhandled rejection that kills the process.
startServer().catch((err: Error) => {
  console.error('[FATAL] startServer() failed to boot:', err);
});
