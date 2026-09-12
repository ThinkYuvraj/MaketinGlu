import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Calendar, 
  TrendingUp, 
  Code, 
  CreditCard,
  FileCheck
} from 'lucide-react';
import { standardEase } from '../lib/animations';

interface FAQItem {
  id: number;
  category: 'roi' | 'seo' | 'web' | 'pricing' | 'process';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const faqs: FAQItem[] = [
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
    answer: "No reputable, ethical agency can guarantee a fixed #1 Google rank, and Google's official documentation explicitly warns against any agency making this claim. What Marketing LU guarantees is a battle-tested, 100% white-hat technical and editorial framework: sub-second Core Web Vitals optimization, high-intent transactional keyword architecture, structured JSON-LD schema data, and authentic contextual backlink acquisition. Over 94% of our client target keywords rank within Google's top 5 positions within 3 to 6 months.",
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
    answer: "Your advertising media spend is billed directly by Google Ads, Meta (Instagram/Facebook), and LinkedIn to your company credit card or GST-registered billing profile. Marketing LU never charges hidden commissions, markups, or cuts on your media spend. You pay Marketing LU a transparent, flat or tiered monthly management retainer covering campaign architecture, conversion copywriting, daily bid optimization, negative keyword audits, and A/B ad creative production.",
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

const categoryFilters = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'roi', label: 'Results & ROI', icon: TrendingUp },
  { id: 'seo', label: 'SEO & Search', icon: Sparkles },
  { id: 'web', label: 'Web & Ownership', icon: Code },
  { id: 'pricing', label: 'Ad Spend & Pricing', icon: CreditCard },
  { id: 'process', label: 'Contracts & Onboarding', icon: FileCheck },
];

export default function FAQ() {
  const [openIds, setOpenIds] = useState<number[]>([1]); // First item open by default for immediate engagement
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggle = (id: number) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(i => i !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const expandAll = () => {
    setOpenIds(filteredFaqs.map(f => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesText = 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.categoryLabel.toLowerCase().includes(query) ||
        (faq.highlights && faq.highlights.some(h => h.toLowerCase().includes(query)));

      return matchesCategory && matchesText;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Questions
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Clear, honest answers regarding campaign turnaround, Google ranking guarantees, code ownership, and ad spend management.
          </p>

          {/* Quick trust metrics */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1122] border border-slate-800 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              100% Asset Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1122] border border-slate-800 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Month-to-Month Flexibility
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1122] border border-slate-800 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              No Hidden Media Markups
            </span>
          </div>
        </div>

        {/* Interactive Search Bar and Controls */}
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword (e.g. 'rankings', 'ownership', 'spend', 'ROI')..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#090e1c] border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400/80 transition-colors shadow-inner"
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Expand / Collapse All Toggle */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoryFilters.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-[#090e1a] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-[#0a0f1d] border border-slate-800">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">No matching questions found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching a different term or reset your category filters.
              </p>
              <button
                type="button"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#0a1122] border-cyan-500/40 shadow-xl shadow-cyan-500/5'
                      : 'bg-[#090e1a] border-slate-800/80 hover:border-slate-700/90'
                  }`}
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-start justify-between gap-4 text-left transition-colors cursor-pointer min-h-[56px]"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 mt-0.5 ${
                      isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: standardEase }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-5 pt-2 border-t border-slate-800/60 space-y-4">
                          <p className="text-xs sm:text-sm lg:text-[15px] text-slate-300 leading-relaxed">
                            {faq.answer}
                          </p>

                          {/* Feature Highlights Pills inside answer */}
                          {faq.highlights && faq.highlights.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              {faq.highlights.map((item, hIdx) => (
                                <span
                                  key={hIdx}
                                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-lg"
                                >
                                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions inquiry box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0b1222] via-[#0d172e] to-[#0a1020] border border-slate-800/90 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-cyan-400 font-bold">
              <Sparkles className="w-3 h-3" />
              Direct Strategic Access
            </div>
            <h4 className="text-base sm:text-lg lg:text-xl font-extrabold text-white">
              Have a specific question about your brand's growth?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our New Delhi digital marketing architects are available for a confidential review of your current search visibility, ad performance, and technical architecture.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/+919654596149?text=${encodeURIComponent('Hi Marketing LU, I have a specific question regarding your digital marketing services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Strategy</span>
            </a>

            <a
              href="#banner-bottom"
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 hover:brightness-110"
            >
              <span>Schedule Free Audit</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
