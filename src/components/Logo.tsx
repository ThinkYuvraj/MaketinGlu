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
}: LogoProps) {
  const imgHeights = {
    sm: 'h-6 sm:h-7 md:h-8',
    md: 'h-7 sm:h-8 md:h-9',
    lg: 'h-10 sm:h-12 md:h-14',
  };

  const logoSrc = '/images/marketingglu_icon.webp';

  // Light badge mode (used in Navbar, Footer, Admin Login, Admin Dashboard)
  if (variant === 'light-badge' || variant === 'auto') {
    return (
      <div 
        className={`inline-flex items-center bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl shadow-xs border border-slate-200 hover:shadow-md transition-all ${className}`}
        id="MarketinGlu-brand-logo"
      >
        <img 
          src={logoSrc} 
          alt="MarketinGlu" 
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
        className={`inline-flex items-center bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl border border-slate-200 shadow-md ${className}`}
        id="MarketinGlu-brand-logo-dark"
      >
        <img 
          src={logoSrc} 
          alt="MarketinGlu" 
          referrerPolicy="no-referrer"
          className={`${imgHeights[size]} w-auto object-contain block`}
        />
      </div>
    );
  }

  // Transparent or inline mode
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="MarketinGlu" 
        referrerPolicy="no-referrer"
        className={`${imgHeights[size]} w-auto object-contain block`}
      />
    </div>
  );
}
