import { useState } from 'react';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, Sparkles, ExternalLink, Activity } from 'lucide-react';

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  accent: string;
  type: 'nexa' | 'techduniya';
}

const caseStudies: CaseStudy[] = [
  {
    id: "nexa",
    category: "E-COMMERCE & DEVELOPMENT",
    title: "Nexa Store India UI Transformation",
    description: "Rebuilt Nexa's core custom checkout experience yielding a 95% boost in mobile retention rates.",
    stats: [
      { label: "Checkout Velocity", value: "+95%" },
      { label: "Gross Volume", value: "2.3M" },
      { label: "Cart Abandonment", value: "-15%" }
    ],
    accent: "from-sky-500 to-cyan-400",
    type: "nexa"
  },
  {
    id: "techduniya",
    category: "SOCIAL BRAND MANAGEMENT",
    title: "TechDuniya Organic SMO Push",
    description: "Structured dynamic social campaigns targeting young Indian tech-buyers to multiply inbound leads.",
    stats: [
      { label: "Audience Reach", value: "320K" },
      { label: "Organic Inbound", value: "+180%" },
      { label: "Engagement CTR", value: "8.4%" }
    ],
    accent: "from-cyan-400 to-teal-400",
    type: "techduniya"
  }
];

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

export default function CaseStudies({ onOpenConsultation }: CaseStudiesProps) {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);

  return (
    <section id="cases" className="relative py-20 bg-[#070b14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with "View All Cases" matching Figma */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
              PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1.5 tracking-tight">
              Case Studies & Recent Work
            </h2>
          </div>

          <button
            onClick={onOpenConsultation}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors"
          >
            <span>View All Cases</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 2 Featured Case Study Cards matching Figma layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#0a1120] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
              id={`case-card-${item.id}`}
            >
              {/* Graphic Mockup Preview Window (matching Figma screenshots) */}
              <div className="relative h-64 sm:h-72 bg-[#060a13] p-5 overflow-hidden border-b border-slate-800/80 flex flex-col justify-between">


                {item.type === 'nexa' ? (
                  // Nexa Store India UI Transformation mockup matching screenshot
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    {/* Top title bar */}
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 rounded-md bg-teal-950/80 border border-teal-500/40 text-[10px] font-mono tracking-widest text-teal-300">
                        UI TRANSFORMATION
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1">LIVE</span>
                      </div>
                    </div>

                    {/* Dashboard center graphics */}
                    <div className="grid grid-cols-3 gap-3 my-auto">
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" />
                          </svg>
                          <span className="absolute text-[11px] font-bold text-white">75%</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-medium">Conversion</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="text-xl font-extrabold text-cyan-400 mb-0.5">2.3M</div>
                        <span className="text-[9px] text-slate-400 font-medium">Gross Vol</span>
                        <div className="mt-1 flex gap-0.5 h-3 items-end">
                          <div className="w-1 bg-cyan-600 h-1.5 rounded-sm" />
                          <div className="w-1 bg-cyan-500 h-2.5 rounded-sm" />
                          <div className="w-1 bg-cyan-400 h-3 rounded-sm" />
                          <div className="w-1 bg-cyan-300 h-2 rounded-sm" />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center">
                        <div className="text-xl font-extrabold text-emerald-400 mb-0.5">-15%</div>
                        <span className="text-[9px] text-slate-400 font-medium">Bounce Rate</span>
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-1" />
                      </div>
                    </div>

                    {/* Bottom visual soundwave/graph */}
                    <div className="flex items-end gap-1 h-8 pt-2">
                      {[30, 45, 25, 60, 40, 75, 55, 90, 80, 100, 70, 85, 95].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="flex-1 bg-gradient-to-t from-sky-900/80 to-cyan-400 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  // TechDuniya Organic SMO Push mockup matching screenshot
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 rounded-md bg-teal-950/80 border border-teal-500/40 text-[10px] font-mono tracking-widest text-teal-300">
                        ORGANIC REACH ENGINE
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        <span>SMO PIPELINE</span>
                      </div>
                    </div>

                    {/* TechDuniya center big metric with radar visual */}
                    <div className="flex items-center justify-around my-auto">
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Total Organic Impression</span>
                        <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-1">
                          <span>320K</span>
                          <span className="text-xs font-semibold text-emerald-400">+180%</span>
                        </div>
                        <span className="text-[10px] text-cyan-400">Targeting Indian Tech Audiences</span>
                      </div>

                      <div className="relative w-24 h-24 flex items-center justify-center">
                        {/* Concentric glowing rings */}
                        <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-30" />
                        <div className="w-20 h-20 rounded-full border border-cyan-500/40 flex items-center justify-center bg-cyan-950/30">
                          <div className="w-12 h-12 rounded-full border border-teal-400/60 flex items-center justify-center bg-cyan-900/40">
                            <Users className="w-5 h-5 text-cyan-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom SMO channels tags */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">#Meta</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">#LinkedIn</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">#X-Viral</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">+8.4% CTR</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Meta Content matching Figma */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-extrabold tracking-wider text-cyan-400 uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                    {item.stats.slice(0, 2).map((s, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <span className="text-slate-500">{s.label}:</span>
                        <strong className="text-cyan-400">{s.value}</strong>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveCase(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                    title="Read Case Study Details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {activeCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveCase(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#0b1324] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">{activeCase.category}</span>
            <h3 className="text-2xl font-extrabold text-white mt-1 mb-3">{activeCase.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeCase.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-6 text-center">
              {activeCase.stats.map((s, idx) => (
                <div key={idx}>
                  <div className="text-xl font-extrabold text-cyan-400">{s.value}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveCase(null);
                  onOpenConsultation();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all cursor-pointer text-center"
              >
                Schedule Similar Growth Blueprint
              </button>
              <button
                onClick={() => setActiveCase(null)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
