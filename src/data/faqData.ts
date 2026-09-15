export interface FAQItem {
  id: number | string;
  category: 'roi' | 'seo' | 'web' | 'pricing' | 'process' | string;
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    category: 'roi',
    categoryLabel: 'Results & ROI',
    question: "How quickly will we see tangible results and measurable ROI from our campaigns?",
    answer: "Delivery timelines depend on the strategic channel deployed: Paid Search (Google PPC) and targeted Meta Ads typically begin generating qualified inbound leads and customer inquiries within 48 to 72 hours of campaign activation. Custom web design and e-commerce developments deploy within 2 to 4 weeks. For organic SEO and Google Business Profile local rankings, sustainable top-5 keyword rankings and compounding organic traffic momentum build steadily over 60 to 90 days. Every project begins with a 7-day sprint targeting immediate low-hanging conversion wins.",
    highlights: ["PPC Leads in 48-72h", "Web Deployed in 2-4 Weeks", "SEO Compounding in 60-90 Days"]
  },
  {
    id: 2,
    category: 'seo',
    categoryLabel: 'SEO & Rankings',
    question: "Do you guarantee #1 rankings on Google for our search keywords?",
    answer: "No reputable, ethical agency can guarantee a fixed #1 Google rank, and Google's official documentation explicitly warns against any agency making this claim. What MarketingGlu guarantees is a battle-tested, 100% white-hat technical and editorial framework: sub-second Core Web Vitals optimization, high-intent transactional keyword architecture, structured JSON-LD schema data, and authentic contextual backlink acquisition. Over 94% of our client target keywords rank within Google's top 5 positions within 3 to 6 months.",
    highlights: ["100% White-Hat Only", "Google Guidelines Compliant", "94% In Top-5 Positions"]
  },
  {
    id: 3,
    category: 'web',
    categoryLabel: 'Web & Code Ownership',
    question: "Who owns our website code, domain, ad accounts, and creative assets?",
    answer: "You retain 100% unrestricted legal and operational ownership of everything we create. Unlike agencies that keep clients locked in by holding ad accounts or codebases hostage, all Google Ads accounts, Meta Business Managers, domain names, GA4 analytics properties, Figma design files, and GitHub code repositories belong entirely to your company. If you ever conclude our engagement, you keep all historical conversion data, audiences, and assets with full master admin privileges.",
    highlights: ["100% Client Ownership", "Zero Asset Hostaging", "Full Admin Privileges"]
  },
  {
    id: 4,
    category: 'pricing',
    categoryLabel: 'Ad Spend & Pricing',
    question: "How is our advertising budget (ad spend) managed and billed?",
    answer: "Your advertising media spend is billed directly by Google Ads, Meta (Instagram/Facebook), and LinkedIn to your company credit card or GST-registered billing profile. MarketingGlu never charges hidden commissions, markups, or cuts on your media spend. You pay MarketingGlu a transparent, flat or tiered monthly management retainer covering campaign architecture, conversion copywriting, daily bid optimization, negative keyword audits, and A/B ad creative production.",
    highlights: ["Direct Platform Billing", "Zero Spend Markup", "Transparent Flat Retainer"]
  },
  {
    id: 5,
    category: 'pricing',
    categoryLabel: 'Ad Spend & Pricing',
    question: "Can we customize our service package or request bespoke deliverables?",
    answer: "Absolutely. While our Basic, Advance, and Pro packages are structured for typical business growth phases, more than 40% of our enterprise clients work with customized retainers. Whether you require an enterprise e-commerce redesign combined with aggressive Google Shopping PPC, multi-location Local SEO across Delhi NCR, or dedicated international Amazon brand marketing, our senior strategists will tailor a deliverables matrix specifically calibrated to your budget and growth targets.",
    highlights: ["Bespoke Scope Calibration", "Multi-Location Support", "Flexible Service Add-ons"]
  },
  {
    id: 6,
    category: 'process',
    categoryLabel: 'Contracts & Onboarding',
    question: "Are we locked into long-term contracts, or can we cancel anytime?",
    answer: "We do not lock our clients into rigid annual contracts. Our marketing retainers operate on flexible month-to-month agreements following an initial 90-day onboarding runway (which provides essential algorithmic machine-learning calibration for paid campaigns and search engine indexing for SEO). We believe client retention should be earned every month through verified revenue, transparent reporting, and consistent execution—not legal handcuffs.",
    highlights: ["Month-to-Month Retainers", "Initial 90-Day Runway", "No Penalty Exit"]
  },
  {
    id: 7,
    category: 'process',
    categoryLabel: 'Contracts & Onboarding',
    question: "What reporting, metrics, and communication will we receive?",
    answer: "Radical transparency is our cornerstone. You receive round-the-clock access to a customized live Google Looker Studio dashboard tracking keyword SERP positions, cost-per-click (CPC), cost-per-lead (CPA), conversion rates, and phone inquiry volumes in real time. We complement this with bi-weekly sprint updates, monthly executive strategy reviews, and direct daily communication with your dedicated Delhi-based account strategist via WhatsApp, Slack, and email.",
    highlights: ["24/7 Live Looker Studio Dashboard", "Bi-Weekly Sprint Syncs", "Direct WhatsApp/Slack Access"]
  },
  {
    id: 8,
    category: 'web',
    categoryLabel: 'Web & Code Ownership',
    question: "What technology stack and CMS do you use for website development?",
    answer: "We engineer websites using modern, performance-first architectures tailored to your operational requirements: for custom web apps and landing pages, we utilize React, Next.js, and Tailwind CSS for instant sub-second load times and 100/100 Core Web Vitals scores. For content management and editorial platforms, we develop custom, bloat-free WordPress themes with Advanced Custom Fields. For e-commerce, we specialize in Shopify Plus, WooCommerce, and headless storefronts integrated with Razorpay, Stripe, and automated logistics.",
    highlights: ["React, Next.js & Tailwind", "Custom WordPress (Zero Bloat)", "Shopify Plus & Razorpay Ready"]
  },
  {
    id: 9,
    category: 'process',
    categoryLabel: 'Contracts & Onboarding',
    question: "What does the onboarding process look like once we sign up?",
    answer: "Our onboarding is streamlined to get your campaigns moving within 48 hours: Day 1 begins with a tactical discovery call and secure delegation of analytics and ad accounts. Days 2 to 4 focus on comprehensive technical audits, competitor gap analysis, and conversion tracking verification. By Days 5 to 7, our team presents keyword roadmaps and ad creatives for your review. Campaigns or website sprints launch by Day 10 with active monitoring and automated performance alerts.",
    highlights: ["Kickoff within 24-48 Hours", "Deep Competitor Gap Audit", "Fast 10-Day Launch Runway"]
  },
  {
    id: 10,
    category: 'roi',
    categoryLabel: 'Results & ROI',
    question: "Do you track phone calls, WhatsApp chats, and offline conversion leads?",
    answer: "Yes. In the Indian and global business landscape, high-intent B2B and retail inquiries frequently occur over direct phone calls and WhatsApp. We implement robust event telemetry using Google Tag Manager (GTM), Google Analytics 4, and Meta Conversions API (CAPI) to track click-to-call events, WhatsApp chat initiations, and form submissions with precise UTM source attribution so you always know which campaign drove the transaction.",
    highlights: ["WhatsApp Chat Telemetry", "Click-to-Call Tracking", "Full UTM Source Attribution"]
  }
];
