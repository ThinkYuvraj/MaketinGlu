import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Eye, 
  Layers, 
  Info,
  Globe,
  Briefcase
} from 'lucide-react';
import { expertiseData } from '../../data/expertiseData';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { CaseStudy, CustomSection } from '../../types';

interface ImagesMediaTabProps {
  onNotifySave?: () => void;
}

// Curated high quality presets for each service
const servicePresets: Record<string, { label: string; url: string }[]> = {
  'website-design': [
    { label: 'Modern Laptop Mockup', url: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Clean UI Architecture', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Responsive Mobile & Desktop', url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop' },
  ],
  'ecommerce-design': [
    { label: 'E-commerce Checkout UI', url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop' },
    { label: 'D2C Retail Showcase', url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Online Store Analytics', url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop' },
  ],
  'seo-optimization': [
    { label: 'Google Search Traffic Growth', url: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Keyword Rank Analytics', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Data Search Engine Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
  ],
  'graphic-design': [
    { label: 'Creative Brand Studio', url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Editorial Visual Mockups', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Typography & Visual Identity', url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1200&auto=format&fit=crop' },
  ],
  'ppc-campaigns': [
    { label: 'Google & Meta Ads Metrics', url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Paid Conversion Performance', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Digital Ads Targeting Grid', url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1200&auto=format&fit=crop' },
  ],
  'smo-optimization': [
    { label: 'Social Media Creator Studio', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Audience Engagement Reach', url: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Viral Feed & Story Assets', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop' },
  ]
};

export default function ImagesMediaTab({ onNotifySave }: ImagesMediaTabProps) {
  const { config, updateSectionImage, resetSectionImage, updateCaseStudy, updateCustomSection } = useSiteConfig();
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'cases' | 'sections'>('services');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    onNotifySave?.();
    setTimeout(() => setSuccessToast(null), 2800);
  };

  const handleFileUpload = (key: string, file: File) => {
    if (file.size > 2.5 * 1024 * 1024) {
      alert('File exceeds 2.5MB. Please choose a smaller image or enter an online image URL.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateSectionImage(key, reader.result);
        triggerToast(`Updated image for ${key}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCaseImageUpload = (study: CaseStudy, file: File) => {
    if (file.size > 2.5 * 1024 * 1024) {
      alert('File exceeds 2.5MB. Please choose a smaller image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateCaseStudy({ ...study, imageUrl: reader.result });
        triggerToast(`Updated image for ${study.title}`);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Section Images & Media Manager</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Easily replace or upload custom images across service showcases, case studies, and dynamic page sections.
          </p>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('services')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'services'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Services ({expertiseData.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('cases')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'cases'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Case Studies ({config.caseStudies?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('sections')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'sections'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Custom Sections ({config.customSections?.length || 0})
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* SUB-TAB 1: SERVICES SHOWCASE IMAGES */}
      {activeSubTab === 'services' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-300">Live Services Media:</span> These images appear in the main 3D Carousel, on dedicated service pages (e.g. <code>#/services/web-design</code>), and in the All Services directory. You can paste an image URL, upload a file directly from your computer, or pick a curated preset photo.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {expertiseData.map((service) => {
              const currentImg = config.sectionImages?.[service.id] || service.image;
              const isCustom = Boolean(config.sectionImages?.[service.id]);
              const presets = servicePresets[service.id] || [];

              return (
                <div
                  key={service.id}
                  className="rounded-2xl bg-[#0b1222] border border-slate-800 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
                >
                  <div>
                    {/* Header: Title & Custom badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                          {service.category.split('&')[0]}
                        </span>
                        <h3 className="text-base font-bold text-white leading-snug">
                          {service.title}
                        </h3>
                      </div>
                      {isCustom ? (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                          Custom Image
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                          Default Asset
                        </span>
                      )}
                    </div>

                    {/* Image Thumbnail Preview */}
                    <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800 aspect-video bg-[#070b14] group">
                      <img 
                        src={currentImg} 
                        alt={service.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/80 backdrop-blur-xs text-[10px] font-mono text-cyan-300 border border-slate-700/60">
                        {service.metricBadge}
                      </div>
                    </div>

                    {/* Image URL Input */}
                    <div className="space-y-1.5 mb-3">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={config.sectionImages?.[service.id] || ''}
                        onChange={(e) => updateSectionImage(service.id, e.target.value)}
                        placeholder={service.image}
                        className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {/* Curated Presets */}
                    {presets.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[10px] font-mono text-slate-400 mb-1.5">
                          Quick Presets (Click to apply):
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {presets.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => {
                                updateSectionImage(service.id, preset.url);
                                triggerToast(`Applied "${preset.label}" to ${service.title}`);
                              }}
                              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 hover:text-cyan-300 cursor-pointer transition-colors"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions: File Upload & Reset */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(service.id, file);
                        }}
                        className="hidden"
                      />
                    </label>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => {
                          resetSectionImage(service.id);
                          triggerToast(`Reset ${service.title} to default asset`);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-800 text-xs transition-colors cursor-pointer"
                        title="Restore factory default image"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CASE STUDIES IMAGES */}
      {activeSubTab === 'cases' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-300">Case Studies Media:</span> By default, case studies display our interactive SVG telemetry mockups. Setting an image URL or uploading a screenshot will render a crisp photo showcase with verified performance overlay badges.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {config.caseStudies.map((study) => {
              const currentImg = study.imageUrl || config.sectionImages?.[`case-${study.id}`];

              return (
                <div
                  key={study.id}
                  className="rounded-2xl bg-[#0b1222] border border-slate-800 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                        {study.category}
                      </span>
                      {currentImg && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                          Custom Image
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{study.title}</h3>

                    {/* Preview window */}
                    <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800 aspect-video bg-[#070b14] flex items-center justify-center">
                      {currentImg ? (
                        <img src={currentImg} alt={study.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <Briefcase className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                          <span className="text-xs text-slate-400">Default Interactive UI Graphic Active</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Custom Screenshot / Image URL
                      </label>
                      <input
                        type="url"
                        value={study.imageUrl || ''}
                        onChange={(e) => {
                          updateCaseStudy({ ...study, imageUrl: e.target.value });
                          triggerToast(`Updated image for ${study.title}`);
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Upload Screenshot</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleCaseImageUpload(study, file);
                        }}
                        className="hidden"
                      />
                    </label>

                    {currentImg && (
                      <button
                        type="button"
                        onClick={() => {
                          updateCaseStudy({ ...study, imageUrl: undefined });
                          resetSectionImage(`case-${study.id}`);
                          triggerToast(`Restored default graphic for ${study.title}`);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-800 text-xs transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Use Default Graphic</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CUSTOM SECTIONS IMAGES */}
      {activeSubTab === 'sections' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-300">Custom Sections Media:</span> Manage hero and showcase graphics for your dynamically added sections (e.g. Split layouts, Cards, Banners).
            </div>
          </div>

          {config.customSections.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center">
              <Layers className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">
                No custom sections created yet. Head over to the "Page Sections" tab to add one!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {config.customSections.map((sec) => (
                <div
                  key={sec.id}
                  className="rounded-2xl bg-[#0b1222] border border-slate-800 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        Layout: {sec.layout}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {sec.position}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">
                      {sec.title} <span className="text-cyan-400">{sec.titleHighlight}</span>
                    </h3>

                    <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800 aspect-video bg-[#070b14] flex items-center justify-center">
                      {sec.imageUrl ? (
                        <img src={sec.imageUrl} alt={sec.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4 text-slate-500 text-xs">
                          No image set for this section
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={sec.imageUrl || ''}
                        onChange={(e) => {
                          updateCustomSection({ ...sec, imageUrl: e.target.value });
                          triggerToast(`Updated image for section "${sec.title}"`);
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#060a13] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              updateCustomSection({ ...sec, imageUrl: reader.result });
                              triggerToast(`Uploaded image for ${sec.title}`);
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="hidden"
                      />
                    </label>

                    {sec.imageUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          updateCustomSection({ ...sec, imageUrl: '' });
                          triggerToast(`Removed image from ${sec.title}`);
                        }}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
