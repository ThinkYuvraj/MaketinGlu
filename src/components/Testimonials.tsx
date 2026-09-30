import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { buttonHoverMotion, standardEase } from '../lib/animations';
import Container from './common/Container';

export default function Testimonials() {
  const { config } = useSiteConfig();
  const carouselTestimonials = config.testimonials && config.testimonials.length > 0 ? config.testimonials : [];
  const totalReviews = carouselTestimonials.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Calculate average rating dynamically
  const avgRating = useMemo(() => {
    if (totalReviews === 0) return '5.0';
    const sum = carouselTestimonials.reduce((acc, r) => acc + (r.rating || 5), 0);
    return (sum / totalReviews).toFixed(1);
  }, [carouselTestimonials, totalReviews]);

  // Keep index within bounds
  useEffect(() => {
    if (totalReviews > 0 && currentIndex >= totalReviews) {
      setCurrentIndex(0);
    }
  }, [totalReviews, currentIndex]);

  // Auto-play carousel rotation
  useEffect(() => {
    if (!isAutoPlaying || totalReviews <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % totalReviews);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, totalReviews]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const handleSelectReview = (idx: number) => {
    setIsAutoPlaying(false);
    setSlideDirection(idx > currentIndex ? 'right' : 'left');
    setCurrentIndex(idx);
  };

  const currentItem = carouselTestimonials[currentIndex] || carouselTestimonials[0];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= rating
                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]'
                : 'text-slate-700'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!currentItem) return null;

  return (
    <section 
      id="testimonials" 
      className="relative py-16 sm:py-20 lg:py-24 bg-[#070b14] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[220px] bg-cyan-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">

        {/* Centered Compact Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2.5 shadow-sm shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>VERIFIED CLIENT FEEDBACK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            What Our Clients Say{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              About MarketingGlu
            </span>
          </h2>

          <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Authentic reviews and quantifiable growth results directly from verified Indian client partnerships.
          </p>

          {/* Centered Rating Pill & Mini Controls */}
          <div className="mt-4 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#0a1120] border border-slate-800 shadow-sm">
            <span className="text-sm font-black text-white font-mono">{avgRating}</span>
            {renderStars(5)}
            <span className="text-[11px] text-slate-400 pl-1.5 border-l border-slate-800">
              {totalReviews} Verified Reviews
            </span>

            <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-slate-800">
              <motion.button
                {...buttonHoverMotion}
                onClick={handlePrev}
                className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-cyan-400" />
              </motion.button>
              <motion.button
                {...buttonHoverMotion}
                onClick={handleNext}
                className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* COMPACT TESTIMONIAL CARD */}
        <div className="relative max-w-5xl mx-auto">
          <div
            className="relative p-5 sm:p-6 lg:p-7 rounded-2xl bg-gradient-to-r from-[#0c1424]/95 via-[#09101d]/95 to-[#070c18]/98 border border-cyan-500/30 shadow-xl backdrop-blur-xl transition-all duration-300 group overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            id="featured-testimonial-card"
          >
            {/* Watermark Quote Icon */}
            <div className="absolute top-4 right-6 text-cyan-500/[0.07] pointer-events-none">
              <Quote className="w-14 h-14 rotate-180" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentItem.id}
                initial={{ opacity: 0, x: slideDirection === 'right' ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection === 'right' ? -24 : 24 }}
                transition={{ duration: 0.25, ease: standardEase }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 35;
                  const velocityThreshold = 180;
                  if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                    handlePrev();
                  }
                }}
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {/* Left / Top: Reviewer Profile */}
                <div className="lg:col-span-4 flex items-center lg:flex-col lg:items-start gap-3.5 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-4 lg:pb-0 lg:pr-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentItem.avatarColor} flex items-center justify-center text-white font-black text-base shadow-md shadow-cyan-500/10 shrink-0`}>
                    {currentItem.initial}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                      {currentItem.name}
                    </h4>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5">
                      {currentItem.role}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{currentItem.source}</span>
                    </p>
                  </div>
                </div>

                {/* Right / Body: Highlight, Quote, Stars */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {renderStars(currentItem.rating)}
                      <span className="text-xs font-bold text-amber-300 font-mono">
                        {currentItem.rating}.0 / 5.0
                      </span>
                    </div>

                    {currentItem.highlight && (
                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-md truncate">
                        {currentItem.highlight}
                      </span>
                    )}
                  </div>

                  {/* Punchy Quote */}
                  <blockquote className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic">
                    “{currentItem.quote}”
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Compact Slide Tracker Indicator */}
          <div className="flex items-center justify-between mt-3 px-2">
            <span className="text-[11px] text-slate-400 font-mono">
              Review <span className="text-cyan-400 font-bold">{currentIndex + 1}</span> of {totalReviews}
            </span>

            {/* Step Indicator Bars */}
            <div className="flex items-center gap-1.5">
              {carouselTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectReview(idx)}
                  className={`h-1.5 rounded-sm transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/40'
                      : 'w-2 bg-slate-800 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
