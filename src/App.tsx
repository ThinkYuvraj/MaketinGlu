import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PerformanceStats from './components/PerformanceStats';
import AppointmentBanner from './components/AppointmentBanner';
import GrowthServices from './components/GrowthServices';
import WebsiteDesignSection from './components/WebsiteDesignSection';
import EcommerceSection from './components/EcommerceSection';
import SEOSection from './components/SEOSection';
import GraphicDesignSection from './components/GraphicDesignSection';
import PPCSection from './components/PPCSection';
import SMOSection from './components/SMOSection';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import AnimatedSection from './components/AnimatedSection';
import AdminApp from './admin/AdminApp';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { Shield, Sparkles } from 'lucide-react';

function MainWebsite() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState<string>('Digital Marketing Audit');

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
    window.location.hash = '#/admin';
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-white flex flex-col font-sans">
      
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Website Flow with Subtle Viewport Fade-In and Slide-Up Animations */}
      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <AnimatedSection delayMs={0}>
          <Hero
            onOpenConsultation={() => handleOpenConsultation()}
            onExplorePortfolio={handleExplorePortfolio}
          />
        </AnimatedSection>

        {/* Section 2: Our Performance In Numbers */}
        <AnimatedSection delayMs={80}>
          <PerformanceStats />
        </AnimatedSection>

        {/* Section 3: Appointment Banner (Mid-page) */}
        <AnimatedSection delayMs={80}>
          <AppointmentBanner
            id="banner-mid"
            title="Book Your Free Appointment Today"
            description="Transform your digital blueprint with a customized growth framework built specifically for your audience."
            buttonText="Reserve Free Slot"
            onOpenConsultation={() => handleOpenConsultation()}
          />
        </AnimatedSection>

        {/* Section 4: Comprehensive Growth Services (Capabilities) */}
        <AnimatedSection id="services" delayMs={80}>
          <GrowthServices
            onSelectService={(serviceTitle) => handleOpenConsultation(serviceTitle)}
          />
        </AnimatedSection>

        {/* Section 4a: Custom Website Design */}
        <AnimatedSection id="web-design" delayMs={80}>
          <WebsiteDesignSection
            onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle || 'Website Design & Web Development')}
          />
        </AnimatedSection>

        {/* Section 4b: Specialized E-Commerce Website Design */}
        <AnimatedSection id="ecommerce" delayMs={80}>
          <EcommerceSection
            onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle || 'E-Commerce Website Design')}
          />
        </AnimatedSection>

        {/* Section 4c: Search Engine Optimization (SEO) */}
        <AnimatedSection id="seo" delayMs={80}>
          <SEOSection
            onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle || 'SEO (Search Engine Optimization)')}
          />
        </AnimatedSection>

        {/* Section 4d: Graphic Design & Visual Branding */}
        <AnimatedSection id="graphic-design" delayMs={80}>
          <GraphicDesignSection
            onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle || 'Graphic Design & Brand Identity')}
          />
        </AnimatedSection>

        {/* Section 4e: Pay-Per-Click Advertising (PPC) */}
        <AnimatedSection id="ppc" delayMs={80}>
          <PPCSection
            onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle || 'PPC & Paid Search Advertising')}
          />
        </AnimatedSection>

        {/* Section 4f: Social Media Optimization (SMO) */}
        <AnimatedSection id="smo" delayMs={80}>
          <SMOSection
            onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle || 'SMO (Social Media Optimization)')}
          />
        </AnimatedSection>

        {/* Section 5: Marketing LU Packages & Plans */}
        <AnimatedSection delayMs={80}>
          <Packages
            onSelectPackage={(pkgName) => handleOpenConsultation(`Package: ${pkgName}`)}
          />
        </AnimatedSection>

        {/* Section 6: Our Clients' Success Stories (Testimonials) */}
        <AnimatedSection delayMs={80}>
          <Testimonials />
        </AnimatedSection>

        {/* Section 7: Case Studies & Recent Work (Portfolio) */}
        <AnimatedSection delayMs={80}>
          <CaseStudies
            onOpenConsultation={() => handleOpenConsultation()}
          />
        </AnimatedSection>

        {/* Section 8: Frequently Asked Questions (FAQ) */}
        <AnimatedSection delayMs={80}>
          <FAQ />
        </AnimatedSection>

        {/* Section 9: Appointment Banner (Bottom) */}
        <AnimatedSection delayMs={80}>
          <AppointmentBanner
            id="banner-bottom"
            title="Book Your Free Appointment Today"
            description="Schedule a high-intensity 30-minute tactical review with our senior architects in New Delhi. No obligation."
            buttonText="Reserve consultation"
            onOpenConsultation={() => handleOpenConsultation()}
          />
        </AnimatedSection>
      </main>

      {/* Footer with Discreet Admin Site Portal Link */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Interactive Consultation / Quote Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        title={consultationService ? `Reserve Consultation: ${consultationService}` : "Book Your Free Consultation"}
        subtitle="Schedule a high-intensity 30-minute tactical review with our senior architects in New Delhi."
      />

      {/* Floating Discreet Admin Quick Access Pill (Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-30">
        <button
          onClick={navigateToAdmin}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 text-xs shadow-lg backdrop-blur-md transition-all cursor-pointer"
          title="Open Admin Login & UI/UX Studio"
        >
          <Shield className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-[11px] hidden sm:inline">Admin Studio</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'public' | 'admin'>(() => {
    const hash = window.location.hash.toLowerCase();
    return hash === '#/admin' || hash === '#admin' || hash === '#/login' ? 'admin' : 'public';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#/admin' || hash === '#admin' || hash === '#/login') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('public');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToPublic = () => {
    window.location.hash = '';
    setCurrentRoute('public');
  };

  return (
    <SiteConfigProvider>
      {currentRoute === 'admin' ? (
        <AdminApp onBackToSite={handleNavigateToPublic} />
      ) : (
        <MainWebsite />
      )}
    </SiteConfigProvider>
  );
}
