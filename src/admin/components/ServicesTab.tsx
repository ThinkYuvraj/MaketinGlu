import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Globe, 
  ShoppingBag, 
  Palette, 
  MousePointerClick, 
  Megaphone,
  TrendingUp,
  Code,
  Zap,
  ShieldCheck,
  Layers,
  Smartphone,
  BarChart,
  Bot,
  Cpu,
  Award,
  FileText,
  Video,
  X,
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { ExpertiseItem, getExpertiseIcon, SERVICE_ICON_MAP } from '../../data/expertiseData';

interface ServicesTabProps {
  services: ExpertiseItem[];
  onAddService: (service: ExpertiseItem) => void;
  onUpdateService: (service: ExpertiseItem) => void;
  onDeleteService: (id: string) => void;
  onReorderServices: (fromIndex: number, toIndex: number) => void;
}

const AVAILABLE_ICONS = [
  { name: 'Globe', label: 'Web / Global', Icon: Globe },
  { name: 'ShoppingBag', label: 'E-Commerce', Icon: ShoppingBag },
  { name: 'Search', label: 'SEO / Search', Icon: Search },
  { name: 'Palette', label: 'Design / Creative', Icon: Palette },
  { name: 'MousePointerClick', label: 'PPC / Ads', Icon: MousePointerClick },
  { name: 'Megaphone', label: 'Social / Outreach', Icon: Megaphone },
  { name: 'TrendingUp', label: 'Growth / Scale', Icon: TrendingUp },
  { name: 'Code', label: 'Engineering / API', Icon: Code },
  { name: 'Zap', label: 'Automation / Speed', Icon: Zap },
  { name: 'ShieldCheck', label: 'Security / Quality', Icon: ShieldCheck },
  { name: 'Layers', label: 'Full-Stack / Systems', Icon: Layers },
  { name: 'Smartphone', label: 'Mobile / Apps', Icon: Smartphone },
  { name: 'Sparkles', label: 'AI / Premium', Icon: Sparkles },
  { name: 'BarChart', label: 'Analytics / Data', Icon: BarChart },
  { name: 'Bot', label: 'AI Agents / Bots', Icon: Bot },
  { name: 'Cpu', label: 'Cloud / Infrastructure', Icon: Cpu },
  { name: 'Award', label: 'Branding / Elite', Icon: Award },
  { name: 'FileText', label: 'Content / Copy', Icon: FileText },
  { name: 'Video', label: 'Video / Media', Icon: Video },
];

