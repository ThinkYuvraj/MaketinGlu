import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  MessageCircle, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown,
  Layers,
  HelpCircle,
  Award
} from 'lucide-react';
import { ExpertiseItem, expertiseData } from '../data/expertiseData';
import { useNavigation } from '../context/NavigationContext';
import Container from '../components/common/Container';
import { buttonHoverMotion, standardEase } from '../lib/animations';

interface ServiceDetailPageProps {
  service: ExpertiseItem;
  onOpenConsultation: (serviceName?: string) => void;
}

export default function ServiceDetailPage({ service, onOpenConsultation }: ServiceDetailPageProps) {
  const { navigateTo, navigateToService } = useNavigation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const otherServices = expertiseData.filter(item => item.id !== service.id);
  const ActiveIcon = service.icon;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden pt-24 sm:pt-28 pb-20">
      
      {/* Ambient background glows */}
      <div className="fixed top-24 -left-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-[550px] h-[550px] bg-sky-600/10 blur-[180px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => navigateTo('#/')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => navigateTo('#/services')}
              className="hover:text-cyan-400 transition-colors cursor-pointer font-medium"
            >
              Services
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400 font-semibold truncate max-w-[200px] sm:max-w-none">
              {service.tabLabel}
            </span>
          </div>

          {/* Quick Switch to other services dropdown or button */}
          <button
            onClick={() => navigateTo('#/services')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>All 6 Disciplines</span>
          </button>
        </div>

        {/* Hero Section: Deep Dive & Visual */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0b1328] via-[#090f1f] to-[#070b14] border border-cyan-500/30 p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-3 py-1 rounded-full shadow-sm">
                  {service.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Capability</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="text-cyan-300 text-sm sm:text-base md:text-lg font-semibold mt-2.5 leading-snug">
                  {service.subtitle}
                </p>
              </div>

              {/* Narrative Summary */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.summary}
              </p>

              {/* Ideal For Callout */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Ideal For: </span>
                  <span className="text-slate-300">{service.idealFor}</span>
                </div>
              </div>

              {/* High-Impact Stat Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
                {service.heroStats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-[#0d162d]/90 border border-slate-800 text-left hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-bold text-slate-200 mt-0.5 truncate">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <motion.button
                  {...buttonHoverMotion}
                  onClick={() => onOpenConsultation(service.title)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-lg shadow-cyan-500/25 cursor-pointer min-h-[48px]"
                  id={`hero-book-${service.id}`}
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.a
                  {...buttonHoverMotion}
                  href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi MarketingGlu, I would like to inquire about your ${service.title} services.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 min-h-[48px]"
                  id={`hero-whatsapp-${service.id}`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Direct (+91 96545 96149)</span>
                </motion.a>
              </div>

            </div>

            {/* Right Showcase Column: Image & Highlights */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-lg">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-blue-600/30 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative rounded-2xl bg-[#0b1324] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 sm:p-4">
                  <img 
                    src={service.image} 
                    alt={`${service.title} Showcase`} 
                    className="w-full h-56 sm:h-72 lg:h-80 rounded-xl object-cover transform transition duration-500 group-hover:scale-[1.02]" 
                  />
                  
                  {/* Floating Metric Card Overlay */}
                  <div className="mt-3.5 bg-[#070b14]/95 border border-cyan-500/40 rounded-xl p-3.5 shadow-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                        {service.metricSubtitle}
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-cyan-300 truncate">
                        {service.metricBadge}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment & Timeline Quick Card */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Investment</div>
                      <div className="text-xs font-bold text-slate-100">{service.priceEstimate}</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Typical Timeline</div>
                      <div className="text-xs font-bold text-slate-100">{service.timelineEstimate}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Section 2: The 4 Core Architectural Pillars */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORE ARCHITECTURAL PILLARS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Four Strategic Foundations Behind Every Project
            </h2>
            <p className="mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
              Engineered without compromises. Here is how our architecture ensures compounding value for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {service.pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#0a1122] border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30 shrink-0">
                    {pillar.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-11">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Deliverables Guarantee & Key Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Deliverables Checklist (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#090f1f] border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>What Is Included</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                Turnkey Deliverables Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                Everything required for full deployment, zero hidden surprises, and 100% intellectual property ownership.
              </p>

              <div className="space-y-3.5">
                {service.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3 text-slate-400 text-xs">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Full commercial rights and source code provided upon handover.</span>
            </div>
          </div>

          {/* Key Advantages / Why MarketingGlu (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0a1122] border border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              The MarketingGlu Advantage
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
              Why Leaders Choose Us For {service.tabLabel}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90">
                  <div className="text-xs sm:text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{benefit.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Battle-Tested Tools & Tech Stack */}
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Battle-Tested Toolchain & Tech Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, idx) => (
                  <div 
                    key={idx} 
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center gap-1.5"
                  >
                    <span className="font-bold text-cyan-300">{tech.name}</span>
                    <span className="text-slate-500 text-[11px]">&bull; {tech.role}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Section 4: 4-Stage Execution Methodology */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>OUR PROVEN PROCESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              4-Stage Engineering & Delivery Roadmap
            </h2>
            <p className="mt-3 text-slate-400 text-xs sm:text-sm md:text-base">
              A structured, transparent workflow engineered to ensure zero delays and predictable quality outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {service.methodology.map((phase, idx) => (
              <div 
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#090f1f] border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-cyan-400 font-mono">
                      {phase.step}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                      {phase.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                    {phase.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {phase.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Key Deliverables</div>
                  {phase.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Real Client Success Story */}
        <div className="mb-16 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-r from-[#0b162b] to-[#0a1122] border border-cyan-500/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Verified Client Case Study &bull; {service.caseStudyPreview.client}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                "{service.caseStudyPreview.quote}"
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {service.caseStudyPreview.result}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-3">
              <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-center w-full">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">Measured Outcome</div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1">{service.caseStudyPreview.metric}</div>
              </div>
              <button
                onClick={() => onOpenConsultation(`Case Study Inquiry: ${service.caseStudyPreview.client}`)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-xs font-bold text-slate-200 hover:text-white transition-colors cursor-pointer text-center"
              >
                Request Similar Results
              </button>
            </div>
          </div>
        </div>

        {/* Section 6: Tailored FAQs */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Questions About {service.tabLabel}
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-[#090f1f] border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm md:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 7: Quick Navigator to Other 5 Services */}
        <div className="mb-16 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Explore Other Digital Capabilities
              </h3>
              <p className="text-xs text-slate-400">
                Seamlessly combine services for maximum cross-channel synergy and compounding results.
              </p>
            </div>

            <button
              onClick={() => navigateTo('#/services')}
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-white cursor-pointer"
            >
              <span>View All 6 Disciplines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherServices.map((other) => {
              const OtherIcon = other.icon;
              return (
                <button
                  key={other.id}
                  onClick={() => navigateToService(other.id)}
                  className="p-3.5 rounded-2xl bg-[#0a1122] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0e1931] text-left transition-all group cursor-pointer flex flex-col justify-between min-h-[90px]"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400 flex items-center justify-center mb-2 transition-colors">
                    <OtherIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {other.tabLabel}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {other.category.split('&')[0].trim()}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 8: Bottom Strategy Consultation Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950 via-[#0a1b2d] to-cyan-950 border border-cyan-500/40 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
              LET'S BUILD SOMETHING EXTRAORDINARY
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Growth with {service.tabLabel}?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Schedule a 30-minute technical review with our senior architects in New Delhi. Get custom roadmap recommendations for your brand with zero obligation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                {...buttonHoverMotion}
                onClick={() => onOpenConsultation(`Consultation for ${service.title}`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                Book Free Consultation for {service.tabLabel}
              </motion.button>
              <button
                onClick={() => navigateTo('#/')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Return to Main Homepage
              </button>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}
