# Environment Variables — MarketingGlu

## Required

| Variable | Description | Example |
|----------|-------------|---------|
| `ADMIN_EMAIL` | Admin login email | `[EMAIL_ADDRESS]` |
| `ADMIN_PASSWORD` | Admin login password (min 6 chars) | `SecurePass123` |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_USER` | SMTP auth username | `[EMAIL_ADDRESS]` |
| `SMTP_PASS` | SMTP auth password (app password for Gmail) | `xxxx xxxx xxxx xxxx` |
| `SMTP_PORT` | SMTP port (465 or 587) | `` |                    

## Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | Server port | `3000` |
| `INQUIRY_EMAIL` | Override inquiry receiver email | SMTP_USER or ADMIN_EMAIL |
| `DISABLE_HMR` | Disable Vite HMR (set to `true` in production) | `false` |

## Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
2. Edit `.env` with real values or use the defaults:
   - Admin: `marketing2glue@gmail.com` / `Admin@4321`
   - SMTP: Gmail with app password

## Production Notes

- **Hostinger**: Set variables in cPanel → **Environment Variables**
- **Never commit `.env`** to version control
- Quote stripping: `SMTP_PASS` and `SMTP_USER` have leading/trailing quotes and whitespace stripped automatically
- `.env` is re-read on each email dispatch for Hostinger/cPanel compatibility