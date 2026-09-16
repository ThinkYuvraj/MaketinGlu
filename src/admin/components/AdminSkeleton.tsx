import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface AdminSkeletonProps {
  tab?: 'titles' | 'services' | 'blogs' | 'packages' | 'sections' | 'images' | 'cases' | 'faq' | 'testimonials' | 'company' | 'design' | 'security';
}

export default function AdminSkeleton({ tab = 'titles' }: AdminSkeletonProps) {
  const getTabCategory = () => {
    switch (tab) {
      case 'titles':
      case 'company':
      case 'design':
        return 'form';
      case 'images':
        return 'media';
      case 'security':
        return 'security';
      default:
        return 'list';
    }
  };

  const getTabLabel = () => {
    switch (tab) {
      case 'titles': return 'Titles & Copywriting';
      case 'services': return 'Services Provided';
      case 'blogs': return 'Blogs & Publishing';
      case 'packages': return 'Service Packages';
      case 'sections': return 'Dynamic Sections';
      case 'images': return 'Media & Visual Assets';
      case 'cases': return 'Case Studies';
      case 'faq': return 'FAQ Knowledge Base';
      case 'testimonials': return 'Client Reviews';
      case 'company': return 'Agency & Contact Details';
      case 'design': return 'Theme Accent & Metrics';
      case 'security': return 'Admin Security';
      default: return 'Configuration';
    }
  };

  const category = getTabCategory();

  return (
    <div className="space-y-6 animate-fade-in" id="admin-panel-skeleton">
      {/* Subtle Feedback Banner with Spinning Indicator */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#060a14] border border-cyan-500/20 text-xs text-slate-300 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          </div>
          <div>
            <div className="font-semibold text-white flex items-center gap-1.5 text-xs">
              <span>Synchronizing {getTabLabel()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400">Hydrating records and live schemas...</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-cyan-400/80 bg-cyan-950/50 px-2.5 py-1 rounded-md border border-cyan-500/20">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>FAST HYDRATION</span>
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="space-y-2">
          <div className="h-6 w-48 sm:w-64 bg-slate-800/70 rounded-lg animate-pulse" />
          <div className="h-3.5 w-64 sm:w-96 bg-slate-850/60 rounded-md animate-pulse" />
        </div>
        <div className="h-9 w-32 bg-slate-800/80 rounded-xl animate-pulse self-start sm:self-auto" />
      </div>

      {/* Body Skeleton depending on category */}
      {category === 'list' && (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="p-5 rounded-2xl bg-[#060a14]/60 border border-slate-800/80 space-y-3.5 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800/80" />
                  <div className="h-4 w-40 sm:w-56 bg-slate-800 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-16 bg-slate-800/70 rounded-md" />
                  <div className="h-6 w-14 bg-slate-800/70 rounded-md" />
                </div>
              </div>
              <div className="h-3 w-5/6 bg-slate-850/80 rounded-md" />
              <div className="h-3 w-2/3 bg-slate-850/60 rounded-md" />
              <div className="pt-2 flex items-center gap-2">
                <div className="h-5 w-20 bg-slate-800/60 rounded-md" />
                <div className="h-5 w-24 bg-slate-800/60 rounded-md" />
                <div className="h-5 w-16 bg-slate-800/60 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      )}

      {category === 'form' && (
        <div className="space-y-6">
          {[1, 2].map((section) => (
            <div 
              key={section} 
              className="p-5 rounded-2xl bg-[#060a14]/60 border border-slate-800/80 space-y-4 animate-pulse"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                <div className="h-4 w-44 bg-slate-800 rounded-md" />
                <div className="h-3 w-20 bg-slate-850 rounded-md" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-slate-800/80 rounded-md" />
                  <div className="h-10 w-full bg-slate-900/90 border border-slate-800 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-slate-800/80 rounded-md" />
                  <div className="h-10 w-full bg-slate-900/90 border border-slate-800 rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-3 w-36 bg-slate-800/80 rounded-md" />
                <div className="h-20 w-full bg-slate-900/90 border border-slate-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {category === 'media' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="rounded-2xl bg-[#060a14]/60 border border-slate-800/80 overflow-hidden animate-pulse"
            >
              <div className="h-36 bg-slate-850/80" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-32 bg-slate-800 rounded-md" />
                <div className="h-3 w-48 bg-slate-850/70 rounded-md" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-7 w-20 bg-slate-800 rounded-lg" />
                  <div className="h-7 w-20 bg-slate-800 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {category === 'security' && (
        <div className="p-6 rounded-2xl bg-[#060a14]/60 border border-slate-800/80 space-y-5 animate-pulse max-w-xl">
          <div className="h-5 w-48 bg-slate-800 rounded-md" />
          <div className="h-3.5 w-72 bg-slate-850 rounded-md" />
          <div className="space-y-3 pt-2">
            <div className="h-10 w-full bg-slate-900 border border-slate-800 rounded-xl" />
            <div className="h-10 w-full bg-slate-900 border border-slate-800 rounded-xl" />
            <div className="h-10 w-36 bg-slate-800 rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
