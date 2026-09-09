import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ShoppingBag, 
  Search, 
  Palette, 
  MousePointerClick, 
  Megaphone, 
  Bot,
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  LayoutGrid,
  Layers,
  Zap,
  TrendingUp,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion, buttonHoverMotion, standardEase } from '../lib/animations';

import websiteDesignImg from '../assets/website-design.png';
import ecommerceImg from '../assets/ecommerce-design.png';
import graphicDesignImg from '../assets/graphic-design.png';
import seoImg from '../assets/seo-optimization.png';
import ppcImg from '../assets/ppc-campaigns.png';
import smoImg from '../assets/smo-optimization.png';

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
  pillars: {
    title: string;
    description: string;
    tag: string;
  }[];
  deliverables: string[];
}

const expertiseData: ExpertiseItem[] = [
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

interface CompanyExpertiseProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export default function CompanyExpertise({ onOpenConsultation }: CompanyExpertiseProps) {
  const [activeTabId, setActiveTabId] = useState<string>("web-design");
  const [viewMode, setViewMode] = useState<"detail" | "grid">("detail");

  // Sync with URL hash if user clicks #web-design, #ecommerce, #seo, #graphic-design, #ppc, #smo
  useEffect(() => {
    const handleHash = () => {
      let hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'smm') hash = 'smo';
      if (hash === 'design') hash = 'graphic-design';
      if (hash === 'websites') hash = 'web-design';
      if (hash === 'search') hash = 'seo';
      
      const match = expertiseData.find(item => item.id === hash);
      if (match) {
        setActiveTabId(match.id);
        setViewMode("detail");
        const element = document.getElementById("expertise");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activeExpertise = expertiseData.find(item => item.id === activeTabId) || expertiseData[0];
  const ActiveIcon = activeExpertise.icon;

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    setViewMode("detail");
  };

  return (
    <section id="expertise" className="relative py-20 lg:py-28 bg-[#070b14] border-t border-slate-800/80 overflow-hidden">
      {/* Invisible anchor targets so old links still resolve smoothly */}
      <span id="services" className="absolute -top-24" />
      <span id="capabilities" className="absolute -top-24" />
      <span id="web-design" className="absolute -top-24" />
      <span id="ecommerce" className="absolute -top-24" />
      <span id="seo" className="absolute -top-24" />
      <span id="graphic-design" className="absolute -top-24" />
      <span id="ppc" className="absolute -top-24" />
      <span id="smo" className="absolute -top-24" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR CORE EXPERTISE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            End-to-End Digital Solutions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Engineered for Growth
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Eliminate fragmented vendors. Explore our verified domain capabilities, battle-tested methodologies, and high-impact deliverables.
          </p>

          {/* View Mode Toggle (Deep Dive vs. All Services Grid) - Mobile optimized with 44px tap targets */}
          <div className="mt-6 sm:mt-7 w-full sm:w-auto inline-flex items-center p-1 rounded-xl bg-[#0a1120] border border-slate-800 shadow-inner">
            <button
              onClick={() => setViewMode("detail")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                viewMode === "detail"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="view-mode-detail-btn"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Deep Dive</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="view-mode-grid-btn"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All 6 Disciplines Grid</span>
            </button>
          </div>
        </div>

        {/* Tab Selector Pills: Touch-scrollable horizontally on mobile, stretched on wide screens */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
            {expertiseData.map((item) => {
              const Icon = item.icon;
              const isActive = activeTabId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border min-h-[44px] shrink-0 ${
                    isActive
                      ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10 scale-[1.02]"
                      : "bg-[#0a1120] border-slate-800/90 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                  id={`expertise-tab-${item.id}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MODE 1: Interactive Featured Deep-Dive (Default, stretches wide on desktop) */}
        {viewMode === "detail" && (
          <div className="space-y-10 sm:space-y-12">
            
            {/* Main Showcase Card: Animated Crossfade Switch on Category Change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExpertise.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: standardEase }}
                className="rounded-3xl bg-[#090f1f] border border-cyan-500/30 shadow-2xl p-5 sm:p-8 lg:p-12 xl:p-14 2xl:p-16 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
                  
                  {/* Left Column: Narrative, Pillars, Deliverables & Actions */}
                  <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 space-y-6 sm:space-y-7">
                    
                    {/* Category Pill */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                        {activeExpertise.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        {activeExpertise.title}
                      </h3>
                      <p className="text-cyan-300 text-xs sm:text-sm md:text-base font-semibold mt-1.5 sm:mt-2">
                        {activeExpertise.subtitle}
                      </p>
                    </div>

                    {/* Summary Narrative */}
                    <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                      {activeExpertise.summary}
                    </p>

                    {/* Core Architectural Pillars Grid */}
                    <div className="space-y-3 pt-1">
                      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Core Architectural Pillars</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                        {activeExpertise.pillars.map((pillar, idx) => (
                          <div 
                            key={idx}
                            className="p-3.5 sm:p-4 rounded-xl bg-[#0d162b] border border-slate-800/80 hover:border-cyan-500/30 transition-colors group"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {pillar.title}
                              </span>
                              <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">
                                {pillar.tag}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Included Deliverables Checklist */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#0b1326] border border-cyan-500/20">
                      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Turnkey Deliverables Guarantee</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeExpertise.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons: Request Consultation & WhatsApp - Mobile responsive & touch-friendly */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <motion.button
                        {...buttonHoverMotion}
                        onClick={() => onOpenConsultation(activeExpertise.title)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-lg shadow-cyan-500/25 cursor-pointer min-h-[48px]"
                        id={`cta-expertise-book-${activeExpertise.id}`}
                      >
                        <span>Book Consultation for {activeExpertise.tabLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <motion.a
                        {...buttonHoverMotion}
                        href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi MarketingGlu, I would like to inquire about your ${activeExpertise.title} services.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 min-h-[48px]"
                        id={`cta-expertise-whatsapp-${activeExpertise.id}`}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>WhatsApp Direct (+91 96545 96149)</span>
                      </motion.a>
                    </div>

                  </div>

                  {/* Right Column: Stretches gracefully on wide desktop, safe on mobile */}
                  <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 flex justify-center w-full">
                    <div className="relative group w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                      
                      {/* Ambient outer backlight glow */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-blue-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />
                      
                      <div className="relative rounded-2xl bg-[#0b1324] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 sm:p-4">
                        <img 
                          src={activeExpertise.image} 
                          alt={`${activeExpertise.title} Showcase`} 
                          className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-[420px] 2xl:h-[480px] rounded-xl object-cover transform transition duration-500 group-hover:scale-[1.02]" 
                        />
                        
                        {/* Floating Metric Card Overlay */}
                        <div className="mt-3.5 sm:mt-4 bg-[#070b14]/95 border border-cyan-500/40 rounded-xl p-3 sm:p-3.5 shadow-xl flex items-center gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                            <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                              {activeExpertise.metricSubtitle}
                            </div>
                            <div className="text-xs sm:text-sm font-extrabold text-cyan-300 truncate">
                              {activeExpertise.metricBadge}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick-Switch Thumbnails for the Other Disciplines - Stretches across the wide monitor */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Switch to Another Discipline
                </h4>
                <button 
                  onClick={() => setViewMode("grid")}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View all 6 in matrix</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <motion.div 
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 xl:gap-4 2xl:gap-5"
              >
                {expertiseData.map((item) => {
                  const Icon = item.icon;
                  const isSelected = item.id === activeTabId;
                  return (
                    <motion.button
                      key={item.id}
                      variants={staggerItemVariants}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectTab(item.id)}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-colors duration-200 cursor-pointer flex flex-col justify-between min-h-[96px] ${
                        isSelected
                          ? "bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/10"
                          : "bg-[#090f1e] border-slate-800/80 hover:border-slate-700 hover:bg-[#0b1326]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-400'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>
                      <div>
                        <div className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {item.tabLabel}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {item.category.split('&')[0]}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

          </div>
        )}

        {/* MODE 2: Comprehensive 6-Discipline Grid View - Stretches on desktop */}
        {viewMode === "grid" && (
          <div className="space-y-8">
            <motion.div 
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10"
            >
              {expertiseData.map((item) => {
                const Icon = item.icon;
                const isSelected = item.id === activeTabId;
                return (
                  <motion.div
                    key={item.id}
                    variants={staggerItemVariants}
                    {...cardHoverMotion}
                    className={`rounded-2xl p-5 sm:p-7 xl:p-8 transition-colors duration-300 flex flex-col justify-between border ${
                      isSelected
                        ? "bg-[#0c1426] border-cyan-400 shadow-xl shadow-cyan-500/10"
                        : "bg-[#0a1120] border-slate-800/90 hover:border-cyan-500/40"
                    }`}
                    id={`expertise-card-${item.id}`}
                  >
                    <div>
                      {/* Card Header: Icon + Category Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                          {item.tabLabel}
                        </span>
                      </div>

                      {/* Title & One-Liner */}
                      <h3 className="text-lg xl:text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                        {item.summary}
                      </p>

                      {/* Pillars preview tags */}
                      <div className="space-y-2 mb-6">
                        {item.pillars.slice(0, 3).map((p, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{p.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action: View Deep Dive + Quick Quote */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleSelectTab(item.id)}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer min-h-[36px]"
                      >
                        <span>Explore Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <motion.button
                        {...buttonHoverMotion}
                        onClick={() => onOpenConsultation(item.title)}
                        className="px-3.5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-bold transition-colors cursor-pointer min-h-[36px]"
                      >
                        Get Quote
                      </motion.button>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>

            {/* Additional Specialized Automation Capabilities Pill (from GrowthServices) */}
            <div className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-[#091224] via-[#0d1a33] to-[#0a1426] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Need AI Chatbots or Advanced Lead Automation?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    We also engineer custom 24/7 lead qualification chatbots, CRM automations, and omni-channel messaging bots.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenConsultation("AI Chatbot & Automation Solutions")}
                className="w-full md:w-auto shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
              >
                Inquire About Automations
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
