import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, Sparkles, ExternalLink, Activity } from 'lucide-react';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion, buttonHoverMotion, standardEase } from '../lib/animations';
import { caseStudiesData, CaseStudy } from '../data/caseStudiesData';
import Container from './common/Container';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

export default function CaseStudies({ onOpenConsultation }: CaseStudiesProps) {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);

  return (
    <section id="cases" className="relative py-16 sm:py-20 lg:py-24 bg-[#070b14]">
      <Container>

        {/* Section Header with "View All Cases" matching Figma */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Case Studies & Recent Work
            </h2>
          </div>

          <button
            onClick={onOpenConsultation}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group transition-colors py-2 min-h-[44px] cursor-pointer"
          >
            <span>View All Cases</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 2 Featured Case Study Cards - Staggered entrance, consistent card hover */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 xl:gap-12 2xl:gap-16"
        >
          {caseStudiesData.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItemVariants}
              {...cardHoverMotion}
              className="rounded-2xl bg-[#0c1322] border border-slate-800/90 hover:border-cyan-500/40 transition-colors duration-300 overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
              id={`case-card-${item.id}`}
            >
              {/* Graphic Mockup Preview Window */}
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-[#060a13] p-3.5 sm:p-5 lg:p-6 overflow-hidden border-b border-slate-800/80 flex flex-col justify-between">

                {item.type === 'nexa' ? (
                  // Nexa Store India UI Transformation mockup
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    {/* Top title bar */}
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 rounded-md bg-teal-950/80 border border-teal-500/40 text-[10px] font-mono tracking-widest text-teal-300">
                        UI TRANSFORMATION
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1">LIVE</span>
                      </div>
                    </div>

                    {/* Dashboard center graphics */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 my-auto">
                      <div className="p-2 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-1">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" />
                          </svg>
                          <span className="absolute text-[10px] sm:text-[11px] font-bold text-white">75%</span>
                        </div>
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium truncate">Conversion</span>
                      </div>

                      <div className="p-2 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="text-lg sm:text-xl font-extrabold text-cyan-400 mb-0.5">₹2.3M</div>
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium truncate">Gross Vol</span>
                        <div className="mt-1 flex gap-0.5 h-3 items-end">
                          <div className="w-1 bg-cyan-600 h-1.5 rounded-sm" />
                          <div className="w-1 bg-cyan-500 h-2.5 rounded-sm" />
                          <div className="w-1 bg-cyan-400 h-3 rounded-sm" />
                          <div className="w-1 bg-cyan-300 h-2 rounded-sm" />
                        </div>
                      </div>

                      <div className="p-2 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="text-lg sm:text-xl font-extrabold text-emerald-400 mb-0.5">-15%</div>
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium truncate">Bounce</span>
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-1" />
                      </div>
                    </div>

                    {/* Bottom status bar in preview */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/70 p-2 rounded-lg border border-slate-800/80">
                      <span className="flex items-center gap-1.5">
                        <ShoppingCart className="w-3 h-3 text-cyan-400" />
                        <span>Nexa Store D2C</span>
                      </span>
                      <span className="text-cyan-400 font-mono text-[10px]">95% SPEED GAIN</span>
                    </div>
                  </div>
                ) : (
                  // TechDuniya Organic SMO Push mockup
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 rounded-md bg-blue-950/80 border border-blue-500/40 text-[10px] font-mono tracking-widest text-blue-300">
                        AUDIENCE ENGAGEMENT
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold">ACTIVE</span>
                      </div>
                    </div>

                    {/* Waveform / metric bars */}
                    <div className="my-auto space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Organic Social Impressions</span>
                        <span className="text-cyan-300 font-bold">+180% MoM</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div className="bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 h-full w-[84%] rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/90 text-center">
                          <div className="text-sm font-bold text-white">320K</div>
                          <div className="text-[8px] text-slate-400">Total Reach</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/90 text-center">
                          <div className="text-sm font-bold text-cyan-400">8.4%</div>
                          <div className="text-[8px] text-slate-400">Avg CTR</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/70 p-2 rounded-lg border border-slate-800/80">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-cyan-400" />
                        <span>TechDuniya Media</span>
                      </span>
                      <span className="text-teal-400 font-mono text-[10px]">COMMUNITY EXPANSION</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom Meta Content */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold text-cyan-400 tracking-wider uppercase font-mono">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Performance Metric Badges */}
                <div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-slate-800/80 mb-4">
                    {item.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-2 sm:p-2.5 rounded-xl border border-slate-800/60 text-center">
                        <div className="text-xs sm:text-sm md:text-base font-bold text-cyan-300">
                          {stat.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium truncate mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveCase(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]"
                  >
                    <span>Read Full Impact Breakdown</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for detailed case study breakdown */}
        <AnimatePresence>
          {activeCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: standardEase }}
                className="w-full max-w-xl bg-[#090e1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase">
                    {activeCase.category}
                  </span>
                  <button
                    onClick={() => setActiveCase(null)}
                    className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Close case study details modal"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {activeCase.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {activeCase.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {activeCase.stats.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-base sm:text-lg font-bold text-cyan-300">{s.value}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 text-xs sm:text-sm text-slate-300 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Key Growth Pillars Executed</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-xs">
                    <li>Full technical Core Web Vitals remediation to hit green metric thresholds.</li>
                    <li>Restructured mobile customer purchase journey and one-click checkout triggers.</li>
                    <li>Targeted high-intent keyword acquisition and localized Google rankings.</li>
                    <li>Automated retargeting funnels recovering high-intent abandonment traffic.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => {
                      setActiveCase(null);
                      onOpenConsultation();
                    }}
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg shadow-cyan-500/20 cursor-pointer min-h-[44px] flex items-center justify-center"
                  >
                    Discuss a Similar Strategy
                  </motion.button>
                  <button
                    onClick={() => setActiveCase(null)}
                    className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </Container>
    </section>
  );
}
