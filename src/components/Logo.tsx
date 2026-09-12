import marketingGluLogoImg from '../assets/marketingglu_icon.png';

export interface LogoProps {
  variant?: 'auto' | 'light-badge' | 'dark-badge' | 'inline' | 'transparent';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function Logo({
  variant = 'light-badge',
  className = '',
  size = 'md',
  showSubtitle = true,
}: LogoProps) {
  const imgHeights = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-9 md:h-10',
    lg: 'h-10 sm:h-12 md:h-14',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-[15px] sm:text-[17px]',
    lg: 'text-lg sm:text-xl',
  };

  const logoSrc = marketingGluLogoImg || '/marketingglu_icon.png';

  // Light badge mode (used in Navbar, Footer, Admin Login, Admin Dashboard)
  if (variant === 'light-badge' || variant === 'auto') {
    return (
      <div 
        className={`inline-flex items-center bg-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all ${className}`}
        id="marketingglu-brand-logo"
      >
        <img 
          src={logoSrc} 
          alt="MarketingGlu" 
          referrerPolicy="no-referrer"
          className={`${imgHeights[size]} w-auto object-contain block`}
        />
      </div>
    );
  }

  // Dark badge mode
  if (variant === 'dark-badge') {
    return (
      <div 
        className={`inline-flex items-center bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-md ${className}`}
        id="marketingglu-brand-logo-dark"
      >
        <img 
          src={logoSrc} 
          alt="MarketingGlu" 
          referrerPolicy="no-referrer"
          className={`${imgHeights[size]} w-auto object-contain block`}
        />
      </div>
    );
  }

  // Transparent image mode
  if (variant === 'transparent') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img 
          src={logoSrc} 
          alt="MarketingGlu" 
          referrerPolicy="no-referrer"
          className={`${imgHeights[size]} w-auto object-contain block`}
        />
      </div>
    );
  }

  // Inline mode with image icon and brand typography
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs shrink-0">
        <img 
          src={logoSrc} 
          alt="MarketingGlu" 
          referrerPolicy="no-referrer"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
        />
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center">
          <span className={`${titleSizes[size]} font-black tracking-tight text-white leading-tight font-sans transition-colors`}>
            MARKETING<span className="text-cyan-400">GLU</span>
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
