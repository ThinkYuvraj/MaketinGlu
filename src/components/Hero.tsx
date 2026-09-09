import { ArrowRight, Plus } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeroProps {
  onOpenConsultation: () => void;
  onExplorePortfolio: () => void;
}

export default function Hero({ onOpenConsultation, onExplorePortfolio }: HeroProps) {
  const { config } = useSiteConfig();

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-[300px] h-[250px] bg-sky-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Subtle geometric grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Location pill matching Figma / Config */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[11px] sm:text-xs font-semibold tracking-widest text-cyan-400 mb-6 uppercase shadow-inner shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{config.locationBadge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
          {config.heroTitleLine1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            {config.heroTitleLine2}
          </span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          {config.heroDescription}
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          {/* Primary CTA */}
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-bold text-sm md:text-base hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group"
            id="hero-btn-consultation"
          >
            <span>{config.heroPrimaryCta}</span>
            <Plus className="w-4 h-4 text-slate-950 stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onExplorePortfolio}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0d1424] hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-semibold text-sm md:text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            id="hero-btn-portfolio"
          >
            <span>{config.heroSecondaryCta}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
