import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion } from '../lib/animations';

export default function PerformanceStats() {
  const { config } = useSiteConfig();
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  const stats = [
    {
      percentage: config.stats.webDesign,
      label: "Customised Web Design & Development",
    },
    {
      percentage: config.stats.ecommerce,
      label: "E-Commerce Solution",
    },
    {
      percentage: config.stats.design,
      label: "Design",
    },
    {
      percentage: config.stats.smo,
      label: "SMO",
    },
  ];

  return (
    <section id="growth" className="relative py-16 sm:py-20 lg:py-24 bg-[#070b14] border-t border-slate-900">
      <span id="performance" className="absolute -top-24" />
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        
        {/* Section Header matching Figma */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
            EXPERTISE LEVELS
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 mb-3 tracking-tight">
            Our Performance In Numbers
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base xl:text-lg leading-relaxed">
            We push the boundaries of digital brand management with precision engineering and high-ROI campaigns.
          </p>
        </div>

        {/* 4 Circular Meter Cards - Staggered entrance and consistent hover motion */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 xl:gap-8 2xl:gap-10"
        >
          {stats.map((item, idx) => {
            const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
            const gradientId = `cyan-gradient-${idx}`;

            return (
              <motion.div 
                key={idx}
                variants={staggerItemVariants}
                {...cardHoverMotion}
                className="flex flex-col items-center text-center p-3 sm:p-5 lg:p-7 xl:p-8 rounded-2xl bg-[#0c1322] border border-slate-800/80 hover:border-cyan-500/40 transition-colors duration-300 group shadow-lg shadow-black/20 cursor-default"
                id={`stat-card-${idx}`}
              >
                {/* Responsive Circular Gauge */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center mb-2.5 sm:mb-4 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                    <defs>
                      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="60%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                    {/* Background track circle */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      stroke="#1e293b"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    {/* Glowing active arc */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      stroke={`url(#${gradientId})`}
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Percentage in center */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg sm:text-2xl md:text-3xl xl:text-4xl font-extrabold text-white tracking-tight">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-[11px] sm:text-xs md:text-sm xl:text-base font-semibold text-slate-200 leading-snug min-h-[32px] sm:min-h-[40px] flex items-center justify-center">
                  {item.label}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
