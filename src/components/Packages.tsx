import { useState, useEffect } from 'react';
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
  Clock,
  Users,
  CheckCircle2,
  Crown
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

  // Active index (defaults to popular package if available, else index 1 or 0)
  const initialIndex = Math.max(0, packagesData.findIndex((p) => p.popular));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState<boolean>(false);
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

  if (!currentPkg) return null;

  const isPopular = !!currentPkg.popular;
  const totalFeatures = currentPkg.features?.length || 0;

  const tierLabel = currentPkg.id === 'basic' 
    ? 'Tier 01 • Starter' 
    : isPopular 
    ? 'Tier 02 • Growth' 
    : 'Tier 03 • Enterprise Scale';

  const turnaroundSLA = currentPkg.id === 'basic' 
    ? '10-14 Days Setup' 
    : isPopular 
    ? '14-21 Days Sprint' 
    : 'Rapid Continuous Execution';

  const dedicatedRole = currentPkg.id === 'basic' 
    ? '1 Dedicated Growth Strategist' 
    : isPopular 
    ? 'Senior Growth Architect + Content Lead' 
    : 'Full Growth Pod (4 Senior Specialists)';

  return (
    <section 
      id="packages" 
      className="relative flex flex-col justify-center py-16 sm:py-20 lg:py-24 bg-[#070b14] border-t border-slate-800/80 selection:bg-cyan-500 selection:text-white"
    >
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
           {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2.5 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{config.packagesSectionBadge || 'TRANSPARENT SERVICE TIERS'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {config.packagesSectionTitle1 || 'Tailored Digital Marketing'}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-500">
              {config.packagesSectionTitle2 || 'Service Packages'}
            </span>
          </h2>

          <p className="mt-2.5 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {config.packagesSectionDescription || 'Engineered packages calibrated for distinct growth stages. Compare full inclusions, dedicated team allocations, and turnkey execution scopes below.'}
          </p>
        </div>

        {/* INTERACTIVE PACKAGE CURVED RECTANGLE FLOATING DOCK */}
        <div className="relative max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto px-2 mt-2 sm:mt-4 mb-6 sm:mb-8 flex justify-center">
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-xl sm:rounded-2xl bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-full">
            {packagesData.map((pkg, tabIdx) => {
              const isSelected = tabIdx === safeCurrentIndex;
              const isPro = pkg.id === 'pro' || pkg.name.toLowerCase().includes('pro');
              const isAdvance = pkg.id === 'advance' || pkg.popular;
              const TabIcon = isAdvance ? Crown : isPro ? Sparkles : Zap;

              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => handleSelectPackage(tabIdx)}
                  className={`group relative flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[38px] select-none text-center w-full uppercase tracking-wide ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {/* Animated Active Background Curved Rectangle */}
                  {isSelected && (
                    <motion.div
                      layoutId="activePackageTabCapsule"
                      className="absolute inset-0 rounded-lg bg-linear-to-r from-cyan-500/25 via-sky-500/30 to-blue-500/25 border border-cyan-400/90 shadow-[0_0_16px_rgba(6,182,212,0.35)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Icon Badge */}
                  <div
                    className={`relative z-10 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'bg-linear-to-tr from-cyan-400 to-sky-300 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <TabIcon className="w-3 h-3" />
                  </div>

                  {/* Tab Label */}
                  <span className="relative z-10 tracking-tight font-bold truncate text-[11px] sm:text-xs uppercase">
                    {pkg.name.replace(' Package', '')}
                  </span>

                  {/* Popular Badge */}
                  {pkg.popular && (
                    <span className="hidden sm:inline-block relative z-10 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 shrink-0">
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
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Floating Desktop Only Next/Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden lg:flex absolute lg:-left-7 xl:-left-9 top-1/2 -translate-y-1/2 z-30 min-w-[52px] h-13 px-3.5 rounded-2xl bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret gap-1"
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
            className="hidden lg:flex absolute lg:-right-7 xl:-right-9 top-1/2 -translate-y-1/2 z-30 min-w-[52px] h-13 px-3.5 rounded-2xl bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret gap-1"
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
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                const swipeThreshold = 35;
                const velocityThreshold = 180;
                if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                  handlePrev();
                }
              }}
              className={`w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch relative cursor-grab active:cursor-grabbing touch-pan-y ${
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

              {/* LEFT COLUMN: Tier Metadata, Price Scope, SLA Metrics & CTA Button */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 min-h-[28px]">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                        isPopular
                          ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {tierLabel}
                    </span>

                    {isPopular ? (
                      <span className="bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Most Popular</span>
                      </span>
                    ) : (
                      <div className="h-6" />
                    )}
                  </div>

                  {/* Title & Highlight */}
                  <div className="min-h-[110px] sm:min-h-[100px]">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {currentPkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-sky-300 mt-1">
                      {currentPkg.highlight}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed line-clamp-2">
                      {currentPkg.tagline}
                    </p>
                  </div>
                </div>

                {/* Investment Scope Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#060a14]/90 border border-slate-800/90 shadow-inner min-h-[155px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                      <span>Engagement Scope</span>
                      <span className="text-cyan-400 font-bold">
                        {currentPkg.badge || 'Turnkey Retainer'}
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-black text-white">
                      {currentPkg.priceNote}
                    </div>
                  </div>

                  {/* SLA Badges */}
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 border-t border-slate-800/80 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{turnaroundSLA}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-sky-400 shrink-0" />
                        <span className="truncate">{dedicatedRole}</span>
                      </div>
                    </div>

                    <div className="text-xs text-cyan-300 mt-2 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Zero Lock-In &bull; Monthly Milestone Audits</span>
                    </div>
                  </div>
                </div>

                {/* Main CTA Button */}
                <div className="pt-1 mt-auto">
                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => onSelectPackage(currentPkg.name)}
                    className={`w-full min-h-[48px] py-3 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg ${
                      isPopular
                        ? 'bg-linear-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 shadow-cyan-500/30 hover:brightness-110'
                        : 'bg-linear-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/20 hover:brightness-110'
                    }`}
                    id={`btn-select-${currentPkg.id}`}
                  >
                    <span>Choose {currentPkg.name.replace(' Package', '')} Plan</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>
                </div>
              </div>

              {/* RIGHT COLUMN: Turnkey Deliverables & Inclusions Grid (Wide landscape layout) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3 pt-2 lg:pt-0 lg:border-l lg:border-slate-800/80 lg:pl-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 min-h-[22px]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>Included Turnkey Deliverables ({totalFeatures})</span>
                    </span>
                    <span className="text-cyan-400 font-mono text-xs">
                      Full Scope Unlocked
                    </span>
                  </div>

                  {/* 2-Column Responsive Deliverables Grid with uniform min-height */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-h-[220px] content-start">
                    {currentPkg.features?.slice(0, 8).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/70 hover:border-cyan-500/30 transition-colors text-xs text-slate-200 min-h-[44px]"
                      >
                        <div className="w-4 h-4 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug text-slate-300 line-clamp-2">
                          {feat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Assurance Badge */}
                <div className="pt-3 border-t border-slate-800/80 mt-auto flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Turnkey sprint scope with zero vendor lock-in</span>
                  </span>
                  <span className="font-mono text-slate-400 text-xs">
                    100% Milestone Audited
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile & Tablet Slide Tracker Indicator */}
          <div className="flex lg:hidden items-center justify-between mt-4 sm:mt-5 px-2">
            <span className="text-[11px] text-slate-400 font-mono">
              Tier <span className="text-cyan-400 font-bold">{safeCurrentIndex + 1}</span> of {packagesData.length}
            </span>

            {/* Step Indicator Bars (Curved Rectangles) */}
            <div className="flex items-center gap-1.5">
              {packagesData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleSelectPackage(dotIdx)}
                  className={`h-1.5 rounded-sm transition-all cursor-pointer ${
                    dotIdx === safeCurrentIndex
                      ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/40'
                      : 'w-2 bg-slate-800 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to package ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Ultra-Compact Inquiry Ribbon */}
        <div className="package-inquiry mt-3.5 sm:mt-4 py-1.5 px-3 sm:py-2 sm:px-4 rounded-xl bg-[#090f20]/80 border border-cyan-500/25 max-w-xl lg:max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md">
          <div className="flex items-center gap-2 text-left w-full sm:w-auto min-w-0">
            <div className="w-5 h-5 rounded-md bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HelpCircle className="w-3 h-3" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-white block truncate sm:inline sm:mr-1.5">
                Need a Custom Retainer or Enterprise Scope?
              </span>
              <span className="text-[11px] text-slate-400 block sm:inline truncate">
                Tailored for multi-location &amp; large media spends.
              </span>
            </div>
          </div>

          <motion.button
            {...buttonHoverMotion}
            onClick={() => onSelectPackage('Custom Enterprise Solution')}
            className="w-full sm:w-auto whitespace-nowrap py-1 px-3 rounded-lg border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 font-bold text-[11px] sm:text-xs transition-all cursor-pointer flex items-center justify-center shadow-sm shrink-0 min-h-[28px]"
          >
            Get Custom Quote &rarr;
          </motion.button>
        </div>

      </Container>
    </section>
  );
}
