import { ArrowRight, Plus, CheckCircle2, ChevronDown } from 'lucide-react';
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

  const handleScrollDown = () => {
    const el = document.getElementById('growth') || document.getElementById('expertise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-5 sm:pb-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[260px] sm:h-[380px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Hero Body - Centered in First Window */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto w-full">
        <Container className="relative text-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: standardEase }}
            className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto"
          >
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0a1122]/90 border border-cyan-500/30 text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-400 mb-4 sm:mb-6 shadow-sm shadow-cyan-500/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{config.locationBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.06] mb-4 sm:mb-6">
              <span>{config.heroTitleLine1}</span> <br className="hidden sm:inline" />
              <span>
                SOLUTI<span className="text-cyan-400">ONS</span>
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl lg:max-w-3xl mx-auto text-xs sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 md:mb-10 px-2">
              {config.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              {/* Primary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto min-h-[46px] sm:min-h-[52px] px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs sm:text-base shadow-lg shadow-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
                id="hero-btn-consultation"
              >
                <span>{config.heroPrimaryCta}</span>
                <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={onExplorePortfolio}
                className="w-full sm:w-auto min-h-[46px] sm:min-h-[52px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#0c1322] hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-semibold text-xs sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all"
                id="hero-btn-portfolio"
              >
                <span>{config.heroSecondaryCta}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Bottom First-Window Inclusions & Down Cue */}
      <div className="w-full mt-auto">
        <Container>
          <div className="pt-4 sm:pt-6 border-t border-slate-800/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 lg:gap-10 text-[11px] sm:text-xs md:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>Turnkey Web & E-Commerce</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>Targeted SEO & Paid Ad Funnels</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>Verified 95%+ Client Satisfaction</span>
            </div>
          </div>

          {/* Subtle Down Scroll Cue */}
          <div className="flex justify-center mt-3 sm:mt-4">
            <button
              onClick={handleScrollDown}
              className="group p-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="Scroll to performance metrics"
            >
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
