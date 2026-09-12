import { useState } from 'react';
import { Check, LayoutGrid, ListFilter, Sparkles } from 'lucide-react';
import { FeatureCategory } from '../../data/packageFeatures';
import { PackageItem } from '../../types';

interface PackageDeliverablesTableProps {
  categories: FeatureCategory[];
  activeTabIndex: number;
  packagesData: PackageItem[];
}

export default function PackageDeliverablesTable({
  categories,
  activeTabIndex,
  packagesData,
}: PackageDeliverablesTableProps) {
  const [layoutMode, setLayoutMode] = useState<'bento' | 'table'>('bento');

  const getFeatureAt = (pkgIndex: number, featIndex: number) => {
    const pkg = packagesData[pkgIndex];
    if (!pkg || !pkg.features || !pkg.features[featIndex]) {
      return { name: 'Included in scope', included: true };
    }
    return pkg.features[featIndex];
  };

  const activePackage = packagesData[activeTabIndex] || packagesData[0];

  return (
    <div className="space-y-6">
      {/* Sub-header with View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
              Included Deliverables Matrix
            </span>
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
              {activePackage.features?.length || 13} Verified Inclusions
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
            Calibrated specifically for the <strong className="text-cyan-300 font-semibold">{activePackage.name}</strong> tier.
          </p>
        </div>

        {/* View Toggle (Bento Grid vs. Detailed Audit List) */}
        <div className="flex items-center p-1 rounded-xl bg-[#090e1c] border border-slate-800 self-stretch sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setLayoutMode('bento')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              layoutMode === 'bento'
                ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>3-Domain Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode('table')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              layoutMode === 'table'
                ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-sm shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Detailed Table</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: 3-DOMAIN BENTO GRID (Compact, visually balanced, no 13-row vertical fatigue) */}
      {layoutMode === 'bento' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat, catIdx) => {
            const CategoryIcon = cat.icon;

            return (
              <div
                key={catIdx}
                className="rounded-2xl bg-[#080d1a] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg group"
              >
                {/* Category Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0e172a] to-[#0a1122] border-b border-slate-800/80">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded-md">
                      0{catIdx + 1} • {cat.rows.length} Deliverables
                    </span>
                  </div>

                  <h5 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    {cat.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-snug mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Deliverables List in this category */}
                <div className="p-3.5 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {cat.rows.map((rowItem, rIdx) => {
                      const featureDetail = getFeatureAt(activeTabIndex, rowItem.featureIndex);

                      return (
                        <div
                          key={rIdx}
                          className="p-2.5 rounded-xl bg-[#0c1426]/80 hover:bg-[#0f1a33] border border-slate-800/70 hover:border-cyan-500/30 transition-all"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-cyan-400/30">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] font-semibold text-slate-300 leading-tight">
                                {rowItem.featureName}
                              </div>
                              <div className="text-xs font-bold text-cyan-300 mt-1 flex items-center gap-1.5">
                                <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                                <span className="truncate">{featureDetail.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category Card Footer Tag */}
                <div className="px-4 py-2 bg-[#060a14] border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Guaranteed SLA</span>
                  <span className="text-cyan-400 font-bold">100% Turnkey</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW MODE 2: DETAILED TABLE WITH DEEP DESCRIPTIONS */
        <div className="space-y-4">
          {categories.map((cat, catIdx) => (
            <div 
              key={catIdx} 
              className="rounded-2xl bg-[#090e1a]/90 border border-slate-800/90 overflow-hidden shadow-inner"
            >
              {/* Category Header Row */}
              <div className="bg-slate-900/95 px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <cat.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                    {cat.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline font-medium">
                  {cat.description}
                </span>
              </div>

              {/* Deliverables Rows Table */}
              <div className="divide-y divide-slate-800/60">
                {cat.rows.map((rowItem, rIdx) => {
                  const featureDetail = getFeatureAt(activeTabIndex, rowItem.featureIndex);

                  return (
                    <div 
                      key={rIdx}
                      className="p-3.5 sm:p-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-4 hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Left: Deliverable title & technical explanation */}
                      <div className="md:max-w-[50%]">
                        <div className="text-xs sm:text-sm font-bold text-slate-200">
                          {rowItem.featureName}
                        </div>
                        {rowItem.description && (
                          <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                            {rowItem.description}
                          </div>
                        )}
                      </div>

                      {/* Right: Exact tier deliverable value */}
                      <div className="flex items-center gap-2.5 bg-slate-900/90 md:bg-cyan-950/20 px-3 py-2 rounded-xl border border-slate-800 md:border-cyan-500/20 md:max-w-[48%] self-stretch md:self-center">
                        <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm shadow-cyan-400/40">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-bold text-cyan-300">
                          {featureDetail.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
