'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  className?: string;
  targetId?: string;
  label?: string;
}

export function ScrollIndicator({
  className,
  targetId = 'about',
  label = 'Scroll Down'
}: ScrollIndicatorProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className={cn(
        'absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group',
        className
      )}
      onClick={scrollToSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
    >
      {/* Label */}
      <motion.p
        className="text-sm text-secondary dark:text-secondary-dark mb-2 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {label}
      </motion.p>

      {/* Chevron */}
      <motion.div
        className="flex flex-col items-center space-y-1"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown
          size={24}
          className="text-primary-accent group-hover:text-secondary-accent transition-colors"
        />
        <ChevronDown
          size={24}
          className="text-primary-accent group-hover:text-secondary-accent transition-colors"
        />
      </motion.div>

      {/* Hover effect ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary-accent opacity-0 group-hover:opacity-20"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}