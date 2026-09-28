import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  ArrowRight, 
  ArrowLeft,
  HelpCircle, 
  Check,
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MousePointerClick
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Container from './common/Container';
import { buttonHoverMotion } from '../lib/animations';
import { PackageItem } from '../types';

interface PackagesProps {
  onSelectPackage: (packageName: string) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  const { config } = useSiteConfig();
  const packagesData = config.packages && config.packages.length > 0 ? config.packages : [];
  const totalPackages = packagesData.length;

  // Active index (defaults to popular package if available, else 0)
  const initialIndex = Math.max(0, packagesData.findIndex((p) => p.popular));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Keep index within bounds if packages list shrinks
  useEffect(() => {
    if (totalPackages > 0 && currentIndex >= totalPackages) {
      setCurrentIndex(0);
    }
  }, [totalPackages, currentIndex]);

  // 5-second timer progress (0% - 100%)
  const [progress, setProgress] = useState<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic: tick progress every 50ms (5000ms total = 5s)
  useEffect(() => {
    if (totalPackages <= 1) return;
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Trigger next slide: moves middle to left, next becomes middle
          setSlideDirection('right');
          setCurrentIndex((idx) => (idx + 1) % totalPackages);
          return 0;
        }
        return prev + 1; // 1% every 50ms = 100% in 5000ms (5s)
      });
    }, 50);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, totalPackages]);

  // Handler functions for manual navigation
  const handleNext = () => {
    setSlideDirection('right');
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % totalPackages);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + totalPackages) % totalPackages);
  };

  const handleSelectTab = (index: number) => {
    setSlideDirection(index > currentIndex ? 'right' : 'left');
    setProgress(0);
    setCurrentIndex(index);
  };

  // Indices for the 3 desktop columns:
  // Left card, Center active card, Right card
  const leftIndex = (currentIndex - 1 + totalPackages) % totalPackages;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % totalPackages;

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

  // Render an individual card
  const renderCardContent = (pkg: PackageItem, isFocused: boolean, isLeftOrRightFaded = false) => {
    const isPopular = pkg.popular;

    return (
      <div
        className={`relative w-full rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500  ${
          isFocused
            ? isPopular
              ? 'bg-gradient-to-b from-[#111f3d] via-[#0b1428] to-[#070c18] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20'
              : 'bg-[#0b1325] border-2 border-slate-700 shadow-2xl shadow-black/60'
            : 'bg-[#080e1c] border border-slate-800/80 shadow-md hover:border-slate-700'
        }`}
      >
        {/* Top Banner for Popular Package */}
        {isPopular && (
          <div className="bg-gradient-to-r from-cyan-500/15 via-sky-500/20 to-blue-500/15 border-b border-cyan-500/30 py-1.5 px-3 text-cyan-300 text-center text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Most Popular • High-ROI Acceleration</span>
          </div>
        )}

        {/* Faded overlay hint when not in center on desktop */}
        {isLeftOrRightFaded && (
          <div className="absolute inset-0 z-30 bg-[#070b14]/75 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center cursor-pointer group-hover:bg-[#070b14]/55 transition-all">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/60 text-cyan-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-transform">
              <MousePointerClick className="w-4 h-4 text-cyan-400" />
              <span>Click to view {pkg.name}</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-medium">
              {pkg.tagline}
            </span>
          </div>
        )}

        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Header Row: Tier Badge + Inclusions */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isPopular && isFocused
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {pkg.id === 'basic' ? 'Tier 01 • Starter' : isPopular ? 'Tier 02 • Growth' : 'Tier 03 • Enterprise'}
              </span>

              <span className="text-[10px] font-mono font-medium text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                {pkg.features?.length || 13} Deliverables
              </span>
            </div>

            {/* Package Title & Description */}
            <div className="mb-3">
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {pkg.name}
              </h3>
              <p className="text-xs text-cyan-400 font-bold mt-0.5">
                {pkg.highlight}
              </p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                {pkg.tagline}
              </p>
            </div>

            {/* Investment Model Tag */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 mb-3 group-hover:border-cyan-500/20 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <span>Investment Model</span>
                <span className="text-cyan-400 font-bold">Standard Retainer</span>
              </div>
              <div className="text-base sm:text-lg font-black text-white mt-1 font-mono tracking-tight">
                {pkg.priceNote}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 mt-1 font-medium">
                <Check className="w-3 h-3 stroke-[3] text-cyan-400 shrink-0" />
                <span>Flexible Month-to-Month • Zero Lock-In</span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-1.5 pt-2 pb-3 border-t border-slate-800/80 flex-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Core Inclusions & Deliverables:
              </div>

              {pkg.features && pkg.features.slice(0, 5).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-200">
                  <div className="w-3.5 h-3.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-cyan-400 stroke-[3]" />
                  </div>
                  <span className="leading-snug text-slate-300">{feat.name}</span>
                </div>
              ))}

              {pkg.features && pkg.features.length > 5 && (
                <div className="text-[10px] text-cyan-400 font-mono font-semibold pt-1">
                  + {pkg.features.length - 5} more specialized deliverables included
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-3 border-t border-slate-800/80 mt-auto">
            <motion.button
              {...buttonHoverMotion}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPackage(pkg.name);
              }}
              className={`w-full min-h-[40px] py-2 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                isPopular && isFocused
                  ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 shadow-cyan-500/25 hover:brightness-110'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/15'
              }`}
              id={`btn-select-${pkg.id}`}
            >
              <span>Select {pkg.name}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <a
              href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi MarketinGlu, I am interested in inquiring about the ${pkg.name} package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full min-h-[36px] py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
      id="packages" 
      className="relative flex flex-col justify-center py-12 sm:py-16 lg:py-20 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{config.packagesSectionBadge || 'TRANSPARENT SERVICE TIERS'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {config.packagesSectionTitle1 || 'Tailored Digital Marketing'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              {config.packagesSectionTitle2 || 'Service Packages'}
            </span>
          </h2>

          <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            {config.packagesSectionDescription || 'Explore our curated packages calibrated for your growth stage. Plans rotate automatically or swipe freely on mobile to compare.'}
          </p>
        </div>

        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto relative px-2 sm:px-4">
            
            {/* Floating Caret Buttons for Desktop (Left & Right) */}
            {totalPackages > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hidden lg:flex absolute -left-4 xl:-left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-2xl bg-slate-900/90 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 items-center justify-center shadow-2xl shadow-cyan-950/80 backdrop-blur-md transition-all active:scale-90 cursor-pointer group"
                  aria-label="Previous package"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="hidden lg:flex absolute -right-4 xl:-right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-2xl bg-slate-900/90 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 items-center justify-center shadow-2xl shadow-cyan-950/80 backdrop-blur-md transition-all active:scale-90 cursor-pointer group"
                  aria-label="Next package"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}

            {/* DESKTOP 3-CARD TRUE 3D CAROUSEL VIEW - Generous width with 3D depth */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-5 xl:gap-8 items-stretch min-h-[460px] relative [perspective:1400px] [transform-style:preserve-3d]">
              
              {/* Column 1: Left 3D Depth Card */}
              <motion.div
                key={`left-${packagesData[leftIndex].id}`}
                initial={{ opacity: 0.3, scale: 0.85, x: slideDirection === 'right' ? 60 : -60, rotateY: 18 }}
                animate={{ opacity: 0.55, scale: 0.90, x: 0, rotateY: 14 }}
                whileHover={{ opacity: 0.85, scale: 0.93, rotateY: 8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleSelectTab(leftIndex)}
                className="cursor-pointer transition-all h-full flex flex-col group [transform-origin:right_center] z-10"
              >
                {renderCardContent(packagesData[leftIndex], false, true)}
              </motion.div>

              {/* Column 2: Center Elevated Active Card */}
              <motion.div
                key={`center-${packagesData[centerIndex].id}`}
                initial={{ opacity: 0.6, scale: 0.92, x: slideDirection === 'right' ? 60 : -60, rotateY: 0 }}
                animate={{ opacity: 1, scale: 1.02, x: 0, rotateY: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="z-30 relative h-full flex flex-col shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] rounded-3xl"
              >
                {renderCardContent(packagesData[centerIndex], true, false)}
              </motion.div>

              {/* Column 3: Right 3D Depth Card */}
              <motion.div
                key={`right-${packagesData[rightIndex].id}`}
                initial={{ opacity: 0.3, scale: 0.85, x: slideDirection === 'right' ? 60 : -60, rotateY: -18 }}
                animate={{ opacity: 0.55, scale: 0.90, x: 0, rotateY: -14 }}
                whileHover={{ opacity: 0.85, scale: 0.93, rotateY: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleSelectTab(rightIndex)}
                className="cursor-pointer transition-all h-full flex flex-col group [transform-origin:left_center] z-10"
              >
                {renderCardContent(packagesData[rightIndex], false, true)}
              </motion.div>

            </div>

            {/* MOBILE VIEW: 
                - Shows 1 plan at a time
                - Silky smooth simultaneous left & right swipe
                - Auto-changes every 5 seconds
            */}
            <div className="block lg:hidden relative max-w-sm sm:max-w-md mx-auto">
              
              {/* Swipe guidance indicator */}
              <div className="text-center mb-3">
                <span className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
                  <ArrowLeft className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Swipe left or right to switch plans</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400 animate-pulse" />
                </span>
              </div>

              {/* Swipable Card Container with popLayout for concurrent slide */}
              <div className="relative overflow-hidden px-1 min-h-[450px]">
                <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
                  <motion.div
                    key={packagesData[currentIndex].id}
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
                    {renderCardContent(packagesData[currentIndex], true, false)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile pagination indicators with Prev / Next */}
              <div className="flex items-center justify-between mt-5 px-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="min-h-[44px] flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-400" />
                  <span>Previous</span>
                </button>

                {/* 3 Pagination Dots */}
                <div className="flex items-center gap-1.5">
                  {packagesData.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleSelectTab(dotIdx)}
                      className={`h-2 rounded-md transition-all cursor-pointer ${
                        dotIdx === currentIndex
                          ? 'w-7 bg-cyan-400 shadow-md shadow-cyan-400/40'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to plan ${dotIdx + 1}`}
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

        {/* Bottom Customized Requirement Inquiry Box */}
        <div className="package-inquiry mt-8 sm:mt-10 p-3.5 sm:p-4 rounded-xl bg-[#0a1122] border border-slate-800/90 max-w-2xl sm:max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Need a Customized Retainer or Multi-Location Scope?</h4>
              <p className="package-inquiry-copy text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                MarketinGlu crafts bespoke omni-channel campaigns tailored to unique market footprints and international expansions.
              </p>
            </div>
          </div>

          <motion.button
            {...buttonHoverMotion}
            onClick={() => onSelectPackage('Customized Solution')}
            className="w-full sm:w-auto whitespace-nowrap min-h-[36px] px-4 py-1.5 rounded-lg border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 font-semibold text-xs transition-all cursor-pointer flex items-center justify-center shadow-sm shrink-0"
          >
            Get Custom Quote
          </motion.button>
        </div>

      </Container>
    </section>
  );
}
