import React, { useEffect } from 'react';
import { FileCheck, ArrowLeft, Scale, ShieldAlert, Award, HelpCircle } from 'lucide-react';
import Container from '../components/common/Container';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';

export default function TermsConditionsPage() {
  const { config } = useSiteConfig();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions | MarketingGlu";
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 pt-28 sm:pt-32 pb-16 lg:pb-24">
      <Container className="max-w-4xl mx-auto">
        <button
          onClick={() => navigateTo('#/')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors text-xs font-semibold mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-400 uppercase font-semibold mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>COMMERCIAL TERMS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Last updated: January 2026. Standard service agreement terms for MarketingGlu.
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>1. Agreement to Terms</span>
              </h2>
              <p>
                By commissioning work, retaining software development, SEO, advertising, or web services from MarketingGlu, you agree to be bound by these Terms and Conditions. Individual statements of work (SOW) may supplement these provisions with project-specific scopes and milestones.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>2. Service Delivery &amp; Quality Standards</span>
              </h2>
              <p>
                MarketingGlu operates under ISO 9001:2015 certified quality workflows. We engineer high-performance digital systems, modern web platforms, and organic search campaigns following documented best practices, rigorous testing, and sub-second Core Web Vitals targets.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>3. Code Ownership &amp; IP Rights</span>
              </h2>
              <p>
                Upon settlement of project invoices according to agreed milestones, the client receives 100% full intellectual property ownership of customized software source code, digital assets, graphic templates, and advertising account setups. MarketingGlu imposes no proprietary software lock-ins.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>4. Payment Terms &amp; Retainers</span>
              </h2>
              <p>
                Development projects are billed according to defined deliverable milestones. Monthly retainer services (such as ongoing SEO, PPC management, and maintenance) operate on flexible month-to-month agreements with standard 30-day notice for modifications or cancellation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>5. Governing Law</span>
              </h2>
              <p>
                These terms are governed by and construed in accordance with the laws of New Delhi, India. Inquiries regarding legal terms should be directed to {config.email}.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
