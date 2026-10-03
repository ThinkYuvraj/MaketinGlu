import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  ArrowRight, 
  HelpCircle, 
  Check,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Crown
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
import Container from './common/Container';
import { buttonHoverMotion } from '../lib/animations';
import { PackageItem } from '../types';

interface PackagesProps {
  onSelectPackage: (packageName: string) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  const { config } = useSiteConfig();
  const { navigateToPackageDetail } = useNavigation();
  const packagesData = config.packages && config.packages.length > 0 ? config.packages : [];
  const totalPackages = packagesData.length;

  // Active index (defaults to popular package if available, else index 1 or 0)
  const initialIndex = Math.max(0, packagesData.findIndex((p) => p.popular));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const isPaused = isHovered || isInteracting;
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);

  // Detect mobile & tablet for touch-swiping
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Keep index within bounds if packages list shrinks
  useEffect(() => {
    if (totalPackages > 0 && currentIndex >= totalPackages) {
      setCurrentIndex(0);
    }
  }, [totalPackages, currentIndex]);

  const safeCurrentIndex = totalPackages > 0 ? currentIndex % totalPackages : 0;
  const currentPkg: PackageItem = packagesData[safeCurrentIndex] || packagesData[0];

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalPackages);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalPackages) % totalPackages);
  };

  const handleSelectPackage = (index: number) => {
    setSlideDirection(index > safeCurrentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // 4-Second Auto-Swipe Timer (pauses on hover or drag)
  useEffect(() => {
    if (isPaused || totalPackages <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % totalPackages);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, totalPackages]);

  // True 3D depth slide variants
  const card3DVariants: Variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 80 : -80,
      rotateY: direction === 'right' ? 14 : -14,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 28, mass: 0.7 },
        rotateY: { duration: 0.35, ease: "easeOut" },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -80 : 80,
      rotateY: direction === 'right' ? -14 : 14,
      opacity: 0,
      scale: 0.94,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const isDraggingRef = useRef<boolean>(false);
  const packageDockRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = packageDockRef.current;
    const tab = tabRefs.current[safeCurrentIndex];
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
  }, [safeCurrentIndex]);

  if (!currentPkg) return null;

  const isPopular = !!currentPkg.popular;
  const totalFeatures = currentPkg.features?.length || 0;

  const tierLabel = currentPkg.id === 'basic' 
    ? 'Tier 01 • Starter' 
    : isPopular 
    ? 'Tier 02 • Growth' 
    : 'Tier 03 • Enterprise Scale';

  return (
    <section 
      id="packages" 
      className="relative w-full min-h-0 py-6 sm:py-8 lg:py-10 flex flex-col justify-center items-center bg-[#070b14] border-t border-slate-800/80 selection:bg-cyan-500 selection:text-white overflow-hidden"
    >
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
           {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-3 sm:mb-4 lg:mb-5">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{config.packagesSectionBadge || 'TRANSPARENT SERVICE TIERS'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-black text-white tracking-tight leading-snug sm:leading-tight lg:whitespace-nowrap text-center">
            {config.packagesSectionTitle1 || 'Tailored Digital Marketing'}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-500">
              {config.packagesSectionTitle2 || 'Service Packages'}
            </span>
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto text-center line-clamp-2 lg:text-justify">
            {config.packagesSectionDescription || 'Engineered packages calibrated for distinct growth stages. Compare full inclusions, dedicated team allocations, and turnkey execution scopes below.'}
          </p>
        </div>

        {/* INTERACTIVE PACKAGE CURVED RECTANGLE FLOATING DOCK */}
        <div className="relative max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto px-1 sm:px-2 mt-1 sm:mt-2 mb-3 sm:mb-4 flex justify-center">
          <div ref={packageDockRef} className="flex flex-row items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-full overflow-x-auto scrollbar-none px-2">
            {packagesData.map((pkg, tabIdx) => {
              const isSelected = tabIdx === safeCurrentIndex;
              const isPro = pkg.id === 'pro' || pkg.name.toLowerCase().includes('pro');
              const isAdvance = pkg.id === 'advance' || pkg.popular;
              const TabIcon = isAdvance ? Crown : isPro ? Sparkles : Zap;

              return (
                <button
                  key={pkg.id}
                  ref={(el) => { tabRefs.current[tabIdx] = el; }}
                  type="button"
                  onClick={() => handleSelectPackage(tabIdx)}
                  className={`group relative flex flex-row items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none uppercase tracking-wide shrink-0 ${
                    isSelected
                      ? 'bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.45)] scale-102'
                      : 'bg-[#091122]/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40'
                  }`}
                >
                  <div className={`w-4 sm:w-5 h-4 sm:h-5 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-slate-950 text-cyan-400 font-black' : 'bg-slate-800 text-cyan-400 group-hover:text-slate-200'
                  }`}>
                    <TabIcon className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="tracking-tight font-bold text-[11px] sm:text-xs uppercase whitespace-nowrap">
                    {pkg.name.replace(' Package', '')}
                  </span>
                  {pkg.popular && (
                    <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0 ${
                      isSelected ? 'bg-slate-950/25 text-slate-950' : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    }`}>
                      Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D CARETS CAROUSEL (Landscape Rounded Rectangle: Width More, Height Less) */}
        <div 
          className="relative max-w-4xl lg:max-w-5xl xl:max-w-[1120px] 2xl:max-w-[1180px] w-full mx-auto px-2 sm:px-6 lg:px-8"
          style={{ perspective: 1200 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Floating Desktop Only Next/Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden lg:flex absolute lg:-left-7 xl:-left-9 top-1/2 -translate-y-1/2 z-30 min-w-[52px] h-12 px-3.5 rounded-xl bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret gap-1"
            aria-label="Previous package"
            title="Previous Package"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover/caret:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-bold font-mono pr-1">Prev</span>
          </button>

          {/* Right Floating Desktop Only Next/Prev Button */}
          <button
            type="button"
            onClick={handleNext}
            className="hidden lg:flex absolute lg:-right-7 xl:-right-9 top-1/2 -translate-y-1/2 z-30 min-w-[52px] h-12 px-3.5 rounded-xl bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret gap-1"
            aria-label="Next package"
            title="Next Package"
          >
            <span className="text-xs font-bold font-mono pl-1">Next</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/caret:translate-x-0.5 transition-transform" />
          </button>

          {/* 3D Animated Card Container with Touch/Drag Swiping on Mobile/Tablet */}
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={currentPkg.id}
              custom={slideDirection}
              variants={card3DVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragSnapToOrigin={true}
              dragElastic={0.15}
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
                const velocityThreshold = 180;
                if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                  handlePrev();
                }
              }}
              className={`w-full min-h-0 sm:min-h-0 lg:h-[370px] lg:min-h-[370px] rounded-2xl sm:rounded-3xl lg:rounded-[24px] overflow-hidden p-3.5 sm:p-4 lg:p-5 shadow-2xl backdrop-blur-2xl flex flex-col justify-between relative cursor-grab active:cursor-grabbing touch-pan-y ${
                isPopular
                  ? 'bg-linear-to-b from-[#0f1b36]/98 via-[#0b1325]/98 to-[#070c18]/98 border-2 border-cyan-400/90 shadow-cyan-500/20'
                  : 'bg-linear-to-b from-[#0e1628]/98 via-[#0a101e]/98 to-[#060a14]/98 border border-slate-800/90 shadow-cyan-500/10'
              }`}
            >
              {/* 4-Second Auto-Swipe Active Progress Indicator Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-slate-800/80 overflow-hidden">
                <motion.div
                  key={`${currentPkg.id}-${isPaused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "100%" : "100%" }}
                  transition={{
                    duration: isPaused ? 0 : 4,
                    ease: "linear",
                  }}
                  className="h-full bg-linear-to-r from-sky-400 via-cyan-400 to-teal-300 shadow-sm shadow-cyan-400/50"
                />
              </div>

              {/* Top Section: Left Metadata & Right Deliverables */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-stretch w-full flex-1 min-h-0">
                {/* LEFT COLUMN: Tier Metadata & Title */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-2">
                  <div className="flex flex-col justify-between h-full">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 h-7 mb-1.5 shrink-0">
                      <span
                        className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isPopular
                            ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-sm'
                            : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {tierLabel}
                      </span>

                      {isPopular ? (
                        <span className="bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3 fill-slate-950" />
                          <span>Most Popular</span>
                        </span>
                      ) : (
                        <div className="h-5" />
                      )}
                    </div>

                    {/* Title & Highlight */}
                    <div className="flex-1 flex flex-col justify-center min-h-0 py-1">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {currentPkg.name}
                      </h3>
                      <p className="text-xs font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-sky-300 mt-0.5">
                        {currentPkg.highlight}
                      </p>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-3 lg:text-justify">
                        {currentPkg.tagline}
                      </p>
                      <div className="mt-2.5">
                        <motion.button
                          {...buttonHoverMotion}
                          type="button"
                          onClick={() => {
                            if (isDraggingRef.current) return;
                            navigateToPackageDetail(currentPkg.id);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group/knowmore"
                        >
                          <span>Know More</span>
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/knowmore:translate-x-1 transition-transform stroke-[2.5]" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Turnkey Deliverables & Inclusions Grid */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-2 pt-2 lg:pt-0 lg:border-l lg:border-slate-800/80 lg:pl-5">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider h-7 mb-2 shrink-0">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span>Included Turnkey Deliverables ({totalFeatures})</span>
                      </span>
                      <motion.button
                        {...buttonHoverMotion}
                        type="button"
                        onClick={() => {
                          if (isDraggingRef.current) return;
                          navigateToPackageDetail(currentPkg.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white text-[11px] font-mono font-bold tracking-tight transition-all shadow-sm hover:shadow-cyan-500/20 cursor-pointer group/btn shrink-0"
                        title="View all N facilities and full scope breakdown"
                      >
                        <span>Full Scope Unlocked</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-0.5 transition-transform stroke-[2.5]" />
                      </motion.button>
                    </div>

                    {/* Turnkey Deliverables: Clean Bullet Points on Mobile, 2-Column Cards Grid on Desktop/Tablet */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 content-start flex-1">
                      {currentPkg.features?.slice(0, 8).map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 py-1 px-1.5 sm:p-2 sm:rounded-lg sm:bg-slate-900/50 sm:hover:bg-slate-900/80 sm:border sm:border-slate-800/70 sm:hover:border-cyan-500/30 transition-colors text-xs text-slate-200 h-[38px] min-h-[38px] overflow-hidden"
                        >
                          {/* Mobile Only: Glowing Cyan Bullet Point */}
                          <div className="flex sm:hidden items-center justify-center shrink-0 w-3.5 h-3.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                          </div>

                          {/* Tablet & Desktop Only: Check Icon Badge */}
                          <div className="hidden sm:flex w-4 h-4 rounded-md bg-cyan-500/15 border border-cyan-500/30 items-center justify-center shrink-0 text-cyan-300">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>

                          <span className="leading-tight text-slate-200 sm:text-slate-300 text-[11px] sm:text-xs font-normal line-clamp-2">
                            {feat.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FULL WIDTH BOTTOM CTA BUTTON (At the bottom of the card) */}
              <div className="w-full pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-slate-800/80 shrink-0">
                <motion.button
                  {...buttonHoverMotion}
                  onClick={() => {
                    if (isDraggingRef.current) return;
                    onSelectPackage(currentPkg.name);
                  }}
                  className={`w-full min-h-[44px] sm:min-h-[48px] py-2.5 sm:py-3 px-6 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl ${
                    isPopular
                      ? 'bg-linear-to-r from-sky-400 via-cyan-400 to-blue-500 text-slate-950 shadow-cyan-500/35 hover:brightness-110'
                      : 'bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 shadow-cyan-500/25 hover:brightness-110'
                  }`}
                  id={`btn-select-${currentPkg.id}`}
                >
                  <span>Choose {currentPkg.name.replace(' Package', '')} Plan</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 stroke-[3]" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>



      </Container>
    </section>
  );
}
