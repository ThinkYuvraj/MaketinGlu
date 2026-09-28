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

  const usefulLinks = [
    { name: 'Home', action: () => handleLinkClick('#/') },
    { name: 'Services Directory', action: () => handleLinkClick('#/services') },
    { name: 'Performance Stats', action: () => handleLinkClick('#growth') },
    { name: 'Pricing Packages', action: () => handleLinkClick('#packages') },
    { name: 'Case Studies', action: () => handleLinkClick('#cases') },
    { name: 'Client Reviews', action: () => handleLinkClick('#testimonials') },
    { name: 'Blogs & Insights', action: () => handleLinkClick('#/blogs') },
    { name: 'Frequently Asked Questions', action: () => handleLinkClick('#faq') },
  ];

  const allServices = config.services && config.services.length > 0 ? config.services : expertiseData;
  const displayedServices = allServices.slice(0, 6);

  return (
    <footer id="contact" className="relative bg-[#02050d] border-t border-slate-800/80 pt-10 pb-6 text-slate-400 text-xs overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 via-slate-700 to-transparent pointer-events-none" />

      <Container>
        {/* Main Footer Grid */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-900 relative z-10"
        >
          {/* Column 1: Brand & Contact Info */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <Logo variant="light-badge" />
              <span className="text-xl font-black tracking-tight">
                <span className="text-white italic">MARKETIN</span>
                <span className="text-cyan-400 not-italic">GLU</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              ISO 9001:2015 certified digital marketing &amp; web architecture agency engineering high-converting SEO, Google Ads, e-commerce storefronts, and full-stack software.
            </p>

            {/* Contact Items */}
            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs leading-snug">{config.address}</span>
              </div>
              <div className="flex items-center gap-4 text-xs pt-0.5">
                <a 
                  href={`tel:${config.phone.replace(/\s+/g, '')}`} 
                  className="flex items-center gap-1.5 text-slate-200 hover:text-cyan-400 transition-colors font-bold"
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

          {/* Column 2: Useful Links */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    type="button"
                    onClick={link.action}
                    className="group inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-3.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
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
            <ul className="space-y-2">
              {displayedServices.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => navigateToService(service.id)}
                    className="group inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors text-slate-400 hover:text-slate-200 text-xs text-left cursor-pointer truncate max-w-full"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span className="truncate">{service.tabLabel || service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Follow & Quick Audit */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Follow Us</span>
              </h4>
              
              <div className="flex items-center gap-2">
                {[
                  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map((item) => (
                  <motion.a 
                    key={item.label}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <item.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Strategy Review Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 shadow-md">
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Need a Growth Audit?</div>
                <div className="text-[11px] text-slate-400">Free 30-min strategy review</div>
              </div>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="shrink-0 px-3 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 hover:brightness-110 text-slate-950 font-extrabold text-xs flex items-center gap-1 cursor-pointer shadow-md shadow-cyan-500/20 transition-all min-h-[36px]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Call</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Single Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="text-slate-400">© 2026 MarketinGlu. All rights reserved.</span>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
              Privacy Policy
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all text-xs font-semibold cursor-pointer min-h-[32px]"
              title="Admin Portal Login"
            >
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Admin Studio</span>
            </button>
          </div>
        </div>

      </Container>
    </footer>
  );
}
