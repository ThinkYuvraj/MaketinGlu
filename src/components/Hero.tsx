import { ArrowRight, Plus, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buttonHoverMotion, standardEase } from '../lib/animations';
import Container from './common/Container';

interface HeroProps {
  onOpenConsultation: (serviceName?: string) => void;
  onExplorePortfolio: () => void;
}

export default function Hero({ onOpenConsultation, onExplorePortfolio }: HeroProps) {
  const { config } = useSiteConfig();

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 lg:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[300px] sm:h-[400px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <Container className="relative text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: standardEase }}
          className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        >
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1122]/90 border border-cyan-500/30 text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-400 mb-6 shadow-sm shadow-cyan-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{config.locationBadge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] mb-6">
            <span>{config.heroTitleLine1}</span> <br className="hidden sm:inline" />
            <span>
              SOLUTI<span className="text-cyan-400">ONS</span>
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10">
            {config.heroDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
            {/* Primary CTA */}
            <motion.button
              {...buttonHoverMotion}
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              id="hero-btn-consultation"
            >
              <span>{config.heroPrimaryCta}</span>
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              {...buttonHoverMotion}
              onClick={onExplorePortfolio}
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] px-7 py-3.5 rounded-xl bg-[#0c1322] hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all"
              id="hero-btn-portfolio"
            >
              <span>{config.heroSecondaryCta}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </motion.button>
          </div>

          {/* Bottom Bullet Divider & Inclusions */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Turnkey Web & E-Commerce</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Targeted SEO & Paid Ad Funnels</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Verified 95%+ Client Satisfaction</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
