import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  ArrowRight, 
  HelpCircle, 
  Table as TableIcon, 
  Award,
  Check,
  Play,
  Pause,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { packageCategories } from '../data/packageFeatures';
import Container from './common/Container';
import PackageDeliverablesTable from './packages/PackageDeliverablesTable';
import PackageFullMatrix from './packages/PackageFullMatrix';
import { buttonHoverMotion } from '../lib/animations';

interface PackagesProps {
  onSelectPackage: (packageName: string) => void;
}

const AUTO_SWIPE_INTERVAL_MS = 6000;

// High-performance directional slide variants with no CSS transition collision
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function Packages({ onSelectPackage }: PackagesProps) {
  const { config } = useSiteConfig();
  const packagesData = config.packages;

  // Tab management (0: Basic, 1: Advance, 2: Pro)
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1: next, -1: prev
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(false);

  // Key counter to force smooth progress bar replay on active tab change
  const [cycleKey, setCycleKey] = useState<number>(0);

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);

  // Next tab transition
  const handleNextTab = useCallback(() => {
    setDirection(1);
    setActiveTabIndex((prev) => (prev + 1) % packagesData.length);
    setCycleKey((prev) => prev + 1);
  }, [packagesData.length]);

  // Prev tab transition
  const handlePrevTab = useCallback(() => {
    setDirection(-1);
    setActiveTabIndex((prev) => (prev - 1 + packagesData.length) % packagesData.length);
    setCycleKey((prev) => prev + 1);
  }, [packagesData.length]);

  // Switch tabs directly via tab button click
  const handleSelectTab = (index: number) => {
    if (index === activeTabIndex) return;
    
    // Circular awareness for smooth slide direction
    if (activeTabIndex === 2 && index === 0) {
      setDirection(1);
    } else if (activeTabIndex === 0 && index === 2) {
      setDirection(-1);
    } else {
      setDirection(index > activeTabIndex ? 1 : -1);
    }

    setActiveTabIndex(index);
    setCycleKey((prev) => prev + 1);
  };

  // Clean single-timeout auto-swipe loop that pauses reliably on hover or manual pause
  useEffect(() => {
    if (isHovered || isPaused) return;

    const timer = setTimeout(() => {
      handleNextTab();
    }, AUTO_SWIPE_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [isHovered, isPaused, activeTabIndex, cycleKey, handleNextTab]);

  // Touch gestures for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNextTab();
    } else if (diff < -45) {
      handlePrevTab();
    }
    touchStartXRef.current = null;
  };

  const activePackage = packagesData[activeTabIndex] || packagesData[0];

  const getPackageBadgeColor = (pkgId: string) => {
    switch (pkgId) {
      case 'advance':
        return 'from-sky-500 via-cyan-400 to-teal-400 text-slate-950 font-black shadow-cyan-500/20';
      case 'pro':
        return 'from-cyan-400 via-sky-300 to-blue-500 text-slate-950 font-black shadow-blue-500/20';
      default:
        return 'from-cyan-500/20 via-sky-500/20 to-teal-500/20 text-cyan-300 border border-cyan-400/40 font-bold';
    }
  };

  const getTabIcon = (pkgId: string) => {
    switch (pkgId) {
      case 'advance':
        return Sparkles;
      case 'pro':
        return Award;
      default:
        return Zap;
    }
  };

  return (
    <section 
      id="packages" 
      className="relative py-20 lg:py-28 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-sky-600/5 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>MARKETING LU PACKAGES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tailored Digital Marketing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Service Packages
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Explore our strategic service tiers designed to accelerate visibility, organic search authority, and market dominance.
          </p>

          {/* Clean Auto-Cycle Status & Control Pill */}
          <div className="mt-5 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0a1122] border border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPaused || isHovered ? 'bg-amber-400' : 'bg-cyan-400 animate-pulse'}`} />
              <span className="text-[11px] font-medium">
                {isPaused ? 'Auto-swipe paused' : isHovered ? 'Paused on hover' : 'Auto-cycles every 6s'}
              </span>
            </span>

            <span className="text-slate-700">|</span>

            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              title={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Three Dedicated Package Tab Selector Cards */}
        <div className="max-w-5xl mx-auto mb-8">
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-2 rounded-2xl bg-[#0a0f1d] border border-slate-800 shadow-xl"
            role="tablist"
            aria-label="Marketing Packages Tabs"
          >
            {packagesData.map((pkg, idx) => {
              const isActive = activeTabIndex === idx;
              const TabIcon = getTabIcon(pkg.id);

              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => handleSelectTab(idx)}
                  className={`relative p-4 sm:p-5 rounded-xl text-left cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#111e38] to-[#0c152a] border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.01]'
                      : 'bg-slate-900/40 border-2 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                  id={`tab-package-${pkg.id}`}
                >
                  {/* GPU-Accelerated 6-second progress indicator along top of active tab */}
                  {isActive && !isHovered && !isPaused && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-950/60 overflow-hidden">
                      <motion.div 
                        key={`tab-progress-bar-${idx}-${cycleKey}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_SWIPE_INTERVAL_MS / 1000, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300"
                      />
                    </div>
                  )}

                  {/* Header Row inside Tab Button */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
                          : 'bg-slate-800/80 text-slate-400'
                      }`}>
                        <TabIcon className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-wider ${
                        isActive ? 'text-cyan-400' : 'text-slate-400'
                      }`}>
                        Tier 0{idx + 1}
                      </span>
                    </div>

                    {pkg.popular ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black bg-cyan-400 text-slate-950 uppercase tracking-tight shadow-sm shadow-cyan-400/30">
                        Popular
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {idx === 0 ? 'Starter' : 'Enterprise'}
                      </span>
                    )}
                  </div>

                  {/* Tab Title & Subtitle */}
                  <div>
                    <h3 className={`text-base sm:text-lg font-extrabold truncate ${
                      isActive ? 'text-white' : 'text-slate-200'
                    }`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs truncate font-medium mt-1 ${
                      isActive ? 'text-cyan-300' : 'text-slate-400'
                    }`}>
                      {pkg.highlight}
                    </p>
                  </div>

                  {/* Pricing/scope preview tag */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">13 Inclusions</span>
                    <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                      {pkg.priceNote.split(' ')[0]} {pkg.priceNote.split(' ')[1] || 'Scope'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Package Card with Directional Sliding Effect */}
        <div 
          className="max-w-5xl mx-auto overflow-hidden relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activePackage.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.25, ease: "easeInOut" }
              }}
              className="rounded-3xl bg-[#090f1e]/95 border-2 border-cyan-500/30 overflow-hidden backdrop-blur-md shadow-2xl shadow-black/70"
            >
              {/* Package Top Hero Banner */}
              <div className={`p-6 sm:p-8 lg:p-10 border-b border-slate-800/90 relative overflow-hidden ${
                activePackage.id === 'advance' 
                  ? 'bg-gradient-to-r from-sky-950/40 via-[#0e192f] to-[#0c162b]' 
                  : activePackage.id === 'pro'
                    ? 'bg-gradient-to-r from-[#0c1429] via-[#0f1b36] to-[#091021]'
                    : 'bg-gradient-to-r from-[#091226] via-[#0d1833] to-[#0a1428]'
              }`}>
                {/* Background decorative watermark */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none opacity-5 pointer-events-none text-white font-black text-8xl sm:text-9xl">
                  {activeTabIndex + 1}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3.5 max-w-2xl">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-gradient-to-r shadow-md ${getPackageBadgeColor(activePackage.id)}`}>
                        <Sparkles className="w-3 h-3" />
                        <span>{activePackage.badge || activePackage.highlight}</span>
                      </span>

                      <span className="text-xs font-semibold text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full">
                        Deliverable Tier {activeTabIndex + 1} of 3
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                        {activePackage.name}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-cyan-300 font-bold mt-1">
                        {activePackage.highlight}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activePackage.tagline}
                    </p>

                    {/* Quick Trust / SLA Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Billing: <strong>{activePackage.priceNote}</strong></span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>13 Verified Deliverables</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                        <span>Delhi NCR & Global</span>
                      </div>
                    </div>
                  </div>

                  {/* Header CTA Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[240px]">
                    <motion.button
                      {...buttonHoverMotion}
                      onClick={() => onSelectPackage(activePackage.name)}
                      className={`w-full min-h-[48px] py-3.5 px-6 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg ${
                        activePackage.popular
                          ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 hover:brightness-110 shadow-cyan-500/30'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                      }`}
                      id={`btn-select-package-${activePackage.id}`}
                    >
                      <span>Select {activePackage.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <motion.a
                      {...buttonHoverMotion}
                      href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi Marketing LU, I am interested in the ${activePackage.name} tier.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Strategy Chat</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Deliverables Showcase (3-Domain Bento Grid or Detailed Table) */}
              <div className="p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
                <PackageDeliverablesTable
                  categories={packageCategories}
                  activeTabIndex={activeTabIndex}
                  packagesData={packagesData}
                />

                {/* Bottom Action Footer */}
                <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-black ${
                        activeTabIndex === 0 ? 'bg-cyan-500 text-slate-950 border-cyan-300' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        01
                      </div>
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-black ${
                        activeTabIndex === 1 ? 'bg-cyan-500 text-slate-950 border-cyan-300' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        02
                      </div>
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-black ${
                        activeTabIndex === 2 ? 'bg-cyan-500 text-slate-950 border-cyan-300' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        03
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      Need custom deliverables or multi-location expansion? Talk directly to our strategists.
                    </p>
                  </div>

                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => onSelectPackage(activePackage.name)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/25"
                  >
                    <span>Get Started with {activePackage.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Optional Toggle: View Full 3-Column Comparison Matrix */}
        <div className="max-w-5xl mx-auto mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowFullMatrix((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
          >
            <TableIcon className="w-4 h-4 text-cyan-400" />
            <span>{showFullMatrix ? 'Hide Side-by-Side Comparison Matrix' : 'Compare All 3 Packages Side-by-Side (Full Matrix)'}</span>
          </button>
        </div>

        {/* Collapsible Full Side-by-Side Comparison Matrix */}
        {showFullMatrix && (
          <PackageFullMatrix
            categories={packageCategories}
            packagesData={packagesData}
          />
        )}

        {/* Customized Requirement Inquiry Box */}
        <div className="mt-12 sm:mt-16 p-5 sm:p-6 xl:p-8 rounded-2xl bg-[#0c1322] border border-slate-800/90 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Need a Customized Retainer or Multi-Brand Scope?</h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Marketing LU crafts bespoke omni-channel campaigns tailored to unique market footprints and international expansions.
              </p>
            </div>
          </div>
          <motion.button
            {...buttonHoverMotion}
            onClick={() => onSelectPackage('Customized Solution')}
            className="w-full sm:w-auto whitespace-nowrap min-h-[44px] px-6 py-2.5 rounded-xl border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center"
          >
            Get Custom Quote
          </motion.button>
        </div>

      </Container>
    </section>
  );
}
