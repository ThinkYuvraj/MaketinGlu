import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Target, 
  Layers, 
  BarChart3, 
  Rocket, 
  HeartHandshake, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Globe, 
  Star,
  Check,
  ExternalLink
} from 'lucide-react';
import { CustomSection, CustomSectionItem } from '../types';
import Container from './common/Container';

interface CustomSectionRendererProps {
  section: CustomSection;
  onOpenConsultation?: (topic?: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  Zap,
  CheckCircle2,
  Target,
  Layers,
  BarChart3,
  Rocket,
  HeartHandshake,
  Globe,
  Star,
};

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({
  section,
  onOpenConsultation,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  if (!section.enabled) return null;

  const items = section.items || [];
  const totalItems = items.length;

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentCardIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentCardIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <Sparkles className="w-5 h-5 text-cyan-400" />;
    const Component = iconMap[iconName] || Sparkles;
    return <Component className="w-5 h-5 text-cyan-400" />;
  };

  const handleCtaClick = (link?: string, text?: string) => {
    if (!link || link === '#consultation' || link === '#audit') {
      onOpenConsultation?.(text || section.title);
    } else if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (link.startsWith('#')) {
      const el = document.querySelector(link);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCard = (item: CustomSectionItem, idx: number) => (
    <div
      key={item.id || idx}
      className="group relative rounded-2xl bg-[#090e1c] border border-slate-800/90 hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 h-full"
    >
      <div>
        {/* Top Bar: Tag & Icon */}
        <div className="flex items-center justify-between mb-5">
          {item.tag ? (
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
              {item.tag}
            </span>
          ) : (
            <span />
          )}
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 transition-transform">
            {renderIcon(item.icon)}
          </div>
        </div>

        {/* Item Image (if any) */}
        {item.imageUrl && (
          <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800 aspect-video bg-[#070b14]">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}

        {/* Title & Description */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Optional Metric Stat Box */}
      {(item.statValue || item.statLabel) && (
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">{item.statLabel}</span>
          <span className="text-base font-extrabold text-cyan-400 font-mono">{item.statValue}</span>
        </div>
      )}
    </div>
  );

  return (
    <section 
      id={section.id} 
      className="relative flex flex-col justify-center py-16 sm:py-20 lg:py-28 bg-[#070b14] border-t border-slate-800/80"
    >
      {/* Sleek separation glow divider line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-slate-700/60 to-transparent pointer-events-none" />

      {/* Subtle background ambient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          {section.badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-3 shadow-sm shadow-cyan-500/10">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{section.badge}</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {section.title}{' '}
            {section.titleHighlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                {section.titleHighlight}
              </span>
            )}
          </h2>

          {section.description && (
            <p className="mt-3.5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {section.description}
            </p>
          )}
        </div>

        {/* LAYOUT: CARDS */}
        {section.layout === 'cards' && items.length > 0 && (
          <>
            {/* Desktop Grid (>=1024px) */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {renderCard(item, idx)}
                </motion.div>
              ))}
            </div>

            {/* Mobile & Tablet (<1024px) Caret Carousel */}
            <div className="block lg:hidden relative max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-[11px] font-medium text-slate-400">
                  Feature {currentCardIndex + 1} of {totalItems}
                </span>
                <span className="text-[11px] text-cyan-400 font-mono">
                  Swipe or use carets &rarr;
                </span>
              </div>

              <div className="relative overflow-hidden px-1 min-h-[360px]">
                <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
                  <motion.div
                    key={items[currentCardIndex]?.id || currentCardIndex}
                    custom={slideDirection}
                    initial={{ x: slideDirection === 'right' ? '100%' : '-100%', opacity: 0.2 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: slideDirection === 'right' ? '-100%' : '100%', opacity: 0.2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -35) handleNext();
                      else if (info.offset.x > 35) handlePrev();
                    }}
                    className="w-full touch-pan-y"
                  >
                    {renderCard(items[currentCardIndex], currentCardIndex)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Caret Controls */}
              <div className="flex items-center justify-between mt-5 px-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer shadow-md"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {items.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCurrentCardIndex(dotIdx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === currentCardIndex
                          ? 'w-7 bg-cyan-400 shadow-md shadow-cyan-400/40'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to card ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer shadow-md"
                  aria-label="Next card"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* LAYOUT: SPLIT IMAGE */}
        {section.layout === 'split-image' && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Content Column */}
            <div className={`lg:col-span-6 space-y-6 ${section.imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  {section.titleHighlight ? `${section.title} ${section.titleHighlight}` : section.title}
                </h3>
                {section.description && (
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {section.description}
                  </p>
                )}
              </div>

              {/* Inclusions checklist */}
              {section.items && section.items.length > 0 && (
                <div className="space-y-3 pt-2">
                  {section.items.map((item, idx) => (
                    <div key={item.id || idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#090e1c] border border-slate-800/80">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {(section.primaryCtaText || section.secondaryCtaText) && (
                <div className="flex flex-wrap gap-4 pt-4">
                  {section.primaryCtaText && (
                    <button
                      onClick={() => handleCtaClick(section.primaryCtaLink, section.primaryCtaText)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>{section.primaryCtaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  {section.secondaryCtaText && (
                    <button
                      onClick={() => handleCtaClick(section.secondaryCtaLink, section.secondaryCtaText)}
                      className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>{section.secondaryCtaText}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Visual Media Column */}
            <div className={`lg:col-span-6 ${section.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#090e1c] aspect-[4/3] group">
                {section.imageUrl ? (
                  <img
                    src={section.imageUrl}
                    alt={section.imageAlt || section.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0c1428] to-[#070c18]">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/20">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">Visual Asset Showcase</h4>
                    <p className="text-xs text-slate-400 max-w-sm">Configure or upload custom visuals for this section in the Admin Studio.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT: BANNER */}
        {section.layout === 'banner' && (
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-sky-950/70 via-[#0a1b2d] to-cyan-950/70 border border-cyan-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {section.titleHighlight ? `${section.title} ${section.titleHighlight}` : section.title}
              </h3>
              {section.description && (
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {section.description}
                </p>
              )}
              {section.primaryCtaText && (
                <button
                  onClick={() => handleCtaClick(section.primaryCtaLink, section.primaryCtaText)}
                  className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-400/20 inline-flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>{section.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* LAYOUT: STATS */}
        {section.layout === 'stats' && section.items && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {section.items.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="p-6 rounded-2xl bg-[#090e1c] border border-slate-800 text-center flex flex-col justify-center items-center space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 font-mono">
                  {item.statValue || '100%'}
                </div>
                <div className="text-xs font-bold text-white">{item.title}</div>
                <p className="text-[11px] text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        )}

      </Container>
    </section>
  );
};

export default CustomSectionRenderer;
