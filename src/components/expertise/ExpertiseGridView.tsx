import { motion } from 'motion/react';
import { ArrowRight, Bot, CheckCircle2 } from 'lucide-react';
import { expertiseData } from '../../data/expertiseData';
import { buttonHoverMotion, cardHoverMotion, staggerContainerVariants, staggerItemVariants } from '../../lib/animations';

interface ExpertiseGridViewProps {
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onOpenConsultation: (serviceName?: string) => void;
}

export default function ExpertiseGridView({
  activeTabId,
  onSelectTab,
  onOpenConsultation,
}: ExpertiseGridViewProps) {
  return (
    <div className="space-y-8">
      <motion.div 
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10"
      >
        {expertiseData.map((item) => {
          const Icon = item.icon;
          const isSelected = item.id === activeTabId;
          return (
            <motion.div
              key={item.id}
              variants={staggerItemVariants}
              {...cardHoverMotion}
              className={`rounded-2xl p-5 sm:p-7 xl:p-8 transition-colors duration-300 flex flex-col justify-between border ${
                isSelected
                  ? "bg-[#0c1426] border-cyan-400 shadow-xl shadow-cyan-500/10"
                  : "bg-[#0a1120] border-slate-800/90 hover:border-cyan-500/40"
              }`}
              id={`expertise-card-${item.id}`}
            >
              <div>
                {/* Card Header: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                    {item.tabLabel}
                  </span>
                </div>

                {/* Title & One-Liner */}
                <h3 className="text-lg xl:text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                  {item.summary}
                </p>

                {/* Pillars preview tags */}
                <div className="space-y-2 mb-6">
                  {item.pillars.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{p.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action: View Deep Dive + Quick Quote */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectTab(item.id)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer min-h-[36px]"
                >
                  <span>Explore Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <motion.button
                  {...buttonHoverMotion}
                  onClick={() => onOpenConsultation(item.title)}
                  className="px-3.5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-bold transition-colors cursor-pointer min-h-[36px]"
                >
                  Get Quote
                </motion.button>
              </div>

            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Specialized Automation Capabilities Banner */}
      <div className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-[#091224] via-[#0d1a33] to-[#0a1426] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Need AI Chatbots or Advanced Lead Automation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              We also engineer custom 24/7 lead qualification chatbots, CRM automations, and omni-channel messaging bots.
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenConsultation("AI Chatbot & Automation Solutions")}
          className="w-full md:w-auto shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
        >
          Inquire About Automations
        </button>
      </div>
    </div>
  );
}
