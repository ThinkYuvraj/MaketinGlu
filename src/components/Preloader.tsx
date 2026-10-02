import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

const STAGES = [
  { at: 0, text: 'Initializing Neural Architecture...', code: 'SYS_BOOT' },
  { at: 28, text: 'Compiling High-Conversion Brand Assets...', code: 'ASSET_LOAD' },
  { at: 62, text: 'Calibrating 144Hz Smooth Engine & GPU Shaders...', code: 'GPU_ACCEL' },
  { at: 88, text: 'Verifying Security & Core Web Vitals...', code: 'AUDIT_OK' },
  { at: 99, text: 'MarketingGlu Systems Ready.', code: 'ONLINE' },
];

export default function Preloader({ onComplete, minDurationMs = 1250 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    let animFrame: number;

    const updateLoader = () => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));
      
      setProgress(rawProgress);

      const nextStage = STAGES.slice().reverse().find(s => rawProgress >= s.at) || STAGES[0];
      setStageIndex(STAGES.indexOf(nextStage));

      if (rawProgress < 100) {
        animFrame = requestAnimationFrame(updateLoader);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 220);
      }
    };

    animFrame = requestAnimationFrame(updateLoader);
    return () => cancelAnimationFrame(animFrame);
  }, [minDurationMs, onComplete]);

  const currentStage = STAGES[stageIndex] || STAGES[0];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-luxury-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#040711] select-none pointer-events-auto overflow-hidden"
        >
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(6,182,212,0.8) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Multi-layered Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-sky-600/12 blur-[100px] rounded-full pointer-events-none" />

          {/* Central Showcase Pod */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
            
            {/* Dual Orbital Rings with Glowing Logo */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
              
              {/* Outer Counter-Clockwise Dash Orbit */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/25"
              />

              {/* Inner Clockwise Glowing Gradient Orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-t-2 border-r-2 border-transparent border-t-cyan-400 border-r-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              />

              {/* Satellite Pulse Dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee] absolute -top-1 left-1/2 -translate-x-1/2" />
              </motion.div>

              {/* Logo Core Card */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-[#0c152a] to-[#070c18] border border-cyan-400/50 shadow-2xl shadow-cyan-500/30 backdrop-blur-xl"
              >
                <Logo variant="light-badge" size="lg" />
              </motion.div>
            </div>

            {/* Brand Title with High-Prestige Neon Shimmer */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-1.5 flex items-center justify-center gap-1.5"
            >
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight italic">
                MARKETIN
              </span>
              <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 not-italic tracking-tight">
                GLU
              </span>
            </motion.div>

            {/* Sub-tagline badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold mb-7"
            >
              <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400/30" />
              <span>Software &amp; Digital Growth Engine</span>
            </motion.div>

            {/* Precision Futuristic Progress Track */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] relative">
              
              {/* Outer Track */}
              <div className="h-2 w-full bg-[#080e1e] rounded-full overflow-hidden border border-slate-800/90 p-[1.5px] relative shadow-inner">
                {/* Active Gradient Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 rounded-full shadow-[0_0_14px_rgba(6,182,212,0.9)] relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Internal Scanning Beam */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                  />
                </motion.div>
              </div>

              {/* Dynamic Status HUD & Percentage Counter */}
              <div className="flex items-center justify-between mt-2.5 text-xs font-mono">
                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0 shadow-[0_0_6px_#22d3ee]" />
                  <span className="text-[11px] text-slate-300 truncate font-sans text-left">
                    {currentStage.text}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] text-cyan-400/70 font-mono">[{currentStage.code}]</span>
                  <span className="font-extrabold text-cyan-300 text-xs font-mono min-w-[38px] text-right">
                    {progress}%
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Enterprise Badge Verification */}
          <div className="absolute bottom-6 flex items-center gap-2.5 text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wider">
            <span className="flex items-center gap-1 text-cyan-400/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>ISO 9001:2015</span>
            </span>
            <span className="text-slate-600">&bull;</span>
            <span>ENTERPRISE GRADE</span>
            <span className="text-slate-600">&bull;</span>
            <span>NEW DELHI</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
