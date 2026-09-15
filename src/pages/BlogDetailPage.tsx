import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  BookOpen, 
  Eye, 
  Tag, 
  CheckCircle2,
  Bookmark,
  Share,
  Linkedin,
  Twitter
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { BlogPost } from '../types';
import Container from '../components/common/Container';

interface BlogDetailPageProps {
  slug?: string;
  onOpenConsultation: (serviceName?: string) => void;
}

export default function BlogDetailPage({ slug, onOpenConsultation }: BlogDetailPageProps) {
  const { navigateTo, navigateToBlogs, navigateToBlogDetail } = useNavigation();
  const { config } = useSiteConfig();
  const [copied, setCopied] = useState(false);

  const blogs = config.blogs || [];

  // Find the requested blog by slug or fallback to id
  const blog = useMemo(() => {
    if (!slug) return blogs[0];
    return blogs.find((b) => b.slug === slug || b.id === slug) || blogs[0];
  }, [blogs, slug]);

  // Related articles in same category or other popular
  const relatedPosts = useMemo(() => {
    if (!blog) return [];
    return blogs
      .filter((b) => b.id !== blog.id && b.published !== false)
      .slice(0, 3);
  }, [blogs, blog]);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | MaketinGlu`;
    }
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = blog
    ? `https://wa.me/?text=${encodeURIComponent(blog.title + ' - Read more: ' + window.location.href)}`
    : '#';

  const twitterShareUrl = blog
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`
    : '#';

  const linkedinShareUrl = blog
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    : '#';

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-12 h-12 text-slate-600 mb-4" />
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <p className="text-slate-400 text-sm mt-2">The article you are looking for does not exist or has been removed.</p>
        <button
          onClick={navigateToBlogs}
          className="mt-6 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          Return to All Articles
        </button>
      </div>
    );
  }

  // Render markdown helper
  const renderContent = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-5 bg-cyan-400 rounded-full inline-block shrink-0" />
            <span>{trimmed.replace('### ', '')}</span>
          </h3>
        );
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-black text-white mt-10 mb-4 tracking-tight border-b border-slate-800 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((line) => line.replace(/^- /, '').trim());
        return (
          <ul key={idx} className="space-y-2.5 my-4 pl-1">
            {items.map((item, itemIdx) => {
              const parts = item.split(':**');
              const hasBoldPrefix = item.startsWith('**') && parts.length === 2;
              return (
                <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                  <span>
                    {hasBoldPrefix ? (
                      <>
                        <strong className="text-white">{parts[0].replace('**', '')}:</strong>
                        <span>{parts[1]}</span>
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      if (trimmed.match(/^\d+\.\s/)) {
        const items = trimmed.split('\n').map((line) => line.replace(/^\d+\.\s/, '').trim());
        return (
          <ol key={idx} className="space-y-2.5 my-4 pl-1">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {itemIdx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }

      return (
        <p key={idx} className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden pt-24 sm:pt-28 pb-20">
      {/* Ambient background glows */}
      <div className="fixed top-20 -left-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-[550px] h-[550px] bg-sky-600/10 blur-[180px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-4xl">
        {/* Top Breadcrumb & Return to Articles */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('#/')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={navigateToBlogs}
              className="hover:text-cyan-400 transition-colors cursor-pointer font-medium"
            >
              Blogs &amp; Resources
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400 font-semibold truncate max-w-[180px] sm:max-w-none">
              {blog.category}
            </span>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs transition cursor-pointer"
              title="Copy article link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/60 transition cursor-pointer"
              title="Share to WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Category & Meta Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> {blog.readTime}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {blog.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight sm:leading-snug">
            {blog.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-6 flex items-center justify-between gap-4 py-4 border-y border-slate-800">
            <div className="flex items-center gap-3">
              {blog.author.avatar ? (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-cyan-500/40"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-cyan-900/60 text-cyan-300 flex items-center justify-center font-bold text-sm">
                  {blog.author.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-white">{blog.author.name}</div>
                <div className="text-xs text-slate-400">{blog.author.role}</div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="mb-10 rounded-3xl overflow-hidden aspect-video border border-slate-800 shadow-2xl bg-slate-900 relative">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/50 to-transparent" />
          </div>
        )}

        {/* Strategic Takeaways Box */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0c152a] to-[#090f1f] border border-cyan-500/30 shadow-lg">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>EXECUTIVE BRIEFING &amp; CORE HIGHLIGHTS</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            This strategic guide outlines practical, measurable techniques proven across multi-channel client accounts. Apply these frameworks directly or consult with our strategy architects for custom execution.
          </p>
        </div>

        {/* Main Article Content */}
        <article className="prose prose-invert max-w-none mb-12">
          {renderContent(blog.content)}
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-12 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" /> Filed under:
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Card */}
        <div className="mb-12 p-6 rounded-2xl bg-[#090f1f] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {blog.author.avatar ? (
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-cyan-950 text-cyan-300 flex items-center justify-center font-bold text-lg shrink-0">
                {blog.author.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="text-base font-bold text-white">{blog.author.name}</h4>
              <p className="text-xs text-cyan-400">{blog.author.role}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Senior strategist at MaketinGlu delivering full-funnel digital architecture and measurable revenue growth for enterprise clients.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenConsultation(`Article Inquiry: ${blog.title}`)}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-bold transition cursor-pointer shrink-0"
          >
            Ask Author a Question
          </button>
        </div>

        {/* Inline Article CTA */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-[#0a1124] to-sky-950/50 border border-cyan-500/40 text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Want Us to Implement This Strategy for Your Business?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Our engineers and media buyers take full responsibility for technical SEO, custom frontends, and high-ROAS ad campaigns.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenConsultation(blog.title)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              Book Free Strategy Session
            </button>
            <a
              href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}?text=Hi%20MarketingGlu,%20I%20just%20read%20"${encodeURIComponent(blog.title)}"%20and%20want%20to%20apply%20it`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Discuss via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Recommended Articles &amp; Resources</span>
              </h3>
              <button
                onClick={navigateToBlogs}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateToBlogDetail(rel.slug)}
                  className="group cursor-pointer rounded-2xl bg-[#090f1f] border border-slate-800 hover:border-cyan-500/40 p-4 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900">
                      {rel.coverImage && (
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                        />
                      )}
                      <span className="absolute top-2 left-2 text-[9px] font-mono font-bold uppercase text-cyan-300 bg-[#070b14]/90 px-2 py-0.5 rounded">
                        {rel.category}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{rel.readTime}</span>
                    <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
