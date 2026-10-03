import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { TrendingUp, CheckCircle2, Sparkles, Zap, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion } from '../lib/animations';
import Container from './common/Container';

export default function PerformanceStats() {
  const { config } = useSiteConfig();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);

  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  const stats = [
    {
      id: 'web-dev',
      tabLabel: 'Core',
      percentage: config.stats.webDesign,
      badge: "Core Vitals & Speed",
      label: "Customized Web & App Dev",
      category: "Full-Stack Development",
      description: "Ultra-fast headless architectures, responsive web apps, and sub-second page loads engineered for high conversion.",
      highlights: [
        "Sub-1.2s Core Web Vitals speed",
        "Clean, scalable TypeScript codebases",
        "Mobile-first adaptive layouts"
      ],
      metricLabel: "Benchmark Score",
      metricValue: "99.8% Uptime SLA",
      icon: Zap
    },
    {
      id: 'ecommerce',
      tabLabel: 'Funnels',
      percentage: config.stats.ecommerce,
      badge: "Conversion Architecture",
      label: "E-Commerce Architecture",
      category: "High-Volume Storefronts",
      description: "Seamless checkout funnels, automated inventory synchronization, and frictionless payments that minimize drop-offs.",
      highlights: [
        "+38% average checkout completion",
        "Secure payment gateway integrations",
        "High-throughput product catalogs"
      ],
      metricLabel: "Revenue Impact",
      metricValue: "3.4x Avg ROAS Growth",
      icon: TrendingUp
    },
    {
      id: 'branding',
      tabLabel: 'Visual',
      percentage: config.stats.design,
      badge: "Visual Authority",
      label: "Brand Identity & Design",
      category: "Design Systems & UI/UX",
      description: "Cohesive visual identity systems, vector brand kits, and high-contrast UI design tailored for lasting memorability.",
      highlights: [
        "Complete scalable design token sets",
        "Intuitive navigation and wireframes",
        "Omnichannel visual guidelines"
      ],
      metricLabel: "Satisfaction Rate",
      metricValue: "98% Client Approval",
      icon: Sparkles
    },
    {
      id: 'smo',
      tabLabel: 'Organic',
      percentage: config.stats.smo,
      badge: "Organic Amplification",
      label: "SMO & Social Media Reach",
      category: "Omnichannel Engagement",
      description: "Strategic creative storytelling, algorithm-favored reel formats, and targeted engagement campaigns that scale audience.",
      highlights: [
        "4.2x organic reach acceleration",
        "Data-backed content calendar pacing",
        "High-retention video creative hooks"
      ],
      metricLabel: "Monthly Reach",
      metricValue: "2.5M+ Video Impressions",
      icon: ShieldCheck
    },
  ];

  const totalStats = stats.length;
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerTemporaryPause = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  const handleNext = useCallback(() => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalStats);
  }, [totalStats]);

  const handlePrev = useCallback(() => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalStats) % totalStats);
  }, [totalStats]);

  const handleSelectStat = (idx: number) => {
    setSlideDirection(idx > currentIndex ? 'right' : 'left');
    setCurrentIndex(idx);
    triggerTemporaryPause();
  };

  // 4-Second Auto-Swipe Timer with smooth continuous cycling
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % totalStats);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, totalStats]);

  // 144Hz Smooth drag animation variants
  const mobileSlideVariants: Variants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0.2,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 32, mass: 0.7 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0.1,
      scale: 0.96,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const renderStatCard = (item: typeof stats[0], idx: number, isMobile = false) => {
    const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
    const gradientId = `cyan-gradient-${isMobile ? 'm-' : ''}${idx}`;
    const CardIcon = item.icon;

    return (
      <div 
        className="group flex flex-col justify-between rounded-2xl bg-linear-to-b from-[#0c1424] via-[#09101d] to-brand-bg border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 p-3.5 sm:p-4.5 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden h-full select-none"
        id={`stat-card-${isMobile ? 'mobile-' : ''}${idx}`}
      >
        {/* Top Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

        {/* 4-Second Auto-Swipe Active Progress Indicator Line (shown on mobile) */}
        {isMobile && (
          <div className="absolute top-0 inset-x-0 h-1 bg-slate-800/80 overflow-hidden z-20">
            <motion.div
              key={`${item.id}-${isPaused}`}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{
                duration: isPaused ? 0 : 4,
                ease: "linear",
              }}
              className="h-full bg-linear-to-r from-sky-400 via-cyan-400 to-teal-300 shadow-sm shadow-cyan-400/50"
            />
          </div>
        )}

        <div>
          {/* Top Header Badge */}
          <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/35 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
                <CardIcon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white uppercase tracking-wide truncate">
                  {item.badge}
                </div>
                <div className="text-[10px] font-mono text-slate-400 tracking-tight truncate">
                  {item.category}
                </div>
              </div>
            </div>
          </div>

          {/* Circular Gauge Centerpiece */}
          <div className="flex justify-center my-2">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="60%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                {/* Background track circle */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth="5"
                  fill="transparent"
                />
                {/* Glowing active arc */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={`url(#${gradientId})`}
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Percentage and sub-label in center */}
              <div className="absolute inset-0 flex items-center justify-center flex-col px-1 text-center pointer-events-none">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                  {item.percentage}%
                </span>
                <span className="text-[9px] font-extrabold text-cyan-400 uppercase tracking-wider mt-0.5">
                  Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-white text-center tracking-tight mb-1.5 group-hover:text-cyan-300 transition-colors">
            {item.label}
          </h3>

          {/* Description Info */}
          <p className="text-xs text-slate-300 text-center leading-relaxed mb-3">
            {item.description}
          </p>

          {/* Bullet Highlights */}
          <div className="space-y-1.5 py-2 border-t border-slate-800/80">
            {item.highlights.map((point, hIdx) => (
              <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  return (
    <section 
      id="growth" 
      className="relative w-full min-h-0 py-6 sm:py-8 lg:py-10 flex flex-col justify-center items-center bg-brand-bg border-t border-slate-800/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top subtle ambient line glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
      <span id="performance" className="absolute -top-24" />
      <Container>
        
        {/* Consistent Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-3 sm:mb-4 lg:mb-5">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>VERIFIED CAPABILITY METRICS</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-black text-white tracking-tight leading-snug sm:leading-tight lg:whitespace-nowrap text-center">
            Our Performance In{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-500">
              Numbers
            </span>
          </h2>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto text-center">
            Battle-tested delivery standards calibrated for sustainable growth, search dominance, and client retention.
          </p>
        </div>

        {/* DESKTOP (>=1024px): 4 Columns Grid */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="hidden lg:grid lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {stats.map((item, idx) => (
            <motion.div 
              key={item.id}
              variants={staggerItemVariants}
              {...cardHoverMotion}
            >
              {renderStatCard(item, idx, false)}
            </motion.div>
          ))}
        </motion.div>

        {/* MOBILE & TABLET (<1024px): Quick-Selector Floating Dock & Swipe Carousel */}
        <div className="block lg:hidden relative max-w-lg mx-auto">
          
          {/* Quick-Selector Floating Dock for 4 Stats (Responsive Grid) */}
          <div className="w-full max-w-full mb-3 px-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-xl bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-lg">
              {stats.map((stat, tabIdx) => {
                const isSelected = tabIdx === currentIndex;
                const TabIcon = stat.icon;

                return (
                  <button
                    key={stat.id}
                    type="button"
                    onClick={() => handleSelectStat(tabIdx)}
                    className={`group relative flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-\[44px\] select-none text-center uppercase tracking-wide ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Animated Active Background Curved Rectangle */}
                    {isSelected && (
                      <motion.div
                        layoutId="activePerformanceStatCapsule"
                        className="absolute inset-0 rounded-lg bg-linear-to-r from-cyan-500/25 via-sky-500/30 to-blue-500/25 border border-cyan-400/90 shadow-[0_0_16px_rgba(6,182,212,0.35)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div
                      className={`relative z-10 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-linear-to-tr from-cyan-400 to-sky-300 text-slate-950 font-black shadow-sm'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <TabIcon className="w-3 h-3" />
                    </div>
                    <span className="relative z-10 tracking-tight font-bold truncate text-[10px] sm:text-xs uppercase">
                      {stat.tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Swipable Card Container with popLayout */}
          <div className="relative overflow-hidden px-1">
            <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
              <motion.div
                key={stats[currentIndex].id}
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
                dragElastic={0.2}
                onDragStart={() => triggerTemporaryPause()}
                onDragEnd={(_, info) => {
                  triggerTemporaryPause();
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
                {renderStatCard(stats[currentIndex], currentIndex, true)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile & Tablet Slide Tracker Indicator */}
          <div className="flex items-center justify-between mt-4 px-2">
            <span className="text-[11px] text-slate-400 font-mono">
              Capability <span className="text-cyan-400 font-bold">{currentIndex + 1}</span> of {totalStats}
            </span>

            {/* Step Indicator Bars */}
            <div className="flex items-center gap-1.5">
              {stats.map((stat, dotIdx) => (
                <button
                  key={stat.id}
                  type="button"
                  onClick={() => handleSelectStat(dotIdx)}
                  className={`h-1.5 rounded-sm transition-all cursor-pointer ${
                    dotIdx === currentIndex
                      ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/40'
                      : 'w-2 bg-slate-800 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to metric ${dotIdx + 1}: ${stat.label}`}
                />
              ))}
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}

