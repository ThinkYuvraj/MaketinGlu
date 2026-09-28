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
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  CheckCircle2
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Container from './common/Container';
import { buttonHoverMotion, cardHoverMotion, standardEase, ultraSmoothEase } from '../lib/animations';
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
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [billingModel, setBillingModel] = useState<'monthly' | 'sprint'>('monthly');

  // Toggle expanded state for a specific card's deliverables
  const toggleExpand = (pkgId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  // Keep index within bounds if packages list shrinks
  useEffect(() => {
    if (totalPackages > 0 && currentIndex >= totalPackages) {
      setCurrentIndex(0);
    }
  }, [totalPackages, currentIndex]);

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalPackages);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalPackages) % totalPackages);
  };

  const handleSelectTab = (index: number) => {
    setSlideDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // 144Hz slide variants
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

  // Render an individual interactive card
  const renderInteractiveCard = (pkg: PackageItem, isSelectedTab = false) => {
    const isPopular = pkg.popular;
    const isExpanded = !!expandedCards[pkg.id];
    const totalFeatures = pkg.features?.length || 0;
    const displayedFeatures = isExpanded ? pkg.features : pkg.features?.slice(0, 5);

    const tierLabel = pkg.id === 'basic' 
      ? 'Tier 01 • Starter' 
      : isPopular 
      ? 'Tier 02 • Growth' 
      : 'Tier 03 • Enterprise Scale';

    const turnaroundSLA = pkg.id === 'basic' 
      ? '10-14 Days Setup' 
      : isPopular 
      ? '14-21 Days Sprint' 
      : 'Rapid Continuous Execution';

    const dedicatedRole = pkg.id === 'basic' 
      ? '1 Dedicated Strategist' 
      : isPopular 
      ? 'Senior Growth Architect + Content Lead' 
      : 'Full Growth Pod (4 Senior Specialists)';

    return (
      <div
        className={`relative w-full rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
          isPopular
            ? 'bg-gradient-to-b from-[#0f1b36]/95 via-[#0b1325]/95 to-[#070c18]/98 border-2 border-cyan-400/90 shadow-2xl shadow-cyan-500/20 lg:-translate-y-2'
            : 'bg-gradient-to-b from-[#0c1424]/90 via-[#090f1d]/90 to-[#060a14]/95 border border-slate-800/90 shadow-xl hover:border-slate-700'
        }`}
      >
        {/* Top Glowing Accent Line */}
        {isPopular && (
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 shadow-md shadow-cyan-400/50" />
        )}

        {/* Top Banner for Popular Package */}
        {isPopular && (
          <div className="bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 text-slate-950 text-center py-2 px-4 text-[10.5px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>MOST POPULAR • HIGH-ROI ACCELERATION</span>
          </div>
        )}

        <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
          <div>
            {/* Header Row: Tier Badge + Inclusions Count */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                  isPopular
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                {tierLabel}
              </span>

              <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{totalFeatures} Deliverables</span>
              </span>
            </div>

            {/* Package Title & Highlight */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {pkg.name}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 mt-1">
                {pkg.highlight}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {pkg.tagline}
              </p>
            </div>

            {/* Interactive Scope / Pricing Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#060a14]/90 border border-slate-800/90 mb-5 shadow-inner">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                <span>Engagement Model</span>
                <span className="text-cyan-400 font-bold">
                  {billingModel === 'monthly' ? 'Continuous Retainer' : 'Turnkey Sprint'}
                </span>
              </div>

              <div className="text-base sm:text-lg font-extrabold text-white">
                {billingModel === 'monthly' ? pkg.priceNote : 'Milestone-Based Project Scope'}
              </div>

              {/* SLA Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{turnaroundSLA}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{dedicatedRole}</span>
                </div>
              </div>

              <div className="text-[10.5px] text-cyan-300/90 mt-2 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Zero Lock-In &bull; Monthly Milestone Audits</span>
              </div>
            </div>

            {/* Interactive Deliverables Explorer */}
            <div className="pt-2 pb-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-300 uppercase tracking-wider mb-3">
                <span>Inclusions &amp; Deliverables:</span>
                <span className="text-cyan-400 font-mono text-[10px]">
                  {isExpanded ? `Showing All ${totalFeatures}` : `5 of ${totalFeatures} Listed`}
                </span>
              </div>

              {/* Animated Features List */}
              <div className="space-y-2">
                {displayedFeatures?.map((feat, fIdx) => (
                  <motion.div
                    key={fIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: fIdx * 0.02 }}
                    className="group/item flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/50 hover:border-cyan-500/30 transition-colors text-xs text-slate-200"
                  >
                    <div className="w-4 h-4 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-cyan-400 group-hover/item:bg-cyan-500/25 transition-colors">
                      <Check className="w-2.5 h-2.5 text-cyan-300 stroke-[3]" />
                    </div>
                    <span className="leading-snug text-slate-300 group-hover/item:text-white transition-colors">
                      {feat.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Expand / Collapse Interactive Toggle */}
              {totalFeatures > 5 && (
                <button
                  type="button"
                  onClick={() => toggleExpand(pkg.id)}
                  className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Show Less' : `+ Explore All ${totalFeatures} Deliverables`}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-800/80 mt-auto">
            <motion.button
              {...buttonHoverMotion}
              onClick={() => onSelectPackage(pkg.name)}
              className={`w-full min-h-[48px] py-3 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg ${
                isPopular
                  ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 shadow-cyan-500/30 hover:brightness-110'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/20 hover:brightness-110'
              }`}
              id={`btn-select-${pkg.id}`}
            >
              <span>Choose {pkg.name.replace(' Package', '')} Plan</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="packages" 
      className="relative flex flex-col justify-center py-16 sm:py-20 lg:py-28 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{config.packagesSectionBadge || 'TRANSPARENT SERVICE TIERS'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {config.packagesSectionTitle1 || 'Tailored Digital Marketing'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              {config.packagesSectionTitle2 || 'Service Packages'}
            </span>
          </h2>

          <p className="mt-3 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {config.packagesSectionDescription || 'Engineered packages calibrated for distinct growth stages. Compare full inclusions, dedicated team allocations, and turnkey execution scopes below.'}
          </p>

          {/* Interactive Model Toggle: Monthly Retainer vs Turnkey Sprint */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-[#090f1e] border border-slate-800 shadow-md">
            <button
              type="button"
              onClick={() => setBillingModel('monthly')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingModel === 'monthly'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Continuous Retainer (Monthly)
            </button>
            <button
              type="button"
              onClick={() => setBillingModel('sprint')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingModel === 'sprint'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Turnkey Sprint (Milestone)
            </button>
          </div>
        </div>

        {/* Interactive Top Tier Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-xl mx-auto mb-8 sm:mb-10 px-2">
          {packagesData.map((pkg, tabIdx) => {
            const isSelected = tabIdx === currentIndex;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => handleSelectTab(tabIdx)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex-1 text-center min-h-[44px] flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {pkg.popular && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                )}
                <span className="truncate">{pkg.name.replace(' Package', '')}</span>
              </button>
            );
          })}
        </div>

        {/* DESKTOP VIEW (>=1024px): 3-Column Interactive Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 items-start max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] w-full mx-auto">
          {packagesData.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full flex flex-col"
            >
              {renderInteractiveCard(pkg, idx === currentIndex)}
            </motion.div>
          ))}
        </div>

        {/* MOBILE & TABLET VIEW (<1024px): Interactive Swipable Caret Carousel */}
        <div className="block lg:hidden relative max-w-lg mx-auto">
          {/* Caret guidance and slide tracker */}
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span className="font-semibold text-slate-300">Package {currentIndex + 1} of {totalPackages}</span>
            </span>
            <span className="text-[11px] text-cyan-400 font-mono font-medium">
              Swipe or use carets &rarr;
            </span>
          </div>

          {/* Swipable Card Container */}
          <div className="relative overflow-hidden px-1 min-h-[500px]">
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
                {renderInteractiveCard(packagesData[currentIndex], true)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile/Tablet pagination controls with Carets Prev / Next */}
          <div className="flex items-center justify-between mt-5 px-2">
            <button
              type="button"
              onClick={handlePrev}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Previous package"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {packagesData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleSelectTab(dotIdx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === currentIndex
                      ? 'w-7 sm:w-8 bg-cyan-400 shadow-md shadow-cyan-400/40'
                      : 'w-2 sm:w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to plan ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Next package"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Customized Requirement Inquiry Box */}
        <div className="package-inquiry mt-12 sm:mt-16 p-4 sm:p-5 rounded-2xl bg-[#0a1122] border border-slate-800/90 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Need a Bespoke Retainer or Multi-Location Enterprise Scope?</h4>
              <p className="package-inquiry-copy text-xs sm:text-sm text-slate-400 mt-0.5 leading-snug">
                We design custom omnichannel architectures tailored to unique international expansions, app launches, and high-volume media spends.
              </p>
            </div>
          </div>

          <motion.button
            {...buttonHoverMotion}
            onClick={() => onSelectPackage('Custom Enterprise Solution')}
            className="w-full sm:w-auto whitespace-nowrap min-h-[44px] px-6 py-2.5 rounded-xl border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center shadow-md shrink-0"
          >
            Get Custom Quote &rarr;
          </motion.button>
        </div>

      </Container>
    </section>
  );
}
