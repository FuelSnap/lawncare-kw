import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'CutDay - Zero-Contact Lawn Care in Kitchener-Waterloo',
    template: '%s | CutDay',
  },
  description: 'Book in 60 seconds. No calls. Photo proof every cut. Subscription lawn mowing for Kitchener, Waterloo, Cambridge, and Guelph.',
  keywords: [
    'lawn care',
    'lawn mowing',
    'Kitchener',
    'Waterloo',
    'Cambridge',
    'Guelph',
    'grass cutting',
    'lawn service',
    'lawn subscription',
  ],
  authors: [{ name: 'CutDay' }],
  creator: 'CutDay',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://cutday.ca',
    siteName: 'CutDay',
    title: 'CutDay - Zero-Contact Lawn Care in Kitchener-Waterloo',
    description: 'Book in 60 seconds. No calls. Photo proof every cut.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CutDay - Zero-Contact Lawn Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CutDay - Zero-Contact Lawn Care',
    description: 'Book in 60 seconds. No calls. Photo proof every cut.',
    images: ['/og-image.jpg'],
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1B4332" />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
