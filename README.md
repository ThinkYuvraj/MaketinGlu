# MarketingGlu - Enterprise Digital Marketing & Engineering Solutions

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

MarketingGlu is a premier digital marketing agency and web engineering studio based in New Delhi, India. The web application serves as the flagship client platform and showcases end-to-end digital solutions spanning custom web architecture, e-commerce engineering, data-driven SEO, high-ROI PPC campaigns, social media optimization, and bespoke brand design.

---

## 🌟 Key Highlights & User Journey

- **Streamlined Service Cards with "Know More"**: Every discipline card across the homepage showcase and services catalog features a single, prominent **Know More** button that seamlessly redirects visitors directly to the dedicated service deep-dive page (`#/services/:id`).
- **Dedicated In-Depth Service Pages**: High-impact architectural breakdowns for each capability with real-world case studies, execution phases (Discovery → Architecture → Development → QA & Deployment), technical stacks, and interactive FAQs.
- **Unified 6 Disciplines Catalog**: Easily discover and filter capabilities by category (Engineering, Growth, Creative, or All).
- **Interactive Multi-Step Consultation System**: Integrated consultation modal with pre-filled service contexts, quick package selectors, and instant WhatsApp integration (`+91 96545 96149`).
- **Transparent Marketing Packages**: Clear tiers tailored for startups, growth-stage brands, and enterprise market leaders.
- **Mobile-First Experience**: Sticky bottom action bar for instantaneous one-tap calling, WhatsApp chat, and strategy audit bookings.
- **Internal Admin Portal**: Built-in administration module (`#/admin`) for managing site configuration and service parameters.

---

## 🚀 The 6 Core Disciplines

| Discipline | Dedicated Page Route | Core Focus & Highlights |
| :--- | :--- | :--- |
| **Custom Website Design & Web Engineering** | `#/services/web-design` | Sub-second load speeds, Core Web Vitals compliance, modern responsive component systems, and headless CMS integrations. |
| **E-Commerce Engineering & Store Architecture** | `#/services/ecommerce` | High-converting Shopify & WooCommerce stores, one-click checkouts, and custom ERP/inventory synchronization. |
| **Technical & Performance SEO Architecture** | `#/services/seo` | Algorithmic technical audits, semantic content clusters, high-authority backlink development, and local search dominance. |
| **High-ROI PPC & Paid Media Campaigns** | `#/services/ppc` | Google Ads, Meta Ads, LinkedIn Ads, algorithmic bidding optimization, and precision negative keyword hygiene. |
| **Social Media Optimization & Community Engine** | `#/services/smo` | Viral content strategy, branded motion design, multi-platform organic reach, and active community engagement. |
| **Bespoke Brand Identity & Graphic Design** | `#/services/graphic-design` | Vector design systems, UI/UX wireframing, high-impact marketing collateral, and brand identity guidelines. |

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) with custom dark slate, neon cyan, and emerald accent tokens
- **Build Tooling & Bundler**: [Vite 6](https://vitejs.dev/)
- **Animations & Micro-interactions**: [Motion](https://motion.dev/) (Framer Motion)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Backend & Middleware**: [Express 4](https://expressjs.com/) with native Vite development middleware support

---

## 🧭 Navigation & Hash Routing Architecture

The application uses an optimized hash-based client-side router (`NavigationContext`) that provides smooth routing without page reloads, perfect for containerized preview and production environments:

- `#/`: Primary Homepage (Hero, Live Performance Metrics, 6 Disciplines Grid, Packages, Case Studies, FAQ, and Appointment Banner)
- `#/services`: All 6 Disciplines Directory Catalog
- `#/services/:serviceId`: Dedicated In-Depth Service Page (`web-design`, `ecommerce`, `seo`, `ppc`, `smo`, `graphic-design`)
- `#/admin`: Internal Agency Management & Configuration Portal
- Anchor jump links (`#expertise`, `#packages`, `#cases`, `#faq`, `#home`) with smooth scrolling

---

## 💻 Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `bun`

### Installation & Execution

1. **Clone or navigate to the repository directory**:
   ```bash
   cd marketing-glu
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Copy `.env.example` if available or create `.env.local` for custom variables:
   ```bash
   cp .env.example .env.local
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at: `http://localhost:3000`

5. **Type Checking & Linting**:
   ```bash
   npm run lint
   ```

6. **Create a Production Build**:
   ```bash
   npm run build
   ```

7. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Directory Structure

```
├── public/                     # Static assets (favicons, logos, brand marks)
├── src/
│   ├── admin/                  # Internal admin portal interface
│   ├── assets/                 # High-resolution discipline & project visuals
│   ├── components/             # Reusable UI component library
│   │   ├── common/             # Common containers, wrappers, and cards
│   │   ├── expertise/          # Service & discipline specialized modules
│   │   ├── mobile/             # Mobile navigation & quick action bars
│   │   ├── CompanyExpertise.tsx# 6 Disciplines showcase cards with "Know More" CTA
│   │   ├── ConsultationModal.tsx# Inquiry & strategy consultation booking dialog
│   │   ├── Hero.tsx            # High-conversion hero section
│   │   ├── Packages.tsx        # Pricing tiers & packages carousel
│   │   ├── CaseStudies.tsx     # Quantifiable portfolio & client results
│   │   ├── PerformanceStats.tsx# Key performance metrics
│   │   └── Navbar.tsx & Footer.tsx # Fixed navigation with dropdowns
│   ├── context/                # Navigation & site configuration context providers
│   ├── data/                   # Structured expertise, package, and case study data
│   ├── lib/                    # Animation variants and helper utilities
│   ├── pages/
│   │   ├── ServiceDetailPage.tsx # Dedicated deep-dive service architecture page
│   │   └── ServicesIndexPage.tsx # All 6 services directory index
│   ├── App.tsx                 # Root application router and route renderer
│   ├── main.tsx                # React DOM entrypoint
│   └── types.ts                # Shared TypeScript definitions
├── metadata.json               # Application metadata and platform capabilities
├── package.json                # Dependencies and npm script targets
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite configuration with Tailwind CSS plugin
```

---

## 📞 Contact & Inquiries

- **Agency**: MarketingGlu Digital Solutions
- **Location**: New Delhi, India
- **Direct Phone / WhatsApp**: [+91 96545 96149](https://wa.me/+919654596149)
- **Consultation Hours**: Monday – Saturday, 9:00 AM – 7:00 PM IST
