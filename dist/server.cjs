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
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isBackendOnly = process.env.BACKEND_ONLY === 'true' || process.argv.includes('--backend-only');
const isProduction = process.env.NODE_ENV === 'production';
function readCredentialEnv(name, fallback) {
    const value = process.env[name];
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }
    return isProduction ? '' : fallback;
}
// 1. Enable CORS first for all origins & methods
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
// Vite Middleware / Static serving
// ==========================================
function findStaticDirectory() {
    const candidates = [
        path_1.default.join(process.cwd(), 'dist'),
        path_1.default.join(process.cwd(), 'build'),
        path_1.default.join(process.cwd(), 'public_html'),
        path_1.default.join(__dirname, 'dist'),
        path_1.default.join(__dirname, 'build'),
        path_1.default.join(__dirname, 'public_html'),
        process.cwd(),
    ];
    for (const dir of candidates) {
        if (fs_1.default.existsSync(path_1.default.join(dir, 'index.html')) && (fs_1.default.existsSync(path_1.default.join(dir, 'assets')) || fs_1.default.existsSync(path_1.default.join(dir, 'public')))) {
            return dir;
        }
    }
    // Fallback to any directory that has index.html
    for (const dir of candidates) {
        if (fs_1.default.existsSync(path_1.default.join(dir, 'index.html'))) {
            return dir;
        }
    }
    return null;
}
async function startServer() {
    const staticDir = findStaticDirectory();
    if (isBackendOnly) {
        console.log(`MarketingGlu API backend running in standalone mode on http://0.0.0.0:${PORT}`);
    }
    else if (process.env.NODE_ENV !== 'production' && !process.env.SERVE_DIST && !staticDir) {
        try {
            const { createServer: createViteServer } = await Promise.resolve().then(() => __importStar(require('vite')));
            const vite = await createViteServer({
                server: { middlewareMode: true },
                appType: 'spa',
            });
            app.use(vite.middlewares);
        }
        catch {
            if (staticDir) {
                app.use(express_1.default.static(staticDir));
                app.get('*', (req, res) => {
                    res.sendFile(path_1.default.join(staticDir, 'index.html'));
                });
            }
        }
    }
    else if (staticDir) {
        console.log(`Serving static production files from: ${staticDir}`);
        app.use(express_1.default.static(staticDir));
        app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(staticDir, 'index.html'));
        });
    }
    else {
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
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`MarketingGlu backend server running on http://0.0.0.0:${PORT}`);
        if (!hasConfiguredAdminCredentials()) {
            console.warn('Admin login is disabled until ADMIN_EMAIL and ADMIN_PASSWORD are configured.');
        }
    });
}
startServer();
