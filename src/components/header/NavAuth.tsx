"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, LogOut, Settings, Heart, ShoppingBag, ChevronDown, 
  Leaf, BarChart2, Award, Bell, Calendar, Shield, X, Mail, Lock, UserPlus, AlertCircle
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { User } from "@/types";

export default function NavAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const [formError, setFormError] = useState<string | null>(null);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  
  const { user, signIn, signUp, signOut, loading, error } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
      
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowLoginModal(false);
        setShowRegisterModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset form state when modals are opened/closed
  useEffect(() => {
    if (!showLoginModal && !showRegisterModal) {
      setEmail("");
      setPassword("");
      setDisplayName("");
      setFormError(null);
    }
  }, [showLoginModal, showRegisterModal]);

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      await signIn(email, password);
      setShowLoginModal(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setFormError(errorMessage);
    }
  };

  // Handle register form submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      await signUp(email, password, displayName);
      setShowRegisterModal(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setFormError(errorMessage);
    }
  };

  // Handle sign out
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
      <>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowLoginModal(true)} 
            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            Login
          </button>
          <button 
            onClick={() => setShowRegisterModal(true)} 
            className="flex items-center px-3 py-2 text-sm font-medium bg-eco-leaf text-white rounded-md hover:bg-eco-leaf/90 transition"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Register
          </button>
        </div>
        
        {/* Login Modal */}
        <AnimatePresence>
          {showLoginModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Login</h2>
                  <button 
                    onClick={() => setShowLoginModal(false)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{formError}</p>
                  </div>
                )}
                
                <form onSubmit={handleLoginSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Remember me
                        </label>
                      </div>
                      
                      <a href="#" className="text-sm text-eco-leaf hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-eco-leaf hover:bg-eco-leaf/90 text-white font-medium rounded-lg transition-colors"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                      }}
                      className="text-eco-leaf hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
                
                <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                  <p>Demo accounts:</p>
                  <p className="mt-1">user@example.com / password123</p>
                  <p>admin@aualine.com / admin123</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Register Modal */}
        <AnimatePresence>
          {showRegisterModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create an Account</h2>
                  <button 
                    onClick={() => setShowRegisterModal(false)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{formError}</p>
                  </div>
                )}
                
                <form onSubmit={handleRegisterSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="display-name"
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="register-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="register-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Password must be at least 6 characters long
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        I agree to the <a href="#" className="text-eco-leaf hover:underline">Terms of Service</a> and <a href="#" className="text-eco-leaf hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-eco-leaf hover:bg-eco-leaf/90 text-white font-medium rounded-lg transition-colors"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <button 
                      onClick={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                      }}
                      className="text-eco-leaf hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Calculate eco badge based on eco score
  const getEcoBadge = () => {
    // Use a default score of 0 if user doesn't have ecoStats
    const mockEcoStats = { co2Saved: 0, airFiltered: 0, treesEquivalent: 0 };
    const score = (user as any)?.ecoStats?.co2Saved || 0;
    if (score >= 80) return "Eco Champion";
    if (score >= 60) return "Eco Enthusiast";
    if (score >= 40) return "Eco Supporter";
    return "Eco Beginner";
  };

  // Get color class for eco badge
  const getEcoBadgeColor = () => {
    const mockEcoStats = { co2Saved: 0, airFiltered: 0, treesEquivalent: 0 };
    const score = (user as any)?.ecoStats?.co2Saved || 0;
    if (score >= 80) return "bg-eco-leaf/10 text-eco-leaf";
    if (score >= 60) return "bg-solar-yellow/10 text-solar-yellow";
    if (score >= 40) return "bg-sky-blue/10 text-sky-blue";
    return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <button
          className="relative p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-eco-leaf text-white text-xs flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </button>

        {/* User Profile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-2 py-1.5 rounded-full bg-gradient-to-r from-eco-leaf/5 to-sky-blue/5 border border-eco-leaf/10 hover:border-eco-leaf/30 transition-all duration-300"
          aria-label="User menu"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            {user.photoURL ? (
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-eco-leaf/20">
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-eco-leaf to-sky-blue flex items-center justify-center text-white ring-2 ring-eco-leaf/20">
                {user.displayName ? user.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U"}
              </div>
            )}
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium line-clamp-1">
                {user.displayName || user.email?.split('@')[0] || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {getEcoBadge()}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {/* User Info Header */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-eco-leaf/20 to-sky-blue/20 backdrop-blur-sm"></div>
              <div className="relative px-6 py-4">
                <div className="flex items-center">
                  {user.photoURL ? (
                    <div className="h-14 w-14 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-eco-leaf to-sky-blue flex items-center justify-center text-white text-xl font-bold border-4 border-white dark:border-gray-800">
                      {user.displayName ? user.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {user.displayName || "Account"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                    <div className={`mt-1 px-2 py-0.5 rounded-full text-xs inline-flex items-center ${getEcoBadgeColor()}`}>
                      <Leaf className="h-3 w-3 mr-1" />
                      {getEcoBadge()}
                    </div>
                  </div>
                </div>
                
                {/* Eco Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">CO₂ Saved</p>
                    <p className="text-sm font-medium">{(user as any)?.ecoStats?.co2Saved || 0} kg</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Air Filtered</p>
                    <p className="text-sm font-medium">{(user as any)?.ecoStats?.airFiltered || 0} m³</p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tree Equivalent</p>
                    <p className="text-sm font-medium">{(user as any)?.ecoStats?.treesEquivalent || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="p-2 grid grid-cols-3 gap-1 border-b border-gray-200 dark:border-gray-700">
              <Link
                href="/account"
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <UserIcon className="h-5 w-5 text-eco-leaf mb-1" />
                <span className="text-xs">Profile</span>
              </Link>
              <Link
                href="/account/orders"
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag className="h-5 w-5 text-sky-blue mb-1" />
                <span className="text-xs">Orders</span>
              </Link>
              <Link
                href="/account/wishlist"
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-5 w-5 text-coral-red mb-1" />
                <span className="text-xs">Wishlist</span>
              </Link>
            </div>
            
            {/* Menu Items */}
            <div className="py-1">
              <Link
                href="/account"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <BarChart2 className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                Eco Dashboard
              </Link>
              <Link
                href="/account/achievements"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <Award className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                Achievements
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                Account Settings
              </Link>
              <Link
                href="/account/privacy"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                Privacy & Security
              </Link>
            </div>
            
            {/* Sign Out */}
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