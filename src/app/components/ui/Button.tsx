'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { hoverScale } from '@/lib/animations';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-primary-accent text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent text-primary-accent border-2 border-primary-accent hover:bg-primary-accent hover:text-white',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:border-primary',
    ghost: 'bg-transparent text-primary dark:text-primary-dark hover:bg-accent dark:hover:bg-accent hover:text-primary-accent',
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    className
  );

  const iconElement = icon && (
    <motion.span
      className={cn(
        'flex items-center',
        iconPosition === 'left' ? 'mr-2' : 'ml-2'
      )}
      animate={loading ? { rotate: 360 } : {}}
      transition={loading ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
    >
      {icon}
    </motion.span>
  );

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      whileHover={hoverScale.whileHover}
      whileTap={hoverScale.whileTap}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.svg
          className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      )}

      {/* Button content with opacity transition for loading state */}
      <motion.span
        className="inline-flex items-center"
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </motion.span>

      {/* Ripple effect */}
      <motion.span
        className="absolute inset-0 rounded-lg bg-white opacity-0"
        whileTap={{
          opacity: 0.2,
          scale: [0, 1],
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}