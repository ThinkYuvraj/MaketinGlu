import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, PackageItem, TestimonialItem } from '../types';

export const defaultSiteConfig: SiteConfig = {
  brandName: 'Marketing LU',
  phone: '+91 96545 96149',
  email: 'marketing2glue@gmail.com',
  address: 'C5C/11-B Janak Puri, New Delhi, India - 110058',
  locationBadge: 'BASED IN NEW DELHI, INDIA',

  announcement: {
    enabled: true,
    text: '🚀 Accelerate your brand growth with Marketing LU custom digital solutions',
    ctaText: 'Claim Free Audit',
  },

  heroTitleLine1: 'DIGITAL MARKETING',
  heroTitleLine2: 'SOLUTIONS',
  heroDescription:
    'As a digital marketing agency, we are dedicated to helping businesses achieve their online marketing goals. Our team of experts is highly skilled in creating and executing effective digital marketing strategies that drive measurable results.',
  heroPrimaryCta: 'Book Free Consultation',
  heroSecondaryCta: 'Explore Portfolio',

  themeAccent: 'cyan',
  animationsEnabled: true,

  stats: {
    webDesign: 91,
    ecommerce: 95,
    design: 86,
    smo: 91,
  },

  packages: [
    {
      id: 'basic',
      name: 'Basic Package',
      tagline: 'Ideal for small businesses & emerging startups setting up their digital foundation.',
      priceNote: 'Custom quote per project scope',
      highlight: 'Starter Digital Setup',
      features: [
        { name: 'Initial Site Analysis', included: true },
        { name: 'Essential On-Page SEO', included: true },
        { name: 'Off-Page SEO & Directory Submissions', included: false },
        { name: 'Local SEO (Google Business Profile)', included: false },
        { name: 'Social Media Optimization (SMO)', included: true },
        { name: 'Creative Image Posting (12-15 Monthly)', included: true },
        { name: 'Story Sharing & Profile Setup', included: true },
        { name: 'Cover Image Graphic Design', included: true },
        { name: 'Group Activity & Community Outreach', included: false },
        { name: 'Insight Monitor Report (Monthly)', included: true },
        { name: 'Image Tagging to Friends & Followers', included: false },
        { name: 'Comment & Like Management', included: false },
        { name: 'Sponsored Ads Campaign Setup', included: false },
      ],
    },
    {
      id: 'advance',
      name: 'Advance Package',
      badge: 'MOST POPULAR',
      tagline: 'Targeted acceleration for scaling brands seeking regular organic leads and high reach.',
      popular: true,
      priceNote: 'Tailored monthly retainer',
      highlight: 'High-ROI Acceleration',
      features: [
        { name: 'Comprehensive Initial Site Analysis', included: true },
        { name: 'Advanced On-Page SEO & Keyword Architecture', included: true },
        { name: 'Off-Page SEO & Backlink Submissions', included: true },
        { name: 'Local SEO (Maps & Local Citations)', included: true },
        { name: 'Full Social Media Optimization (SMO)', included: true },
        { name: 'Creative Image Posting (20-25 Monthly)', included: true },
        { name: 'Story Sharing & Reel Visual Collaterals', included: true },
        { name: 'Cover Image & Banner Refresh', included: true },
        { name: 'Group Activity & Community Engagement', included: true },
        { name: 'Insight Monitor Report (Bi-Weekly)', included: true },
        { name: 'Image Tagging to Friends & Followers', included: true },
        { name: 'Active Comment & Like Management', included: true },
        { name: 'Sponsored Ads Campaign Guidance', included: true },
      ],
    },
    {
      id: 'pro',
      name: 'Pro Package',
      badge: 'ENTERPRISE SCALE',
      tagline: 'Full-funnel digital dominance with continuous multi-channel execution and priority oversight.',
      popular: false,
      priceNote: 'Comprehensive enterprise plan',
      highlight: 'Maximum Market Domination',
      features: [
        { name: 'Deep Technical & Architectural Site Audit', included: true },
        { name: 'Aggressive Full-Funnel On-Page & Technical SEO', included: true },
        { name: 'High-Authority Off-Page SEO & PR Outreach', included: true },
        { name: 'Multi-Location Local SEO Domination', included: true },
        { name: '360° Social Media Optimization & Management (SMO/SMM)', included: true },
        { name: 'Daily Custom Creative Image & Video Posting', included: true },
        { name: 'Priority Daily Story Sharing & Highlights', included: true },
        { name: 'Omnichannel Cover Images & Brand Asset Kit', included: true },
        { name: 'Proactive Group Activity & Strategic Tagging', included: true },
        { name: 'Weekly In-Depth Insight & ROI Monitor Reports', included: true },
        { name: 'Image Tagging & Follower Growth Campaigns', included: true },
        { name: '24/7 Comment, Review & Reputation Management', included: true },
        { name: 'Sponsored Ads Management & Funnel Optimization', included: true },
      ],
    },
  ],

  testimonials: [
    {
      id: 'lalita-1',
      name: 'Lalita Rani',
      rating: 4,
      quote: "It’s been really good working with MarketinGlu, very easy and professional. This agency has done wonderful job.",
      role: 'Verified Client',
      source: 'Website Review',
      initial: 'L',
      avatarColor: 'from-pink-500 to-rose-600',
      highlight: 'Very easy and professional',
    },
    {
      id: 'ajay-1',
      name: 'Ajay Bhutkar',
      rating: 5,
      quote: "I can proudly say that they have done a great job, i am getting a very good business through their work.",
      role: 'Business Client',
      source: 'Website Review',
      initial: 'A',
      avatarColor: 'from-cyan-500 to-blue-600',
      highlight: 'Getting a very good business',
    },
    {
      id: 'ankush-1',
      name: 'Ankush Sharma',
      rating: 4,
      quote: "Very good job team, I really like your work and quick revert.",
      role: 'Verified Client',
      source: 'Website Review',
      initial: 'A',
      avatarColor: 'from-amber-500 to-orange-600',
      highlight: 'Quick revert & great support',
    },
    {
      id: 'lalita-2',
      name: 'Lalita Rani',
      rating: 4,
      quote: "It’s been really good working with MarketinGlu, very easy and professional. This agency has done wonderful job.",
      role: 'Verified Client',
      source: 'Website Review (Carousel Rotation)',
      initial: 'L',
      avatarColor: 'from-pink-500 to-rose-600',
      highlight: 'Wonderful job',
    },
  ],
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  updatePackage: (pkg: PackageItem) => void;
  updateTestimonial: (test: TestimonialItem) => void;
  addTestimonial: (test: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'marketinglu_cms_site_config';

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultSiteConfig, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return defaultSiteConfig;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // fallback
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(defaultSiteConfig);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // fallback
    }
  };

  const updatePackage = (updatedPkg: PackageItem) => {
    setConfig((prev) => ({
      ...prev,
      packages: prev.packages.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)),
    }));
  };

  const updateTestimonial = (updatedTest: TestimonialItem) => {
    setConfig((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === updatedTest.id ? updatedTest : t)),
    }));
  };

  const addTestimonial = (newTest: TestimonialItem) => {
    setConfig((prev) => ({
      ...prev,
      testimonials: [newTest, ...prev.testimonials],
    }));
  };

  const deleteTestimonial = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        updatePackage,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}
