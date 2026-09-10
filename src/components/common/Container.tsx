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
  size = 'wide',
  id 
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    standard: 'max-w-6xl',
    wide: 'max-w-[1720px] 2xl:max-w-[1840px]',
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
