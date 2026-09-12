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
  const packagesData = config.packages;
  const totalPackages = packagesData.length;

  // Active index (starts at 1 for Advance Package which is Most Popular)
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // 5-second timer progress (0% - 100%)
  const [progress, setProgress] = useState<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic: tick progress every 50ms (5000ms total = 5s)
  useEffect(() => {
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

  // Render an individual card
  const renderCardContent = (pkg: PackageItem, isFocused: boolean, isLeftOrRightFaded = false) => {
    const isPopular = pkg.popular;

    return (
      <div
        className={`relative w-full rounded-3xl flex flex-col justify-between transition-all duration-500 overflow-hidden ${
          isFocused
            ? isPopular
              ? 'bg-gradient-to-b from-[#111f3d] via-[#0b1428] to-[#070c18] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20'
              : 'bg-[#0b1325] border-2 border-slate-700 shadow-2xl shadow-black/60'
            : 'bg-[#080e1c] border border-slate-800/80 shadow-md'
        }`}
      >
        {/* Top Banner for Popular Package */}
        {isPopular && (
          <div className="bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 text-slate-950 text-center py-1.5 px-4 text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 fill-slate-950" />
            <span>MOST POPULAR • HIGH-ROI ACCELERATION</span>
          </div>
        )}

        {/* Faded overlay hint when not in center on desktop */}
        {isLeftOrRightFaded && (
          <div className="absolute inset-0 z-30 bg-[#070b14]/50 backdrop-blur-[0.5px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity p-4 text-center cursor-pointer">
            <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center gap-1.5 shadow-lg">
              <MousePointerClick className="w-4 h-4 text-cyan-400" />
              <span>Click to view {pkg.name}</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-7 flex-1 flex flex-col">
          {/* Header Row: Tier Badge + Inclusions */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span
              className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                isPopular && isFocused
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {pkg.id === 'basic' ? 'Tier 01 • Starter' : isPopular ? 'Tier 02 • Growth' : 'Tier 03 • Enterprise'}
            </span>

            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              13 Deliverables
            </span>
          </div>

          {/* Package Title & Description */}
          <div className="mb-5">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {pkg.name}
            </h3>
            <p className="text-xs sm:text-sm text-cyan-400 font-bold mt-1">
              {pkg.highlight}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {pkg.tagline}
            </p>
          </div>

          {/* Investment Model Tag */}
          <div className="p-3.5 rounded-2xl bg-[#050812] border border-slate-800/80 mb-5">
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">
              Investment Model
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              {pkg.priceNote}
            </div>
            <div className="text-[10px] text-cyan-400 mt-0.5 font-medium">
              ✓ Flexible Month-to-Month • Zero Lock-In
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="space-y-2.5 pt-2 pb-5 border-t border-slate-800/80 flex-1">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Core Inclusions & Deliverables:
            </div>

            {pkg.features && pkg.features.slice(0, 8).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-200">
                <div className="w-4 h-4 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-cyan-400 stroke-[3]" />
                </div>
                <span className="leading-snug">{feat.name}</span>
              </div>
            ))}

            {pkg.features && pkg.features.length > 8 && (
              <div className="text-[10px] sm:text-[11px] text-cyan-400 font-semibold pt-1">
                + {pkg.features.length - 8} more specialized deliverables included
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-slate-800/80 mt-auto">
            <motion.button
              {...buttonHoverMotion}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPackage(pkg.name);
              }}
              className={`w-full min-h-[46px] py-3 px-5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                isPopular && isFocused
                  ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 shadow-cyan-500/25 hover:brightness-110'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/15'
              }`}
              id={`btn-select-${pkg.id}`}
            >
              <span>Select {pkg.name}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <a
              href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi Marketing LU, I am interested in inquiring about the ${pkg.name} package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full min-h-[40px] py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
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
      className="relative py-20 lg:py-28 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSPARENT SERVICE TIERS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tailored Digital Marketing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Service Packages
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Explore our curated packages calibrated for your growth stage. Plans automatically rotate every 5 seconds or swipe freely on mobile to compare.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
            
            {/* DESKTOP 3-CARD ANIMATION VIEW: 
                - Left card: Faded (opacity-40, scale-90), clicking shifts to middle
                - Middle card: Active focus (opacity-100, scale-100, illuminated)
                - Right card: Faded (opacity-40, scale-90), clicking shifts to middle
                - Every 5s, middle moves to left, right moves to middle
            */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 items-center min-h-[640px] relative">
              
              {/* Column 1: Left Faded Card */}
              <motion.div
                key={`left-${packagesData[leftIndex].id}`}
                layout
                initial={{ opacity: 0.2, scale: 0.88, x: -30 }}
                animate={{ opacity: 0.42, scale: 0.92, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => handleSelectTab(leftIndex)}
                className="cursor-pointer hover:opacity-75 transition-opacity"
              >
                {renderCardContent(packagesData[leftIndex], false, true)}
              </motion.div>

              {/* Column 2: Center Highlighted Active Card */}
              <motion.div
                key={`center-${packagesData[centerIndex].id}`}
                layout
                initial={{ opacity: 0.8, scale: 0.95, y: slideDirection === 'right' ? 20 : -20 }}
                animate={{ opacity: 1, scale: 1.02, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="z-20 relative"
              >
                {renderCardContent(packagesData[centerIndex], true, false)}
              </motion.div>

              {/* Column 3: Right Faded Card */}
              <motion.div
                key={`right-${packagesData[rightIndex].id}`}
                layout
                initial={{ opacity: 0.2, scale: 0.88, x: 30 }}
                animate={{ opacity: 0.42, scale: 0.92, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => handleSelectTab(rightIndex)}
                className="cursor-pointer hover:opacity-75 transition-opacity"
              >
                {renderCardContent(packagesData[rightIndex], false, true)}
              </motion.div>

            </div>

            {/* MOBILE VIEW: 
                - Shows 1 plan at a time
                - Left & Right swipe functionality to inspect all plans
                - Auto-changes every 5 seconds
            */}
            <div className="block lg:hidden relative">
              
              {/* Swipe guidance indicator */}
              <div className="text-center mb-3">
                <span className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
                  <ArrowLeft className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Swipe left or right to switch plans</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400 animate-pulse" />
                </span>
              </div>

              {/* Swipable Card Container */}
              <div className="relative overflow-hidden px-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={packagesData[currentIndex].id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(_, info) => {
                      // Left swipe: next package
                      if (info.offset.x < -40 || info.velocity.x < -300) {
                        handleNext();
                      } 
                      // Right swipe: previous package
                      else if (info.offset.x > 40 || info.velocity.x > 300) {
                        handlePrev();
                      }
                    }}
                    initial={{ opacity: 0, x: slideDirection === 'right' ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: slideDirection === 'right' ? -80 : 80 }}
                    transition={{ duration: 0.32, ease: "easeInOut" }}
                    className="touch-pan-y cursor-grab active:cursor-grabbing"
                  >
                    {renderCardContent(packagesData[currentIndex], true, false)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile pagination indicators with Prev / Next */}
              <div className="flex items-center justify-between mt-5 px-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* 3 Pagination Dots */}
                <div className="flex items-center gap-2">
                  {packagesData.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleSelectTab(dotIdx)}
                      className={`h-2.5 rounded-full transition-all ${
                        dotIdx === currentIndex
                          ? 'w-7 bg-cyan-400 shadow-md shadow-cyan-400/40'
                          : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to plan ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        {/* Bottom Customized Requirement Inquiry Box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#0a1122] border border-slate-800/90 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">Need a Customized Retainer or Multi-Location Scope?</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Marketing LU crafts bespoke omni-channel campaigns tailored to unique market footprints and international expansions.
              </p>
            </div>
          </div>

          <motion.button
            {...buttonHoverMotion}
            onClick={() => onSelectPackage('Customized Solution')}
            className="w-full sm:w-auto whitespace-nowrap min-h-[46px] px-6 py-2.5 rounded-xl border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center shadow-sm"
          >
            Get Custom Quote
          </motion.button>
        </div>

      </Container>
    </section>
  );
}
