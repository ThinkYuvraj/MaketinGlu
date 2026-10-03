import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Layers,
  MapPin,
  Lock,
  Compass,
  Users2,
  TrendingUp,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  ArrowRight
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

const PILLAR_ACCENTS: {
  [key: string]: { border: string; text: string; bg: string; badgeBg: string };
} = {
  cyan: {
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    bg: 'bg-cyan-950/60',
    badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
  },
  emerald: {
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/60',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
  },
  sky: {
    border: 'border-sky-500/40',
    text: 'text-sky-400',
    bg: 'bg-sky-950/60',
    badgeBg: 'bg-sky-950/80 text-sky-300 border-sky-500/40',
  },
  amber: {
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    bg: 'bg-amber-950/60',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
  },
  blue: {
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    bg: 'bg-blue-950/60',
    badgeBg: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
  },
};

export default function AboutUs({ onOpenConsultation }: AboutUsProps) {
  const { config } = useSiteConfig();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  if (config.aboutEnabled === false) {
    return null;
  }

  const badgeText = config.aboutBadge || 'ABOUT MARKETINGLU';
  const title1 = config.aboutTitle1 || 'Engineering Next-Gen Software &';
  const title2 = config.aboutTitle2 || 'High-Impact Digital Growth';
  const description =
    config.aboutDescription ||
    'MarketinGlu is an ISO 9001:2015 certified software architecture and digital growth firm headquartered in New Delhi. We eliminate fragmented agencies by uniting custom software, enterprise SEO, and performance funnels under one roof.';
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

  const pillars: AboutPillar[] = Array.from({ length: 4 }).map((_, idx) => {
    if (config.aboutPillars && config.aboutPillars[idx]) {
      return config.aboutPillars[idx];
    }
    return defaultAboutPillars[idx] || defaultAboutPillars[0];
  });

  const totalPillars = pillars.length;
  const safeIndex = totalPillars > 0 ? currentIndex % totalPillars : 0;
  const activePillar = pillars[safeIndex] || pillars[0];
  const ActiveIcon = PILLAR_ICONS[activePillar.iconName || 'Zap'] || Zap;
  const activeAccent = PILLAR_ACCENTS[activePillar.accent || 'cyan'] || PILLAR_ACCENTS.cyan;

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalPillars);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalPillars) % totalPillars);
  };

  const handleSelectPillar = (idx: number) => {
    setSlideDirection(idx > safeIndex ? 'right' : 'left');
    setCurrentIndex(idx);
  };

  // 4-Second Auto-Swipe Timer
  useEffect(() => {
    if (isPaused || totalPillars <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % totalPillars);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, totalPillars]);

  // 3D Depth Card Variants
  const card3DVariants: Variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 60 : -60,
      rotateY: direction === 'right' ? 12 : -12,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 280, damping: 28, mass: 0.7 },
        rotateY: { duration: 0.35, ease: "easeOut" },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -60 : 60,
      rotateY: direction === 'right' ? -12 : 12,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const checklist: string[] = config.aboutChecklist && config.aboutChecklist.length > 0
    ? config.aboutChecklist
    : defaultAboutChecklist;

  return (
    <section
      id="about"
      className="scroll-mt-20 lg:scroll-mt-24 relative w-full min-h-0 pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 lg:pb-14 flex flex-col justify-center items-center bg-[#070b14] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Top ambient line glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-sky-500/30 to-transparent pointer-events-none" />

      {/* Anchor targets for smooth navigation without duplicate ID collisions */}
      <span id="about-us" className="absolute -top-28 sm:-top-32 pointer-events-none" />
      <span id="agency" className="absolute -top-28 sm:-top-32 pointer-events-none" />
      <span id="company" className="absolute -top-28 sm:-top-32 pointer-events-none" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        {/* Centered Single-Frame Header Row */}
        <div className="text-center max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-3 sm:mb-4 lg:mb-5 pb-2 border-b border-slate-800/60 flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-black text-white tracking-tight leading-snug sm:leading-tight lg:whitespace-nowrap text-center">
            {title1}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-500">
              {title2}
            </span>
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto text-center line-clamp-2 lg:text-justify">
            {description}
          </p>
        </div>

        {/* 2-Column Grid: Left Agency Profile & Right 3D Caret Carousel Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-stretch">
          
          {/* Left Column: Agency Story, Mission & Metric Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-3.5 sm:p-4 rounded-lg bg-linear-to-b from-[#0a1224] to-[#070c18] border border-cyan-500/25 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 blur-2xl rounded-none pointer-events-none" />

            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-md bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Strategic DNA &amp; Core Mission
                  </h3>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-md shrink-0">
                  ISO 9001:2015
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed lg:text-justify">
                {story}
              </p>

              {/* Mission statement card */}
              <div className="p-2.5 rounded-md bg-[#040813] border border-slate-800/90 shadow-inner">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  MISSION STATEMENT
                </span>
                <p className="text-xs text-slate-200 italic font-medium leading-relaxed lg:text-justify">
                  "{mission}"
                </p>
              </div>

              {/* Value checklist */}
              <div className="grid grid-cols-1 gap-1 pt-0.5">
                {checklist.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Metric Badges in Compact 2x2 Grid */}
            <div className="grid grid-cols-2 gap-1.5 pt-2.5 mt-2.5 border-t border-slate-800/80">
              {credentials.map((cred, idx) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={idx}
                    className="p-1.5 sm:p-2 rounded-md bg-slate-900/80 border border-slate-800/90 flex items-center gap-2 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="w-5.5 h-5.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-white font-mono leading-none truncate">
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

          {/* Right Column: 3D CARET CAROUSEL FOR 4 CORE PILLARS (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Quick-Selector Floating Dock for 4 Pillars */}
            <div className="w-full max-w-full mb-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-lg bg-[#090f20]/90 backdrop-blur-2xl border border-cyan-500/30 shadow-lg">
                {pillars.map((pillar, tabIdx) => {
                  const isSelected = tabIdx === safeIndex;
                  const TabIcon = PILLAR_ICONS[pillar.iconName || 'Zap'] || Zap;

                  return (
                    <button
                      key={pillar.id || tabIdx}
                      type="button"
                      onClick={() => handleSelectPillar(tabIdx)}
                      className={`group relative flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer min-h-[32px] sm:min-h-[34px] select-none text-center ${
                        isSelected
                          ? 'text-white'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Animated Active Background Rectangle */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeAboutPillarCapsule"
                          className="absolute inset-0 rounded-md bg-linear-to-r from-cyan-500/25 via-sky-500/30 to-blue-500/25 border border-cyan-400/90 shadow-[0_0_16px_rgba(6,182,212,0.35)]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}

                      <div
                        className={`relative z-10 w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-linear-to-tr from-cyan-400 to-sky-300 text-slate-950 font-black shadow-sm'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        <TabIcon className="w-2.5 h-2.5" />
                      </div>
                      <span className="relative z-10 tracking-tight font-semibold truncate text-[10px] sm:text-xs">
                        {pillar.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Caret Carousel Wrapper */}
            <div 
              className="relative flex-1 w-full"
              style={{ perspective: 1200 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Left Floating Desktop Only Next/Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="hidden lg:flex absolute -left-3.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-lg bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret"
                aria-label="Previous strategic pillar"
                title="Previous Pillar"
              >
                <ChevronLeft className="w-3.5 h-3.5 group-hover/caret:-translate-x-0.5 transition-transform" />
              </button>

              {/* Right Floating Desktop Only Next/Prev Button */}
              <button
                type="button"
                onClick={handleNext}
                className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-lg bg-[#080d1a]/95 hover:bg-linear-to-r hover:from-sky-500 hover:to-cyan-400 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 items-center justify-center shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl group/caret"
                aria-label="Next strategic pillar"
                title="Next Pillar"
              >
                <ChevronRight className="w-3.5 h-3.5 group-hover/caret:translate-x-0.5 transition-transform" />
              </button>

              {/* 3D Animated Spotlight Pillar Card */}
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={activePillar.id || safeIndex}
                  custom={slideDirection}
                  variants={card3DVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    const swipeThreshold = 35;
                    const velocityThreshold = 180;
                    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                      handleNext();
                    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                      handlePrev();
                    }
                  }}
                  className="w-full h-full min-h-[220px] sm:min-h-[240px] rounded-lg bg-linear-to-b from-[#0e1628]/98 via-[#0a101e]/98 to-[#060a14]/98 border border-cyan-500/35 p-3.5 sm:p-4 lg:p-4.5 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  {/* Active Progress Indicator Line */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-slate-800/80 overflow-hidden">
                    <motion.div
                      key={`${activePillar.id}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0 : 4,
                        ease: "linear",
                      }}
                      className="h-full bg-linear-to-r from-sky-400 via-cyan-400 to-teal-300 shadow-sm shadow-cyan-400/50"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {/* Pillar Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                        <ActiveIcon className="w-3 h-3 text-cyan-400" />
                        <span>{activePillar.tag}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Standard Guarantee</span>
                      </span>
                    </div>

                    {/* Headline */}
                    <div>
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight leading-snug">
                        {activePillar.title}
                      </h4>
                    </div>

                    {/* Description Narrative */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 lg:text-justify">
                      {activePillar.description}
                    </p>
                  </div>

                  {/* Bottom Assurance & Verification */}
                  <div className="pt-2.5 mt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] sm:text-xs font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>100% Commercial IP &amp; Code Sovereignty</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenConsultation?.(activePillar.title)}
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-white font-bold text-[11px] sm:text-xs cursor-pointer transition-colors"
                    >
                      <span>Inquire About {activePillar.tag}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
