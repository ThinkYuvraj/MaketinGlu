import { ArrowRight, Sparkles, CheckCircle2, ChevronDown, Zap, TrendingUp } from 'lucide-react';
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
      className="relative w-full min-h-dvh pt-16 sm:pt-28 pb-16 sm:pb-12 flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 sm:w-175 h-55 sm:h-85 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-75 h-75 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Hero Body */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto w-full relative z-10">
        <Container className="relative text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: standardEase }}
            className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto"
          >
            {/* Location / Capability Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-[10px] sm:text-xs font-bold tracking-wider text-cyan-400 uppercase mt-1 sm:mt-0 mb-2.5 sm:mb-5 shadow-sm shadow-cyan-950/50">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>{config.locationBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="tracking-tight leading-[1.02] mb-2.5 sm:mb-5 w-full flex flex-col items-center justify-center text-center">
              <span className="inline-flex items-center justify-center text-[2rem] min-[380px]:text-[2.25rem] min-[410px]:text-[2.45rem] xs:text-[2.6rem] sm:text-5xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] 2xl:text-[7.25rem] font-black mb-1.5 sm:mb-3.5 drop-shadow-2xl leading-[0.92] sm:leading-[1.02] tracking-tighter whitespace-nowrap mx-auto">
                <span className="text-white italic">MARKETIN</span>
                <span className="bg-linear-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent not-italic">GLU</span>
              </span>
              <span className="block text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-slate-200 tracking-wider sm:tracking-tight uppercase sm:normal-case leading-tight sm:leading-snug drop-shadow-lg opacity-90 sm:opacity-100 mt-1 sm:mt-0 text-center w-full">
                <span>{config.heroTitleLine1 || 'DIGITAL MARKETING'}</span>{' '}
                <span className="text-cyan-300 font-extrabold">{config.heroTitleLine2 || 'SOLUTIONS'}</span>
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-4 sm:mb-8 px-3 sm:px-4 opacity-90 sm:opacity-100">
              {config.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 max-w-xs xs:max-w-sm sm:max-w-none mx-auto mb-4 sm:mb-8">
              {/* Primary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto min-h-10 sm:min-h-13 px-6 sm:px-9 py-2.5 sm:py-3 rounded-xl bg-linear-to-r from-sky-500 via-sky-400 to-cyan-400 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer transition-all border border-cyan-300/30"
                id="hero-btn-consultation"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                <span>{config.heroPrimaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-3 text-slate-950" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={onExplorePortfolio}
                className="w-full sm:w-auto min-h-10 sm:min-h-13 px-6 sm:px-9 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer transition-all shadow-md"
                id="hero-btn-portfolio"
              >
                <span>{config.heroSecondaryCta}</span>
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Bottom Inclusions & Smooth Down Cue */}
      <div className="w-full relative z-10">
        <Container>
          <div className="pt-3 sm:pt-3.5 border-t border-slate-800/80 max-w-4xl mx-auto flex flex-wrap sm:flex-row items-center justify-center gap-x-4 gap-y-1.5 sm:gap-6 lg:gap-8 text-[11px] sm:text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-medium">Turnkey Web &amp; E-Commerce</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-medium">Targeted SEO &amp; Paid Ads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-medium">95%+ Client Satisfaction</span>
            </div>
          </div>

          {/* Subtle Down Scroll Cue */}
          <div className="flex justify-center mt-2.5 sm:mt-5">
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
