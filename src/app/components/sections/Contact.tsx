'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { FadeIn, StaggerFadeIn } from '@/app/components/animations/FadeIn';
import { Button } from '@/app/components/ui/Button';
import { personalInfo } from '@/data/about';
import { ContactFormData, FormStatus } from '@/types/portfolio';
import { isValidEmail } from '@/lib/utils';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: null,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear form status when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: null, message: '' });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouchedFields(prev => new Set(prev).add(e.target.name));
  };

  const validateForm = (): boolean => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push('Name is required');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!isValidEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.subject.trim()) {
      errors.push('Subject is required');
    }

    if (!formData.message.trim()) {
      errors.push('Message is required');
    } else if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
      setFormStatus({
        type: 'error',
        message: errors[0],
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success
      setFormStatus({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you as soon as possible.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTouchedFields(new Set());

    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or contact me directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string): string | null => {
    if (!touchedFields.has(fieldName)) return null;

    switch (fieldName) {
      case 'name':
        return !formData.name.trim() ? 'Name is required' : null;
      case 'email':
        if (!formData.email.trim()) return 'Email is required';
        if (!isValidEmail(formData.email)) return 'Please enter a valid email address';
        return null;
      case 'subject':
        return !formData.subject.trim() ? 'Subject is required' : null;
      case 'message':
        if (!formData.message.trim()) return 'Message is required';
        if (formData.message.trim().length < 10) return 'Message must be at least 10 characters long';
        return null;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="relative py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-40 w-96 h-96 bg-primary-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-secondary-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom">
        {/* Section Title */}
        <FadeIn className="text-center mb-16" direction="up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <p className="text-lg text-secondary dark:text-secondary-dark max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <FadeIn delay={0.2} direction="right">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 gradient-text">Let's Connect</h3>
                <p className="text-secondary dark:text-secondary-dark mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities, exciting projects, or just having a chat about technology and design. Feel free to reach out using any of the methods below.
                </p>
              </div>

              {/* Contact Details */}
              <StaggerFadeIn staggerDelay={0.1} className="space-y-4">
                <div className="glass rounded-xl p-6 flex items-center space-x-4">
                  <div className="p-3 bg-primary-accent/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary dark:text-primary-dark">Email</h4>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-primary-accent hover:text-secondary-accent transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {personalInfo.phone && (
                  <div className="glass rounded-xl p-6 flex items-center space-x-4">
                    <div className="p-3 bg-secondary-accent/10 rounded-lg">
                      <Phone className="w-6 h-6 text-secondary-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary dark:text-primary-dark">Phone</h4>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-primary-accent hover:text-secondary-accent transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="glass rounded-xl p-6 flex items-center space-x-4">
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary dark:text-primary-dark">Location</h4>
                    <p className="text-secondary dark:text-secondary-dark">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </StaggerFadeIn>

              {/* Social Links */}
              <div className="glass rounded-xl p-6">
                <h4 className="font-medium text-primary dark:text-primary-dark mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {personalInfo.socialLinks.github && (
                    <motion.a
                      href={personalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/50 dark:bg-black/50 rounded-lg hover:bg-primary-accent hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                    </motion.a>
                  )}
                  {personalInfo.socialLinks.linkedin && (
                    <motion.a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/50 dark:bg-black/50 rounded-lg hover:bg-primary-accent hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={20} />
                    </motion.a>
                  )}
                  {personalInfo.socialLinks.twitter && (
                    <motion.a
                      href={personalInfo.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/50 dark:bg-black/50 rounded-lg hover:bg-primary-accent hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter size={20} />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.4} direction="left">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary dark:text-primary-dark mb-2">
                    Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background dark:bg-background ${
                      getFieldError('name')
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.has('name') && formData.name
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border dark:border-border focus:border-primary-accent'
                    } text-primary dark:text-primary-dark placeholder-secondary dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-accent/20`}
                    placeholder="Your full name"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                  {getFieldError('name') && (
                    <motion.p
                      className="mt-2 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {getFieldError('name')}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-primary-dark mb-2">
                    Email *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background dark:bg-background ${
                      getFieldError('email')
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.has('email') && formData.email && isValidEmail(formData.email)
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border dark:border-border focus:border-primary-accent'
                    } text-primary dark:text-primary-dark placeholder-secondary dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-accent/20`}
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                  {getFieldError('email') && (
                    <motion.p
                      className="mt-2 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {getFieldError('email')}
                    </motion.p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary dark:text-primary-dark mb-2">
                    Subject *
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background dark:bg-background ${
                      getFieldError('subject')
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.has('subject') && formData.subject
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border dark:border-border focus:border-primary-accent'
                    } text-primary dark:text-primary-dark placeholder-secondary dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-accent/20`}
                    placeholder="What's this about?"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                  {getFieldError('subject') && (
                    <motion.p
                      className="mt-2 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {getFieldError('subject')}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary dark:text-primary-dark mb-2">
                    Message *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background dark:bg-background resize-none ${
                      getFieldError('message')
                        ? 'border-red-500 focus:border-red-500'
                        : touchedFields.has('message') && formData.message && formData.message.length >= 10
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border dark:border-border focus:border-primary-accent'
                    } text-primary dark:text-primary-dark placeholder-secondary dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-accent/20`}
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                  {getFieldError('message') && (
                    <motion.p
                      className="mt-2 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {getFieldError('message')}
                    </motion.p>
                  )}
                  <div className="mt-2 text-right">
                    <span className="text-sm text-secondary dark:text-secondary-dark">
                      {formData.message.length} characters (minimum 10)
                    </span>
                  </div>
                </div>

                {/* Form Status */}
                <AnimatePresence>
                  {formStatus.type && (
                    <motion.div
                      className={`p-4 rounded-lg flex items-center space-x-3 ${
                        formStatus.type === 'success'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {formStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <p className="text-sm font-medium">{formStatus.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  icon={<Send />}
                  iconPosition="right"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}