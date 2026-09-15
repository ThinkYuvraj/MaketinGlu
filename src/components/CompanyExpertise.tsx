import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Check,
  ShieldCheck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  MousePointerClick
} from 'lucide-react';
import { expertiseData, ExpertiseItem } from '../data/expertiseData';
import Container from './common/Container';
import { useNavigation } from '../context/NavigationContext';
import { buttonHoverMotion } from '../lib/animations';

interface CompanyExpertiseProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export default function CompanyExpertise({ onOpenConsultation }: CompanyExpertiseProps) {
  const { navigateToService } = useNavigation();
  const services = expertiseData;
  const totalServices = services.length;

  // Active carousel state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [progress, setProgress] = useState<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Safe bounded indices
  const safeCurrentIndex = totalServices > 0 ? currentIndex % totalServices : 0;
  const leftIndex = totalServices > 0 ? (safeCurrentIndex - 1 + totalServices) % totalServices : 0;
  const centerIndex = safeCurrentIndex;
  const rightIndex = totalServices > 0 ? (safeCurrentIndex + 1) % totalServices : 0;

  // 5-second timer auto-rotation
  useEffect(() => {
    if (isPaused || totalServices <= 1) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setSlideDirection('right');
          setCurrentIndex((idx) => (idx + 1) % totalServices);
          return 0;
        }
        return prev + 1; // 1% every 50ms = 100% in 5000ms (5s)
      });
    }, 50);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, totalServices]);

  // Navigation handlers
  const handleNext = () => {
    setSlideDirection('right');
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % totalServices);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  const handleSelectTab = (index: number) => {
    setSlideDirection(index > safeCurrentIndex ? 'right' : 'left');
    setProgress(0);
    setCurrentIndex(index);
  };

  // Animation variants for smooth mobile horizontal card sliding
  const mobileSlideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0.2,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0.2,
      scale: 0.95,
      zIndex: 0,
    }),
  };

  // Render individual discipline card (exact match to Packages architecture)
  const renderCardContent = (service: ExpertiseItem, isFocused: boolean, isLeftOrRightFaded = false, itemIndex = 0) => {
    const Icon = service.icon;
    const isPopular = service.id === 'seo' || service.id === 'web-design';
    const popularBadgeText = service.id === 'seo' 
      ? 'MOST POPULAR • HIGH-ROI ACCELERATION' 
      : 'FLAGSHIP ARCHITECTURE • SUB-SECOND LOADS';

    const tierNumber = String(itemIndex + 1).padStart(2, '0');

    return (
      <div
        className={`relative w-full h-full rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500  ${
          isFocused
            ? isPopular
              ? 'bg-gradient-to-b from-[#111f3d] via-[#0b1428] to-[#070c18] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20'
              : 'bg-[#0b1325] border-2 border-slate-700 shadow-2xl shadow-black/60'
            : 'bg-[#080e1c] border border-slate-800/80 shadow-md hover:border-slate-700'
        }`}
      >
        {/* Top Banner for Flagship/Popular Disciplines */}
        {isPopular && isFocused && (
          <div className="rounded-t-[22px] bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 text-slate-950 text-center py-1.5 px-4 text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 fill-slate-950" />
            <span>{popularBadgeText}</span>
          </div>
        )}

        {/* Faded overlay hint when not in center on desktop */}
        {isLeftOrRightFaded && (
          <div className="absolute inset-0 z-30 bg-[#070b14]/70 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center cursor-pointer group-hover:bg-[#070b14]/50 transition-all">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/60 text-cyan-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-transform">
              <MousePointerClick className="w-4 h-4 text-cyan-400" />
              <span>Click to view {service.tabLabel}</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-medium">
              {service.title.split(',')[0]}
            </span>
          </div>
        )}

        <div className="p-4.5 sm:p-5.5 flex-1 overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header Row: Tier Badge + Inclusions */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className={`text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isPopular && isFocused
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Tier {tierNumber} • {service.tabLabel}
              </span>

              <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                {service.deliverables?.length || 6} Deliverables
              </span>
            </div>

            {/* Package / Discipline Title & Description */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug line-clamp-1">
                  {service.title.split(',')[0]}
                </h3>
              </div>
              <p className="text-xs text-cyan-400 font-bold mt-0.5 line-clamp-1">
                {service.subtitle}
              </p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                {service.summary}
              </p>
            </div>

            {/* Investment Model Tag */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#050812] border border-slate-800/80 mb-3.5">
              <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-400 uppercase">
                <span>Investment Model</span>
                <span className="text-cyan-400 font-bold">{service.timelineEstimate}</span>
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                {service.priceEstimate || 'Custom quote per project scope'}
              </div>
              <div className="text-[10px] text-cyan-400 mt-0.5 font-medium">
                ✓ Flexible Month-to-Month • Zero Lock-In
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-1.5 pt-2 pb-3.5 border-t border-slate-800/80 flex-1">
              <div className="text-[9.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Core Inclusions & Deliverables:
              </div>

              {service.deliverables && service.deliverables.slice(0, 5).map((deliv, dIdx) => (
                <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-200">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2 h-2 text-cyan-400 stroke-[3]" />
                  </div>
                  <span className="leading-tight line-clamp-1">{deliv}</span>
                </div>
              ))}

              {service.deliverables && service.deliverables.length > 5 && (
                <div className="text-[10px] text-cyan-400 font-semibold pt-0.5">
                  + {service.deliverables.length - 5} more specialized deliverables included
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5 pt-3 border-t border-slate-800/80 mt-auto">
            <motion.button
              {...buttonHoverMotion}
              onClick={(e) => {
                e.stopPropagation();
                navigateToService(service.id);
              }}
              className={`w-full min-h-[42px] py-2 px-4 rounded-xl font-extrabold text-xs sm:text-[13px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                isPopular && isFocused
                  ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 shadow-cyan-500/25 hover:brightness-110'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/15'
              }`}
              id={`expertise-select-${service.id}`}
            >
              <span>Select {service.tabLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            <a
              href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi MarketingGlu, I am interested in inquiring about ${service.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full min-h-[38px] py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="expertise" 
      className="relative flex flex-col justify-center py-16 sm:py-20 lg:py-28 bg-[#070b14] border-t border-slate-800/80 "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Invisible anchor targets so all legacy and external links resolve smoothly */}
      <span id="services" className="absolute -top-24" />
      <span id="capabilities" className="absolute -top-24" />
      <span id="web-design" className="absolute -top-24" />
      <span id="ecommerce" className="absolute -top-24" />
      <span id="seo" className="absolute -top-24" />
      <span id="graphic-design" className="absolute -top-24" />
      <span id="ppc" className="absolute -top-24" />
      <span id="smo" className="absolute -top-24" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-[450px] h-[450px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[450px] h-[450px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR 6 CORE DISCIPLINES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            End-to-End Digital Solutions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Engineered for Growth
            </span>
          </h2>

          <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Eliminate fragmented vendors. Every discipline operates under one roof with dedicated senior architects in New Delhi, battle-tested playbooks, and transparent deliverables.
          </p>

          <p className="mt-1 text-cyan-400/90 text-xs font-medium">
            Disciplines rotate automatically or swipe freely on mobile to explore.
          </p>

        </div>

        {/* 3-Card Rotating Showcase View (Matching Packages) */}
        <div className="w-full mx-auto">
          
          {/* DESKTOP 3-CARD ROTATING VIEW (Matching Packages) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-5 xl:gap-6 items-stretch min-h-[500px] relative">
            
            {/* Column 1: Left Faded Card */}
            {totalServices > 1 && (
              <motion.div
                key={`left-${services[leftIndex].id}`}
                initial={{ opacity: 0.2, scale: 0.88, x: slideDirection === 'right' ? 50 : -50 }}
                animate={{ opacity: 0.45, scale: 0.92, x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleSelectTab(leftIndex)}
                className="cursor-pointer hover:opacity-85 transition-opacity h-full flex flex-col group"
              >
                {renderCardContent(services[leftIndex], false, true, leftIndex)}
              </motion.div>
            )}

            {/* Column 2: Center Highlighted Active Card */}
            <motion.div
              key={`center-${services[centerIndex].id}`}
              initial={{ opacity: 0.5, scale: 0.96, x: slideDirection === 'right' ? 65 : -65 }}
              animate={{ opacity: 1, scale: 1.02, x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`z-20 relative h-full flex flex-col ${totalServices === 1 ? 'lg:col-start-2' : ''}`}
            >
              {renderCardContent(services[centerIndex], true, false, centerIndex)}
            </motion.div>

            {/* Column 3: Right Faded Card */}
            {totalServices > 1 && (
              <motion.div
                key={`right-${services[rightIndex].id}`}
                initial={{ opacity: 0.2, scale: 0.88, x: slideDirection === 'right' ? 50 : -50 }}
                animate={{ opacity: 0.45, scale: 0.92, x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleSelectTab(rightIndex)}
                className="cursor-pointer hover:opacity-85 transition-opacity h-full flex flex-col group"
              >
                {renderCardContent(services[rightIndex], false, true, rightIndex)}
              </motion.div>
            )}

          </div>

            {/* Progress Bar & Desktop Navigation Controls */}
            <div className="hidden lg:flex items-center justify-between max-w-xl mx-auto mt-6 px-4">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
                aria-label="Previous discipline"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Discipline Quick Dots */}
              <div className="flex items-center gap-2">
                {services.map((service, dotIdx) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleSelectTab(dotIdx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      dotIdx === safeCurrentIndex
                        ? 'w-8 bg-cyan-400 shadow-md shadow-cyan-400/40'
                        : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Jump to ${service.tabLabel}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
                aria-label="Next discipline"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Auto-rotation Progress Bar */}
            <div className="hidden lg:block max-w-xs mx-auto mt-4">
              <div className="h-1 w-full bg-slate-800/80 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* MOBILE VIEW: Single Swipable Card */}
            <div className="block lg:hidden relative max-w-sm sm:max-w-md mx-auto mt-4">
              
              {/* Swipe guidance indicator */}
              <div className="text-center mb-3">
                <span className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Swipe left or right to switch disciplines</span>
                  <ChevronRight className="w-3 h-3 text-cyan-400 animate-pulse" />
                </span>
              </div>

              {/* Swipable Card Container with popLayout for concurrent slide */}
              <div className="relative overflow-hidden px-1 min-h-[450px]">
                <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
                  <motion.div
                    key={services[safeCurrentIndex].id}
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
                    {renderCardContent(services[safeCurrentIndex], true, false, safeCurrentIndex)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile pagination controls with Prev / Next */}
              <div className="flex items-center justify-between mt-5 px-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="min-h-[44px] flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-400" />
                  <span>Previous</span>
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center gap-1.5">
                  {services.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleSelectTab(dotIdx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === safeCurrentIndex
                          ? 'w-7 bg-cyan-400 shadow-md shadow-cyan-400/40'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to discipline ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[44px] flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

            </div>

          </div>

      </Container>
    </section>
  );
}

