'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <motion.button
      className={cn(
        'relative flex items-center justify-center rounded-full border-2 border-border dark:border-border bg-background dark:bg-background shadow-lg hover:shadow-xl transition-all duration-300',
        sizeClasses[size],
        className
      )}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-accent to-secondary-accent opacity-0"
        animate={{
          opacity: theme === 'dark' ? 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icons */}
      <div className="relative z-10">
        {/* Sun icon (visible in light mode) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 180,
            scale: theme === 'light' ? 1 : 0.5,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <Sun size={iconSize[size]} className="text-yellow-500" />
        </motion.div>

        {/* Moon icon (visible in dark mode) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
            scale: theme === 'dark' ? 1 : 0.5,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <Moon size={iconSize[size]} className="text-blue-400" />
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: theme === 'dark'
            ? '0 0 20px rgba(59, 130, 246, 0.3)'
            : '0 0 20px rgba(251, 191, 36, 0.3)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle rotation animation */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary-accent/20"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.button>
  );
}