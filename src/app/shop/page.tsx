"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Filter, Search, X, ChevronDown, Sliders, Sun, Clock, Droplet, Grid3X3, SlidersHorizontal, Layout, ShoppingBag, Package as PackageIcon, Monitor } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';

// Mock data - in a real app would come from Firestore/API
const products = [
  {
    id: "eco-leaf-green",
    name: "Eco-Leaf Green",
    description: "A rich, vibrant green made from filtered carbon particles",
    price: 24.99,
    image: "https://i.pinimg.com/736x/df/71/44/df7144f677d9222e9554621940fa1df2.jpg",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestSeller: false,
    category: "inks",
    color: "bg-eco-leaf",
  },
  {
    id: "sky-blue",
    name: "Sky Blue",
    description: "A calming blue inspired by clear skies after air filtration",
    price: 24.99,
    image: "https://www.pinterest.com/pin/1019572803149150852",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isBestSeller: true,
    category: "inks",
    color: "bg-sky-blue",
  },
  {
    id: "coral-red",
    name: "Coral Red",
    description: "A vibrant red with high pigment density for artists",
    price: 26.99,
    image: "/images/products/coral-red.jpg",
    rating: 4.7,
    reviews: 76,
    isNew: false,
    isBestSeller: false,
    category: "inks",
    color: "bg-coral-red",
  },
  {
    id: "carbon-black",
    name: "Carbon Black",
    description: "Our classic black, made directly from carbon emissions",
    price: 22.99,
    image: "/images/products/carbon-black.jpg",
    rating: 4.9,
    reviews: 213,
    isNew: false,
    isBestSeller: true,
    category: "inks",
    color: "bg-carbon-black",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Deep blue ink inspired by our mission to clean the oceans",
    price: 24.99,
    image: "https://i.pinimg.com/736x/0b/c6/82/0bc6829779e6c3a91e15640918696358.jpg",
    rating: 4.7,
    reviews: 48,
    isNew: true,
    isBestSeller: false,
    category: "inks",
    color: "bg-sky-blue/80",
  },
  {
    id: "eco-pen",
    name: "Premium Eco Pen",
    description: "Ergonomic design with sustainable materials and smooth writing",
    price: 35.99,
    image: "blob:https://www.pinterest.com/009bee2a-c118-4889-b760-87fe7aba37c2",
    rating: 4.9,
    reviews: 76,
    isNew: true,
    isBestSeller: true,
    category: "accessories",
    color: "bg-eco-leaf/20",
  }
];

// Available categories from our products
const categories = [
  { id: "all", name: "All Products", icon: Grid3X3 },
  { id: "inks", name: "Eco Inks", icon: Droplet },
  { id: "accessories", name: "Accessories", icon: ShoppingBag }
];

// Sorting options
const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "newest", name: "Newest" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" }
];

// Price range options
const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "under-20", name: "Under $20" },
  { id: "20-50", name: "Between $20 - $50" },
  { id: "over-50", name: "Over $50" }
];

