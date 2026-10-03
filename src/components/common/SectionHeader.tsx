import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badgeText?: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  badgeText,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  align = 'center',
  action,
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div 
      className={`mb-10 sm:mb-14 ${
        isCenter 
          ? 'text-center max-w-3xl xl:max-w-4xl mx-auto' 
          : 'flex flex-col sm:flex-row sm:items-end justify-between gap-4'
      } ${className}`}
    >
      <div className={isCenter ? '' : 'max-w-3xl'}>
        {badgeText && (
          <div className={`flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 ${isCenter ? 'justify-center' : ''}`}>
            <span className="w-1.5 h-1.5 bg-cyan-400 shrink-0" />
            <span>{badgeText}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl text-justify ${isCenter ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className={`shrink-0 ${isCenter ? 'mt-4' : ''}`}>
          {action}
        </div>
      )}
    </div>
  );
}
