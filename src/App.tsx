import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PerformanceStats from './components/PerformanceStats';
import CompanyExpertise from './components/CompanyExpertise';
import Packages from './components/Packages';
import CaseStudies from './components/CaseStudies';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AppointmentBanner from './components/AppointmentBanner';
import ConsultationModal from './components/ConsultationModal';
import AnimatedSection from './components/AnimatedSection';
import MobileBottomBar from './components/mobile/MobileBottomBar';
import AdminApp from './admin/AdminApp';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-white flex flex-col font-sans overflow-x-hidden w-full max-w-full relative pb-16 lg:pb-0">
      
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Website Flow: Clean, Non-Redundant, High-Readability */}
      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <AnimatedSection delayMs={0}>
          <Hero
            onOpenConsultation={() => handleOpenConsultation()}
            onExplorePortfolio={handleExplorePortfolio}
          />
        </AnimatedSection>

        {/* Section 2: Our Performance In Numbers */}
        <AnimatedSection delayMs={60}>
          <PerformanceStats />
        </AnimatedSection>

        {/* Section 3: Unified Company Expertise & Growth Disciplines */}
        <AnimatedSection id="expertise" delayMs={60}>
          <CompanyExpertise
            onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle)}
          />
        </AnimatedSection>

        {/* Section 4: Tailored Marketing Packages */}
        <AnimatedSection delayMs={60}>
          <Packages
            onSelectPackage={(pkgName) => handleOpenConsultation(`Package: ${pkgName}`)}
          />
        </AnimatedSection>

        {/* Section 5: Case Studies & Proven Results (Portfolio) */}
        <AnimatedSection delayMs={60}>
          <CaseStudies
            onOpenConsultation={() => handleOpenConsultation()}
          />
        </AnimatedSection>

        {/* Section 6: Frequently Asked Questions (FAQ) */}
        <AnimatedSection delayMs={60}>
          <FAQ />
        </AnimatedSection>

        {/* Section 8: Final High-Impact Consultation Banner (Single Strategic Placement) */}
        <AnimatedSection delayMs={60}>
          <AppointmentBanner
            id="banner-bottom"
            title="Book Your Free Strategy Consultation"
            description="Schedule a 30-minute tactical review with our senior digital architects in New Delhi. Get custom roadmap recommendations for your brand with zero obligation."
            buttonText="Reserve Free Strategy Slot"
            onOpenConsultation={() => handleOpenConsultation()}
          />
        </AnimatedSection>
      </main>

      {/* Footer with Discreet Admin Site Portal Link */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Mobile Sticky Quick Action Bar (Call, WhatsApp, Get Quote) */}
      <MobileBottomBar
        onOpenConsultation={() => handleOpenConsultation('Quick Mobile Audit')}
      />

      {/* Interactive Consultation / Quote Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        title={consultationService ? `Reserve Consultation: ${consultationService}` : "Book Your Free Consultation"}
        subtitle="Schedule a high-intensity 30-minute tactical review with our senior architects in New Delhi."
      />

      {/* Floating Discreet Admin Quick Access Pill (Bottom Left) */}
      <div className="fixed bottom-16 lg:bottom-4 left-4 z-30">
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
