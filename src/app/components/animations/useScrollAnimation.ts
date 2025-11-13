'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    margin: rootMargin,
    once: triggerOnce,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setHasAnimated(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setHasAnimated(true);
      }
    }
  }, [isInView, hasAnimated, delay]);

  return {
    ref,
    isInView,
    hasAnimated,
    shouldAnimate: triggerOnce ? hasAnimated : isInView,
  };
}

// Hook for parallax scrolling effect
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate parallax offset only when element is in view
        if (elementTop < scrollTop + windowHeight && elementTop + elementHeight > scrollTop) {
          const relativeY = (scrollTop - elementTop) * speed;
          setOffset(relativeY);
        }
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed]);

  return { ref, offset };
}

// Hook for mouse tracking
export function useMouseTracking() {
  const ref = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return { ref, mousePosition };
}

// Hook for detecting device type
export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return deviceType;
}

// Hook for reduced motion preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Hook for scroll direction
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      // Only update direction if scroll amount is significant
      if (Math.abs(scrollY - lastScrollY) > 5) {
        setScrollDirection(direction);
        setLastScrollY(scrollY);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [lastScrollY]);

  return scrollDirection;
}