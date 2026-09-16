import { type Variants, type Transition } from 'motion/react';

// Unified motion timing and physics across Marketing LU
export const standardEase = [0.22, 1, 0.36, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.55,
  ease: standardEase,
};

// Section / Block Fade-Up
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Subtle Page-level Transition Variants for Route & View Changes
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: standardEase,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: standardEase,
    },
  },
};

// Subtle Section-level Fade-in Transition Variants
export const sectionFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: standardEase,
    },
  },
};

// Stagger container for grids of cards
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

// Stagger item for individual cards
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Unified Card Hover Physics
export const cardHoverMotion = {
  whileTap: { 
    scale: 0.99,
    transition: { duration: 0.15 } 
  },
};

// Unified Button Hover & Tap Physics
export const buttonHoverMotion = {
  whileTap: { 
    scale: 0.975,
    transition: { duration: 0.1 } 
  },
};
