import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, Sparkles, ExternalLink, Activity, BarChart3, Target } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion, buttonHoverMotion, standardEase } from '../lib/animations';
import { caseStudiesData } from '../data/caseStudiesData';
import { CaseStudy } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';
import Container from './common/Container';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

export default function CaseStudies({ onOpenConsultation }: CaseStudiesProps) {
  const { config } = useSiteConfig();
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);

  const casesList = config.caseStudies && config.caseStudies.length > 0 ? config.caseStudies : caseStudiesData;

  return (
    <section id="cases" className="relative flex flex-col justify-center py-12 sm:py-16 lg:py-20 bg-[#070b14] border-t border-slate-800/80">
      {/* Sleek separation glow divider line matching all other major sections */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-slate-700/60 to-transparent pointer-events-none" />
      <Container>

        {/* Section Header with "View All Cases" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-[9.5px] sm:text-[10px] font-bold tracking-widest uppercase mb-1.5 shadow-sm shadow-cyan-500/10">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{config.casesSectionBadge || 'PROVEN OUTCOMES'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {config.casesSectionTitle1 || 'Case Studies &'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                {config.casesSectionTitle2 || 'Recent Work'}
              </span>
            </h2>
            {config.casesSectionDescription && (
              <p className="mt-1.5 text-slate-400 text-xs leading-relaxed max-w-lg">
                {config.casesSectionDescription}
              </p>
            )}
          </div>

          <button
            onClick={onOpenConsultation}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors py-1 min-h-[32px] cursor-pointer self-start sm:self-auto"
          >
            <span>View All Cases</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Featured Case Study Cards - Smaller Compact Sizing */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto w-full"
        >
          {casesList.map((item) => {
            const caseImg = item.imageUrl || config.sectionImages?.[`case-${item.id}`];

            return (
            <motion.div
              key={item.id}
              variants={staggerItemVariants}
              {...cardHoverMotion}
              className="rounded-xl bg-[#0c1322] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-xl cursor-pointer flex flex-col overflow-hidden"
              id={`case-card-${item.id}`}
            >
              {/* Graphic Mockup Preview Window - Smaller & Compact */}
              <div className="relative h-32 sm:h-36 bg-[#060a13] p-2.5 sm:p-3 overflow-hidden border-b border-slate-800/80 flex flex-col justify-between">

                {caseImg ? (
                  // Custom Real Image Showcase
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <img 
                      src={caseImg} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 rounded-md" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a13] via-[#060a13]/50 to-black/40 rounded-md" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="px-2 py-0.5 rounded bg-slate-950/85 backdrop-blur-xs border border-cyan-500/40 text-[8.5px] font-mono tracking-widest text-cyan-300 uppercase">
                        {item.category}
                      </div>
                      <div className="flex items-center gap-1 bg-slate-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[8.5px] font-mono text-emerald-400 font-semibold">VERIFIED</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-[9.5px] text-slate-200 bg-slate-950/85 backdrop-blur-xs px-2 py-1 rounded border border-slate-700/60">
                      <span className="font-bold text-white truncate">{item.title}</span>
                      {item.stats && item.stats[0] && (
                        <span className="text-cyan-300 font-mono font-bold text-[9px] shrink-0 ml-2">
                          {item.stats[0].value} {item.stats[0].label}
                        </span>
                      )}
                    </div>
                  </div>
                ) : item.type === 'nexa' ? (
                  // Nexa Store India UI Transformation mockup - Compact
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    {/* Top title bar */}
                    <div className="flex items-center justify-between">
                      <div className="px-2 py-0.5 rounded bg-teal-950/80 border border-teal-500/40 text-[8.5px] font-mono tracking-widest text-teal-300">
                        UI TRANSFORMATION
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-[9px] font-mono text-cyan-400 font-semibold flex items-center gap-1">LIVE</span>
                      </div>
                    </div>

                    {/* Dashboard center graphics */}
                    <div className="grid grid-cols-3 gap-1.5 my-auto">
                      <div className="p-1 sm:p-1.5 rounded-md bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mb-0.5">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" />
                          </svg>
                          <span className="absolute text-[8px] font-bold text-white">75%</span>
                        </div>
                        <span className="text-[7.5px] text-slate-400 font-medium truncate">Conversion</span>
                      </div>

                      <div className="p-1 sm:p-1.5 rounded-md bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="text-xs sm:text-sm font-extrabold text-cyan-400 mb-0.5">₹2.3M</div>
                        <span className="text-[7.5px] text-slate-400 font-medium truncate">Gross Vol</span>
                        <div className="mt-0.5 flex gap-0.5 h-2 items-end">
                          <div className="w-0.5 bg-cyan-600 h-1 rounded-xs" />
                          <div className="w-0.5 bg-cyan-500 h-1.5 rounded-xs" />
                          <div className="w-0.5 bg-cyan-400 h-2 rounded-xs" />
                          <div className="w-0.5 bg-cyan-300 h-1.5 rounded-xs" />
                        </div>
                      </div>

                      <div className="p-1 sm:p-1.5 rounded-md bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="text-xs sm:text-sm font-extrabold text-emerald-400 mb-0.5">-15%</div>
                        <span className="text-[7.5px] text-slate-400 font-medium truncate">Bounce</span>
                        <TrendingUp className="w-2.5 h-2.5 text-emerald-400 mt-0.5" />
                      </div>
                    </div>

                    {/* Bottom status bar in preview */}
                    <div className="flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/70 px-2 py-0.5 rounded border border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-2.5 h-2.5 text-cyan-400" />
                        <span>Nexa Store D2C</span>
                      </span>
                      <span className="text-cyan-400 font-mono text-[8px]">95% SPEED GAIN</span>
                    </div>
                  </div>
                ) : item.type === 'techduniya' ? (
                  // TechDuniya Organic SMO Push mockup - Compact
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-[8.5px] font-mono tracking-widest text-blue-300">
                        AUDIENCE ENGAGEMENT
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                        <span className="text-[9px] font-mono text-cyan-400 font-semibold">ACTIVE</span>
                      </div>
                    </div>

                    {/* Waveform / metric bars */}
                    <div className="my-auto space-y-1">
                      <div className="flex justify-between text-[8.5px] text-slate-400">
                        <span>Organic Social Impressions</span>
                        <span className="text-cyan-300 font-bold">+180% MoM</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div className="bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 h-full w-[84%] rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                        <div className="p-1 rounded bg-slate-900/80 border border-slate-800/90 text-center">
                          <div className="text-[11px] sm:text-xs font-bold text-white">320K</div>
                          <div className="text-[7.5px] text-slate-400">Total Reach</div>
                        </div>
                        <div className="p-1 rounded bg-slate-900/80 border border-slate-800/90 text-center">
                          <div className="text-[11px] sm:text-xs font-bold text-cyan-400">8.4%</div>
                          <div className="text-[7.5px] text-slate-400">Avg CTR</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/70 px-2 py-0.5 rounded border border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <Users className="w-2.5 h-2.5 text-cyan-400" />
                        <span>TechDuniya Media</span>
                      </span>
                      <span className="text-teal-400 font-mono text-[8px]">COMMUNITY EXPANSION</span>
                    </div>
                  </div>
                ) : (
                  // Custom dynamic case study mockup - Compact
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[8.5px] font-mono tracking-widest text-cyan-300 uppercase">
                        {item.category || 'GROWTH CASE STUDY'}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono text-emerald-400 font-semibold">VERIFIED</span>
                      </div>
                    </div>

                    <div className="my-auto grid grid-cols-3 gap-1.5">
                      {item.stats && item.stats.slice(0, 3).map((st, sIdx) => (
                        <div key={sIdx} className="p-1 sm:p-1.5 rounded bg-slate-900/90 border border-slate-800 text-center">
                          <div className="text-xs sm:text-sm font-extrabold text-cyan-400">{st.value}</div>
                          <div className="text-[7.5px] text-slate-400 truncate mt-0.5">{st.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/70 px-2 py-0.5 rounded border border-slate-800/80">
                      <span className="flex items-center gap-1 truncate">
                        <Target className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </span>
                      <span className="text-cyan-400 font-mono text-[8px] shrink-0">OPTIMIZED ROI</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom Meta Content - Compact Spacing */}
              <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8.5px] sm:text-[9px] font-bold text-cyan-400 tracking-wider uppercase font-mono">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mb-2.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Performance Metric Badges */}
                <div>
                  <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80 mb-2.5">
                    {item.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-1 sm:p-1.5 rounded-md border border-slate-800/60 text-center">
                        <div className="text-xs sm:text-[13px] font-bold text-cyan-300">
                          {stat.value}
                        </div>
                        <div className="text-[8px] sm:text-[8.5px] text-slate-400 font-medium truncate mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveCase(item)}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-[11px] font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[32px]"
                  >
                    <span>Read Full Impact Breakdown</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </button>
                </div>
              </div>
            </motion.div>
            );
          })}
        </motion.div>

        {/* Modal for detailed case study breakdown */}
        <AnimatePresence>
          {activeCase && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveCase(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: standardEase }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg sm:max-w-xl bg-[#090e1a] border border-cyan-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider">
                    {activeCase.category}
                  </span>
                  <button
                    onClick={() => setActiveCase(null)}
                    className="text-slate-400 hover:text-white p-1 sm:p-2 rounded-xl hover:bg-slate-800 transition-colors min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center cursor-pointer"
                    aria-label="Close case study details modal"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white mb-1.5 sm:mb-2 leading-snug">
                  {activeCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 sm:mb-5">
                  {activeCase.description}
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {activeCase.stats.map((s, idx) => (
                    <div key={idx} className="p-2 sm:p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-sm sm:text-lg font-bold text-cyan-300 leading-tight">{s.value}</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 sm:space-y-2 mb-3.5 sm:mb-5 text-xs text-slate-300 bg-slate-900/70 p-3 sm:p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                    <span>Key Growth Pillars Executed</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-1.5 text-slate-400 text-[11px] sm:text-xs leading-normal">
                    <li>Core Web Vitals remediation to green metric thresholds.</li>
                    <li>Restructured checkout journey & one-click mobile triggers.</li>
                    <li>Targeted high-intent keyword acquisition & localized Google rankings.</li>
                    <li>Automated retargeting funnels recovering high-intent abandonment traffic.</li>
                  </ul>
                </div>

                <div>
                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => {
                      setActiveCase(null);
                      onOpenConsultation();
                    }}
                    className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg shadow-cyan-500/20 cursor-pointer min-h-[42px] sm:min-h-[44px] flex items-center justify-center transition-transform"
                  >
                    Discuss a Similar Strategy
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </Container>
    </section>
  );
}
