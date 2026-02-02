import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CutDay - Premium Lawn Care in Kitchener-Waterloo',
    template: '%s | CutDay',
  },
  description: 'Instant pricing. No calls. Photo proof every cut. Premium lawn care for Kitchener, Waterloo, Cambridge, and Guelph.',
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
    title: 'CutDay - Premium Lawn Care in Kitchener-Waterloo',
    description: 'Instant pricing. No calls. Photo proof every cut.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CutDay - Premium Lawn Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CutDay - Premium Lawn Care',
    description: 'Instant pricing. No calls. Photo proof every cut.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a2e1a" />
      </head>
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
