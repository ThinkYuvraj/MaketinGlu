import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Zap,
  ExternalLink
} from 'lucide-react';
import { ExpertiseItem } from '../../data/expertiseData';
import { buttonHoverMotion, standardEase } from '../../lib/animations';
import { useNavigation } from '../../context/NavigationContext';

interface ExpertiseDetailViewProps {
  activeExpertise: ExpertiseItem;
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onOpenConsultation: (serviceName?: string) => void;
  onSwitchToGrid?: () => void;
}

export default function ExpertiseDetailView({
  activeExpertise,
  onOpenConsultation,
}: ExpertiseDetailViewProps) {
  const { navigateToService } = useNavigation();
  const ActiveIcon = activeExpertise.icon;

  return (
    <div className="w-full">
      {/* Main Showcase Card: Animated Crossfade Switch on Category Change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeExpertise.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: standardEase }}
          className="rounded-3xl bg-[#090f1f] border border-cyan-500/30 shadow-2xl p-5 sm:p-8 lg:p-12 xl:p-14 2xl:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
            
            {/* Left Column: Narrative, Pillars, Deliverables & Actions */}
            <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 space-y-6 sm:space-y-7">
              {/* Category Pill */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                  {activeExpertise.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <button
                  onClick={() => navigateToService(activeExpertise.id)}
                  className="text-left group/title cursor-pointer p-0 bg-transparent border-0"
                  title={`Open dedicated ${activeExpertise.tabLabel} page`}
                >
                  <h3 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white group-hover/title:text-cyan-300 tracking-tight leading-tight transition-colors flex items-center gap-2">
                    <span>{activeExpertise.title}</span>
                    <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400 opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all shrink-0" />
                  </h3>
                </button>
                <p className="text-cyan-300 text-xs sm:text-sm md:text-base font-semibold mt-1.5 sm:mt-2">
                  {activeExpertise.subtitle}
                </p>
              </div>

              {/* Summary Narrative */}
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                {activeExpertise.summary}
              </p>

              {/* Core Architectural Pillars Grid */}
              <div className="space-y-3 pt-1">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Core Architectural Pillars</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {activeExpertise.pillars.map((pillar, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-xl bg-[#0d162b] border border-slate-800/80 hover:border-cyan-500/30 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {pillar.title}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">
                          {pillar.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Deliverables Checklist */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0b1326] border border-cyan-500/20">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Turnkey Deliverables Guarantee</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeExpertise.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Request Consultation, Dedicated Page & WhatsApp */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <motion.button
                  {...buttonHoverMotion}
                  onClick={() => onOpenConsultation(activeExpertise.title)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-lg shadow-cyan-500/25 cursor-pointer min-h-[46px]"
                  id={`cta-expertise-book-${activeExpertise.id}`}
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  {...buttonHoverMotion}
                  onClick={() => navigateToService(activeExpertise.id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer min-h-[46px]"
                  id={`cta-expertise-page-${activeExpertise.id}`}
                >
                  <span>View Dedicated {activeExpertise.tabLabel} Page</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </motion.button>

                <motion.a
                  {...buttonHoverMotion}
                  href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi MarketingGlu, I would like to inquire about your ${activeExpertise.title} services.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 min-h-[46px]"
                  id={`cta-expertise-whatsapp-${activeExpertise.id}`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp (+91 96545 96149)</span>
                </motion.a>
              </div>

            </div>

            {/* Right Column: Image showcase with ambient backlight */}
            <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 flex justify-center w-full">
              <div className="relative group w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-blue-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />
                
                <div 
                  onClick={() => navigateToService(activeExpertise.id)}
                  className="relative rounded-2xl bg-[#0b1324] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 sm:p-4 cursor-pointer"
                  title={`Click to open dedicated ${activeExpertise.tabLabel} page`}
                >
                  <img 
                    src={activeExpertise.image} 
                    alt={`${activeExpertise.title} Showcase`} 
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-[420px] 2xl:h-[480px] rounded-xl object-cover transform transition duration-500 group-hover:scale-[1.02]" 
                  />
                  
                  {/* Floating Metric Card Overlay */}
                  <div className="mt-3.5 sm:mt-4 bg-[#070b14]/95 border border-cyan-500/40 rounded-xl p-3 sm:p-3.5 shadow-xl flex items-center justify-between gap-3 group-hover:border-cyan-400/80 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                        <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                          {activeExpertise.metricSubtitle}
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-cyan-300 truncate">
                          {activeExpertise.metricBadge}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-bold text-cyan-400 flex items-center gap-1 shrink-0 bg-cyan-950/80 px-2 py-1 rounded-md border border-cyan-500/30 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors">
                      <span className="hidden sm:inline">Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
