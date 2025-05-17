"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Tag, ChevronRight, ArrowRight, Filter } from 'lucide-react';

// Sample blog data - in a real app this would come from a CMS or API
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'from-pollution-to-art',
    title: 'From Pollution to Art: The Journey of Air-to-Ink',
    excerpt: 'How we transform harmful air pollutants into beautiful, non-toxic ink for creative expression.',
    image: '/images/blog/pollution-to-art.jpg',
    category: 'Innovation',
    date: 'April 15, 2023',
    readTime: '5 min read',
    tags: ['innovation', 'sustainability', 'art'],
    featured: true
  },
  {
    id: 2,
    slug: 'creative-techniques-with-eco-ink',
    title: 'Creative Techniques to Try With Your Eco-Friendly Ink',
    excerpt: 'Discover new artistic techniques that showcase the unique properties of our air-purified ink.',
    image: '/images/blog/creative-techniques.jpg',
    category: 'Tutorials',
    date: 'May 2, 2023',
    readTime: '8 min read',
    tags: ['tutorials', 'creativity', 'techniques'],
    featured: false
  },
  {
    id: 3,
    slug: 'environmental-impact-of-traditional-ink',
    title: 'The Environmental Impact of Traditional Ink Manufacturing',
    excerpt: 'Understanding the ecological footprint of conventional ink production and how sustainable alternatives help.',
    image: '/images/blog/environmental-impact.jpg',
    category: 'Environment',
    date: 'March 10, 2023',
    readTime: '6 min read',
    tags: ['environment', 'sustainability', 'research'],
    featured: false
  },
  {
    id: 4,
    slug: 'artist-spotlight-maya-greene',
    title: 'Artist Spotlight: Maya Greene and Her Pollution-Based Masterpieces',
    excerpt: 'How renowned artist Maya Greene is using AuaLine inks to create environmental awareness through art.',
    image: '/images/blog/artist-spotlight.jpg',
    category: 'Artists',
    date: 'June 5, 2023',
    readTime: '7 min read',
    tags: ['artists', 'interviews', 'inspiration'],
    featured: true
  },
  {
    id: 5,
    slug: 'future-of-sustainable-art-supplies',
    title: 'The Future of Sustainable Art Supplies',
    excerpt: 'Exploring innovations in eco-friendly art materials and how they\'re changing the creative industry.',
    image: '/images/blog/future-sustainable.jpg',
    category: 'Trends',
    date: 'May 28, 2023',
    readTime: '4 min read',
    tags: ['trends', 'future', 'sustainability'],
    featured: false
  },
  {
    id: 6,
    slug: 'school-programs-environmental-art',
    title: 'How Schools Are Incorporating Environmental Art in Education',
    excerpt: 'Educational institutions that are teaching sustainability through art with eco-friendly supplies.',
    image: '/images/blog/school-programs.jpg',
    category: 'Education',
    date: 'April 30, 2023',
    readTime: '6 min read',
    tags: ['education', 'schools', 'environmental'],
    featured: false
  }
];

// Categories for filter
const CATEGORIES = [
  'All',
  'Innovation',
  'Tutorials',
  'Environment',
  'Artists',
  'Trends',
  'Education'
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter posts based on search query and category
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured posts
  const featuredPosts = BLOG_POSTS.filter(post => post.featured);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-emerald-800 to-emerald-950 flex items-center justify-center">
        {/* Ink splash SVG overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,50 C30,20 70,80 100,50 L100,100 L0,100 Z"
              fill="#28A745"
              fillOpacity="0.3"
            />
            <path
              d="M0,70 C20,40 80,60 100,30 L100,100 L0,100 Z"
              fill="#4DA8DA"
              fillOpacity="0.4"
            />
          </svg>
          
          {/* Random ink drops */}
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-8 h-12 bg-eco-leaf opacity-10 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 2})`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="text-solar-yellow">Blog</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Insights, stories, and ideas about sustainable art and environmental innovation
          </motion.p>
        </div>
      </section>
      
      {/* Featured Posts */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-800 dark:text-white">Featured Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <motion.div 
                key={post.id}
                className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-60 overflow-hidden">
                    {/* Fallback image with gradient if no actual image is available */}
                    <div className="absolute inset-0 bg-gradient-to-br from-eco-leaf/70 to-sky-blue/70 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">AuaLine Blog</span>
                    </div>
                    
                    {/* Pseudo-elements for ink drip effect */}
                    <div className="absolute bottom-0 left-1/4 w-1 h-10 bg-eco-leaf/30 rounded-t-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 right-1/3 w-2 h-16 bg-sky-blue/30 rounded-t-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-1000 delay-100"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3 text-sm">
                      <span className="bg-eco-leaf/10 text-eco-leaf px-3 py-1 rounded-full">{post.category}</span>
                      <span className="mx-2 text-slate-400">•</span>
                      <span className="flex items-center text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </span>
                      <span className="mx-2 text-slate-400">•</span>
                      <span className="flex items-center text-slate-500 dark:text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-eco-leaf dark:group-hover:text-eco-leaf transition-colors duration-200">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {post.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <span className="text-eco-leaf flex items-center text-sm font-medium">
                        Read more
                        <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="w-full md:w-64 shrink-0">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full px-4 py-2 pl-10 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-leaf text-slate-800 dark:text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hidden md:block">
                  <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Categories</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-eco-leaf text-white'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Blog posts grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">All Articles</h2>
                
                <button 
                  className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
              
              {/* Mobile filters */}
              {showMobileFilters && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6 md:hidden">
                  <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category
                            ? 'bg-eco-leaf text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowMobileFilters(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {filteredPosts.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
                  <p className="text-slate-600 dark:text-slate-300 mb-4">No articles found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-eco-leaf hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPosts.map((post) => (
                    <motion.div 
                      key={post.id}
                      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                      variants={itemVariants}
                    >
                      <Link href={`/blog/${post.slug}`} className="block flex-1 flex flex-col">
                        <div className="relative h-40 overflow-hidden">
                          {/* Fallback gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-eco-leaf/50 to-sky-blue/50"></div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex items-center mb-3 text-xs">
                            <span className="bg-eco-leaf/10 text-eco-leaf px-2 py-0.5 rounded-full">
                              {post.category}
                            </span>
                            <span className="ml-auto flex items-center text-slate-500 dark:text-slate-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.readTime}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
                            {post.title}
                          </h3>
                          
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 flex-1">
                            {post.excerpt}
                          </p>
                          
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {post.date}
                            </span>
                            
                            <span className="text-eco-leaf text-sm flex items-center">
                              Read more
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-emerald-50 dark:bg-emerald-950/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-white">Stay Updated</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Subscribe to our newsletter for the latest articles, insights and updates on sustainable art and environmental innovation.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                required
              />
              <button
                type="submit"
                className="bg-eco-leaf hover:bg-eco-leaf/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              By subscribing, you agree to our <Link href="/privacy" className="text-eco-leaf hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-eco-leaf hover:underline">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 