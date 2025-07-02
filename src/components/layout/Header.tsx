"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

export default function Header() {
  const { language } = useLanguage();

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-eco-leaf">
            AuaLine
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors">
              {getTranslation('nav.home', language)}
            </Link>
            <Link href="/shop" className="text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors">
              {getTranslation('nav.shop', language)}
            </Link>
            <Link href="/about" className="text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors">
              {getTranslation('nav.about', language)}
            </Link>
            <Link href="/pollution-data" className="text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors">
              {getTranslation('nav.pollution-data', language)}
            </Link>
            <Link href="/contact" className="text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors">
              {getTranslation('nav.contact', language)}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 