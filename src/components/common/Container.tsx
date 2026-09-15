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
    narrow: 'max-w-4xl',
    standard: 'max-w-7xl',
    wide: 'max-w-7xl xl:max-w-7xl 2xl:max-w-[1440px]',
    full: 'w-full',
  }[size];

  return (
    <div 
      id={id}
      className={`w-full ${sizeClasses} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
