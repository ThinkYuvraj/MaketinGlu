import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { standardEase } from '../lib/animations';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  initialService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  title = "Book Your Free Consultation",
  subtitle = "Schedule a 30-minute tactical review with our senior architects in New Delhi.",
  initialService = "Website Designing & Development"
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Website Designing & Development',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && initialService) {
      const cleaned = initialService.replace(/^Package:\s*/i, '').trim();
      if (cleaned) {
        setFormData(prev => ({ ...prev, service: cleaned }));
      }
    }
  }, [isOpen, initialService]);

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
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: standardEase }}
            className="relative w-full max-w-[460px] bg-[#0b1324] border border-cyan-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl text-slate-100 glow-cyan max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Consultation Reserved!</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name || 'there'}</strong>! Our senior growth architect will reach out via <span className="text-cyan-400">{formData.email || 'email'}</span> and WhatsApp at <span className="text-cyan-400">{formData.phone || '+91 96545 96149'}</span> to confirm your session.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-3 pr-6">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Priority Allocation</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {title}
                  </h2>
                  <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5 leading-normal">
                    {subtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1 text-[11px]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sanjay Mehra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-md sm:rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1 text-[11px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-md sm:rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1 text-[11px]">
                        Phone (with WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-md sm:rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1 text-[11px]">
                        Primary Growth Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-md sm:rounded-lg bg-[#070c17] border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs"
                      >
                        <option>Website Designing & Development</option>
                        <option>E-Commerce Website Solutions</option>
                        <option>Graphic Designing</option>
                        <option>Search Engine Optimization (SEO)</option>
                        <option>Social Media Optimization (SMO)</option>
                        <option>Pay-Per-Click Advertising (PPC)</option>
                        <option>Social Media Marketing (SMM)</option>
                        <option>Basic Package</option>
                        <option>Advance Package</option>
                        <option>Pro Package</option>
                        <option>Customized Solution</option>
                        <option>Chatbot & AI Lead Automation</option>
                        <option>Full Digital Marketing Audit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1 text-[11px]">
                      Company Website or Brief Goals (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need to boost conversion and redesign checkout..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-md sm:rounded-lg bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none text-xs"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[38px] py-2 px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? 'Reserving Your Slot...' : 'Confirm Appointment Reservation →'}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-1.5">
                      🔒 Zero spam guarantee. 100% complimentary tactical consultation.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
