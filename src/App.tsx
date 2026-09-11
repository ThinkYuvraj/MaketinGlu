import { useState } from 'react';
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
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServicesIndexPage from './pages/ServicesIndexPage';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { expertiseData } from './data/expertiseData';
import { Shield } from 'lucide-react';

function AppContent() {
  const { currentRoute, navigateTo } = useNavigation();
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
    navigateTo('#/admin');
  };

  // If viewing admin portal, render dedicated AdminApp interface
  if (currentRoute.type === 'admin') {
    return <AdminApp onBackToSite={() => navigateTo('#/')} />;
  }

  // Resolve service for dedicated service detail page
  const activeService = currentRoute.type === 'service-detail'
    ? expertiseData.find(item => item.id === currentRoute.serviceId)
    : null;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-white flex flex-col font-sans overflow-x-hidden w-full max-w-full relative pb-16 lg:pb-0">
      
      {/* Top Fixed Navigation with Services dropdown */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Content Area based on Active Route */}
      <main className="flex-1">
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
        ) : (
          /* Default Main Homepage Flow */
          <>
            {/* Section 1: Hero Section */}
            <AnimatedSection id="home" delayMs={0}>
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

            {/* Section 7: Final High-Impact Consultation Banner */}
            <AnimatedSection delayMs={60}>
              <AppointmentBanner
                id="banner-bottom"
                title="Book Your Free Strategy Consultation"
                description="Schedule a 30-minute tactical review with our senior digital architects in New Delhi. Get custom roadmap recommendations for your brand with zero obligation."
                buttonText="Reserve Free Strategy Slot"
                onOpenConsultation={() => handleOpenConsultation()}
              />
            </AnimatedSection>
          </>
        )}
      </main>

      {/* Footer with Service Links and Discreet Admin Portal Link */}
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
  return (
    <SiteConfigProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </SiteConfigProvider>
  );
}
