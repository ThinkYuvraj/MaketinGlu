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
  imageUrl?: string;
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

export interface CustomSectionItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  icon?: string;
  imageUrl?: string;
  statValue?: string;
  statLabel?: string;
}

export type SectionPosition = 
  | 'after-hero' 
  | 'after-stats' 
  | 'after-expertise' 
  | 'after-packages' 
  | 'after-cases' 
  | 'after-faq';

export type SectionLayout = 'cards' | 'split-image' | 'banner' | 'stats';

export interface CustomSection {
  id: string;
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  position: SectionPosition;
  layout: SectionLayout;
  enabled: boolean;
  order: number;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  items?: CustomSectionItem[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  published: boolean;
  views?: number;
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
  pageScale?: '80%' | '85%' | '90%' | '95%' | '100%';

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
  blogs: BlogPost[];

  // Custom User-Added Sections
  customSections: CustomSection[];

  // Section Images (Expertise services, case studies, hero/brand visuals)
  sectionImages: Record<string, string>;
}
