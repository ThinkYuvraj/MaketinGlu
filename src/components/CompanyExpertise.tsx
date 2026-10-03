import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Check, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Layers, 
  Cpu, 
  Award,
  BarChart3,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { expertiseData, ExpertiseItem, getExpertiseIcon } from '../data/expertiseData';
import Container from './common/Container';
import { useNavigation } from '../context/NavigationContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buttonHoverMotion, cardHoverMotion, standardEase, ultraSmoothEase } from '../lib/animations';

import websiteDesignImg from '../assets/website-design.png';
import ecommerceImg from '../assets/ecommerce-design.png';
import graphicDesignImg from '../assets/graphic-design.png';
import seoImg from '../assets/seo-optimization.png';
import ppcImg from '../assets/ppc-campaigns.png';
import smoImg from '../assets/smo-optimization.png';

const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  'web-design': websiteDesignImg,
  'ecommerce': ecommerceImg,
  'graphic-design': graphicDesignImg,
  'seo': seoImg,
  'ppc': ppcImg,
  'smo': smoImg,
};

interface CompanyExpertiseProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export default function CompanyExpertise({ onOpenConsultation }: CompanyExpertiseProps) {
  const { navigateToService } = useNavigation();
  const { config } = useSiteConfig();
  const services = config.services && config.services.length > 0 ? config.services : expertiseData;
  const totalServices = services.length;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [cardTab, setCardTab] = useState<'deliverables' | 'pillars' | 'tech'>('deliverables');
  const [isDeliverablesExpanded, setIsDeliverablesExpanded] = useState<boolean>(false);
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

  const safeCurrentIndex = totalServices > 0 ? currentIndex % totalServices : 0;
  const activeService = services[safeCurrentIndex] || services[0];
  const ActiveIcon = getExpertiseIcon(activeService);

