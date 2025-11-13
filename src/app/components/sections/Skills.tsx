'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Star } from 'lucide-react';
import { FadeIn, StaggerFadeIn } from '@/app/components/animations/FadeIn';
import { useMouseTracking } from '@/app/components/animations/useScrollAnimation';
import { skills, skillCategories } from '@/data/skills';
import { getSkillLevelColor, getSkillLevelBg } from '@/lib/utils';
import { Skill } from '@/types/portfolio';
import { skillCard, projectCardHover } from '@/lib/animations';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { ref, mousePosition } = useMouseTracking();

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return skills;
    return skills.filter(skill => skill.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="skills" className="relative py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom">
        {/* Section Title */}
        <FadeIn className="text-center mb-16" direction="up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-secondary dark:text-secondary-dark max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains
          </p>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={0.2} direction="up" className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <Filter className="w-4 h-4 text-primary-accent" />
              <span className="text-sm font-medium text-primary dark:text-primary-dark">Filter:</span>
            </div>
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-accent to-secondary-accent text-white shadow-lg transform scale-105'
                    : 'bg-white/50 dark:bg-black/50 text-primary dark:text-primary-dark hover:bg-white/80 dark:hover:bg-black/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderLeft: selectedCategory === category.id ? `3px solid ${category.color}` : 'none',
                }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Skills Grid */}
        <StaggerFadeIn staggerDelay={0.05} initialDelay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                mousePosition={mousePosition}
              />
            ))}
          </div>
        </StaggerFadeIn>

        {/* No skills found message */}
        {filteredSkills.length === 0 && (
          <FadeIn delay={0.4} direction="up" className="text-center py-12">
            <p className="text-secondary dark:text-secondary-dark">
              No skills found in this category.
            </p>
          </FadeIn>
        )}

        {/* Skills Summary */}
        <FadeIn delay={0.8} direction="up" className="mt-16">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 gradient-text text-center">Skills Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {skills.filter(s => s.proficiency >= 90).length}
                </div>
                <p className="text-secondary dark:text-secondary-dark">Expert Skills</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {skills.filter(s => s.proficiency >= 80 && s.proficiency < 90).length}
                </div>
                <p className="text-secondary dark:text-secondary-dark">Advanced Skills</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {skills.length}
                </div>
                <p className="text-secondary dark:text-secondary-dark">Total Technologies</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Individual Skill Card Component
function SkillCard({ skill, mousePosition }: { skill: Skill; mousePosition: { x: number; y: number } }) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate 3D rotation based on mouse position
  const calculateRotation = () => {
    if (!isHovered) return { rotateX: 0, rotateY: 0 };

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return { rotateX: 0, rotateY: 0 };

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((mousePosition.x - centerX) / rect.width) * 15;
    const rotateX = -((mousePosition.y - centerY) / rect.height) * 15;

    return { rotateX, rotateY };
  };

  const cardRef = React.useRef<HTMLDivElement>(null);
  const rotation = calculateRotation();

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full"
      variants={skillCard}
      whileHover="hover"
      initial="initial"
      animate="animate"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="glass rounded-xl p-6 h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          z: 20,
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Skill Icon */}
        <motion.div
          className="text-5xl mb-4 relative z-10"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <span style={{ color: skill.color }}>{skill.icon}</span>
        </motion.div>

        {/* Skill Name */}
        <h3 className="text-lg font-semibold text-primary dark:text-primary-dark mb-2 relative z-10">
          {skill.name}
        </h3>

        {/* Skill Level */}
        <div className="text-sm text-primary-accent font-medium mb-3 relative z-10">
          {skill.level}
        </div>

        {/* Proficiency Ring */}
        <div className="relative w-20 h-20 mb-3">
          <svg className="transform -rotate-90 w-20 h-20">
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-border dark:text-border opacity-20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              stroke={skill.color}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: skill.proficiency / 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                pathLength: skill.proficiency / 100,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold" style={{ color: skill.color }}>
              {skill.proficiency}%
            </span>
          </div>
        </div>

        {/* Proficiency Stars */}
        <div className="flex items-center space-x-1 mb-3 relative z-10">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={cn(
                'transition-colors duration-300',
                i < Math.ceil(skill.proficiency / 20)
                  ? 'fill-primary-accent text-primary-accent'
                  : 'text-border dark:text-border opacity-30'
              )}
            />
          ))}
        </div>

        {/* Category Badge */}
        <div className="mt-auto">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${skill.color}20`,
              color: skill.color,
            }}
          >
            {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
          </span>
        </div>

        {/* Hover effect - Additional details */}
        {skill.description && (
          <motion.div
            className="absolute inset-0 bg-black/90 text-white p-4 rounded-xl flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <p className="text-sm text-center">{skill.description}</p>
          </motion.div>
        )}

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: isHovered ? `0 0 30px ${skill.color}40` : 'none',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}