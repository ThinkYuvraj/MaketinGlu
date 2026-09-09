export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  popular?: boolean;
  priceNote: string;
  features: { name: string; included: boolean }[];
  highlight: string;
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

  // Packages & Testimonials
  packages: PackageItem[];
  testimonials: TestimonialItem[];
}
