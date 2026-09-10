export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  accent: string;
  type: 'nexa' | 'techduniya';
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "nexa",
    category: "E-COMMERCE & DEVELOPMENT",
    title: "Nexa Store India UI Transformation",
    description: "Rebuilt Nexa's core custom checkout experience yielding a 95% boost in mobile retention rates.",
    stats: [
      { label: "Checkout Velocity", value: "+95%" },
      { label: "Gross Volume", value: "₹2.3M" },
      { label: "Cart Abandonment", value: "-15%" }
    ],
    accent: "from-sky-500 to-cyan-400",
    type: "nexa"
  },
  {
    id: "techduniya",
    category: "SOCIAL BRAND MANAGEMENT",
    title: "TechDuniya Organic SMO Push",
    description: "Structured dynamic social campaigns targeting young Indian tech-buyers to multiply inbound leads.",
    stats: [
      { label: "Audience Reach", value: "320K" },
      { label: "Organic Inbound", value: "+180%" },
      { label: "Engagement CTR", value: "8.4%" }
    ],
    accent: "from-cyan-400 to-teal-400",
    type: "techduniya"
  }
];
