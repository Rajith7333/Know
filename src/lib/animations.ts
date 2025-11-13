import { Variants } from 'framer-motion';

// Base animation variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const slideInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const slideInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const scaleOut: Variants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
};

// Stagger container for animating children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFastContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Letter animation for text
export const letterAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    }
  },
};

// Typing animation
export const typingAnimation: Variants = {
  initial: { width: 0 },
  animate: {
    width: '100%',
    transition: {
      duration: 2,
      ease: 'easeInOut',
    }
  },
};

// Blinking cursor
export const blinkCursor: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.75,
      repeat: Infinity,
      repeatType: 'reverse',
    }
  },
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const hoverScaleLift = {
  whileHover: {
    scale: 1.05,
    y: -5,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  whileTap: { scale: 0.98 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.3 }
  },
};

// Card animations
export const cardFlip: Variants = {
  initial: { rotateY: 0 },
  animate: { rotateY: 180 },
  exit: { rotateY: 0 },
};

// Modal animations
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 }
  },
};

// Navigation animations
export const navItem: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const mobileMenu: Variants = {
  initial: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%' },
};

// Progress bar animation
export const progressBar: Variants = {
  initial: { width: '0%' },
  animate: {
    width: '100%',
    transition: { duration: 1.5, ease: 'easeOut' }
  },
};

// Particle animation
export const floatParticle: Variants = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [-10, 10],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  },
};

// Spring configurations
export const gentleSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

export const bouncySpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 10,
};

export const smoothSpring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 }
  },
};

// Scroll animation trigger variants
export const scrollTriggerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    }
  },
};

// Skill card animation
export const skillCard: Variants = {
  initial: { opacity: 0, scale: 0.8, rotateY: -10 },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateY: -10
  },
};

// Project card hover animation
export const projectCardHover = {
  whileHover: {
    scale: 1.02,
    rotateY: 5,
    rotateX: 5,
    z: 50,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
};

// Form input animation
export const inputFocus: Variants = {
  initial: { scale: 1 },
  focus: {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  },
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  },
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  },
};