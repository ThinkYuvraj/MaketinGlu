import React, { useState } from 'react';
import { Sparkles, Plus, Trash2 } from 'lucide-react';
import { CaseStudy, CaseStudyStat } from '../../types';

interface CaseStudiesTabProps {
  caseStudies: CaseStudy[];
  onAddCaseStudy: (study: CaseStudy) => void;
  onUpdateCaseStudy: (study: CaseStudy) => void;
  onDeleteCaseStudy: (id: string) => void;
}

export default function CaseStudiesTab({
  caseStudies,
  onAddCaseStudy,
  onUpdateCaseStudy,
  onDeleteCaseStudy,
}: CaseStudiesTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudy, setNewStudy] = useState({
    title: '',
    category: 'ECOMMERCE GROWTH',
    description: '',
    stat1Val: '+85%',
    stat1Label: 'Conversion Rate',
    stat2Val: '₹3.4M',
    stat2Label: 'Monthly Revenue',
    stat3Val: '-28%',
    stat3Label: 'Ad Spend CPA',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudy.title.trim()) return;

    const stats: CaseStudyStat[] = [
      { value: newStudy.stat1Val.trim(), label: newStudy.stat1Label.trim() },
      { value: newStudy.stat2Val.trim(), label: newStudy.stat2Label.trim() },
      { value: newStudy.stat3Val.trim(), label: newStudy.stat3Label.trim() },
    ].filter((s) => s.value && s.label);

    const study: CaseStudy = {
      id: `case-${Date.now()}`,
      title: newStudy.title.trim(),
      category: newStudy.category.trim() || 'PERFORMANCE CASE STUDY',
      description: newStudy.description.trim() || 'Comprehensive digital marketing transformation resulting in verified revenue scale.',
      stats: stats.length > 0 ? stats : [{ value: '+50%', label: 'Growth' }],
      accent: 'from-cyan-500 to-blue-600',
      type: 'custom',
    };

    onAddCaseStudy(study);
    setNewStudy({
      title: '',
      category: 'ECOMMERCE GROWTH',
      description: '',
      stat1Val: '+85%',
      stat1Label: 'Conversion Rate',
      stat2Val: '₹3.4M',
      stat2Label: 'Monthly Revenue',
      stat3Val: '-28%',
      stat3Label: 'Ad Spend CPA',
    });
    setShowAddModal(false);
  };

  const handleUpdateField = (study: CaseStudy, patch: Partial<CaseStudy>) => {
    onUpdateCaseStudy({ ...study, ...patch });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Case Studies & Client Impact Stories</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Showcase proven client outcomes, key performance metrics, conversion gains, and gross volume metrics.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer min-h-[38px] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study, idx) => (
          <div
            key={study.id || idx}
            className="p-5 rounded-2xl bg-[#0a1120] border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full uppercase">
                  {study.category}
                </span>

                {caseStudies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete case study "${study.title}"?`)) {
                        onDeleteCaseStudy(study.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Delete Case Study"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={study.title}
                  onChange={(e) => handleUpdateField(study, { title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Category Tag</label>
                <input
                  type="text"
                  value={study.category}
                  onChange={(e) => handleUpdateField(study, { category: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono uppercase focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={study.description}
                  onChange={(e) => handleUpdateField(study, { description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              {/* Stats Preview & Edit */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1.5">
                  Performance Metrics (Value & Label)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {study.stats.map((st, sIdx) => (
                    <div key={sIdx} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const newStats = [...study.stats];
                          newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                          handleUpdateField(study, { stats: newStats });
                        }}
                        className="w-full bg-transparent text-cyan-300 text-xs font-bold border-b border-slate-700 focus:border-cyan-400 focus:outline-none pb-0.5"
                        placeholder="+50%"
                      />
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const newStats = [...study.stats];
                          newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                          handleUpdateField(study, { stats: newStats });
                        }}
                        className="w-full bg-transparent text-slate-400 text-[9px] border-b border-transparent focus:border-slate-600 focus:outline-none"
                        placeholder="Label"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>ID: {study.id}</span>
              <span className="text-cyan-400 font-mono">Live in Carousel</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Case Study Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#090e1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Add New Case Study</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Study Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UrbanSpree Direct-to-Consumer Growth"
                  value={newStudy.title}
                  onChange={(e) => setNewStudy({ ...newStudy, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category Tag</label>
                <input
                  type="text"
                  placeholder="e.g. D2C ECOMMERCE & META PPC"
                  value={newStudy.category}
                  onChange={(e) => setNewStudy({ ...newStudy, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono uppercase focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  placeholder="Explain the strategy deployed, audience targeted, and tangible commercial outcome..."
                  value={newStudy.description}
                  onChange={(e) => setNewStudy({ ...newStudy, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Key Metrics (3 Verified Stats)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="+85%"
                      value={newStudy.stat1Val}
                      onChange={(e) => setNewStudy({ ...newStudy, stat1Val: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Conversion"
                      value={newStudy.stat1Label}
                      onChange={(e) => setNewStudy({ ...newStudy, stat1Label: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 text-[10px] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="₹3.4M"
                      value={newStudy.stat2Val}
                      onChange={(e) => setNewStudy({ ...newStudy, stat2Val: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Gross Revenue"
                      value={newStudy.stat2Label}
                      onChange={(e) => setNewStudy({ ...newStudy, stat2Label: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 text-[10px] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="-28%"
                      value={newStudy.stat3Val}
                      onChange={(e) => setNewStudy({ ...newStudy, stat3Val: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 text-xs font-bold focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Bounce / CPA"
                      value={newStudy.stat3Label}
                      onChange={(e) => setNewStudy({ ...newStudy, stat3Label: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 text-[10px] focus:outline-none"
                    />
                  </div>
                </div>
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
                  Add Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
