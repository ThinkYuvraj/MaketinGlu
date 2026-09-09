import { useState, useEffect } from 'react';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  SlidersHorizontal,
  Table as TableIcon
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Testimonials() {
  const { config } = useSiteConfig();
  const carouselTestimonials = config.testimonials;
  const consolidatedReviews = config.testimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'carousel' | 'table'>('carousel');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel rotation matching website behavior
  useEffect(() => {
    if (!isAutoPlaying || activeTab !== 'carousel') return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeTab]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + carouselTestimonials.length) % carouselTestimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carouselTestimonials.length);
  };

  const currentItem = carouselTestimonials[currentIndex];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating
              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]'
              : 'text-slate-700'
              }`}
          />
        ))}
        <span className="ml-1.5 text-xs font-bold text-amber-300">
          {rating}/5
        </span>
      </div>
    );
  };

  return (
    <section id="testimonials" className="relative py-20 bg-[#070b14] border-t border-slate-900/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header matching Figma & Marketing LU website */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-3 tracking-tight">
            What Our Clients Say About Marketing LU
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real reviews and feedback directly from our client portfolio on marketinglu.com.
          </p>

          {/* Average Rating Score Summary Badge */}
          <div className="mt-5 inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-[#0a1120] border border-slate-800 shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-white">4.3</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 opacity-60" />
              </div>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="text-xs text-slate-300 font-medium">
              Consolidated Client Satisfaction
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'carousel' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              id="tab-carousel"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Carousel View</span>
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'table'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
                }`}
              id="tab-table"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Consolidated List</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CAROUSEL VIEW */}
        {activeTab === 'carousel' && (
          <div className="relative max-w-4xl mx-auto">
            {/* Main Featured Testimonial Card */}
            <div
              className="relative p-8 sm:p-10 rounded-2xl bg-[#0a1120] border border-cyan-500/20 shadow-2xl transition-all duration-300 group"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              id="featured-testimonial-card"
            >
              {/* Watermark Quote */}
              <div className="absolute top-6 right-8 text-cyan-500/10 pointer-events-none">
                <Quote className="w-20 h-20 rotate-180" />
              </div>

              <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
                <div>
                  {/* Top Bar: Rating & Verified Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      {renderStars(currentItem.rating)}
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                        ⭐ {currentItem.rating}/5
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-medium bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/50">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{currentItem.role}</span>
                    </div>
                  </div>

                  {/* The exact quote from marketinglu.com */}
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-100 font-medium leading-relaxed mb-8">
                    “{currentItem.quote}”
                  </blockquote>
                </div>

                {/* Reviewer Details & Carousel Controls */}
                <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${currentItem.avatarColor} flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-cyan-500/10 shrink-0`}>
                      {currentItem.initial}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {currentItem.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {currentItem.source}
                      </p>
                    </div>
                  </div>

                  {/* Carousel Arrows */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer active:scale-95"
                      aria-label="Previous testimonial"
                      id="carousel-prev"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-xs font-semibold text-slate-400 px-2">
                      <span className="text-white">{currentIndex + 1}</span> / {carouselTestimonials.length}
                    </div>
                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer active:scale-95"
                      aria-label="Next testimonial"
                      id="carousel-next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {carouselTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${idx === currentIndex
                    ? 'w-8 bg-cyan-400'
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* All 3 Cards Mini Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {consolidatedReviews.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${carouselTestimonials[currentIndex].name === item.name
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                    : 'bg-[#0a1120]/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="text-[11px] font-semibold text-amber-400">⭐ {item.rating}/5</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CONSOLIDATED LIST VIEW (Exact table requested by user) */}
        {activeTab === 'table' && (
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl bg-[#0a1120] border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-5 sm:p-6 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Consolidated Reviews Table
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Extracted from Marketing LU's verified testimonials section
                  </p>
                </div>
                <div className="text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-3 py-1 rounded-full">
                  3 Verified Reviews Included
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-bold text-white">
                        Reviewer
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold text-white whitespace-nowrap">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold text-white">
                        Review
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-normal">
                    {consolidatedReviews.map((rev) => (
                      <tr
                        key={rev.id}
                        className="hover:bg-slate-900/40 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                              {rev.initial}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">
                                {rev.name}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {rev.role}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 font-bold text-xs">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>⭐ {rev.rating}/5</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                            “{rev.quote}”
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Note matching user's extracted observation */}
              <div className="p-4 bg-slate-900/40 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Lalita Rani’s testimonial appears in active rotation within Marketing LU’s homepage testimonial carousel.
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
