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
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-[15px] sm:text-[17px]',
    lg: 'text-lg sm:text-xl',
  };

  // Light badge mode (e.g., Navbar, Footer, Admin Login, Admin Dashboard)
  if (variant === 'light-badge') {
    const imgHeights = {
      sm: 'h-6 sm:h-7',
      md: 'h-7 sm:h-8 md:h-9',
      lg: 'h-9 sm:h-11',
    };

    return (
      <div className={`inline-flex items-center bg-white px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all ${className}`}>
        <img 
          src="/logo.svg" 
          alt="Marketing LU - Digital Brand Management" 
          className={`${imgHeights[size]} w-auto object-contain block`}
        />
      </div>
    );
  }

  // Dark badge mode
  if (variant === 'dark-badge') {
    return (
      <div className={`inline-flex items-center bg-[#090e1c] px-3.5 py-2 rounded-xl border border-slate-800 shadow-md ${className}`}>
        <img 
          src="/logo-white.svg" 
          alt="Marketing LU - Digital Brand Management" 
          className="h-8 sm:h-9 w-auto object-contain"
        />
      </div>
    );
  }

  // Transparent image mode
  if (variant === 'transparent') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img 
          src="/logo-white.svg" 
          alt="Marketing LU - Digital Brand Management" 
          className="h-8 sm:h-10 w-auto object-contain"
        />
      </div>
    );
  }

  // Adaptive (Auto) - Vector Inverted Triangle MG Crest with high-contrast text for dark navbar & hero
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Inverted Triangle MG Emblem */}
      <div className={`${iconDimensions[size]} rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-teal-400 p-[1.5px] shadow-sm shadow-cyan-500/20 shrink-0`}>
        <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center p-1 sm:p-1.5 transition-colors">
          <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outer Inverted Triangle */}
            <path d="M 6 8 L 154 8 L 80 106 Z" stroke="#38bdf8" strokeWidth="12" strokeLinejoin="miter" strokeMiterlimit="4" />
            {/* Center dividing vertical spine */}
            <line x1="80" y1="8" x2="80" y2="94" stroke="#38bdf8" strokeWidth="11" />
            {/* Left 'M' vertical bars */}
            <line x1="36" y1="8" x2="36" y2="60" stroke="#ffffff" strokeWidth="10" strokeLinecap="butt" />
            <line x1="58" y1="8" x2="58" y2="60" stroke="#ffffff" strokeWidth="10" strokeLinecap="butt" />
            {/* Right 'G' inner spur and crossbar */}
            <path d="M 124 40 L 124 64 L 88 64" stroke="#38bdf8" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center">
          <span className={`${titleSizes[size]} font-black tracking-tight text-white leading-tight font-sans transition-colors`}>
            MARKETING<span className="text-cyan-400">LU</span>
          </span>
          <span className="text-[9px] font-bold text-slate-400 ml-0.5 -mt-2">®</span>
        </div>
        {showSubtitle && (
          <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-400 tracking-wider uppercase leading-none mt-0.5 transition-colors">
            Digital Brand Management
          </span>
        )}
      </div>
    </div>
  );
}
