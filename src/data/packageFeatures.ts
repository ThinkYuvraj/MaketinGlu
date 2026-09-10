import { Search, Share2, TrendingUp } from 'lucide-react';

export interface FeatureCategory {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  rows: {
    featureName: string;
    featureIndex: number;
    description?: string;
  }[];
}

export const packageCategories: FeatureCategory[] = [
  {
    title: 'SEO & Organic Visibility',
    description: 'Site technical audit, on-page optimization, backlink outreach & local map domination',
    icon: Search,
    rows: [
      {
        featureName: 'Site Analysis & Technical Audit',
        featureIndex: 0,
        description: 'Comprehensive evaluation of code, crawlability, indexation & speed',
      },
      {
        featureName: 'On-Page SEO & Keyword Architecture',
        featureIndex: 1,
        description: 'Meta tags, semantic header hierarchy, keyword density & search intent alignment',
      },
      {
        featureName: 'Off-Page SEO & Authority Citations',
        featureIndex: 2,
        description: 'High-quality directory profiles, editorial backlinks & PR syndicate distribution',
      },
      {
        featureName: 'Local SEO & Google Business Profile',
        featureIndex: 3,
        description: 'Maps ranking, geo-grid optimization, citation cleanup & NAP consistency',
      },
    ],
  },
  {
    title: 'Social Media & Brand Collaterals (SMO)',
    description: 'Creative post designs, reels, story collateral & omnichannel profile aesthetics',
    icon: Share2,
    rows: [
      {
        featureName: 'Social Media Optimization (SMO)',
        featureIndex: 4,
        description: 'Full profile restructuring, algorithm calibration & bio link integration',
      },
      {
        featureName: 'Creative Graphic Posting Schedule',
        featureIndex: 5,
        description: 'Custom branded visual post assets tailored to your market demographic',
      },
      {
        featureName: 'Story Sharing & Video/Reel Collaterals',
        featureIndex: 6,
        description: 'Interactive stories, reel covers, animations & video promotional assets',
      },
      {
        featureName: 'Cover Image & Brand Asset Refresh',
        featureIndex: 7,
        description: 'Bespoke profile headers, hero banners & visual identity collateral',
      },
    ],
  },
  {
    title: 'Community, Analytics & Paid Media',
    description: 'Active community outreach, ROI tracking reports, reputation management & paid ads',
    icon: TrendingUp,
    rows: [
      {
        featureName: 'Community Outreach & Group Activity',
        featureIndex: 8,
        description: 'Strategic engagement across industry niches, niche forums & target buyer groups',
      },
      {
        featureName: 'Performance Analytics & Monitor Reports',
        featureIndex: 9,
        description: 'Actionable keyword trajectories, reach telemetry & monthly/weekly ROI insights',
      },
      {
        featureName: 'Audience Tagging & Follower Growth',
        featureIndex: 10,
        description: 'Targeted tagging strategies and viral referral loops to expand follower base',
      },
      {
        featureName: 'Comment, Review & Reputation Control',
        featureIndex: 11,
        description: 'Proactive engagement, positive sentiment shielding & client query moderation',
      },
      {
        featureName: 'Sponsored Ads Campaign (PPC / Paid Funnels)',
        featureIndex: 12,
        description: 'Setup, strategic targeting guidance, and full-funnel conversion optimization',
      },
    ],
  },
];
