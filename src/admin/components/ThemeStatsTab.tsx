import React from 'react';
import { Palette, BarChart2, Check, Zap } from 'lucide-react';

interface ThemeStatsTabProps {
  formData: {
    themeAccent: string;
    animationsEnabled: boolean;
    webDesignStat: number;
    ecommerceStat: number;
    designStat: number;
    smoStat: number;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const COLOR_OPTIONS = [
  { id: 'cyan', name: 'Electric Cyan', class: 'bg-cyan-500', ring: 'ring-cyan-500' },
  { id: 'blue', name: 'Deep Sky Blue', class: 'bg-sky-500', ring: 'ring-sky-500' },
  { id: 'emerald', name: 'Vibrant Emerald', class: 'bg-emerald-500', ring: 'ring-emerald-500' },
  { id: 'violet', name: 'Cosmic Violet', class: 'bg-violet-500', ring: 'ring-violet-500' },
  { id: 'amber', name: 'Sunset Amber', class: 'bg-amber-500', ring: 'ring-amber-500' },
];

export default function ThemeStatsTab({ formData, setFormData }: ThemeStatsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Palette className="w-5 h-5 text-cyan-400" />
          <span>Styling, FX & Expertise Statistics</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Adjust visual theme accents, fluid transitions, and competency metrics.
        </p>
      </div>

      {/* Theme Accent Color */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Accent Color Palette</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {COLOR_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFormData({ ...formData, themeAccent: opt.id })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                formData.themeAccent === opt.id
                  ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`w-7 h-7 rounded-full ${opt.class} flex items-center justify-center`}>
                {formData.themeAccent === opt.id && <Check className="w-4 h-4 text-slate-950 font-bold" />}
              </div>
              <span className="text-xs font-semibold text-slate-200">{opt.name}</span>
            </button>
          ))}
        </div>

        {/* Motion animations toggle */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Interface Micro-Animations</div>
            <div className="text-[11px] text-slate-400">Enable staggered fades and smooth scroll interactions</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.animationsEnabled}
              onChange={(e) => setFormData({ ...formData, animationsEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>
      </div>

      {/* Expertise Progress Bars */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a1120] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span>Core Domain Proficiency Stats (%)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Web Development & Code Architecture</span>
              <span className="text-cyan-400 font-mono">{formData.webDesignStat}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.webDesignStat}
              onChange={(e) => setFormData({ ...formData, webDesignStat: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>E-commerce Funnel Conversion</span>
              <span className="text-cyan-400 font-mono">{formData.ecommerceStat}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.ecommerceStat}
              onChange={(e) => setFormData({ ...formData, ecommerceStat: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Design & Creative Conversion Assets</span>
              <span className="text-cyan-400 font-mono">{formData.designStat}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.designStat}
              onChange={(e) => setFormData({ ...formData, designStat: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Social Media & Influencer Reach</span>
              <span className="text-cyan-400 font-mono">{formData.smoStat}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.smoStat}
              onChange={(e) => setFormData({ ...formData, smoStat: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
