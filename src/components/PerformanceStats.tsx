import { useSiteConfig } from '../context/SiteConfigContext';

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
    <section id="growth" className="relative py-20 bg-[#070b14] border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Figma */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
            EXPERTISE LEVELS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
            Our Performance In Numbers
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We push the boundaries of digital brand management with precision engineering and high-ROI campaigns.
          </p>
        </div>

        {/* 4 Circular Meter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, idx) => {
            const strokeDashoffset = circumference - (item.percentage / 100) * circumference;

            return (
              <div 
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#0a1120] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-1"
                id={`stat-card-${idx}`}
              >
                {/* Circular Gauge */}
                <div className="relative w-32 h-32 flex items-center justify-center mb-5">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
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
                      stroke="url(#cyan-gradient)"
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="60%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Percentage in center */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug min-h-[36px] flex items-center justify-center">
                  {item.label}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
