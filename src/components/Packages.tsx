import { useState } from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight, HelpCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface PackagesProps {
  onSelectPackage: (packageName: string) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  const { config } = useSiteConfig();
  const packagesData = config.packages;

  return (
    <section id="packages" className="relative py-20 bg-[#070b14] border-t border-slate-900/90">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sky-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>MARKETING LU PACKAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-1 mb-4 tracking-tight">
            Tailored Digital Marketing Packages
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose the package structured to your current growth velocity. Every package from Marketing LU includes verified SEO, SMO, creative posting, and insight monitoring.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 p-7 sm:p-8 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#0e172a] via-[#0b1324] to-[#080d1a] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/15 lg:-translate-y-2'
                  : 'bg-[#0a1120] border border-slate-800 hover:border-slate-700 shadow-lg'
              }`}
              id={`package-card-${pkg.id}`}
            >
              {/* Most Popular Ribbon */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 uppercase shadow-md shadow-cyan-500/30">
                    <Sparkles className="w-3 h-3 fill-slate-950" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="mb-5">
                  <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
                    {pkg.highlight}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed min-h-[40px]">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Pricing / Plan Estimate note */}
                <div className="py-4 px-4 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Package Type</span>
                    <span className="text-sm font-bold text-white">{pkg.priceNote}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Shield className="w-4 h-4" />
                  </div>
                </div>

                {/* Features List directly from marketinglu.com */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-slate-800">
                    Package Inclusions:
                  </div>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                        {feat.included ? (
                          <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="w-1.5 h-0.5 bg-slate-600 rounded-full" />
                          </div>
                        )}
                        <span className={feat.included ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                          {feat.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectPackage(pkg.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 active:scale-[0.98]'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-500/40'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Note on customized requirement */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0a1120] border border-slate-800 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Need a Customized Solution?</h4>
              <p className="text-xs text-slate-400">
                Marketing LU provides custom tailored scopes for multi-brand enterprises and specialized requirements.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectPackage('Customized Solution')}
            className="whitespace-nowrap px-5 py-2.5 rounded-lg border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 font-bold text-xs transition-all cursor-pointer"
          >
            Get Custom Quote
          </button>
        </div>

      </div>
    </section>
  );
}
