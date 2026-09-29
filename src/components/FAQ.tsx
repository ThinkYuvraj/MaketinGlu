import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Search, 
  Sparkles, 
  MessageCircle,
  ShieldCheck, 
  Calendar, 
  TrendingUp, 
  Code, 
  CreditCard, 
  FileCheck, 
  X, 
  Plus, 
  Minus,
  CheckCircle2
} from 'lucide-react';
import { standardEase } from '../lib/animations';
import Container from './common/Container';
import { useSiteConfig } from '../context/SiteConfigContext';
import { defaultFaqs, FAQItem } from '../data/faqData';

const categoryFilters = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'roi', label: 'Results & ROI', icon: TrendingUp },
  { id: 'seo', label: 'SEO & Search', icon: Sparkles },
  { id: 'web', label: 'Web & Ownership', icon: Code },
  { id: 'pricing', label: 'Ad Spend & Pricing', icon: CreditCard },
  { id: 'process', label: 'Contracts & Onboarding', icon: FileCheck },
];

export default function FAQ() {
  const { config } = useSiteConfig();
  const faqs = config.faqs && config.faqs.length > 0 ? config.faqs : defaultFaqs;

  const [openIds, setOpenIds] = useState<(number | string)[]>([faqs[0]?.id || 1]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggle = (id: number | string) => {
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

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqs.length };
    faqs.forEach(f => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, [faqs]);

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
  }, [activeCategory, searchQuery, faqs]);

  const renderFaqAccordionItem = (faq: FAQItem) => {
    const isOpen = openIds.includes(faq.id);

    return (
      <div
        key={faq.id}
        className={`w-full shrink-0 rounded-2xl border transition-all duration-200 overflow-hidden ${
          isOpen
            ? 'bg-[#0b1429] border-cyan-400/80 shadow-lg shadow-cyan-500/10'
            : 'bg-[#090f20]/90 border-slate-800 hover:border-cyan-500/40 hover:bg-[#0c1630]'
        }`}
        id={`faq-item-${faq.id}`}
      >
        <button
          type="button"
          onClick={() => toggle(faq.id)}
          className="w-full min-h-[54px] sm:min-h-[58px] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span className="shrink-0 inline-flex items-center w-fit text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-md">
              {faq.categoryLabel}
            </span>
            <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight leading-snug">
              {faq.question}
            </h3>
          </div>

          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ml-2 ${
            isOpen ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}>
            {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: standardEase }}
              className="overflow-hidden border-t border-slate-800/80 bg-[#060a16]"
            >
              <div className="p-4 sm:p-5 space-y-3">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {faq.answer}
                </p>

                {/* Feature Highlights */}
                {faq.highlights && faq.highlights.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                    {faq.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 px-2.5 py-1 rounded-lg shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
  };

  return (
    <section id="faq" className="relative flex flex-col justify-center py-8 sm:py-10 lg:py-12 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <Container className="relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wider uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>{config.faqSectionBadge || 'Knowledge Base'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {config.faqSectionTitle1 || 'Frequently Asked'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              {config.faqSectionTitle2 || 'Questions'}
            </span>
          </h2>

          <p className="mt-2 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {config.faqSectionDescription || 'Direct answers regarding campaign timelines, Google rankings, code ownership, and media billing.'}
          </p>

          {/* Trust badges */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#090e1c] border border-slate-800 text-slate-300 text-[11px] sm:text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              100% Asset Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#090e1c] border border-slate-800 text-slate-300 text-[11px] sm:text-xs">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Month-to-Month Retainers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#090e1c] border border-slate-800 text-slate-300 text-[11px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Zero Media Markups
            </span>
          </div>
        </div>

        {/* Controls Toolbar: Search + Category Chips + Expand/Collapse */}
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-[1180px] mx-auto mb-6 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. 'rankings', 'ownership', 'pricing', 'ROI')..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#090e1c] border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Modular Category Chips & Expand Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categoryFilters.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer min-h-[36px] ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-[#090e1c] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs text-slate-400">
                Showing <strong className="text-cyan-400">{filteredFaqs.length}</strong> questions
              </span>

              <button
                type="button"
                onClick={openIds.length === filteredFaqs.length ? collapseAll : expandAll}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-500/30 transition-colors cursor-pointer min-h-[36px] flex items-center gap-1"
              >
                <span>{openIds.length === filteredFaqs.length ? 'Collapse All' : 'Expand All'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SCROLLABLE FLEXBOX LIST OF QUESTIONS (Exact match to Packages Card size) */}
        <div className="relative max-w-4xl lg:max-w-5xl xl:max-w-[1120px] 2xl:max-w-[1180px] w-full mx-auto px-2 sm:px-6 lg:px-8">
          <div className="w-full min-h-[560px] lg:min-h-[500px] rounded-3xl sm:rounded-[32px] overflow-hidden p-5 sm:p-7 lg:p-8 shadow-2xl backdrop-blur-2xl bg-gradient-to-b from-[#0e1628]/98 via-[#0a101e]/98 to-[#060a14]/98 border border-cyan-500/35 flex flex-col justify-between relative">
            
            {/* Scroll Guidance Header Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-800/80 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 text-cyan-300 font-bold">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>FAQ Knowledge Directory ({filteredFaqs.length} Questions)</span>
              </span>
              <span className="text-slate-400 hidden sm:inline font-sans">
                Scroll inside box to browse all questions &darr;
              </span>
            </div>

            {/* Scrollable Flexbox Container with flex-1 and smooth scrolling */}
            <div className="flex-1 w-full flex flex-col space-y-3 max-h-[460px] lg:max-h-[440px] overflow-y-auto pr-2 custom-scrollbar focus:outline-none">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl border border-slate-800 bg-[#090e1c] my-auto">
                  <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">No questions match your search</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try a different keyword or reset active filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-colors cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredFaqs.map(renderFaqAccordionItem)
              )}
            </div>

            {/* Bottom Footer Strip */}
            <div className="pt-3.5 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Verified technical &amp; commercial campaign guidelines</span>
              </span>
              <span className="font-mono text-slate-400 text-xs">
                100% Transparency
              </span>
            </div>

          </div>
        </div>

        {/* Bottom Compact Requirement Inquiry Box */}
        <div className="faq-inquiry mt-5 sm:mt-6 p-3 sm:py-3.5 sm:px-5 rounded-xl bg-[#090f20]/90 border border-slate-800/90 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-left w-full md:w-auto">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                Have a specific question about your brand's growth roadmap?
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                Speak directly with our senior growth architects in New Delhi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end mt-0.5 md:mt-0">
            <a
              href={`https://wa.me/+919654596149?text=${encodeURIComponent('Hi MarketinGlu, I have a specific question regarding your digital marketing services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-3 py-1.5 sm:py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[34px] sm:min-h-[36px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="#/services"
              className="flex-1 md:flex-none px-3.5 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 hover:brightness-110 min-h-[34px] sm:min-h-[36px] whitespace-nowrap"
            >
              <span>Explore Services &rarr;</span>
            </a>
          </div>
        </div>

      </Container>
    </section>
  );
}

