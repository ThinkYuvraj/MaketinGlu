import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import Container from '../components/common/Container';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';

export default function PrivacyPolicyPage() {
  const { config } = useSiteConfig();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | MarketinGlu";
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-12 lg:py-20">
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
              <Shield className="w-3.5 h-3.5" />
              <span>LEGAL &amp; COMPLIANCE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Last updated: January 2026. Effective for MarketingGlu and associated digital services.
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>1. Overview and Commitment</span>
              </h2>
              <p>
                MarketingGlu ("we", "us", or "our"), located in Janak Puri, New Delhi, India, is committed to safeguarding client privacy and proprietary commercial data. This Privacy Policy details how we collect, store, process, and protect your information when engaging our software engineering, web development, SEO, and performance marketing services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>2. Information We Collect</span>
              </h2>
              <p>
                When inquiring about or using our services, you may provide business contact details such as name, corporate email address, phone number, website URL, and project requirements. For clients engaging in technical audits or digital advertising, we may access analytical credentials solely for campaign management and optimization under direct authorization.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>3. Use of Information</span>
              </h2>
              <p>
                We use collected information strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>Deliver bespoke software, website design, and growth marketing services.</li>
                <li>Conduct technical audits, Core Web Vitals assessments, and SEO optimization.</li>
                <li>Communicate project deliverables, sprint updates, and performance analytics.</li>
                <li>Provide transparent client billing and invoice documentation.</li>
              </ul>
              <p className="mt-2">
                We never sell, rent, or monetize client data, email lists, or proprietary business intelligence to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>4. Intellectual Property &amp; Data Sovereignty</span>
              </h2>
              <p>
                Under our standard commercial engagements, clients retain 100% legal ownership of their domains, software codebase, media assets, tracking setups, and analytics data. We operate with strict confidentiality agreements.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>5. Contact Our Privacy Team</span>
              </h2>
              <p>
                For questions regarding data protection, please contact:
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 font-mono text-xs">
                <div>MarketinGlu Legal &amp; Compliance</div>
                <div>Address: {config.address}</div>
                <div>Email: {config.email}</div>
                <div>Phone: {config.phone}</div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
