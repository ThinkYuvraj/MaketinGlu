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
      className="relative w-full min-h-0 lg:min-h-[calc(100dvh-70px)] xl:min-h-[85vh] pt-20 sm:pt-24 lg:pt-28 pb-4 sm:pb-6 flex flex-col justify-between items-center bg-[#070b14] overflow-hidden select-none scroll-mt-20 border-b border-slate-800/60"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[22rem] h-36 sm:h-[14rem] bg-cyan-500/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-4 sm:right-10 w-40 sm:w-[18rem] h-40 sm:h-[18rem] bg-blue-600/5 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Main Hero Body */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-3 sm:px-4 py-2 sm:py-4">
        <Container className="relative text-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: standardEase }}
            className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto"
          >
            {/* Location / Capability Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#061826]/80 border border-cyan-500/40 text-cyan-400 text-[11px] font-bold tracking-wider uppercase mb-4 sm:mb-5 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate max-w-65 sm:max-w-none">{config.locationBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="tracking-tight leading-none mb-3 sm:mb-4 text-balance w-full max-w-full">
              <span className="block text-[2rem] min-[360px]:text-[2.35rem] min-[400px]:text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5.25rem] xl:text-[6.25rem] 2xl:text-[7.25rem] font-black mb-1 sm:mb-2 drop-shadow-2xl leading-[0.95] tracking-tight">
                <span className="text-white italic tracking-tighter">MARKETIN</span>
                <span className="bg-linear-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent not-italic tracking-tight">GLU</span>
              </span>
              <span className="block text-xs min-[380px]:text-sm sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-200 uppercase tracking-tight drop-shadow-lg mt-1 sm:mt-2">
                <span>{config.heroTitleLine1 || 'DIGITAL MARKETING'}</span>{' '}
                <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent font-extrabold">{config.heroTitleLine2 || 'SOLUTIONS'}</span>
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-xs min-[380px]:text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 px-2 sm:px-4 opacity-90 text-balance line-clamp-2 lg:text-justify">
              {config.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto mb-4 sm:mb-6">
              {/* Primary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto h-11 sm:h-12 px-7 rounded-xl bg-linear-to-r from-sky-400 via-cyan-400 to-sky-400 hover:brightness-110 active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all border border-cyan-300/40 touch-manipulation"
                id="hero-btn-consultation"
              >
                <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
                <span className="whitespace-nowrap">{config.heroPrimaryCta}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-slate-950 shrink-0" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={onExplorePortfolio}
                className="w-full sm:w-auto h-11 sm:h-12 px-7 rounded-xl bg-[#0a1120] hover:bg-slate-900 active:scale-[0.98] border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md touch-manipulation"
                id="hero-btn-portfolio"
              >
                <span className="whitespace-nowrap">{config.heroSecondaryCta}</span>
                <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0" />
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Bottom Inclusions & Smooth Down Cue */}
      <div className="w-full relative z-10 px-3 sm:px-0 mb-2">
        <Container>
          <div className="pt-4 border-t border-slate-800/60 max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 lg:gap-12 text-[11px] sm:text-xs text-slate-300">
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
          <div className="flex justify-center mt-3">
            <button
              onClick={handleScrollDown}
              className="group p-1.5 rounded-xl text-slate-500 hover:text-cyan-400 hover:bg-slate-900/60 transition-colors cursor-pointer touch-manipulation"
              aria-label="Scroll to performance metrics"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}