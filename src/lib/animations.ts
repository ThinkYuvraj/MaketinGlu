import { type Variants, type Transition } from 'motion/react';

// 144Hz Ultra-Smooth Physics & Cubic Bezier Curves (Linear / Apple caliber)
export const standardEase = [0.22, 1, 0.36, 1] as const;
export const ultraSmoothEase = [0.16, 1, 0.3, 1] as const;
export const silkyEase = [0.25, 0.1, 0.25, 1.0] as const;

export const spring144Hz = {
  type: "spring" as const,
  stiffness: 340,
  damping: 32,
  mass: 0.65,
  restDelta: 0.001,
};

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: ultraSmoothEase,
};

// Section / Block Fade-Up
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// High-Refresh Page-level Transition Variants
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: ultraSmoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(2px)',
    transition: {
      duration: 0.2,
      ease: standardEase,
    },
  },
};

// Section-level Fade-in Transition Variants
export const sectionFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: ultraSmoothEase,
    },
  },
};

// Stagger container for card grids
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

// Stagger item for individual cards
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: ultraSmoothEase,
    },
  },
};

// Ultra-Smooth Swipable Carousel Slide Variants (GPU-accelerated)
export const carouselSlideVariants: Variants = {
  enter: (direction: 'left' | 'right' | string) => ({
    x: direction === 'right' ? '100%' : '-100%',
    opacity: 0.15,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
    transition: spring144Hz,
  },
  exit: (direction: 'left' | 'right' | string) => ({
    x: direction === 'right' ? '-100%' : '100%',
    opacity: 0.15,
    scale: 0.96,
    zIndex: 0,
    transition: {
      duration: 0.28,
      ease: standardEase,
    },
  }),
};

// Unified Card Hover Physics
export const cardHoverMotion = {
  whileHover: { 
    y: -3,
    transition: { duration: 0.2, ease: ultraSmoothEase } 
  },
  whileTap: { 
    scale: 0.985,
    transition: { duration: 0.1 } 
  },
};

// Unified Button Hover & Tap Physics
export const buttonHoverMotion = {
  whileHover: { 
    scale: 1.02,
    transition: { duration: 0.18, ease: ultraSmoothEase } 
  },
  whileTap: { 
    scale: 0.975,
    transition: { duration: 0.08 } 
  },
};
