import React, { createContext, useContext, useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { SiteConfig, PackageItem, TestimonialItem, CaseStudy, FAQItem, CustomSection, BlogPost, AboutPillar } from '../types';
import { caseStudiesData } from '../data/caseStudiesData';
import { defaultFaqs } from '../data/faqData';
import { defaultBlogs } from '../data/blogsData';
import { expertiseData, ExpertiseItem, SERVICE_ICON_MAP } from '../data/expertiseData';

export const defaultAboutPillars: AboutPillar[] = [
  {
    id: 'pillar-1',
    title: 'Full-Stack Technical Precision',
    description: 'We build sub-second web platforms, scalable SaaS architectures, and seamless e-commerce systems with modern engineering standards - never bloated third-party templates.',
    tag: 'ENGINEERING',
    iconName: 'Zap',
    accent: 'cyan',
  },
  {
    id: 'pillar-2',
    title: '100% Commercial IP Ownership',
    description: 'Zero agency handcuffs. You retain 100% full legal ownership of your domains, codebase, ad accounts, analytics setups, and visual design assets from day one.',
    tag: 'SOVEREIGNTY',
    iconName: 'Lock',
    accent: 'emerald',
  },
  {
    id: 'pillar-3',
    title: 'Algorithmic Organic Dominance',
    description: 'Our technical SEO audits, intent-mapped keyword clusters, and high-authority link architectures systematically rank your brand at the summit of Google search.',
    tag: 'SEARCH ENGINE',
    iconName: 'Compass',
    accent: 'sky',
  },
  {
    id: 'pillar-4',
    title: 'High-Velocity Growth Funnels',
    description: 'Data-driven Google PPC, high-converting Meta Ads, and automated customer acquisition pipelines calibrated to maximize measurable ROAS and compounding revenue.',
    tag: 'PERFORMANCE',
    iconName: 'TrendingUp',
    accent: 'blue',
  },
];

export const defaultAboutChecklist: string[] = [
  'In-house full stack engineering & sub-second Core Web Vitals',
  'High-ROAS Google Ads, Meta Ads & continuous conversion rate optimization',
  'Direct communication line with senior architects on WhatsApp & Slack',
  'Flexible month-to-month agreements with zero lock-in contracts',
];

export const defaultSiteConfig: SiteConfig = {
  brandName: 'MaketinGlu',
  phone: '+91 96545 96149',
  email: 'marketing2glue@gmail.com',
  address: 'C5C/11-B Janak Puri, New Delhi, India - 110058',
  locationBadge: 'BASED IN NEW DELHI, INDIA',

  announcement: {
    enabled: true,
    text: '🚀 Accelerate your brand growth with MaketinGlu custom digital solutions',
    ctaText: 'Claim Free Audit',
  },

  heroTitleLine1: 'Digital Marketing',
  heroTitleLine2: 'Solutions',
  heroDescription:
    'As a digital marketing agency, we are dedicated to helping businesses achieve their online marketing goals. Our team of experts is highly skilled in creating and executing effective digital marketing strategies that drive measurable results.',
  heroPrimaryCta: 'Book Free Consultation',
  heroSecondaryCta: 'Explore Portfolio',

  // Packages Section Titles & Copy
  packagesSectionBadge: 'TRANSPARENT SERVICE TIERS',
  packagesSectionTitle1: 'Tailored Digital Marketing',
  packagesSectionTitle2: 'Service Packages',
  packagesSectionDescription:
    'Engineered packages calibrated for distinct growth stages. Compare full inclusions, dedicated team allocations, and turnkey execution scopes.',

  // Case Studies Section Titles & Copy
  casesSectionBadge: 'PROVEN OUTCOMES',
  casesSectionTitle1: 'Case Studies &',
  casesSectionTitle2: 'Recent Work',
  casesSectionDescription:
    'Real-world revenue and lead-generation outcomes engineered for scaling brands.',

  // FAQ Section Titles & Copy
  faqSectionBadge: 'Knowledge Base',
  faqSectionTitle1: 'Frequently Asked',
  faqSectionTitle2: 'Questions',
  faqSectionDescription:
    'Direct answers regarding campaign timelines, Google rankings, code ownership, and media billing.',

  themeAccent: 'cyan',
  animationsEnabled: true,
  pageScale: '90%',

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
      badge: 'STARTER DIGITAL SETUP',
      tagline: 'Ideal for small businesses & emerging startups setting up their digital foundation.',
      priceNote: 'Custom quote per project scope',
      highlight: 'Starter Digital Setup',
      features: [
        { name: 'Initial Site Analysis', included: true },
        { name: 'Essential On-Page SEO', included: true },
        { name: 'Off-Page SEO & Directory Submissions', included: true },
        { name: 'Local SEO (Google Business Profile)', included: true },
        { name: 'Social Media Optimization (SMO)', included: true },
        { name: 'Creative Image Posting (12-15 Monthly)', included: true },
        { name: 'Story Sharing & Profile Setup', included: true },
        { name: 'Cover Image Graphic Design', included: true },
        { name: 'Group Activity & Community Outreach', included: true },
        { name: 'Insight Monitor Report (Monthly)', included: true },
        { name: 'Image Tagging to Friends & Followers', included: true },
        { name: 'Comment & Like Management', included: true },
        { name: 'Sponsored Ads Campaign Setup', included: true },
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
        { name: 'Advance Ecommerce Website', included: true },
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
        { name: 'Small Website / App Development', included: true },
        { name: 'Pro Videography', included: true },
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

  caseStudies: caseStudiesData,
  faqs: defaultFaqs,

  testimonials: [
    {
      id: 'ajay-bhutkar',
      name: 'Ajay Bhutkar',
      rating: 5,
      quote: "I can proudly say that MarketinGlu has done an outstanding job. Our online sales channels and Google Ad ROAS jumped by 3.8x within the first 90 days. Very professional team and transparent weekly reporting.",
      role: 'Founder & CEO, Bhutkar Enterprises',
      source: 'Google Verified Review',
      initial: 'AB',
      avatarColor: 'from-cyan-500 to-blue-600',
      highlight: '3.8x ROAS & High Business Growth',
    },
    {
      id: 'lalita-rani',
      name: 'Lalita Rani',
      rating: 5,
      quote: "It’s been really rewarding working with MarketinGlu. Their team is exceptionally responsive, highly skilled in technical SEO, and transformed our patient inquiry pipeline with consistent organic rankings.",
      role: 'Marketing Director, Radiant Healthcare',
      source: 'Verified Client Review',
      initial: 'LR',
      avatarColor: 'from-pink-500 to-rose-600',
      highlight: 'Top 3 Google Rankings in 60 Days',
    },
    {
      id: 'ankush-sharma',
      name: 'Ankush Sharma',
      rating: 5,
      quote: "Very good job by the entire team. Their turnaround speed, quick revert on performance campaigns, and creative UI/UX collaterals have given our brand a modern, competitive edge in the market.",
      role: 'Head of Operations, NexaTech Logistics',
      source: 'Client Feedback Portal',
      initial: 'AS',
      avatarColor: 'from-amber-500 to-orange-600',
      highlight: 'Rapid Turnaround & Creative Excellence',
    },
    {
      id: 'pooja-verma',
      name: 'Pooja Verma',
      rating: 5,
      quote: "MarketinGlu revamped our Shopify storefront architecture and executed full-funnel Meta & Google Ads. Our customer acquisition cost dropped by 34% while monthly order volume doubled.",
      role: 'Co-Founder, Vanya D2C Apparel',
      source: 'Shopify Partner Review',
      initial: 'PV',
      avatarColor: 'from-emerald-500 to-teal-600',
      highlight: '-34% CPA & 2x Monthly Orders',
    },
    {
      id: 'rohan-mehra',
      name: 'Rohan Mehra',
      rating: 5,
      quote: "Finding qualified high-ticket real estate buyers used to be our biggest bottleneck. MarketinGlu’s local SEO and high-intent Google PPC campaigns delivered verified site visits every single week.",
      role: 'Managing Partner, Mehra Realty Group',
      source: 'Direct Business Review',
      initial: 'RM',
      avatarColor: 'from-violet-500 to-purple-600',
      highlight: 'High-Intent Inbound Real Estate Inquiries',
    },
    {
      id: 'vikramaditya-rao',
      name: 'Vikramaditya Rao',
      rating: 5,
      quote: "Their end-to-end technical SEO audit and conversion rate optimization generated a 92% increase in paid program enrollments. We consider them a true extension of our growth team.",
      role: 'Chief Digital Officer, Apex EduTech',
      source: 'Enterprise Client Review',
      initial: 'VR',
      avatarColor: 'from-sky-500 to-indigo-600',
      highlight: '+92% Lead Conversion Growth',
    },
  ],

  // Custom User-Added Sections
  customSections: [
    {
      id: 'why-choose-us',
      badge: 'THE MARKETINGLU EDGE',
      title: 'Why Growth-Minded Brands Choose',
      titleHighlight: 'Our Strategic Team',
      description: 'We replace opaque marketing retainers with engineering precision, real-time dashboards, and full commercial asset ownership.',
      position: 'after-packages',
      layout: 'cards',
      enabled: true,
      order: 1,
      items: [
        {
          id: 'item-1',
          title: 'Zero Long-Term Lock-In',
          description: 'Flexible month-to-month retainers. We earn your business continuously through tangible ROI and measurable conversion lifts.',
          tag: 'FLEXIBILITY',
          icon: 'ShieldCheck',
          statValue: '100%',
          statLabel: 'Client Freedom'
        },
        {
          id: 'item-2',
          title: 'Complete IP & Code Ownership',
          description: 'You retain 100% full ownership of your domains, codebase, ad accounts, analytics setups, and visual design assets.',
          tag: 'SECURITY',
          icon: 'Award',
          statValue: '0%',
          statLabel: 'Agency Handcuffs'
        },
        {
          id: 'item-3',
          title: 'Direct Senior Strategist Access',
          description: 'Weekly video calls, dedicated WhatsApp and Slack channels with senior marketing architects—never passed to interns.',
          tag: 'EXPERTISE',
          icon: 'Sparkles',
          statValue: '24/7',
          statLabel: 'Dedicated Support'
        }
      ]
    }
  ],

  // Blogs and Resources
  blogs: defaultBlogs,

  // Services Provided
  services: expertiseData,

  // Section Images (Expertise services, case studies, hero/brand visuals)
  sectionImages: {},
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  
  // Package Management
  addPackage: (pkg: PackageItem) => void;
  updatePackage: (pkg: PackageItem) => void;
  deletePackage: (id: string) => void;

  // Services Management
  addService: (service: ExpertiseItem) => void;
  updateService: (service: ExpertiseItem) => void;
  deleteService: (id: string) => void;
  reorderServices: (fromIndex: number, toIndex: number) => void;

  // Case Study Management
  addCaseStudy: (study: CaseStudy) => void;
  updateCaseStudy: (study: CaseStudy) => void;
  deleteCaseStudy: (id: string) => void;

  // FAQ Management
  addFaq: (faq: FAQItem) => void;
  updateFaq: (faq: FAQItem) => void;
  deleteFaq: (id: number | string) => void;

  // Testimonials Management
  updateTestimonial: (test: TestimonialItem) => void;
  addTestimonial: (test: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  // Blogs & Resources Management
  addBlogPost: (blog: BlogPost) => void;
  updateBlogPost: (blog: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  togglePublishBlog: (id: string) => void;

  // Custom Sections Management
  addCustomSection: (section: CustomSection) => void;
  updateCustomSection: (section: CustomSection) => void;
  deleteCustomSection: (id: string) => void;
  toggleCustomSection: (id: string) => void;

  // Section Images Management
  updateSectionImage: (key: string, url: string) => void;
  resetSectionImage: (key: string) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'marketinglu_cms_site_config_v10';

const hydrateServices = (raw: ExpertiseItem[]): ExpertiseItem[] => {
  return raw.map((s) => {
    const defaultService = expertiseData.find((d) => d.id === s.id);
    // Only use saved image if it is an explicit base64 data-URL or live https URL; otherwise always use bundled asset
    const isCustomUpload = s.image && (s.image.startsWith('data:image/') || s.image.startsWith('http://') || s.image.startsWith('https://'));
    const resolvedImage = isCustomUpload ? s.image : (defaultService?.image || s.image || '');

    return {
      ...defaultService,
      ...s,
      image: resolvedImage,
      icon: (s.iconName && SERVICE_ICON_MAP[s.iconName]) ? SERVICE_ICON_MAP[s.iconName] : (typeof s.icon === 'function' ? s.icon : (defaultService?.icon || Globe)),
    };
  });
};

const hydrateSectionImages = (rawImages?: Record<string, string>): Record<string, string> => {
  if (!rawImages) return {};
  const cleaned: Record<string, string> = {};
  for (const [key, val] of Object.entries(rawImages)) {
    if (val && (val.startsWith('data:image/') || val.startsWith('http://') || val.startsWith('https://'))) {
      cleaned[key] = val;
    }
  }
  return cleaned;
};

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('marketinglu_cms_site_config_v9');
      if (saved) {
        const parsed = JSON.parse(saved);
        const packagesDesc = parsed.packagesSectionDescription && (parsed.packagesSectionDescription.includes('rotate automatically') || parsed.packagesSectionDescription.includes('swipe freely'))
          ? defaultSiteConfig.packagesSectionDescription
          : parsed.packagesSectionDescription || defaultSiteConfig.packagesSectionDescription;

        return { 
          ...defaultSiteConfig, 
          ...parsed,
          packagesSectionDescription: packagesDesc,
          services: parsed.services ? hydrateServices(parsed.services) : defaultSiteConfig.services,
          packages: parsed.packages || defaultSiteConfig.packages,
          caseStudies: parsed.caseStudies || defaultSiteConfig.caseStudies,
          faqs: parsed.faqs || defaultSiteConfig.faqs,
          testimonials: parsed.testimonials || defaultSiteConfig.testimonials,
          blogs: parsed.blogs || defaultSiteConfig.blogs,
          customSections: parsed.customSections || defaultSiteConfig.customSections,
          sectionImages: hydrateSectionImages(parsed.sectionImages),
          pageScale: parsed.pageScale || '100%',
        };
      }
    } catch {
      // fallback
    }
    return defaultSiteConfig;
  });

  // Ensure clean root zoom (prevents layout clipping and coordinate bugs)
  useEffect(() => {
    try {
      document.documentElement.style.removeProperty('zoom');
    } catch {
      // fallback
    }
  }, []);

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

  // Services Management
  const addService = (newService: ExpertiseItem) => {
    const hydrated: ExpertiseItem = {
      ...newService,
      icon: (newService.iconName && SERVICE_ICON_MAP[newService.iconName]) ? SERVICE_ICON_MAP[newService.iconName] : (typeof newService.icon === 'function' ? newService.icon : Globe),
    };
    setConfig((prev) => ({
      ...prev,
      services: [...(prev.services || []), hydrated],
    }));
  };

  const updateService = (updatedService: ExpertiseItem) => {
    const hydrated: ExpertiseItem = {
      ...updatedService,
      icon: (updatedService.iconName && SERVICE_ICON_MAP[updatedService.iconName]) ? SERVICE_ICON_MAP[updatedService.iconName] : (typeof updatedService.icon === 'function' ? updatedService.icon : Globe),
    };
    setConfig((prev) => ({
      ...prev,
      services: (prev.services || []).map((s) => (s.id === updatedService.id ? hydrated : s)),
    }));
  };

  const deleteService = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      services: (prev.services || []).filter((s) => s.id !== id),
    }));
  };

  const reorderServices = (fromIndex: number, toIndex: number) => {
    setConfig((prev) => {
      const current = [...(prev.services || [])];
      if (fromIndex < 0 || fromIndex >= current.length || toIndex < 0 || toIndex >= current.length) {
        return prev;
      }
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return {
        ...prev,
        services: current,
      };
    });
  };

  // Packages
  const addPackage = (newPkg: PackageItem) => {
    setConfig((prev) => ({
      ...prev,
      packages: [...prev.packages, newPkg],
    }));
  };

  const updatePackage = (updatedPkg: PackageItem) => {
    setConfig((prev) => ({
      ...prev,
      packages: prev.packages.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)),
    }));
  };

  const deletePackage = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id),
    }));
  };

  // Case Studies
  const addCaseStudy = (newStudy: CaseStudy) => {
    setConfig((prev) => ({
      ...prev,
      caseStudies: [newStudy, ...prev.caseStudies],
    }));
  };

  const updateCaseStudy = (updatedStudy: CaseStudy) => {
    setConfig((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.map((s) => (s.id === updatedStudy.id ? updatedStudy : s)),
    }));
  };

  const deleteCaseStudy = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((s) => s.id !== id),
    }));
  };

  // FAQs
  const addFaq = (newFaq: FAQItem) => {
    setConfig((prev) => ({
      ...prev,
      faqs: [newFaq, ...prev.faqs],
    }));
  };

  const updateFaq = (updatedFaq: FAQItem) => {
    setConfig((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === updatedFaq.id ? updatedFaq : f)),
    }));
  };

  const deleteFaq = (id: number | string) => {
    setConfig((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  // Testimonials
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

  // Blogs & Resources Management
  const addBlogPost = (newBlog: BlogPost) => {
    setConfig((prev) => ({
      ...prev,
      blogs: [newBlog, ...(prev.blogs || [])],
    }));
  };

  const updateBlogPost = (updatedBlog: BlogPost) => {
    setConfig((prev) => ({
      ...prev,
      blogs: (prev.blogs || []).map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
    }));
  };

  const deleteBlogPost = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      blogs: (prev.blogs || []).filter((b) => b.id !== id),
    }));
  };

  const togglePublishBlog = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      blogs: (prev.blogs || []).map((b) => (b.id === id ? { ...b, published: !b.published } : b)),
    }));
  };

  // Custom Sections Management
  const addCustomSection = (section: CustomSection) => {
    setConfig((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), section],
    }));
  };

  const updateCustomSection = (updatedSection: CustomSection) => {
    setConfig((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((s) =>
        s.id === updatedSection.id ? updatedSection : s
      ),
    }));
  };

  const deleteCustomSection = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((s) => s.id !== id),
    }));
  };

  const toggleCustomSection = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

  // Section Images Management
  const updateSectionImage = (key: string, url: string) => {
    setConfig((prev) => ({
      ...prev,
      sectionImages: {
        ...(prev.sectionImages || {}),
        [key]: url,
      },
    }));
  };

  const resetSectionImage = (key: string) => {
    setConfig((prev) => {
      const nextImages = { ...(prev.sectionImages || {}) };
      delete nextImages[key];
      return {
        ...prev,
        sectionImages: nextImages,
      };
    });
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        addPackage,
        updatePackage,
        deletePackage,
        addService,
        updateService,
        deleteService,
        reorderServices,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        addFaq,
        updateFaq,
        deleteFaq,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        togglePublishBlog,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        toggleCustomSection,
        updateSectionImage,
        resetSectionImage,
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
