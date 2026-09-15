import React, { useState, useMemo } from 'react';
import { HelpCircle, Plus, Trash2, Search } from 'lucide-react';
import { FAQItem } from '../../data/faqData';

interface FaqTabProps {
  faqs: FAQItem[];
  onAddFaq: (faq: FAQItem) => void;
  onUpdateFaq: (faq: FAQItem) => void;
  onDeleteFaq: (id: number | string) => void;
}

const FAQ_CATEGORIES: { id: 'roi' | 'seo' | 'web' | 'pricing' | 'process'; label: string }[] = [
  { id: 'roi', label: 'Results & ROI' },
  { id: 'seo', label: 'SEO & Search' },
  { id: 'web', label: 'Web & Ownership' },
  { id: 'pricing', label: 'Ad Spend & Pricing' },
  { id: 'process', label: 'Contracts & Onboarding' },
];

export default function FaqTab({ faqs, onAddFaq, onUpdateFaq, onDeleteFaq }: FaqTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: '',
    category: 'roi' as 'roi' | 'seo' | 'web' | 'pricing' | 'process',
    highlightsText: 'Fast ROI, 48h Runway, Transparent Reporting',
  });

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, categoryFilter, searchQuery]);

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;

    const matchedCat = FAQ_CATEGORIES.find((c) => c.id === newFaq.category);
    const categoryLabel = matchedCat ? matchedCat.label : 'General';

    const highlights = newFaq.highlightsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const created: FAQItem = {
      id: Date.now(),
      question: newFaq.question.trim(),
      answer: newFaq.answer.trim(),
      category: newFaq.category,
      categoryLabel,
      highlights: highlights.length > 0 ? highlights : ['Verified Agency Process'],
    };

    onAddFaq(created);
    setNewFaq({
      question: '',
      answer: '',
      category: 'roi',
      highlightsText: 'Fast ROI, 48h Runway, Transparent Reporting',
    });
    setShowAddModal(false);
  };

  const handleUpdateField = (faq: FAQItem, patch: Partial<FAQItem>) => {
    onUpdateFaq({ ...faq, ...patch });
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Frequently Asked Questions (FAQ)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage buyer objections, deliverable timelines, ad spend disclosures, and technical guarantees.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer min-h-[38px] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-[#0a1120] border border-slate-800/90 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar w-full md:w-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All ({faqs.length})
          </button>
          {FAQ_CATEGORIES.map((cat) => {
            const count = faqs.filter((f) => f.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* FAQ Cards List */}
      <div className="space-y-4">
        {filteredFaqs.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-3 transition-colors hover:border-slate-700"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const newCat = e.target.value as any;
                      const matched = FAQ_CATEGORIES.find((c) => c.id === newCat);
                      handleUpdateField(item, {
                        category: newCat,
                        categoryLabel: matched ? matched.label : 'General',
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono uppercase focus:outline-none"
                  >
                    {FAQ_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                        {c.label}
                      </option>
                    ))}
                  </select>

                  <span className="text-[10px] text-slate-500 font-mono">ID: {item.id}</span>
                </div>

                {/* Question Input */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Question</label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleUpdateField(item, { question: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Answer Textarea */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Answer</label>
                  <textarea
                    rows={3}
                    value={item.answer}
                    onChange={(e) => handleUpdateField(item, { answer: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                {/* Highlights Tags Input */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">
                    Highlights / Bullets (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={(item.highlights || []).join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean);
                      handleUpdateField(item, { highlights: tags });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col items-end gap-2 pt-1">
                {faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete this FAQ question?`)) {
                        onDeleteFaq(item.id);
                      }
                    }}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-[#0a1120] border border-slate-800 text-slate-400 text-xs">
            No questions matched your search or category filter.
          </div>
        )}
      </div>

      {/* Add New FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#090e1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Add Frequently Asked Question</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={newFaq.category}
                  onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                >
                  {FAQ_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Question Text *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Do you guarantee monthly lead volumes and conversion targets?"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Answer Body *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain the strategy, methodology, timelines, and guarantees..."
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bullet Highlights (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100% Attribution, 48h Setup, Dedicated Strategist"
                  value={newFaq.highlightsText}
                  onChange={(e) => setNewFaq({ ...newFaq, highlightsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs focus:border-cyan-400 focus:outline-none"
                />
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
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
