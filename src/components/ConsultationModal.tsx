import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Calendar, Clock, Sparkles } from 'lucide-react';
import { standardEase, buttonHoverMotion } from '../lib/animations';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  title = "Book Your Free Consultation",
  subtitle = "Schedule a high-intensity 30-minute tactical review with our senior architects in New Delhi."
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Web Design & Development',
    preferredDate: '',
    preferredTime: '11:00 AM IST',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: standardEase }}
            className="relative w-full max-w-xl bg-[#0b1324] border border-cyan-500/30 rounded-2xl p-5 sm:p-8 shadow-2xl text-slate-100 glow-cyan max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Consultation Reserved!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Thank you, <strong className="text-white">{formData.name || 'there'}</strong>! Our senior growth architect will reach out via <span className="text-cyan-400">{formData.email || 'email'}</span> and WhatsApp at <span className="text-cyan-400">{formData.phone || '+91 96545 96149'}</span> to confirm your session.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-sm hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Priority Allocation</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{title}</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sanjay Mehra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone Number (with WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Primary Growth Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c17] border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option>Website Designing & Development</option>
                    <option>E-Commerce Website Solutions</option>
                    <option>Graphic Designing</option>
                    <option>Search Engine Optimization (SEO)</option>
                    <option>Social Media Optimization (SMO)</option>
                    <option>Pay-Per-Click Advertising (PPC)</option>
                    <option>Social Media Marketing (SMM)</option>
                    <option>Package: Basic Package</option>
                    <option>Package: Advance Package</option>
                    <option>Package: Pro Package</option>
                    <option>Chatbot & AI Lead Automation</option>
                    <option>Full Digital Marketing Audit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#070c17] border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#070c17] border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>10:00 AM - 11:00 AM IST</option>
                    <option>11:30 AM - 12:30 PM IST</option>
                    <option>02:00 PM - 03:00 PM IST</option>
                    <option>04:00 PM - 05:00 PM IST</option>
                    <option>06:00 PM - 07:00 PM IST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Company Website or Brief Goals (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need to boost our organic conversion and redesign our online checkout..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 text-slate-950 font-extrabold text-sm sm:text-base hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Reserving Your Slot...' : 'Confirm Appointment Reservation →'}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  🔒 Zero spam guarantee. 100% complimentary architectural consultation.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
