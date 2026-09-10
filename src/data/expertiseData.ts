import { 
  Globe, 
  ShoppingBag, 
  Search, 
  Palette, 
  MousePointerClick, 
  Megaphone 
} from 'lucide-react';

import websiteDesignImg from '../assets/website-design.png';
import ecommerceImg from '../assets/ecommerce-design.png';
import graphicDesignImg from '../assets/graphic-design.png';
import seoImg from '../assets/seo-optimization.png';
import ppcImg from '../assets/ppc-campaigns.png';
import smoImg from '../assets/smo-optimization.png';

export interface ExpertisePillar {
  title: string;
  description: string;
  tag: string;
}

export interface ExpertiseItem {
  id: string;
  tabLabel: string;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  metricBadge: string;
  metricSubtitle: string;
  icon: typeof Globe;
  image: string;
  pillars: ExpertisePillar[];
  deliverables: string[];
}

export const expertiseData: ExpertiseItem[] = [
  {
    id: "web-design",
    tabLabel: "Web Design",
    category: "Web Engineering & Architecture",
    title: "Custom Website Design & Development",
    subtitle: "High-Performance Websites Engineered for Brand Authority, Speed & Conversions",
    summary: "We engineer bespoke, lightning-fast digital experiences tailored to your business objectives. Every website combines human-centered UX design, modern visual storytelling, responsive mobile engineering, and clean semantic architecture that search engines favor.",
    metricBadge: "99.9% Uptime & Sub-Second Loads",
    metricSubtitle: "Core Web Vitals & Conversion-Ready",
    icon: Globe,
    image: websiteDesignImg,
    pillars: [
      {
        title: "User Experience (UX) Architecture",
        description: "Frictionless customer journeys, intuitive navigation systems, and prominent conversion triggers.",
        tag: "Intuitive UX"
      },
      {
        title: "Modern Visual Brand Identity",
        description: "Bespoke digital aesthetics, harmonized color systems, modern typography, and high-fidelity graphics.",
        tag: "Design System"
      },
      {
        title: "Multi-Device Responsive Engineering",
        description: "Fluid responsiveness meticulously tested across ultra-wide monitors, laptops, tablets, and mobile devices.",
        tag: "Mobile-First"
      },
      {
        title: "SEO-Optimized Content Structure",
        description: "Structured hierarchy, semantic HTML tags, clean page speeds, and scannable conversion layouts.",
        tag: "Speed & SEO"
      }
    ],
    deliverables: [
      "Custom responsive design (No generic templates)",
      "Speed optimized & Core Web Vitals compliant",
      "Intuitive CMS setup for simple client updates",
      "SSL, cloud security & CDN integration"
    ]
  },
  {
    id: "ecommerce",
    tabLabel: "E-Commerce",
    category: "Storefront Architecture & Sales Funnels",
    title: "E-Commerce Solutions & Storefront Design",
    subtitle: "Frictionless Online Storefronts Optimized for Sales Velocity & Cart Retention",
    summary: "From high-volume catalog architectures to seamless one-click checkout flows, we build digital storefronts that maximize average order value (AOV), curb cart abandonment, and process transactions with bank-grade security.",
    metricBadge: "Up to 3.4x Cart Conversion Lift",
    metricSubtitle: "Streamlined Checkout & Fast Gateways",
    icon: ShoppingBag,
    image: ecommerceImg,
    pillars: [
      {
        title: "Frictionless Catalog Navigation",
        description: "Instant live search, multi-attribute filter facets, and structured product taxonomies.",
        tag: "Zero Friction"
      },
      {
        title: "High-Conversion Checkout Flows",
        description: "Streamlined multi-step or single-page checkouts engineered to eliminate cart abandonment.",
        tag: "High Conversion"
      },
      {
        title: "High-Resolution Product Showcases",
        description: "Multi-angle imagery galleries, dynamic zoom, customer ratings, and real-time inventory indicators.",
        tag: "Visual Merchandising"
      },
      {
        title: "Bank-Grade Secure Payment Gateways",
        description: "End-to-end encrypted integration with Razorpay, Stripe, UPI, cards, and automated tax systems.",
        tag: "Secure Transactions"
      }
    ],
    deliverables: [
      "Multi-currency & domestic gateway integrations",
      "Automated abandoned cart email funnels",
      "Mobile-first responsive shopping experience",
      "Inventory management & live order tracking"
    ]
  },
  {
    id: "seo",
    tabLabel: "Search (SEO)",
    category: "Organic Search & SERP Dominance",
    title: "Search Engine Optimization (SEO)",
    subtitle: "Dominate Google SERPs With Compounding High-Intent Organic Traffic",
    summary: "Outrank industry rivals and capture ready-to-convert prospects right when they search for your solutions. Our data-driven SEO framework produces a sustainable, compounding client-acquisition engine without ongoing per-click ad costs.",
    metricBadge: "Top-Tier SERP Ranking Framework",
    metricSubtitle: "Sustainable Organic Client Acquisition",
    icon: Search,
    image: seoImg,
    pillars: [
      {
        title: "Technical SEO & Speed Optimization",
        description: "Deep crawl audits, indexing fixes, schema markups, canonical structures, and site velocity enhancements.",
        tag: "Technical Audit"
      },
      {
        title: "High-Intent Keyword Dominance",
        description: "Pinpoint commercial search queries with high conversion intent to attract qualified decision makers.",
        tag: "Commercial Intent"
      },
      {
        title: "Authoritative Link Architecture",
        description: "High-authority domain backlinks, digital PR outreach, and clean directory citations that build domain trust.",
        tag: "Domain Authority"
      },
      {
        title: "Content & User Experience Alignment",
        description: "Search-aligned content architecture designed to outrank competitor articles and satisfy Google helpful content signals.",
        tag: "Content Strategy"
      }
    ],
    deliverables: [
      "Complete on-page keyword & meta-tag optimization",
      "Google Search Console & Analytics 4 integration",
      "Google Business Profile (Local Map Pack) optimization",
      "Monthly transparent keyword ranking & traffic reports"
    ]
  },
  {
    id: "graphic-design",
    tabLabel: "Branding & Design",
    category: "Brand Identity & Creative Media",
    title: "Graphic Design & Visual Brand Identity",
    subtitle: "Distinctive Visual Assets That Command Market Authority and Brand Recall",
    summary: "Visual first impressions dictate brand trust. We develop memorable brand identities, custom logo systems, marketing collateral, and high-impact digital graphics that instantly distinguish your business in competitive markets.",
    metricBadge: "Complete Vector & Brand Suite",
    metricSubtitle: "Ready for Print, Web & Large Format",
    icon: Palette,
    image: graphicDesignImg,
    pillars: [
      {
        title: "Memorable Logo Design Suites",
        description: "Versatile, timeless vector logos crafted with variants for dark, light, horizontal, and icon mark use.",
        tag: "Brand Mark"
      },
      {
        title: "Comprehensive Style Systems",
        description: "Tailored color palettes, custom typography pairings, usage rules, and complete visual guidelines.",
        tag: "Style Guidelines"
      },
      {
        title: "Press-Ready Print Collateral",
        description: "Executive business cards, corporate brochures, flyers, event banners, and promotional merchandise.",
        tag: "Print Media"
      },
      {
        title: "Social & Digital Ad Creatives",
        description: "Scroll-stopping social media graphics, cover artwork, carousel sets, and high-CTR display banner ads.",
        tag: "Digital Assets"
      }
    ],
    deliverables: [
      "Full editable source files (AI, SVG, EPS, PNG, PDF)",
      "Comprehensive brand identity guidelines guide",
      "Custom vector iconography & brand assets",
      "Fast turnaround with collaborative revision rounds"
    ]
  },
  {
    id: "ppc",
    tabLabel: "PPC & Paid Ads",
    category: "Paid Search & Performance Marketing",
    title: "Pay-Per-Click Advertising (PPC)",
    subtitle: "Targeted Ad Campaigns Delivering Immediate Leads & Transparent ROAS",
    summary: "Eliminate guesswork and connect directly with high-intent buyers through precision Google Ads and paid search campaigns. We optimize every dollar of ad spend with negative keyword pruning, rigorous A/B testing, and conversion-focused landing pages.",
    metricBadge: "Full Multi-Touch ROAS Attribution",
    metricSubtitle: "Immediate Traffic & Direct Attribution",
    icon: MousePointerClick,
    image: ppcImg,
    pillars: [
      {
        title: "Immediate Traffic & Fast Results",
        description: "Bypass long organic ramp-up periods and start capturing high-intent inquiries from day one of campaign launch.",
        tag: "Instant Traction"
      },
      {
        title: "Laser Audience & Geo-Targeting",
        description: "Target by exact geographic radius, demographics, search queries, and purchase intent to eliminate wasted spend.",
        tag: "Precision Targeting"
      },
      {
        title: "Dynamic Bid & Budget Management",
        description: "Continuous bid adjustments focused on high-converting keyword queries to maximize return on ad spend (ROAS).",
        tag: "Budget Control"
      },
      {
        title: "Real-Time Conversion Attribution",
        description: "Live tracking dashboards showing exact cost-per-click (CPC), cost-per-lead (CPL), and conversion rates.",
        tag: "Transparent ROI"
      }
    ],
    deliverables: [
      "Targeted Google Search & Display campaign setup",
      "Negative keyword lists to prevent ad budget waste",
      "High-converting landing page optimization",
      "Transparent weekly performance & lead analytics"
    ]
  },
  {
    id: "smo",
    tabLabel: "Social Media (SMO)",
    category: "Community Engagement & Paid Social",
    title: "Social Media Optimization (SMO & SMM)",
    subtitle: "Building Loyal Online Communities & Amplifying Organic Social Reach",
    summary: "Transform social media profiles into active customer acquisition channels. We engineer engaging content strategies, optimize brand profiles across major networks, build authentic community trust, and run targeted paid social funnels on Meta and LinkedIn.",
    metricBadge: "Compounding Organic Inbound Pipeline",
    metricSubtitle: "Brand Loyalty & Active Community Reach",
    icon: Megaphone,
    image: smoImg,
    pillars: [
      {
        title: "Organic Reach & Brand Visibility",
        description: "Consistent posting schedules with branded visuals that establish top-of-mind awareness across platforms.",
        tag: "Organic Reach"
      },
      {
        title: "Compounding Inbound Traffic",
        description: "Strategic link funnels, story highlights, and bio links that guide social followers directly to your website.",
        tag: "Inbound Pipeline"
      },
      {
        title: "Active Community Trust Building",
        description: "Direct relationship cultivation and timely response management that transforms followers into brand advocates.",
        tag: "Community Trust"
      },
      {
        title: "Paid Social Growth & Retargeting",
        description: "Targeted Meta Ads and LinkedIn campaigns targeting lookalike audiences and retargeting warm site visitors.",
        tag: "Paid Social Funnels"
      }
    ],
    deliverables: [
      "Custom monthly editorial calendar & post scheduling",
      "Profile branding & bio link optimization kit",
      "Paid campaign setup on Instagram, Facebook & LinkedIn",
      "Monthly audience growth & engagement performance report"
    ]
  }
];
