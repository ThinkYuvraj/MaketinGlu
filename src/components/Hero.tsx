import { ArrowRight, Plus, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buttonHoverMotion, standardEase } from '../lib/animations';

interface HeroProps {
  onOpenConsultation: () => void;
  onExplorePortfolio: () => void;
}

export default function Hero({ onOpenConsultation, onExplorePortfolio }: HeroProps) {
  const { config } = useSiteConfig();

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 md:pb-28 overflow-hidden">
      {/* Background ambient lighting with subtle floating breath effect */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[300px] sm:h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-10 left-1/3 w-[260px] sm:w-[300px] h-[200px] sm:h-[250px] bg-sky-600/10 blur-[100px] rounded-full pointer-events-none"
      />
      
      {/* Subtle geometric grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
        
        {/* Inner Hero Wrapper that stretches fluidly on wide monitors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: standardEase }}
          className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto"
        >
          
          {/* Location pill matching Figma / Config */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: standardEase, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] sm:text-xs font-semibold tracking-widest text-cyan-400 mb-5 sm:mb-6 uppercase shadow-inner shadow-cyan-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="truncate">{config.locationBadge}</span>
          </motion.div>

          {/* Hero Title - responsive fluid scale from mobile (32px) to wide desktop (80px+) */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: standardEase, delay: 0.15 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-6 break-words"
          >
            {config.heroTitleLine1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              {config.heroTitleLine2}
            </span>
          </motion.h1>

          {/* Hero Description - high readability on both mobile and large monitors */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: standardEase, delay: 0.25 }}
            className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-xs sm:text-base md:text-lg xl:text-xl text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10"
          >
            {config.heroDescription}
          </motion.p>

          {/* Hero Action Buttons - full width on mobile with >=48px touch targets, comfortable on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: standardEase, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 max-w-md sm:max-w-none mx-auto"
          >
            {/* Primary CTA */}
            <motion.button
              {...buttonHoverMotion}
              onClick={onOpenConsultation}
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] px-7 xl:px-9 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-bold text-sm sm:text-base md:text-lg hover:brightness-110 transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2.5 group"
              id="hero-btn-consultation"
            >
              <span>{config.heroPrimaryCta}</span>
              <Plus className="w-4 h-4 text-slate-950 stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              {...buttonHoverMotion}
              onClick={onExplorePortfolio}
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] px-7 xl:px-9 py-3.5 sm:py-4 rounded-xl bg-[#0c1322] hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 font-semibold text-sm sm:text-base md:text-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5"
              id="hero-btn-portfolio"
            >
              <span>{config.heroSecondaryCta}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Quick Trust Highlights for Readability - clean grid on mobile and tablet */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800/80 max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400"
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Turnkey Web & E-Commerce</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Targeted SEO & Paid Ad Funnels</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Verified 95%+ Client Satisfaction</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
