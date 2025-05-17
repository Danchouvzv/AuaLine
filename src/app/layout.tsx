import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import RootLayoutClient from '@/components/layout/RootLayoutClient';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: 'AuaLine - Air-to-Ink Marketplace',
    template: '%s | AuaLine',
  },
  description: 'Innovative eco-friendly marketplace transforming air pollution into sustainable ink products',
  keywords: ['eco-friendly', 'air purification', 'sustainable ink', 'air to ink', 'ecological products'],
  creator: 'AuaLine Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aualine.com',
    siteName: 'AuaLine',
    title: 'AuaLine - Air-to-Ink Marketplace',
    description: 'Innovative eco-friendly marketplace transforming air pollution into sustainable ink products',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AuaLine - Air-to-Ink Marketplace',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuaLine - Air-to-Ink Marketplace',
    description: 'Innovative eco-friendly marketplace transforming air pollution into sustainable ink products',
    creator: '@AuaLine',
    images: ['/images/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://aualine.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
