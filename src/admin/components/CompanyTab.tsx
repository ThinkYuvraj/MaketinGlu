import React from 'react';
import { Building2, Phone, Mail, MapPin, Globe, Sparkles, Award, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

interface CompanyTabProps {
  formData: {
    brandName: string;
    phone: string;
    email: string;
    address: string;
    locationBadge: string;

    // About Us fields
    aboutBadge?: string;
    aboutTitle1?: string;
    aboutTitle2?: string;
    aboutDescription?: string;
    aboutStory?: string;
    aboutMission?: string;
    aboutYearsExperience?: string;
    aboutProjectsDelivered?: string;
    aboutClientSatisfaction?: string;
    aboutCertification?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function CompanyTab({ formData, setFormData }: CompanyTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Building2 className="w-5 h-5 text-cyan-400" />
          <span>Agency Credentials & About Us</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage brand name, contact coordinates, and the complete About Us story and credentials displayed on the public site.
        </p>
      </div>

      {/* 1. Brand & Contact Coordinates */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Globe className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Brand &amp; Headquarters Coordinates</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agency / Brand Name</span>
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Location Badge Text</span>
            </label>
            <input
              type="text"
              value={formData.locationBadge}
              onChange={(e) => setFormData({ ...formData, locationBadge: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Phone / WhatsApp Line</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Inquiries Email</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Physical Address / Headquarters</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. About Us Section Content */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <div>
            <h3 className="text-sm font-bold text-white">About Us Section Content</h3>
            <p className="text-[11px] text-slate-400">Controls the dedicated About Us section on the home page (#about).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Section Badge Text
            </label>
            <input
              type="text"
              value={formData.aboutBadge || ''}
              onChange={(e) => setFormData({ ...formData, aboutBadge: e.target.value })}
              placeholder="ABOUT MARKETIN GLU"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              About Heading (Prefix)
            </label>
            <input
              type="text"
              value={formData.aboutTitle1 || ''}
              onChange={(e) => setFormData({ ...formData, aboutTitle1: e.target.value })}
              placeholder="Engineering Next-Gen Software &"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              About Heading (Gradient Highlight)
            </label>
            <input
              type="text"
              value={formData.aboutTitle2 || ''}
              onChange={(e) => setFormData({ ...formData, aboutTitle2: e.target.value })}
              placeholder="High-Impact Digital Growth"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Executive Summary Description
            </label>
            <textarea
              rows={3}
              value={formData.aboutDescription || ''}
              onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Agency Story &amp; Philosophy
            </label>
            <textarea
              rows={3}
              value={formData.aboutStory || ''}
              onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Mission Statement</span>
            </label>
            <input
              type="text"
              value={formData.aboutMission || ''}
              onChange={(e) => setFormData({ ...formData, aboutMission: e.target.value })}
              placeholder="To engineer durable, high-converting digital assets..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Years of Experience Badge</span>
            </label>
            <input
              type="text"
              value={formData.aboutYearsExperience || ''}
              onChange={(e) => setFormData({ ...formData, aboutYearsExperience: e.target.value })}
              placeholder="8+ Years"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Projects Delivered Badge</span>
            </label>
            <input
              type="text"
              value={formData.aboutProjectsDelivered || ''}
              onChange={(e) => setFormData({ ...formData, aboutProjectsDelivered: e.target.value })}
              placeholder="250+ Projects"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client Retention / Satisfaction</span>
            </label>
            <input
              type="text"
              value={formData.aboutClientSatisfaction || ''}
              onChange={(e) => setFormData({ ...formData, aboutClientSatisfaction: e.target.value })}
              placeholder="99% Retention"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quality Certification</span>
            </label>
            <input
              type="text"
              value={formData.aboutCertification || ''}
              onChange={(e) => setFormData({ ...formData, aboutCertification: e.target.value })}
              placeholder="ISO 9001:2015 Certified"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
