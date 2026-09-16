import { CaseStudy } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: "nexa",
    client: "Nexa Store India",
    year: "2025-2026",
    category: "E-COMMERCE & DEVELOPMENT",
    title: "Nexa Store India UI Transformation",
    description: "Re-engineered Nexa's direct-to-consumer store with a frictionless single-screen checkout and headless speed layer, delivering a 95% boost in mobile retention rates.",
    tags: ["D2C E-Commerce", "Custom Checkout", "Core Web Vitals"],
    deliverables: ["Headless Checkout Architecture", "Mobile Speed Optimization (0.4s LCP)", "Automated Abandonment Recovery"],
    challenge: "High mobile bounce rate (68%) and severe cart drop-off during multi-step address input across Indian mobile tier-2/3 network connections.",
    solution: "Engineered an ultra-lightweight checkout with OTP auto-fill, localized payment gateways (UPI 1-Click, NetBanking, COD verification), and instant product page caching.",
    beforeAfter: [
      { metric: "Mobile Page Speed", before: "4.8s", after: "0.4s" },
      { metric: "Checkout Completion", before: "18.2%", after: "35.5%" },
      { metric: "Monthly Gross Revenue", before: "₹780K", after: "₹2.3M" }
    ],
    stats: [
      { label: "Checkout Velocity", value: "+95%" },
      { label: "Gross Volume", value: "₹2.3M" },
      { label: "Cart Abandonment", value: "-15%" }
    ],
    accent: "from-sky-500 via-cyan-400 to-teal-400",
    type: "nexa"
  },
  {
    id: "techduniya",
    client: "TechDuniya Media",
    year: "2025-2026",
    category: "SOCIAL BRAND MANAGEMENT",
    title: "TechDuniya Organic SMO Push",
    description: "Structured high-velocity viral editorial formats and creator collaborations targeting young Indian tech-buyers to multiply inbound qualified leads.",
    tags: ["Tech Media & Publishing", "Organic SMO", "Audience Scaling"],
    deliverables: ["Short-Form Tech Teardown Reels", "Automated Telegram & WhatsApp Lead Ingestion", "Influencer Syndication Network"],
    challenge: "Stagnant organic growth on traditional social channels with sub-1% click-through and exorbitant paid acquisition costs per subscriber.",
    solution: "Designed snackable, data-dense tech breakdown carousels, algorithmic reel hooks, and automated community triggers converting lurkers into active subscribers.",
    beforeAfter: [
      { metric: "Monthly Impressions", before: "65K", after: "320K" },
      { metric: "Organic Lead Flow", before: "120/mo", after: "680/mo" },
      { metric: "Content CTR", before: "1.4%", after: "8.4%" }
    ],
    stats: [
      { label: "Audience Reach", value: "320K" },
      { label: "Organic Inbound", value: "+180%" },
      { label: "Engagement CTR", value: "8.4%" }
    ],
    accent: "from-cyan-400 via-sky-400 to-blue-500",
    type: "techduniya"
  }
];

