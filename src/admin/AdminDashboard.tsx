import React, { useState, useEffect } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Logo from '../components/Logo';
import { 
  Save, 
  RotateCcw, 
  ExternalLink, 
  LogOut, 
  Palette, 
  Type, 
  Sparkles, 
  Building2, 
  Package, 
  MessageSquare, 
  HelpCircle,
  Check, 
  Eye,
  Sliders,
  ShieldCheck,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import TitlesTab from './components/TitlesTab';
import PackagesTab from './components/PackagesTab';
import CaseStudiesTab from './components/CaseStudiesTab';
import FaqTab from './components/FaqTab';
import TestimonialsTab from './components/TestimonialsTab';
import CompanyTab from './components/CompanyTab';
import ThemeStatsTab from './components/ThemeStatsTab';
import SectionsTab from './components/SectionsTab';
import ImagesMediaTab from './components/ImagesMediaTab';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout: () => void;
}

type TabType = 'titles' | 'sections' | 'images' | 'packages' | 'cases' | 'faq' | 'testimonials' | 'company' | 'design';

export default function AdminDashboard({ onBackToSite, onLogout }: AdminDashboardProps) {
  const { 
    config, 
    updateConfig, 
    resetConfig, 
    updatePackage, 
    addPackage,
    deletePackage,
    updateCaseStudy,
    addCaseStudy,
    deleteCaseStudy,
    updateFaq,
    addFaq,
    deleteFaq,
    updateTestimonial, 
    addTestimonial, 
    deleteTestimonial,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    toggleCustomSection
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<TabType>('titles');
  const [saveToast, setSaveToast] = useState(false);
  const [resetToast, setResetToast] = useState(false);

  // Local draft state initialized from config
  const [formData, setFormData] = useState({
    brandName: config.brandName,
    phone: config.phone,
    email: config.email,
    address: config.address,
    locationBadge: config.locationBadge,

    announcementEnabled: config.announcement.enabled,
    announcementText: config.announcement.text,
    announcementCta: config.announcement.ctaText,

    heroTitleLine1: config.heroTitleLine1,
    heroTitleLine2: config.heroTitleLine2,
    heroDescription: config.heroDescription,
    heroPrimaryCta: config.heroPrimaryCta,
    heroSecondaryCta: config.heroSecondaryCta,

    packagesSectionBadge: config.packagesSectionBadge,
    packagesSectionTitle1: config.packagesSectionTitle1,
    packagesSectionTitle2: config.packagesSectionTitle2,
    packagesSectionDescription: config.packagesSectionDescription,

    casesSectionBadge: config.casesSectionBadge,
    casesSectionTitle1: config.casesSectionTitle1,
    casesSectionTitle2: config.casesSectionTitle2,
    casesSectionDescription: config.casesSectionDescription,

    faqSectionBadge: config.faqSectionBadge,
    faqSectionTitle1: config.faqSectionTitle1,
    faqSectionTitle2: config.faqSectionTitle2,
    faqSectionDescription: config.faqSectionDescription,

    themeAccent: config.themeAccent,
    animationsEnabled: config.animationsEnabled,
    pageScale: config.pageScale || '90%',

    webDesignStat: config.stats.webDesign,
    ecommerceStat: config.stats.ecommerce,
    designStat: config.stats.design,
    smoStat: config.stats.smo,
  });

  // Sync formData when config changes externally
  useEffect(() => {
    setFormData({
      brandName: config.brandName,
      phone: config.phone,
      email: config.email,
      address: config.address,
      locationBadge: config.locationBadge,

      announcementEnabled: config.announcement.enabled,
      announcementText: config.announcement.text,
      announcementCta: config.announcement.ctaText,

      heroTitleLine1: config.heroTitleLine1,
      heroTitleLine2: config.heroTitleLine2,
      heroDescription: config.heroDescription,
      heroPrimaryCta: config.heroPrimaryCta,
      heroSecondaryCta: config.heroSecondaryCta,

      packagesSectionBadge: config.packagesSectionBadge,
      packagesSectionTitle1: config.packagesSectionTitle1,
      packagesSectionTitle2: config.packagesSectionTitle2,
      packagesSectionDescription: config.packagesSectionDescription,

      casesSectionBadge: config.casesSectionBadge,
      casesSectionTitle1: config.casesSectionTitle1,
      casesSectionTitle2: config.casesSectionTitle2,
      casesSectionDescription: config.casesSectionDescription,

      faqSectionBadge: config.faqSectionBadge,
      faqSectionTitle1: config.faqSectionTitle1,
      faqSectionTitle2: config.faqSectionTitle2,
      faqSectionDescription: config.faqSectionDescription,

      themeAccent: config.themeAccent,
      animationsEnabled: config.animationsEnabled,
      pageScale: config.pageScale || '90%',

      webDesignStat: config.stats.webDesign,
      ecommerceStat: config.stats.ecommerce,
      designStat: config.stats.design,
      smoStat: config.stats.smo,
    });
  }, [config]);

  const handleSaveAll = () => {
    updateConfig({
      brandName: formData.brandName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      locationBadge: formData.locationBadge,

      announcement: {
        enabled: formData.announcementEnabled,
        text: formData.announcementText,
        ctaText: formData.announcementCta,
      },

      heroTitleLine1: formData.heroTitleLine1,
      heroTitleLine2: formData.heroTitleLine2,
      heroDescription: formData.heroDescription,
      heroPrimaryCta: formData.heroPrimaryCta,
      heroSecondaryCta: formData.heroSecondaryCta,

      packagesSectionBadge: formData.packagesSectionBadge,
      packagesSectionTitle1: formData.packagesSectionTitle1,
      packagesSectionTitle2: formData.packagesSectionTitle2,
      packagesSectionDescription: formData.packagesSectionDescription,

      casesSectionBadge: formData.casesSectionBadge,
      casesSectionTitle1: formData.casesSectionTitle1,
      casesSectionTitle2: formData.casesSectionTitle2,
      casesSectionDescription: formData.casesSectionDescription,

      faqSectionBadge: formData.faqSectionBadge,
      faqSectionTitle1: formData.faqSectionTitle1,
      faqSectionTitle2: formData.faqSectionTitle2,
      faqSectionDescription: formData.faqSectionDescription,

      themeAccent: formData.themeAccent,
      animationsEnabled: formData.animationsEnabled,
      pageScale: (formData.pageScale || '90%') as any,

      stats: {
        webDesign: formData.webDesignStat,
        ecommerce: formData.ecommerceStat,
        design: formData.designStat,
        smo: formData.smoStat,
      },
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all titles, packages, case studies, and FAQs to factory defaults?')) {
      resetConfig();
      setResetToast(true);
      setTimeout(() => setResetToast(false), 3000);
    }
  };

  const tabs: { id: TabType; label: string; icon: any; count?: number }[] = [
    { id: 'titles', label: 'Titles & Copy', icon: Type },
    { id: 'sections', label: 'Add / Edit Sections', icon: Layers, count: config.customSections?.length },
    { id: 'images', label: 'Change Images', icon: ImageIcon },
    { id: 'packages', label: 'Service Packages', icon: Package, count: config.packages?.length },
    { id: 'cases', label: 'Case Studies', icon: Sparkles, count: config.caseStudies?.length },
    { id: 'faq', label: 'FAQ Knowledge', icon: HelpCircle, count: config.faqs?.length },
    { id: 'testimonials', label: 'Client Reviews', icon: MessageSquare, count: config.testimonials?.length },
    { id: 'company', label: 'Agency & Contact', icon: Building2 },
    { id: 'design', label: 'Theme & Stats', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:block h-5 w-[1px] bg-slate-800" />
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-md">
              ADMIN CMS
            </span>
            <span className="text-xs text-slate-400">Live Management Suite</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[36px]"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors cursor-pointer min-h-[36px]"
            title="Reset to initial values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer min-h-[36px]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Changes</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Sign out of Admin Dashboard"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Changes published! All site components synchronized.</span>
        </div>
      )}

      {/* Reset Notification Toast */}
      {resetToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-2">
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Config reset to factory defaults.</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-20 bg-[#090e1a] border border-slate-800/90 rounded-2xl p-2.5 sm:p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Management Modules
            </div>

            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                      <span>{tab.label}</span>
                    </div>

                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                          isActive
                            ? 'bg-slate-950/20 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:block pt-4 mt-4 border-t border-slate-800/80 px-3 pb-1 text-[11px] text-slate-400 leading-relaxed">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instant Persistence</span>
              </div>
              All edits update live previews and persist in your browser database.
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#090e1a] border border-slate-800/90 rounded-3xl p-5 sm:p-7 min-w-0">
          {activeTab === 'titles' && (
            <TitlesTab formData={formData} setFormData={setFormData} />
          )}

          {activeTab === 'sections' && (
            <SectionsTab
              sections={config.customSections}
              onAddSection={addCustomSection}
              onUpdateSection={updateCustomSection}
              onDeleteSection={deleteCustomSection}
              onToggleSection={toggleCustomSection}
            />
          )}

          {activeTab === 'images' && (
            <ImagesMediaTab
              onNotifySave={() => {
                setSaveToast(true);
                setTimeout(() => setSaveToast(false), 2500);
              }}
            />
          )}

          {activeTab === 'packages' && (
            <PackagesTab
              packages={config.packages}
              onUpdatePackage={updatePackage}
              onAddPackage={addPackage}
              onDeletePackage={deletePackage}
            />
          )}

          {activeTab === 'cases' && (
            <CaseStudiesTab
              caseStudies={config.caseStudies}
              onAddCaseStudy={addCaseStudy}
              onUpdateCaseStudy={updateCaseStudy}
              onDeleteCaseStudy={deleteCaseStudy}
            />
          )}

          {activeTab === 'faq' && (
            <FaqTab
              faqs={config.faqs}
              onAddFaq={addFaq}
              onUpdateFaq={updateFaq}
              onDeleteFaq={deleteFaq}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsTab
              testimonials={config.testimonials}
              onAddTestimonial={addTestimonial}
              onUpdateTestimonial={updateTestimonial}
              onDeleteTestimonial={deleteTestimonial}
            />
          )}

          {activeTab === 'company' && (
            <CompanyTab formData={formData} setFormData={setFormData} />
          )}

          {activeTab === 'design' && (
            <ThemeStatsTab formData={formData} setFormData={setFormData} />
          )}
        </main>
      </div>
    </div>
  );
}
