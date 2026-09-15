import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  BookOpen, 
  Star, 
  Tag, 
  Download, 
  CheckCircle2, 
  Share2, 
  MessageCircle,
  ExternalLink,
  Zap,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { BlogPost } from '../types';
import { blogCategories } from '../data/blogsData';
import Container from '../components/common/Container';

interface BlogsPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export default function BlogsPage({ onOpenConsultation }: BlogsPageProps) {
  const { navigateTo, navigateToBlogDetail } = useNavigation();
  const { config } = useSiteConfig();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [activeDownloadModal, setActiveDownloadModal] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const blogs = config.blogs || [];

  // Filter only published blogs for public visitors
  const publishedBlogs = useMemo(() => {
    return blogs.filter((b) => b.published !== false);
  }, [blogs]);

  // Featured Post (first flagged as featured or the first post)
  const featuredPost = useMemo(() => {
    return publishedBlogs.find((b) => b.featured) || publishedBlogs[0];
  }, [publishedBlogs]);

  // Filtered posts based on search & category
  const filteredPosts = useMemo(() => {
    return publishedBlogs.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Articles' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [publishedBlogs, searchQuery, selectedCategory]);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden pt-24 sm:pt-28 pb-20">
      {/* Ambient background glows */}
      <div className="fixed top-20 -left-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-[550px] h-[550px] bg-sky-600/10 blur-[180px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        {/* Top Breadcrumbs */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('#/')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400 font-semibold">Blogs &amp; Resources</span>
          </div>

          <button
            type="button"
            onClick={handleCopyShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-4 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>STRATEGIC PLAYBOOKS &amp; KNOWLEDGE HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Marketing Insights &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              Growth Resources
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Battle-tested digital marketing blueprints, technical SEO frameworks, and conversion optimization playbooks written by senior strategists who manage multi-crore campaigns.
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="mb-10 sm:mb-12 space-y-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or marketing channel (e.g., SEO, ROAS, Meta, INP)..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#090f1f]/90 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 rounded-2xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none shadow-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {blogCategories.map((category) => {
              const count =
                category === 'All Articles'
                  ? publishedBlogs.length
                  : publishedBlogs.filter((b) => b.category === category).length;

              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? 'bg-slate-950/25 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Article Showcase (only show if no search filter active) */}
        {!searchQuery && selectedCategory === 'All Articles' && featuredPost && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                FEATURED STRATEGY BLUEPRINT
              </span>
            </div>

            <div 
              onClick={() => navigateToBlogDetail(featuredPost.slug)}
              className="group cursor-pointer rounded-3xl bg-gradient-to-br from-[#0c152a] via-[#090f1f] to-[#070b14] border border-cyan-500/40 hover:border-cyan-400 p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left: Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-3 py-0.5 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> {featuredPost.readTime}
                    </span>
                    <span className="text-xs text-slate-500">• {featuredPost.publishedAt}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  {/* Author Bar */}
                  <div className="flex items-center gap-3 pt-2">
                    {featuredPost.author.avatar ? (
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-cyan-900/60 text-cyan-300 flex items-center justify-center font-bold text-sm">
                        {featuredPost.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">{featuredPost.author.name}</div>
                      <div className="text-[11px] text-slate-400">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs sm:text-sm group-hover:brightness-110 shadow-lg shadow-cyan-500/20 transition">
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Right: Graphic */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video lg:aspect-4/3 border border-slate-800 bg-slate-900 shadow-xl">
                  {featuredPost.coverImage && (
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-cyan-300 bg-[#070b14]/90 px-3 py-1.5 rounded-xl border border-slate-700/60">
                    <span>VERIFIED STRATEGY</span>
                    <span>{featuredPost.views?.toLocaleString() || 3800}+ Reads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>{selectedCategory === 'All Articles' ? 'Latest Publications & Deep Dives' : `${selectedCategory} Articles`}</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-[#090f1f] rounded-3xl border border-dashed border-slate-800 p-8">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No matching resources found</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                No articles matched "{searchQuery}". Try searching for broader terms like "SEO", "Google", or "ROAS".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Articles');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => navigateToBlogDetail(post.slug)}
                  className="group cursor-pointer rounded-3xl bg-[#090f1f] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0c152a] flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
                >
                  {/* Top Cover Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-[#070b14]/90 border border-cyan-500/40 px-2.5 py-1 rounded-md backdrop-blur-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" /> {post.readTime}
                        </span>
                        <span>•</span>
                        <span>{post.publishedAt}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2 mb-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Footer */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-cyan-900/60 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-xs font-semibold text-slate-300 truncate">
                          {post.author.name}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 shrink-0 transition-transform group-hover:translate-x-1">
                        Read
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Free Agency Resource Toolkit & Audits */}
        <div className="mb-16 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0a1124] to-sky-950/40 border border-cyan-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold tracking-widest text-cyan-400 uppercase mb-3">
              <Zap className="w-3 h-3" />
              <span>FREE STRATEGY ASSETS</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Actionable Growth Toolkits &amp; Calculators
            </h2>
            
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Equip your internal growth team with our proprietary audit templates, ad spend calculators, and technical speed checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Asset 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center mb-3">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">2026 Core Web Vitals Checklist</h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  18-point technical inspection sheet for Google INP &amp; sub-second TTFB.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation('Core Web Vitals Audit')}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Request Checklist</span>
              </button>
            </div>

            {/* Asset 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center mb-3">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">D2C E-Commerce ROAS Matrix</h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Financial model calculating break-even CPA across blended Meta &amp; Google ad spend.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation('ROAS Growth Strategy')}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Request Matrix</span>
              </button>
            </div>

            {/* Asset 3 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Full Funnel Conversion Audit</h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Complimentary 30-minute bespoke video audit of your current store or landing page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation('Comprehensive Funnel Audit')}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 text-xs font-black transition hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book 100% Free Audit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Consultation CTA */}
        <div className="text-center rounded-3xl bg-[#090f1f] border border-slate-800 p-8 sm:p-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Implement These Growth Frameworks?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Stop guessing with generic agency playbooks. Speak directly with MaketinGlu strategists in New Delhi for custom digital marketing solutions.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenConsultation('Blogs Hub Consultation')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black text-sm hover:brightness-110 shadow-lg shadow-cyan-500/25 transition cursor-pointer"
            >
              Book Free Strategy Session
            </button>
            <a
              href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}?text=Hi%20MarketingGlu,%20I%20read%20your%20resources%20and%20would%20like%20to%20discuss%20a%20project`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
