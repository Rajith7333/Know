import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'John Doe - Full Stack Developer & Creative Technologist',
  description: 'Passionate developer with a keen eye for design and a love for creating exceptional digital experiences. Specializing in React, Next.js, TypeScript, and modern web technologies.',
  keywords: ['Full Stack Developer', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'UI/UX', 'Portfolio'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'John Doe - Full Stack Developer',
    description: 'Passionate developer creating exceptional digital experiences',
    url: 'https://johndoe.dev',
    siteName: 'John Doe Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe - Full Stack Developer',
    description: 'Passionate developer creating exceptional digital experiences',
    creator: '@johndoe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background dark:bg-background text-primary dark:text-primary-dark antialiased">
        <ThemeProvider>
          <div className="relative min-h-screen">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-primary-accent/5 via-transparent to-secondary-accent/5 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </ThemeProvider>

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log('Page load time:', pageLoadTime + 'ms');
                  }, 0);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}