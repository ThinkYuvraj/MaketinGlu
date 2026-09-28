import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  Layers, 
  MessageSquare,
  TrendingUp,
  Package,
  FolderGit2,
  HelpCircle,
  BookOpen,
  Star
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
import { expertiseData, getExpertiseIcon } from '../data/expertiseData';
import Logo from './Logo';
import { buttonHoverMotion, standardEase } from '../lib/animations';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const { config } = useSiteConfig();
  const { currentRoute, navigateTo, navigateToService } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navServices = config.services && config.services.length > 0 ? config.services : expertiseData;

  // Smart Hide/Show on Scroll: Hides when scrolling down, shows when scrolling up or at top
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 20);

          if (mobileMenuOpen) {
            setVisible(true);
          } else if (currentScrollY < 50) {
            setVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down -> hide navbar smoothly
            setVisible(false);
            setServicesDropdownOpen(false);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up -> show navbar
            setVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

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
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled 
            ? 'bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40' 
            : 'bg-[#070b14]/85 backdrop-blur-sm'
        }`}
      >
        {/* Top Announcement Bar (Configurable in Admin Studio) */}
        {config.announcement.enabled && (
          <div className="bg-gradient-to-r from-sky-950 via-[#0a1b2d] to-cyan-950 border-b border-cyan-500/20 py-1.5 px-3 sm:px-4 text-center text-[11px] sm:text-xs">
            <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-14 flex items-center justify-center gap-1.5 sm:gap-2 text-slate-200">
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

        <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-14 py-2.5 sm:py-3.5 flex items-center justify-between">
          
          {/* Brand Logo with White Background Badge & Typography */}
          <button
            onClick={() => handleNavClick('#/')}
            className="flex items-center gap-2 sm:gap-2.5 group transition-transform active:scale-95 cursor-pointer bg-transparent border-0 p-0"
            id="nav-brand-logo"
            aria-label="Go to Home"
          >
            <Logo variant="light-badge" size="md" />
            <span className="text-lg sm:text-xl font-black tracking-tight flex items-center">
              <span className="text-white italic">MARKETIN</span>
              <span className="text-blue-500 not-italic">GLU</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('#/')}
              className={`hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium ${
                currentRoute.type === 'home' && !window.location.hash.includes('#') ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1.5 hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium ${
                  currentRoute.type === 'service-detail' || currentRoute.type === 'services-index' ? 'text-cyan-400 font-semibold' : ''
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 sm:w-88 mt-2 bg-slate-950 border border-cyan-500/40 rounded-2xl p-3 shadow-2xl shadow-black z-50"
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
                                ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300'
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
                        className="w-full py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md shadow-cyan-400/20 cursor-pointer flex items-center justify-center gap-2 group/btn min-h-[42px]"
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

            <button
              onClick={() => handleNavClick('#growth')}
              className="hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium"
            >
              Performance
            </button>
            <button
              onClick={() => handleNavClick('#packages')}
              className="hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium"
            >
              Packages
            </button>
            <button
              onClick={() => handleNavClick('#cases')}
              className="hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium"
            >
              Portfolio
            </button>
            <button
              onClick={() => handleNavClick('#testimonials')}
              className="hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium"
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('#/blogs')}
              className={`hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium ${
                currentRoute.type === 'blogs' || currentRoute.type === 'blog-detail' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Blogs
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="hover:text-cyan-400 transition-colors duration-200 py-1 cursor-pointer font-medium"
            >
              FAQs
            </button>
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
              className="px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-xs md:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap min-h-[42px] flex items-center justify-center"
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
      </header>

      {/* Full-Feature Mobile / Tablet Slide-out Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Slide-in Navigation Panel from Right */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative z-50 w-full max-w-sm sm:max-w-md h-full bg-[#080d1a] border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/80">
                <button
                  onClick={() => handleNavClick('#/')}
                  className="flex items-center gap-2 text-left cursor-pointer"
                >
                  <Logo variant="light-badge" size="sm" />
                  <span className="text-base font-black tracking-tight">
                    <span className="text-white italic">MARKETIN</span>
                    <span className="text-blue-500 not-italic">GLU</span>
                  </span>
                </button>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Nav Items (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 custom-scrollbar">
                <button
                  onClick={() => handleNavClick('#/')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Home</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>

                {/* Services Accordion Submenu */}
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/40 overflow-hidden">
                  <button
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className="w-full flex items-center justify-between p-3 text-cyan-300 text-sm font-bold cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span>Core Services</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesExpanded ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                  </button>

                  {mobileServicesExpanded && (
                    <div className="px-3 pb-3 pt-1 space-y-1 bg-slate-950/40 border-t border-slate-800/60">
                      {navServices.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigateToService(item.id);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 text-left text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <span className="truncate">{item.tabLabel}</span>
                          <span className="text-[10px] text-cyan-400 shrink-0 font-mono ml-2">&rarr;</span>
                        </button>
                      ))}
                      <button
                        onClick={() => handleNavClick('#/services')}
                        className="w-full py-2.5 px-3 mt-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-center text-xs font-bold transition-all shadow-md shadow-cyan-400/20 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Layers className="w-3.5 h-3.5 text-slate-950" />
                        <span>All Services Directory</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleNavClick('#growth')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span>Performance Metrics</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  onClick={() => handleNavClick('#packages')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <Package className="w-4 h-4" />
                    </div>
                    <span>Service Packages</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  onClick={() => handleNavClick('#cases')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <span>Portfolio &amp; Work</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  onClick={() => handleNavClick('#testimonials')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <Star className="w-4 h-4" />
                    </div>
                    <span>Client Reviews</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  onClick={() => handleNavClick('#/blogs')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span>Blogs &amp; Insights</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>

                <button
                  onClick={() => handleNavClick('#faq')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-cyan-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span>FAQs</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Drawer Bottom Quick Action CTA Area */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/90 space-y-2.5">
                <a 
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-cyan-300 font-semibold"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-bold">{config.phone}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">Call Now</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 text-sm font-black shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Free Custom Quote</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
