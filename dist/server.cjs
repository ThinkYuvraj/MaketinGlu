"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
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
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';
function readCredentialEnv(name, fallback) {
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
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// 3. Custom error handler for JSON body parse errors
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
function maskEmail(email) {
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
const loginAttempts = new Map();
function getRateLimitInfo(ip) {
    const now = Date.now();
    const record = loginAttempts.get(ip);
    if (!record)
        return { blocked: false, remaining: LOGIN_MAX_ATTEMPTS };
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
    }
    else {
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
// In-memory active session tokens map (token -> { email, expiresAt })
const activeSessions = new Map();
// Generate secure random session token
function generateToken() {
    return crypto_1.default.randomBytes(32).toString('hex');
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
    // Renew token for 24 hours of activity
    session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    req.adminUser = session;
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
    const clientIp = (forwardedIp || '').split(',')[0].trim() ||
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
    }
    else if (newPassword) {
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
// Receiver Email: thinkyuvraj@gmail.com
// ==========================================
const INQUIRY_RECEIVER_EMAIL = readCredentialEnv('INQUIRY_EMAIL', 'thinkyuvraj@gmail.com');
const receivedInquiries = [];
async function sendInquiryEmail(inquiry) {
    const host = process.env.SMTP_HOST || '';
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = process.env.SMTP_SECURE === 'true';
    console.log(`[EMAIL DISPATCHER] Preparing lead email for ${INQUIRY_RECEIVER_EMAIL}:`, {
        leadName: inquiry.name,
        leadEmail: inquiry.email,
        leadPhone: inquiry.phone,
        service: inquiry.service,
    });
    if (!host || !user || !pass) {
        console.log(`[EMAIL NOTICE] Real SMTP credentials (SMTP_HOST/SMTP_USER/SMTP_PASS) not set in .env.`);
        console.log(`[EMAIL NOTICE] Inquiry from ${inquiry.name} is captured & routed to Admin Studio dashboard for ${INQUIRY_RECEIVER_EMAIL}.`);
        return false;
    }
    try {
        const transporter = nodemailer_1.default.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        });
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <div style="background-color: #0c1424; padding: 15px 20px; border-radius: 8px 8px 0 0; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; color: #38bdf8;">NEW SERVICE ENQUIRY</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #94a3b8;">Marketing LU Lead Notification</p>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 14px; color: #334155;">A new visitor inquiry has been received on <strong>Marketing LU</strong>:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px;">
            <tr>
              <td style="padding: 10px; background: #f8fafc; font-weight: bold; width: 140px; border-bottom: 1px solid #e2e8f0;">Full Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${inquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f8fafc; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${inquiry.email}">${inquiry.email || 'N/A'}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f8fafc; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${inquiry.phone}">${inquiry.phone || 'N/A'}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f8fafc; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Requested Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0284c7; font-weight: bold;">${inquiry.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f8fafc; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Notes / Goals:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${inquiry.notes || 'None provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f8fafc; font-weight: bold;">Submitted At:</td>
              <td style="padding: 10px;">${inquiry.receivedAt}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 20px; border-radius: 0 0 8px 8px; font-size: 12px; color: #64748b; text-align: center;">
          Recipient: <strong>${INQUIRY_RECEIVER_EMAIL}</strong> | Marketing LU Lead Dispatcher
        </div>
      </div>
    `;
        await transporter.sendMail({
            from: `"Marketing LU Leads" <${user}>`,
            to: INQUIRY_RECEIVER_EMAIL,
            replyTo: inquiry.email || undefined,
            subject: `🔥 New Lead: ${inquiry.name} (${inquiry.service || 'Service Enquiry'})`,
            html: htmlContent,
        });
        console.log(`[EMAIL DISPATCH SUCCESS] Lead email sent to ${INQUIRY_RECEIVER_EMAIL}`);
        return true;
    }
    catch (error) {
        console.error(`[EMAIL DISPATCH ERROR] Failed sending to ${INQUIRY_RECEIVER_EMAIL}:`, error);
        return false;
    }
}
app.post(['/api/inquiry', '/api/contact', '/api/consultation'], (req, res) => {
    const { name, email, phone, service, notes, message } = req.body || {};
    if (!name || (!email && !phone)) {
        return res.status(400).json({
            success: false,
            message: 'Name and either email or phone are required to submit an inquiry.',
        });
    }
    const inquiry = {
        id: crypto_1.default.randomBytes(8).toString('hex'),
        name: String(name).trim(),
        email: String(email || '').trim(),
        phone: String(phone || '').trim(),
        service: String(service || 'General Inquiry').trim(),
        notes: String(notes || message || '').trim(),
        receivedAt: new Date().toISOString(),
        receiverEmail: INQUIRY_RECEIVER_EMAIL,
    };
    receivedInquiries.unshift(inquiry);
    // Keep last 200 in memory
    if (receivedInquiries.length > 200) {
        receivedInquiries.pop();
    }
    console.log(`[INQUIRY RECEIVED] Forwarding to ${INQUIRY_RECEIVER_EMAIL}:`, {
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
        message: `Inquiry successfully received and routed to ${INQUIRY_RECEIVER_EMAIL}. Our team will contact you shortly!`,
        inquiryId: inquiry.id,
        receiverEmail: INQUIRY_RECEIVER_EMAIL,
    });
});
// Admin endpoint to view received inquiries
app.get('/api/admin/inquiries', requireAdminAuth, (_req, res) => {
    res.json({
        success: true,
        count: receivedInquiries.length,
        receiverEmail: INQUIRY_RECEIVER_EMAIL,
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
        const { createServer: createViteServer } = await Promise.resolve().then(() => __importStar(require('vite')));
        const vite = await createViteServer({
            server: { middlewareMode: true, hmr: false },
            appType: 'spa',
        });
        app.use(vite.middlewares);
        app.use('*', async (req, res, next) => {
            const url = req.originalUrl;
            try {
                const indexPath = path_1.default.resolve(process.cwd(), 'index.html');
                if (!fs_1.default.existsSync(indexPath)) {
                    return next();
                }
                let template = fs_1.default.readFileSync(indexPath, 'utf-8');
                template = await vite.transformIndexHtml(url, template);
                res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
            }
            catch (e) {
                vite.ssrFixStacktrace(e);
                next(e);
            }
        });
    }
    else {
        // Production: serve built static files from dist or build
        const candidates = [
            path_1.default.resolve(process.cwd(), 'dist'),
            path_1.default.resolve(process.cwd(), 'build'),
            path_1.default.resolve(process.cwd(), 'public_html'),
        ];
        const staticDir = candidates.find((dir) => fs_1.default.existsSync(dir) && fs_1.default.existsSync(path_1.default.join(dir, 'index.html')));
        if (staticDir) {
            console.log(`Serving static production files from: ${staticDir}`);
            app.use(express_1.default.static(staticDir));
            app.get('*', (_req, res, next) => {
                res.sendFile(path_1.default.join(staticDir, 'index.html'), (err) => {
                    if (err)
                        next(err);
                });
            });
        }
        else {
            console.warn('No production build directory found. Falling back to Vite dev server.');
            const { createServer: createViteServer } = await Promise.resolve().then(() => __importStar(require('vite')));
            const vite = await createViteServer({
                server: { middlewareMode: true, hmr: false },
                appType: 'spa',
            });
            app.use(vite.middlewares);
            app.use('*', async (req, res, next) => {
                const url = req.originalUrl;
                try {
                    const indexPath = path_1.default.resolve(process.cwd(), 'index.html');
                    let template = fs_1.default.readFileSync(indexPath, 'utf-8');
                    template = await vite.transformIndexHtml(url, template);
                    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
                }
                catch (e) {
                    vite.ssrFixStacktrace(e);
                    next(e);
                }
            });
        }
    }
    // ==========================================
    // Global Express Error Handler
    // ==========================================
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
    // ==========================================
    // Resilient Port Listening with Collision Handling
    // ==========================================
    const startPort = PORT;
    const maxAttempts = 10;
    function tryListen(portToTry, attempt = 1) {
        const serverInstance = app.listen(portToTry, '0.0.0.0');
        serverInstance.on('listening', () => {
            console.log('\n======================================================');
            console.log(`🚀 MarketingGlu Server is Online & Ready!`);
            console.log(`➜  Local:    http://localhost:${portToTry}/`);
            console.log(`➜  Network:  http://127.0.0.1:${portToTry}/`);
            console.log(`➜  Admin:    http://localhost:${portToTry}/#/admin`);
            console.log(`➜  Inquiries: Receiver -> ${INQUIRY_RECEIVER_EMAIL}`);
            console.log(`➜  Mode:     ${isDev ? 'Development (Vite Middleware)' : 'Production'}`);
            console.log('======================================================\n');
        });
        serverInstance.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.warn(`[PORT WARNING] Port ${portToTry} is currently in use.`);
                if (attempt < maxAttempts) {
                    const nextPort = portToTry + 1;
                    console.log(`[PORT RETRY] Attempting to bind on fallback port ${nextPort}...`);
                    tryListen(nextPort, attempt + 1);
                }
                else {
                    console.error(`[PORT ERROR] Unable to bind to any port from ${startPort} to ${portToTry}. Please free up the port.`);
                }
            }
            else {
                console.error('[SERVER LISTEN ERROR]', err);
            }
        });
    }
    tryListen(startPort);
}
// Wrap top-level call so async boot failures are logged
// rather than causing an unhandled rejection that kills the process.
startServer().catch((err) => {
    console.error('[FATAL] startServer() failed to boot:', err);
});
