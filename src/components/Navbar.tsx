import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  Layers,
  Home,
  Building2,
  Briefcase,
  Package,
  TrendingUp,
  BookOpen,
  HelpCircle,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
import { expertiseData, getExpertiseIcon } from '../data/expertiseData';
import Logo from './Logo';
import { buttonHoverMotion } from '../lib/animations';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const { config } = useSiteConfig();
  const { currentRoute, navigateTo, navigateToService } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navServices = config.services && config.services.length > 0 ? config.services : expertiseData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close drawer on escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
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

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
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
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', href);
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  const isHashActive = (hashTarget: string) => {
    const currentHash = window.location.hash || '';
    if (hashTarget === '#/' || hashTarget === '#home') {
      return currentRoute.type === 'home' && (!currentHash || currentHash === '#/' || currentHash === '#home');
    }
    if (hashTarget === '#about') {
      return currentHash === '#about' || currentHash === '#/about' || currentHash === '#about-us';
    }
    return currentHash === hashTarget || currentHash === `#/${hashTarget.replace('#', '')}`;
  };

  const rawPhone = config.phone.replace(/[^0-9+]/g, '');
  const whatsappNumber = rawPhone.replace('+', '');

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
        <div className="bg-gradient-to-r from-sky-950 via-[#0a1b2d] to-cyan-950 border-b border-cyan-500/20 py-1.5 px-3 sm:px-4 text-center text-[10.5px] sm:text-xs w-full">
          <div className="w-full px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-center gap-1.5 sm:gap-2 text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate max-w-[190px] xs:max-w-[280px] sm:max-w-none font-medium">{config.announcement.text}</span>
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

      {/* Main Navigation Bar Row - Fluid Responsive Layout */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-4 xl:px-8 2xl:px-12 py-2 sm:py-2.5 flex items-center justify-between gap-2 lg:gap-3 xl:gap-6">
        
        {/* Left: Brand Logo */}
        <div className="shrink-0 flex items-center">
          <button
            onClick={() => handleNavClick('#/')}
            className="flex items-center gap-2 group transition-transform active:scale-95 cursor-pointer bg-transparent border-0 p-0"
            id="nav-brand-logo"
            aria-label="MarketinGlu Homepage"
          >
            <Logo variant="light-badge" size="md" />
            <span className="text-base sm:text-lg lg:text-base xl:text-lg font-black tracking-tight flex items-center whitespace-nowrap">
              <span className="text-white italic">MARKETIN</span>
              <span className="text-blue-500 not-italic">GLU</span>
            </span>
          </button>
        </div>

        {/* Center: Desktop Nav Links inside a Sleek Floating Dock */}
        <div className="hidden lg:flex flex-1 items-center justify-center min-w-0 px-1 xl:px-2">
          <nav className="flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md backdrop-blur-md">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('#/')}
              className={`px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                isHashActive('#/')
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-300 hover:text-cyan-300 font-medium'
              }`}
            >
              Home
            </button>

            {/* 2. Services Dropdown */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                  currentRoute.type === 'service-detail' || currentRoute.type === 'services-index' || window.location.hash === '#expertise'
                    ? 'text-cyan-400 font-bold bg-cyan-950/40'
                    : 'text-slate-300 hover:text-cyan-300 font-medium'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-80 sm:w-88 mt-2 bg-slate-950 border border-cyan-500/40 rounded-2xl p-3 shadow-2xl shadow-black z-50"
                  >
                    <div className="px-3 py-2 border-b border-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                        CORE CAPABILITIES
                      </span>
                      <button
                        onClick={() => handleNavClick('#/services')}
                        className="text-[11px] text-slate-400 hover:text-cyan-300 font-semibold cursor-pointer transition-colors"
                      >
                        All Services &rarr;
                      </button>
                    </div>

                    <div className="space-y-1">
                      {navServices.map((item) => {
                        const Icon = getExpertiseIcon(item);
                        const isActive = currentRoute.type === 'service-detail' && currentRoute.serviceId === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              navigateToService(item.id);
                            }}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold'
                                : 'hover:bg-slate-900 text-slate-200 hover:text-white'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold truncate">{item.tabLabel}</div>
                              <div className="text-[10px] text-slate-400 truncate">{item.category.split('&')[0].trim()}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-800">
                      <button
                        onClick={() => handleNavClick('#/services')}
                        className="w-full py-2 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md shadow-cyan-400/20 cursor-pointer flex items-center justify-center gap-2 group/btn min-h-[40px]"
                        id="nav-dropdown-know-more"
                      >
                        <Layers className="w-4 h-4 text-slate-950 shrink-0" />
                        <span>Know More &bull; All Services</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Portfolio */}
            <button
              onClick={() => handleNavClick('#cases')}
              className={`px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                isHashActive('#cases')
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-300 hover:text-cyan-300 font-medium'
              }`}
            >
              Portfolio
            </button>

            {/* 4. Packages */}
            <button
              onClick={() => handleNavClick('#packages')}
              className={`px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                isHashActive('#packages')
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-300 hover:text-cyan-300 font-medium'
              }`}
            >
              Packages
            </button>

            {/* 5. Performance */}
            <button
              onClick={() => handleNavClick('#growth')}
              className={`px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                isHashActive('#growth')
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-300 hover:text-cyan-300 font-medium'
              }`}
            >
              Performance
            </button>

            {/* 6. About Us */}
            <button
              onClick={() => handleNavClick('#about')}
              className={`px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                isHashActive('#about')
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-300 hover:text-cyan-300 font-medium'
              }`}
            >
              About Us
            </button>

            {/* 7. Blogs */}
            <button
              onClick={() => handleNavClick('#/blogs')}
              className={`px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                currentRoute.type === 'blogs' || currentRoute.type === 'blog-detail'
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-300 hover:text-cyan-300 font-medium'
              }`}
            >
              Blogs
            </button>

            {/* 8. FAQs */}
            <button
              onClick={() => handleNavClick('#faq')}
              className={`px-2 xl:px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-xs xl:text-[13px] ${
                isHashActive('#faq')
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-300 hover:text-cyan-300 font-medium'
              }`}
            >
              FAQs
            </button>
          </nav>
        </div>

        {/* Right Desktop CTA Area */}
        <div className="hidden lg:flex shrink-0 items-center justify-end gap-1.5 xl:gap-3">
          {/* Phone Quick Link */}
          <a 
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-cyan-400 transition-colors py-1 px-1.5 xl:py-1.5 xl:px-2.5 rounded-xl hover:bg-slate-900/60 border border-transparent hover:border-slate-800"
            title={`Call Support: ${config.phone}`}
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="hidden xl:inline whitespace-nowrap font-bold text-xs">{config.phone}</span>
          </a>

          {/* Get Free Quote CTA */}
          <motion.button
            {...buttonHoverMotion}
            onClick={onOpenConsultation}
            className="px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-[11px] xl:text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap min-h-[34px] xl:min-h-[38px] flex items-center justify-center"
            id="btn-get-free-quote"
          >
            Get Free Quote
          </motion.button>
        </div>

        {/* Right Tablet & Mobile Action Buttons (Visible strictly below lg: <1024px) */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          {/* Tablet Quote CTA Button (Shown on sm: & md: 640px - 1023px) */}
          <motion.button
            {...buttonHoverMotion}
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-cyan-400/80 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
            id="tablet-quote-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get Quote</span>
          </motion.button>

          {/* Direct Phone Tap for Tablet and Mobile (<1024px) */}
          <a
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-cyan-400 rounded-xl border border-slate-800 bg-slate-900/90 active:bg-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm shrink-0 min-h-[42px] min-w-[42px]"
            aria-label="Call Direct Line"
            title={`Call ${config.phone}`}
          >
            <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>

          {/* Hamburger toggle button (min 44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-slate-200 hover:text-white rounded-xl border border-slate-800 bg-slate-900/90 active:bg-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm cursor-pointer shrink-0 min-h-[42px] min-w-[42px]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Slide-In Drawer for Mobile & Tablet (<1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop overlay covering full screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-In Drawer Panel from Right */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-[420px] md:w-[460px] bg-[#070c18] border-l border-slate-800/90 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between gap-3 bg-slate-950/80">
                <div className="flex items-center gap-2.5">
                  <Logo variant="light-badge" size="sm" />
                  <span className="text-base sm:text-lg font-black tracking-tight">
                    <span className="text-white italic">MARKETIN</span>
                    <span className="text-blue-500 not-italic">GLU</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[40px] min-w-[40px]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-cyan-400" />
                </button>
              </div>

              {/* Scrollable Navigation List - Reordered to Match Desktop Flow */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
                
                {/* Agency Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ISO 9001:2015 &bull; NEW DELHI</span>
                </div>

                {/* Primary Nav Links */}
                <div className="space-y-1 font-medium text-slate-300 text-sm">
                  {/* 1. Home */}
                  <button
                    onClick={() => handleNavClick('#/')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left min-h-[46px] ${
                      isHashActive('#/')
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                        : 'hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Home className="w-4 h-4 text-cyan-400" />
                      <span>Home</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* 2. Services Accordion */}
                  <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/40">
                    <button
                      onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                      className="w-full flex items-center justify-between p-3 hover:bg-slate-900 text-cyan-300 min-h-[46px] text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <span className="font-bold">Services &amp; Disciplines</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                          6 Disciplines
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesExpanded ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                      </div>
                    </button>

                    {mobileServicesExpanded && (
                      <div className="px-2 pb-2.5 pt-1 space-y-1 bg-slate-900/40 border-t border-slate-800/60">
                        {navServices.map((item) => {
                          const Icon = getExpertiseIcon(item);
                          const isActive = currentRoute.type === 'service-detail' && currentRoute.serviceId === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                navigateToService(item.id);
                              }}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-colors cursor-pointer ${
                                isActive 
                                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40' 
                                  : 'hover:bg-slate-800/70 text-slate-200 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                <span className="truncate">{item.tabLabel}</span>
                              </div>
                              <span className="text-[10px] text-cyan-400 font-mono font-normal shrink-0">Explore &rarr;</span>
                            </button>
                          );
                        })}

                        <button
                          onClick={() => handleNavClick('#/services')}
                          className="w-full py-2 px-3 mt-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-center text-xs font-bold transition-all shadow-md shadow-cyan-400/20 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Layers className="w-3.5 h-3.5 text-slate-950" />
                          <span>View All 6 Core Disciplines</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 3. Portfolio */}
                  <button
                    onClick={() => handleNavClick('#cases')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left min-h-[46px] ${
                      isHashActive('#cases')
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                        : 'hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      <span>Portfolio &amp; Case Studies</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* 4. Packages */}
                  <button
                    onClick={() => handleNavClick('#packages')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left min-h-[46px] ${
                      isHashActive('#packages')
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                        : 'hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-cyan-400" />
                      <span>Service Packages</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* 5. Performance */}
                  <button
                    onClick={() => handleNavClick('#growth')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left min-h-[46px] ${
                      isHashActive('#growth')
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                        : 'hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>Performance In Numbers</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* 6. About Us */}
                  <button
                    onClick={() => handleNavClick('#about')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left min-h-[46px] ${
                      isHashActive('#about')
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                        : 'hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span>About Us &amp; Mission</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* 7. Blogs */}
                  <button
                    onClick={() => handleNavClick('#/blogs')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left min-h-[46px] ${
                      currentRoute.type === 'blogs' || currentRoute.type === 'blog-detail'
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                        : 'hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Blogs &amp; Insights</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* 8. FAQs */}
                  <button
                    onClick={() => handleNavClick('#faq')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left min-h-[46px] ${
                      isHashActive('#faq')
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                        : 'hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>Frequently Asked Questions</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

              </div>

              {/* Bottom Quick Contact & Consultation Triggers */}
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#060a14] space-y-2.5 pb-28 sm:pb-6">
                <div className="grid grid-cols-2 gap-2">
                  {/* Phone hotline */}
                  <a 
                    href={`tel:${rawPhone}`}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-200 font-bold min-h-[44px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Call Hotline</span>
                  </a>

                  {/* WhatsApp chat */}
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi MarketinGlu, I would like to inquire about your digital services.')}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-bold min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Free Custom Quote */}
                <motion.button
                  {...buttonHoverMotion}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-extrabold text-center shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all min-h-[46px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Get Free Custom Quote</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </motion.button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
