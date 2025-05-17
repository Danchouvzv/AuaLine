"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart } from "lucide-react";

// Define the product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  category: string;
  color: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Placeholder function for adding to cart
  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // This would call a Firebase function or update global cart state in a real implementation
    console.log(`Added ${product.name} to cart`);
    
    // Animate cart icon (would be implemented in real app)
  };
  
  // Placeholder function for adding to wishlist
  const addToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // This would call a Firebase function or update global wishlist state in a real implementation
    console.log(`Added ${product.name} to wishlist`);
  };

  return (
    <Link href={`/shop/${product.id}`}>
      <motion.div
        className="group relative bg-white dark:bg-ink-blue/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-ink-blue/40">
          {/* Placeholder for the actual image */}
          <div className={`w-full h-full flex items-center justify-center ${product.color}`}>
            <span className="text-6xl text-white/90">Aa</span>
          </div>
          
          {/* In a real implementation, we would use next/image */}
          {/* <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transform transition-transform duration-300 group-hover:scale-105"
          /> */}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-eco-leaf text-white px-2 py-1 text-xs font-bold rounded">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-solar-yellow text-ink-blue px-2 py-1 text-xs font-bold rounded">
                BEST SELLER
              </span>
            )}
          </div>
          
          {/* Quick actions */}
          <div className="absolute top-2 right-2">
            <button
              onClick={addToWishlist}
              className="p-2 bg-white/90 dark:bg-ink-blue/90 rounded-full shadow-sm hover:bg-white dark:hover:bg-ink-blue transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4 text-coral-red" />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold truncate">{product.name}</h3>
          
          <div className="flex items-center mt-1 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-solar-yellow fill-solar-yellow" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 h-10 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-ink-blue dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            
            <motion.button
              onClick={addToCart}
              className="p-2 bg-eco-leaf text-white rounded-full hover:bg-eco-leaf/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white text-sm font-medium bg-ink-blue/80 px-3 py-1 rounded-full">
              View Details
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProductCard; 