import React from 'react';
import { 
  Palette, 
  PenTool, 
  Layout, 
  Printer, 
  Share2, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';
import graphicDesignImg from '../assets/graphic-design.png';

interface GraphicDesignSectionProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export default function GraphicDesignSection({ onOpenConsultation }: GraphicDesignSectionProps) {
  const designServices = [
    {
      title: "Logo Design",
      desc: "The creation of a unique, memorable, and scalable logo that authentically represents your business values and brand identity.",
      icon: PenTool,
      tag: "Brand Identity"
    },
    {
      title: "Branding",
      desc: "The development of a unified visual identity system, including tailored color palettes, custom typography, and comprehensive brand guidelines.",
      icon: Palette,
      tag: "Style System"
    },
    {
      title: "Website Design",
      desc: "The design of visually appealing, modern, and user-friendly website layouts that reflect brand authority and engage your target audience.",
      icon: Layout,
      tag: "UI/UX Experience"
    },
    {
      title: "Print Design",
      desc: "High-resolution, press-ready print materials including executive business cards, brochures, flyers, banners, and promotional collateral.",
      icon: Printer,
      tag: "Tangible Media"
    },
    {
      title: "Social Media Design",
      desc: "Scroll-stopping social media graphics, including branded profile kits, cover artwork, advertising creatives, and viral carousel decks.",
      icon: Share2,
      tag: "Social Presence"
    }
  ];

  return (
    <section id="graphic-design" className="relative py-20 lg:py-28 bg-[#060a14] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient glow lighting */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 shadow-sm shadow-cyan-500/10">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span>Visual Identity & Creative Media</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Graphic Design & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Visual Branding</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Crafting visually captivating, brand-defining content engineered to engage audiences and accelerate commercial growth.
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
                <span>Purpose-Driven Visual Storytelling</span>
              </div>
              
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                Graphic design is the process of creating visual content for various types of media, such as websites, social media, print media, and more. Graphic design services can help businesses to create visually appealing and effective marketing materials that can help to build brand awareness, engage customers, and drive sales.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                Overall, graphic design services can help businesses to create effective marketing materials that can help to build brand awareness, engage customers, and drive sales. However, it requires careful planning, strategy, and ongoing collaboration between the designer and the business to ensure that the designs are effective and optimized for the best results.
              </p>
            </div>

            {/* CTAs: WhatsApp Now & Request Consultation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="https://wa.me/+919654596149"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95"
                id="cta-graphic-whatsapp"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Now (+91 96545 96149)</span>
              </a>

              <button
                onClick={() => onOpenConsultation('Graphic Design & Brand Identity')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                id="cta-graphic-quote"
              >
                <span>Request Creative Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pl-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Full vector assets, Figma source files, high-res print formats, and brand guidelines included.</span>
            </div>
          </div>

          {/* Right Column: High-Impact Graphic Design Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group w-full max-w-lg">
              {/* Outer decorative ambient backlight glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-sky-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl bg-[#0a1120] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 sm:p-4">
                <img 
                  src={graphicDesignImg} 
                  alt="Graphic Design & Visual Branding Showcase" 
                  className="w-full h-auto rounded-xl object-cover transform transition duration-500 group-hover:scale-[1.01]" 
                />
                
                {/* Floating Metric Badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#070b14]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Creative Production</div>
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-300">Brand Identity & Digital Art Direction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 5 Common Graphic Design Services */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Specialized Graphic Design Capabilities
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
              Comprehensive creative solutions crafted to give your brand an unmistakable market presence:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {designServices.map((service, idx) => {
              const IconComponent = service.icon;
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
                        {service.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center text-[11px] font-semibold text-cyan-400/80 group-hover:text-cyan-300">
                    <span>Premium Design Standard</span>
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
                  Start Your Design Project
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Need a distinct brand identity or conversion-boosting visual assets? Partner with our studio today.
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
