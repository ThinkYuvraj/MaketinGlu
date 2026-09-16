import React from 'react';
import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { standardEase } from '../lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delayMs?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  id,
  delayMs = 0,
}: AnimatedSectionProps) {
  const { config } = useSiteConfig();
  const anchorClass = id ? 'scroll-mt-20 lg:scroll-mt-24' : '';

  // If animations disabled via Admin UI/UX settings
  if (!config.animationsEnabled) {
    return (
      <div id={id} className={`${anchorClass} ${className}`.trim()}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={`${anchorClass} ${className}`.trim()}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        ease: standardEase,
        delay: delayMs / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
