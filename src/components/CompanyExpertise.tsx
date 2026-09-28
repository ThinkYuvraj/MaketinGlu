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

  // 144Hz slide variants for mobile and card switching
  const cardSwitchVariants: Variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 24 : -24,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 320, damping: 30, mass: 0.65 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -24 : 24,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const totalDeliverables = activeService.deliverables?.length || 0;
  const displayedDeliverables = isDeliverablesExpanded 
    ? activeService.deliverables 
    : activeService.deliverables?.slice(0, 6);

  return (
    <section 
      id="expertise" 
      className="relative flex flex-col justify-center py-16 sm:py-20 lg:py-28 bg-[#070b14] border-t border-slate-900/80 selection:bg-cyan-500 selection:text-white"
    >
      {/* Invisible anchor targets so external and legacy links resolve smoothly */}
      <span id="services" className="absolute -top-24" />
      <span id="capabilities" className="absolute -top-24" />
      <span id="web-design" className="absolute -top-24" />
      <span id="ecommerce" className="absolute -top-24" />
      <span id="seo" className="absolute -top-24" />
      <span id="graphic-design" className="absolute -top-24" />
      <span id="ppc" className="absolute -top-24" />
      <span id="smo" className="absolute -top-24" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-sky-600/10 blur-[160px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR {services.length} CORE DISCIPLINES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            End-to-End Digital Solutions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Engineered for Growth
            </span>
          </h2>

          <p className="mt-3 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Eliminate fragmented vendors. Every discipline operates under one roof with dedicated senior architects in New Delhi, battle-tested playbooks, and transparent deliverables.
          </p>
        </div>

        {/* INTERACTIVE TOP SERVICES TAB BAR */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 sm:pb-0 mb-8 sm:mb-10 no-scrollbar px-2 max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
          {services.map((srv, tabIdx) => {
            const isSelected = tabIdx === safeCurrentIndex;
            const TabIcon = getExpertiseIcon(srv);

            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => handleSelectService(tabIdx)}
                className={`relative shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px] border ${
                  isSelected
                    ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400/90 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  <TabIcon className="w-3.5 h-3.5" />
                </div>
                <span>{srv.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN INTERACTIVE SERVICE SPOTLIGHT SHOWCASE (2-Column Bento Card) */}
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] w-full mx-auto">
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={activeService.id}
              custom={slideDirection}
              variants={cardSwitchVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="rounded-3xl bg-gradient-to-b from-[#0f172a]/95 via-[#0b1220]/95 to-[#070b14]/98 border border-cyan-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* LEFT COLUMN: Deep Information & Interactive Tabbed Breakdown */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  {/* Top Badge & Metric */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
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
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    {activeService.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-cyan-400 mt-1">
                    {activeService.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {activeService.summary}
                  </p>
                </div>

                {/* IN-CARD INTERACTIVE SWITCHER: Deliverables vs Pillars vs Tech */}
                <div className="pt-2">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 w-full sm:w-auto inline-flex mb-4">
                    <button
                      type="button"
                      onClick={() => setCardTab('deliverables')}
                      className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
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
                      className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
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
                      className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
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
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {displayedDeliverables?.map((deliv, dIdx) => (
                          <div 
                            key={dIdx} 
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/30 transition-colors text-xs text-slate-200"
                          >
                            <div className="w-4 h-4 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="leading-snug text-slate-300">{deliv}</span>
                          </div>
                        ))}
                      </div>

                      {totalDeliverables > 6 && (
                        <button
                          type="button"
                          onClick={() => setIsDeliverablesExpanded(!isDeliverablesExpanded)}
                          className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-cyan-300 hover:text-cyan-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>{isDeliverablesExpanded ? 'Show Less' : `+ View All ${totalDeliverables} Inclusions`}</span>
                          {isDeliverablesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 2: STRATEGIC PILLARS */}
                  {cardTab === 'pillars' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                    >
                      {activeService.pillars?.slice(0, 3).map((pillar, pIdx) => (
                        <div key={pIdx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                          <div>
                            <span className="text-[9.5px] font-mono font-bold text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 inline-block mb-1.5">
                              {pillar.tag || `Pillar 0${pIdx + 1}`}
                            </span>
                            <h4 className="text-xs font-bold text-white mb-1">{pillar.title}</h4>
                            <p className="text-[11px] text-slate-400 leading-snug">{pillar.description}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 3: TECH STACK & SLA */}
                  {cardTab === 'tech' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Timeline &amp; Turnaround SLA:</span>
                        <span className="font-bold text-cyan-300 font-mono">{activeService.timelineEstimate || '2-3 Weeks Deploy'}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Dedicated Growth Architects:</span>
                        <span className="font-bold text-white">Senior Full-Stack Specialists</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-medium">Investment Structure:</span>
                        <span className="font-bold text-emerald-400">{activeService.priceEstimate || 'Flexible Retainer'}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Bottom CTA Action Button */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => navigateToService(activeService.id)}
                    className="flex-1 min-h-[48px] py-3 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer hover:brightness-110"
                    id={`btn-explore-${activeService.id}`}
                  >
                    <span>Explore {activeService.tabLabel} Deep Dive</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation?.(activeService.title)}
                    className="sm:w-auto min-h-[48px] py-3 px-5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Book Tactical Audit</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Visual Showcase & Performance Gauge */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-[#090e1c] aspect-[4/3] group">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/20 to-transparent pointer-events-none" />

                  {/* Floating Metric Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#070b14]/90 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold">
                        {activeService.metricSubtitle || 'Engineered Impact'}
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-white">
                        {activeService.metricBadge || 'High-Velocity Execution'}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                      <ActiveIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Caret Controls to Cycle Disciplines */}
                <div className="flex items-center justify-between w-full mt-6 px-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer shadow-md"
                    aria-label="Previous discipline"
                  >
                    <ChevronLeft className="w-4 h-4 text-cyan-400" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {services.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => handleSelectService(dotIdx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          dotIdx === safeCurrentIndex
                            ? 'w-7 sm:w-8 bg-cyan-400 shadow-md shadow-cyan-400/40'
                            : 'w-2 sm:w-2.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to discipline ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer shadow-md"
                    aria-label="Next discipline"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
}