  const handleNext = () => {
    setSlideDirection('right');
    setIsDeliverablesExpanded(false);
    setCurrentIndex((prev) => (prev + 1) % totalServices);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setIsDeliverablesExpanded(false);
    setCurrentIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  const handleSelectService = (index: number) => {
    setSlideDirection(index > safeCurrentIndex ? 'right' : 'left');
    setIsDeliverablesExpanded(false);
    setCurrentIndex(index);
  };

  // Auto-swipe every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideDirection('right');
      setIsDeliverablesExpanded(false);
      setCurrentIndex((prev) => (prev + 1) % totalServices);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, totalServices]);

  // True 3D depth slide variants
  const card3DVariants: Variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 70 : -70,
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
      x: direction === 'right' ? -70 : 70,
      rotateY: direction === 'right' ? -14 : 14,
      opacity: 0,
      scale: 0.94,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const totalDeliverables = activeService.deliverables?.length || 0;
  const displayedDeliverables = isDeliverablesExpanded 
    ? activeService.deliverables 
    : activeService.deliverables?.slice(0, 6);

  return (
    <section 
      id="expertise" 
      className="relative w-full min-h-auto lg:min-h-[90vh] xl:min-h-screen py-10 sm:py-16 lg:py-20 flex flex-col justify-center items-center bg-[#070b14] border-t border-slate-800/80 selection:bg-cyan-500 selection:text-white overflow-hidden"
    >
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

      {/* Invisible anchor targets so external and legacy links resolve smoothly */}
      <span id="services" className="absolute -top-28 sm:-top-32" />
      <span id="capabilities" className="absolute -top-28 sm:-top-32" />
      <span id="web-design" className="absolute -top-28 sm:-top-32" />
      <span id="ecommerce" className="absolute -top-28 sm:-top-32" />
      <span id="seo" className="absolute -top-28 sm:-top-32" />
      <span id="graphic-design" className="absolute -top-28 sm:-top-32" />
      <span id="ppc" className="absolute -top-28 sm:-top-32" />
      <span id="smo" className="absolute -top-28 sm:-top-32" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-sky-600/10 blur-[160px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-6 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR {services.length} CORE DISCIPLINES</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-black text-white tracking-tight leading-snug sm:leading-tight lg:whitespace-nowrap text-center">
            End-to-End Digital Solutions{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-500">
              Engineered for Growth
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto text-center">
            Eliminate fragmented vendors. Every discipline operates under one roof with dedicated senior architects in New Delhi, battle-tested playbooks, and transparent deliverables.
          </p>
        </div>

        {/* INTERACTIVE TOP SERVICES FULL BAR DOCK (Single-Row Flex Scroll on Mobile/Tablet, 6-Col Grid on Desktop) */}
        <div className="relative w-full max-w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-2 sm:px-4 mt-1 sm:mt-4 mb-4 sm:mb-8">
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 scrollbar-none gap-1.5 p-1.5 rounded-xl sm:rounded-2xl bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-full">
            {services.map((srv, tabIdx) => {
              const isSelected = tabIdx === safeCurrentIndex;
              const TabIcon = getExpertiseIcon(srv);

              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => handleSelectService(tabIdx)}
                  className={`group relative flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-\[44px\] select-none text-center w-full uppercase tracking-wide shrink-0 min-w-[115px] lg:min-w-0 ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {/* Animated Active Background Curved Rectangle */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeServiceTabCapsule"
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
                    {srv.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN 3D INTERACTIVE SERVICE SPOTLIGHT SHOWCASE (Widescreen Landscape Rounded Rectangle Card) */}
        <div 
          className="relative max-w-4xl lg:max-w-5xl xl:max-w-[1120px] 2xl:max-w-[1180px] w-full mx-auto px-2 sm:px-6 lg:px-8 mt-4 sm:mt-6"
          style={{ perspective: 1200 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Floating Desktop Only Next/Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden lg:flex absolute lg:-left-7 xl:-left-9 top-1/2 -translate-y-1/2 z-30 min-w-[52px] h-12 px-3.5 rounded-xl bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret gap-1"
            aria-label="Previous service"
            title="Previous Service"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover/caret:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-bold font-mono pr-1">Prev</span>
          </button>

          {/* Right Floating Desktop Only Next/Prev Button */}
          <button
            type="button"
            onClick={handleNext}
            className="hidden lg:flex absolute lg:-right-7 xl:-right-9 top-1/2 -translate-y-1/2 z-30 min-w-[52px] h-12 px-3.5 rounded-xl bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret gap-1"
            aria-label="Next service"
            title="Next Service"
          >
            <span className="text-xs font-bold font-mono pl-1">Next</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/caret:translate-x-0.5 transition-transform" />
          </button>

          {/* 3D Animated Card Container with Touch/Drag Swiping on Mobile/Tablet */}
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={activeService.id}
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
              className="w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-linear-to-b from-[#0e1628]/98 via-[#0a101e]/98 to-[#060a14]/98 border border-cyan-500/35 p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* 4-Second Auto-Swipe Active Progress Indicator Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-slate-800/80 overflow-hidden">
                <motion.div
                  key={`${activeService.id}-${isPaused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "100%" : "100%" }}
                  transition={{
                    duration: isPaused ? 0 : 4,
                    ease: "linear",
                  }}
                  className="h-full bg-linear-to-r from-sky-400 via-cyan-400 to-teal-300 shadow-sm shadow-cyan-400/50"
                />
              </div>

              {/* LEFT COLUMN: Deep Information & Interactive Tabbed Breakdown (order-2 on mobile/tablet, order-1 on desktop) */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-between h-full space-y-4">
                <div>
                  {/* Top Badge & Metric */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2 min-h-[28px]">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase">
                      <ActiveIcon className="w-3.5 h-3.5" />
                      <span>{activeService.category || 'Core Growth Discipline'}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{activeService.metricBadge || '99.8% Client Success'}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-h-[120px] sm:min-h-[110px]">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                      {activeService.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-cyan-400 mt-0.5">
                      {activeService.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed line-clamp-2">
                      {activeService.summary}
                    </p>
                  </div>
                </div>

                {/* IN-CARD INTERACTIVE SWITCHER: Deliverables vs Pillars vs Tech */}
                <div className="pt-1 flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 w-full sm:w-auto inline-flex mb-3 overflow-x-auto scrollbar-none">
                    <button
                      type="button"
                      onClick={() => setCardTab('deliverables')}
                      className={`flex-1 sm:flex-initial px-2 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                        cardTab === 'deliverables' 
                          ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Deliverables ({totalDeliverables})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCardTab('pillars')}
                      className={`flex-1 sm:flex-initial px-2 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                        cardTab === 'pillars' 
                          ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Strategic Pillars</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCardTab('tech')}
                      className={`flex-1 sm:flex-initial px-2 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                        cardTab === 'tech' 
                          ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Stack &amp; SLA</span>
                    </button>
                  </div>

                  {/* TAB 1: DELIVERABLES CHECKLIST */}
                  {cardTab === 'deliverables' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="min-h-[140px] flex flex-col justify-start"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {displayedDeliverables?.slice(0, 4).map((deliv, dIdx) => (
                          <div 
                            key={dIdx} 
                            className="flex items-start gap-2 p-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/30 transition-colors text-xs text-slate-200 min-h-[42px]"
                          >
                            <div className="w-4 h-4 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="leading-snug text-slate-300 line-clamp-1">{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: STRATEGIC PILLARS */}
                  {cardTab === 'pillars' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 min-h-[140px]"
                    >
                      {activeService.pillars?.slice(0, 3).map((pillar, pIdx) => (
                        <div key={pIdx} className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between min-h-[100px]">
                          <div>
                            <span className="text-xs font-mono font-bold text-cyan-400 uppercase bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30 inline-block mb-1">
                              {pillar.tag || `Pillar 0${pIdx + 1}`}
                            </span>
                            <h4 className="text-xs font-bold text-white mb-0.5 truncate">{pillar.title}</h4>
                            <p className="text-xs text-slate-400 leading-snug line-clamp-2">{pillar.description}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 3: TECH STACK & SLA */}
                  {cardTab === 'tech' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 min-h-[140px] flex flex-col justify-center"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Timeline SLA:</span>
                        <span className="font-bold text-cyan-300 font-mono">{activeService.timelineEstimate || '2-3 Weeks Deploy'}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-800">
                        <span className="text-slate-400 font-medium">Investment:</span>
                        <span className="font-bold text-emerald-400">{activeService.priceEstimate || 'Flexible Retainer'}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Bottom CTA Action Button */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-auto">
                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => navigateToService(activeService.id)}
                    className="flex-1 min-h-[44px] py-2.5 px-5 rounded-xl bg-linear-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer hover:brightness-110"
                    id={`btn-explore-${activeService.id}`}
                  >
                    <span>Explore {activeService.tabLabel} Deep Dive</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation?.(activeService.title)}
                    className="sm:w-auto min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Book Tactical Audit</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Visual Showcase & Performance Gauge (order-1 on mobile/tablet so image is at the top, order-2 on desktop) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
                <div className="relative w-full h-44 sm:h-64 lg:h-full lg:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-[#090e1c] group flex flex-col justify-end">
                  <img
                    src={
                      (config.sectionImages?.[activeService.id] && (config.sectionImages[activeService.id].startsWith('data:image/') || config.sectionImages[activeService.id].startsWith('http')))
                        ? config.sectionImages[activeService.id]
                        : DEFAULT_SERVICE_IMAGES[activeService.id] || activeService.image || websiteDesignImg
                    }
                    alt={activeService.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    onError={(e) => {
                      const fallback = DEFAULT_SERVICE_IMAGES[activeService.id] || websiteDesignImg;
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#060a14]/90 via-[#060a14]/25 to-transparent pointer-events-none" />

                  {/* Floating Metric Badge anchored at bottom */}
                  <div className="relative z-10 m-2.5 sm:m-3.5 lg:m-4 p-2.5 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl bg-[#060a14]/90 backdrop-blur-md border border-cyan-500/40 flex items-center justify-between shadow-xl">
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs uppercase font-mono text-cyan-400 font-bold tracking-wide truncate">
                        {activeService.metricSubtitle || 'Engineered Impact'}
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base font-extrabold text-white mt-0.5 truncate">
                        {activeService.metricBadge || 'High-Velocity Execution'}
                      </div>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-950/90 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shrink-0 ml-2.5 sm:ml-3 shadow-sm">
                      <ActiveIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Bottom Assurance Note */}
                <div className="hidden sm:flex pt-2 sm:pt-3 border-t border-slate-800/80 items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Dedicated senior engineering pod</span>
                  </span>
                  <span className="font-mono text-slate-400 text-xs">
                    100% In-House SLA
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile & Tablet Slide Tracker Indicator & Controls */}
          <div className="flex lg:hidden items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all"
                aria-label="Next service"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-slate-400 font-mono ml-1">
                Discipline <span className="text-cyan-400 font-bold">{safeCurrentIndex + 1}</span> of {totalServices}
              </span>
            </div>

            {/* Step Indicator Bars (Curved Rectangles) */}
            <div className="flex items-center gap-1.5">
              {services.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleSelectService(dotIdx)}
                  className={`h-1.5 rounded-sm transition-all cursor-pointer ${
                    dotIdx === safeCurrentIndex
                      ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/40'
                      : 'w-2 bg-slate-800 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to service ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
