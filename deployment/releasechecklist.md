# Release Checklist — MarketingGlu

## Pre-Release

- [ ] All tests pass (`npm run lint`)
- [ ] `.env` has correct production values (no dev defaults)
- [ ] `ADMIN_EMAIL` and `ADMIN_PASSWORD` are strong and unique
- [ ] SMTP credentials verified (app password for Gmail)
- [ ] `NODE_ENV=production` set
- [ ] `DISABLE_HMR=true` set for production

## Build

- [ ] `npm run build` completes without errors
- [ ] `dist/` directory contains `index.html` and asset chunks
- [ ] `dist/server.cjs` is generated and non-empty
- [ ] `server.cjs` copied to project root
- [ ] Chunk sizes under 1500 KB warning limit

## Smoke Tests

- [ ] `GET /api/health` returns `status: "ok"` with `adminAuthConfigured: true`
- [ ] `POST /api/admin/login` with correct credentials returns token
- [ ] `POST /api/admin/login` with wrong credentials returns 401
- [ ] Rate limiting: 5 failed attempts → 429 response
- [ ] `POST /api/inquiry` with valid data returns success
- [ ] Email inquiry received at `INQUIRY_EMAIL` / `SMTP_USER`
- [ ] `GET /api/admin/inquiries` returns inquiry list (with Bearer token)
- [ ] SPA routes work (home, services, blogs, admin portal)
- [ ] Mobile bottom bar and back-to-top button functional

## Deployment

- [ ] Files uploaded to correct Hostinger `public_html` directory
- [ ] Node.js app configured with startup file `server.cjs`
- [ ] Environment variables set in cPanel
- [ ] App restarted after env var changes
- [ ] Port binding confirmed (no EADDRINUSE)

## Post-Release

- [ ] Monitor `/api/health` for 5 minutes
- [ ] Check email delivery for test inquiry
- [ ] Verify admin portal login works
- [ ] Review server logs for errors
- [ ] Confirm no console 404s for assets in browser DevTools