import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  Sparkles, 
  Check, 
  Eye, 
  EyeOff, 
  MoveUp, 
  MoveDown, 
  Image as ImageIcon,
  Upload,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { CustomSection, CustomSectionItem, SectionPosition, SectionLayout } from '../../types';

interface SectionsTabProps {
  sections: CustomSection[];
  onAddSection: (section: CustomSection) => void;
  onUpdateSection: (section: CustomSection) => void;
  onDeleteSection: (id: string) => void;
  onToggleSection: (id: string) => void;
}

const positionLabels: Record<SectionPosition, string> = {
  'after-hero': 'Position: Directly After Hero Section',
  'after-stats': 'Position: After Performance Stats',
  'after-expertise': 'Position: After Services & Expertise',
  'after-packages': 'Position: After Service Packages',
  'after-cases': 'Position: After Case Studies & Work',
  'after-faq': 'Position: After FAQ (Before Footer)',
};

const layoutLabels: Record<SectionLayout, string> = {
  'cards': 'Feature Cards Grid (3 or 4 columns)',
  'split-image': 'Split Showcase (Visual Image + Bullet Inclusions)',
  'banner': 'Call-To-Action Banner (Wide Accent Strip)',
  'stats': 'Metrics Grid (Large Numbers + Labels)',
};

