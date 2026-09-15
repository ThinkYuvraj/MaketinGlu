import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, CheckCircle2, Sparkles, Zap, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion } from '../lib/animations';
import Container from './common/Container';

export default function PerformanceStats() {
  const { config } = useSiteConfig();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const stats = [
    {
      id: 'web-dev',
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
  };

  // Auto-rotation timer for mobile view
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Mobile drag animation variants
  const mobileSlideVariants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 260 : -260,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === 'right' ? -260 : 260,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const renderStatCard = (item: typeof stats[0], idx: number, isMobile = false) => {
    const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
    const gradientId = `cyan-gradient-${isMobile ? 'm-' : ''}${idx}`;
    const CardIcon = item.icon;

    return (
      <div 
        className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0c1424] via-[#09101d] to-[#070b14] border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden h-full select-none"
        id={`stat-card-${isMobile ? 'mobile-' : ''}${idx}`}
      >
        {/* Top Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

        <div>
          {/* Top Header Badge */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/25 text-[10px] font-bold text-cyan-400 tracking-wide uppercase">
              <CardIcon className="w-3 h-3 text-cyan-400" />
              <span>{item.badge}</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {item.category}
            </span>
          </div>

          {/* Circular Gauge Centerpiece */}
          <div className="flex justify-center my-3">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="60%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                {/* Background track circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth="7"
                  fill="transparent"
                />
                {/* Glowing active arc */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={`url(#${gradientId})`}
                  strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Percentage and sub-label in center */}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
                  {item.percentage}%
                </span>
                <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mt-1">
                  Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white text-center tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
            {item.label}
          </h3>

          {/* Description Info */}
          <p className="text-xs text-slate-400 text-center leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Bullet Highlights */}
          <div className="space-y-2 py-3 border-t border-slate-800/80">
            {item.highlights.map((point, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Impact KPI Badge */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs bg-slate-900/40 rounded-xl px-3 py-2 border border-slate-800/40">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {item.metricLabel}
          </span>
          <span className="text-xs font-extrabold text-cyan-300">
            {item.metricValue}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="growth" 
      className="relative flex flex-col justify-center py-12 sm:py-16 lg:py-20 bg-[#070b14] border-t border-slate-900/90"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <span id="performance" className="absolute -top-24" />
      <Container>
        
        {/* Consistent Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>VERIFIED CAPABILITY METRICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Our Performance In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Numbers
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 max-w-xl mx-auto">
            Battle-tested delivery standards calibrated for sustainable growth, search dominance, and client retention.
          </p>
        </div>

        {/* DESKTOP & TABLET: 4 Vertical Rectangle Cards in Multi-Column Grid */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
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

        {/* MOBILE VIEW: Single Swipable Card with Gestures, Dots & Controls */}
        <div className="block md:hidden relative max-w-sm sm:max-w-md mx-auto">
          
          {/* Swipe guidance indicator */}
          <div className="text-center mb-3">
            <span className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
              <ChevronLeft className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-semibold text-slate-300">Swipe left or right to switch performance metrics</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </span>
          </div>

          {/* Swipable Card Container with popLayout */}
          <div className="relative overflow-hidden px-1 min-h-[460px]">
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
                onDragEnd={(_, info) => {
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

          {/* Mobile pagination controls with Prev / Next */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button
              type="button"
              onClick={handlePrev}
              className="min-h-[44px] flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Previous metric"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span>Previous</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {stats.map((stat, dotIdx) => (
                <button
                  key={stat.id}
                  type="button"
                  onClick={() => handleSelectStat(dotIdx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === currentIndex
                      ? 'w-7 bg-cyan-400 shadow-md shadow-cyan-400/40'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to metric ${dotIdx + 1}: ${stat.label}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="min-h-[44px] flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Next metric"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

        </div>

      </Container>
    </section>
  );
}

