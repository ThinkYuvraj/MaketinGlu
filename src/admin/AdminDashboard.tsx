import React, { useState } from 'react';
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
  ShieldCheck, 
  Package, 
  MessageSquare, 
  Sliders, 
  Check, 
  Plus, 
  Trash2, 
  Star,
  Eye
} from 'lucide-react';
import { PackageItem, TestimonialItem } from '../types';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout: () => void;
}

type TabType = 'general' | 'hero' | 'design' | 'packages' | 'testimonials' | 'stats';

export default function AdminDashboard({ onBackToSite, onLogout }: AdminDashboardProps) {
  const { 
    config, 
    updateConfig, 
    resetConfig, 
    updatePackage, 
    updateTestimonial, 
    addTestimonial, 
    deleteTestimonial 
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<TabType>('general');
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

    themeAccent: config.themeAccent,
    animationsEnabled: config.animationsEnabled,

    webDesignStat: config.stats.webDesign,
    ecommerceStat: config.stats.ecommerce,
    designStat: config.stats.design,
    smoStat: config.stats.smo,
  });

  // Modal / draft state for adding new testimonial
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    quote: '',
    role: 'Verified Client',
    highlight: '',
  });
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

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

      themeAccent: formData.themeAccent,
      animationsEnabled: formData.animationsEnabled,

      stats: {
        webDesign: Number(formData.webDesignStat) || 91,
        ecommerce: Number(formData.ecommerceStat) || 95,
        design: Number(formData.designStat) || 86,
        smo: Number(formData.smoStat) || 91,
      },
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all website UI/UX details back to the default marketinglu.com content?')) {
      resetConfig();
      setResetToast(true);
      setTimeout(() => setResetToast(false), 3000);
    }
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) return;

    const initials = newReview.name.charAt(0).toUpperCase();
    const colors = [
      'from-cyan-500 to-blue-600',
      'from-pink-500 to-rose-600',
      'from-amber-500 to-orange-600',
      'from-emerald-500 to-teal-600',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const item: TestimonialItem = {
      id: `custom-${Date.now()}`,
      name: newReview.name,
      rating: Number(newReview.rating) || 5,
      quote: newReview.quote,
      role: newReview.role || 'Verified Client',
      source: 'Marketing LU Direct Review',
      initial: initials,
      avatarColor: color,
      highlight: newReview.highlight,
    };

    addTestimonial(item);
    setShowAddReviewModal(false);
    setNewReview({
      name: '',
      rating: 5,
      quote: '',
      role: 'Verified Client',
      highlight: '',
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0a1120]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Logo variant="light-badge" />
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-white">
                Marketing LU &bull; Admin Studio
              </h1>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60">
                Live UI & UX Editor
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Apply real-time adjustments and fixes to the public website.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToSite}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="View Live Public Website"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset site to original marketinglu.com defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 hover:brightness-110 active:scale-95 shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Fixes</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Save/Reset Feedback Banners */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 px-4 py-3 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>All changes and fixes published live to the website!</span>
        </div>
      )}
      {resetToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-400 text-slate-950 px-4 py-3 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Restored factory marketinglu.com content successfully!</span>
        </div>
      )}

      {/* Main Studio Body with Sidebar Navigation */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Navigation Tabs */}
        <aside className="w-full md:w-64 shrink-0 space-y-1 bg-[#0a1120] border border-slate-800/90 rounded-2xl p-3 self-start">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            UI/UX Controls
          </div>

          {[
            { id: 'general', label: 'Company & Contact', icon: ShieldCheck },
            { id: 'hero', label: 'Hero & Headlines', icon: Type },
            { id: 'design', label: 'Theme & Animations', icon: Palette },
            { id: 'packages', label: 'Packages & Retainers', icon: Package },
            { id: 'testimonials', label: 'Client Reviews', icon: MessageSquare },
            { id: 'stats', label: 'Performance Stats', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800 px-3">
            <div className="text-[11px] text-slate-500">
              Changes persist instantly in your browser session & localStorage.
            </div>
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 bg-[#0a1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* TAB 1: GENERAL & CONTACT DETAILS */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Company Identity & Contact Info
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Update the contact points and official address shown in the header, footer, and consultation modals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Official Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Default: +91 96545 96149</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Official Support Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Default: marketing2glue@gmail.com</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Location Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formData.locationBadge}
                    onChange={(e) => setFormData({ ...formData, locationBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Default: BASED IN NEW DELHI, INDIA</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Physical Office Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Default: C5C/11-B Janak Puri, New Delhi, India - 110058</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & HEADLINES */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Hero Section & Messaging Copy
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fine-tune the primary value proposition, headlines, and call-to-action buttons.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Headline (Line 1)
                    </label>
                    <input
                      type="text"
                      value={formData.heroTitleLine1}
                      onChange={(e) => setFormData({ ...formData, heroTitleLine1: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Headline Accent (Line 2)
                    </label>
                    <input
                      type="text"
                      value={formData.heroTitleLine2}
                      onChange={(e) => setFormData({ ...formData, heroTitleLine2: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Description Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={formData.heroDescription}
                    onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Primary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={formData.heroPrimaryCta}
                      onChange={(e) => setFormData({ ...formData, heroPrimaryCta: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Secondary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={formData.heroSecondaryCta}
                      onChange={(e) => setFormData({ ...formData, heroSecondaryCta: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: THEME, UI/UX & ANIMATIONS */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Design, UI & UX System
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Control entrance animations, announcement banners, and brand accent colors.
                </p>
              </div>

              {/* Viewport Scroll Animations Toggle */}
              <div className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Subtle Fade-In & Slide-Up Scroll Animations</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Triggers smooth upward reveal transitions when sections scroll into the viewport.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.animationsEnabled}
                    onChange={(e) => setFormData({ ...formData, animationsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              {/* Top Announcement Bar Configuration */}
              <div className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Top Header Announcement Bar
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Display a promotional alert banner at the very top of the website.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.announcementEnabled}
                      onChange={(e) => setFormData({ ...formData, announcementEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>

                {formData.announcementEnabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-400 mb-1">Notice Message</label>
                      <input
                        type="text"
                        value={formData.announcementText}
                        onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.announcementCta}
                        onChange={(e) => setFormData({ ...formData, announcementCta: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Accent Palette Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Brand Accent Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: 'cyan', name: 'Electric Cyan', color: 'bg-cyan-400' },
                    { id: 'sky', name: 'Sky Blue', color: 'bg-sky-400' },
                    { id: 'emerald', name: 'Emerald', color: 'bg-emerald-400' },
                    { id: 'violet', name: 'Violet', color: 'bg-violet-400' },
                    { id: 'amber', name: 'Amber Gold', color: 'bg-amber-400' },
                  ].map((thm) => (
                    <button
                      key={thm.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, themeAccent: thm.id as any })}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                        formData.themeAccent === thm.id
                          ? 'border-cyan-400 bg-slate-900/90 shadow-md ring-1 ring-cyan-400'
                          : 'border-slate-800 bg-[#070c17] hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${thm.color}`} />
                      <span className="text-xs font-semibold text-white">{thm.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PACKAGES & PLANS */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Marketing Packages & Retainers
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Edit the 3 packages directly sourced from marketinglu.com (Basic, Advance, Pro).
                </p>
              </div>

              <div className="space-y-6">
                {config.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-bold text-white">{pkg.name}</h4>
                        {pkg.popular && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 uppercase">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{pkg.highlight}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => updatePackage({ ...pkg, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Price Note / Scope</label>
                        <input
                          type="text"
                          value={pkg.priceNote}
                          onChange={(e) => updatePackage({ ...pkg, priceNote: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-slate-400 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={pkg.tagline}
                          onChange={(e) => updatePackage({ ...pkg, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-2">
                        Features Inclusions ({pkg.features.length} Items)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {pkg.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs"
                          >
                            <span className={feat.included ? 'text-slate-200' : 'text-slate-500'}>
                              {feat.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const newFeats = [...pkg.features];
                                newFeats[fIdx].included = !newFeats[fIdx].included;
                                updatePackage({ ...pkg, features: newFeats });
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                feat.included
                                  ? 'bg-cyan-500/20 text-cyan-400'
                                  : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              {feat.included ? 'Included' : 'Excluded'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TESTIMONIALS & REVIEWS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Client Testimonials & Feedback
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage the authentic reviews from Lalita Rani, Ajay Bhutkar, Ankush Sharma, or add custom reviews.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddReviewModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-cyan-400 transition-colors self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Review</span>
                </button>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {config.testimonials.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#070c17] border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarColor} flex items-center justify-center text-white font-bold text-xs`}>
                          {rev.initial}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                          <span className="text-[11px] text-slate-400">{rev.role}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded text-amber-300 font-bold text-xs border border-amber-400/20">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{rev.rating}/5</span>
                        </div>
                        {config.testimonials.length > 1 && (
                          <button
                            onClick={() => deleteTestimonial(rev.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Reviewer Name</label>
                        <input
                          type="text"
                          value={rev.name}
                          onChange={(e) => updateTestimonial({ ...rev, name: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Rating (1 to 5)</label>
                        <select
                          value={rev.rating}
                          onChange={(e) => updateTestimonial({ ...rev, rating: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        >
                          <option value={5}>⭐ 5 / 5 Stars</option>
                          <option value={4}>⭐ 4 / 5 Stars</option>
                          <option value={3}>⭐ 3 / 5 Stars</option>
                          <option value={2}>⭐ 2 / 5 Stars</option>
                          <option value={1}>⭐ 1 / 5 Stars</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Role / Badge</label>
                        <input
                          type="text"
                          value={rev.role}
                          onChange={(e) => updateTestimonial({ ...rev, role: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Review Statement</label>
                      <textarea
                        rows={2}
                        value={rev.quote}
                        onChange={(e) => updateTestimonial({ ...rev, quote: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PERFORMANCE STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Performance Metrics & Percentages
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Configure the core stats displayed in the "Our Performance In Numbers" section.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#070c17] border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Customised Web Design & Development (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.webDesignStat}
                      onChange={(e) => setFormData({ ...formData, webDesignStat: Number(e.target.value) })}
                      className="w-28 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-lg"
                    />
                    <span className="text-sm font-semibold text-slate-400">% (marketinglu.com: 91%)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#070c17] border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    E-Commerce Solution (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.ecommerceStat}
                      onChange={(e) => setFormData({ ...formData, ecommerceStat: Number(e.target.value) })}
                      className="w-28 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-lg"
                    />
                    <span className="text-sm font-semibold text-slate-400">% (marketinglu.com: 95%)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#070c17] border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Design (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.designStat}
                      onChange={(e) => setFormData({ ...formData, designStat: Number(e.target.value) })}
                      className="w-28 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-lg"
                    />
                    <span className="text-sm font-semibold text-slate-400">% (marketinglu.com: 86%)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#070c17] border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    SMO (Social Media Optimization) (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.smoStat}
                      onChange={(e) => setFormData({ ...formData, smoStat: Number(e.target.value) })}
                      className="w-28 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-lg"
                    />
                    <span className="text-sm font-semibold text-slate-400">% (marketinglu.com: 91%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer inside panel */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Click <strong>"Publish Fixes"</strong> to apply changes to the live site.
            </span>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Fixes</span>
            </button>
          </div>

        </main>
      </div>

      {/* Modal: Add New Testimonial */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1120] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Add Client Review</h3>
            <form onSubmit={handleAddReviewSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reviewer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value={5}>⭐ 5/5 Stars</option>
                  <option value={4}>⭐ 4/5 Stars</option>
                  <option value={3}>⭐ 3/5 Stars</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Verified Business Client"
                  value={newReview.role}
                  onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Review Quote</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Client feedback..."
                  value={newReview.quote}
                  onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 text-xs font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400"
                >
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
