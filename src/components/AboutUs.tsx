import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Layers,
  MapPin,
  Lock,
  Globe,
  Compass,
  Users2,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import Container from './common/Container';
import { useSiteConfig, defaultAboutPillars, defaultAboutChecklist } from '../context/SiteConfigContext';
import { useNavigation } from '../context/NavigationContext';
import { buttonHoverMotion, cardHoverMotion } from '../lib/animations';
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

const PILLAR_ACCENTS: {
  [key: string]: { borderColor: string; iconColor: string; bgGradient: string };
} = {
  cyan: {
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-blue-500/10',
  },
  emerald: {
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-500/10',
  },
  sky: {
    borderColor: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    bgGradient: 'from-sky-500/20 to-indigo-500/10',
  },
  amber: {
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-500/10',
  },
  violet: {
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-indigo-500/10',
  },
};

export default function AboutUs({ onOpenConsultation }: AboutUsProps) {
  const { config } = useSiteConfig();
  const { navigateTo } = useNavigation();

  if (config.aboutEnabled === false) {
    return null;
  }

  const badgeText = config.aboutBadge || 'ABOUT MARKETIN GLU';
  const title1 = config.aboutTitle1 || 'Engineering Next-Gen Software &';
  const title2 = config.aboutTitle2 || 'High-Impact Digital Growth';
  const description =
    config.aboutDescription ||
    'MarketingGlu (Marketing LU) is an ISO 9001:2015 certified software solutions and digital growth agency headquartered in New Delhi. We eliminate fragmented vendors by uniting custom software architecture, web engineering, enterprise SEO, and performance marketing under one roof.';
  const story =
    config.aboutStory ||
    'Founded with a mission to replace empty marketing buzzwords with engineering precision, MarketingGlu empowers ambitious companies with bespoke web systems, sub-second page performance, transparent analytics, and predictable customer acquisition funnels.';
  const mission =
    config.aboutMission ||
    'To engineer durable, high-converting digital assets that give businesses a lasting unfair advantage in search visibility, speed, and commercial revenue.';

  const credentials = [
    {
      label: 'Agency Track Record',
      value: config.aboutYearsExperience || '8+ Years',
      detail: 'Engineering & digital growth experience',
      icon: Award,
    },
    {
      label: 'Delivered Deployments',
      value: config.aboutProjectsDelivered || '250+ Projects',
      detail: 'Turnkey websites, apps & SEO campaigns',
      icon: Layers,
    },
    {
      label: 'Client Satisfaction',
      value: config.aboutClientSatisfaction || '99% Retention',
      detail: 'Month-to-month continuous partnerships',
      icon: TrendingUp,
    },
    {
      label: 'Quality Standards',
      value: config.aboutCertification || 'ISO 9001:2015',
      detail: 'Internationally certified workflows',
      icon: ShieldCheck,
    },
  ];

  const pillars: AboutPillar[] = config.aboutPillars && config.aboutPillars.length > 0
    ? config.aboutPillars
    : defaultAboutPillars;

  const checklist: string[] = config.aboutChecklist && config.aboutChecklist.length > 0
    ? config.aboutChecklist
    : defaultAboutChecklist;

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#070b14] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Invisible anchor aliases for seamless scroll from anywhere */}
      <span id="about-us" className="absolute -top-24" />
      <span id="agency" className="absolute -top-24" />
      <span id="company" className="absolute -top-24" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-[450px] h-[450px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              {title2}
            </span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              ISO 9001:2015 Certified
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="inline-flex items-center gap-1 text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Janak Puri, New Delhi, India
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Global Client Engagements
            </span>
          </div>
        </div>

        {/* Narrative & Credentials Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-14 sm:mb-16">
          {/* Left Column: Agency Story & Mission (span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0b1428] via-[#080f1e] to-[#060a14] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Our Engineering &amp; Strategic DNA
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>{story}</p>
                <div className="p-4 rounded-2xl bg-[#040813] border border-slate-800/90 space-y-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>OUR CORE MISSION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 italic font-medium leading-relaxed">
                    "{mission}"
                  </p>
                </div>
              </div>

              {/* Dynamic Value checklist */}
              <div className="mt-6 pt-5 border-t border-slate-800 space-y-2.5">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consultation Trigger */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Need a Technical or Growth Audit?</h4>
                <p className="text-xs text-slate-400">
                  Speak directly with a senior digital marketing architect in New Delhi.
                </p>
              </div>
              <motion.button
                {...buttonHoverMotion}
                onClick={() => onOpenConsultation?.('About Us - Strategy Consultation')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-400/20 transition-all shrink-0"
              >
                <span>Book Free Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* Right Column: Dynamic Core Pillars (span 6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.iconName || 'Zap'] || Zap;
              const accent = PILLAR_ACCENTS[pillar.accent || 'cyan'] || PILLAR_ACCENTS.cyan;

              return (
                <motion.div
                  key={pillar.id}
                  {...cardHoverMotion}
                  className={`p-5 rounded-2xl bg-[#090e1c] border ${accent.borderColor} flex flex-col justify-between shadow-xl transition-all relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                        {pillar.tag}
                      </span>
                      <div className={`w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center ${accent.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>Standard in every engagement</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4 Credentials Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-12">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#0a1224] border border-slate-800/90 hover:border-cyan-500/40 transition-colors shadow-lg flex flex-col items-center text-center"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {cred.value}
                </div>
                <div className="text-xs font-bold text-cyan-300 mt-1">
                  {cred.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                  {cred.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive CTA Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d1b33] via-[#091326] to-[#070d1a] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl text-center md:text-left space-y-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
              Ready to Accelerate Your Brand’s Digital Trajectory?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore all 6 core growth disciplines or connect with our New Delhi strategy team today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <motion.button
              {...buttonHoverMotion}
              onClick={() => onOpenConsultation?.('About Us - Consultation Call')}
              className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <button
              type="button"
              onClick={() => navigateTo('#/services')}
              className="px-4 sm:px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Explore All Services</span>
            </button>

            <a
              href={`https://wa.me/+919654596149?text=${encodeURIComponent(
                'Hi MarketingGlu, I was reading your About Us page and would like to discuss a project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
