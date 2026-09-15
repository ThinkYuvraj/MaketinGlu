import React from 'react';
import { Type, Sparkles, Zap, HelpCircle, Bell } from 'lucide-react';

interface TitlesTabProps {
  formData: {
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroDescription: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;

    packagesSectionBadge: string;
    packagesSectionTitle1: string;
    packagesSectionTitle2: string;
    packagesSectionDescription: string;

    casesSectionBadge: string;
    casesSectionTitle1: string;
    casesSectionTitle2: string;
    casesSectionDescription: string;

    faqSectionBadge: string;
    faqSectionTitle1: string;
    faqSectionTitle2: string;
    faqSectionDescription: string;

    announcementEnabled: boolean;
    announcementText: string;
    announcementCta: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function TitlesTab({ formData, setFormData }: TitlesTabProps) {
  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Type className="w-5 h-5 text-cyan-400" />
          <span>Website Titles, Badges & Headlines</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize all primary banners, section titles, and marketing value propositions displayed across the public website.
        </p>
      </div>

      {/* 1. HERO SECTION TITLES */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Hero Section Titles</h3>
            <p className="text-[11px] text-slate-400">First headline visitors see above the fold.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Headline Line 1 (Single Line)
            </label>
            <input
              type="text"
              value={formData.heroTitleLine1}
              onChange={(e) => setFormData({ ...formData, heroTitleLine1: e.target.value })}
              placeholder="DIGITAL MARKETING"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-bold tracking-wide focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Headline Line 2 / Gradient Accent
            </label>
            <input
              type="text"
              value={formData.heroTitleLine2}
              onChange={(e) => setFormData({ ...formData, heroTitleLine2: e.target.value })}
              placeholder="SOLUTIONS"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-cyan-300 text-xs font-bold tracking-wide focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Hero Description Copy
            </label>
            <textarea
              rows={3}
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Action Button Label
            </label>
            <input
              type="text"
              value={formData.heroPrimaryCta}
              onChange={(e) => setFormData({ ...formData, heroPrimaryCta: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Secondary Action Button Label
            </label>
            <input
              type="text"
              value={formData.heroSecondaryCta}
              onChange={(e) => setFormData({ ...formData, heroSecondaryCta: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. PACKAGES SECTION TITLES */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Packages & Retainers Section Titles</h3>
            <p className="text-[11px] text-slate-400">Headings for Transparent Service Tiers and tailored plans.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Pill Badge Text
            </label>
            <input
              type="text"
              value={formData.packagesSectionBadge}
              onChange={(e) => setFormData({ ...formData, packagesSectionBadge: e.target.value })}
              placeholder="TRANSPARENT SERVICE TIERS"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Main Heading (Prefix)
            </label>
            <input
              type="text"
              value={formData.packagesSectionTitle1}
              onChange={(e) => setFormData({ ...formData, packagesSectionTitle1: e.target.value })}
              placeholder="Tailored Digital Marketing"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Gradient Highlighted Heading Part
            </label>
            <input
              type="text"
              value={formData.packagesSectionTitle2}
              onChange={(e) => setFormData({ ...formData, packagesSectionTitle2: e.target.value })}
              placeholder="Service Packages"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-cyan-300 text-xs font-bold focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Packages Subtitle Description
            </label>
            <textarea
              rows={2}
              value={formData.packagesSectionDescription}
              onChange={(e) => setFormData({ ...formData, packagesSectionDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* 3. CASE STUDIES SECTION TITLES */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Case Studies Section Titles</h3>
            <p className="text-[11px] text-slate-400">Headings for verified results, Nexa Store, TechDuniya, and custom studies.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Pill Badge Text
            </label>
            <input
              type="text"
              value={formData.casesSectionBadge}
              onChange={(e) => setFormData({ ...formData, casesSectionBadge: e.target.value })}
              placeholder="PROVEN OUTCOMES"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Main Heading (Prefix)
            </label>
            <input
              type="text"
              value={formData.casesSectionTitle1}
              onChange={(e) => setFormData({ ...formData, casesSectionTitle1: e.target.value })}
              placeholder="Case Studies &"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Gradient Highlighted Heading Part
            </label>
            <input
              type="text"
              value={formData.casesSectionTitle2}
              onChange={(e) => setFormData({ ...formData, casesSectionTitle2: e.target.value })}
              placeholder="Recent Work"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-cyan-300 text-xs font-bold focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Case Studies Subtitle Description
            </label>
            <input
              type="text"
              value={formData.casesSectionDescription}
              onChange={(e) => setFormData({ ...formData, casesSectionDescription: e.target.value })}
              placeholder="Real-world revenue and lead-generation outcomes engineered for scaling brands."
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS SECTION TITLES */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Frequently Asked Questions Titles</h3>
            <p className="text-[11px] text-slate-400">Headings for the FAQ knowledge base section.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Pill Badge Text
            </label>
            <input
              type="text"
              value={formData.faqSectionBadge}
              onChange={(e) => setFormData({ ...formData, faqSectionBadge: e.target.value })}
              placeholder="Knowledge Base"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Main Heading (Prefix)
            </label>
            <input
              type="text"
              value={formData.faqSectionTitle1}
              onChange={(e) => setFormData({ ...formData, faqSectionTitle1: e.target.value })}
              placeholder="Frequently Asked"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Gradient Highlighted Heading Part
            </label>
            <input
              type="text"
              value={formData.faqSectionTitle2}
              onChange={(e) => setFormData({ ...formData, faqSectionTitle2: e.target.value })}
              placeholder="Questions"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-cyan-300 text-xs font-bold focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              FAQ Subtitle Description
            </label>
            <textarea
              rows={2}
              value={formData.faqSectionDescription}
              onChange={(e) => setFormData({ ...formData, faqSectionDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* 5. TOP ANNOUNCEMENT BAR */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800/90 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
              <Bell className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Top Announcement Bar</h3>
              <p className="text-[11px] text-slate-400">Notice strip at the very top of the webpage.</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.announcementEnabled}
              onChange={(e) => setFormData({ ...formData, announcementEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>

        {formData.announcementEnabled && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Announcement Message</label>
              <input
                type="text"
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">CTA Button Label</label>
              <input
                type="text"
                value={formData.announcementCta}
                onChange={(e) => setFormData({ ...formData, announcementCta: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
