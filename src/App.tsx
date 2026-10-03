import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PerformanceStats from './components/PerformanceStats';
import AnimatedSection from './components/AnimatedSection';
import MobileBottomBar from './components/mobile/MobileBottomBar';
import BackToTopButton from './components/common/BackToTopButton';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import SEOHead from './components/common/SEOHead';
import { expertiseData } from './data/expertiseData';
import CustomSectionRenderer from './components/CustomSectionRenderer';
import { SectionPosition } from './types';
import { pageTransitionVariants } from './lib/animations';
import Preloader from './components/Preloader';
import { useSmoothScroll, scrollToTop } from './lib/useSmoothScroll';
import { useBarbaTransitions } from './lib/useBarbaTransitions';

// Lazy-loaded Below-the-Fold Components & Modals
const AboutUs = lazy(() => import('./components/AboutUs'));
const CompanyExpertise = lazy(() => import('./components/CompanyExpertise'));
const Packages = lazy(() => import('./components/Packages'));
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const ConsultationModal = lazy(() => import('./components/ConsultationModal'));

// Lazy-loaded Secondary Routes / Pages
const AdminApp = lazy(() => import('./admin/AdminApp'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ServicesIndexPage = lazy(() => import('./pages/ServicesIndexPage'));
const PackagesIndexPage = lazy(() => import('./pages/PackagesIndexPage'));
const PackageDetailPage = lazy(() => import('./pages/PackageDetailPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));

// Lightweight sleek loading placeholder for lazy components
function SectionLoadingFallback() {
  return (
    <div className="py-12 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
    </div>
  );
}

function AppContent() {
  useSmoothScroll();
  const { config } = useSiteConfig();
  const { currentRoute, navigateTo } = useNavigation();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState<string>('Digital Marketing Audit');
  const [showPreloader, setShowPreloader] = useState(true);

  // Force strict scroll to top landing on initial mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    scrollToTop(true);
  }, []);

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setConsultationService(serviceName);
    }
    setIsConsultationOpen(true);
  };

  const handleExplorePortfolio = () => {
    const el = document.getElementById('cases');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToAdmin = () => {
    navigateTo('#/admin');
  };

  const renderCustomSections = (position: SectionPosition) => {
    if (!config.customSections) return null;
    return config.customSections
      .filter((s) => s.enabled && s.position === position)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((section) => (
        <AnimatedSection key={section.id} delayMs={60} className="relative">
          <CustomSectionRenderer
            section={section}
            onOpenConsultation={(topic) => handleOpenConsultation(topic)}
          />
        </AnimatedSection>
      ));
  };

  // Determine unique transition key for each page route
  const routeKey = currentRoute.type === 'service-detail'
    ? `service-${currentRoute.serviceId || 'unknown'}`
    : currentRoute.type === 'blog-detail'
    ? `blog-${currentRoute.blogSlug || 'unknown'}`
    : currentRoute.type;

  // Initialize Barba.js transition hooks
  useBarbaTransitions(routeKey);

  // If viewing admin portal, render dedicated AdminApp interface with smooth transition
  if (currentRoute.type === 'admin') {
    return (
      <div data-barba="wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key="admin-portal"
            data-barba="container"
            data-barba-namespace="admin"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <Suspense fallback={<SectionLoadingFallback />}>
              <AdminApp onBackToSite={() => navigateTo('#/')} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Resolve service for dedicated service detail page
  const availableServices = config.services && config.services.length > 0 ? config.services : expertiseData;
  const activeService = currentRoute.type === 'service-detail'
    ? availableServices.find(item => item.id === currentRoute.serviceId)
    : null;

  return (
    <div 
      data-barba="wrapper"
      className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-white flex flex-col font-sans overflow-x-hidden w-full max-w-full relative pb-16 lg:pb-0"
    >
      {/* Dynamic Meta & Schema Head Manager */}
      <SEOHead />

      {/* Sleek Website Initial Loading Screen */}
      {showPreloader && (
        <Preloader 
          onComplete={() => {
            setShowPreloader(false);
            if (window.location.hash && !window.location.hash.startsWith('#/')) {
              window.history.replaceState(null, '', window.location.pathname);
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            scrollToTop(true);
            const resetToHero = () => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              const lenis = (window as any).__lenis;
              const heroEl = document.getElementById('hero-section') || document.getElementById('home');
              if (lenis) {
                lenis.scrollTo(0, { immediate: true });
              } else if (heroEl) {
                heroEl.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
              }
            };
            requestAnimationFrame(resetToHero);
            setTimeout(resetToHero, 80);
            setTimeout(resetToHero, 200);
          }} 
          minDurationMs={1000} 
        />
      )}
      
      {/* Top Fixed Navigation with Services dropdown */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Content Area based on Active Route with Barba.js container transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={routeKey}
            data-barba="container"
            data-barba-namespace={routeKey}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <Suspense fallback={<SectionLoadingFallback />}>
              {currentRoute.type === 'service-detail' && activeService ? (
                /* Dedicated Service Page (e.g. #/services/web-design) */
                <ServiceDetailPage 
                  service={activeService} 
                  onOpenConsultation={handleOpenConsultation} 
                />
              ) : currentRoute.type === 'services-index' ? (
                /* Dedicated All 6 Services Directory (#/services) */
                <ServicesIndexPage 
                  onOpenConsultation={handleOpenConsultation} 
                />
              ) : currentRoute.type === 'packages-index' ? (
                /* Dedicated All Packages Directory (#/packages) */
                <PackagesIndexPage 
                  onOpenConsultation={handleOpenConsultation} 
                />
              ) : currentRoute.type === 'package-detail' ? (
                /* Dedicated Package Scope Detail Page (#/packages/:id) */
                <PackageDetailPage 
                  packageId={currentRoute.packageId}
                  onOpenConsultation={handleOpenConsultation} 
                />
              ) : currentRoute.type === 'blogs' ? (
                /* Dedicated Blogs & Resources Page (#/blogs) */
                <BlogsPage 
                  onOpenConsultation={handleOpenConsultation} 
                />
              ) : currentRoute.type === 'blog-detail' ? (
                /* Dedicated Blog Article Detail Reader (#/blogs/:slug) */
                <BlogDetailPage 
                  slug={currentRoute.blogSlug} 
                  onOpenConsultation={handleOpenConsultation} 
                />
              ) : currentRoute.type === 'privacy' ? (
                /* Dedicated Legal: Privacy Policy (#/privacy) */
                <PrivacyPolicyPage />
              ) : currentRoute.type === 'terms' ? (
                /* Dedicated Legal: Terms & Conditions (#/terms) */
                <TermsConditionsPage />
              ) : (
                /* Default Main Homepage Flow with subtle animated sections */
                <>
                  {/* Section 1: Hero Section */}
                  {config.heroEnabled !== false && (
                    <AnimatedSection id="home" delayMs={0} className="relative w-full">
                      <Hero
                        onOpenConsultation={() => handleOpenConsultation()}
                        onExplorePortfolio={handleExplorePortfolio}
                      />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-hero')}

                  {/* Section 2: Our Performance In Numbers */}
                  {config.statsEnabled !== false && (
                    <AnimatedSection id="growth" delayMs={60} className="relative">
                      <PerformanceStats />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-stats')}

                  {/* Section 3: About Us & Agency Mission */}
                  {config.aboutEnabled !== false && (
                    <AnimatedSection id="about" delayMs={60} className="relative">
                      <AboutUs onOpenConsultation={handleOpenConsultation} />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-about')}

                  {/* Section 4: Unified Company Expertise & Growth Disciplines */}
                  {config.servicesEnabled !== false && (
                    <AnimatedSection id="expertise" delayMs={60} className="relative">
                      <CompanyExpertise
                        onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle)}
                      />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-expertise')}

                  {/* Section 5: Tailored Marketing Packages */}
                  {config.packagesEnabled !== false && (
                    <AnimatedSection id="packages" delayMs={60} className="relative">
                      <Packages
                        onSelectPackage={(pkgName) => handleOpenConsultation(pkgName)}
                      />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-packages')}

                  {/* Section 6: Case Studies & Proven Results (Portfolio) */}
                  {config.casesEnabled !== false && (
                    <AnimatedSection id="cases" delayMs={60} className="relative">
                      <CaseStudies
                        onOpenConsultation={() => handleOpenConsultation()}
                      />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-cases')}

                  {/* Section 7: Client Testimonials & Verified Reviews */}
                  {config.testimonialsEnabled !== false && (
                    <AnimatedSection id="testimonials" delayMs={60} className="relative">
                      <Testimonials />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-testimonials')}

                  {/* Section 8: Frequently Asked Questions (FAQ) */}
                  {config.faqEnabled !== false && (
                    <AnimatedSection id="faq" delayMs={60} className="relative">
                      <FAQ />
                    </AnimatedSection>
                  )}
                  {renderCustomSections('after-faq')}
                </>
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with Service Links and Discreet Admin Portal Link */}
      <Suspense fallback={null}>
        <Footer
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenAdmin={navigateToAdmin}
        />
      </Suspense>

      {/* Mobile Sticky Quick Action Bar (Call, WhatsApp, Get Quote) */}
      <MobileBottomBar
        onOpenConsultation={() => handleOpenConsultation('Quick Mobile Audit')}
      />
      
      <BackToTopButton />

      {/* Interactive Consultation / Quote Modal */}
      <Suspense fallback={null}>
        {isConsultationOpen && (
          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
            initialService={consultationService}
            title={consultationService ? `Reserve: ${consultationService.replace(/^Package:\s*/i, '')}` : "Book Free Consultation"}
            subtitle="Schedule a 30-minute tactical review with our senior architects in New Delhi."
          />
        )}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </SiteConfigProvider>
  );
}
