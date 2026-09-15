import { useState, useMemo, useRef } from 'react';
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
  List,
  LayoutGrid
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

  const [openIds, setOpenIds] = useState<(number | string)[]>([faqs[0]?.id || 1]); // First item open for preview
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layoutMode, setLayoutMode] = useState<'list' | 'cards'>('list');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Unified List Layout Item (Flexbox Row format)
  const renderListItem = (faq: FAQItem) => {
    const isOpen = openIds.includes(faq.id);

    return (
      <div
        key={faq.id}
        className={`transition-colors duration-200 ${
          isOpen ? 'bg-[#0a1226]/90' : 'hover:bg-slate-900/40'
        }`}
        id={`faq-list-item-${faq.id}`}
      >
        <button
          type="button"
          onClick={() => toggle(faq.id)}
          className="w-full px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
          aria-expanded={isOpen}
        >
          {/* Flexbox container for Category Tag + Question title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 flex-1 min-w-0 flex-wrap sm:flex-nowrap">
            <span className="shrink-0 text-[9px] sm:text-[9.5px] font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/25 px-2 py-0.5 rounded">
              {faq.categoryLabel}
            </span>
            <h3 className="text-xs sm:text-[13.5px] font-bold text-white tracking-tight leading-snug">
              {faq.question}
            </h3>
          </div>

          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200 ${
            isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}>
            {isOpen ? <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: standardEase }}
              className="overflow-hidden bg-[#080e1c]/80 border-t border-slate-800/60"
            >
              <div className="px-4 pb-4 pt-2.5 sm:px-5 sm:pb-5 space-y-2.5">
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>

                {/* Feature Highlights */}
                {faq.highlights && faq.highlights.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {faq.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded-md"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
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

  // Card Format Item (Flexbox Row Header)
  const renderCard = (faq: FAQItem) => {
    const isOpen = openIds.includes(faq.id);

    return (
      <div
        key={faq.id}
        className={`rounded-xl border transition-all duration-200 overflow-hidden shrink-0 ${
          isOpen
            ? 'bg-[#0a1226] border-cyan-500/40 shadow-md shadow-cyan-500/5 ring-1 ring-cyan-500/20'
            : 'bg-[#090e1c]/90 border-slate-800/90 hover:border-slate-700 hover:bg-[#0a1022]'
        }`}
        id={`faq-card-${faq.id}`}
      >
        <button
          type="button"
          onClick={() => toggle(faq.id)}
          className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 flex-wrap sm:flex-nowrap">
            <span className="shrink-0 text-[9px] sm:text-[9.5px] font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/50 border border-cyan-500/20 px-1.5 py-0.5 rounded">
              {faq.categoryLabel}
            </span>
            <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-snug">
              {faq.question}
            </h3>
          </div>

          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200 ${
            isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}>
            {isOpen ? <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: standardEase }}
              className="overflow-hidden"
            >
              <div className="px-3.5 pb-3.5 pt-1 sm:px-4 sm:pb-4 border-t border-slate-800/60 space-y-2.5 bg-[#080d1a]/60">
                <p className="text-[12px] sm:text-xs text-slate-300 leading-relaxed pt-1.5">
                  {faq.answer}
                </p>

                {/* Feature Highlights */}
                {faq.highlights && faq.highlights.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {faq.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded-md"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
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
    <section id="faq" className="relative flex flex-col justify-center py-16 sm:py-20 lg:py-28 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white ">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[220px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold tracking-wide uppercase mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>{config.faqSectionBadge || 'Knowledge Base'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {config.faqSectionTitle1 || 'Frequently Asked'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              {config.faqSectionTitle2 || 'Questions'}
            </span>
          </h2>

          <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            {config.faqSectionDescription || 'Direct answers regarding campaign timelines, Google rankings, code ownership, and media billing.'}
          </p>

          {/* Trust badges */}
          <div className="mt-4 sm:mt-5 flex flex-row items-center justify-start sm:justify-center gap-2.5 sm:gap-3 text-[10.5px] sm:text-[11px] overflow-x-auto hide-scrollbar w-[calc(100%+32px)] sm:w-full -mx-4 sm:mx-0 px-4 sm:px-0 pb-2 sm:pb-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090e1c] border border-slate-800 text-slate-300 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              100% Asset Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090e1c] border border-slate-800 text-slate-300 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Month-to-Month Retainers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090e1c] border border-slate-800 text-slate-300 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Zero Media Markups
            </span>
          </div>
        </div>

        {/* Controls Toolbar: Search + Category Chips + Layout & Expansion */}
        <div className="max-w-3xl mx-auto mb-4 space-y-2.5">
          {/* Compact Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., 'rankings', 'ownership', 'spend', 'ROI')..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#090e1c] border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400/80 transition-colors shadow-inner"
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Modular Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categoryFilters.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-xs shadow-cyan-500/20'
                      : 'bg-[#090e1c] border border-slate-800/90 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                  <span className={`text-[9.5px] px-1 rounded ${
                    isActive ? 'bg-slate-950/20 text-slate-900 font-extrabold' : 'bg-slate-800/80 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Toolbar: Layout Mode Switcher & Quick Actions */}
          <div className="flex items-center justify-between gap-2 pt-1 px-1">
            <span className="text-[11px] text-slate-400 font-medium">
              Showing <strong className="text-cyan-400 font-semibold">{filteredFaqs.length}</strong> questions
            </span>

            <div className="flex items-center gap-2">
              {/* Layout Switcher */}
              <div className="flex items-center p-0.5 rounded-lg bg-[#090e1c] border border-slate-800">
                <button
                  type="button"
                  onClick={() => setLayoutMode('list')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    layoutMode === 'list'
                      ? 'bg-cyan-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="List Layout Format"
                >
                  <List className="w-3 h-3" />
                  <span>List Layout</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('cards')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    layoutMode === 'cards'
                      ? 'bg-cyan-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Card Grid Format"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Cards</span>
                </button>
              </div>

              {/* Expand / Collapse All */}
              <button
                type="button"
                onClick={openIds.length === filteredFaqs.length ? collapseAll : expandAll}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded hover:bg-cyan-950/40 transition-colors cursor-pointer"
              >
                {openIds.length === filteredFaqs.length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ LIST / FLEXBOX CONTAINER */}
        <div className="max-w-3xl mx-auto flex flex-col">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 px-4">
              <HelpCircle className="w-6 h-6 text-slate-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-white">No questions match your filter</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Try a different keyword or reset filters.
              </p>
              <button
                type="button"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-3 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : layoutMode === 'list' ? (
            /* LIST LAYOUT FORMAT (Flexbox with subtle dividers) */
            <div 
              ref={scrollContainerRef}
              className="flex flex-col divide-y divide-slate-800/80 rounded-2xl border border-slate-800/90 bg-[#090e1c]/80 overflow-hidden shadow-2xl backdrop-blur-sm"
              tabIndex={0}
              aria-label="Frequently asked questions list layout"
            >
              {filteredFaqs.map(renderListItem)}
            </div>
          ) : (
            /* CARD FORMAT (Individual Flexbox Cards) */
            <div 
              ref={scrollContainerRef}
              className="flex flex-col gap-2.5 w-full"
              tabIndex={0}
              aria-label="Frequently asked questions cards"
            >
              {filteredFaqs.map(renderCard)}
            </div>
          )}
        </div>

        {/* Compact Inquiry Strip */}
        <div className="faq-inquiry mt-6 p-4 sm:p-4.5 rounded-xl bg-gradient-to-r from-[#0b1222] via-[#0d172e] to-[#0a1020] border border-slate-800 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 hidden sm:flex text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">
                Have a specific question about your brand's growth?
              </h4>
              <p className="text-[10.5px] sm:text-[11px] text-slate-400 mt-0.5">
                Speak directly with our senior digital marketing strategists.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <a
              href={`https://wa.me/+919654596149?text=${encodeURIComponent('Hi MarketingGlu, I have a specific question regarding your digital marketing services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Strategy</span>
            </a>

            <a
              href="#banner-bottom"
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs shadow-cyan-500/20 hover:brightness-110"
            >
              <span>Schedule Audit</span>
            </a>
          </div>
        </div>

      </Container>
    </section>
  );
}
