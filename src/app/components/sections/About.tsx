'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Award, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { FadeIn, StaggerFadeIn } from '@/app/components/animations/FadeIn';
import { useParallax } from '@/app/components/animations/useScrollAnimation';
import { personalInfo, experiences, education } from '@/data/about';
import { formatDateRange } from '@/lib/utils';

export function About() {
  const { ref: parallaxRef, offset } = useParallax(0.3);

  return (
    <section id="about" className="relative py-20 bg-accent dark:bg-accent">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom">
        {/* Section Title */}
        <FadeIn className="text-center mb-16" direction="up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-lg text-secondary dark:text-secondary-dark max-w-2xl mx-auto">
            Learn more about my background, experience, and what drives my passion for development
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            {/* Profile Image with Parallax */}
            <motion.div
              ref={parallaxRef}
              className="relative"
              style={{ y: offset }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-accent to-secondary-accent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                <div className="relative glass rounded-2xl p-8">
                  <div className="aspect-square relative overflow-hidden rounded-xl">
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                          {personalInfo.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="text-secondary dark:text-secondary-dark">
                          Profile Photo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Personal Details */}
            <StaggerFadeIn staggerDelay={0.1} className="space-y-4">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-primary dark:text-primary-dark">
                    <Mail className="w-5 h-5 mr-3 text-primary-accent" />
                    <span>{personalInfo.email}</span>
                  </div>
                  {personalInfo.phone && (
                    <div className="flex items-center text-primary dark:text-primary-dark">
                      <ExternalLink className="w-5 h-5 mr-3 text-primary-accent" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-primary dark:text-primary-dark">
                    <MapPin className="w-5 h-5 mr-3 text-primary-accent" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Let's Connect</h3>
                <p className="text-secondary dark:text-secondary-dark mb-6">
                  I'm always interested in hearing about new opportunities and exciting projects.
                </p>
                <motion.button
                  className="w-full btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </motion.button>
              </div>
            </StaggerFadeIn>
          </div>

          {/* Right Column - Bio and Experience */}
          <div className="space-y-8">
            {/* Bio */}
            <FadeIn direction="right" delay={0.2}>
              <div className="glass rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-4 gradient-text">My Story</h3>
                <div className="prose prose-lg dark:prose-invert text-primary dark:text-primary-dark">
                  <p>{personalInfo.bio}</p>
                  <br />
                  <p>
                    I believe in creating technology that makes a real difference in people's lives.
                    Whether it's building intuitive user interfaces or architecting scalable backend systems,
                    I approach every project with enthusiasm and attention to detail.
                  </p>
                  <br />
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source
                    projects, or enjoying the outdoors. I'm constantly learning and growing, always looking for
                    the next challenge that will push me to become a better developer.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Experience Timeline */}
            <FadeIn direction="right" delay={0.4}>
              <div className="glass rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 mr-3 text-primary-accent" />
                  <h3 className="text-2xl font-semibold gradient-text">Experience</h3>
                </div>

                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="relative pl-8 border-l-2 border-primary-accent/30"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-0 top-2 w-4 h-4 bg-primary-accent rounded-full -translate-x-1/2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      />

                      <div className="mb-2">
                        <h4 className="text-lg font-semibold text-primary dark:text-primary-dark">
                          {exp.title}
                        </h4>
                        <p className="text-primary-accent font-medium">{exp.company}</p>
                        <div className="flex items-center text-sm text-secondary dark:text-secondary-dark mt-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                          <MapPin className="w-4 h-4 ml-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <p className="text-secondary dark:text-secondary-dark mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-accent/10 text-primary-accent rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Education */}
            <FadeIn direction="right" delay={0.6}>
              <div className="glass rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <Award className="w-6 h-6 mr-3 text-primary-accent" />
                  <h3 className="text-2xl font-semibold gradient-text">Education</h3>
                </div>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="relative pl-8 border-l-2 border-secondary-accent/30"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-0 top-2 w-4 h-4 bg-secondary-accent rounded-full -translate-x-1/2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      />

                      <div className="mb-2">
                        <h4 className="text-lg font-semibold text-primary dark:text-primary-dark">
                          {edu.degree}
                        </h4>
                        <p className="text-secondary-accent font-medium">{edu.institution}</p>
                        <div className="flex items-center text-sm text-secondary dark:text-secondary-dark mt-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
                          <MapPin className="w-4 h-4 ml-4 mr-2" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      <p className="text-secondary dark:text-secondary-dark mb-3">
                        {edu.description}
                      </p>
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-3">
                          <h5 className="font-medium text-primary dark:text-primary-dark mb-2">
                            Achievements:
                          </h5>
                          <ul className="space-y-1">
                            {edu.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="text-sm text-secondary dark:text-secondary-dark flex items-start"
                              >
                                <span className="text-primary-accent mr-2">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}