const PRESET_SERVICE_IMAGES = [
  { label: 'Web & App Architecture', url: '/images/website-design.png' },
  { label: 'E-Commerce Storefront', url: '/images/ecommerce-design.png' },
  { label: 'Google Search & SEO', url: '/images/seo-optimization.png' },
  { label: 'Paid Ad Campaigns', url: '/images/ppc-campaigns.png' },
  { label: 'Social Media Strategy', url: '/images/smo-optimization.png' },
  { label: 'Branding & Graphic Design', url: '/images/graphic-design.png' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ServicesTab({
  services = [],
  onAddService,
  onUpdateService,
  onDeleteService,
  onReorderServices,
}: ServicesTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'basics' | 'metrics' | 'deliverables' | 'methodology'>('basics');

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    tabLabel: '',
    category: '',
    title: '',
    subtitle: '',
    summary: '',
    metricBadge: '',
    metricSubtitle: '',
    iconName: 'Globe',
    image: '/images/website-design.png',
    deliverablesText: '',
    idealFor: '',
    priceEstimate: '',
    timelineEstimate: '',
    // Pillars
    pillar1Title: '',
    pillar1Desc: '',
    pillar1Tag: '',
    pillar2Title: '',
    pillar2Desc: '',
    pillar2Tag: '',
    pillar3Title: '',
    pillar3Desc: '',
    pillar3Tag: '',
    // FAQ
    faq1Question: '',
    faq1Answer: '',
    faq2Question: '',
    faq2Answer: '',
  });

  const openCreateModal = () => {
    setEditingServiceId(null);
    setFormData({
      id: '',
      tabLabel: 'Content & Strategy',
      category: 'Inbound Growth & Editorial',
      title: 'Content Marketing & Inbound Growth Architecture',
      subtitle: 'Authority-Building Content Engines That Attract, Nurture & Convert High-Value Buyers',
      summary: 'Turn your brand into an authoritative thought leader with research-backed articles, strategic customer acquisition whitepapers, video scripting, and automated lead nurturing funnels.',
      metricBadge: '+280% Inbound Lead Growth',
      metricSubtitle: 'Compounding Organic Content ROI',
      iconName: 'FileText',
      image: '/images/website-design.png',
      deliverablesText: 'Custom Editorial Content Calendar\nHigh-Ranking Pillar Articles & Whitepapers\nLead Magnet Strategy & Copywriting\nEmail Lead Nurture Funnel Sequences\nContent Performance & Conversion Telemetry',
      idealFor: 'B2B companies, SaaS providers, and consulting firms looking to generate inbound high-intent leads without burning ad budget.',
      priceEstimate: 'Tailored monthly retainer',
      timelineEstimate: 'Immediate 14-day setup & launch',
      pillar1Title: 'High-Intent Topic Research',
      pillar1Desc: 'We identify exact commercial keywords and questions your prospective buyers search for when ready to purchase.',
      pillar1Tag: 'Keyword Strategy',
      pillar2Title: 'Authoritative Content Production',
      pillar2Desc: 'Deep, engaging, and well-researched articles written by industry practitioners that build instant market trust.',
      pillar2Tag: 'Elite Copywriting',
      pillar3Title: 'Multi-Channel Distribution',
      pillar3Desc: 'Syndicate content across LinkedIn, email newsletters, and search engines for maximum compounding visibility.',
      pillar3Tag: 'Distribution Engine',
      faq1Question: 'How quickly does content marketing generate qualified leads?',
      faq1Answer: 'While SEO compounding typically accelerates between months 3-6, multi-channel distribution and lead magnets begin generating inquiries within the first 30 days.',
      faq2Question: 'Do we own all published content and creative assets?',
      faq2Answer: 'Yes, 100%. All articles, research, graphics, and email copy produced become the sole intellectual property of your company upon delivery.',
    });
    setModalTab('basics');
    setIsModalOpen(true);
  };

  const openEditModal = (service: ExpertiseItem) => {
    setEditingServiceId(service.id);
    const p1 = service.pillars?.[0] || { title: '', description: '', tag: '' };
    const p2 = service.pillars?.[1] || { title: '', description: '', tag: '' };
    const p3 = service.pillars?.[2] || { title: '', description: '', tag: '' };
    const f1 = service.faqs?.[0] || { question: '', answer: '' };
    const f2 = service.faqs?.[1] || { question: '', answer: '' };

    setFormData({
      id: service.id,
      tabLabel: service.tabLabel || service.title,
      category: service.category || 'Digital Marketing',
      title: service.title,
      subtitle: service.subtitle || '',
      summary: service.summary || '',
      metricBadge: service.metricBadge || '',
      metricSubtitle: service.metricSubtitle || '',
      iconName: service.iconName || 'Globe',
      image: service.image || '/images/website-design.png',
      deliverablesText: (service.deliverables || []).join('\n'),
      idealFor: service.idealFor || '',
      priceEstimate: service.priceEstimate || '',
      timelineEstimate: service.timelineEstimate || '',
      pillar1Title: p1.title,
      pillar1Desc: p1.description,
      pillar1Tag: p1.tag,
      pillar2Title: p2.title,
      pillar2Desc: p2.description,
      pillar2Tag: p2.tag,
      pillar3Title: p3.title,
      pillar3Desc: p3.description,
      pillar3Tag: p3.tag,
      faq1Question: f1.question,
      faq1Answer: f1.answer,
      faq2Question: f2.question,
      faq2Answer: f2.answer,
    });
    setModalTab('basics');
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      id: !editingServiceId ? slugify(val) : prev.id,
      tabLabel: !editingServiceId && !prev.tabLabel ? val.split(' ')[0] || val : prev.tabLabel,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const deliverables = formData.deliverablesText
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const pillars = [
      formData.pillar1Title.trim() && {
        title: formData.pillar1Title.trim(),
        description: formData.pillar1Desc.trim(),
        tag: formData.pillar1Tag.trim() || 'Core Discipline',
      },
      formData.pillar2Title.trim() && {
        title: formData.pillar2Title.trim(),
        description: formData.pillar2Desc.trim(),
        tag: formData.pillar2Tag.trim() || 'Execution',
      },
      formData.pillar3Title.trim() && {
        title: formData.pillar3Title.trim(),
        description: formData.pillar3Desc.trim(),
        tag: formData.pillar3Tag.trim() || 'Scalability',
      },
    ].filter(Boolean) as any[];

    const faqs = [
      formData.faq1Question.trim() && {
        question: formData.faq1Question.trim(),
        answer: formData.faq1Answer.trim(),
      },
      formData.faq2Question.trim() && {
        question: formData.faq2Question.trim(),
        answer: formData.faq2Answer.trim(),
      },
    ].filter(Boolean) as any[];

    const finalId = formData.id.trim() || slugify(formData.title);

    if (editingServiceId) {
      const existing = services.find((s) => s.id === editingServiceId);
      if (!existing) return;

      const updated: ExpertiseItem = {
        ...existing,
        id: finalId,
        tabLabel: formData.tabLabel.trim() || formData.title.trim(),
        category: formData.category.trim() || 'Digital Marketing',
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        summary: formData.summary.trim(),
        metricBadge: formData.metricBadge.trim(),
        metricSubtitle: formData.metricSubtitle.trim(),
        iconName: formData.iconName,
        icon: SERVICE_ICON_MAP[formData.iconName] || Globe,
        image: formData.image.trim(),
        deliverables: deliverables.length > 0 ? deliverables : ['Complete Solution Architecture', 'Monthly Reporting'],
        pillars: pillars.length > 0 ? pillars : existing.pillars,
        idealFor: formData.idealFor.trim() || existing.idealFor,
        priceEstimate: formData.priceEstimate.trim() || existing.priceEstimate,
        timelineEstimate: formData.timelineEstimate.trim() || existing.timelineEstimate,
        faqs: faqs.length > 0 ? faqs : existing.faqs,
      };

      onUpdateService(updated);
    } else {
      const newService: ExpertiseItem = {
        id: finalId,
        tabLabel: formData.tabLabel.trim() || formData.title.trim(),
        category: formData.category.trim() || 'Full-Service Digital',
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim() || 'Engineered for Performance & Scalability',
        summary: formData.summary.trim() || 'Strategic end-to-end execution tailored for high-growth modern businesses.',
        metricBadge: formData.metricBadge.trim() || 'Top Tier Delivery',
        metricSubtitle: formData.metricSubtitle.trim() || 'Proven Track Record',
        iconName: formData.iconName,
        icon: SERVICE_ICON_MAP[formData.iconName] || Globe,
        image: formData.image.trim() || '/images/website-design.png',
        deliverables: deliverables.length > 0 ? deliverables : ['Initial Strategy Audit', 'Full Execution & Optimization', 'Performance Analytics'],
        pillars: pillars.length > 0 ? pillars : [
          { title: 'Strategic Planning', description: 'Comprehensive roadmap designed around your business goals.', tag: 'Phase 1' },
          { title: 'Flawless Execution', description: 'Rapid delivery powered by industry best practices.', tag: 'Phase 2' },
          { title: 'Continuous Growth', description: 'Iterative improvements backed by transparent metrics.', tag: 'Phase 3' },
        ],
        heroStats: [
          { label: 'Client Satisfaction', value: '100%', desc: 'Verified delivery benchmarks' },
          { label: 'Turnaround Time', value: 'Rapid', desc: 'Fast agile delivery sprints' },
          { label: 'Growth Lift', value: '+150%', desc: 'Average measurable performance gain' },
          { label: 'Dedicated Lead', value: '1-on-1', desc: 'Direct access to senior strategists' }
        ],
        idealFor: formData.idealFor.trim() || 'Businesses seeking measurable growth and verified domain expertise.',
        keyBenefits: [
          { title: 'Proven Methodology', description: 'Engineered processes that eliminate trial and error.' },
          { title: 'Transparent Telemetry', description: 'Real-time dashboards and direct reporting.' },
          { title: 'Scalable Architecture', description: 'Solutions that grow smoothly alongside your business.' }
        ],
        methodology: [
          { step: '01', title: 'Audit & Blueprint', duration: 'Week 1', description: 'In-depth domain analysis and strategic alignment.', highlights: ['Baseline audit', 'Competitor review'] },
          { step: '02', title: 'Implementation', duration: 'Weeks 2-3', description: 'Rigorous engineering and production.', highlights: ['Agile sprints', 'Quality assurance'] },
          { step: '03', title: 'Launch & Optimization', duration: 'Ongoing', description: 'Data-driven refinement for compounding ROI.', highlights: ['Conversion tracking', 'Iterative scaling'] }
        ],
        techStack: [
          { name: 'Modern Frameworks', role: 'Architecture' },
          { name: 'Analytics Telemetry', role: 'Tracking' }
        ],
        faqs: faqs.length > 0 ? faqs : [
          { question: 'What is the onboarding timeline?', answer: 'We kick off strategy within 48 hours of project confirmation.' }
        ],
        priceEstimate: formData.priceEstimate.trim() || 'Custom quote per project scope',
        timelineEstimate: formData.timelineEstimate.trim() || '2-4 weeks typical delivery',
      };

      onAddService(newService);
    }

    setIsModalOpen(false);
  };

  const filteredServices = services.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.tabLabel.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Briefcase className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">Services Provided Management</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add, update, reorder, or customize the services displayed on your homepage carousel, Services Hub (<code className="text-cyan-300">#/services</code>), and individual deep-dive pages.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#/services"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Services Hub</span>
          </a>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Metrics Row & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#0b1222] p-4 rounded-xl border border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Services</div>
          <div className="text-2xl font-black text-white mt-1">{services.length}</div>
          <div className="text-[11px] text-cyan-400 mt-0.5">Live on Homepage &amp; Navigation</div>
        </div>

        <div className="bg-[#0b1222] p-4 rounded-xl border border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dedicated Service Pages</div>
          <div className="text-2xl font-black text-white mt-1">{services.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">With full methodology &amp; FAQs</div>
        </div>

        <div className="bg-[#0b1222] p-4 rounded-xl border border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Search Services</div>
          <div className="relative mt-2">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, tag, category..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Service List */}
      <div className="space-y-3">
        {filteredServices.map((service, index) => {
          const ServiceIcon = getExpertiseIcon(service);
          return (
            <div
              key={service.id}
              className="bg-[#0b1222] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 flex-1">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 shrink-0 pt-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => onReorderServices(index, index - 1)}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Move up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === services.length - 1}
                    onClick={() => onReorderServices(index, index + 1)}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Move down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Service Icon & Thumbnail */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/website-design.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <ServiceIcon className="w-6 h-6 text-cyan-300 drop-shadow" />
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      {service.category || 'Core Service'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      ID: #{service.id}
                    </span>
                    {service.metricBadge && (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        {service.metricBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white truncate">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {service.summary || service.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-400">
                    <span>
                      <strong className="text-slate-300">Tab Label:</strong> {service.tabLabel}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-300">Deliverables:</strong> {service.deliverables?.length || 0}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-300">Pillars:</strong> {service.pillars?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <a
                  href={`#/services/${service.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  title="View public live page"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">View Live</span>
                </a>

                <button
                  type="button"
                  onClick={() => openEditModal(service)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-400 border border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${service.title}"? This cannot be undone.`)) {
                      onDeleteService(service.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                  title="Delete service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-slate-400 text-sm">
            No services matched your search term "{searchTerm}".
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#090f1d] border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Briefcase className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingServiceId ? 'Edit Service Provided' : 'Add New Service Provided'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure service identity, hero telemetry, deliverables, and methodology.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center border-b border-slate-800 bg-[#070c17] px-4 overflow-x-auto text-xs font-semibold">
              <button
                type="button"
                onClick={() => setModalTab('basics')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  modalTab === 'basics'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Overview &amp; Identity
              </button>
              <button
                type="button"
                onClick={() => setModalTab('metrics')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  modalTab === 'metrics'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Metrics &amp; Pricing
              </button>
              <button
                type="button"
                onClick={() => setModalTab('deliverables')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  modalTab === 'deliverables'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Deliverables &amp; Pillars
              </button>
              <button
                type="button"
                onClick={() => setModalTab('methodology')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  modalTab === 'methodology'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                4. FAQs &amp; Audience
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* TAB 1: BASICS */}
              {modalTab === 'basics' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Service Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. AI Automation & Workflow Optimization"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Short Tab Label (Navigation / Carousel) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.tabLabel}
                        onChange={(e) => setFormData((p) => ({ ...p, tabLabel: e.target.value }))}
                        placeholder="e.g. AI Automation"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        URL Slug / ID <span className="text-red-400">*</span>
                      </label>
                      <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs">
                        <span className="text-slate-500 select-none">#/services/</span>
                        <input
                          type="text"
                          required
                          value={formData.id}
                          onChange={(e) => setFormData((p) => ({ ...p, id: slugify(e.target.value) }))}
                          placeholder="ai-automation"
                          className="bg-transparent text-cyan-300 focus:outline-none ml-1 w-full font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Category Badge Text
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                      placeholder="e.g. AI AGENTS & WORKFLOW AUTOMATION"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Icon Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Service Icon
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {AVAILABLE_ICONS.map(({ name, label, Icon }) => {
                        const isSelected = formData.iconName === name;
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, iconName: name }))}
                            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] truncate max-w-full">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Image Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Cover Image (Preset or Custom URL)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                      {PRESET_SERVICE_IMAGES.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, image: preset.url }))}
                          className={`p-2 rounded-lg border text-left text-[11px] truncate transition-colors cursor-pointer ${
                            formData.image === preset.url
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/... or /images/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Summary (Overview Paragraph)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.summary}
                      onChange={(e) => setFormData((p) => ({ ...p, summary: e.target.value }))}
                      placeholder="Comprehensive overview of this service..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: METRICS & PRICING */}
              {modalTab === 'metrics' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Service Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData((p) => ({ ...p, subtitle: e.target.value }))}
                      placeholder="e.g. Turnkey Workflows Optimized for High Throughput"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Key Metric Badge (High Impact)
                      </label>
                      <input
                        type="text"
                        value={formData.metricBadge}
                        onChange={(e) => setFormData((p) => ({ ...p, metricBadge: e.target.value }))}
                        placeholder="e.g. 10x Faster Workflows or 4.8x ROAS"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Metric Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.metricSubtitle}
                        onChange={(e) => setFormData((p) => ({ ...p, metricSubtitle: e.target.value }))}
                        placeholder="e.g. Automated Throughput"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Price Estimate Note
                      </label>
                      <input
                        type="text"
                        value={formData.priceEstimate}
                        onChange={(e) => setFormData((p) => ({ ...p, priceEstimate: e.target.value }))}
                        placeholder="e.g. Custom quote per project scope or Tailored monthly retainer"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Timeline Estimate
                      </label>
                      <input
                        type="text"
                        value={formData.timelineEstimate}
                        onChange={(e) => setFormData((p) => ({ ...p, timelineEstimate: e.target.value }))}
                        placeholder="e.g. 2-3 weeks typical delivery"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DELIVERABLES & PILLARS */}
              {modalTab === 'deliverables' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Key Deliverables (One per line)
                    </label>
                    <textarea
                      rows={5}
                      value={formData.deliverablesText}
                      onChange={(e) => setFormData((p) => ({ ...p, deliverablesText: e.target.value }))}
                      placeholder="Initial Audit&#10;Custom Strategy Architecture&#10;Weekly Optimization&#10;Real-Time Telemetry Dashboard"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Each line appears with a high-contrast checkmark on the service page.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Strategic Pillars (Up to 3 Core Capabilities)
                    </h4>

                    {/* Pillar 1 */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-cyan-400">Pillar 1</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={formData.pillar1Title}
                          onChange={(e) => setFormData((p) => ({ ...p, pillar1Title: e.target.value }))}
                          placeholder="Pillar Title (e.g. Audit & Strategy)"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={formData.pillar1Tag}
                          onChange={(e) => setFormData((p) => ({ ...p, pillar1Tag: e.target.value }))}
                          placeholder="Pillar Tag (e.g. Phase 1)"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={formData.pillar1Desc}
                        onChange={(e) => setFormData((p) => ({ ...p, pillar1Desc: e.target.value }))}
                        placeholder="Pillar Description"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    {/* Pillar 2 */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-cyan-400">Pillar 2</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={formData.pillar2Title}
                          onChange={(e) => setFormData((p) => ({ ...p, pillar2Title: e.target.value }))}
                          placeholder="Pillar Title (e.g. Execution & Tuning)"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={formData.pillar2Tag}
                          onChange={(e) => setFormData((p) => ({ ...p, pillar2Tag: e.target.value }))}
                          placeholder="Pillar Tag (e.g. Phase 2)"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={formData.pillar2Desc}
                        onChange={(e) => setFormData((p) => ({ ...p, pillar2Desc: e.target.value }))}
                        placeholder="Pillar Description"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    {/* Pillar 3 */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-cyan-400">Pillar 3</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={formData.pillar3Title}
                          onChange={(e) => setFormData((p) => ({ ...p, pillar3Title: e.target.value }))}
                          placeholder="Pillar Title (e.g. Continuous Scaling)"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={formData.pillar3Tag}
                          onChange={(e) => setFormData((p) => ({ ...p, pillar3Tag: e.target.value }))}
                          placeholder="Pillar Tag (e.g. Scale)"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={formData.pillar3Desc}
                        onChange={(e) => setFormData((p) => ({ ...p, pillar3Desc: e.target.value }))}
                        placeholder="Pillar Description"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: FAQS & AUDIENCE */}
              {modalTab === 'methodology' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Ideal For (Target Client Profile)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.idealFor}
                      onChange={(e) => setFormData((p) => ({ ...p, idealFor: e.target.value }))}
                      placeholder="e.g. Growing D2C brands, B2B firms, and enterprises needing..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Service-Specific FAQs
                    </h4>

                    {/* FAQ 1 */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-cyan-400">FAQ Question 1</div>
                      <input
                        type="text"
                        value={formData.faq1Question}
                        onChange={(e) => setFormData((p) => ({ ...p, faq1Question: e.target.value }))}
                        placeholder="e.g. How do we get started?"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                      <textarea
                        rows={2}
                        value={formData.faq1Answer}
                        onChange={(e) => setFormData((p) => ({ ...p, faq1Answer: e.target.value }))}
                        placeholder="Detailed answer..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    {/* FAQ 2 */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-cyan-400">FAQ Question 2</div>
                      <input
                        type="text"
                        value={formData.faq2Question}
                        onChange={(e) => setFormData((p) => ({ ...p, faq2Question: e.target.value }))}
                        placeholder="e.g. Do we retain ownership of deliverables?"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                      <textarea
                        rows={2}
                        value={formData.faq2Answer}
                        onChange={(e) => setFormData((p) => ({ ...p, faq2Answer: e.target.value }))}
                        placeholder="Detailed answer..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  {modalTab !== 'methodology' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (modalTab === 'basics') setModalTab('metrics');
                        else if (modalTab === 'metrics') setModalTab('deliverables');
                        else if (modalTab === 'deliverables') setModalTab('methodology');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 transition-colors cursor-pointer"
                    >
                      Next Step →
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    {editingServiceId ? 'Save Changes' : 'Create Service'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
