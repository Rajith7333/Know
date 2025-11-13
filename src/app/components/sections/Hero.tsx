'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download, ExternalLink } from 'lucide-react';
import { AnimatedText } from '@/app/components/animations/AnimatedText';
import { FadeIn } from '@/app/components/animations/FadeIn';
import { Button } from '@/app/components/ui/Button';
import { ScrollIndicator } from '@/app/components/ui/ScrollIndicator';
import { useMouseTracking } from '@/app/components/animations/useScrollAnimation';
import { personalInfo } from '@/data/about';
import { cn } from '@/lib/utils';

// Particle interface
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

// Floating shape component
function FloatingShape({
  className,
  delay = 0,
  duration = 3,
  path,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  path: string;
}) {
  return (
    <motion.div
      className={cn('absolute opacity-10 dark:opacity-20', className)}
      initial={{ scale: 0, rotate: 0 }}
      animate={{
        scale: [0, 1, 1, 0],
        rotate: [0, 180, 360],
        path: [0, 100, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
        <path d={path} />
      </svg>
    </motion.div>
  );
}

// Particle system component
function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6',
      });
    }

    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx -= (dx / distance) * force * 0.02;
          particle.vy -= (dy / distance) * force * 0.02;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((particle1, i) => {
        particlesRef.current.slice(i + 1).forEach((particle2) => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export function Hero() {
  const { ref, mousePosition } = useMouseTracking();

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient and particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 via-transparent to-secondary-accent/10" />
        <ParticleSystem />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape
          className="top-20 left-20 text-primary-accent"
          delay={0}
          duration={4}
          path="M30 15 L45 30 L30 45 L15 30 Z"
        />
        <FloatingShape
          className="top-40 right-32 text-secondary-accent"
          delay={1}
          duration={5}
          path="M30 10 L50 30 L30 50 L10 30 Z"
        />
        <FloatingShape
          className="bottom-32 left-40 text-warning"
          delay={2}
          duration={6}
          path="M30 15 L35 25 L45 30 L35 35 L30 45 L25 35 L15 30 L25 25 Z"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container-custom">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <FadeIn delay={0} direction="down">
            <p className="text-lg text-secondary dark:text-secondary-dark mb-4">
              Hello, I'm
            </p>
          </FadeIn>

          {/* Name with animated letters */}
          <motion.div
            className="mb-6"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <AnimatedText
              text={personalInfo.name}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold gradient-text mb-4"
              letterDelay={0}
              letterStagger={0.05}
              enableCursor={false}
              animationDelay={0.3}
            />
          </motion.div>

          {/* Tagline with typewriter effect */}
          <FadeIn delay={1} direction="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary dark:text-primary-dark mb-8 font-light">
              <AnimatedText
                text={personalInfo.tagline.split(' ')[0]}
                tagline={personalInfo.tagline.split(' ').slice(1).join(' ')}
                enableCursor={true}
                animationDelay={1.5}
              />
            </h2>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={2} direction="up">
            <p className="text-lg text-secondary dark:text-secondary-dark mb-12 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={2.5} direction="up">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => personalInfo.resumeUrl && window.open(personalInfo.resumeUrl, '_blank')}
                className="group"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={3} direction="up">
            <div className="flex justify-center space-x-6">
              {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                const Icon = {
                  github: Github,
                  linkedin: Linkedin,
                  twitter: Twitter,
                  website: ExternalLink,
                }[platform] as React.ComponentType<{ className?: string; size?: number }>;

                if (!Icon || !url) return null;

                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary dark:text-secondary-dark hover:text-primary-accent transition-colors p-3 rounded-full hover:bg-accent dark:hover:bg-accent"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator targetId="about" />
    </section>
  );
}