export default function SectionsTab({
  sections = [],
  onAddSection,
  onUpdateSection,
  onDeleteSection,
  onToggleSection,
}: SectionsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CustomSection | null>(null);

  // Form state for creating / editing a section
  const [formData, setFormData] = useState<CustomSection>({
    id: '',
    badge: 'EXCLUSIVE ADVANTAGE',
    title: 'Engineered for Real',
    titleHighlight: 'Revenue Growth',
    description: 'We blend modern design aesthetics with deep algorithmic performance to scale your digital presence.',
    position: 'after-packages',
    layout: 'cards',
    enabled: true,
    order: sections.length + 1,
    imageUrl: '',
    imageAlt: '',
    imagePosition: 'right',
    primaryCtaText: 'Schedule Strategic Review',
    primaryCtaLink: '#consultation',
    secondaryCtaText: 'Inquire on WhatsApp',
    secondaryCtaLink: 'https://wa.me/+919654596149',
    items: [
      {
        id: 'item-1',
        title: 'Full Code Ownership',
        description: 'You retain complete IP, domain, and asset ownership forever.',
        tag: 'SECURITY',
        icon: 'Award',
        statValue: '100%',
        statLabel: 'Client Ownership'
      },
      {
        id: 'item-2',
        title: 'Zero Long-Term Lock-in',
        description: 'Month-to-month retainers. We earn your business every month.',
        tag: 'FLEXIBILITY',
        icon: 'ShieldCheck',
        statValue: '0 Mo',
        statLabel: 'Contract Minimum'
      },
      {
        id: 'item-3',
        title: 'Dedicated Senior Strategist',
        description: 'Direct communication via Slack & WhatsApp with experienced leads.',
        tag: 'EXPERTISE',
        icon: 'Sparkles',
        statValue: '24/7',
        statLabel: 'Dedicated Access'
      }
    ]
  });

  const handleOpenAddModal = () => {
    const newId = `section-${Date.now()}`;
    setEditingSection(null);
    setFormData({
      id: newId,
      badge: 'CUSTOM SECTION',
      title: 'Our Custom Growth',
      titleHighlight: 'Capabilities',
      description: 'Highlight custom marketing methodologies, strategic guarantees, or partner achievements.',
      position: 'after-packages',
      layout: 'cards',
      enabled: true,
      order: sections.length + 1,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Growth analytics showcase',
      imagePosition: 'right',
      primaryCtaText: 'Explore Opportunities',
      primaryCtaLink: '#consultation',
      secondaryCtaText: 'WhatsApp Chat',
      secondaryCtaLink: 'https://wa.me/+919654596149',
      items: [
        {
          id: '1',
          title: 'Direct Strategic Alignment',
          description: 'Customized milestones designed around your exact CAC and revenue goals.',
          tag: 'STRATEGY',
          icon: 'Target',
          statValue: '99.4%',
          statLabel: 'On-Time Delivery'
        },
        {
          id: '2',
          title: 'Full-Stack Execution',
          description: 'Design, development, and conversion-rate optimization under one roof.',
          tag: 'SPEED',
          icon: 'Zap',
          statValue: '3.4x',
          statLabel: 'Average Lift'
        },
        {
          id: '3',
          title: 'Transparent Reporting',
          description: 'Real-time live Google Looker Studio dashboards accessible anytime.',
          tag: 'INTEGRITY',
          icon: 'BarChart3',
          statValue: 'Live',
          statLabel: 'Data Sync'
        }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (section: CustomSection) => {
    setEditingSection(section);
    setFormData(JSON.parse(JSON.stringify(section)));
    setIsModalOpen(true);
  };

  const handleApplyTemplate = (type: 'cards' | 'split' | 'banner' | 'stats') => {
    if (type === 'cards') {
      setFormData(prev => ({
        ...prev,
        layout: 'cards',
        badge: 'WHY PARTNER WITH US',
        title: 'Key Advantages of',
        titleHighlight: 'Our Growth Retainers',
        description: 'See why high-growth brands trust MarketingGlu for predictable digital customer acquisition.',
        items: [
          {
            id: '1',
            title: 'Agile 14-Day Sprints',
            description: 'Fast deployment cycles without red tape or delayed turnaround.',
            tag: 'AGILE',
            icon: 'Rocket',
            statValue: '14 Days',
            statLabel: 'Sprint Cycles'
          },
          {
            id: '2',
            title: 'Full Intellectual Property Ownership',
            description: 'You own 100% of your codebase, domains, ad accounts, and analytics.',
            tag: 'FREEDOM',
            icon: 'Award',
            statValue: '100%',
            statLabel: 'Ownership'
          },
          {
            id: '3',
            title: 'Direct Senior Strategists',
            description: 'Dedicated senior accounts director on Slack & WhatsApp.',
            tag: 'TALENT',
            icon: 'Sparkles',
            statValue: 'Senior',
            statLabel: 'Only Leads'
          }
        ]
      }));
    } else if (type === 'split') {
      setFormData(prev => ({
        ...prev,
        layout: 'split-image',
        badge: 'OMNICHANNEL METHODOLOGY',
        title: 'How We Transform Your',
        titleHighlight: 'Online Marketing Funnel',
        description: 'From initial search discovery to high-converting landing experiences, our integrated team executes every touchpoint with surgical precision.',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
        imagePosition: 'right',
        primaryCtaText: 'Request Funnel Architecture Audit',
        primaryCtaLink: '#consultation',
        secondaryCtaText: 'Chat on WhatsApp',
        secondaryCtaLink: 'https://wa.me/+919654596149',
        items: [
          {
            id: '1',
            title: 'High-Converting Web Architecture',
            description: 'Sub-second mobile loading speeds and tailored UI design.',
          },
          {
            id: '2',
            title: 'Intent-Driven Search Rankings',
            description: 'First page Google organic reach for commercial buyer queries.',
          },
          {
            id: '3',
            title: 'High-ROAS Paid Ads & Social Retargeting',
            description: 'Multi-platform funneling across Google, Meta, and LinkedIn.',
          }
        ]
      }));
    } else if (type === 'banner') {
      setFormData(prev => ({
        ...prev,
        layout: 'banner',
        badge: 'LIMITED AVAILABILITY',
        title: 'Ready to Accelerate Your',
        titleHighlight: 'Market Position in 2025?',
        description: 'Partner with New Delhi’s proven digital growth agency. Book your confidential consultation or request a comprehensive free site audit.',
        primaryCtaText: 'Claim Free Strategy Audit',
        primaryCtaLink: '#consultation',
        secondaryCtaText: 'WhatsApp Direct (+91 96545 96149)',
        secondaryCtaLink: 'https://wa.me/+919654596149',
      }));
    } else if (type === 'stats') {
      setFormData(prev => ({
        ...prev,
        layout: 'stats',
        badge: 'MEASURABLE IMPACT',
        title: 'Performance Numbers Across',
        titleHighlight: 'Active Client Retainers',
        description: 'Hard figures from our recent client campaigns and digital marketing sprints.',
        items: [
          { id: '1', statValue: '180%+', title: 'Organic Growth', description: 'Average 6-month organic impression lift' },
          { id: '2', statValue: '4.2x', title: 'Average ROAS', description: 'Across Google & Meta sponsored ad spend' },
          { id: '3', statValue: '< 1.2s', title: 'Mobile Load', description: 'Ultra-fast web architectures engineered' },
          { id: '4', statValue: '99%', title: 'Retention', description: 'Clients renew monthly due to proven returns' },
        ]
      }));
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Section title is required');
      return;
    }

    if (editingSection) {
      onUpdateSection(formData);
    } else {
      onAddSection(formData);
    }
    setIsModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size exceeds 2MB. Please select a smaller image or use an image URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = () => {
    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: 'New Feature / Point',
      description: 'Add specific details about this inclusion or service outcome.',
      tag: 'BENEFIT',
      icon: 'CheckCircle2',
      statValue: '100%',
      statLabel: 'Guarantee'
    };
    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const handleUpdateItem = (index: number, field: keyof CustomSectionItem, val: string) => {
    setFormData(prev => {
      const newItems = [...(prev.items || [])];
      newItems[index] = { ...newItems[index], [field]: val };
      return { ...prev, items: newItems };
    });
  };

  const handleDeleteItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: (prev.items || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Section CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Dynamic Page Sections</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Add new custom marketing sections to any position on your website (cards, split showcase, CTA banners, stats).
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/15 cursor-pointer transition-all active:scale-95"
          id="add-section-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Section</span>
        </button>
      </div>

      {/* Sections List */}
      {sections.length === 0 ? (
        <div className="p-10 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white">No Custom Sections Added Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
            Create custom feature grids, story showcases, or call-to-action blocks to expand your homepage.
          </p>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Create Your First Section
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                sec.enabled 
                  ? 'bg-[#0b1222] border-slate-800 hover:border-cyan-500/40' 
                  : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                      {positionLabels[sec.position] || sec.position}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      Layout: {sec.layout}
                    </span>
                    {sec.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                        {sec.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white truncate">
                    {sec.title} <span className="text-cyan-400">{sec.titleHighlight}</span>
                  </h3>
                  {sec.description && (
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {sec.description}
                    </p>
                  )}
                </div>

                {/* Section Action Controls */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <button
                    type="button"
                    onClick={() => onToggleSection(sec.id)}
                    title={sec.enabled ? 'Disable Section' : 'Enable Section'}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      sec.enabled
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{sec.enabled ? 'Active' : 'Disabled'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(sec)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors"
                    title="Edit Section Content"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete section "${sec.title}"?`)) {
                        onDeleteSection(sec.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                    title="Delete Section"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: ADD / EDIT SECTION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#090e1c] border border-slate-800 shadow-2xl my-8 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">
                  {editingSection ? 'Edit Custom Section' : 'Build & Add New Section'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Starter Templates */}
            {!editingSection && (
              <div className="mb-6 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Choose a Pre-Engineered Template (Optional)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('cards')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-200 text-center cursor-pointer transition-colors"
                  >
                    Feature Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('split')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-200 text-center cursor-pointer transition-colors"
                  >
                    Split Image + Story
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('banner')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-200 text-center cursor-pointer transition-colors"
                  >
                    CTA Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('stats')}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-200 text-center cursor-pointer transition-colors"
                  >
                    Impact Stats
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="space-y-5">
              {/* Position & Layout Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Position on Homepage
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as SectionPosition })}
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="after-hero">Directly After Hero</option>
                    <option value="after-stats">After Performance Numbers</option>
                    <option value="after-expertise">After Services / Expertise</option>
                    <option value="after-packages">After Service Packages</option>
                    <option value="after-cases">After Case Studies & Work</option>
                    <option value="after-faq">After FAQ Section</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Section Visual Layout
                  </label>
                  <select
                    value={formData.layout}
                    onChange={(e) => setFormData({ ...formData, layout: e.target.value as SectionLayout })}
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="cards">Cards Grid (Icon + Title + Description + Stat)</option>
                    <option value="split-image">Split Layout (Showcase Image + Inclusions)</option>
                    <option value="banner">Wide CTA Banner Strip</option>
                    <option value="stats">High-Impact Metrics Grid</option>
                  </select>
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. THE MARKETINGLU ADVANTAGE"
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Main Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Why Scaling Brands Choose"
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Title Gradient Highlight
                  </label>
                  <input
                    type="text"
                    value={formData.titleHighlight || ''}
                    onChange={(e) => setFormData({ ...formData, titleHighlight: e.target.value })}
                    placeholder="e.g. Our Strategic Team"
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Section Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain the benefit or proposition..."
                  className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Layout Specific: Image Settings */}
              {(formData.layout === 'split-image' || formData.layout === 'cards') && (
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Section Showcase Image</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-8">
                      <input
                        type="url"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {formData.imageUrl && (
                    <div className="w-32 h-20 rounded-xl overflow-hidden border border-slate-800 relative bg-black">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                        className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-red-400 hover:text-red-300"
                        title="Remove Image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Call-to-action buttons configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-bold text-cyan-300 uppercase">Primary Action Button</div>
                  <input
                    type="text"
                    value={formData.primaryCtaText || ''}
                    onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                    placeholder="Button Text (e.g. Book Free Consultation)"
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={formData.primaryCtaLink || ''}
                    onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })}
                    placeholder="Action Link (e.g. #consultation or URL)"
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-bold text-slate-300 uppercase">Secondary Action Button</div>
                  <input
                    type="text"
                    value={formData.secondaryCtaText || ''}
                    onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                    placeholder="Secondary Text (e.g. WhatsApp Direct)"
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={formData.secondaryCtaLink || ''}
                    onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
                    placeholder="Secondary Link (e.g. https://wa.me/...)"
                    className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono"
                  />
                </div>
              </div>

              {/* Items / Points List (for Cards, Split Inclusions, or Stats) */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {formData.layout === 'stats' ? 'Metric Data Points' : 'Section Items & Features'}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {formData.items && formData.items.map((item, idx) => (
                    <div key={item.id || idx} className="p-3 rounded-xl bg-[#060a13] border border-slate-800 flex items-start gap-2.5">
                      <div className="flex-1 space-y-1.5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateItem(idx, 'title', e.target.value)}
                            placeholder="Item Title"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-semibold"
                          />
                          <input
                            type="text"
                            value={item.tag || ''}
                            onChange={(e) => handleUpdateItem(idx, 'tag', e.target.value)}
                            placeholder="Tag (e.g. SPEED)"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-mono"
                          />
                          <input
                            type="text"
                            value={item.statValue || ''}
                            onChange={(e) => handleUpdateItem(idx, 'statValue', e.target.value)}
                            placeholder="Stat Value (e.g. 100%)"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-cyan-400 font-mono"
                          />
                        </div>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                          placeholder="Brief description of this benefit or deliverable..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(idx)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:text-red-300 border border-red-500/30 shrink-0"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {editingSection ? 'Save Section Changes' : 'Publish Section to Site'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
