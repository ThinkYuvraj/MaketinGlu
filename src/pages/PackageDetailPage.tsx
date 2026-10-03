import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  Crown, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  Award,
  Layers,
  PhoneCall,
  Lock,
  ChevronRight
} from 'lucide-react';
import Container from '../components/common/Container';
import SEOHead from '../components/common/SEOHead';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
import { buttonHoverMotion } from '../lib/animations';
import PackageDeliverablesTable from '../components/packages/PackageDeliverablesTable';
import { packageCategories } from '../data/packageFeatures';

interface PackageDetailPageProps {
  packageId?: string;
  onOpenConsultation: (packageName?: string) => void;
}

export default function PackageDetailPage({ packageId, onOpenConsultation }: PackageDetailPageProps) {
  const { config } = useSiteConfig();
  const { navigateToHome, navigateToPackageDetail, navigateToPackages } = useNavigation();
  const packagesData = config.packages && config.packages.length > 0 ? config.packages : [];

  const targetId = packageId?.toLowerCase() || 'advance';
  const packageIndex = packagesData.findIndex(p => p.id.toLowerCase() === targetId);
  const safeIndex = packageIndex >= 0 ? packageIndex : 0;
  const currentPkg = packagesData[safeIndex] || packagesData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [packageId]);

  if (!currentPkg) return null;

  const isPopular = !!currentPkg.popular;
  const totalFacilities = currentPkg.features?.length || 0;

  return (
    <>
      <SEOHead 
        title={`${currentPkg.name} - Full Scope & Facilities Scope | MarketinGlu`}
        description={`Explore all N facilities included in the ${currentPkg.name}. Technical SEO, website development, social media optimization, and turnkey deliverables.`}
      />

      <div className="min-h-screen bg-[#070b14] text-slate-100 pt-24 pb-16 relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[170px] rounded-full pointer-events-none" />

        <Container className="relative z-10">

          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => navigateToHome('packages')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to Packages</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <button onClick={() => navigateToPackages()} className="hover:text-cyan-400 transition-colors cursor-pointer">Packages</button>
              <span>/</span>
              <span className="text-cyan-400 font-bold">{currentPkg.name} Scope</span>
            </div>
          </div>

          {/* EXACT DESIGN PILL DOCK SELECTOR (Matching reference image) */}
          <div className="relative max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto px-1 sm:px-2 mb-8 flex justify-center">
            <div className="flex flex-row items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-full overflow-x-auto scrollbar-none px-2">
              {packagesData.map((pkg) => {
                const isSelected = pkg.id === currentPkg.id;
                const isPro = pkg.id === 'pro' || pkg.name.toLowerCase().includes('pro');
                const isAdvance = pkg.id === 'advance' || pkg.popular;
                const TabIcon = isAdvance ? Crown : isPro ? Sparkles : Zap;

                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => navigateToPackageDetail(pkg.id)}
                    className={`group relative flex flex-row items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none uppercase tracking-wide shrink-0 ${
                      isSelected
                        ? 'bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.45)] scale-102'
                        : 'bg-[#091122]/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40'
                    }`}
                  >
                    <div className={`w-4 sm:w-5 h-4 sm:h-5 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-slate-950 text-cyan-400 font-black' : 'bg-slate-800 text-cyan-400 group-hover:text-slate-200'
                    }`}>
                      <TabIcon className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="tracking-tight font-bold text-[11px] sm:text-xs uppercase whitespace-nowrap">
                      {pkg.name.replace(' Package', '')}
                    </span>
                    {pkg.popular && (
                      <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0 ${
                        isSelected ? 'bg-slate-950/25 text-slate-950' : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      }`}>
                        Popular
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PACKAGE HERO SUMMARY CARD */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto mb-10">
            <div className={`p-6 sm:p-8 lg:p-10 rounded-3xl backdrop-blur-2xl border ${
              isPopular 
                ? 'bg-linear-to-b from-[#0f1b36]/98 via-[#0b1325]/98 to-[#070c18]/98 border-cyan-400/80 shadow-2xl shadow-cyan-500/20'
                : 'bg-linear-to-b from-[#0e1628]/98 via-[#0a101e]/98 to-[#060a14]/98 border-slate-800 shadow-xl'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Left Metadata & Highlights */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-sm">
                      {currentPkg.badge}
                    </span>
                    {isPopular && (
                      <span className="bg-amber-400 text-slate-950 text-xs font-black uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Most Popular Choice</span>
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    {currentPkg.name}
                  </h1>

                  <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-sky-300">
                    {currentPkg.highlight}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {currentPkg.tagline}
                  </p>

                  <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#080e1b] border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Total Facilities</div>
                      <div className="text-base font-black text-cyan-400 font-mono mt-0.5">{totalFacilities} Inclusions</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080e1b] border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">SLA & Contract</div>
                      <div className="text-base font-black text-emerald-400 font-mono mt-0.5">Zero Lock-In</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080e1b] border border-slate-800 col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Commercial IP</div>
                      <div className="text-base font-black text-white font-mono mt-0.5">100% Owned</div>
                    </div>
                  </div>
                </div>

                {/* Right Direct CTA Box */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-4 bg-[#060a14] p-6 rounded-2xl border border-slate-800/90 shadow-xl">
                  <div>
                    <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                      Turnkey Execution SLA
                    </div>
                    <div className="text-sm font-black text-white">
                      {currentPkg.priceNote}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Includes continuous performance telemetry, dedicated senior architect lead, and transparent reporting.
                    </p>
                  </div>

                  <motion.button
                    {...buttonHoverMotion}
                    onClick={() => onOpenConsultation(currentPkg.name)}
                    className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/30 hover:brightness-110 transition-all"
                  >
                    <span>Reserve {currentPkg.name.replace(' Package', '')} Plan</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>
                </div>

              </div>
            </div>
          </div>

          {/* ALL N FACILITIES EXPANDED MATRIX LIST */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  All {totalFacilities} Facilities Provided to Customer
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete list of all N deliverables and capabilities unlocked under the <strong className="text-cyan-300 font-semibold">{currentPkg.name}</strong> agreement.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Milestone Audited</span>
              </div>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPkg.features?.map((feat, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-5 rounded-2xl bg-[#090f1f] border border-slate-800/90 hover:border-cyan-500/40 transition-all flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 font-mono text-sm font-extrabold mt-0.5 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors shadow-sm">
                    {fIdx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {feat.name}
                      </h3>
                      <span className="text-[9px] font-mono font-bold uppercase text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded-md border border-cyan-500/30 shrink-0">
                        Included
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Continuous end-to-end execution, quality checks, and real-time dashboard telemetry managed by senior digital strategists in New Delhi.
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Facility SLA</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        Active Guarantee
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DELIVERABLES BENTO TABLE */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto mb-12">
            <PackageDeliverablesTable 
              categories={packageCategories} 
              activeTabIndex={safeIndex} 
              packagesData={packagesData} 
            />
          </div>

          {/* GUARANTEE & SOVEREIGNTY CARDS */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            <div className="p-6 rounded-2xl bg-[#090e1c] border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">100% IP Ownership</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You retain complete legal ownership of code, ad accounts, design kits, and domain assets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090e1c] border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Zero Vendor Lock-in</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flexible month-to-month retainers. We earn your business with verifiable month-over-month ROAS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090e1c] border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Direct Architect Line</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct WhatsApp and phone access to our lead technical architects in Janak Puri, New Delhi.
              </p>
            </div>
          </div>

          {/* BOTTOM CTA CALLOUT */}
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-[1120px] mx-auto rounded-3xl bg-linear-to-r from-sky-950/80 via-[#0a1b2d] to-cyan-950/80 border border-cyan-500/40 p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Ready to activate {currentPkg.name}?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Get started today or schedule a 30-minute tactical review with our team in New Delhi.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(currentPkg.name)}
                  className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-400/20 inline-flex items-center gap-2 cursor-pointer transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Reserve {currentPkg.name} Plan</span>
                </button>
              </div>
            </div>
          </div>

        </Container>
      </div>
    </>
  );
}
