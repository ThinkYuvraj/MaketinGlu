import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  ShoppingBag, 
  Radio, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  X,
  Gauge,
  Layers,
  BarChart2
} from 'lucide-react';
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
    <section id="cases" className="relative flex flex-col justify-center py-14 sm:py-18 lg:py-24 bg-[#060a13] border-t border-slate-800/80">
      {/* Top Subtle Glow Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 via-slate-700/60 to-transparent pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold tracking-widest uppercase mb-3 shadow-sm shadow-cyan-500/10">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{config.casesSectionBadge || 'PROVEN OUTCOMES'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {config.casesSectionTitle1 || 'Case Studies &'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                {config.casesSectionTitle2 || 'Recent Work'}
              </span>
            </h2>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm lg:text-base leading-relaxed">
              {config.casesSectionDescription || 'Real-world revenue and lead-generation outcomes engineered for scaling brands.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-1 cursor-pointer self-start sm:self-auto group"
          >
            <span>View All Cases</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Featured Case Study Grid */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full"
        >
          {casesList.map((item) => {
            const caseImg = item.imageUrl || config.sectionImages?.[`case-${item.id}`];
            const isNexa = item.type === 'nexa' || item.id === 'nexa';
            const isTechDuniya = item.type === 'techduniya' || item.id === 'techduniya';

            return (
              <motion.div
                key={item.id}
                variants={staggerItemVariants}
                {...cardHoverMotion}
                className="rounded-2xl bg-gradient-to-b from-[#0c1324] to-[#070c18] border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col overflow-hidden"
                id={`case-card-${item.id}`}
              >
                {/* 1. VISUAL SHOWCASE HEADER (Clean, Authentic, No Box-in-Box clutter) */}
                <div className="relative h-44 sm:h-52 bg-[#050914] overflow-hidden border-b border-slate-800/80 p-4 sm:p-5 flex flex-col justify-between">
                  {/* Subtle decorative background grid lines */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {/* Ambient Glow */}
                  <div className={`absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none ${
                    isNexa ? 'bg-cyan-500' : 'bg-sky-500'
                  }`} />

                  {caseImg ? (
                    // Custom Uploaded Image
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      <img 
                        src={caseImg} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-lg" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/60 to-black/30 rounded-lg" />
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono tracking-wider text-cyan-300 uppercase">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          VERIFIED
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-xs text-slate-200 bg-slate-950/85 px-3 py-1.5 rounded-lg border border-slate-800">
                        <span className="font-bold text-white truncate">{item.client || item.title}</span>
                        <span className="text-cyan-300 font-mono font-bold shrink-0">{item.stats[0]?.value}</span>
                      </div>
                    </div>
                  ) : isNexa ? (
                    // Nexa Store High-Fidelity Performance Graphic
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      {/* Top Bar: Client & Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 tracking-wide">
                            {item.client || 'Nexa Store India'}
                          </span>
                          <span className="text-slate-600">&bull;</span>
                          <span className="text-[11px] text-slate-400">D2C Fashion</span>
                        </div>

                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>LIVE AUDIT</span>
                        </div>
                      </div>

                      {/* Center Graphical Simulation: Speed Timeline & Conversion Surge */}
                      <div className="my-auto py-1">
                        <div className="flex items-center justify-between mb-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Gauge className="w-4 h-4 text-cyan-400" />
                            <span className="text-slate-300 font-medium">Mobile Checkout Latency:</span>
                            <span className="line-through text-slate-500 font-mono text-[11px]">4.8s</span>
                            <span className="text-emerald-400 font-mono font-bold text-xs sm:text-sm">0.4s</span>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                            +95% Speed
                          </span>
                        </div>

                        {/* Interactive-looking SVG retention curve */}
                        <div className="w-full h-10 sm:h-12 relative flex items-center">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 45" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="nexaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                                <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            {/* Baseline dotted */}
                            <line x1="0" y1="35" x2="300" y2="35" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                            {/* Retention curve */}
                            <path 
                              d="M0,35 Q70,33 130,22 T240,8 L300,5" 
                              fill="none" 
                              stroke="url(#nexaGrad)" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                            />
                            {/* Key nodes */}
                            <circle cx="130" cy="22" r="3" fill="#38bdf8" className="animate-pulse" />
                            <circle cx="300" cy="5" r="3.5" fill="#2dd4bf" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom Visual Meta */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                        <span className="text-slate-400">Headless Architecture &amp; Core Web Vitals (99/100)</span>
                        <span className="text-cyan-300 font-mono font-bold">₹2.3M GMV Attributed</span>
                      </div>
                    </div>
                  ) : isTechDuniya ? (
                    // TechDuniya High-Fidelity Social Growth Graphic
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      {/* Top Bar: Client & Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
                            <Radio className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 tracking-wide">
                            {item.client || 'TechDuniya Media'}
                          </span>
                          <span className="text-slate-600">&bull;</span>
                          <span className="text-[11px] text-slate-400">Tech &amp; Gadgets</span>
                        </div>

                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-[10px] font-mono text-cyan-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>VIRAL MOMENTUM</span>
                        </div>
                      </div>

                      {/* Center Waveform Graphic */}
                      <div className="my-auto py-1">
                        <div className="flex items-center justify-between mb-2 text-xs">
                          <div className="flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-sky-400" />
                            <span className="text-slate-300 font-medium">Monthly Social Reach:</span>
                            <span className="line-through text-slate-500 font-mono text-[11px]">65K</span>
                            <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm">320K</span>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                            +180% Inbound
                          </span>
                        </div>

                        {/* High-Growth Waveform SVG */}
                        <div className="w-full h-10 sm:h-12 relative flex items-center">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 45" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
                                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#818cf8" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            <line x1="0" y1="36" x2="300" y2="36" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                            <path 
                              d="M0,36 C40,35 60,30 90,26 C130,20 170,28 210,14 C250,3 280,6 300,3" 
                              fill="none" 
                              stroke="url(#techGrad)" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                            />
                            <circle cx="210" cy="14" r="3" fill="#38bdf8" />
                            <circle cx="300" cy="3" r="3.5" fill="#818cf8" className="animate-pulse" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom Visual Meta */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                        <span className="text-slate-400">Algorithmic Content Hooks &amp; Creator Syndication</span>
                        <span className="text-sky-300 font-mono font-bold">8.4% Engagement CTR</span>
                      </div>
                    </div>
                  ) : (
                    // Default Custom Case Study Graphic
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">{item.client || item.title}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-[10px] font-mono text-cyan-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          DEPLOYED
                        </span>
                      </div>
                      <div className="my-auto">
                        <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                          {item.stats[0]?.value} {item.stats[0]?.label}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{item.category}</p>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/60 flex items-center justify-between">
                        <span>Marketing LU Performance Framework</span>
                        <span className="text-cyan-400 font-mono">VERIFIED</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. CARD EDITORIAL BODY (No redundant boxes, elegant typography & clear tags) */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category & Year Tag */}
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-2">
                      <span>{item.category}</span>
                      <span className="text-slate-500">{item.year || '2025-2026'}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>

                    {/* Description narrative */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Strategic Tags / Deliverables */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-[10px] sm:text-[11px] text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. CLEAN DIVIDED METRICS RIBBON (Flat, High-Contrast, Zero Nested Cards) */}
                  <div>
                    <div className="py-3 px-1 my-1 border-y border-slate-800/80 grid grid-cols-3 divide-x divide-slate-800/80">
                      {item.stats.slice(0, 3).map((stat, idx) => (
                        <div key={idx} className={`text-center ${idx === 0 ? 'pr-2' : idx === 1 ? 'px-2' : 'pl-2'}`}>
                          <div className="text-base sm:text-lg lg:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 font-mono leading-tight">
                            {stat.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 4. ACTION BUTTON */}
                    <button
                      type="button"
                      onClick={() => setActiveCase(item)}
                      className="w-full mt-3 py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                    >
                      <span>Explore Full Impact Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* DETAILED CASE STUDY BREAKDOWN MODAL */}
        <AnimatePresence>
          {activeCase && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setActiveCase(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: standardEase }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl sm:max-w-2xl bg-[#080d1a] border border-cyan-500/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {activeCase.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {activeCase.client || 'Client Impact Story'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCase(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Title and Overview */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
                  {activeCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {activeCase.description}
                </p>

                {/* Primary Stats Banner */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#050812] border border-slate-800 mb-5 grid grid-cols-3 divide-x divide-slate-800 text-center">
                  {activeCase.stats.map((s, idx) => (
                    <div key={idx} className="px-2">
                      <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono leading-tight">{s.value}</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution Grid */}
                {(activeCase.challenge || activeCase.solution) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5 mb-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>The Challenge</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                        {activeCase.challenge || 'Inefficient digital funnels resulting in dropped transactions and elevated customer acquisition costs.'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Engineered Solution</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                        {activeCase.solution || 'Deployed bespoke high-conversion checkout flows and automated retargeting funnels.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Before vs After Benchmark Comparison Table */}
                {activeCase.beforeAfter && activeCase.beforeAfter.length > 0 && (
                  <div className="mb-5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Pre &amp; Post Performance Benchmarks</span>
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {activeCase.beforeAfter.map((row, rIdx) => (
                        <div key={rIdx} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                          <span className="text-slate-300 font-medium">{row.metric}</span>
                          <div className="flex items-center gap-3 font-mono text-[11px]">
                            <span className="text-slate-500 line-through">Before: {row.before}</span>
                            <span className="text-emerald-400 font-bold">After: {row.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Deliverables List */}
                {activeCase.deliverables && activeCase.deliverables.length > 0 && (
                  <div className="mb-6 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80">
                    <h4 className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Deliverables &amp; Core Systems Implemented</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {activeCase.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div>
                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => {
                      setActiveCase(null);
                      onOpenConsultation();
                    }}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg shadow-cyan-500/25 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Discuss a Similar Growth Strategy for Your Brand</span>
                    <ArrowRight className="w-4 h-4" />
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
