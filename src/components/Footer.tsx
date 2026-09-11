import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Lock, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
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
    { name: 'Contact & Consultation', action: () => onOpenConsultation() },
    { name: 'Growth Performance', action: () => navigateTo('#/#growth') },
    { name: 'Client Case Studies', action: () => navigateTo('#/#cases') },
  ];

  const serviceLinks = [
    { name: 'Website Design & Dev', id: 'web-design' },
    { name: 'Ecommerce Storefronts', id: 'ecommerce' },
    { name: 'Search Engine Optimization (SEO)', id: 'seo' },
    { name: 'Branding & Graphic Design', id: 'graphic-design' },
    { name: 'PPC Paid Advertising', id: 'ppc' },
    { name: 'Social Media Optimization (SMO)', id: 'smo' },
  ];

  return (
    <footer id="contact" className="relative bg-[#050810] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        
        {/* Main Footer Grid - Staggered entrance across desktop screens */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10 xl:gap-16 pb-14 border-b border-slate-900"
        >
          
          {/* Column 1: Brand & Contact Info */}
          <motion.div variants={staggerItemVariants} className="space-y-4">
            <div className="mb-3">
              <Logo variant="light-badge" />
            </div>

            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <div>{config.address}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300 pt-1">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-400 transition-colors font-medium py-1">
                Phone: {config.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`mailto:${config.email}`} className="hover:text-cyan-400 transition-colors font-medium py-1">
                Email: {config.email}
              </a>
            </div>
          </motion.div>

          {/* Column 2: Useful Links matching Figma */}
          <motion.div variants={staggerItemVariants}>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Useful Links
            </h4>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={link.action}
                    className="hover:text-cyan-400 transition-colors inline-flex items-center py-1 min-h-[32px] text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Dedicated Service Pages */}
          <motion.div variants={staggerItemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Services
              </h4>
              <button
                onClick={() => navigateTo('#/services')}
                className="text-[11px] text-cyan-400 hover:text-white font-medium cursor-pointer"
              >
                All &rarr;
              </button>
            </div>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => navigateToService(service.id)}
                    className="hover:text-cyan-400 transition-colors inline-flex items-center py-1 min-h-[32px] text-left cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Follow Us matching Figma */}
          <motion.div variants={staggerItemVariants}>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Connect with our agency across digital channels for real-time brand management trends.
            </p>
            <div className="flex items-center gap-3">
              <motion.a 
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors min-w-[40px] min-h-[40px]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors min-w-[40px] min-h-[40px]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors min-w-[40px] min-h-[40px]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors min-w-[40px] min-h-[40px]"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Bar with discrete Admin Site Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Powered by All in one solutions @ All Right reserved!
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <span className="text-slate-400 font-medium">
              © 2026 MarketingGlu. ISO 9001:2015 Certified Agency.
            </span>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <a
              href="#/admin"
              onClick={(e) => {
                if (onOpenAdmin) {
                  e.preventDefault();
                  onOpenAdmin();
                }
              }}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer py-1"
              title="Separate Admin Login & UI/UX Studio"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Site</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
