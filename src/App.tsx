import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PerformanceStats from './components/PerformanceStats';
import CompanyExpertise from './components/CompanyExpertise';
import Packages from './components/Packages';
import CaseStudies from './components/CaseStudies';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import AnimatedSection from './components/AnimatedSection';
import MobileBottomBar from './components/mobile/MobileBottomBar';
import BackToTopButton from './components/common/BackToTopButton';
import AdminApp from './admin/AdminApp';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServicesIndexPage from './pages/ServicesIndexPage';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { expertiseData } from './data/expertiseData';
import CustomSectionRenderer from './components/CustomSectionRenderer';
import { SectionPosition } from './types';

function AppContent() {
  const { config } = useSiteConfig();
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
            <AnimatedSection id="home" delayMs={0} className="relative">
              <Hero
                onOpenConsultation={() => handleOpenConsultation()}
                onExplorePortfolio={handleExplorePortfolio}
              />
            </AnimatedSection>
            {renderCustomSections('after-hero')}

            {/* Section 2: Our Performance In Numbers */}
            <AnimatedSection delayMs={60} className="relative">
              <PerformanceStats />
            </AnimatedSection>
            {renderCustomSections('after-stats')}

            {/* Section 3: Unified Company Expertise & Growth Disciplines */}
            <AnimatedSection id="expertise" delayMs={60} className="relative">
              <CompanyExpertise
                onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle)}
              />
            </AnimatedSection>
            {renderCustomSections('after-expertise')}

            {/* Section 4: Tailored Marketing Packages */}
            <AnimatedSection delayMs={60} className="relative">
              <Packages
                onSelectPackage={(pkgName) => handleOpenConsultation(pkgName)}
              />
            </AnimatedSection>
            {renderCustomSections('after-packages')}

            {/* Section 5: Case Studies & Proven Results (Portfolio) */}
            <AnimatedSection delayMs={60} className="relative">
              <CaseStudies
                onOpenConsultation={() => handleOpenConsultation()}
              />
            </AnimatedSection>
            {renderCustomSections('after-cases')}

            {/* Section 6: Frequently Asked Questions (FAQ) */}
            <AnimatedSection delayMs={60} className="relative">
              <FAQ />
            </AnimatedSection>
            {renderCustomSections('after-faq')}
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
      
      <BackToTopButton />

      {/* Interactive Consultation / Quote Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={consultationService}
        title={consultationService ? `Reserve: ${consultationService.replace(/^Package:\s*/i, '')}` : "Book Free Consultation"}
        subtitle="Schedule a 30-minute tactical review with our senior architects in New Delhi."
      />
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
