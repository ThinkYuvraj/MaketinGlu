import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { fadeInUpVariants, buttonHoverMotion } from '../lib/animations';

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
    <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 my-12 sm:my-16 lg:my-20" id={id}>
      <motion.div 
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#091222] via-[#0d182e] to-[#0a1426] border border-cyan-500/25 p-6 sm:p-10 md:p-12 xl:p-16 overflow-hidden shadow-2xl glow-cyan-sm"
      >
        
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-60 h-60 bg-sky-600/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <motion.button
              {...buttonHoverMotion}
              onClick={onOpenConsultation}
              className="w-full md:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
