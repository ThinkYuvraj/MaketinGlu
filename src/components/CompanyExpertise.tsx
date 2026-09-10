import { useState, useEffect } from 'react';
import { Sparkles, Layers, LayoutGrid } from 'lucide-react';
import { expertiseData } from '../data/expertiseData';
import Container from './common/Container';
import ExpertiseDetailView from './expertise/ExpertiseDetailView';
import ExpertiseGridView from './expertise/ExpertiseGridView';

interface CompanyExpertiseProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export default function CompanyExpertise({ onOpenConsultation }: CompanyExpertiseProps) {
  const [activeTabId, setActiveTabId] = useState<string>("web-design");
  const [viewMode, setViewMode] = useState<"detail" | "grid">("detail");

  // Sync with URL hash if user clicks #web-design, #ecommerce, #seo, #graphic-design, #ppc, #smo
  useEffect(() => {
    const handleHash = () => {
      let hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'smm') hash = 'smo';
      if (hash === 'design') hash = 'graphic-design';
      if (hash === 'websites') hash = 'web-design';
      if (hash === 'search') hash = 'seo';
      
      const match = expertiseData.find(item => item.id === hash);
      if (match) {
        setActiveTabId(match.id);
        setViewMode("detail");
        const element = document.getElementById("expertise");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activeExpertise = expertiseData.find(item => item.id === activeTabId) || expertiseData[0];

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    setViewMode("detail");
  };

  return (
    <section id="expertise" className="relative py-20 lg:py-28 bg-[#070b14] border-t border-slate-800/80 overflow-hidden">
      {/* Invisible anchor targets so old links still resolve smoothly */}
      <span id="services" className="absolute -top-24" />
      <span id="capabilities" className="absolute -top-24" />
      <span id="web-design" className="absolute -top-24" />
      <span id="ecommerce" className="absolute -top-24" />
      <span id="seo" className="absolute -top-24" />
      <span id="graphic-design" className="absolute -top-24" />
      <span id="ppc" className="absolute -top-24" />
      <span id="smo" className="absolute -top-24" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3.5 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR CORE EXPERTISE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            End-to-End Digital Solutions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Engineered for Growth
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Eliminate fragmented vendors. Explore our verified domain capabilities, battle-tested methodologies, and high-impact deliverables.
          </p>

          {/* View Mode Toggle (Interactive Deep Dive vs. All 6 Disciplines Grid) */}
          <div className="mt-6 sm:mt-7 w-full sm:w-auto inline-flex items-center p-1 rounded-xl bg-[#0a1120] border border-slate-800 shadow-inner">
            <button
              onClick={() => setViewMode("detail")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                viewMode === "detail"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="view-mode-detail-btn"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Deep Dive</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="view-mode-grid-btn"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All 6 Disciplines Grid</span>
            </button>
          </div>
        </div>

        {/* Primary 6 Discipline Cards: Positioned above the showcase card as primary selector */}
        <div className="mb-8 sm:mb-10" role="tablist" aria-label="Core Expertise Disciplines">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 xl:gap-4">
            {expertiseData.map((item) => {
              const Icon = item.icon;
              const isSelected = item.id === activeTabId && viewMode === "detail";

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  role="tab"
                  aria-selected={isSelected}
                  id={`expertise-tab-${item.id}`}
                  className={`group p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[100px] relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-b from-[#111e38] to-[#0c152a] border-2 border-cyan-400 shadow-xl shadow-cyan-500/15 scale-[1.02]"
                      : "bg-[#0a101f]/90 border-slate-800/80 hover:border-slate-700 hover:bg-[#0d162a] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {/* Top row with Icon and Active Glow Dot */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30' 
                        : 'bg-slate-800/90 text-cyan-400 group-hover:scale-105'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
                    )}
                  </div>

                  {/* Discipline Title & Subtitle */}
                  <div>
                    <div className={`text-xs sm:text-[13px] font-bold truncate ${
                      isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {item.tabLabel}
                    </div>
                    <div className={`text-[10px] sm:text-[11px] truncate mt-0.5 font-medium ${
                      isSelected ? 'text-cyan-300' : 'text-slate-500'
                    }`}>
                      {item.category.split('&')[0].trim()}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MODE 1: Interactive Featured Deep-Dive Showcase */}
        {viewMode === "detail" ? (
          <ExpertiseDetailView
            activeExpertise={activeExpertise}
            activeTabId={activeTabId}
            onSelectTab={handleSelectTab}
            onOpenConsultation={onOpenConsultation}
            onSwitchToGrid={() => setViewMode("grid")}
          />
        ) : (
          /* MODE 2: Comprehensive 6-Discipline Grid View */
          <ExpertiseGridView
            activeTabId={activeTabId}
            onSelectTab={handleSelectTab}
            onOpenConsultation={onOpenConsultation}
          />
        )}

      </Container>
    </section>
  );
}
