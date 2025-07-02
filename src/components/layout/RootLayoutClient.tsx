"use client";

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/components/query-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/header/Header';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import { AuthProvider } from '@/lib/hooks/useAuth';

// Dynamically import CartProvider with SSR disabled
const CartProvider = dynamic(
  () => import('@/contexts/CartContext').then((mod) => mod.CartProvider),
  { ssr: false }
);

interface RootLayoutClientProps {
  children: ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryProvider>
    </ThemeProvider>
  );
} 