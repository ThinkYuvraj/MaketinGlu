import { useState } from 'react';
import { 
  Globe, 
  Palette, 
  Hash, 
  ShoppingBag, 
  Search, 
  Bot, 
  ArrowUpRight, 
  CheckCircle2,
  MousePointerClick,
  Megaphone
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  features: string[];
  icon: typeof Globe;
}

const servicesList: ServiceItem[] = [
  {
    id: "web-design",
    title: "Website Designing",
    shortDesc: "Creating responsive, user-friendly websites that build authority and sales",
    detailedDesc: "Website design refers to creating and designing a website, including layout, appearance, and functionality. Well-designed websites build brand awareness, connect with target audiences, and drive traffic and sales through careful planning, UX, visual design, and content optimization.",
    features: [
      "User experience (UX) design: Intuitive navigation, clear CTAs & seamless UX",
      "Visual design: Visually appealing aesthetic with clear brand identity & imagery",
      "Responsive design: Optimized for desktops, laptops, tablets, and smartphones",
      "Content design: Engaging, informative & SEO-optimized content with clear hierarchy"
    ],
    icon: Globe,
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website Design",
    shortDesc: "Optimized for online sales, transactions and streamlined checkout",
    detailedDesc: "E-commerce website design is the process of creating a website that is optimized for online sales and transactions. Designed with the user in mind, making it easy to browse products, add items to shopping cart, and complete checkout with high security and speed.",
    features: [
      "User-friendly navigation: Intuitive system to quickly find products",
      "Clear calls to action: Prominent 'Add to Cart' and 'Checkout Now' prompts",
      "High-quality product images: Multi-view galleries and zoom functionality",
      "Secure payment processing: Protected customer personal & financial info",
      "Responsive design: Flawless across desktops, laptops, tablets & phones"
    ],
    icon: ShoppingBag,
  },
  {
    id: "graphic-design",
    title: "Graphic Designing",
    shortDesc: "Creating visual content for websites, social media, print & marketing collateral",
    detailedDesc: "Graphic design is the process of creating visual content for various types of media, such as websites, social media, print media, and more. Graphic design services help businesses create visually appealing and effective marketing materials to build brand awareness, engage customers, and drive sales.",
    features: [
      "Logo design: Unique & memorable logos representing your brand identity",
      "Branding: Consistent visual identity with colors, fonts & design systems",
      "Website design: Visually appealing & user-friendly brand web layouts",
      "Print design: Business cards, brochures, flyers & promotional print materials",
      "Social media design: Profile artwork, cover images & engaging social posts"
    ],
    icon: Palette,
  },
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    shortDesc: "Optimize website to rank higher in SERPs for relevant keywords & traffic",
    detailedDesc: "SEO is the practice of optimizing a website to rank higher in search engine results pages (SERPs) for relevant keywords and phrases. Improves visibility across Google, Bing, and Yahoo through content optimization, meta tags, site structure, and authoritative backlinks.",
    features: [
      "Increased visibility & traffic: Rank higher in SERPs for sustained organic visits",
      "Better user experience: Optimized content & structure for frictionless navigation",
      "Cost-effective marketing: Long-term compounding ROI without recurring ad spend",
      "Improved brand credibility: High rankings establishing authority & market trust",
      "Competitive advantage: Outranking industry rivals and acquiring qualified leads"
    ],
    icon: Search,
  },
  {
    id: "smo",
    title: "SMO (Social Media Optimization)",
    shortDesc: "Optimizing website & brand presence on social media for viral engagement",
    detailedDesc: "SMO (Social Media Optimization) is the process of optimizing a website or brand's presence on social media platforms to increase visibility, engagement, and brand awareness. Involves creating and sharing content, building profiles, and engaging with followers to connect with audiences and drive website traffic.",
    features: [
      "Increased brand awareness: Creating and sharing content to build strong brand recognition",
      "Increased website traffic: Driving compounding visitor traffic via social channels",
      "Improved customer engagement: Deep relationship building and community loyalty",
      "Cost-effective marketing: Outsized reach and conversion with minimal expenditure",
      "Competitive advantage: Building an authoritative social media presence over rivals"
    ],
    icon: Hash,
  },
  {
    id: "ppc",
    title: "PPC (Pay-Per-Click Advertising)",
    shortDesc: "Online advertising model paying per click to reach targeted buyer audiences",
    detailedDesc: "PPC (Pay-Per-Click) is an online advertising model where advertisers pay a fee each time a user clicks on an ad. Bidding on high-intent keywords and targeting specific audiences delivers immediate traffic, full budget control, and transparent ROI attribution.",
    features: [
      "Immediate results: Instant delivery of qualified website traffic and leads",
      "Targeted advertising: Precision targeting by location, demographics & intent",
      "Control over ad spend: Complete budget authority and dynamic bid optimization",
      "Measurable results: Real-time analytics, conversion tracking & ROI reports",
      "Competitive advantage: Outbidding rivals and dominating top search results"
    ],
    icon: MousePointerClick,
  },
  {
    id: "smm",
    title: "SMM (Social Media Marketing)",
    shortDesc: "Paid social advertising campaigns on Meta, LinkedIn & Instagram",
    detailedDesc: "Hyper-targeted paid social ads connecting your value proposition directly with verified commercial decision makers.",
    features: [
      "Meta Ads & LinkedIn Campaign Manager mastery",
      "Custom audience lookalikes & re-targeting funnels",
      "A/B creative testing & hook rate analysis",
      "Conversion tracking & ROAS optimization"
    ],
    icon: Megaphone,
  },
  {
    id: "chatbot",
    title: "Chatbot Automation",
    shortDesc: "Intelligent lead capture and 24/7 automated user assistance",
    detailedDesc: "Intelligent customer engagement bots and automated lead-qualification funnels running 24/7 across your web properties.",
    features: [
      "Multi-channel automated query resolution",
      "Instant lead qualification & CRM synchronization",
      "Context-aware custom prompt behavior",
      "Automated follow-up sequences"
    ],
    icon: Bot,
  },
];

interface GrowthServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function GrowthServices({ onSelectService }: GrowthServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="capabilities" className="relative py-20 bg-[#070b14]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Figma */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
            CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
            Comprehensive Growth Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Tailored digital products engineered to hook users and convert them into brand loyalists.
          </p>
        </div>

        {/* 6 Services Grid matching Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative p-7 rounded-2xl bg-[#0a1120] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Icon with glowing cyan ring */}
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 group-hover:border-cyan-400 group-hover:bg-cyan-950 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title matching Figma */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description matching Figma */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Subtle card bottom action indicator */}
                <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>Explore specifications</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#0b1324] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                <selectedService.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">MarketingGlu Capability</span>
                <h3 className="text-xl font-extrabold text-white">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              {selectedService.detailedDesc}
            </p>

            <div className="space-y-2.5 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Deliverables</h4>
              {selectedService.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {(selectedService.id === 'web-design' || selectedService.id === 'ecommerce' || selectedService.id === 'seo' || selectedService.id === 'graphic-design' || selectedService.id === 'ppc' || selectedService.id === 'smo') && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <span className="text-xs text-emerald-300 font-medium">Fast assistance on WhatsApp:</span>
                <a
                  href="https://wa.me/+919654596149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all inline-flex items-center gap-1 shadow-sm"
                >
                  WhatsApp Now (+91 96545 96149)
                </a>
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  const s = selectedService.title;
                  setSelectedService(null);
                  onSelectService(s);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all cursor-pointer"
              >
                Request Quote for {selectedService.title}
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
