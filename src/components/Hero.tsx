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
      className="relative pt-36 sm:pt-40 md:pt-48 pb-6 sm:pb-8  min-h-[100vh] sm:min-h-[90vh] flex flex-col justify-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[220px] sm:h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Hero Body */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto w-full">
        <Container className="relative text-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: standardEase }}
            className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto"
          >
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#0a1122]/90 to-[#0b162b]/90 border border-cyan-500/20 text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-cyan-300 mb-5 sm:mb-8 shadow-lg shadow-cyan-900/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="uppercase">{config.locationBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="tracking-tight leading-[1.05] mb-5 sm:mb-7">
              <span className="block text-[2.75rem] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black mb-3 sm:mb-5 drop-shadow-2xl">
                <span className="text-white italic tracking-tighter">MARKETIN</span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent not-italic tracking-tight">GLU</span>
              </span>
              <span className="block text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-slate-100 tracking-wide leading-tight sm:leading-snug drop-shadow-md">
                <span>{config.heroTitleLine1 || 'DIGITAL MARKETING'}</span>{' '}
                <span className="text-cyan-300 font-bold">{config.heroTitleLine2 || 'SOLUTIONS'}</span>
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 px-4">
              {config.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-md sm:max-w-none mx-auto mb-10 sm:mb-14">
              {/* Primary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] px-8 sm:px-10 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 hover:brightness-110 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all border border-cyan-300/30"
                id="hero-btn-consultation"
              >
                <span>{config.heroPrimaryCta}</span>
                <ArrowRight className="w-4 h-4 stroke-[3] text-slate-950" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                {...buttonHoverMotion}
                onClick={onExplorePortfolio}
                className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] px-8 sm:px-10 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-md"
                id="hero-btn-portfolio"
              >
                <span>{config.heroSecondaryCta}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Bottom First-Window Inclusions & Down Cue */}
      <div className="w-full">
        <Container>
          <div className="pt-4 sm:pt-5 border-t border-slate-800/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 lg:gap-10 text-[11px] sm:text-xs md:text-sm text-slate-300">
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
