# Build Guide — MarketingGlu

## Build Commands

```bash
# Development (Vite dev server + tsx watch server)
npm run dev

# Production build (frontend + server bundle)
npm run build

# Start production build
npm start

# Development server (no watch)
npm run start:dev

# Type-check only
npm run lint

# Preview production build locally
npm run preview
```

## Build Pipeline

### 1. Frontend (Vite)

```
src/ → Vite + React plugin + Tailwind CSS plugin → dist/
```

- Target: ES2022
- CSS minified with esbuild
- Manual chunk splitting:
  - `vendor-react` — React + React DOM
  - `vendor-motion` — Motion / Framer Motion
  - `vendor-icons` — Lucide React
  - `vendor-lenis` — Lenis scroll
  - `vendor-misc` — Other node_modules
- Chunk size warning limit: 1500 KB

### 2. Backend (esbuild)

```
server.ts → esbuild (CJS, Node 18 target) → dist/server.cjs
```

- Bundles express, nodemailer, dotenv, crypto, fs, path
- Externalizes `vite` (not needed in production)
- Also copied to `server.cjs` at project root
- Also synced to `build/dist/server.cjs` (Hostinger compatibility)

### 3. Build Output Layout

```
dist/
├── assets/           # Vite chunks (JS + CSS)
├── index.html
└── server.cjs        # Bundled Express server
```

## Build Requirements

- Node.js 18+
- npm 9+
- `.env` file with required variables (see [environments.md](./environments.md))

## Common Build Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| `vite` not found | Missing dependency | `npm install` |
| Chunk size warning | Large vendor bundle | Check `manualChunks` in vite.config.mjs |
| `NODE_ENV` not set | Missing env var | Set `NODE_ENV=production` before build |
| `server.cjs` not generated | esbuild failure | Run `npm run build` not `npm run dev` |