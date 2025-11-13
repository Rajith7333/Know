'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { letterAnimation, typingAnimation, blinkCursor } from '@/lib/animations';

interface AnimatedTextProps {
  text: string;
  className?: string;
  tagline?: string;
  taglineSpeed?: number;
  letterDelay?: number;
  letterStagger?: number;
  enableCursor?: boolean;
  cursorChar?: string;
  animateOnScroll?: boolean;
  animationDelay?: number;
}

export function AnimatedText({
  text,
  className = '',
  tagline,
  taglineSpeed = 50,
  letterDelay = 0,
  letterStagger = 0.1,
  enableCursor = false,
  cursorChar = '|',
  animateOnScroll = false,
  animationDelay = 0,
}: AnimatedTextProps) {
  // Split text into letters for animation
  const letters = text.split('');

  return (
    <div className={className}>
      {/* Main animated text */}
      <motion.div
        className="inline-block"
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: {
            transition: {
              delayChildren: animationDelay,
              staggerChildren: letterStagger,
            },
          },
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            className={letter === ' ' ? 'inline-block' : 'inline-block'}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}

        {/* Typing cursor */}
        {enableCursor && (
          <motion.span
            variants={blinkCursor}
            className="inline-block ml-1 text-primary-accent"
          >
            {cursorChar}
          </motion.span>
        )}
      </motion.div>

      {/* Tagline with typing effect */}
      {tagline && (
        <motion.div
          className="mt-2 text-secondary dark:text-secondary-dark overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{
            delay: animationDelay + letters.length * letterStagger + 0.5,
            duration: (tagline.length * taglineSpeed) / 1000,
            ease: 'easeInOut',
          }}
        >
          <motion.span
            className="whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: animationDelay + letters.length * letterStagger + 0.5,
              duration: 0.3,
            }}
          >
            {tagline}
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}

// Typewriter component for continuous typing effect
export function TypewriterText({
  phrases,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
  ]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block ml-1 text-primary-accent"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        |
      </motion.span>
    </span>
  );
}

// Fade in text component
export function FadeInText({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}