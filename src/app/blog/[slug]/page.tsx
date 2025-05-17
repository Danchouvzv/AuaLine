"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Copy, Check, Tag, ChevronRight } from 'lucide-react';

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
    featured: true,
    author: {
      name: 'Emma Chen',
      role: 'Environmental Scientist & Artist',
      avatar: '/images/blog/authors/emma-chen.jpg'
    },
    content: `
      <p class="lead">At AuaLine, we're committed to turning environmental challenges into creative solutions. Our signature Air-to-Ink technology represents years of research, innovation, and a passion for cleaner air and artistic expression.</p>
      
      <h2>The Genesis of an Idea</h2>
      <p>It all started with a simple observation: vehicle exhaust and industrial emissions were polluting our air with carbon particles that harm human health. But what if these same particles could be captured before entering our lungs and transformed into something useful and beautiful?</p>
      
      <p>Our founder, Dr. Ava Patel, was walking through downtown Toronto when she noticed the blackened walls of a tunnel, coated with years of exhaust residue. "That's pure carbon," she thought, "the same basic material used in traditional ink." That moment of inspiration led to five years of intensive research and development.</p>
      
      <h2>The Capture Process</h2>
      <p>Our proprietary technology uses specially designed devices that attach to vehicle exhaust pipes and industrial chimneys. These devices capture particulate matter (specifically PM2.5 and PM10) that would otherwise be released into the atmosphere.</p>
      
      <p>The collected carbon is then processed through several stages:</p>
      <ul>
        <li>Initial collection of raw carbon particulate</li>
        <li>Separation from other pollutants and heavy metals</li>
        <li>Purification to remove toxic components</li>
        <li>Processing into a fine, consistent powder</li>
      </ul>
      
      <blockquote>
        <p>We're not just making ink—we're cleaning the air, one exhaust pipe at a time.</p>
        <cite>— Dr. Ava Patel, Founder of AuaLine</cite>
      </blockquote>
      
      <h2>From Carbon to Ink</h2>
      <p>The purified carbon becomes the pigment base for our ink. We combine it with eco-friendly binders, stabilizers, and flow agents to create ink with exceptional properties:</p>
      
      <ul>
        <li>Rich, deep black tones that traditional inks struggle to achieve</li>
        <li>Excellent lightfastness and water resistance</li>
        <li>Smooth flow and minimal bleeding on various paper types</li>
        <li>Non-toxic formulation safe for artists and the environment</li>
      </ul>
      
      <h2>Environmental Impact</h2>
      <p>Each 30ml bottle of AuaLine ink represents approximately 45 minutes of diesel engine emissions that have been captured rather than released into the atmosphere. To date, our technology has prevented over 2,500 kg of carbon particulate from entering the air we breathe.</p>
      
      <p>But we're just getting started. Our vision extends beyond ink to other applications where captured carbon can replace virgin materials, closing the loop and creating a circular economy for what was once considered nothing but harmful waste.</p>
      
      <h2>The Future of Air-to-Ink</h2>
      <p>We're continuously improving our technology and exploring new applications. Current research includes:</p>
      
      <ul>
        <li>Expanding our color palette by incorporating natural pigments</li>
        <li>Developing specialized formulations for industrial printing</li>
        <li>Creating washable ink options for educational settings</li>
        <li>Scaling our capture technology for broader environmental impact</li>
      </ul>
      
      <p>Our journey from pollution to art represents the kind of innovative thinking needed to address environmental challenges. By seeing waste not as an endpoint but as a resource waiting to be transformed, we can create products that are not just less harmful, but actively beneficial for our planet.</p>
    `,
    relatedPosts: [2, 3, 5]
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
    featured: false,
    author: {
      name: 'Marco Alvarez',
      role: 'Head of Artist Relations',
      avatar: '/images/blog/authors/marco-alvarez.jpg'
    },
    content: `<p>Sample content for creative techniques article.</p>`,
    relatedPosts: [1, 4, 6]
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
    featured: false,
    author: {
      name: 'Dr. Samira Khan',
      role: 'Environmental Research Lead',
      avatar: '/images/blog/authors/samira-khan.jpg'
    },
    content: `<p>Sample content for environmental impact article.</p>`,
    relatedPosts: [1, 5, 6]
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
    featured: true,
    author: {
      name: 'Jade Wong',
      role: 'Arts & Culture Writer',
      avatar: '/images/blog/authors/jade-wong.jpg'
    },
    content: `<p>Sample content for artist spotlight article.</p>`,
    relatedPosts: [1, 2, 6]
  },
  {
    id: 5,
    slug: 'future-of-sustainable-art-supplies',
    title: 'The Future of Sustainable Art Supplies',
    excerpt: 'Exploring innovations in eco-friendly art materials and how they're changing the creative industry.',
    image: '/images/blog/future-sustainable.jpg',
    category: 'Trends',
    date: 'May 28, 2023',
    readTime: '4 min read',
    tags: ['trends', 'future', 'sustainability'],
    featured: false,
    author: {
      name: 'Thomas Okonkwo',
      role: 'Innovation Director',
      avatar: '/images/blog/authors/thomas-okonkwo.jpg'
    },
    content: `<p>Sample content for future of sustainable art supplies article.</p>`,
    relatedPosts: [1, 3, 6]
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
    featured: false,
    author: {
      name: 'Sofia Mendoza',
      role: 'Education Program Manager',
      avatar: '/images/blog/authors/sofia-mendoza.jpg'
    },
    content: `<p>Sample content for school programs article.</p>`,
    relatedPosts: [2, 3, 5]
  }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  
  // Simulate loading the post data
  useEffect(() => {
    const fetchPost = () => {
      // Find the post that matches the slug
      const foundPost = BLOG_POSTS.find(post => post.slug === params.slug);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Get related posts
        const related = BLOG_POSTS.filter(p => 
          foundPost.relatedPosts.includes(p.id)
        ).slice(0, 3);
        
        setRelatedPosts(related);
      }
      
      setIsLoading(false);
    };
    
    // Simulate network delay for demo purposes
    setTimeout(fetchPost, 500);
  }, [params.slug]);
  
  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center">
          {/* Ink drop loading animation */}
          <div className="relative w-16 h-24 mb-4">
            <motion.div
              className="absolute top-0 w-4 h-4 rounded-full bg-eco-leaf"
              animate={{
                y: [0, 100],
                scale: [1, 0.5],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-0 left-6 w-4 h-4 rounded-full bg-sky-blue"
              animate={{
                y: [0, 100],
                scale: [1, 0.5],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="text-slate-600 dark:text-slate-300">Loading article...</p>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4">
        <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Article Not Found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/blog" 
          className="flex items-center text-eco-leaf hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Reading progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-eco-leaf z-50 transition-all duration-200"
        style={{ width: `${readingProgress}%` }}
      />
      
      {/* Hero section */}
      <section className="relative h-[50vh] md:h-[60vh] bg-gradient-to-r from-emerald-800 to-emerald-950 flex items-center justify-center">
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
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-white/80 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-white/10 px-3 py-1 rounded-full">{post.category}</span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </section>
      
      {/* Article content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Author info */}
            <div className="flex items-center mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 mr-4">
                {/* This would be an actual image in a real application */}
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{post.author.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{post.author.role}</p>
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Share this article:</span>
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Facebook className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button 
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4 text-eco-leaf" /> : <Copy className="h-4 w-4" />}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Article body */}
            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-a:text-eco-leaf prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-medium mb-4 text-slate-800 dark:text-white flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">Related Articles</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <motion.div 
                    key={relatedPost.id}
                    className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`} className="block h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        {/* Fallback gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-eco-leaf/50 to-sky-blue/50"></div>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex items-center mb-3 text-xs">
                          <span className="bg-eco-leaf/10 text-eco-leaf px-2 py-0.5 rounded-full">
                            {relatedPost.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium mb-2 text-slate-800 dark:text-white hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors duration-200">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-grow">
                          {relatedPost.excerpt}
                        </p>
                        
                        <span className="text-eco-leaf flex items-center text-sm">
                          Read article
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center text-eco-leaf hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to all articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Enjoyed this article?</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Subscribe to our newsletter for more insights on sustainable art, environmental innovation, and creative techniques.
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
          </div>
        </div>
      </section>
    </main>
  );
} 