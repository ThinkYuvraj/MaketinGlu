import React, { useEffect, useRef, useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delayMs?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  id,
  delayMs = 0,
  threshold = 0.12,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useSiteConfig();

  useEffect(() => {
    if (!config.animationsEnabled) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, config.animationsEnabled]);

  // If animations disabled via Admin UI/UX settings
  if (!config.animationsEnabled) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      id={id}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}
