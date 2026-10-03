# Architecture — MarketingGlu

## High-Level Structure

```
MarketingGlu/
├── src/                    # React frontend (TypeScript)
│   ├── admin/              # Admin portal (lazy-loaded)
│   ├── components/         # UI components (hero, sections, modals)
│   ├── context/            # SiteConfigContext, NavigationContext
│   ├── data/               # Static data (expertiseData)
│   ├── lib/                # Utilities (animations, barba, scroll)
│   ├── pages/              # Route pages (services, blogs, legal)
│   └── App.tsx             # Main app with lazy routing
├── server.ts               # Express API server (TypeScript)
├── server.cjs              # Bundled server output (esbuild)
├── app.js                  # Hostinger entrypoint → dist/server.cjs
├── vite.config.mjs         # Vite build config
├── scripts/
│   └── build-server.mjs    # esbuild bundler for server.ts
├── public/                 # Static assets (robots.txt, favicons, etc.)
└── deployment/             # This documentation
```

## Frontend

- **Framework**: React 19 with TypeScript
- **Build**: Vite 6 with `@vitejs/plugin-react`
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Routing**: Hash-based SPA routing via custom `NavigationContext` + Barba.js transitions
- **Animation**: Motion (v12) for page transitions and scroll effects
- **Lazy Loading**: All below-the-fold components and pages use `React.lazy()` + `<Suspense>`
- **State**: Custom React contexts (`SiteConfigProvider`, `NavigationProvider`)

## Backend

- **Runtime**: Express 4 (TypeScript → bundled via esbuild)
- **Email**: Nodemailer with 3-strategy fallback (SSL 465 → STARTTLS 587 → Gmail service)
- **Auth**: Bearer-token admin sessions (24h expiry, in-memory)
- **Rate Limiting**: In-memory brute-force protection (5 attempts / 15 min per IP)
- **Process Guards**: `uncaughtException` + `unhandledRejection` handlers prevent silent crashes

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check + config status |
| POST | `/api/admin/login` | Admin login with rate limiting |
| GET | `/api/admin/verify` | Session verification |
| POST | `/api/admin/logout` | Session invalidation |
| POST | `/api/admin/change-credentials` | Update admin password/email |
| GET | `/api/admin/info` | Current admin info |
| POST | `/api/inquiry` (alias: `/api/enquiry`, `/api/contact`, `/api/consultation`) | Submit inquiry + send email |
| ALL | `/api/inquiry/test-send` | Diagnostic email test |
| GET | `/api/admin/inquiries` | List received inquiries |

## Deployment Targets

- **Primary**: Hostinger cPanel shared hosting (Node.js app)
- **Alternative**: Any Node.js 18+ server (VPS, cloud, Docker)

## Data Flow

```
User Browser → Vite Static Files → Express SPA Fallback → index.html
User Form → POST /api/inquiry → Nodemailer (3-strategy) → SMTP → Receiver
Admin Portal → Bearer Token → requireAdminAuth → API Routes
```