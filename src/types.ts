export interface PackageFeature {
  name: string;
  included: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  popular?: boolean;
  priceNote: string;
  features: PackageFeature[];
  highlight: string;
}

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  stats: CaseStudyStat[];
  accent: string;
  type?: 'nexa' | 'techduniya' | 'custom';
  clientUrl?: string;
  year?: string;
}

export interface FAQItem {
  id: number | string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  quote: string;
  role: string;
  source: string;
  initial: string;
  avatarColor: string;
  highlight?: string;
}

export interface SiteConfig {
  // Brand & Contact
  brandName: string;
  phone: string;
  email: string;
  address: string;
  locationBadge: string;

  // Announcement Bar
  announcement: {
    enabled: boolean;
    text: string;
    ctaText: string;
  };

  // Hero Copy
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;

  // Packages Section Titles
  packagesSectionBadge: string;
  packagesSectionTitle1: string;
  packagesSectionTitle2: string;
  packagesSectionDescription: string;

  // Case Studies Section Titles
  casesSectionBadge: string;
  casesSectionTitle1: string;
  casesSectionTitle2: string;
  casesSectionDescription: string;

  // FAQ Section Titles
  faqSectionBadge: string;
  faqSectionTitle1: string;
  faqSectionTitle2: string;
  faqSectionDescription: string;

  // UI/UX Styling
  themeAccent: 'cyan' | 'sky' | 'emerald' | 'violet' | 'amber';
  animationsEnabled: boolean;

  // Performance Stats
  stats: {
    webDesign: number;
    ecommerce: number;
    design: number;
    smo: number;
  };

  // Content Collections
  packages: PackageItem[];
  caseStudies: CaseStudy[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
}
