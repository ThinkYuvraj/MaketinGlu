import React from 'react';
import { Building2, Phone, Mail, MapPin, Globe } from 'lucide-react';

interface CompanyTabProps {
  formData: {
    brandName: string;
    phone: string;
    email: string;
    address: string;
    locationBadge: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function CompanyTab({ formData, setFormData }: CompanyTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Building2 className="w-5 h-5 text-cyan-400" />
          <span>Agency Credentials & Contact Coordinates</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage brand name, contact numbers, email addresses, and geographical badges displayed in navigation bars, footers, and contact forms.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
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
    </div>
  );
}
