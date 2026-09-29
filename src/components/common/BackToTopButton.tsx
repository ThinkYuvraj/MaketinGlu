import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { standardEase } from '../../lib/animations';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if we scroll past 400px (roughly past or within hero)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: standardEase }}
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-24 lg:bottom-8 right-4 sm:right-6 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#080e1c]/90 backdrop-blur-md border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 flex items-center justify-center shadow-xl shadow-cyan-500/20 cursor-pointer transition-all active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
