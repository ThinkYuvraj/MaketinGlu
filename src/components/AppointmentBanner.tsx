import React from 'react';
import { Calendar, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Container from './common/Container';

interface AppointmentBannerProps {
  onOpenConsultation: () => void;
}

export default function AppointmentBanner({ onOpenConsultation }: AppointmentBannerProps) {
  return (
    <section className="relative py-3 sm:py-4 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[420px] h-20 bg-cyan-500/10 blur-[60px] rounded-full" />
      </div>

      <Container size="narrow">
        <div className="relative overflow-hidden rounded-xl border border-cyan-500/25 bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-3.5 shadow-lg shadow-cyan-950/20">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5">
            {/* Left Content Column */}
            <div className="text-center sm:text-left min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                  Free 30-Min Strategy Call
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                Schedule Architecture &amp; Growth Consultation
              </h3>
              <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400 leading-normal">
                Actionable engineering roadmap &amp; SEO audit insights with our senior team.
              </p>
            </div>

            {/* Right Action Column */}
            <div className="flex flex-col items-center sm:items-end shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Free Slot</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              
              <div className="flex items-center gap-2.5 mt-1 text-[10px] text-slate-400">
                <span className="inline-flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                  100% Free
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                  No Obligation
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
