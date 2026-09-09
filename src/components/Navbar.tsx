import { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Logo from './Logo.png';
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Websites', href: '#web-design' },
    { name: 'E-Commerce', href: '#ecommerce' },
    { name: 'SEO', href: '#seo' },
    { name: 'Design', href: '#graphic-design' },
    { name: 'PPC', href: '#ppc' },
    { name: 'SMO', href: '#smo' },
    { name: 'Packages', href: '#packages' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Portfolio', href: '#cases' },
    { name: 'FAQs', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40' 
          : 'bg-[#070b14]/70 backdrop-blur-sm'
      }`}
    >
      {/* Top Announcement Bar (Configurable in Admin Studio) */}
      {config.announcement.enabled && (
        <div className="bg-gradient-to-r from-sky-950 via-[#0a1b2d] to-cyan-950 border-b border-cyan-500/20 py-1.5 px-4 text-center text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{config.announcement.text}</span>
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-white underline ml-1 cursor-pointer"
            >
              <span>{config.announcement.ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Logo */}
        <a
          href="/"
          className="flex items-center group transition-transform active:scale-95"
          id="nav-brand-logo"
        >
          <img 
            src={Logo} 
            alt="MarketingGlu" 
            className="h-9 sm:h-10 w-auto object-contain" 
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Area (Phone & Get Free Quote) */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Phone number */}
          <a 
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
            title="Call MarketingGlu Support"
          >
            <div className="w-7 h-7 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>{config.phone}</span>
          </a>

          {/* Get Free Quote CTA */}
          <button
            onClick={onOpenConsultation}
            className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-xs md:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:shadow-cyan-400/20"
            id="btn-get-free-quote"
          >
            Get Free Quote
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800 bg-slate-900"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090f1d] border-b border-slate-800 px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-3 font-medium text-slate-300 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-cyan-400 border-b border-slate-800/40"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
            <a 
              href={`tel:${config.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-sm text-cyan-300 font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>{config.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 text-sm font-bold text-center mt-1"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
