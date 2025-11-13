'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideInUp, slideInLeft, slideInRight, scaleIn } from '@/lib/animations';
import { useScrollAnimation } from './useScrollAnimation';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  triggerOnce?: boolean;
  threshold?: number;
  staggerChildren?: number;
  as?: keyof JSX.IntrinsicElements;
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 20,
  triggerOnce = true,
  threshold = 0.1,
  staggerChildren = 0,
  as = 'div',
  ...props
}: FadeInProps) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  // Get animation variants based on direction
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: distance },
        };
      case 'down':
        return {
          initial: { opacity: 0, y: -distance },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -distance },
        };
      case 'left':
        return {
          initial: { opacity: 0, x: -distance },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -distance },
        };
      case 'right':
        return {
          initial: { opacity: 0, x: distance },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: distance },
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        };
      default: // fade
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const variants = getVariants();

  const containerVariants = staggerChildren > 0
    ? {
        initial: {},
        animate: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }
    : variants;

  const MotionComponent = motion[as as keyof typeof motion];

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="initial"
      animate={shouldAnimate ? "animate" : "initial"}
      variants={staggerChildren > 0 ? containerVariants : variants}
      transition={{
        duration,
        delay: staggerChildren === 0 ? delay : 0,
        ease: 'easeOut',
      }}
      {...(props as any)}
    >
      {staggerChildren > 0 ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={variants}
            transition={{
              duration,
              delay: delay + index * staggerChildren,
              ease: 'easeOut',
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </MotionComponent>
  );
}

// Stagger fade in for lists/grids
export function StaggerFadeIn({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0.2,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
} & Omit<FadeInProps, 'staggerChildren' | 'delay'>) {
  return (
    <FadeIn
      className={className}
      staggerChildren={staggerDelay}
      delay={initialDelay}
      {...props}
    >
      {children}
    </FadeIn>
  );
}

// Scale in component
export function ScaleIn({
  children,
  className = '',
  delay = 0,
  scale = 0.8,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: number;
} & Omit<FadeInProps, 'direction' | 'distance'>) {
  const { ref, shouldAnimate } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale }}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Slide in component
export function SlideIn({
  children,
  className = '',
  delay = 0,
  direction = 'left',
  distance = 50,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
} & Omit<FadeInProps, 'direction'>) {
  const { ref, shouldAnimate } = useScrollAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, opacity: 0 };
      case 'right':
        return { x: distance, opacity: 0 };
      case 'up':
        return { y: -distance, opacity: 0 };
      case 'down':
        return { y: distance, opacity: 0 };
      default:
        return { x: -distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={shouldAnimate ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}