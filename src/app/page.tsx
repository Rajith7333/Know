import { Navigation } from '@/app/components/ui/Navigation';
import { Hero } from '@/app/components/sections/Hero';
import { About } from '@/app/components/sections/About';
import { Skills } from '@/app/components/sections/Skills';
import { Projects } from '@/app/components/sections/Projects';
import { Contact } from '@/app/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

      {/* Footer */}
      <footer className="relative bg-background dark:bg-background border-t border-border dark:border-border">
        <div className="container-custom py-8">
          <div className="text-center">
            <p className="text-secondary dark:text-secondary-dark mb-2">
              © 2024 John Doe. All rights reserved.
            </p>
            <p className="text-sm text-secondary dark:text-secondary-dark">
              Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}