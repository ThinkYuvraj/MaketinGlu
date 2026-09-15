import React from 'react';
import { motion } from 'motion/react';
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
  if (!section.enabled) return null;

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
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
        {section.layout === 'cards' && section.items && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {section.items.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-[#090e1c] border border-slate-800/90 hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
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
              </motion.div>
            ))}
          </div>
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
                <div className="flex flex-wrap gap-3.5 pt-2">
                  {section.primaryCtaText && (
                    <button
                      type="button"
                      onClick={() => handleCtaClick(section.primaryCtaLink, section.primaryCtaText)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all active:scale-95"
                    >
                      <span>{section.primaryCtaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  {section.secondaryCtaText && (
                    <button
                      type="button"
                      onClick={() => handleCtaClick(section.secondaryCtaLink, section.secondaryCtaText)}
                      className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <span>{section.secondaryCtaText}</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Visual Column */}
            <div className={`lg:col-span-6 ${section.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-blue-600/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative rounded-2xl bg-[#090e1c] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 sm:p-4">
                  {section.imageUrl ? (
                    <img 
                      src={section.imageUrl} 
                      alt={section.imageAlt || section.title} 
                      className="w-full h-64 sm:h-80 md:h-96 rounded-xl object-cover transform transition duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl bg-gradient-to-br from-slate-900 via-[#0a1122] to-[#070b14] flex flex-col items-center justify-center p-6 text-center border border-slate-800">
                      <Sparkles className="w-12 h-12 text-cyan-400 mb-3 animate-pulse" />
                      <div className="text-base font-bold text-white">{section.title}</div>
                      <div className="text-xs text-slate-400 mt-1 max-w-xs">{section.description}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT: BANNER */}
        {section.layout === 'banner' && (
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0c162d] via-[#091020] to-[#060a14] border border-cyan-500/30 p-8 sm:p-12 lg:p-14 max-w-5xl mx-auto shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-2xl">
                {section.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mb-3">
                    {section.badge}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {section.title}{' '}
                  {section.titleHighlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                      {section.titleHighlight}
                    </span>
                  )}
                </h3>
                {section.description && (
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                    {section.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                {section.primaryCtaText && (
                  <button
                    type="button"
                    onClick={() => handleCtaClick(section.primaryCtaLink, section.primaryCtaText)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer transition-all active:scale-95"
                  >
                    <span>{section.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {section.secondaryCtaText && (
                  <button
                    type="button"
                    onClick={() => handleCtaClick(section.secondaryCtaLink, section.secondaryCtaText)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <span>{section.secondaryCtaText}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT: STATS */}
        {section.layout === 'stats' && section.items && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {section.items.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#090e1c] border border-slate-800 text-center hover:border-cyan-500/40 transition-colors shadow-lg"
              >
                <div className="text-2xl sm:text-4xl font-black text-cyan-400 font-mono tracking-tight">
                  {item.statValue || '100%'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default CustomSectionRenderer;