const ShopPage = () => {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Refs for animation
  const shopRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: shopRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Handle filter changes
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Filter by price range
    if (priceRange === "under-20") {
      result = result.filter(product => product.price < 20);
    } else if (priceRange === "20-50") {
      result = result.filter(product => product.price >= 20 && product.price <= 50);
    } else if (priceRange === "over-50") {
      result = result.filter(product => product.price > 50);
    }
    
    // Sort products
    if (sortBy === "price-low") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result = result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    } else if (sortBy === "rating") {
      result = result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy, priceRange]);
  
  // Helper for styling active category
  const getCategoryButtonClass = (categoryId: string) => {
    return `flex items-center p-3 rounded-lg transition-all ${
      selectedCategory === categoryId 
      ? "bg-eco-leaf text-white dark:bg-eco-leaf dark:text-white font-medium"
      : "hover:bg-gray-100 dark:hover:bg-ink-blue/30"
    }`;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  return (
    <main className="min-h-screen bg-white dark:bg-carbon-black" ref={shopRef}>
      {/* Hero section with ink splash animations */}
      <section className="relative h-[30vh] md:h-[40vh] overflow-hidden bg-gradient-to-r from-ink-blue via-eco-leaf/90 to-sky-blue flex items-center">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity, scale, y }}
        >
          {/* Ink splash effects */}
          <div className="absolute inset-0 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
                fill="#28A745"
                fillOpacity="0.3"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.path
                d="M0,60 Q35,80 70,60 T100,70 V100 H0 Z"
                fill="#4DA8DA"
                fillOpacity="0.4"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
            
            {/* Floating ink drops */}
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-16 h-16 rounded-full bg-white/10"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${30 + (i % 3) * 15}%`,
                }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 0.5,
                  transition: { 
                    duration: 1 + i * 0.2, 
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Shop Our <span className="text-solar-yellow">Sustainable</span> Collection
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Eco-friendly inks and art supplies made from captured carbon emissions
          </motion.p>
        </div>
      </section>
      
      {/* Shop content */}
      <section className="container mx-auto px-4 py-12">
        {/* Mobile filter toggle */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold">Products</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-ink-blue/30 px-4 py-2 rounded-md"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters - desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-white dark:bg-ink-blue/20 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={getCategoryButtonClass(category.id)}
                    >
                      <category.icon className="mr-2 h-4 w-4" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price ranges */}
              <div>
                <h3 className="text-lg font-bold mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.id} className="flex items-center">
                      <input
                        type="radio"
                        name="price-range"
                        checked={priceRange === range.id}
                        onChange={() => setPriceRange(range.id)}
                        className="h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded"
                      />
                      <span className="ml-2">{range.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* New and bestseller filters */}
              <div>
                <h3 className="text-lg font-bold mb-3">Product Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded"
                      />
                      <span className="ml-2">New Arrivals</span>
                    </label>
                    <span className="text-sm bg-eco-leaf/10 text-eco-leaf px-2 py-0.5 rounded-full">
                      {products.filter(p => p.isNew).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded"
                      />
                      <span className="ml-2">Best Sellers</span>
                    </label>
                    <span className="text-sm bg-solar-yellow/10 text-solar-yellow dark:text-solar-yellow px-2 py-0.5 rounded-full">
                      {products.filter(p => p.isBestSeller).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Mobile filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="fixed inset-0 bg-black/50 z-50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-5/6 max-w-md bg-white dark:bg-carbon-black p-6 overflow-y-auto"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  {/* Mobile filter contents - same as desktop but styled for mobile */}
                  <div className="space-y-8">
                    {/* Search */}
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 bg-white dark:bg-ink-blue/20 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                    
                    {/* Categories */}
                    <div>
                      <h3 className="text-lg font-bold mb-3">Categories</h3>
                      <div className="space-y-1">
                        {categories.map(category => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setShowFilters(false);
                            }}
                            className={getCategoryButtonClass(category.id)}
                          >
                            <category.icon className="mr-2 h-4 w-4" />
                            <span>{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price ranges */}
                    <div>
                      <h3 className="text-lg font-bold mb-3">Price Range</h3>
                      <div className="space-y-2">
                        {priceRanges.map(range => (
                          <label key={range.id} className="flex items-center">
                            <input
                              type="radio"
                              name="price-range-mobile"
                              checked={priceRange === range.id}
                              onChange={() => setPriceRange(range.id)}
                              className="h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded"
                            />
                            <span className="ml-2">{range.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Apply button */}
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-eco-leaf text-white py-3 rounded-lg hover:bg-eco-leaf/90 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Sort controls */}
            <div className="flex flex-wrap items-center justify-between mb-6 bg-gray-50 dark:bg-ink-blue/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-white dark:bg-ink-blue/30 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-sm">View:</span>
                <div className="flex items-center space-x-2 bg-white dark:bg-ink-blue/30 rounded-lg p-1">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-2 rounded ${layout === "grid" ? "bg-eco-leaf text-white" : ""}`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-2 rounded ${layout === "list" ? "bg-eco-leaf text-white" : ""}`}
                    aria-label="List view"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </button>
                </div>
                
                <span className="text-sm hidden sm:inline-block">
                  {filteredProducts.length} products
                </span>
              </div>
            </div>
            
            {/* Products display */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-ink-blue/30 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    We couldn't find any products matching your current filters. Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                      setPriceRange("all");
                      setSortBy("featured");
                    }}
                    className="mt-6 inline-flex items-center px-4 py-2 bg-eco-leaf text-white rounded-lg hover:bg-eco-leaf/90 transition-colors"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={
                  layout === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col space-y-6"
                }
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage; 