import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
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
  const { currentRoute, navigateTo, navigateToService } = useNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#/')) {
      navigateTo(href);
      return;
    }
    if (currentRoute.type !== 'home') {
      navigateTo('#/' + href);
      setTimeout(() => {
        const id = href.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const id = href.replace('#', '');
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryLinks = [
    { name: 'Home', action: () => handleLinkClick('#/') },
    { name: 'About Us', action: () => handleLinkClick('#about') },
    { name: 'Services', action: () => handleLinkClick('#/services') },
    { name: 'Pricing Packages', action: () => handleLinkClick('#packages') },
    { name: 'Case Studies', action: () => handleLinkClick('#cases') },
    { name: 'Blogs & Insights', action: () => handleLinkClick('#/blogs') },
  ];

  const allServices = config.services && config.services.length > 0 ? config.services : expertiseData;
  const displayedServices = allServices.slice(0, 5);

  return (
    <footer id="contact" className="relative bg-[#02050d] border-t border-slate-800/80 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 text-slate-400 text-xs overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 via-slate-700 to-transparent pointer-events-none" />

      <Container>
        {/* Main Footer Grid: 1-col on mobile, 2-col on tablet, 12-col on desktop */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 pb-5 sm:pb-6 border-b border-slate-900/90 relative z-10"
        >
          {/* Column 1: Brand & Contact Info */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-4 md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Logo variant="light-badge" />
              <span className="text-lg sm:text-xl font-black tracking-tight">
                <span className="text-white italic">MARKETIN</span>
                <span className="text-cyan-400 not-italic">GLU</span>
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-sm">
              ISO 9001:2015 certified digital marketing &amp; web architecture agency engineering high-converting SEO, Google Ads, and full-stack software.
            </p>

            {/* Contact Items */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-slate-300 pt-0.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{config.address}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">&bull;</span>
              <a 
                href={`tel:${config.phone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-1 text-slate-200 hover:text-cyan-400 transition-colors font-bold"
              >
                <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{config.phone}</span>
              </a>
              <span className="text-slate-700 hidden sm:inline">&bull;</span>
              <a 
                href={`mailto:${config.email}`} 
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{config.email}</span>
              </a>
            </div>
          </motion.div>

          {/* Combined Navigation & Services Grid for mobile/tablet */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-5 md:col-span-1 grid grid-cols-2 gap-4">
            {/* Navigation Column */}
            <div>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Navigation</span>
              </h4>
              <ul className="space-y-1.5">
                {primaryLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      type="button"
                      onClick={link.action}
                      className="group inline-flex items-center gap-1 hover:text-cyan-300 transition-colors text-slate-400 text-[11px] sm:text-xs cursor-pointer"
                    >
                      <ChevronRight className="w-2.5 h-2.5 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                      <span>{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Services</span>
                </h4>
                <button
                  type="button"
                  onClick={() => navigateTo('#/services')}
                  className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>All ({allServices.length})</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
              <ul className="space-y-1.5">
                {displayedServices.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => navigateToService(service.id)}
                      className="group inline-flex items-center gap-1 hover:text-cyan-300 transition-colors text-slate-400 text-[11px] sm:text-xs text-left cursor-pointer truncate max-w-full"
                    >
                      <ChevronRight className="w-2.5 h-2.5 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                      <span className="truncate">{service.tabLabel || service.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 3: Follow & Quick Audit */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-3 md:col-span-1 space-y-3">
            <div>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Follow Us</span>
              </h4>
              
              <div className="flex items-center gap-2">
                {[
                  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                ].map((item) => (
                  <motion.a 
                    key={item.label}
                    whileHover={{ y: -2, scale: 1.05 }}
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
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Single Compact Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="text-slate-400">© 2026 MarketingGlu. All rights reserved.</span>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              ISO 9001:2015
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center sm:justify-end">
            <button
              type="button"
              onClick={() => handleLinkClick('#/terms')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span className="text-slate-800">&bull;</span>
            <button
              type="button"
              onClick={() => handleLinkClick('#/privacy')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span className="text-slate-800">&bull;</span>
            
            {/* Admin Login Trigger */}
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
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all text-[11px] font-semibold cursor-pointer min-h-[28px]"
              title="Admin Portal Login"
            >
              <Lock className="w-2.5 h-2.5 text-cyan-400" />
              <span>Admin Studio</span>
            </button>
          </div>
        </div>

      </Container>
    </footer>
  );
}
