"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function NavAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // For debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("Current auth state:", user ? "Logged in" : "Not logged in");
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mock login for demo purposes
  const handleMockLogin = () => {
    // Store a mock user in localStorage
    const mockUser = {
      uid: 'user123',
      email: 'user@example.com',
      displayName: 'Demo User',
      photoURL: null
    };
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    // Reload the page to refresh auth state
    window.location.reload();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-2 rounded-full animate-pulse">
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <button 
          onClick={handleMockLogin} 
          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <User className="h-5 w-5 mr-2" />
          Login (Demo)
        </button>
        <Link 
          href="/account" 
          className="flex items-center px-3 py-2 text-sm font-medium bg-eco-leaf text-white rounded-md hover:bg-eco-leaf/90 transition"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {user.photoURL ? (
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={user.photoURL}
                alt={user.displayName || "User"}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-200">
              {user.displayName ? user.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U"}
            </div>
          )}
          <ChevronDown className="h-4 w-4 ml-2" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1"
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.displayName || "Account"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
            
            <div className="py-1">
              <Link
                href="/account"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                Account Settings
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                My Orders
              </Link>
              <Link
                href="/account/wishlist"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                Wishlist
              </Link>
            </div>
            
            <div className="py-1 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 