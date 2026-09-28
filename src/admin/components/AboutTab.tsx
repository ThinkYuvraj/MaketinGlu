import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Lock,
  Compass,
  Users2,
  Layers,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  CheckCircle2,
  Eye,
  EyeOff,
  Palette,
  HeartHandshake
} from 'lucide-react';
import { AboutPillar } from '../../types';
import { defaultAboutPillars, defaultAboutChecklist } from '../../context/SiteConfigContext';

interface AboutTabProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSave?: () => void;
}

const AVAILABLE_ICONS: { [key: string]: React.ElementType } = {
  Zap,
  Lock,
  Compass,
  Users2,
  ShieldCheck,
  Sparkles,
  Layers,
  TrendingUp,
  Award,
  CheckCircle2,
  HeartHandshake,
};

const ACCENT_STYLES: {
  [key: string]: { label: string; bg: string; border: string; text: string; gradient: string };
} = {
  cyan: {
    label: 'Cyber Cyan',
    bg: 'bg-cyan-950/40',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-blue-500/10',
  },
  emerald: {
    label: 'Emerald Green',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/10',
  },
  sky: {
    label: 'Sky Blue',
    bg: 'bg-sky-950/40',
    border: 'border-sky-500/30',
    text: 'text-sky-400',
    gradient: 'from-sky-500/20 to-indigo-500/10',
  },
  amber: {
    label: 'Amber Gold',
    bg: 'bg-amber-950/40',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  violet: {
    label: 'Electric Violet',
    bg: 'bg-purple-950/40',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    gradient: 'from-purple-500/20 to-indigo-500/10',
  },
};

export default function AboutTab({ formData, setFormData, onSave }: AboutTabProps) {
  // Modal states for Pillar creation and editing
  const [editingPillar, setEditingPillar] = useState<AboutPillar | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New pillar draft
  const [newPillar, setNewPillar] = useState<Partial<AboutPillar>>({
    title: '',
    tag: 'CAPABILITY',
    description: '',
    iconName: 'Zap',
    accent: 'cyan',
  });

  // State for adding a new checklist item
  const [newChecklistText, setNewChecklistText] = useState('');

  const currentPillars: AboutPillar[] = formData.aboutPillars || defaultAboutPillars;
  const currentChecklist: string[] = formData.aboutChecklist || defaultAboutChecklist;
  const isEnabled = formData.aboutEnabled !== false;

  // Toggle section enabled
  const handleToggleEnabled = () => {
    setFormData((prev: any) => ({
      ...prev,
      aboutEnabled: !isEnabled,
    }));
  };

  // Add a new Pillar
  const handleAddPillarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPillar.title?.trim() || !newPillar.description?.trim()) return;

    const created: AboutPillar = {
      id: `pillar-${Date.now()}`,
      title: newPillar.title.trim(),
      tag: (newPillar.tag || 'PILLAR').trim().toUpperCase(),
      description: newPillar.description.trim(),
      iconName: newPillar.iconName || 'Zap',
      accent: (newPillar.accent || 'cyan') as any,
    };

    setFormData((prev: any) => ({
      ...prev,
      aboutPillars: [...(prev.aboutPillars || defaultAboutPillars), created],
    }));

    setNewPillar({
      title: '',
      tag: 'CAPABILITY',
      description: '',
      iconName: 'Zap',
      accent: 'cyan',
    });
    setIsAddModalOpen(false);
  };

  // Update existing pillar
  const handleUpdatePillarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPillar || !editingPillar.title.trim()) return;

    setFormData((prev: any) => ({
      ...prev,
      aboutPillars: (prev.aboutPillars || defaultAboutPillars).map((p: AboutPillar) =>
        p.id === editingPillar.id ? editingPillar : p
      ),
    }));

    setEditingPillar(null);
  };

  // Delete pillar
  const handleDeletePillar = (id: string) => {
    if (confirm('Are you sure you want to remove this pillar card?')) {
      setFormData((prev: any) => ({
        ...prev,
        aboutPillars: (prev.aboutPillars || defaultAboutPillars).filter(
          (p: AboutPillar) => p.id !== id
        ),
      }));
    }
  };

  // Add checklist item
  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;

    setFormData((prev: any) => ({
      ...prev,
      aboutChecklist: [...(prev.aboutChecklist || defaultAboutChecklist), newChecklistText.trim()],
    }));
    setNewChecklistText('');
  };

  // Delete checklist item
  const handleDeleteChecklist = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      aboutChecklist: (prev.aboutChecklist || defaultAboutChecklist).filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header and Master Section Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <span>About Us Section Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customize the agency story, credentials, value propositions, and core pillars displayed in the About section (#about).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleToggleEnabled}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
              isEnabled
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            {isEnabled ? <Eye className="w-4 h-4 text-cyan-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
            <span>{isEnabled ? 'Section Enabled' : 'Section Hidden'}</span>
          </button>

          {onSave && (
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold shadow-md shadow-cyan-400/20 cursor-pointer transition-all active:scale-95"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* 1. Header Titles & Summary */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Header Copy &amp; Introduction</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Badge Eyebrow Text
            </label>
            <input
              type="text"
              value={formData.aboutBadge || ''}
              onChange={(e) => setFormData({ ...formData, aboutBadge: e.target.value })}
              placeholder="ABOUT MARKETIN GLU"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Title Prefix (Line 1)
            </label>
            <input
              type="text"
              value={formData.aboutTitle1 || ''}
              onChange={(e) => setFormData({ ...formData, aboutTitle1: e.target.value })}
              placeholder="Engineering Next-Gen Software &"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Title Highlight (Line 2 - Gradient)
            </label>
            <input
              type="text"
              value={formData.aboutTitle2 || ''}
              onChange={(e) => setFormData({ ...formData, aboutTitle2: e.target.value })}
              placeholder="High-Impact Digital Growth"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Executive Description Summary
            </label>
            <textarea
              rows={3}
              value={formData.aboutDescription || ''}
              onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Agency Philosophy & Mission */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Compass className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Agency Philosophy &amp; Core Mission</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Agency Story &amp; Engineering Philosophy
            </label>
            <textarea
              rows={3}
              value={formData.aboutStory || ''}
              onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Core Mission Statement
            </label>
            <input
              type="text"
              value={formData.aboutMission || ''}
              onChange={(e) => setFormData({ ...formData, aboutMission: e.target.value })}
              placeholder="To engineer durable, high-converting digital assets..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Credentials & Metric Badges */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Award className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Credential &amp; Track Record Badges</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Years of Experience
            </label>
            <input
              type="text"
              value={formData.aboutYearsExperience || ''}
              onChange={(e) => setFormData({ ...formData, aboutYearsExperience: e.target.value })}
              placeholder="8+ Years"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Deployments Delivered
            </label>
            <input
              type="text"
              value={formData.aboutProjectsDelivered || ''}
              onChange={(e) => setFormData({ ...formData, aboutProjectsDelivered: e.target.value })}
              placeholder="250+ Projects"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Retention / Satisfaction
            </label>
            <input
              type="text"
              value={formData.aboutClientSatisfaction || ''}
              onChange={(e) => setFormData({ ...formData, aboutClientSatisfaction: e.target.value })}
              placeholder="99% Retention"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Quality Certification
            </label>
            <input
              type="text"
              value={formData.aboutCertification || ''}
              onChange={(e) => setFormData({ ...formData, aboutCertification: e.target.value })}
              placeholder="ISO 9001:2015"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Value Checklist Points */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Value Proposition Checklist ({currentChecklist.length})</h3>
          </div>
        </div>

        <div className="space-y-2">
          {currentChecklist.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-200"
            >
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteChecklist(index)}
                className="w-7 h-7 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 flex items-center justify-center text-red-400 transition-colors shrink-0 cursor-pointer"
                title="Remove bullet"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add bullet point form */}
          <form onSubmit={handleAddChecklist} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newChecklistText}
              onChange={(e) => setNewChecklistText(e.target.value)}
              placeholder="Add a new checklist point (e.g., Enterprise SLA & 24/7 Monitoring)..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Point</span>
            </button>
          </form>
        </div>
      </div>

      {/* 5. Core Pillars Management (Cards) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Core Pillars &amp; Foundations ({currentPillars.length})</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Add, update, or remove the primary engineering and service pillars highlighted in the About section.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all shadow-md shadow-cyan-400/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Pillar</span>
          </button>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPillars.map((pillar) => {
            const IconComponent = AVAILABLE_ICONS[pillar.iconName || 'Zap'] || Zap;
            const accentStyle = ACCENT_STYLES[pillar.accent || 'cyan'] || ACCENT_STYLES.cyan;

            return (
              <div
                key={pillar.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#080d19] border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                      {pillar.tag}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingPillar(pillar)}
                        className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                        title="Edit Pillar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePillar(pillar.id)}
                        className="w-7 h-7 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 flex items-center justify-center text-red-400 transition-colors cursor-pointer"
                        title="Delete Pillar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl ${accentStyle.bg} ${accentStyle.border} border flex items-center justify-center ${accentStyle.text} shrink-0`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Icon: {pillar.iconName || 'Zap'}</span>
                  <span>Accent: {pillar.accent || 'cyan'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Pillar Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#090e1c] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Add New About Pillar Card</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPillarSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pillar Title *
                </label>
                <input
                  type="text"
                  required
                  value={newPillar.title}
                  onChange={(e) => setNewPillar({ ...newPillar, title: e.target.value })}
                  placeholder="e.g. Sub-Second Performance Engineering"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tag / Badge (Uppercase)
                  </label>
                  <input
                    type="text"
                    value={newPillar.tag}
                    onChange={(e) => setNewPillar({ ...newPillar, tag: e.target.value.toUpperCase() })}
                    placeholder="ENGINEERING"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Icon
                  </label>
                  <select
                    value={newPillar.iconName}
                    onChange={(e) => setNewPillar({ ...newPillar, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    {Object.keys(AVAILABLE_ICONS).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Accent Color Theme
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['cyan', 'emerald', 'sky', 'amber', 'violet'] as const).map((acc) => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => setNewPillar({ ...newPillar, accent: acc })}
                      className={`p-2 rounded-xl border text-[11px] font-bold capitalize transition-all cursor-pointer ${
                        newPillar.accent === acc
                          ? 'border-cyan-400 bg-cyan-950/80 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newPillar.description}
                  onChange={(e) => setNewPillar({ ...newPillar, description: e.target.value })}
                  placeholder="Explain how this discipline protects or grows client assets..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Add Pillar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Pillar Modal */}
      {editingPillar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#090e1c] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyan-400" />
                <span>Edit Pillar Card</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingPillar(null)}
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdatePillarSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pillar Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPillar.title}
                  onChange={(e) => setEditingPillar({ ...editingPillar, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tag / Badge (Uppercase)
                  </label>
                  <input
                    type="text"
                    value={editingPillar.tag}
                    onChange={(e) => setEditingPillar({ ...editingPillar, tag: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Icon
                  </label>
                  <select
                    value={editingPillar.iconName}
                    onChange={(e) => setEditingPillar({ ...editingPillar, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    {Object.keys(AVAILABLE_ICONS).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Accent Color Theme
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['cyan', 'emerald', 'sky', 'amber', 'violet'] as const).map((acc) => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => setEditingPillar({ ...editingPillar, accent: acc })}
                      className={`p-2 rounded-xl border text-[11px] font-bold capitalize transition-all cursor-pointer ${
                        editingPillar.accent === acc
                          ? 'border-cyan-400 bg-cyan-950/80 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingPillar.description}
                  onChange={(e) => setEditingPillar({ ...editingPillar, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPillar(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
