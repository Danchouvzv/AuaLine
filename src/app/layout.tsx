import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import RootLayoutClient from '@/components/layout/RootLayoutClient';
import { AuthProvider } from '@/lib/hooks/useAuth';
import type { Metadata } from 'next';

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
  title: 'AuaLine - Turn Pollution into Art',
  description: 'AuaLine transforms air pollution into sustainable art supplies. Our innovative technology captures carbon pollution and converts it into high-quality inks and pigments for creative expression.',
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
        <AuthProvider>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </AuthProvider>
      </body>
    </html>
  )
}
