import React, { useState } from 'react';
import { Package, Plus, Trash2, Check, X, Star } from 'lucide-react';
import { PackageItem, PackageFeature } from '../../types';

interface PackagesTabProps {
  packages: PackageItem[];
  onUpdatePackage: (pkg: PackageItem) => void;
  onAddPackage: (pkg: PackageItem) => void;
  onDeletePackage: (id: string) => void;
}

export default function PackagesTab({
  packages,
  onUpdatePackage,
  onAddPackage,
  onDeletePackage,
}: PackagesTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPkg, setNewPkg] = useState({
    name: '',
    badge: 'NEW TIER',
    tagline: '',
    popular: false,
    priceNote: 'Custom monthly retainer',
    highlight: '',
    featuresText: 'Dedicated Account Manager\nCustom Analytics Dashboard\nConversion Rate Optimization\nBi-Weekly Growth Syncs',
  });

  const [featureInputs, setFeatureInputs] = useState<{ [pkgId: string]: string }>({});

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkg.name.trim()) return;

    const features: PackageFeature[] = newPkg.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean)
      .map((name) => ({ name, included: true }));

    const created: PackageItem = {
      id: `pkg-${Date.now()}`,
      name: newPkg.name.trim(),
      badge: newPkg.badge.trim() || 'GROWTH TIER',
      tagline: newPkg.tagline.trim() || 'Customized digital marketing scope',
      popular: newPkg.popular,
      priceNote: newPkg.priceNote.trim() || 'Custom retainer',
      highlight: newPkg.highlight.trim() || newPkg.name.trim(),
      features: features.length > 0 ? features : [{ name: 'Full Digital Strategy', included: true }],
    };

    onAddPackage(created);
    setNewPkg({
      name: '',
      badge: 'NEW TIER',
      tagline: '',
      popular: false,
      priceNote: 'Custom monthly retainer',
      highlight: '',
      featuresText: 'Dedicated Account Manager\nCustom Analytics Dashboard\nConversion Rate Optimization\nBi-Weekly Growth Syncs',
    });
    setShowAddModal(false);
  };

  const handleUpdateField = (pkg: PackageItem, patch: Partial<PackageItem>) => {
    onUpdatePackage({ ...pkg, ...patch });
  };

  const handleAddFeatureToExisting = (pkg: PackageItem) => {
    const text = (featureInputs[pkg.id] || '').trim();
    if (!text) return;

    const updatedFeatures = [...pkg.features, { name: text, included: true }];
    onUpdatePackage({ ...pkg, features: updatedFeatures });
    setFeatureInputs({ ...featureInputs, [pkg.id]: '' });
  };

  const handleToggleFeatureIncluded = (pkg: PackageItem, featIdx: number) => {
    const updatedFeatures = pkg.features.map((feat, idx) => {
      if (idx === featIdx) {
        return { ...feat, included: !feat.included };
      }
      return feat;
    });

    onUpdatePackage({ ...pkg, features: updatedFeatures });
  };

  const handleDeleteFeature = (pkg: PackageItem, featIdx: number) => {
    const updatedFeatures = pkg.features.filter((_, idx) => idx !== featIdx);
    onUpdatePackage({ ...pkg, features: updatedFeatures });
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <span>Service Packages & Retainer Tiers</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage pricing tiers, feature matrices, badges, and highlighted inclusions. Changes reflect immediately on the live website.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer min-h-[38px] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Package Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg, pIdx) => (
          <div
            key={pkg.id || pIdx}
            className={`rounded-2xl border transition-all flex flex-col justify-between ${
              pkg.popular
                ? 'bg-[#0c1424] border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                : 'bg-[#0a1120] border-slate-800'
            }`}
          >
            <div className="p-5 space-y-4">
              {/* Top Bar with Popular toggle and delete */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleUpdateField(pkg, { popular: !pkg.popular })}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                    pkg.popular
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Toggle Popular/Featured Badge"
                >
                  <Star className={`w-3 h-3 ${pkg.popular ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                  <span>{pkg.popular ? 'Featured Plan' : 'Standard'}</span>
                </button>

                {packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete package "${pkg.name}"?`)) {
                        onDeletePackage(pkg.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Delete Package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Package Identification Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={pkg.badge || ''}
                      onChange={(e) => handleUpdateField(pkg, { badge: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Tier Name</label>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => handleUpdateField(pkg, { name: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">Tagline / Objective</label>
                  <input
                    type="text"
                    value={pkg.tagline}
                    onChange={(e) => handleUpdateField(pkg, { tagline: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Price Note</label>
                    <input
                      type="text"
                      value={pkg.priceNote}
                      onChange={(e) => handleUpdateField(pkg, { priceNote: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Banner Highlight</label>
                    <input
                      type="text"
                      value={pkg.highlight}
                      onChange={(e) => handleUpdateField(pkg, { highlight: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Features Matrix Management */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-300">Deliverables ({pkg.features.length})</span>
                  <span className="text-[10px] text-slate-400">Click icon to toggle inclusion</span>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {pkg.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className={`flex items-center justify-between gap-2 p-1.5 rounded-lg text-xs border ${
                        feat.included
                          ? 'bg-slate-900/80 border-slate-800 text-slate-200'
                          : 'bg-slate-950/40 border-slate-900 text-slate-500 line-through'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleFeatureIncluded(pkg, fIdx)}
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 cursor-pointer ${
                          feat.included
                            ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                            : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                        }`}
                        title={feat.included ? 'Mark Excluded' : 'Mark Included'}
                      >
                        {feat.included ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>

                      <span className="flex-1 truncate text-[11px]">{feat.name}</span>

                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(pkg, fIdx)}
                        className="text-slate-600 hover:text-rose-400 p-0.5 transition-colors cursor-pointer"
                        title="Remove deliverable"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new deliverable input */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={featureInputs[pkg.id] || ''}
                    onChange={(e) => setFeatureInputs({ ...featureInputs, [pkg.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeatureToExisting(pkg);
                      }
                    }}
                    placeholder="Add deliverable..."
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddFeatureToExisting(pkg)}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#090e1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Create New Service Package</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePackage} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enterprise Dominance"
                    value={newPkg.name}
                    onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. OMNICHANNEL SCALE"
                    value={newPkg.badge}
                    onChange={(e) => setNewPkg({ ...newPkg, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono uppercase focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline / Objective</label>
                <input
                  type="text"
                  placeholder="e.g. Full-scale marketing operations and multi-channel acquisition"
                  value={newPkg.tagline}
                  onChange={(e) => setNewPkg({ ...newPkg, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Custom quote / monthly retainer"
                    value={newPkg.priceNote}
                    onChange={(e) => setNewPkg({ ...newPkg, priceNote: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Card Highlight Banner</label>
                  <input
                    type="text"
                    placeholder="e.g. Dedicated Growth Team"
                    value={newPkg.highlight}
                    onChange={(e) => setNewPkg({ ...newPkg, highlight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popular-checkbox"
                  checked={newPkg.popular}
                  onChange={(e) => setNewPkg({ ...newPkg, popular: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="popular-checkbox" className="text-xs text-slate-300 select-none cursor-pointer">
                  Mark as Most Popular / Featured Card
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={newPkg.featuresText}
                  onChange={(e) => setNewPkg({ ...newPkg, featuresText: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">Each line will be rendered as an included deliverable with a green checkmark.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
