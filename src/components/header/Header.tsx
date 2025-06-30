"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import MegaMenu from "./MegaMenu";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileSearch from "./MobileSearch";
import NavAuth from "./NavAuth";

// Dynamically import MiniCart with no SSR to avoid Firebase errors
const MiniCart = dynamic(() => import('../cart/MiniCart'), { 
  ssr: false,
  loading: () => (
    <div className="relative p-2 text-gray-700">
      <ShoppingCart size={24} />
    </div>
  )
});

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-carbon-black/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <MegaMenu />
            
            {/* Language Switcher Placeholder */}
            <div className="text-sm font-medium">EN</div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Icon */}
            <MiniCart />

            {/* Mobile Search */}
            <MobileSearch />

            {/* Nav Auth */}
            <NavAuth />
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-carbon-black"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="py-2 text-lg font-medium border-b border-gray-200 dark:border-gray-800"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="py-2 text-lg font-medium border-b border-gray-200 dark:border-gray-800"
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="py-2 text-lg font-medium border-b border-gray-200 dark:border-gray-800"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="py-2 text-lg font-medium border-b border-gray-200 dark:border-gray-800"
              >
                About
              </Link>
              <Link
                href="/impact"
                className="py-2 text-lg font-medium border-b border-gray-200 dark:border-gray-800"
              >
                Impact
              </Link>
              <Link
                href="/pollution-data"
                className="py-2 text-lg font-medium border-b border-gray-200 dark:border-gray-800"
              >
                Pollution Data
              </Link>
              <Link
                href="/auth/login"
                className="py-2 text-lg font-medium border-b border-gray-200 dark:border-gray-800"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="py-2 text-lg font-medium"
              >
                Register
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 