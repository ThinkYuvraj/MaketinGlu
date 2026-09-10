import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface MobileBottomBarProps {
  onOpenConsultation: () => void;
}

export default function MobileBottomBar({ onOpenConsultation }: MobileBottomBarProps) {
  const { config } = useSiteConfig();
  const rawPhone = config.phone.replace(/[^0-9+]/g, '');
  const whatsappNumber = rawPhone.replace('+', '');

  return (
    <aside 
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0a0f1d]/95 border-t border-slate-800/90 backdrop-blur-lg px-3 py-2 shadow-2xl"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Quick Call */}
        <a
          href={`tel:${rawPhone}`}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 active:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
          title="Direct Call"
        >
          <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Call</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hi%20Marketing%20LU,%20I'd%20like%20to%20discuss%20a%20digital%20marketing%20project`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 active:bg-emerald-900/60 text-xs font-bold transition-colors cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Free Audit / Consultation Modal */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex-[1.5] min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 text-xs font-black active:brightness-95 shadow-md shadow-cyan-500/20 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Book Free Audit</span>
        </button>
      </div>
    </aside>
  );
}
