import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';
import { expertiseData } from '../data/expertiseData';
import Container from './common/Container';
import { useNavigation } from '../context/NavigationContext';

interface CompanyExpertiseProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

type FilterCategory = 'all' | 'engineering' | 'growth' | 'creative';

export default function CompanyExpertise({ onOpenConsultation: _onOpenConsultation }: CompanyExpertiseProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const { navigateToService } = useNavigation();

  // Filter items based on selected category
  const filteredServices = useMemo(() => {
    if (selectedFilter === 'engineering') {
      return expertiseData.filter(item => item.id === 'web-design' || item.id === 'ecommerce');
    }
    if (selectedFilter === 'growth') {
      return expertiseData.filter(item => item.id === 'seo' || item.id === 'ppc');
    }
    if (selectedFilter === 'creative') {
      return expertiseData.filter(item => item.id === 'graphic-design' || item.id === 'smo');
    }
    return expertiseData;
  }, [selectedFilter]);

  return (
    <section id="expertise" className="relative py-8 sm:py-12 bg-[#070b14] border-t border-slate-800/80 overflow-hidden">
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

          {/* Interactive Category Filter Pills */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Disciplines (6)' },
              { id: 'engineering', label: 'Web & E-Commerce (2)' },
              { id: 'growth', label: 'SEO & Performance (2)' },
              { id: 'creative', label: 'Branding & Social (2)' },
            ].map((filter) => {
              const isActive = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id as FilterCategory)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20 scale-[1.02]'
                      : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Disciplines Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="group relative rounded-2xl bg-[#090f1f] border border-slate-800/90 hover:border-cyan-500/50 hover:bg-[#0c152a] flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
                >
                  {/* Subtle top-right ambient glow on hover */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/5 group-hover:bg-cyan-500/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                  {/* Top Half: Visual Showcase Image & Badges */}
                  <div 
                    onClick={() => navigateToService(service.id)}
                    className="relative cursor-pointer overflow-hidden border-b border-slate-800/80 bg-slate-950/40"
                    title={`Click to open dedicated ${service.tabLabel} page`}
                  >
                    {/* Compact Image Container with Gradient Fade */}
                    <div className="h-36 sm:h-40 w-full overflow-hidden relative">
                      <img
                        src={service.image}
                        alt={`${service.title} illustration`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090f1f] via-transparent to-black/20" />
                    </div>

                    {/* Top Float Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 px-2 py-0.5 rounded-full shadow-md">
                        {service.category.split('&')[0].trim()}
                      </span>

                      <div className="flex items-center gap-1 text-[9.5px] font-semibold text-slate-300 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2 py-0.5 rounded-full shadow-md">
                        <Clock className="w-2.5 h-2.5 text-cyan-400" />
                        <span>{service.timelineEstimate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Half: Content, Pillars, Metric & Action Bar */}
                  <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Discipline Icon & Title */}
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-800/90 group-hover:bg-cyan-400 group-hover:text-slate-950 text-cyan-400 flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <button
                            onClick={() => navigateToService(service.id)}
                            className="text-left font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
                          >
                            {service.title}
                          </button>
                          <p className="text-[11px] text-cyan-400/90 font-medium line-clamp-1">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Summary text */}
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                        {service.summary}
                      </p>

                      {/* 3 Key Architectural Pillars / Deliverables Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {service.pillars.slice(0, 3).map((pillar, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[9.5px] sm:text-[10px] font-medium text-slate-300 bg-slate-800/60 border border-slate-700/60 px-1.5 py-0.5 rounded flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{pillar.tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Performance Metric Callout Box */}
                      <div className="bg-slate-950/70 border border-cyan-500/20 rounded-lg p-2 mb-3.5 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold truncate">
                            {service.metricSubtitle}
                          </div>
                          <div className="text-[11px] font-extrabold text-cyan-300 truncate">
                            {service.metricBadge}
                          </div>
                        </div>
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      </div>
                    </div>

                    {/* Direct Landing Action Bar: Single Know More Button */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => navigateToService(service.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow-sm shadow-cyan-400/20 cursor-pointer group/btn min-h-[38px]"
                        title={`Know more about ${service.title}`}
                        id={`expertise-know-more-${service.id}`}
                      >
                        <span>Know More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
}
