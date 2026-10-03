import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  Clock,
  Award,
  Layers,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import Container from '../components/common/Container';
import SEOHead from '../components/common/SEOHead';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
import PackageDeliverablesTable from '../components/packages/PackageDeliverablesTable';
import PackageFullMatrix from '../components/packages/PackageFullMatrix';
import { packageCategories } from '../data/packageFeatures';
import { buttonHoverMotion } from '../lib/animations';

interface PackagesIndexPageProps {
  onOpenConsultation: (packageName?: string) => void;
}

export default function PackagesIndexPage({ onOpenConsultation }: PackagesIndexPageProps) {
  const { config } = useSiteConfig();
  const { navigateToHome, navigateToPackageDetail } = useNavigation();
  const packagesData = config.packages && config.packages.length > 0 ? config.packages : [];

  const [activePackageId, setActivePackageId] = useState<string>(() => {
    const popular = packagesData.find(p => p.popular);
    return popular ? popular.id : (packagesData[0]?.id || 'advance');
  });

  const [activeTab, setActiveTab] = useState<'matrix' | 'facilities' | 'table'>('facilities');

  const activeIndex = packagesData.findIndex(p => p.id === activePackageId);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  const currentPkg = packagesData[safeActiveIndex] || packagesData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!currentPkg) return null;

  return (
    <>
      <SEOHead 
        title="Complete Digital Marketing Packages & Facilities Scope | MarketinGlu"
        description="Explore the complete scope of N facilities provided across our Basic, Advance, and Pro packages. Turnkey web development, technical SEO, social media optimization, and PPC funnels."
      />

      <div className="min-h-screen bg-[#070b14] text-slate-100 pt-24 pb-16 relative overflow-hidden">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[170px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />

        <Container className="relative z-10">

          {/* Breadcrumb & Navigation Back */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => navigateToHome('packages')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to Home Packages</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>Home</span>
              <span>/</span>
              <span className="text-cyan-400 font-bold">Service Packages Directory</span>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3 shadow-md shadow-cyan-500/10">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>ALL FACILITIES & TURNKEY SCOPE UNLOCKED</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Transparent Service Packages &{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-500">
                Facilities Matrix
              </span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Compare complete deliverable schedules, SLA guarantees, dedicated team allocations, and technical capabilities provided to your business with zero hidden fees.
            </p>
          </div>

          {/* EXACT DESIGN PILL DOCK SELECTOR (Matching reference image) */}
          <div className="relative max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto px-1 sm:px-2 mb-8 flex justify-center">
            <div className="flex flex-row items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-full overflow-x-auto scrollbar-none px-2">
              {packagesData.map((pkg, tabIdx) => {
                const isSelected = pkg.id === activePackageId;
                const isPro = pkg.id === 'pro' || pkg.name.toLowerCase().includes('pro');
                const isAdvance = pkg.id === 'advance' || pkg.popular;
                const TabIcon = isAdvance ? Crown : isPro ? Sparkles : Zap;

                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setActivePackageId(pkg.id)}
                    className={`group relative flex flex-row items-center gap-1.5 sm:gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none uppercase tracking-wide shrink-0 ${
                      isSelected
                        ? 'bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.45)] scale-102'
                        : 'bg-[#091122]/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-slate-950 text-cyan-400 font-black' : 'bg-slate-800 text-cyan-400 group-hover:text-slate-200'
                    }`}>
                      <TabIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="tracking-tight font-bold text-xs sm:text-sm uppercase whitespace-nowrap">
                      {pkg.name.replace(' Package', '')}
                    </span>
                    {pkg.popular && (
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                        isSelected ? 'bg-slate-950/30 text-slate-950' : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      }`}>
                        Popular
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE SELECTED PACKAGE SUMMARY CARD */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto mb-10">
            <div className={`p-6 sm:p-8 rounded-3xl backdrop-blur-2xl border transition-all ${
              currentPkg.popular 
                ? 'bg-linear-to-b from-[#0f1b36]/98 via-[#0b1325]/98 to-[#070c18]/98 border-cyan-400/80 shadow-2xl shadow-cyan-500/20'
                : 'bg-linear-to-b from-[#0e1628]/98 via-[#0a101e]/98 to-[#060a14]/98 border-slate-800 shadow-xl'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                      {currentPkg.badge}
                    </span>
                    {currentPkg.popular && (
                      <span className="bg-amber-400 text-slate-950 text-xs font-black uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Most Popular Choice</span>
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {currentPkg.name}
                  </h2>
                  <p className="text-sm font-bold text-cyan-400">
                    {currentPkg.highlight}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentPkg.tagline}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-cyan-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>{currentPkg.features?.length || 13} Turnkey Facilities</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{currentPkg.priceNote}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Callout */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-3 bg-[#060a14] p-5 sm:p-6 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Sovereignty & SLA Guarantee
                  </div>
                  <div className="text-xs text-slate-300 leading-snug">
                    Zero lock-in contracts, 100% IP ownership, and weekly telemetry reports directly from New Delhi architects.
                  </div>

                  <div className="pt-2 flex flex-col gap-2.5">
                    <motion.button
                      {...buttonHoverMotion}
                      onClick={() => onOpenConsultation(currentPkg.name)}
                      className="w-full py-3 px-5 rounded-xl bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all"
                    >
                      <span>Choose {currentPkg.name.replace(' Package', '')} Plan</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => navigateToPackageDetail(currentPkg.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>View Dedicated Facility Breakdown Page</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* VIEW TAB SWITCHER (Facilities vs Detailed Table vs Full Matrix) */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-[#080d1a] border border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400 ml-2" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Scope Exploration View Mode
                </span>
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('facilities')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'facilities'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  3-Domain Bento Matrix
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('table')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'table'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Detailed Inclusions List
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('matrix')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'matrix'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Side-by-Side Comparison
                </button>
              </div>
            </div>
          </div>

          {/* DYNAMIC CONTENT VIEW */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto mb-16">
            {activeTab === 'facilities' || activeTab === 'table' ? (
              <PackageDeliverablesTable 
                categories={packageCategories} 
                activeTabIndex={safeActiveIndex} 
                packagesData={packagesData} 
              />
            ) : (
              <PackageFullMatrix packagesData={packagesData} />
            )}
          </div>

          {/* ALL N FACILITIES LISTING IN DETAILED LIST */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto mb-16 rounded-3xl bg-[#080e1b] border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <Award className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  All Facilities Provided to Customer ({currentPkg.features?.length || 0})
                </h3>
                <p className="text-xs text-slate-400">
                  Detailed breakdown of every single facility included in the <strong className="text-cyan-300">{currentPkg.name}</strong> scope.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPkg.features?.map((feat, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-4 rounded-2xl bg-[#0b1324] border border-slate-800/90 hover:border-cyan-500/40 transition-all flex items-start gap-3.5 group"
                >
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 font-mono text-xs font-bold mt-0.5 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors">
                    {fIdx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {feat.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Executed continuously with guaranteed quality audits, dedicated account team oversight, and measurable monthly growth benchmarks.
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>100% INCLUDED IN SCOPE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CONSULTATION & HELP CALLOUT */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto rounded-3xl bg-linear-to-r from-sky-950/80 via-[#0a1b2d] to-cyan-950/80 border border-cyan-500/40 p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Need a Custom Facility Matrix or Tailored Scope?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Our senior marketing architects in Janak Puri, New Delhi will craft a bespoke retainer suited specifically to your exact business objectives and ad spend budget.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenConsultation('Custom Scope Quote')}
                  className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-400/20 inline-flex items-center gap-2 cursor-pointer transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request Custom Facilities Audit</span>
                </button>
              </div>
            </div>
          </div>

        </Container>
      </div>
    </>
  );
}
