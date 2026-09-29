import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export default function Preloader({ onComplete, minDurationMs = 1200 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusText, setStatusText] = useState('Initializing Core Engines...');

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      setProgress(calculatedProgress);

      if (calculatedProgress < 35) {
        setStatusText('Loading Design Assets...');
      } else if (calculatedProgress < 75) {
        setStatusText('Optimizing 144Hz Smooth Engine...');
      } else if (calculatedProgress < 100) {
        setStatusText('Ready & Verified...');
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -18,
            filter: 'blur(8px)',
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050811] select-none pointer-events-auto"
        >
          {/* Ambient Glows */}
          <div className="absolute w-[400px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Central Logo and Glowing Ring Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            
            {/* Pulsing Ring with Logo */}
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-dashed border-cyan-400/40"
              />
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-1 rounded-2xl bg-cyan-500/20 blur-md"
              />
              <div className="relative p-2 rounded-2xl bg-[#090f20] border border-cyan-500/50 shadow-2xl shadow-cyan-500/30">
                <Logo variant="light-badge" size="lg" />
              </div>
            </div>

            {/* Brand Title */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl sm:text-3xl font-black tracking-tight mb-2 flex items-center justify-center gap-1"
            >
              <span className="text-white italic">MARKETIN</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 not-italic">
                GLU
              </span>
            </motion.div>

            {/* Sub-tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold mb-6"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Digital Marketing Solutions</span>
            </motion.div>

            {/* Futuristic Progress Bar */}
            <div className="w-64 sm:w-72 relative">
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress percentage & dynamic status */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mt-2.5 px-0.5">
                <span className="truncate text-[11px]">{statusText}</span>
                <span className="font-bold text-cyan-400 text-xs ml-2">{progress}%</span>
              </div>
            </div>

          </div>

          {/* Bottom Trust Watermark */}
          <div className="absolute bottom-6 text-[11px] text-slate-400 font-mono tracking-wider flex items-center gap-2">
            <span>ISO 9001:2015 CERTIFIED</span>
            <span className="text-slate-500">&bull;</span>
            <span>NEW DELHI</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
