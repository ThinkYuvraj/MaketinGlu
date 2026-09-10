import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  ArrowRight, 
  HelpCircle, 
  Table as TableIcon, 
  Award,
  Check,
  MessageCircle,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { packageCategories } from '../data/packageFeatures';
import Container from './common/Container';
import PackageFullMatrix from './packages/PackageFullMatrix';
import { buttonHoverMotion } from '../lib/animations';

interface PackagesProps {
  onSelectPackage: (packageName: string) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  const { config } = useSiteConfig();
  const packagesData = config.packages;

  // View mode: 'cards' (3 side-by-side tiers) or 'matrix' (full comparative table)
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  return (
    <section 
      id="packages" 
      className="relative py-20 lg:py-28 bg-[#070b14] border-t border-slate-900/90 selection:bg-cyan-500 selection:text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 shadow-sm shadow-cyan-500/10">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSPARENT SERVICE TIERS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tailored Digital Marketing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Service Packages
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Choose the strategic service tier calibrated for your growth stage—from establishing search foundation to dominating multi-channel market share.
          </p>

          {/* Clean View Mode Switcher Toggle */}
          <div className="mt-6 sm:mt-8 inline-flex items-center p-1 rounded-xl bg-[#090e1c] border border-slate-800 shadow-lg">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>3-Tier Comparison</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Full 13-Point Matrix</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: SIDE-BY-SIDE 3-COLUMN CARDS (DEFAULT) */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
            {packagesData.map((pkg, idx) => {
              const isPopular = pkg.popular;
              const isPro = pkg.id === 'pro';

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 overflow-hidden ${
                    isPopular
                      ? 'bg-gradient-to-b from-[#0f1b36] via-[#0a1224] to-[#070c18] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/15 lg:-translate-y-2'
                      : 'bg-[#090e1c] border border-slate-800 hover:border-slate-700 shadow-xl'
                  }`}
                >
                  {/* Top Highlight Banner for Popular Package */}
                  {isPopular && (
                    <div className="bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 text-slate-950 text-center py-1.5 px-4 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      <span>MOST POPULAR • HIGH-ROI ACCELERATION</span>
                    </div>
                  )}

                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    {/* Header Row: Tier Badge + Scope */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        isPopular
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}>
                        Tier 0{idx + 1} • {idx === 0 ? 'Starter' : isPopular ? 'Growth' : 'Enterprise'}
                      </span>

                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        13 Deliverables
                      </span>
                    </div>

                    {/* Package Title & Description */}
                    <div className="mb-6">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-cyan-400 font-bold mt-1">
                        {pkg.highlight}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Price / Retainer Tag */}
                    <div className="p-3.5 rounded-2xl bg-[#060a14] border border-slate-800/80 mb-6">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">
                        Investment Model
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                        {pkg.priceNote}
                      </div>
                      <div className="text-[10px] text-cyan-400 mt-0.5 font-medium">
                        ✓ Flexible Month-to-Month • Zero Hidden Fees
                      </div>
                    </div>

                    {/* Key Inclusions Checklist */}
                    <div className="space-y-3 pt-2 pb-6 border-t border-slate-800/80 flex-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Core Inclusions & Deliverables:
                      </div>

                      {pkg.features && pkg.features.slice(0, 8).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-200">
                          <div className="w-4 h-4 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-cyan-400 stroke-[3]" />
                          </div>
                          <span className="leading-tight">{feat.name}</span>
                        </div>
                      ))}

                      {pkg.features && pkg.features.length > 8 && (
                        <div className="text-[11px] text-cyan-400/90 font-semibold pt-1">
                          + {pkg.features.length - 8} more specialized deliverables included
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mt-auto">
                      <motion.button
                        {...buttonHoverMotion}
                        onClick={() => onSelectPackage(pkg.name)}
                        className={`w-full min-h-[48px] py-3 px-5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                          isPopular
                            ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 shadow-cyan-500/25 hover:brightness-110'
                            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/15'
                        }`}
                        id={`btn-select-tier-${pkg.id}`}
                      >
                        <span>Select {pkg.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <a
                        href={`https://wa.me/+919654596149?text=${encodeURIComponent(`Hi Marketing LU, I am interested in inquiring about the ${pkg.name} package.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[42px] py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: FULL 13-POINT COMPARATIVE MATRIX */}
        {viewMode === 'matrix' && (
          <div className="max-w-6xl mx-auto">
            <PackageFullMatrix
              categories={packageCategories}
              packagesData={packagesData}
            />

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                <span>Return to 3-Tier Grid View</span>
              </button>
            </div>
          </div>
        )}

        {/* Customized Requirement Inquiry Box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#0a1122] border border-slate-800/90 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">Need a Customized Retainer or Multi-Location Scope?</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Marketing LU crafts bespoke omni-channel campaigns tailored to unique market footprints and international expansions.
              </p>
            </div>
          </div>

          <motion.button
            {...buttonHoverMotion}
            onClick={() => onSelectPackage('Customized Solution')}
            className="w-full sm:w-auto whitespace-nowrap min-h-[46px] px-6 py-2.5 rounded-xl border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center shadow-sm"
          >
            Get Custom Quote
          </motion.button>
        </div>

      </Container>
    </section>
  );
}
