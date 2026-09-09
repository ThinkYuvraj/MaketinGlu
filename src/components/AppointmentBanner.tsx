import { ArrowRight } from 'lucide-react';

interface AppointmentBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onOpenConsultation: () => void;
  id?: string;
}

export default function AppointmentBanner({
  title = "Book Your Free Appointment Today",
  description = "Transform your digital blueprint with a customized growth framework built specifically for your audience.",
  buttonText = "Reserve Free Slot",
  onOpenConsultation,
  id = "appointment-banner"
}: AppointmentBannerProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-18" id={id}>
      <div className="relative rounded-2xl bg-gradient-to-r from-[#091222] via-[#0d182e] to-[#0a1426] border border-cyan-500/25 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl glow-cyan-sm">
        
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-60 h-60 bg-sky-600/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <button
              onClick={onOpenConsultation}
              className="w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-extrabold text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
