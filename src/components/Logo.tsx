export interface LogoProps {
  variant?: 'auto' | 'light-badge' | 'dark-badge' | 'inline' | 'transparent';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function Logo({
  variant = 'auto',
  className = '',
  size = 'md',
  showSubtitle = true,
}: LogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-[15px] sm:text-[17px]',
    lg: 'text-lg sm:text-xl',
  };

  if (variant === 'light-badge') {
    return (
      <div className={`inline-flex items-center bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200/90 ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-7 h-7">
            <svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-6">
              <path d="M4 6L14 26L20 14L26 26L36 6L28 6L23 18L20 11L17 18L12 6L4 6Z" fill="#0f172a" />
              <path d="M16 4L20 10L24 4H20H16Z" fill="#0284c7" />
              <circle cx="36" cy="7" r="2.5" stroke="#0f172a" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <div className="text-[14px] font-extrabold tracking-tight text-slate-900 leading-tight font-sans">
              <span>MARKETING<span className="text-sky-600">LU</span></span>
            </div>
            {showSubtitle && (
              <span className="text-[7.5px] font-semibold text-slate-500 tracking-wider uppercase leading-none mt-0.5">
                Digital Brand Management
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Adaptive (Auto) responds to dark/light theme seamlessly
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      <div className={`${iconDimensions[size]} rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-teal-400 p-[1.5px] shadow-sm shadow-cyan-500/20 shrink-0`}>
        <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center transition-colors">
          <svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 sm:w-5.5 sm:h-4.5">
            <path d="M4 6L14 26L20 14L26 26L36 6L28 6L23 18L20 11L17 18L12 6L4 6Z" className="fill-[#38bdf8] transition-colors" />
            <path d="M16 4L20 10L24 4H20H16Z" className="fill-[#38bdf8] transition-colors" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className={`${titleSizes[size]} font-black tracking-tight text-white leading-tight font-sans transition-colors`}>
          MARKETING<span className="text-cyan-400">LU</span>
        </span>
        {showSubtitle && (
          <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 tracking-wider uppercase leading-none mt-0.5 transition-colors">
            Digital Brand Management
          </span>
        )}
      </div>
    </div>
  );
}
