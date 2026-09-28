import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  Layers,
  MapPin,
  Lock,
  Compass,
  Users2,
  TrendingUp,
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import Container from './common/Container';
import { useSiteConfig, defaultAboutPillars, defaultAboutChecklist } from '../context/SiteConfigContext';
import { AboutPillar } from '../types';

interface AboutUsProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

const PILLAR_ICONS: { [key: string]: React.ElementType } = {
  Zap,
  Lock,
  Compass,
  Users2,
  ShieldCheck,
  Sparkles,
  Layers,
  TrendingUp,
  Award,
  CheckCircle2,
  HeartHandshake,
};

// Strict: Zero purple gradients (following design rules)
const PILLAR_ACCENTS: {
  [key: string]: { border: string; text: string; bg: string };
} = {
  cyan: {
    border: 'border-cyan-500/30 hover:border-cyan-400/60',
    text: 'text-cyan-400',
    bg: 'bg-cyan-950/40',
  },
  emerald: {
    border: 'border-emerald-500/30 hover:border-emerald-400/60',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
  },
  sky: {
    border: 'border-sky-500/30 hover:border-sky-400/60',
    text: 'text-sky-400',
    bg: 'bg-sky-950/40',
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-400/60',
    text: 'text-amber-400',
    bg: 'bg-amber-950/40',
  },
  blue: {
    border: 'border-blue-500/30 hover:border-blue-400/60',
    text: 'text-blue-400',
    bg: 'bg-blue-950/40',
  },
};

export default function AboutUs({ onOpenConsultation }: AboutUsProps) {
  const { config } = useSiteConfig();

  if (config.aboutEnabled === false) {
    return null;
  }

  const badgeText = config.aboutBadge || 'ABOUT MARKETIN GLU';
  const title1 = config.aboutTitle1 || 'Engineering Next-Gen Software &';
  const title2 = config.aboutTitle2 || 'High-Impact Digital Growth';
  const description =
    config.aboutDescription ||
    'MarketingGlu is an ISO 9001:2015 certified software architecture and digital growth firm headquartered in New Delhi. We eliminate fragmented agencies by uniting custom software, enterprise SEO, and performance funnels under one roof.';
  const story =
    config.aboutStory ||
    'Founded to replace empty agency buzzwords with engineering precision, we deliver sub-second platforms, verifiable search dominance, and predictable customer acquisition with 100% client code and IP sovereignty.';
  const mission =
    config.aboutMission ||
    'To engineer durable, high-converting digital assets that grant businesses an unfair, lasting advantage in search visibility, speed, and revenue.';

  const credentials = [
    {
      label: 'Experience',
      value: config.aboutYearsExperience || '8+ Years',
      icon: Award,
    },
    {
      label: 'Deployments',
      value: config.aboutProjectsDelivered || '250+ Projects',
      icon: Layers,
    },
    {
      label: 'Retention',
      value: config.aboutClientSatisfaction || '99% Retention',
      icon: TrendingUp,
    },
    {
      label: 'Quality Standard',
      value: config.aboutCertification || 'ISO 9001:2015',
      icon: ShieldCheck,
    },
  ];

  const pillars: AboutPillar[] = config.aboutPillars && config.aboutPillars.length > 0
    ? config.aboutPillars.slice(0, 4)
    : defaultAboutPillars.slice(0, 4);

  const checklist: string[] = config.aboutChecklist && config.aboutChecklist.length > 0
    ? config.aboutChecklist
    : defaultAboutChecklist;

  const rawPhone = config.phone.replace(/[^0-9+]/g, '');
  const whatsappNumber = rawPhone.replace('+', '');

  return (
    <section
      id="about"
      className="scroll-mt-20 lg:scroll-mt-24 relative py-10 sm:py-12 lg:py-14 bg-[#070b14] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Anchor targets for smooth navigation without duplicate ID collisions */}
      <span id="about-us" className="absolute -top-24 pointer-events-none" />
      <span id="agency" className="absolute -top-24 pointer-events-none" />
      <span id="company" className="absolute -top-24 pointer-events-none" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-7xl mx-auto">
        {/* Compact Single-Frame Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-slate-800/60">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{badgeText}</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-slate-300">ISO 9001:2015</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-cyan-300 flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                NEW DELHI
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {title1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                {title2}
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Quick Header Actions - Crisp rounded-xl buttons (no pill buttons) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hi MarketingGlu, I would like to consult with your New Delhi strategy team.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenConsultation?.('About Us - Consultation')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-400/20 cursor-pointer"
            >
              <span>Book Strategy Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Compact Single-Frame Grid: Left Agency Profile & Right 4 Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Column: Agency Story, Mission & 4 Metric Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0a1224] to-[#070c18] border border-cyan-500/25 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 blur-2xl rounded-full pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Strategic DNA &amp; Core Mission
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {story}
              </p>

              {/* Mission statement card */}
              <div className="p-3 rounded-xl bg-[#040813] border border-slate-800 text-xs text-slate-200 italic font-medium leading-relaxed">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 not-italic block mb-1">
                  MISSION STATEMENT
                </span>
                "{mission}"
              </div>

              {/* Compact Value checklist */}
              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {checklist.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Metric Badges in Compact 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-4 mt-4 border-t border-slate-800/80">
              {credentials.map((cred, idx) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-black text-white font-mono leading-none truncate">
                        {cred.value}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">
                        {cred.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 4 Core Pillars in Clean 2x2 Layout (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 h-full">
            {pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.iconName || 'Zap'] || Zap;
              const accent = PILLAR_ACCENTS[pillar.accent || 'cyan'] || PILLAR_ACCENTS.cyan;

              return (
                <div
                  key={pillar.id}
                  className={`p-4 sm:p-5 rounded-2xl bg-[#090e1c] border ${accent.border} flex flex-col justify-between shadow-lg transition-all hover:bg-[#0b1224] relative overflow-hidden group h-full`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                        {pillar.tag}
                      </span>
                      <div className={`w-7 h-7 rounded-lg ${accent.bg} border border-slate-800 flex items-center justify-center ${accent.text} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug group-hover:text-cyan-200 transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-cyan-300/90 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      Standard Guarantee
                    </span>
                    <span className="font-mono text-slate-500">100% Verified</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
