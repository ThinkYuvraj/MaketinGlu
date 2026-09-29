import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { ShieldCheck, Cpu, Sparkles, Terminal } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

const STAGES = [
  { at: 0, title: 'SYSTEM BOOT', desc: 'Initializing Cloud Neural Architecture...', status: '0x01_BOOT' },
  { at: 25, title: 'ASSETS LOAD', desc: 'Compiling High-Conversion Brand Assets...', status: '0x02_ASSETS' },
  { at: 55, title: 'GPU SHADERS', desc: 'Calibrating 144Hz Hardware Acceleration...', status: '0x03_RENDER' },
  { at: 82, title: 'SECURITY AUDIT', desc: 'Verifying Core Web Vitals & SLA Metrics...', status: '0x04_VERIFY' },
  { at: 98, title: 'SYSTEMS ONLINE', desc: 'MarketinGlu Platform Ready.', status: '0x05_READY' },
];

export default function Preloader({ onComplete, minDurationMs = 1350 }: PreloaderProps) {
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
        }, 250);
      }
    };

    animFrame = requestAnimationFrame(updateLoader);
    return () => cancelAnimationFrame(animFrame);
  }, [minDurationMs, onComplete]);

  const currentStage = STAGES[stageIndex] || STAGES[0];

  return (
    <AnimatePresence font-sans>
      {isLoading && (
        <motion.div
          key="global-hud-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.03,
            filter: 'blur(12px)',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#02050e] select-none pointer-events-auto overflow-hidden font-sans"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/12 blur-[120px] rounded-full pointer-events-none" />

          {/* Futuristic Cyberpunk HUD Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Central HUD Card with Corner Brackets */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 sm:p-8 max-w-md w-full mx-4 rounded-3xl bg-[#060b18]/80 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.15)]">
            
            {/* Top HUD Status Bar */}
            <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>MARKETIN-GLU // ENGINE v4.2</span>
              </span>
              <span className="text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded">
                {currentStage.status}
              </span>
            </div>

            {/* Kinetic Spinning Orbit & Brand Badge */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-5">
              
              {/* Outer Counter-Clockwise Dash Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
              />

              {/* Inner Glowing Gradient Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 border-r-sky-300 shadow-[0_0_24px_rgba(6,182,212,0.5)]"
              />

              {/* Satellite Pulse Dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] absolute -top-1 left-1/2 -translate-x-1/2" />
              </motion.div>

              {/* Logo Core Card */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-[#0c162c] to-[#060a15] border border-cyan-400/60 shadow-2xl shadow-cyan-500/40 backdrop-blur-xl"
              >
                <Logo variant="light-badge" size="lg" />
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.div 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-1 flex items-center justify-center gap-1.5"
            >
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight italic">
                MARKETIN
              </span>
              <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 not-italic tracking-tight">
                GLU
              </span>
            </motion.div>

            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold mb-6">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Software &amp; Digital Engineering</span>
            </div>

            {/* Large Digital Counter & Progress Segment Track */}
            <div className="w-full relative space-y-3">
              
              {/* Dynamic Stage Title & Large Digital Percentage */}
              <div className="flex items-baseline justify-between text-left px-1">
                <div>
                  <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    {currentStage.title}
                  </div>
                  <div className="text-xs text-slate-300 font-medium truncate max-w-[200px] sm:max-w-[240px] mt-0.5">
                    {currentStage.desc}
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-cyan-400 shadow-cyan-500/20">
                  {progress < 10 ? `0${progress}` : progress}<span className="text-sm font-sans text-cyan-400 ml-0.5">%</span>
                </div>
              </div>

              {/* Multi-Segment LED Progress Track */}
              <div className="flex items-center gap-1 w-full p-1 rounded-xl bg-[#030712] border border-slate-800">
                {Array.from({ length: 12 }).map((_, segmentIdx) => {
                  const segmentThreshold = Math.floor(((segmentIdx + 1) / 12) * 100);
                  const isFilled = progress >= segmentThreshold;

                  return (
                    <motion.div
                      key={segmentIdx}
                      className={`h-2 flex-1 rounded-sm transition-all duration-200 ${
                        isFilled
                          ? 'bg-gradient-to-r from-cyan-500 to-sky-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                          : 'bg-slate-900/90'
                      }`}
                    />
                  );
                })}
              </div>

            </div>

            {/* Bottom HUD Metadata Footer */}
            <div className="w-full flex items-center justify-between pt-4 mt-6 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-cyan-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>ISO 9001:2015</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>144Hz SLA</span>
              </span>
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
