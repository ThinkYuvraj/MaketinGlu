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
    { name: 'Services Hub', action: () => navigateTo('#/services') },
    { name: 'Case Studies', action: () => navigateTo('#/#cases') },
    { name: 'Growth', action: () => navigateTo('#/#growth') },
    { name: 'Blogs', action: () => navigateTo('#/blogs') },
    { name: 'Consultation', action: () => onOpenConsultation() },
  ];

  const allServices = config.services && config.services.length > 0 ? config.services : expertiseData;
  const displayedServices = allServices.slice(0, 6);

  return (
    <footer id="contact" className="relative bg-[#02050d] border-t border-slate-800/80 pt-8 sm:pt-10 pb-6 text-slate-400 text-xs overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 via-slate-700 to-transparent pointer-events-none" />

      <Container>
        {/* Main Footer Compact Grid */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6 pb-6 border-b border-slate-900 relative z-10"
        >
          {/* Column 1: Brand & Contact Info (span 4 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <Logo variant="light-badge" />
              <span className="text-xl font-black tracking-tight">
                <span className="text-white italic">MARKETIN</span>
                <span className="text-cyan-400 not-italic">GLU</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              ISO 9001:2015 certified digital growth &amp; tech agency engineering revenue-driven search, PPC, and web applications.
            </p>

            {/* Compact Contact Items */}
            <div className="space-y-1.5 text-xs text-slate-300 pt-0.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-[11px] leading-snug">{config.address}</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <a 
                  href={`tel:${config.phone.replace(/\s+/g, '')}`} 
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{config.phone}</span>
                </a>
                <span className="text-slate-700">&bull;</span>
                <a 
                  href={`mailto:${config.email}`} 
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{config.email}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Useful Links (span 2.5 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-1.5">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    type="button"
                    onClick={link.action}
                    className="group inline-flex items-center gap-1 hover:text-cyan-300 transition-colors text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services (span 3 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-3 sm:col-span-1">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Services</span>
              </h4>
              <button
                type="button"
                onClick={() => navigateTo('#/services')}
                className="text-[10px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer"
              >
                <span>All (6)</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
            <ul className="space-y-1.5">
              {displayedServices.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => navigateToService(service.id)}
                    className="group inline-flex items-center gap-1 hover:text-cyan-300 transition-colors text-slate-400 hover:text-slate-200 text-xs text-left cursor-pointer truncate max-w-full"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span className="truncate">{service.tabLabel || service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Follow & Quick Audit (span 3 on desktop) */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-3 space-y-3">
            <div>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Follow Us</span>
              </h4>
              
              {/* Compact Social Badges */}
              <div className="flex items-center gap-2">
                {[
                  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map((item) => (
                  <motion.a 
                    key={item.label}
                    whileHover={{ y: -1, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Compact Consultation Banner */}
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">Need a Growth Audit?</div>
                <div className="text-[10px] text-slate-400">Free 30-min strategy review</div>
              </div>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-sm transition-all"
              >
                <Sparkles className="w-3 h-3" />
                <span>Book Call</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Ultra-Compact Single Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="text-slate-400">© 2026 MarketingGlu. All rights reserved.</span>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              ISO 9001:2015 Certified
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-end">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Enterprise Terms
            </button>
            <span className="text-slate-800">&bull;</span>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span className="text-slate-800">&bull;</span>
            
            {/* Compact Admin Login Trigger */}
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
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all text-[10px] font-semibold cursor-pointer"
              title="Admin Portal Login"
            >
              <Lock className="w-2.5 h-2.5 text-cyan-400" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </Container>
    </footer>
  );
}

