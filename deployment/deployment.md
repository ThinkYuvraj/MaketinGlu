# Deployment Guide — MarketingGlu

## Overview

MarketingGlu is a full-stack marketing website with a React frontend, Express API backend, and email inquiry service. It targets **Hostinger/cPanel** shared hosting but also runs on any Node.js environment.

## Deployment Methods

### 1. Hostinger cPanel (Primary Target)

1. Build the project locally or on CI:
   ```bash
   npm run build
   ```
   This produces `dist/` (frontend) and `dist/server.cjs` (self-contained backend).

2. Upload the following to your Hostinger `public_html` directory via FTP/cPanel File Manager:
   - `dist/` contents → `public_html/` (or `build/` — Hostinger auto-detects both)
   - `dist/server.cjs` → `public_html/server.cjs`
   - `.env` → `public_html/.env`
   - `package.json` → `public_html/package.json`

3. In cPanel → **Node.js** app, set the startup file to `server.cjs` and the application root to `public_html`.

4. Set environment variables in cPanel → **Environment Variables**:
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_PORT`
   - `INQUIRY_EMAIL` (optional override)
   - `NODE_ENV=production`
   - `PORT` (optional, defaults to 3000)

5. Start the Node.js app from cPanel.

### 2. Direct Node.js (VPS / Cloud)

```bash
npm install
cp .env.example .env   # then edit with real credentials
npm run start:dev      # or npm start for production build
```

The server listens on `0.0.0.0:${PORT}` (default 3000).

## Build Output

| Path | Contents |
|------|----------|
| `dist/` | Vite-built frontend static files |
| `dist/server.cjs` | Bundled Express backend (esbuild) |
| `server.cjs` | Copy of server.cjs at root (Hostinger convenience) |
| `build/` | Mirror of dist/ (Hostinger compatibility) |

## Runtime Requirements

- Node.js 18+
- npm 9+
- SMTP credentials for email dispatch (Gmail app password or SMTP provider)

## Key Environment Variables

See [environments.md](./environments.md) for full details.

## Post-Deployment Checks

1. `GET /api/health` — confirms server is online and admin credentials are configured
2. `POST /api/admin/login` — verify admin portal access
3. Submit a test inquiry — confirm email delivery via `/api/test-email`
4. Check HMR is disabled in production (`DISABLE_HMR=true`)