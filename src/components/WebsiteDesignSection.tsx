import React from 'react';
import { 
  Globe, 
  Layout, 
  Smartphone, 
  FileText, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2,
  Layers,
  Code2
} from 'lucide-react';
import websiteDesignImg from '../assets/website-design.png';

interface WebsiteDesignSectionProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export default function WebsiteDesignSection({ onOpenConsultation }: WebsiteDesignSectionProps) {
  const aspects = [
    {
      title: "User Experience (UX) Design",
      desc: "Creating websites that are intuitive and effortless to navigate, featuring prominent calls to action, friction-free flows, and seamless customer journeys.",
      icon: Layout,
      tag: "Intuitive UX"
    },
    {
      title: "Visual Design",
      desc: "Crafting visually captivating digital aesthetics that reinforce brand identity, utilizing harmonious color systems, modern typography, and high-fidelity graphics.",
      icon: Layers,
      tag: "Aesthetic Excellence"
    },
    {
      title: "Responsive Design",
      desc: "Engineering fluid, multi-device responsiveness meticulously tested for desktops, laptops, tablets, and smartphones.",
      icon: Smartphone,
      tag: "Mobile-First"
    },
    {
      title: "Content Design",
      desc: "Structuring content that is engaging, authoritative, and optimized for search engines, with compelling headlines and scannable formatting.",
      icon: FileText,
      tag: "SEO-Optimized"
    }
  ];

  return (
    <section id="web-design" className="relative py-20 lg:py-28 bg-[#060a14] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 shadow-sm shadow-cyan-500/10">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Web Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Website Design</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered for high performance, visual authority, seamless user experience, and measurable business growth.
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
                <span>Next-Gen Digital Experience</span>
              </div>
              
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                <a 
                  href="https://marketinglu.com/index.php/contact-us/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 font-semibold underline underline-offset-4 decoration-cyan-400/50 hover:text-cyan-300 hover:decoration-cyan-300 transition-colors"
                >
                  Website design
                </a>{' '}
                refers to the process of creating and designing a website, including the layout, appearance, and functionality of the site. A well-designed website can help businesses to build brand awareness, connect with their target audience, and drive website traffic and sales.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                Overall, web design is an important aspect of digital marketing that can help businesses to build a strong online presence and connect with their target audience. However, it requires careful planning, strategy, and ongoing maintenance to ensure that the website is effective and optimized for the best results.
              </p>
            </div>

            {/* CTAs: WhatsApp Now & Request Consultation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="https://wa.me/+919654596149"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95"
                id="cta-webdesign-whatsapp"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Now (+91 96545 96149)</span>
              </a>

              <button
                onClick={() => onOpenConsultation('Website Design & Web Development')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                id="cta-webdesign-quote"
              >
                <span>Book Website Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pl-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Full turnkey stack: modern UI/UX design, mobile responsiveness, fast cloud hosting & CMS.</span>
            </div>
          </div>

          {/* Right Column: High-Impact Website Design Illustration Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group w-full max-w-lg">
              {/* Outer decorative ambient backlight glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-indigo-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl bg-[#0a1120] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 sm:p-4">
                <img 
                  src={websiteDesignImg} 
                  alt="Custom Website Design Showcase" 
                  className="w-full h-auto rounded-xl object-cover transform transition duration-500 group-hover:scale-[1.01]" 
                />
                
                {/* Floating Metric Badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#070b14]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Web Engineering</div>
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-300">Responsive, High-Speed & Conversion-Focused</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars of Professional Website Design */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Core Pillars of Modern Website Design
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
              The fundamental architectural facets behind our award-winning web designs:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aspects.map((aspect, idx) => {
              const IconComponent = aspect.icon;
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
                        {aspect.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {aspect.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {aspect.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center text-[11px] font-semibold text-cyan-400/80 group-hover:text-cyan-300">
                    <span>Standard Architecture</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
