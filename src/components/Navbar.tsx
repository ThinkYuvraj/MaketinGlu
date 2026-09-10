import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Logo from './Logo';
import { buttonHoverMotion, standardEase } from '../lib/animations';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const { config } = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Core Expertise', href: '#expertise' },
    { name: 'Performance', href: '#growth' },
    { name: 'Packages', href: '#packages' },
    { name: 'Portfolio', href: '#cases' },
    { name: 'FAQs', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40' 
          : 'bg-[#070b14]/80 backdrop-blur-sm'
      }`}
    >
      {/* Top Announcement Bar (Configurable in Admin Studio) */}
      {config.announcement.enabled && (
        <div className="bg-gradient-to-r from-sky-950 via-[#0a1b2d] to-cyan-950 border-b border-cyan-500/20 py-1.5 px-3 sm:px-4 text-center text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none font-medium">{config.announcement.text}</span>
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-white underline ml-1 cursor-pointer shrink-0"
            >
              <span>{config.announcement.ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-2.5 sm:py-3.5 flex items-center justify-between">
        
        {/* Brand Logo with White Background Badge */}
        <a
          href="/"
          className="flex items-center group transition-transform active:scale-95"
          id="nav-brand-logo"
        >
          <Logo variant="light-badge" size="md" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10 text-sm xl:text-base font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-cyan-400 transition-colors duration-200 py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Desktop CTA Area (Phone & Quote CTA) */}
        <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 xl:gap-5">
          {/* Phone number */}
          <a 
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-900/60"
            title="Call MarketingGlu Support"
          >
            <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            </div>
            <span className="whitespace-nowrap font-bold">{config.phone}</span>
          </a>

          {/* Get Free Quote CTA */}
          <motion.button
            {...buttonHoverMotion}
            onClick={onOpenConsultation}
            className="px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-xs md:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:shadow-cyan-400/20 whitespace-nowrap min-h-[42px] flex items-center justify-center"
            id="btn-get-free-quote"
          >
            Get Free Quote
          </motion.button>
        </div>

        {/* Mobile quick action buttons: Phone + Hamburger */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
          {/* Direct Phone Tap for Mobile Header */}
          <a
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-cyan-400 rounded-xl border border-slate-800 bg-slate-900/90 active:bg-slate-800 transition-colors shadow-sm"
            aria-label="Call Direct Line"
            title="Call MarketingGlu"
          >
            <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>

          {/* Hamburger button with 44px min touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-slate-300 hover:text-white rounded-xl border border-slate-800 bg-slate-900/90 active:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu Backdrop & Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-[60px] bg-black/60 backdrop-blur-xs z-30"
              aria-hidden="true"
            />

            {/* Slide-down Drawer attached right below header */}
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: standardEase }}
              className="lg:hidden fixed top-full left-0 right-0 z-40 bg-[#080d19]/98 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-6 py-5 space-y-4 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto"
            >
              {/* Navigation Links */}
              <div className="flex flex-col gap-1 font-medium text-slate-300 text-sm sm:text-base">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-slate-900 hover:text-cyan-400 border-b border-slate-800/40 active:bg-cyan-950/30 transition-colors min-h-[46px]"
                  >
                    <span className="font-semibold">{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </div>

              {/* Contact and Quote CTA */}
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
                <a 
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-cyan-300 font-semibold min-h-[48px]"
                >
                  <div className="w-9 h-9 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Direct Hotline</span>
                    <span className="font-bold text-slate-100">{config.phone}</span>
                  </div>
                </a>

                <motion.button
                  {...buttonHoverMotion}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 text-sm font-extrabold text-center shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Free Custom Quote</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
