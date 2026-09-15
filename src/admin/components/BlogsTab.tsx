import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Search, 
  BookOpen, 
  Star, 
  Calendar, 
  Clock, 
  ExternalLink,
  Image as ImageIcon,
  CheckCircle,
  FileText,
  X
} from 'lucide-react';
import { BlogPost } from '../../types';
import { blogCategories } from '../../data/blogsData';

interface BlogsTabProps {
  blogs: BlogPost[];
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

const PRESET_IMAGES = [
  { label: 'Technical SEO', url: '/images/seo-optimization.png' },
  { label: 'E-Commerce', url: '/images/ecommerce-design.png' },
  { label: 'Web Architecture', url: '/images/website-design.png' },
  { label: 'Paid PPC', url: '/images/ppc-campaigns.png' },
  { label: 'Social Media / SMO', url: '/images/smo-optimization.png' },
  { label: 'Branding & Design', url: '/images/graphic-design.png' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogsTab({
  blogs = [],
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
  onTogglePublish,
}: BlogsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Technical SEO',
    excerpt: '',
    content: '',
    authorName: 'Yuvraj Sharma',
    authorRole: 'Senior Marketing Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    readTime: '5 min read',
    tags: 'SEO, Strategy, Growth',
    coverImage: '/images/seo-optimization.png',
    featured: false,
    published: true,
  });

  const openCreateModal = () => {
    setEditingBlogId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Technical SEO',
      excerpt: '',
      content: '### Executive Summary\n\nProvide the main strategic takeaways here.\n\n### Strategic Blueprint\n\n1. First fundamental phase.\n2. Second execution step.\n3. Measurable metrics to monitor.',
      authorName: 'Yuvraj Sharma',
      authorRole: 'Senior Marketing Strategist',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      readTime: '5 min read',
      tags: 'SEO, Digital Marketing, Growth',
      coverImage: '/images/seo-optimization.png',
      featured: false,
      published: true,
    });
    setPreviewMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      authorName: blog.author.name,
      authorRole: blog.author.role,
      authorAvatar: blog.author.avatar || '',
      readTime: blog.readTime,
      tags: blog.tags.join(', '),
      coverImage: blog.coverImage || '/images/website-design.png',
      featured: !!blog.featured,
      published: blog.published,
    });
    setPreviewMode(false);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      // Auto-update slug if we are creating new or user hasn't heavily customized it
      slug: !editingBlogId ? slugify(val) : prev.slug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const parsedTags = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const generatedSlug = formData.slug.trim() || slugify(formData.title);

    if (editingBlogId) {
      const existing = blogs.find(b => b.id === editingBlogId);
      if (!existing) return;
      const updated: BlogPost = {
        ...existing,
        title: formData.title.trim(),
        slug: generatedSlug,
        category: formData.category,
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: {
          name: formData.authorName.trim(),
          role: formData.authorRole.trim(),
          avatar: formData.authorAvatar.trim() || undefined,
        },
        readTime: formData.readTime.trim() || '5 min read',
        tags: parsedTags.length > 0 ? parsedTags : ['Marketing', 'Strategy'],
        coverImage: formData.coverImage,
        featured: formData.featured,
        published: formData.published,
      };
      onUpdateBlog(updated);
    } else {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        title: formData.title.trim(),
        slug: generatedSlug,
        category: formData.category,
        excerpt: formData.excerpt.trim() || 'Comprehensive industry guide and actionable growth insights from MaketinGlu.',
        content: formData.content.trim() || 'Content coming soon.',
        author: {
          name: formData.authorName.trim() || 'MaketinGlu Team',
          role: formData.authorRole.trim() || 'Marketing Strategist',
          avatar: formData.authorAvatar.trim() || undefined,
        },
        readTime: formData.readTime.trim() || '5 min read',
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        tags: parsedTags.length > 0 ? parsedTags : ['Marketing', 'Growth'],
        coverImage: formData.coverImage,
        featured: formData.featured,
        published: formData.published,
        views: 120,
      };
      onAddBlog(newPost);
    }

    setIsModalOpen(false);
  };

  // Filtered list
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All Articles' || blog.category === selectedCategory;

    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'published' && blog.published) || 
      (statusFilter === 'draft' && !blog.published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const publishedCount = blogs.filter(b => b.published).length;
  const draftCount = blogs.filter(b => !b.published).length;
  const featuredCount = blogs.filter(b => b.featured).length;

  return (
    <div className="space-y-6">
      {/* Top Header & Statistics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Blogs &amp; Resource Guides</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish educational articles, tactical resources, and industry playbooks that drive SEO authority.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition shadow-lg shadow-cyan-500/20 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#090f1f] border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Total Articles</span>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">{blogs.length}</div>
        </div>
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#090f1f] border border-slate-800">
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Published
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{publishedCount}</div>
        </div>
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#090f1f] border border-slate-800">
          <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
            <EyeOff className="w-3.5 h-3.5" /> Drafts
          </span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{draftCount}</div>
        </div>
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#090f1f] border border-slate-800">
          <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
            <Star className="w-3.5 h-3.5" /> Featured
          </span>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">{featuredCount}</div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#090f1f] p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title, tags, or author..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-400 shrink-0"
          >
            {blogCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex rounded-lg bg-slate-900/90 border border-slate-800 p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition ${
                statusFilter === 'all' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('published')}
              className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition ${
                statusFilter === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('draft')}
              className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition ${
                statusFilter === 'draft' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <div className="space-y-3">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 bg-[#090f1f] rounded-2xl border border-dashed border-slate-800 p-8">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 text-sm font-semibold">No articles match your current criteria</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the search filters or click "Write New Article" above.</p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#090f1f] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-5 items-start md:items-center justify-between transition-all"
            >
              {/* Left Column: Image Thumbnail + Info */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="relative w-24 sm:w-28 h-18 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  {blog.featured && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 p-0.5 rounded shadow">
                      <Star className="w-3 h-3 fill-slate-950" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                      {blog.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        blog.published
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {blog.published ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                      <span>{blog.published ? 'Published' : 'Draft'}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {blog.readTime}
                    </span>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      • {blog.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-1">
                    {blog.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                    <span className="font-medium text-slate-300">By {blog.author.name}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-cyan-400 font-mono text-[10px]">Slug: #{blog.slug}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <a
                  href={`#/blogs/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition cursor-pointer"
                  title="View on site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => onTogglePublish(blog.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                    blog.published
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-emerald-400'
                  }`}
                  title="Toggle publication status"
                >
                  {blog.published ? 'Unpublish' : 'Publish'}
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(blog)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer"
                  title="Edit article"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
                      onDeleteBlog(blog.id);
                    }
                  }}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/40 transition cursor-pointer"
                  title="Delete article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#090f1f] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>{editingBlogId ? 'Edit Article' : 'Write New Article'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Publish strategic insights, client case analyses, or downloadable growth resources.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
              {/* Title & Slug */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold flex items-center justify-between">
                  <span>Article Title <span className="text-red-400">*</span></span>
                  <span className="text-[11px] text-slate-500 font-normal">Action-oriented &amp; specific</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., The 2026 Core Web Vitals & Search Domination Blueprint"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">URL Slug</label>
                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-300">
                    <span className="text-slate-500 text-xs select-none">#/blogs/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                      placeholder="custom-url-slug"
                      className="w-full bg-transparent text-cyan-300 font-mono text-xs focus:outline-none pl-1"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                  >
                    {blogCategories.filter(c => c !== 'All Articles').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image Selector */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Cover Image</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.url}
                      onClick={() => setFormData({ ...formData, coverImage: img.url })}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-left flex items-center gap-1.5 transition cursor-pointer ${
                        formData.coverImage === img.url
                          ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <ImageIcon className="w-3 h-3 shrink-0" />
                      <span className="truncate">{img.label}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="Or enter custom image URL (https://... or /images/...)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              {/* Excerpt / Summary */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Summary / Card Excerpt</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short, punchy overview summarizing key business impact..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              {/* Author & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Author Name</label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Author Role</label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Estimated Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g., 5 min read"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., SEO, Core Web Vitals, Google Ads"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              {/* Article Content with Markdown Preview Toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-semibold">Article Content (Markdown supported)</label>
                  <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(false)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                        !previewMode ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(true)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                        previewMode ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {!previewMode ? (
                  <textarea
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write article in Markdown. Use ## Headings, - Bullet lists, and bold text."
                    className="w-full font-mono text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                ) : (
                  <div className="max-h-60 overflow-y-auto p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs leading-relaxed space-y-2 text-slate-300">
                    {formData.content.split('\n\n').map((para, i) => {
                      if (para.startsWith('### ')) {
                        return <h4 key={i} className="text-cyan-300 font-bold text-sm mt-3 mb-1">{para.replace('### ', '')}</h4>;
                      }
                      if (para.startsWith('## ')) {
                        return <h3 key={i} className="text-white font-bold text-base mt-4 mb-1">{para.replace('## ', '')}</h3>;
                      }
                      if (para.startsWith('- ')) {
                        return (
                          <ul key={i} className="list-disc list-inside space-y-1 pl-2">
                            {para.split('\n').map((line, li) => (
                              <li key={li}>{line.replace(/^- /, '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={i}>{para}</p>;
                    })}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-semibold text-slate-300">Publish immediately (Visible to visitors)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400" /> Feature on Blogs Home Page
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-98 transition shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {editingBlogId ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
