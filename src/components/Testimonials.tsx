import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { staggerContainerVariants, staggerItemVariants, cardHoverMotion, buttonHoverMotion, standardEase } from '../lib/animations';
import Container from './common/Container';

export default function Testimonials() {
  const { config } = useSiteConfig();
  const carouselTestimonials = config.testimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel rotation matching website behavior
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, carouselTestimonials.length]);

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

      <Container className="relative z-10">

        {/* Section Header matching Figma & MarketingGlu website */}
        <div className="text-center max-w-3xl xl:max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2 shadow-sm shadow-cyan-500/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1 mb-3 tracking-tight">
            What Our Clients Say About MarketinGlu
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Direct feedback from verified business partners and technical collaborations.
          </p>

          {/* Average Rating Score Summary Badge */}
          <div className="mt-5 inline-flex items-center gap-3 sm:gap-4 px-4 py-2 rounded-xl bg-[#0a1120] border border-slate-800 shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black text-white font-mono">5.0</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="text-xs text-slate-300 font-medium">
              Verified Client Satisfaction
            </div>
          </div>
        </div>

        {/* FEATURED TESTIMONIAL CAROUSEL */}
        <div className="relative max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
            {/* Main Featured Testimonial Card */}
            <div
              className="relative p-5 sm:p-8 lg:p-12 xl:p-14 rounded-2xl sm:rounded-3xl bg-[#0c1322] border border-cyan-500/25 shadow-2xl transition-all duration-300 group"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              id="featured-testimonial-card"
            >
              {/* Watermark Quote */}
              <div className="absolute top-6 right-8 text-cyan-500/10 pointer-events-none">
                <Quote className="w-16 h-16 sm:w-20 sm:h-20 rotate-180" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: standardEase }}
                  className="relative z-10 flex flex-col justify-between min-h-[200px]"
                >
                  <div>
                    {/* Top Bar: Rating & Verified Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        {renderStars(currentItem.rating)}
                        <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700/60">
                          {currentItem.rating}.0 / 5.0
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-medium bg-cyan-950/40 px-3 py-1 rounded-md border border-cyan-800/50">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{currentItem.role}</span>
                      </div>
                    </div>

                    {/* The verified quote */}
                    <blockquote className="text-base sm:text-xl md:text-2xl xl:text-3xl text-slate-100 font-medium leading-relaxed mb-6 sm:mb-8">
                      “{currentItem.quote}”
                    </blockquote>
                  </div>

                  {/* Reviewer Details & Carousel Controls */}
                  <div className="pt-5 sm:pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${currentItem.avatarColor} flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-md shadow-cyan-500/10 shrink-0`}>
                        {currentItem.initial}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {currentItem.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {currentItem.source}
                        </p>
                      </div>
                    </div>

                    {/* Carousel Arrows with >=44px touch targets */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <motion.button
                        {...buttonHoverMotion}
                        onClick={handlePrev}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer active:scale-95 min-h-[44px] min-w-[44px]"
                        aria-label="Previous testimonial"
                        id="carousel-prev"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>
                      <div className="text-xs font-semibold text-slate-400 px-2 font-mono">
                        <span className="text-white">{currentIndex + 1}</span> / {carouselTestimonials.length}
                      </div>
                      <motion.button
                        {...buttonHoverMotion}
                        onClick={handleNext}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer active:scale-95 min-h-[44px] min-w-[44px]"
                        aria-label="Next testimonial"
                        id="carousel-next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
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
                  className={`h-2 rounded-md transition-all cursor-pointer ${idx === currentIndex
                    ? 'w-8 bg-cyan-400'
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* All 3 Cards Mini Preview Grid */}
            <motion.div 
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              {carouselTestimonials.map((item, idx) => (
                <motion.div
                  key={item.id}
                  variants={staggerItemVariants}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer text-left ${carouselTestimonials[currentIndex].name === item.name
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                    : 'bg-[#0a1120]/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 font-mono">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    "{item.quote}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

      </Container>
    </section>
  );
}
