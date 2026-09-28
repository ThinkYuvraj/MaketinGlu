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
          className="fixed bottom-24 lg:bottom-10 right-6 z-30 w-11 h-11 rounded-xl bg-slate-900 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 flex items-center justify-center shadow-xl shadow-cyan-500/20 cursor-pointer transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
