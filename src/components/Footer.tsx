import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import Logo from './Logo';
import Container from './common/Container';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
import { expertiseData } from '../data/expertiseData';
import { staggerContainerVariants, staggerItemVariants } from '../lib/animations';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenConsultation, onOpenAdmin }: FooterProps) {
  const { config } = useSiteConfig();
  const { navigateTo, navigateToService } = useNavigation();

  const usefulLinks = [
    { name: 'Home', action: () => navigateTo('#/') },
    { name: 'All Services Hub', action: () => navigateTo('#/services') },
    { name: 'Client Case Studies', action: () => navigateTo('#/#cases') },
    { name: 'Growth Performance', action: () => navigateTo('#/#growth') },
    { name: 'Blogs & Insights', action: () => navigateTo('#/blogs') },
    { name: 'Request Consultation', action: () => onOpenConsultation() },
    { name: 'Admin Studio', action: () => (onOpenAdmin ? onOpenAdmin() : navigateTo('#/admin')), isAdmin: true },
  ];

  const allServices = config.services && config.services.length > 0 ? config.services : expertiseData;
  const displayedServices = allServices.slice(0, 6);

  return (
    <footer id="contact" className="relative bg-[#040813] border-t border-slate-800/80 pt-16 sm:pt-20 pb-12 text-slate-400 text-xs sm:text-sm overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 via-slate-700/60 to-transparent pointer-events-none" />

      {/* Ambient background glow accents */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-950/15 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Main Footer Content Grid */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-14 border-b border-slate-800/80 relative z-10"
        >
          {/* Column 1: Brand & Contact Info (span 4 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Logo variant="light-badge" />
              <span className="text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-white italic">MARKETIN</span>
                <span className="text-cyan-400 not-italic">GLU</span>
              </span>
            </div>

            {/* Active Status Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Accepting New Q2/Q3 Brand Retainers</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              ISO 9001:2015 certified digital growth &amp; technology agency engineering revenue-driven campaigns, headless apps, and scalable search visibility.
            </p>

            {/* Structured Contact Tiles */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-300 leading-snug">
                  <div className="font-semibold text-white mb-0.5">Agency Headquarters</div>
                  <div>{config.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs leading-snug">
                  <div className="font-semibold text-white mb-0.5">Direct Line</div>
                  <a 
                    href={`tel:${config.phone.replace(/\s+/g, '')}`} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    {config.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs leading-snug">
                  <div className="font-semibold text-white mb-0.5">Client Inquiries</div>
                  <a 
                    href={`mailto:${config.email}`} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium break-all"
                  >
                    {config.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Useful Links (span 2.5 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Useful Links</span>
            </h4>
            <ul className="space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    type="button"
                    onClick={link.action}
                    className="group inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors py-1 text-left cursor-pointer text-xs sm:text-sm text-slate-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline underline-offset-4">{link.name}</span>
                    {link.isAdmin && (
                      <span className="ml-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800/50 text-[10px] text-cyan-300 font-mono">
                        <Lock className="w-2.5 h-2.5" />
                        CMS
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Dedicated Service Hub (span 3 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Services</span>
              </h4>
              <button
                type="button"
                onClick={() => navigateTo('#/services')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950 border border-cyan-800/40 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
              >
                <span>All (6)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <ul className="space-y-2.5">
              {displayedServices.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => navigateToService(service.id)}
                    className="group inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors py-1 text-left cursor-pointer text-xs sm:text-sm text-slate-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline underline-offset-4 line-clamp-1">{service.tabLabel || service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Follow Us & Strategy Box (span 3 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Follow Us</span>
              </h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Connect with our agency across digital channels for real-time marketing insights &amp; performance benchmarks.
              </p>
              
              {/* Social Link Badges */}
              <div className="flex items-center gap-2.5">
                <motion.a 
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-850 transition-all shadow-sm"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-850 transition-all shadow-sm"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-850 transition-all shadow-sm"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-850 transition-all shadow-sm"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            {/* Quick Strategy Inbound Cardlet */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#091122] to-[#060b17] border border-slate-800/90 hover:border-cyan-500/40 transition-all text-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-white text-xs">Need a Strategy Audit?</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Book a 30-minute growth roadmap session tailored to your commercial goals.
              </p>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 active:scale-[0.98] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-cyan-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Clean, Official, Trust-Anchored */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
            <span className="text-slate-300 font-semibold">© 2026 MarketingGlu.</span>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <span className="text-slate-400">All rights reserved.</span>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ISO 9001:2015 Certified Agency
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Enterprise Terms
            </button>
            <span className="text-slate-700">&bull;</span>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Privacy &amp; Security
            </button>
            <span className="text-slate-700">&bull;</span>
            
            {/* Primary Admin Studio Button */}
            <button
              id="footer-admin-login-btn"
              type="button"
              onClick={() => {
                if (onOpenAdmin) {
                  onOpenAdmin();
                } else {
                  navigateTo('#/admin');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all text-xs font-semibold cursor-pointer shadow-sm group"
              title="Admin Portal Login"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Admin Studio</span>
            </button>
          </div>
        </div>

      </Container>
    </footer>
  );
}

