"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Droplets, Send, ArrowRight, Check } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inkDrops, setInkDrops] = useState<{left: number, size: number, delay: number}[]>([]);
  
  
  useEffect(() => {
    const drops = Array(15).fill(0).map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 2
    }));
    setInkDrops(drops);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      
      // Redirect after showing success animation
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden rounded-xl bg-white dark:bg-slate-900 p-1">
      {/* Animated background with ink effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-slate-900 dark:to-emerald-950 opacity-50"></div>
        
        {/* Ink drops animation */}
        {inkDrops.map((drop, index) => (
          <motion.div
            key={index}
            className="absolute -top-10"
            style={{ left: `${drop.left}%` }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: ['0%', '110%'],
              opacity: [0, 1, 0.8, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: drop.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 2
            }}
          >
            <svg width={drop.size} height={drop.size * 1.5} viewBox="0 0 30 45" fill="none">
              <path 
                d="M15 5C16.8333 8.33333 25 20.4 25 28C25 35.6 20.5 42 15 42C9.5 42 5 35.6 5 28C5 20.4 13.1667 8.33333 15 5Z" 
                fill={index % 2 === 0 ? "#28A745" : "#4DA8DA"} 
                fillOpacity="0.3"
              />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Card content */}
      <div className="relative z-10 p-6 md:p-10">
        <AnimatePresence mode="wait">
          {formSubmitted ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-[400px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Check className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                {mode === 'login' ? 'Welcome back!' : 'Account created!'}
              </h2>
              <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
                {mode === 'login' 
                  ? 'You are now signed in to your account.' 
                  : 'Your account has been successfully created.'}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-center">Redirecting you to the homepage...</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="relative"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Droplets className="h-12 w-12 text-sky-blue" />
                  <motion.div
                    className="absolute -top-1 -right-1 bg-eco-leaf text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </motion.div>
                </motion.div>
              </div>

              <motion.h1 
                className="text-3xl font-bold text-center mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {mode === 'login' ? 'Welcome Back' : 'Join AuaLine'}
              </motion.h1>
              
              <motion.p 
                className="text-slate-500 dark:text-slate-400 text-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {mode === 'login' 
                  ? 'Sign in to continue your eco journey' 
                  : 'Create an account to join our community'}
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: mode === 'signup' ? 0.3 : 0.2 }}
                >
                  <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: mode === 'signup' ? 0.4 : 0.3 }}
                >
                  <label className="block text-sm font-medium mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                {mode === 'login' && (
                  <motion.div 
                    className="flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link href="/auth/reset-password" className="text-sm text-eco-leaf hover:underline">
                      Forgot password?
                    </Link>
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-eco-leaf hover:bg-eco-leaf/90 text-white font-medium rounded-lg flex items-center justify-center transition-all duration-300 relative overflow-hidden group"
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center">
                      {loading ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <Send className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </span>
                    <span className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
                  </button>
                </motion.div>
              </form>

              <motion.div 
                className="mt-8 text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-slate-500 dark:text-slate-400">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <Link
                    href={mode === 'login' ? '/auth/signup' : '/auth/login'}
                    className="ml-1 text-eco-leaf hover:underline font-medium"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthForm; 