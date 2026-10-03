import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
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
  BarChart2,
  ChevronLeft,
  ChevronRight
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const isPaused = isHovered || isInteracting;

  const casesList = config.caseStudies && config.caseStudies.length > 0 ? config.caseStudies : caseStudiesData;
  const totalCases = casesList.length;

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalCases);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalCases) % totalCases);
  };

  const handleSelectTab = (idx: number) => {
    setSlideDirection(idx > currentIndex ? 'right' : 'left');
    setCurrentIndex(idx);
  };

  const isDraggingRef = useRef<boolean>(false);
  const caseDockRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = caseDockRef.current;
    const tab = tabRefs.current[currentIndex];
    if (container && tab) {
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScroll = tabLeft - (containerWidth / 2) + (tabWidth / 2);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // 4.5-Second Auto-Swipe Timer
  useEffect(() => {
    if (isPaused || totalCases <= 1) return;
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % totalCases);
    }, 4500);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, totalCases]);

  const mobileSlideVariants: Variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0.15,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 32, mass: 0.65 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0.15,
      scale: 0.96,
      zIndex: 0,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="cases" className="relative w-full min-h-0 py-6 sm:py-8 lg:py-10 flex flex-col justify-center items-center bg-[#060a13] border-t border-slate-800/80 overflow-hidden">
      {/* Top Subtle Glow Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/25 via-slate-700/60 to-transparent pointer-events-none" />

      <Container>
        {/* Centered Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-3 sm:mb-4 lg:mb-5">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{config.casesSectionBadge || 'PROVEN OUTCOMES'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-black text-white tracking-tight leading-snug sm:leading-tight lg:whitespace-nowrap text-center">
            {config.casesSectionTitle1 || 'Case Studies &'}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-400">
              {config.casesSectionTitle2 || 'Recent Work'}
            </span>
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto text-center">
            {config.casesSectionDescription || 'Real-world revenue and lead-generation outcomes engineered for scaling brands across D2C, SaaS, and retail.'}
          </p>
        </div>

        {/* Render Single Case Card Helper */}
        {(() => {
          const renderCaseCard = (item: CaseStudy) => {
            const caseImg = item.imageUrl || config.sectionImages?.[`case-${item.id}`];
            const isNexa = item.type === 'nexa' || item.id === 'nexa';
            const isTechDuniya = item.type === 'techduniya' || item.id === 'techduniya';

            return (
              <div
                className="rounded-2xl bg-linear-to-b from-[#0c1324] to-[#070c18] border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col overflow-hidden h-full select-none"
                id={`case-card-${item.id}`}
              >
                {/* 1. VISUAL SHOWCASE HEADER */}
                <div className="relative h-28 sm:h-32 bg-[#050914] overflow-hidden border-b border-slate-800/80 p-3 flex flex-col justify-between">
                  <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  <div className={`absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none ${
                    isNexa ? 'bg-cyan-500' : 'bg-sky-500'
                  }`} />

                  {caseImg ? (
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      <img 
                        src={caseImg} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-lg" 
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#050914] via-[#050914]/60 to-black/30 rounded-lg" />
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-slate-950/90 border border-cyan-500/40 text-[9px] font-mono tracking-wider text-cyan-300 uppercase">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/90 border border-emerald-500/40 text-[9px] font-mono text-emerald-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          VERIFIED
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-200 bg-slate-950/85 px-2.5 py-1 rounded-lg border border-slate-800">
                        <span className="font-bold text-white truncate">{item.client || item.title}</span>
                        <span className="text-cyan-300 font-mono font-bold shrink-0">{item.stats[0]?.value}</span>
                      </div>
                    </div>
                  ) : isNexa ? (
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-md bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-slate-200 tracking-wide">
                            {item.client || 'Nexa Store India'}
                          </span>
                          <span className="text-slate-600">&bull;</span>
                          <span className="text-[11px] text-slate-400">D2C Fashion</span>
                        </div>

                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>LIVE AUDIT</span>
                        </div>
                      </div>

                      <div className="my-auto py-0.5">
                        <div className="flex items-center justify-between mb-1 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-slate-300 font-medium">Checkout Latency:</span>
                            <span className="line-through text-slate-500 font-mono text-[10px]">4.8s</span>
                            <span className="text-cyan-400 font-bold">&rarr;</span>
                            <span className="text-emerald-400 font-mono font-bold text-xs">0.4s</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                            +95% Speed
                          </span>
                        </div>

                        <div className="w-full h-6 sm:h-7 relative flex items-center">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 30" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="nexaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                                <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            <line x1="0" y1="24" x2="300" y2="24" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                            <path 
                              d="M0,24 Q70,22 130,15 T240,6 L300,3" 
                              fill="none" 
                              stroke="url(#nexaGrad)" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                            />
                            <circle cx="130" cy="15" r="2.5" fill="#38bdf8" className="animate-pulse" />
                            <circle cx="300" cy="3" r="3" fill="#2dd4bf" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-1.5 pb-0.5 border-t border-slate-800/80">
                        <span className="text-slate-300 truncate">Headless Arch &amp; Core Web Vitals (99/100)</span>
                        <span className="text-cyan-300 font-mono font-bold shrink-0">₹2.3M GMV Attributed</span>
                      </div>
                    </div>
                  ) : isTechDuniya ? (
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
                            <Radio className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-slate-200 tracking-wide">
                            {item.client || 'TechDuniya Media'}
                          </span>
                          <span className="text-slate-600">&bull;</span>
                          <span className="text-[11px] text-slate-400">Tech &amp; Gadgets</span>
                        </div>

                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>VIRAL MOMENTUM</span>
                        </div>
                      </div>

                      <div className="my-auto py-0.5">
                        <div className="flex items-center justify-between mb-1 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <BarChart2 className="w-3.5 h-3.5 text-sky-400" />
                            <span className="text-slate-300 font-medium">Monthly Social Reach:</span>
                            <span className="line-through text-slate-500 font-mono text-[10px]">65K</span>
                            <span className="text-cyan-400 font-bold">&rarr;</span>
                            <span className="text-cyan-300 font-mono font-bold text-xs">320K</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            +180% Inbound
                          </span>
                        </div>

                        <div className="w-full h-6 sm:h-7 relative flex items-center">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 30" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
                                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#818cf8" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            <line x1="0" y1="24" x2="300" y2="24" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                            <path 
                              d="M0,24 C40,23 60,20 90,17 C130,13 170,18 210,9 C250,2 280,4 300,2" 
                              fill="none" 
                              stroke="url(#techGrad)" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                            />
                            <circle cx="210" cy="9" r="2.5" fill="#38bdf8" />
                            <circle cx="300" cy="2" r="3" fill="#818cf8" className="animate-pulse" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-1.5 pb-0.5 border-t border-slate-800/80">
                        <span className="text-slate-300 truncate">Algorithmic Content Hooks &amp; Creator Syndication</span>
                        <span className="text-sky-300 font-mono font-bold shrink-0">8.4% Engagement CTR</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">{item.client || item.title}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          DEPLOYED
                        </span>
                      </div>
                      <div className="my-auto">
                        <div className="text-lg font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-sky-400">
                          {item.stats[0]?.value} {item.stats[0]?.label}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.category}</p>
                      </div>
                      <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                        <span>MarketinGlu Framework</span>
                        <span className="text-cyan-400 font-mono font-bold">VERIFIED</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. CARD EDITORIAL BODY */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-1">
                      <span>{item.category}</span>
                      <span className="text-slate-400">{item.year || '2025-2026'}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-normal line-clamp-2 lg:text-justify">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. METRICS RIBBON */}
                  <div>
                    <div className="py-2 px-1 my-1 border-y border-slate-800/80 grid grid-cols-3 divide-x divide-slate-800/80">
                      {item.stats.slice(0, 3).map((stat, idx) => (
                        <div key={idx} className={`text-center ${idx === 0 ? 'pr-1.5' : idx === 1 ? 'px-1.5' : 'pl-1.5'}`}>
                          <div className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-cyan-300 font-mono leading-tight">
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 4. ACTION BUTTON */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isDraggingRef.current) return;
                        setActiveCase(item);
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-linear-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 hover:brightness-110 cursor-pointer min-h-[36px]"
                    >
                      <span>Explore Full Impact Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          };

          return (
            <>
              {/* DESKTOP VIEW (>=1024px): 2-Column Grid */}
              <motion.div 
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="hidden lg:grid lg:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto"
              >
                {casesList.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={staggerItemVariants}
                    {...cardHoverMotion}
                  >
                    {renderCaseCard(item)}
                  </motion.div>
                ))}
              </motion.div>

              {/* MOBILE & TABLET VIEW (<1024px): Caret Carousel with Swipe & Indicators */}
              <div className="block lg:hidden relative max-w-lg mx-auto">
                {/* Case Study Quick Tabs */}
                <div ref={caseDockRef} className="flex flex-row items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-full overflow-x-auto scrollbar-none mb-3">
                  {casesList.map((cItem, tabIdx) => {
                    const isSelected = tabIdx === currentIndex;
                    return (
                      <button
                        key={cItem.id}
                        ref={(el) => { tabRefs.current[tabIdx] = el; }}
                        type="button"
                        onClick={() => handleSelectTab(tabIdx)}
                        className={`group relative flex flex-row items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none uppercase tracking-wide shrink-0 ${
                          isSelected
                            ? 'bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.45)] scale-102'
                            : 'bg-[#091122]/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-slate-950 text-cyan-400 font-black' : 'bg-slate-800 text-cyan-400 group-hover:text-slate-200'
                        }`}>
                          <Sparkles className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="whitespace-nowrap">{cItem.client || `Case ${tabIdx + 1}`}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Swipable Card Container */}
                <div className="relative overflow-hidden px-1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
                    <motion.div
                      key={casesList[currentIndex].id}
                      custom={slideDirection}
                      variants={mobileSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
                        opacity: { duration: 0.25 },
                        scale: { duration: 0.25 },
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragSnapToOrigin={true}
                      dragElastic={0.2}
                      onDragStart={() => {
                        isDraggingRef.current = true;
                        setIsInteracting(true);
                      }}
                      onTouchStart={() => setIsInteracting(true)}
                      onTouchEnd={() => setIsInteracting(false)}
                      onTouchCancel={() => setIsInteracting(false)}
                      onPointerDown={() => setIsInteracting(true)}
                      onPointerUp={() => setIsInteracting(false)}
                      onPointerCancel={() => setIsInteracting(false)}
                      onDragEnd={(_, info) => {
                        setIsInteracting(false);
                        setTimeout(() => {
                          isDraggingRef.current = false;
                        }, 120);
                        const swipeThreshold = 35;
                        const velocityThreshold = 250;
                        if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                          handleNext();
                        } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                          handlePrev();
                        }
                      }}
                      className="w-full touch-pan-y cursor-grab active:cursor-grabbing"
                    >
                      {renderCaseCard(casesList[currentIndex])}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </>
          );
        })()}

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
                    className="w-full py-3 px-5 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg shadow-cyan-500/25 cursor-pointer flex items-center justify-center gap-2"
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
