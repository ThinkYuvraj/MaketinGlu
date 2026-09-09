import React from 'react';
import { 
  TrendingUp, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Target, 
  Coins, 
  MessageCircle, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';
import seoImg from '../assets/seo-optimization.png';

interface SEOSectionProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export default function SEOSection({ onOpenConsultation }: SEOSectionProps) {
  const benefits = [
    {
      title: "Increased Visibility and Traffic",
      desc: "Rank higher in search engine results pages (SERPs) across Google, Bing & Yahoo, driving compounding streams of high-intent organic traffic.",
      icon: TrendingUp,
      tag: "Organic Growth"
    },
    {
      title: "Better User Experience",
      desc: "Optimizing content hierarchy, site architecture, and speed creates a friction-free experience that users and search engines love.",
      icon: LayoutDashboard,
      tag: "Optimized UX"
    },
    {
      title: "Cost-Effective Marketing",
      desc: "Delivers enduring, sustainable ROI. Once your pages achieve high rankings, they generate consistent qualified leads without ongoing per-click ad costs.",
      icon: Coins,
      tag: "Long-Term Value"
    },
    {
      title: "Improved Brand Credibility",
      desc: "Dominating page-one search results establishes unquestioned authority and prestige, elevating customer confidence and brand loyalty.",
      icon: Award,
      tag: "Market Trust"
    },
    {
      title: "Competitive Advantage",
      desc: "Outmaneuver industry competitors by capturing ready-to-convert search queries and claiming dominant market share in your niche.",
      icon: Target,
      tag: "Dominate SERPs"
    }
  ];

  return (
    <section id="seo" className="relative py-20 lg:py-28 bg-[#070b14] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] bg-sky-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 shadow-sm shadow-cyan-500/10">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search Engine Optimization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            SEO & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Organic Growth</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Optimize your digital presence to rank higher, dominate organic search results, and convert visitors into loyal clients.
          </p>
        </div>

        {/* Feature Overview: Narrative + Hero Mockup Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-20">
          
          {/* Left Column: Narrative & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0a1120] border border-cyan-500/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Search Engine Results Optimization</span>
              </div>
              
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                SEO (Search Engine Optimization) is the practice of optimizing a website to rank higher in search engine results pages (SERPs) for relevant keywords and phrases. The primary goal of SEO is to improve the visibility and ranking of a website on search engines like Google, Bing, and Yahoo, so that more people can find and visit the site.
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                It involves a wide range of techniques, including{' '}
                <a 
                  href="http://www.marketinglu.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 font-semibold underline underline-offset-4 decoration-cyan-400/50 hover:text-cyan-300 hover:decoration-cyan-300 transition-colors"
                >
                  optimizing website
                </a>{' '}
                content, meta tags, site structure, and backlinks. These techniques are aimed at making a website more user-friendly and informative for both search engines and users.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                Overall, SEO is an essential marketing strategy that helps businesses increase their visibility, traffic, and revenue, as well as gain a lasting competitive advantage in their industry.
              </p>
            </div>

            {/* CTAs: WhatsApp Now & Request Consultation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="https://wa.me/+919654596149"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95"
                id="cta-seo-whatsapp"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Now (+91 96545 96149)</span>
              </a>

              <button
                onClick={() => onOpenConsultation('SEO Audit & Rank Optimization')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                id="cta-seo-quote"
              >
                <span>Request Free SEO Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pl-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Comprehensive on-page, off-page, technical SEO and Google SERP rank tracking included.</span>
            </div>
          </div>

          {/* Right Column: High-Impact SEO Graphic Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group w-full max-w-lg">
              {/* Outer decorative ambient backlight glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-blue-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl bg-[#0a1120] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 sm:p-4">
                <img 
                  src={seoImg} 
                  alt="SEO Search Engine Optimization Showcase" 
                  className="w-full h-auto rounded-xl object-cover transform transition duration-500 group-hover:scale-[1.01]" 
                />
                
                {/* Floating Metric Badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#070b14]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Search Visibility</div>
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-300">Top SERP Rankings & Organic Authority</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 5 Core Benefits of SEO */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Key Benefits of Professional SEO
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
              Why investing in strategic search engine optimization delivers unmatched return on investment:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, idx) => {
              const IconComponent = b.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#090f1e] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400/90 px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/20">
                        {b.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {b.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center text-[11px] font-semibold text-cyan-400/80 group-hover:text-cyan-300">
                    <span>Proven SEO Framework</span>
                  </div>
                </div>
              );
            })}

            {/* 6th Card: Direct Consultation & Contact Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[#0a1426] to-[#0a1120] border border-cyan-500/40 flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  Boost Your Search Rankings
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Want to see where your website stands on Google? Get a personalized architectural SEO roadmap today.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-cyan-500/20">
                <a
                  href="http://www.marketinglu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-bold text-cyan-300 hover:text-white transition-colors"
                >
                  <span>Visit MarketingLU Web Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://wa.me/+919654596149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Chat on WhatsApp (+91 96545 96149)</span>
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
