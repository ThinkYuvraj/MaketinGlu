import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, ArrowLeft, Zap, MessageCircle } from 'lucide-react';
import { expertiseData } from '../data/expertiseData';
import { useNavigation } from '../context/NavigationContext';
import Container from '../components/common/Container';
import { buttonHoverMotion } from '../lib/animations';

interface ServicesIndexPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export default function ServicesIndexPage({ onOpenConsultation }: ServicesIndexPageProps) {
  const { navigateTo, navigateToService } = useNavigation();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden pt-24 sm:pt-28 pb-20">
      
      {/* Ambient background glows */}
      <div className="fixed top-20 -left-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-[550px] h-[550px] bg-sky-600/10 blur-[180px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Top Breadcrumb & Header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <button
            onClick={() => navigateTo('#/')}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400 font-semibold">Services</span>
        </div>

        {/* Page Title & Mission */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-4 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR CORE EXPERTISE &amp; DISCIPLINE PAGES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            End-to-End Digital Solutions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Engineered for Growth
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Eliminate fragmented vendors. Explore our verified domain capabilities, battle-tested methodologies, and dedicated service specifications below.
          </p>
        </div>

        {/* 6 Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {expertiseData.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group rounded-3xl bg-[#090f1f] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0c152a] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden"
              >
                {/* Top Glow Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all" />

                <div>
                  {/* Top Bar: Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                      {service.category.split('&')[0].trim()}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 group-hover:bg-cyan-400 group-hover:text-slate-950 text-cyan-400 flex items-center justify-center transition-all duration-300 shrink-0 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Service Image Preview */}
                  <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800/80 aspect-video bg-[#070b14]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-[#070b14]/90 backdrop-blur-xs border border-slate-700/60 rounded-lg px-2 py-1 text-[10px] font-bold text-cyan-300 truncate">
                      {service.metricBadge}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-1.5">
                    {service.title}
                  </h2>
                  <p className="text-xs font-medium text-cyan-400/90 mb-3">
                    {service.subtitle}
                  </p>

                  {/* Short Summary */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {service.summary}
                  </p>

                  {/* 4 Pillars Mini-Tags */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 mb-5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>Key Architectural Pillars</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.pillars.map((pillar, pIdx) => (
                        <span 
                          key={pIdx}
                          className="text-[10px] font-medium bg-slate-900/90 border border-slate-800 text-slate-300 px-2 py-0.5 rounded"
                        >
                          {pillar.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => navigateToService(service.id)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-extrabold text-xs tracking-tight transition-all duration-200 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                    id={`services-view-page-${service.id}`}
                  >
                    <span>View Dedicated {service.tabLabel} Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenConsultation(`Inquiry for ${service.title}`)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Request Free Consultation
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global Strategy Consultation Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950 via-[#0a1b2d] to-cyan-950 border border-cyan-500/40 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Need a Custom Cross-Discipline Solution?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Most fast-growing brands combine Web Engineering, SEO, and Social Management for maximum market velocity. Speak with our lead digital architects to craft a tailored growth strategy.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                {...buttonHoverMotion}
                onClick={() => onOpenConsultation('Comprehensive Multi-Service Strategy')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                Book Custom Multi-Service Consultation
              </motion.button>
              <a
                href="https://wa.me/+919654596149?text=Hi%20MarketingGlu,%20I%20would%20like%20to%20discuss%20a%20full%20digital%20marketing%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Direct (+91 96545 96149)</span>
              </a>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}
