import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'standard' | 'narrow' | 'wide' | 'full';
  id?: string;
}

export default function Container({ 
  children, 
  className = '', 
  size = 'standard',
  id 
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-5xl xl:max-w-6xl 2xl:max-w-7xl',
    standard: 'max-w-[1720px] 2xl:max-w-[1840px]',
    wide: 'max-w-[1840px] 2xl:max-w-[1920px]',
    full: 'w-full',
  }[size];

  return (
    <div 
      id={id}
      className={`w-full ${sizeClasses} mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
