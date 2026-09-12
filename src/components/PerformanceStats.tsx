import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion } from '../lib/animations';
import Container from './common/Container';

export default function PerformanceStats() {
  const { config } = useSiteConfig();
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const stats = [
    {
      percentage: config.stats.webDesign,
      label: "Customized Web & App Dev",
    },
    {
      percentage: config.stats.ecommerce,
      label: "E-Commerce Architecture",
    },
    {
      percentage: config.stats.design,
      label: "Brand Identity & Design",
    },
    {
      percentage: config.stats.smo,
      label: "SMO & Social Media Reach",
    },
  ];

  return (
    <section id="growth" className="relative py-10 sm:py-12 lg:py-14 bg-[#070b14] border-t border-slate-900/90">
      <span id="performance" className="absolute -top-24" />
      <Container>
        
        {/* Consistent Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>VERIFIED CAPABILITY METRICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Our Performance In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Numbers
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 max-w-xl mx-auto">
            Battle-tested delivery standards calibrated for sustainable growth, search dominance, and client retention.
          </p>
        </div>

        {/* 4 Circular Meter Cards - Compact, balanced height */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {stats.map((item, idx) => {
            const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
            const gradientId = `cyan-gradient-${idx}`;

            return (
              <motion.div 
                key={idx}
                variants={staggerItemVariants}
                {...cardHoverMotion}
                className="flex flex-col items-center text-center p-3.5 sm:p-4 md:p-5 rounded-2xl bg-[#0c1322] border border-slate-800/80 hover:border-cyan-500/40 transition-colors duration-300 group shadow-md shadow-black/20 cursor-default"
                id={`stat-card-${idx}`}
              >
                {/* Responsive Circular Gauge */}
                <div className="relative w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 flex items-center justify-center mb-2 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="60%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                    {/* Background track circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#1e293b"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    {/* Glowing active arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke={`url(#${gradientId})`}
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Percentage in center */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-base sm:text-xl md:text-2xl font-extrabold text-white tracking-tight">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-slate-200 leading-snug line-clamp-2">
                  {item.label}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
}
