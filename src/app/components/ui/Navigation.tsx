'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { useScrollDirection } from '@/app/components/animations/useScrollAnimation';
import { navItem, mobileMenu } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { scrollToElement } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const scrollDirection = useScrollDirection();

  // Handle scroll detection for background and active section
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = (href: string) => {
    const elementId = href.replace('#', '');
    scrollToElement(elementId, 80); // Offset for fixed navigation height
    setIsMobileMenuOpen(false);
  };

  // Navigation visibility based on scroll direction
  const shouldHideNavigation = scrollDirection === 'down' && window.scrollY > 200;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border dark:border-border'
            : 'bg-transparent'
        )}
        initial={{ y: 0 }}
        animate={{ y: shouldHideNavigation ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Name */}
            <motion.div
              className="text-2xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#hero')}
            >
              JD
            </motion.div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'nav-link relative px-4 py-2 text-sm font-medium transition-colors',
                    activeSection === item.id
                      ? 'text-primary-accent'
                      : 'text-primary dark:text-primary-dark hover:text-primary-accent'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  initial="initial"
                  animate="animate"
                  variants={navItem}
                  custom={navigationItems.indexOf(item)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-accent"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-accent dark:hover:bg-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-background dark:bg-background border-l border-border dark:border-border shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              variants={mobileMenu}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold gradient-text">Menu</h2>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-accent dark:hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-medium transition-colors',
                        activeSection === item.id
                          ? 'bg-primary-accent text-white'
                          : 'text-primary dark:text-primary-dark hover:bg-accent dark:hover:bg-accent hover:text-primary-accent'
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ x: 0 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-border dark:border-border">
                  <p className="text-sm text-secondary dark:text-secondary-dark text-center">
                    © 2024 John Doe. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}