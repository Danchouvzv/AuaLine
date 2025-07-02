"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { Menu, X, Leaf, Globe, ShoppingBag, Info, BarChart3, Mail, Languages } from 'lucide-react';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: '/', label: getTranslation('nav.home', language), icon: <Globe className="w-4 h-4" /> },
    { href: '/shop', label: getTranslation('nav.shop', language), icon: <ShoppingBag className="w-4 h-4" /> },
    { href: '/about', label: getTranslation('nav.about', language), icon: <Info className="w-4 h-4" /> },
    { href: '/pollution-data', label: getTranslation('nav.pollution-data', language), icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/contact', label: getTranslation('nav.contact', language), icon: <Mail className="w-4 h-4" /> },
  ];

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-200/20 dark:border-slate-700/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <nav className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-eco-leaf to-green-500 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-eco-leaf to-green-600 bg-clip-text text-transparent">
              AuaLine
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
              >
                <Languages className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-10 animate-in fade-in-0 zoom-in-95 duration-100">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'ru' | 'en' | 'kz');
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        language === lang.code ? 'text-eco-leaf bg-slate-50 dark:bg-slate-700' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:text-eco-leaf dark:hover:text-eco-leaf hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  {getTranslation('nav.language', language) || 'Язык'}
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'ru' | 'en' | 'kz');
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        language === lang.code 
                          ? 'text-eco-leaf bg-slate-100 dark:bg-slate-800' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 