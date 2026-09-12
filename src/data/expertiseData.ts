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

export interface ExpertiseMethodology {
  step: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
}

export interface ExpertiseTechItem {
  name: string;
  role: string;
}

export interface ExpertiseFAQ {
  question: string;
  answer: string;
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
  // Enhanced dedicated page data
  heroStats: { label: string; value: string; desc: string }[];
  idealFor: string;
  keyBenefits: { title: string; description: string }[];
  methodology: ExpertiseMethodology[];
  techStack: ExpertiseTechItem[];
  faqs: ExpertiseFAQ[];
  caseStudyPreview: { client: string; result: string; metric: string; quote: string };
  priceEstimate: string;
  timelineEstimate: string;
}

export const expertiseData: ExpertiseItem[] = [
  {
    id: "web-design",
    tabLabel: "Web & App Dev",
    category: "Web Dev, UI/UX & App Engineering",
    title: "Web Development, UI/UX & App Engineering",
    subtitle: "Dynamic Web Apps, Static Fast Sites, UI/UX Design, E-Commerce & Mobile App Development",
    summary: "From lightning-fast static websites and scalable dynamic web applications to intuitive UI/UX design systems, turnkey e-commerce storefronts, and cross-platform mobile apps for iOS and Android. We engineer full-stack digital solutions tailored for performance, conversions, and scale.",
    metricBadge: "99.9% Uptime & Sub-Second Loads",
    metricSubtitle: "Dynamic & Static Architecture",
    icon: Globe,
    image: websiteDesignImg,
    heroStats: [
      { label: "Core Web Vitals", value: "< 0.8s", desc: "First Contentful Paint & sub-second load times" },
      { label: "Conversion Lift", value: "+145%", desc: "Average increase in qualified inbound lead capture" },
      { label: "Mobile Experience", value: "100%", desc: "Bespoke responsive ergonomics across all screen sizes" },
      { label: "Uptime & Security", value: "99.99%", desc: "Enterprise cloud hosting & automated CDN edge caching" }
    ],
    idealFor: "Growing B2B companies, direct-to-consumer brands, and ambitious startups seeking high-converting dynamic or static websites, custom UI/UX, and scalable mobile apps.",
    keyBenefits: [
      { title: "Dynamic & Static Website Agility", description: "Choose between ultra-fast Jamstack static websites or robust dynamic database-driven web applications and client portals." },
      { title: "Human-Centered UI/UX Design", description: "Every wireframe, prototype, and layout is engineered in Figma around user psychology to minimize friction and lift conversions." },
      { title: "Integrated E-Commerce & App Ecosystem", description: "Turnkey digital storefronts and cross-platform mobile apps (iOS & Android) with unified checkout and catalog systems." },
      { title: "Built for Google Search Engine Dominance", description: "Clean semantic HTML5, JSON-LD schema markup, and lean codebases that Google crawlers reward with top rankings." }
    ],
    pillars: [
      {
        title: "Dynamic & Static Website Engineering",
        description: "Custom dynamic database-backed web applications, scalable client portals, and ultra-fast static websites engineered with sub-second speeds.",
        tag: "Dynamic & Static Sites"
      },
      {
        title: "UI/UX & Interactive Product Design",
        description: "Human-centered UI/UX wireframes, Figma prototypes, responsive design systems, and frictionless user journeys that maximize conversion rates.",
        tag: "UI/UX Design"
      },
      {
        title: "E-Commerce Website Solutions",
        description: "High-converting online storefronts, catalog architecture, inventory synchronization, and bank-grade secure checkout integrations.",
        tag: "E-Commerce Websites"
      },
      {
        title: "Cross-Platform App Development",
        description: "Native and hybrid mobile app development for iOS and Android, Progressive Web Apps (PWA), and custom API architectures.",
        tag: "App Development"
      }
    ],
    deliverables: [
      "Dynamic web applications & bespoke client portals",
      "Static high-speed websites & high-converting landing pages",
      "End-to-end UI/UX design, interactive Figma prototypes & user flows",
      "E-Commerce website development with payment & inventory integration",
      "Cross-platform mobile app development (iOS & Android / PWA)",
      "Speed optimization, Core Web Vitals <0.8s & enterprise cloud hosting"
    ],
    methodology: [
      {
        step: "01",
        title: "Strategic Discovery & Information Architecture",
        duration: "Week 1",
        description: "We audit your competitive landscape, define user personas, map conversion funnels, and draft high-fidelity wireframes.",
        highlights: ["Competitor benchmarking", "User journey mapping", "Conversion wireframes", "Sitemap hierarchy"]
      },
      {
        step: "02",
        title: "Bespoke Visual UI Design & Style System",
        duration: "Week 2",
        description: "We craft custom desktop and mobile interactive design mockups in Figma, complete with typography scales and color systems.",
        highlights: ["High-fidelity Figma prototypes", "Mobile responsive variants", "Micro-interactions design", "Client review & sign-off"]
      },
      {
        step: "03",
        title: "Modern Frontend & Backend Engineering",
        duration: "Weeks 3-4",
        description: "Our engineers build clean, modular code utilizing modern standards, ensuring sub-second speeds and flawless responsiveness.",
        highlights: ["Component-driven engineering", "CMS integration", "API & form webhooks", "Database & edge caching setup"]
      },
      {
        step: "04",
        title: "QA, Cross-Browser Testing & Deployment",
        duration: "Week 5",
        description: "Rigorous testing across 15+ device viewports, Core Web Vitals calibration, DNS migration, and staff CMS training.",
        highlights: ["Lighthouse 95+ score validation", "Security vulnerability scan", "DNS live switchover", "Training walkthrough recording"]
      }
    ],
    techStack: [
      { name: "React & Next.js", role: "Dynamic web apps & static Jamstack pre-rendering" },
      { name: "React Native & Flutter", role: "Cross-platform iOS & Android mobile apps" },
      { name: "Figma & Tailwind CSS", role: "UI/UX wireframing, prototypes & fluid design systems" },
      { name: "Shopify & WooCommerce", role: "E-Commerce storefronts & catalog architecture" },
      { name: "Node.js & TypeScript", role: "Dynamic API integrations & backend engineering" },
      { name: "Cloudflare Edge", role: "Global CDN, edge caching & sub-second loading" }
    ],
    faqs: [
      {
        question: "Do you build both Dynamic and Static websites as well as mobile apps?",
        answer: "Yes, 100%. We engineer lightning-fast static websites (ideal for brand showcases, landing pages, and portfolio sites) as well as feature-rich dynamic web applications (client portals, booking engines, web SaaS). We also engineer cross-platform mobile apps for iOS and Android."
      },
      {
        question: "What is included in your UI/UX design process?",
        answer: "Our UI/UX process covers user journey mapping, low-fidelity wireframing, high-fidelity interactive Figma prototypes, and complete design system creation with typography scales, color palettes, and component states."
      },
      {
        question: "How long does a custom web or app development project take to build?",
        answer: "Static websites take 2 to 3 weeks; dynamic web applications and e-commerce platforms take 3 to 5 weeks; full-scale mobile app development takes 5 to 8 weeks depending on backend complexity."
      },
      {
        question: "Will I be able to update text and images myself without technical knowledge?",
        answer: "Yes, 100%. We configure an intuitive, visual content management system (CMS) and provide a personalized video walkthrough so your team can easily add blog posts, testimonials, products, and updates."
      },
      {
        question: "Do you guarantee fast load times and mobile compatibility?",
        answer: "Absolutely. We engineer every page to exceed Google Core Web Vitals standards, targeting sub-second load times (<0.8s) and 90+ Lighthouse performance scores across all device viewports."
      }
    ],
    caseStudyPreview: {
      client: "Apex Financial Advisory",
      result: "185% increase in qualified consultation bookings within 60 days of relaunch.",
      metric: "<0.6s FCP",
      quote: "MarketingGlu completely transformed our digital identity. Inquiries increased dramatically within the very first month."
    },
    priceEstimate: "Starting from ₹35,000",
    timelineEstimate: "3 to 5 Weeks"
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
    heroStats: [
      { label: "Checkout Velocity", value: "+95%", desc: "Accelerated payment completions across UPI and cards" },
      { label: "Gross Volume Handled", value: "₹50M+", desc: "Cumulative transaction volume processed reliably" },
      { label: "Cart Abandonment Drop", value: "-38%", desc: "Reduced drop-offs via smart checkout ergonomics" },
      { label: "Average Order Value", value: "+28%", desc: "Driven by automated upsell and bundle cross-sells" }
    ],
    idealFor: "Direct-to-consumer (D2C) brands, retailers, and wholesalers ready to scale online revenues with high-converting storefronts.",
    keyBenefits: [
      { title: "One-Click Instant Checkouts", description: "Native integration with UPI, Google Pay, cards, net banking, and Cash-on-Delivery with OTP verification." },
      { title: "Automated Abandoned Cart Funnels", description: "Trigger timely WhatsApp and email recovery sequences that bring back up to 25% of uncompleted checkouts." },
      { title: "High-Volume Catalog Filtering", description: "Instant facet filters for size, color, price, and specs that allow shoppers to find and purchase products in seconds." },
      { title: "Seamless ERP & Courier Sync", description: "Automate order tracking and inventory sync with Shiprocket, Delhivery, Bluedart, and your central accounting systems." }
    ],
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
      "Multi-currency & domestic gateway integrations (Razorpay, Stripe, UPI)",
      "Automated abandoned cart email and WhatsApp funnels",
      "Mobile-first responsive shopping experience",
      "Inventory management & live order tracking setup",
      "Product variant configuration (colors, sizes, bundles)",
      "GST invoice automation & coupon code management"
    ],
    methodology: [
      {
        step: "01",
        title: "Merchandising & Catalog Strategy",
        duration: "Week 1",
        description: "We analyze your SKU catalogue, pricing architecture, customer segments, and checkout drop-off pain points.",
        highlights: ["SKU taxonomy blueprint", "AOV growth strategies", "Payment gateway selection", "Logistics partner mapping"]
      },
      {
        step: "02",
        title: "Conversion-Centric Storefront Design",
        duration: "Week 2",
        description: "We create captivating product detail pages (PDP), category filters, and intuitive checkout layouts.",
        highlights: ["High-impact PDP designs", "Sticky Add-To-Cart flows", "Social proof badge placement", "Mobile drawer carts"]
      },
      {
        step: "03",
        title: "Storefront Development & Gateway Configuration",
        duration: "Weeks 3-4",
        description: "Building the custom store on Shopify Plus or custom headless frameworks with full payment and inventory integrations.",
        highlights: ["Razorpay/Stripe API setup", "Courier webhook automation", "Abandoned cart automation", "Discounts engine"]
      },
      {
        step: "04",
        title: "End-to-End Stress Testing & Soft Launch",
        duration: "Week 5",
        description: "Executing real transaction simulations, stress-testing high traffic spikes, and validating automated dispatch emails.",
        highlights: ["Payment settlement test", "Tax compliance check", "Speed optimization", "Customer service dashboard setup"]
      }
    ],
    techStack: [
      { name: "Shopify Plus & WooCommerce", role: "Storefront engines & catalog hosting" },
      { name: "Razorpay & Stripe", role: "PCI-DSS compliant payment processing" },
      { name: "Shiprocket API", role: "Automated courier dispatch & real-time tracking" },
      { name: "Klaviyo & WhatsApp Business", role: "Automated lifecycle & recovery campaigns" },
      { name: "Meta Pixel & CAPI", role: "Server-side transaction attribution" }
    ],
    faqs: [
      {
        question: "Which e-commerce platform do you recommend: Shopify or WooCommerce?",
        answer: "For fast-scaling D2C brands that prioritize reliability and low maintenance, Shopify or Shopify Plus is generally our top recommendation. For businesses requiring custom multi-vendor or deeply bespoke backend workflows, WooCommerce or custom headless architecture is ideal. We guide you to the optimal choice during discovery."
      },
      {
        question: "Can you migrate our existing product catalog and order history?",
        answer: "Yes. We handle seamless zero-downtime data migrations including customer accounts, historical order records, product variants, and SEO redirection maps so you preserve all search ranking equity."
      },
      {
        question: "How do you handle Indian payment methods like UPI and Cash on Delivery?",
        answer: "We configure certified payment gateways (Razorpay, Cashfree, PayU) that support UPI Intent, QR codes, net banking, debit/credit cards, and EMI. For COD, we can integrate OTP verification to drastically reduce RTO (Return to Origin) rates."
      },
      {
        question: "Do you configure shipping rates and automated tracking?",
        answer: "Yes, we integrate shipping aggregators like Shiprocket or direct courier APIs so shipping labels, tracking notifications, and SMS/WhatsApp delivery updates happen automatically."
      }
    ],
    caseStudyPreview: {
      client: "Nexa Store India",
      result: "95% boost in mobile retention rates and ₹2.3M monthly volume handled with 15% lower cart abandonment.",
      metric: "+95% Velocity",
      quote: "The redesigned checkout flow and product galleries transformed our brand into an e-commerce powerhouse."
    },
    priceEstimate: "Starting from ₹45,000",
    timelineEstimate: "4 to 6 Weeks"
  },
  {
    id: "seo",
    tabLabel: "Google Ranking & SEO",
    category: "Google Ranking Platform & SEO",
    title: "Google Ranking Platform & SEO Dominance",
    subtitle: "Dominate Google SERPs, Google Maps Local 3-Pack & Organic Search Rankings",
    summary: "Propel your brand to the top of Google. Our proprietary Google Ranking Platform framework pairs rigorous technical SEO, local Google Business 3-pack dominance, and high-authority link acquisition to deliver compounding inbound customer leads without per-click ad costs.",
    metricBadge: "Top-Tier SERP Ranking Framework",
    metricSubtitle: "Google Ranking & Organic Growth",
    icon: Search,
    image: seoImg,
    heroStats: [
      { label: "Top-3 Rankings", value: "85%+", desc: "Target commercial keywords placed in Google Top 3" },
      { label: "Organic Inquiries", value: "+320%", desc: "Compounding high-intent customer acquisition" },
      { label: "Technical Health", value: "98/100", desc: "Average crawl score on deep Screaming Frog audits" },
      { label: "Domain Trust", value: "4.5x", desc: "Authoritative backlink profile growth within 6 months" }
    ],
    idealFor: "Businesses looking for sustainable, predictable, and compounding inbound customer demand that dominates Google Search and Google Maps rankings.",
    keyBenefits: [
      { title: "Google Ranking Platform Dominance", description: "Systematic optimization across Google Search organic results and the Google Maps Local 3-Pack to dominate your local market." },
      { title: "Commercial Intent Keyword Targeting", description: "We don't chase vanity keywords. We focus on high-conversion search queries used by active buyers with purchasing intent." },
      { title: "Flawless Technical SEO Architecture", description: "Resolving crawl errors, canonical duplicates, JSON-LD schema issues, and Core Web Vitals to earn algorithmic trust." },
      { title: "High-Authority Digital PR Backlinks", description: "White-hat editorial link acquisition from trusted industry publications and regional authoritative directories." }
    ],
    pillars: [
      {
        title: "Google Ranking Platform Optimization",
        description: "Google Search indexation, algorithmic ranking calibration, and Google Business Profile Local 3-Pack map rankings.",
        tag: "Google Ranking"
      },
      {
        title: "Technical SEO & Speed Optimization",
        description: "Deep crawl audits, indexing fixes, schema markups, canonical structures, and site velocity enhancements.",
        tag: "Technical SEO"
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
      }
    ],
    deliverables: [
      "Google Ranking Platform optimization (Google Search & Google Maps Local 3-Pack)",
      "Comprehensive on-page SEO & semantic keyword architecture",
      "Complete technical SEO crawl audit & JSON-LD schema deployment",
      "High-authority white-hat backlink building & PR distribution",
      "Google Search Console & Analytics 4 multi-channel attribution",
      "Monthly transparent keyword ranking reports & competitor tracking"
    ],
    methodology: [
      {
        step: "01",
        title: "Deep Technical Audit & Competitor Gap Analysis",
        duration: "Month 1",
        description: "Exhaustive crawl of every URL to eliminate 404s, redirect chains, thin content, and schema voids, paired with competitor keyword theft.",
        highlights: ["Screaming Frog crawl analysis", "Competitor backlink profile audit", "Keyword opportunity matrix", "Core Web Vitals remediation"]
      },
      {
        step: "02",
        title: "On-Page Semantic & Content Engineering",
        duration: "Months 1-2",
        description: "Rewriting title tags, meta descriptions, H1-H3 hierarchies, and adding high-depth content clusters that establish topical authority.",
        highlights: ["Semantic header restructuring", "Topical cluster publishing", "Internal link graph optimization", "Schema markup integration"]
      },
      {
        step: "03",
        title: "Local SEO & High-Trust Link Acquisition",
        duration: "Ongoing",
        description: "Optimizing Google Business Profile for local 3-pack dominance and executing outreach campaigns for authoritative editorial backlinks.",
        highlights: ["Google Map Pack geo-tagging", "White-hat editorial outreach", "Citation cleanup & consistency", "Digital PR press releases"]
      },
      {
        step: "04",
        title: "Conversion Tracking & Continuous Optimization",
        duration: "Ongoing",
        description: "Monitoring daily ranking telemetry, reviewing user bounce rates, and adjusting strategy to capture emerging search opportunities.",
        highlights: ["Custom Google Looker Studio dashboard", "Keyword ranking rank-tracker", "Form & call conversion attribution", "Quarterly strategy reviews"]
      }
    ],
    techStack: [
      { name: "Ahrefs & SEMrush", role: "Keyword intelligence & backlink auditing" },
      { name: "Google Search Console", role: "Crawl telemetry & direct indexation management" },
      { name: "Screaming Frog", role: "Enterprise deep-crawl technical diagnostic" },
      { name: "Schema.org & JSON-LD", role: "Rich snippets & structured search entity signals" },
      { name: "Looker Studio", role: "Live 24/7 transparent client performance dashboards" }
    ],
    faqs: [
      {
        question: "How long does it take to see real results from SEO?",
        answer: "While technical fixes and local map enhancements often show movement in the first 30 to 45 days, sustainable organic dominance typically compounds between months 3 to 6. Unlike ads, once established, SEO delivers free leads for years."
      },
      {
        question: "Do you use safe, white-hat SEO techniques?",
        answer: "Exclusively. We adhere strictly to Google's Search Essentials and Webmaster Guidelines. We never use spammy link networks, hidden text, or automated low-quality articles that risk algorithmic penalties."
      },
      {
        question: "Can you help our business rank in the Google Maps Local 3-Pack?",
        answer: "Yes, our Local SEO blueprint includes complete Google Business Profile optimization, NAP (Name, Address, Phone) citation consistency, localized review acquisition strategies, and geo-targeted schema."
      },
      {
        question: "What does your monthly SEO report include?",
        answer: "You receive access to a live, automated dashboard and a monthly video debrief detailing exact keyword positions, organic visitor growth, top performing landing pages, and verified leads/phone calls generated."
      }
    ],
    caseStudyPreview: {
      client: "Capital Legal Partners",
      result: "Achieved #1 positions for 18 commercial legal keywords, resulting in a 240% lift in organic consultation requests.",
      metric: "Top 3 SERP",
      quote: "Our phone doesn't stop ringing. MarketingGlu took us from page 4 to dominating Google in Delhi NCR."
    },
    priceEstimate: "Starting from ₹20,000 / month",
    timelineEstimate: "Ongoing (3-Month Initial Cycle)"
  },
  {
    id: "graphic-design",
    tabLabel: "Branding & Design",
    category: "Brand Management & Creative Design",
    title: "Brand Management & Graphic Design",
    subtitle: "Brand Management, Product Campaigning Catalogs & High-Impact Visual Systems",
    summary: "Visual first impressions dictate brand trust. We develop end-to-end Brand Management frameworks, product campaigning catalogs, custom logo systems, marketing collateral, and high-impact digital graphics that instantly distinguish your business in competitive markets.",
    metricBadge: "Complete Vector & Brand Suite",
    metricSubtitle: "Brand Management & Catalog Design",
    icon: Palette,
    image: graphicDesignImg,
    heroStats: [
      { label: "Vector Assets", value: "100%", desc: "Infinite resolution master source files in AI, SVG & PDF" },
      { label: "Turnaround Speed", value: "48-72h", desc: "Rapid concept iteration with collaborative revision cycles" },
      { label: "Brand Recall Lift", value: "+210%", desc: "Standardized visual assets that build instant recognition" },
      { label: "File Formats", value: "All Types", desc: "Web, print, CMYK press, RGB digital, transparent PNGs" }
    ],
    idealFor: "Startups launching new ventures, established companies undergoing a rebrand, and businesses seeking elite Brand Management and Product Campaigning catalogs.",
    keyBenefits: [
      { title: "Strategic Brand Management", description: "Comprehensive brand positioning, style manuals, visual identity consistency, and brand perception management." },
      { title: "Product Campaigning & Catalog Design", description: "High-conversion product catalogs, digital lookbooks, brochure collections, and launch campaign assets." },
      { title: "Timeless Custom Logo Systems", description: "Bespoke identity marks with responsive variations for dark mode, light mode, app icons, and horizontal headers." },
      { title: "Press-Ready Print Production", description: "Executive business cards, corporate brochures, product packaging, and trade-show banners pre-calibrated in CMYK 300 DPI." }
    ],
    pillars: [
      {
        title: "Strategic Brand Management",
        description: "Brand positioning architecture, style guides, font systems, color palettes, and unified brand perception.",
        tag: "Brand Management"
      },
      {
        title: "Product Campaigning & Catalogs",
        description: "High-impact product launch collateral, digital catalogs, interactive lookbooks, and promotional sales kits.",
        tag: "Product Catalogs"
      },
      {
        title: "Memorable Logo Design Suites",
        description: "Versatile, timeless vector logos crafted with variants for dark, light, horizontal, and icon mark use.",
        tag: "Brand Mark"
      },
      {
        title: "Press-Ready Print Collateral",
        description: "Executive business cards, corporate brochures, flyers, event banners, and promotional merchandise.",
        tag: "Print Media"
      }
    ],
    deliverables: [
      "End-to-end Brand Management manual & style guidelines",
      "Product campaigning catalog & digital lookbook design",
      "Full editable source files (AI, SVG, EPS, PNG, PDF)",
      "Custom vector iconography & brand identity assets",
      "Executive business card & corporate stationery kit",
      "Social media profile kit and product promotional banners"
    ],
    methodology: [
      {
        step: "01",
        title: "Brand Archetype & Moodboarding",
        duration: "Days 1-3",
        description: "We interview key stakeholders to uncover brand personality, core values, audience tastes, and construct curated visual moodboards.",
        highlights: ["Brand personality audit", "Competitor visual audit", "Curated moodboard direction", "Color psychology selection"]
      },
      {
        step: "02",
        title: "Concept Exploration & Logo Drafting",
        duration: "Days 4-7",
        description: "Our senior design team drafts multiple distinct vector concepts illustrating your mark in diverse applications.",
        highlights: ["3 distinct concept directions", "Mockups on business cards & signboards", "Typography pairings", "Client review session"]
      },
      {
        step: "03",
        title: "Refinement & Style System Standardization",
        duration: "Days 8-10",
        description: "Polishing the chosen direction into an exhaustive brand book with spacing ratios, secondary palettes, and asset libraries.",
        highlights: ["Typography hierarchy manual", "Color palette specification (Hex, RGB, CMYK, Pantone)", "Sub-brand extensions"]
      },
      {
        step: "04",
        title: "Asset Production & Master Packaging",
        duration: "Days 11-14",
        description: "Exporting all master vector and raster assets organized cleanly in cloud folders ready for any printer, developer, or marketer.",
        highlights: ["AI, EPS, SVG, PDF, PNG exports", "Favicon package", "Social media templates", "Print-ready print setups"]
      }
    ],
    techStack: [
      { name: "Adobe Illustrator", role: "Mathematical vector drawing & typography" },
      { name: "Figma", role: "Digital design systems & collaborative prototyping" },
      { name: "Adobe Photoshop", role: "High-resolution photo editing & mockups" },
      { name: "Adobe InDesign", role: "Multi-page corporate print editorial layouts" },
      { name: "Adobe After Effects", role: "Animated logo stings & social motion assets" }
    ],
    faqs: [
      {
        question: "Do I get full commercial copyright and editable source files?",
        answer: "Yes, 100%. Upon final project completion and payment, all intellectual property rights belong exclusively to you. We provide master files in Adobe Illustrator (.AI), vector SVG, EPS, print-ready PDF, and high-res PNGs."
      },
      {
        question: "How many initial logo concepts will I receive?",
        answer: "We typically present 3 to 4 distinctly unique design directions with real-world mockups. You choose your preferred direction, and we refine it through unlimited minor revisions until it's perfect."
      },
      {
        question: "Can you redesign our existing logo without losing our established recognition?",
        answer: "Yes! Brand evolutions and logo modernizations are a core specialty. We can preserve your heritage equity while polishing line weights, typography, and digital versatility."
      },
      {
        question: "Can you create corporate brochures, product packaging, or event banners?",
        answer: "Absolutely. Our print studio designs packaging, executive brochures, stationery, exhibition booths, and merchandise with complete bleed lines and CMYK color calibration."
      }
    ],
    caseStudyPreview: {
      client: "Veritas Logistics & Freight",
      result: "Complete corporate rebranding rolled out across 40+ fleet vehicles, client portal, and international marketing decks.",
      metric: "100% Vector",
      quote: "The brand guidelines and new identity established our firm as an international tier-1 player overnight."
    },
    priceEstimate: "Starting from ₹15,000",
    timelineEstimate: "1 to 2 Weeks"
  },
  {
    id: "ppc",
    tabLabel: "Paid Ads & PPC",
    category: "Paid Ads (Google, Meta, LinkedIn & TikTok)",
    title: "Paid Ads & Performance Marketing",
    subtitle: "High-ROI Paid Ads Across Google Ads, Meta Ads, LinkedIn Ads & TikTok Ads",
    summary: "Eliminate wasted media spend and acquire high-intent buyers through precision Paid Ads. We manage high-converting ad funnels across Google Ads (Search, Display, Performance Max, YouTube), Meta Ads (Facebook & Instagram), LinkedIn Ads for B2B scale, and viral TikTok Ads.",
    metricBadge: "Full Multi-Touch ROAS Attribution",
    metricSubtitle: "Google, Meta, LinkedIn & TikTok Ads",
    icon: MousePointerClick,
    image: ppcImg,
    heroStats: [
      { label: "Average ROAS", value: "4.8x", desc: "Return on ad spend across active client campaigns" },
      { label: "Wasted Spend Cut", value: "-42%", desc: "Eliminated via negative keyword lists and bid suppression" },
      { label: "Launch Speed", value: "48 Hours", desc: "Fast campaign build from keyword research to live ads" },
      { label: "Conversion Tracking", value: "100%", desc: "Server-side GA4, Google Tag Manager & call tracking" }
    ],
    idealFor: "Companies needing immediate customer acquisition, product launches, or seasonal promotions across Google Ads, Meta Ads, LinkedIn, and TikTok.",
    keyBenefits: [
      { title: "Multi-Platform Paid Ads Domination", description: "Seamless coordination across Google Ads, Meta Ads (Instagram/Facebook), LinkedIn Ads, and TikTok Ads under a unified budget." },
      { title: "Aggressive Negative Keyword & Fraud Protection", description: "We protect your ad budget from being burned on low-intent queries, click farms, or irrelevant search traffic." },
      { title: "Dedicated High-Converting Landing Pages", description: "We pair your ads with dedicated, hyper-relevant landing pages that convert clicks into paying customers at 2x industry benchmarks." },
      { title: "Transparent Real-Time ROAS Telemetry", description: "Direct access to your ad accounts. You pay ad networks directly with zero markups and 24/7 transparent analytics." }
    ],
    pillars: [
      {
        title: "Google Ads & Paid Search Funnels",
        description: "Google Search, Display, Performance Max, Shopping, and YouTube Ads targeting users with immediate purchase intent.",
        tag: "Google Ads"
      },
      {
        title: "Meta Ads (Facebook & Instagram)",
        description: "High-CTR visual creatives, carousel ads, and vertical reel campaigns targeted at high-value consumer demographics.",
        tag: "Meta Ads"
      },
      {
        title: "LinkedIn Ads & TikTok Ads",
        description: "B2B executive lead acquisition via LinkedIn Ads and viral short-form video conversion funnels via TikTok Ads.",
        tag: "LinkedIn & TikTok Ads"
      },
      {
        title: "Dynamic Bid & ROAS Optimization",
        description: "Real-time algorithmic bid management, conversion attribution, and budget reallocation toward highest-profit channels.",
        tag: "Paid Ads ROAS"
      }
    ],
    deliverables: [
      "Google Ads management (Search, Display, Performance Max & YouTube)",
      "Meta Ads management (Facebook & Instagram Feed, Reels & Stories)",
      "LinkedIn Ads setup for high-ticket B2B decision-maker leads",
      "TikTok Ads for viral short-form video consumer campaigns",
      "Negative keyword pruning & click-fraud suppression filters",
      "Server-side conversion tracking (GA4, CAPI & Pixel) and live ROAS dashboards"
    ],
    methodology: [
      {
        step: "01",
        title: "Audience Profiling & Search Intent Research",
        duration: "Week 1",
        description: "Identifying high-commercial search terms, calculating target CPCs, analyzing competitor ad copies, and mapping campaign budgets.",
        highlights: ["Negative keyword compilation", "Search volume & CPC forecasting", "Competitor spend intelligence", "Account structure blueprint"]
      },
      {
        step: "02",
        title: "Conversion Tracking & Landing Page Setup",
        duration: "Week 1",
        description: "Deploying Google Tag Manager, server-side conversion webhooks, and crafting high-intent landing page copy and forms.",
        highlights: ["GA4 Conversion Event setup", "CallRail phone tracking setup", "CRM webhook integration", "Landing page speed check"]
      },
      {
        step: "03",
        title: "Campaign Build & Controlled Soft Launch",
        duration: "Week 2",
        description: "Drafting compelling ad headlines, configuring sitelinks and callout extensions, and launching with conservative bid strategies.",
        highlights: ["Responsive Search Ads (RSA) drafting", "Extension asset creation", "Dayparting schedule configuration", "Quality Score calibration"]
      },
      {
        step: "04",
        title: "Algorithmic Scaling & Bid Optimization",
        duration: "Weeks 3+",
        description: "Reviewing search term reports daily, pausing underperforming ad variations, and reallocating budget to peak converting keywords.",
        highlights: ["Daily search query audits", "Target CPA / Target ROAS automation", "Weekly lead audit calls", "Ongoing A/B copy tests"]
      }
    ],
    techStack: [
      { name: "Google Ads (Search & Performance Max)", role: "High-intent customer acquisition" },
      { name: "Google Tag Manager", role: "Precision event triggering & tag orchestration" },
      { name: "Google Analytics 4", role: "Multi-channel funnel & attribution modeling" },
      { name: "Looker Studio", role: "Automated real-time ROAS & CPC dashboards" },
      { name: "Hotjar / Microsoft Clarity", role: "Landing page heatmaps & user session recordings" }
    ],
    faqs: [
      {
        question: "How much should our business spend on Google Ads each month?",
        answer: "We recommend a minimum media budget of ₹25,000 to ₹50,000 per month for local/regional campaigns, or ₹1,00,000+ for nationwide campaigns. This ensures enough statistically significant data for rapid optimization."
      },
      {
        question: "Do you take a percentage of our ad spend or a flat management fee?",
        answer: "We offer transparent flat-rate monthly retainers or tiered management plans with no hidden percentages. You maintain full ownership of your Google Ads account and pay Google directly for media spend."
      },
      {
        question: "How quickly do we start seeing inquiries or phone calls?",
        answer: "As soon as campaigns are approved by Google (usually within 24 to 48 hours of launching), your ads begin appearing for active search queries, and inquiries can start arriving the very same day."
      },
      {
        question: "What happens if a keyword is getting clicks but not converting?",
        answer: "Our team conducts daily search query audits. We immediately add non-converting terms to negative keyword lists, test alternative ad copy, and refine landing page conversion triggers to stop wasted ad spend."
      }
    ],
    caseStudyPreview: {
      client: "Zenith Diagnostic Healthcare",
      result: "Reduced Cost-Per-Lead (CPL) by 54% while generating 420+ qualified patient inquiries per month with a 5.2x ROAS.",
      metric: "5.2x ROAS",
      quote: "MarketingGlu audited our chaotic Google Ads and cut our wasted spend by half while doubling our inbound patient calls."
    },
    priceEstimate: "Starting from ₹18,000 / month",
    timelineEstimate: "48-Hour Setup & Ongoing"
  },
  {
    id: "smo",
    tabLabel: "Social Media & Management",
    category: "Social Media & Management",
    title: "Social Media & Social Media Management (SMM & SMO)",
    subtitle: "Social Media Management, Product Campaigning Catalogs & Brand Community Growth",
    summary: "Transform social media into a predictable customer acquisition channel. We provide complete Social Media Management, high-converting Product Campaigning & Catalog promotions, branded reels and carousels, proactive community moderation, and strategic paid social growth across Instagram, Facebook, LinkedIn, TikTok, and YouTube.",
    metricBadge: "Compounding Organic Inbound Pipeline",
    metricSubtitle: "Social Media Management & Catalogs",
    icon: Megaphone,
    image: smoImg,
    heroStats: [
      { label: "Audience Reach", value: "350K+", desc: "Average organic and viral brand impressions per month" },
      { label: "Engagement CTR", value: "8.4%", desc: "High community interaction across reels, carousels & stories" },
      { label: "Posting Consistency", value: "100%", desc: "Scheduled editorial calendar delivered without missing dates" },
      { label: "Brand Sentiment", value: "98% Positive", desc: "Active community moderation & prompt reply shielding" }
    ],
    idealFor: "Brands seeking to build genuine authority, expand customer brand loyalty, and execute high-converting Product Campaigning and Social Media Management.",
    keyBenefits: [
      { title: "Full-Service Social Media Management", description: "Hands-off content publishing, creative caption writing, hashtag research, and consistent multi-platform distribution." },
      { title: "Product Campaigning & Catalog Showcases", description: "Structured product launch campaigns, digital catalog showcases, discount drops, and seasonal promotional rollouts." },
      { title: "Engaging Visual Content Creation", description: "Custom-branded graphics, educational carousels, engaging video reels, and interactive stories produced specifically for your niche." },
      { title: "Community Management & Reputation Shield", description: "Prompt comment responses, DM routing, and proactive engagement with prospective buyers in your industry." }
    ],
    pillars: [
      {
        title: "Social Media Management & Publishing",
        description: "Consistent posting schedules, editorial planning, and branded visuals that maintain top-of-mind awareness across channels.",
        tag: "Social Management"
      },
      {
        title: "Product Campaigning & Catalog Launches",
        description: "Promotional rollouts for new product catalogs, seasonal collections, lookbooks, and high-converting offer campaigns.",
        tag: "Product Campaigns"
      },
      {
        title: "Brand Management & Community Trust",
        description: "Active community relationship cultivation, DM routing, and prompt response moderation that turns followers into brand advocates.",
        tag: "Brand Management"
      },
      {
        title: "Paid Social Growth & Retargeting",
        description: "Targeted Meta Ads, TikTok Ads, and LinkedIn campaigns designed to retarget warm website visitors and drive sales.",
        tag: "Paid Social Funnels"
      }
    ],
    deliverables: [
      "End-to-end Social Media Management & scheduled multi-channel posting",
      "Product Campaigning & digital catalog promotional launches",
      "Custom monthly editorial calendar & content pillar roadmap",
      "Reel video editing, animated stories & educational carousel sets",
      "Brand management, active comment moderation & DM routing",
      "Monthly audience growth, engagement metrics & lead conversion reports"
    ],
    methodology: [
      {
        step: "01",
        title: "Channel Audit & Content Pillars Definition",
        duration: "Week 1",
        description: "Auditing current social channels, competitor content formats, and establishing 4-5 strategic content pillars (Educational, Proof, Entertainment, Authority).",
        highlights: ["Brand voice guidelines", "Profile bio & highlight makeover", "Audience demographic research", "Competitor viral content audit"]
      },
      {
        step: "02",
        title: "Monthly Editorial Calendar & Asset Creation",
        duration: "Week 2",
        description: "Producing monthly post graphics, video reels, captions, and carousel designs for client review and approval in advance.",
        highlights: ["Canva/Figma shared review board", "Hashtag strategy research", "Hook & caption copywriting", "Interactive story templates"]
      },
      {
        step: "03",
        title: "Scheduled Publishing & Active Community Outreach",
        duration: "Weeks 3-4",
        description: "Automated multi-channel scheduling paired with daily engagement, comment monitoring, and follower relationship nurturing.",
        highlights: ["Peak-hour automated posting", "Community question replies", "Strategic influencer tag mentions", "Bio funnel tracking"]
      },
      {
        step: "04",
        title: "Performance Analytics & Audience Iteration",
        duration: "Monthly",
        description: "Reviewing viral post metrics, audience demographic growth, profile link clicks, and tuning next month's content blueprint.",
        highlights: ["Monthly PDF growth report", "Top performing format review", "Lead conversion attribution", "Strategy tuning call"]
      }
    ],
    techStack: [
      { name: "Meta Business Suite", role: "Instagram & Facebook scheduling and analytics" },
      { name: "LinkedIn Campaign Manager", role: "B2B professional audience targeting" },
      { name: "Canva Pro & Figma", role: "Brand asset templates and graphic creation" },
      { name: "CapCut & Premiere Pro", role: "Short-form vertical video & reel production" },
      { name: "Sprout Social / Buffer", role: "Cross-platform analytics and scheduling" }
    ],
    faqs: [
      {
        question: "Which social media platforms will you manage for our business?",
        answer: "We typically manage Instagram, Facebook, LinkedIn, and YouTube/X depending on your target customer. For B2B businesses, we heavily emphasize LinkedIn and Twitter; for D2C and local lifestyle brands, we focus on Instagram and Facebook."
      },
      {
        question: "Do we get to review and approve the posts before they go live?",
        answer: "Yes, always! We deliver a complete monthly content calendar with finished graphics, captions, and hashtags at least 5 days before the month begins for your review and sign-off."
      },
      {
        question: "Do you also create vertical reels and short videos?",
        answer: "Yes! Short-form video (Instagram Reels and YouTube Shorts) is currently the highest-performing organic reach format. We script, edit, and caption engaging vertical videos using your product/business footage."
      },
      {
        question: "How do you measure success in social media marketing?",
        answer: "We look beyond vanity likes. We measure reach growth, profile link clicks, direct messages (inbound leads), website referrals, and follower retention rate through transparent monthly reports."
      }
    ],
    caseStudyPreview: {
      client: "TechDuniya",
      result: "Achieved 320,000+ audience reach and +180% organic inbound inquiries with an 8.4% engagement CTR in 90 days.",
      metric: "320K Reach",
      quote: "MarketingGlu turned our dead social profiles into our number one referral engine for new tech buyer leads."
    },
    priceEstimate: "Starting from ₹16,000 / month",
    timelineEstimate: "Monthly Ongoing Engagement"
  }
];
