import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, Star } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimonialsTabProps {
  testimonials: TestimonialItem[];
  onAddTestimonial: (t: TestimonialItem) => void;
  onUpdateTestimonial: (t: TestimonialItem) => void;
  onDeleteTestimonial: (id: string) => void;
}

export default function TestimonialsTab({
  testimonials,
  onAddTestimonial,
  onUpdateTestimonial,
  onDeleteTestimonial,
}: TestimonialsTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Managing Director, Brand Co.',
    quote: '',
    rating: 5,
    highlight: 'Revenue Growth',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.quote.trim()) return;

    const initials = newReview.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'MG';

    const created: TestimonialItem = {
      id: `review-${Date.now()}`,
      name: newReview.name.trim(),
      role: newReview.role.trim() || 'Verified Client',
      quote: newReview.quote.trim(),
      rating: newReview.rating,
      highlight: newReview.highlight.trim() || 'Verified ROI',
      source: 'Google Review',
      initial: initials,
      avatarColor: 'from-cyan-500 to-blue-600',
    };

    onAddTestimonial(created);
    setNewReview({
      name: '',
      role: 'Managing Director, Brand Co.',
      quote: '',
      rating: 5,
      highlight: 'Revenue Growth',
    });
    setShowAddModal(false);
  };

  const handleUpdateField = (item: TestimonialItem, patch: Partial<TestimonialItem>) => {
    onUpdateTestimonial({ ...item, ...patch });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span>Client Reviews & Social Proof</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage verified client testimonials, ratings, leadership roles, and company affiliations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer min-h-[38px] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-2xl bg-[#0a1120] border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 cursor-pointer ${
                        s < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                      onClick={() => handleUpdateField(item, { rating: s + 1 })}
                    />
                  ))}
                </div>

                {testimonials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete testimonial from ${item.name}?`)) {
                        onDeleteTestimonial(item.id);
                      }
                    }}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Client Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateField(item, { name: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Role & Company</label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => handleUpdateField(item, { role: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Highlight Tag</label>
                <input
                  type="text"
                  value={item.highlight || ''}
                  onChange={(e) => handleUpdateField(item, { highlight: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Quote Body</label>
                <textarea
                  rows={3}
                  value={item.quote}
                  onChange={(e) => handleUpdateField(item, { quote: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
              <span>{item.source}</span>
              <span className="text-cyan-400 font-mono">ID: {item.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#090e1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Add Client Testimonial</h3>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Khurana"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Founder & CEO, Nexa Store"
                  value={newReview.role}
                  onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 font-semibold ml-2">
                    {newReview.rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Outcome Highlight</label>
                <input
                  type="text"
                  placeholder="e.g. +300% Organic Traffic Growth"
                  value={newReview.highlight}
                  onChange={(e) => setNewReview({ ...newReview, highlight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Review Quote Body *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe how MarketingGlu helped your business scale..."
                  value={newReview.quote}
                  onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs leading-relaxed focus:border-cyan-400 focus:outline-none resize-none"
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
                  Add Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
