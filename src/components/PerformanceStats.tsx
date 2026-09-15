import { motion } from 'motion/react';
import { TrendingUp, CheckCircle2, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion } from '../lib/animations';
import Container from './common/Container';

export default function PerformanceStats() {
  const { config } = useSiteConfig();
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const stats = [
    {
      percentage: config.stats.webDesign,
      badge: "Core Vitals & Speed",
      label: "Customized Web & App Dev",
      category: "Full-Stack Development",
      description: "Ultra-fast headless architectures, responsive web apps, and sub-second page loads engineered for high conversion.",
      highlights: [
        "Sub-1.2s Core Web Vitals speed",
        "Clean, scalable TypeScript codebases",
        "Mobile-first adaptive layouts"
      ],
      metricLabel: "Benchmark Score",
      metricValue: "99.8% Uptime SLA",
      icon: Zap
    },
    {
      percentage: config.stats.ecommerce,
      badge: "Conversion Architecture",
      label: "E-Commerce Architecture",
      category: "High-Volume Storefronts",
      description: "Seamless checkout funnels, automated inventory synchronization, and frictionless payments that minimize drop-offs.",
      highlights: [
        "+38% average checkout completion",
        "Secure payment gateway integrations",
        "High-throughput product catalogs"
      ],
      metricLabel: "Revenue Impact",
      metricValue: "3.4x Avg ROAS Growth",
      icon: TrendingUp
    },
    {
      percentage: config.stats.design,
      badge: "Visual Authority",
      label: "Brand Identity & Design",
      category: "Design Systems & UI/UX",
      description: "Cohesive visual identity systems, vector brand kits, and high-contrast UI design tailored for lasting memorability.",
      highlights: [
        "Complete scalable design token sets",
        "Intuitive navigation and wireframes",
        "Omnichannel visual guidelines"
      ],
      metricLabel: "Satisfaction Rate",
      metricValue: "98% Client Approval",
      icon: Sparkles
    },
    {
      percentage: config.stats.smo,
      badge: "Organic Amplification",
      label: "SMO & Social Media Reach",
      category: "Omnichannel Engagement",
      description: "Strategic creative storytelling, algorithm-favored reel formats, and targeted engagement campaigns that scale audience.",
      highlights: [
        "4.2x organic reach acceleration",
        "Data-backed content calendar pacing",
        "High-retention video creative hooks"
      ],
      metricLabel: "Monthly Reach",
      metricValue: "2.5M+ Video Impressions",
      icon: ShieldCheck
    },
  ];

  return (
    <section id="growth" className="relative flex flex-col justify-center py-12 sm:py-16 lg:py-20 bg-[#070b14] border-t border-slate-900/90">
      <span id="performance" className="absolute -top-24" />
      <Container>
        
        {/* Consistent Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
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

        {/* 4 Vertical Rectangle Cards - Tall portrait cards packed with rich info */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {stats.map((item, idx) => {
            const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
            const gradientId = `cyan-gradient-${idx}`;
            const CardIcon = item.icon;

            return (
              <motion.div 
                key={idx}
                variants={staggerItemVariants}
                {...cardHoverMotion}
                className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0c1424] via-[#09101d] to-[#070b14] border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden"
                id={`stat-card-${idx}`}
              >
                {/* Top Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/25 text-[10px] font-bold text-cyan-400 tracking-wide uppercase">
                      <CardIcon className="w-3 h-3 text-cyan-400" />
                      <span>{item.badge}</span>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Circular Gauge Centerpiece */}
                  <div className="flex justify-center my-3">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
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
                          strokeWidth="7"
                          fill="transparent"
                        />
                        {/* Glowing active arc */}
                        <circle
                          cx="50"
                          cy="50"
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

                      {/* Percentage and sub-label in center */}
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
                          {item.percentage}%
                        </span>
                        <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mt-1">
                          Delivery
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white text-center tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.label}
                  </h3>

                  {/* Description Info */}
                  <p className="text-xs text-slate-400 text-center leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 py-3 border-t border-slate-800/80">
                    {item.highlights.map((point, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Impact KPI Badge */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs bg-slate-900/40 rounded-xl px-3 py-2 border border-slate-800/40">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {item.metricLabel}
                  </span>
                  <span className="text-xs font-extrabold text-cyan-300">
                    {item.metricValue}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
}
