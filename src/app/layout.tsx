import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { PERSONAL_INFO } from '@/lib/constants';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#1e293b',
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  title: {
    default: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.subtitle,
  keywords: [
    'Full Stack Developer',
    'React Developer', 
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
  ],
  authors: [{ name: PERSONAL_INFO.name }],
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jagadish-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jagadish-portfolio.vercel.app',
    title: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.subtitle,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.subtitle,
    images: ['/images/og-image.jpg'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarnings>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased bg-slate-950 text-white`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}