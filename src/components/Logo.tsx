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
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-10 md:h-11',
    lg: 'h-12 sm:h-14 md:h-16',
  };

  const logoSrc = '/images/marketingglu_icon.png';

  // Light badge mode (used in Navbar, Footer, Admin Login, Admin Dashboard)
  if (variant === 'light-badge' || variant === 'auto') {
    return (
      <div 
        className={`inline-flex items-center bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl shadow-xs border border-slate-200 hover:shadow-md transition-all ${className}`}
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
        className={`inline-flex items-center bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 shadow-md ${className}`}
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

  // Transparent or inline mode
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
