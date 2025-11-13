'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink, Github, Calendar, User, Clock } from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/app/components/animations/FadeIn';
import { Button } from '@/app/components/ui/Button';
import { projects } from '@/data/projects';
import { formatDate } from '@/lib/utils';
import { Project } from '@/types/portfolio';
import { modalContent, modalOverlay } from '@/lib/animations';

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || selectedProject) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, selectedProject]);

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsAutoPlay(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsAutoPlay(true);
  };

  // Get projects for carousel (3 at a time on desktop, 1 on mobile)
  const getVisibleProjects = () => {
    const visibleProjects = [];
    const totalProjects = projects.length;

    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalProjects;
      visibleProjects.push(projects[index]);
    }

    return visibleProjects;
  };

  const slideVariants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section id="projects" className="relative py-20 bg-accent dark:bg-accent">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-40 w-96 h-96 bg-secondary-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-primary-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom">
        {/* Section Title */}
        <FadeIn className="text-center mb-16" direction="up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-lg text-secondary dark:text-secondary-dark max-w-2xl mx-auto">
            Explore my latest work and see how I bring ideas to life through code and design
          </p>
        </FadeIn>

        {/* Projects Carousel */}
        <FadeIn delay={0.3} direction="up" className="relative">
          <div className="relative max-w-6xl mx-auto">
            {/* Carousel Container */}
            <div className="relative h-[600px] md:h-[500px] perspective-1000">
              <AnimatePresence mode="wait" custom={direction}>
                {getVisibleProjects().map((project, index) => (
                  <motion.div
                    key={`${project.id}-${currentIndex}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                    }}
                    className={`absolute inset-0 flex items-center justify-center ${
                      index === 1 ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      left: index === 0 ? '-10%' : index === 1 ? '0' : '110%',
                      width: index === 1 ? '100%' : '80%',
                      opacity: index === 1 ? 1 : 0.7,
                    }}
                  >
                    <ProjectCard
                      project={project}
                      isActive={index === 1}
                      onClick={() => handleProjectClick(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 text-primary-accent group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6 text-primary-accent group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg text-sm font-medium text-primary dark:text-primary-dark hover:bg-white/80 dark:hover:bg-black/80 transition-colors"
              >
                {isAutoPlay ? 'Pause' : 'Play'} Auto-play
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 'next' : 'prev');
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary-accent w-8'
                        : 'bg-border dark:bg-border hover:bg-primary-accent/50'
                    `}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Projects Grid (Mobile Alternative) */}
        <FadeIn delay={0.5} direction="up" className="md:hidden mt-16">
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={true}
                onClick={() => handleProjectClick(project)}
                index={index}
              />
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-background dark:bg-background rounded-2xl shadow-2xl"
              variants={modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Images */}
                <div className="relative h-64 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-accent to-secondary-accent rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🚀</div>
                      <p className="text-lg font-medium">{selectedProject.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-3xl font-bold gradient-text mb-4">
                    {selectedProject.title}
                  </h3>

                  <p className="text-secondary dark:text-secondary-dark mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Project Info */}
                  <div className="space-y-4 mb-6">
                    {selectedProject.client && (
                      <div className="flex items-center text-primary dark:text-primary-dark">
                        <User className="w-5 h-5 mr-3 text-primary-accent" />
                        <span className="font-medium">Client:</span>
                        <span className="ml-2">{selectedProject.client}</span>
                      </div>
                    )}

                    {selectedProject.duration && (
                      <div className="flex items-center text-primary dark:text-primary-dark">
                        <Clock className="w-5 h-5 mr-3 text-primary-accent" />
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{selectedProject.duration}</span>
                      </div>
                    )}

                    <div className="flex items-center text-primary dark:text-primary-dark">
                      <Calendar className="w-5 h-5 mr-3 text-primary-accent" />
                      <span className="font-medium">Completed:</span>
                      <span className="ml-2">{formatDate(selectedProject.completedAt)}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-accent/10 text-primary-accent rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.liveUrl && (
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Project
                      </Button>
                    )}

                    {selectedProject.githubUrl && (
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Project Card Component
function ProjectCard({
  project,
  isActive,
  onClick,
  index = 0,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  index?: number;
}) {
  return (
    <motion.div
      className={`glass rounded-2xl overflow-hidden cursor-pointer ${
        isActive ? 'ring-4 ring-primary-accent/20' : ''
      }`}
      whileHover={{
        y: -10,
        scale: isActive ? 1.02 : 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-2">🚀</div>
          <p className="text-sm font-medium text-secondary dark:text-secondary-dark">
            {project.category}
          </p>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary-accent text-white text-xs font-semibold rounded-full">
            Featured
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-accent/80 to-secondary-accent/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        >
          <div className="text-center text-white">
            <p className="text-lg font-semibold mb-2">View Details</p>
            <p className="text-sm">Click to explore this project</p>
          </div>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary dark:text-primary-dark mb-2">
          {project.title}
        </h3>
        <p className="text-secondary dark:text-secondary-dark mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary-accent/10 text-primary-accent rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-secondary dark:text-secondary-dark">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Project Meta */}
        <div className="flex items-center justify-between text-sm text-secondary dark:text-secondary-dark">
          <span>{formatDate(project.completedAt)}</span>
          {project.featured && (
            <span className="flex items-center">
              <span className="w-2 h-2 bg-primary-accent rounded-full mr-2" />
              Featured
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}