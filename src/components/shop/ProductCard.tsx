"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag } from "lucide-react";

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
        className="group relative bg-white dark:bg-ink-blue/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          {/* Всегда показываем цветной блок вместо изображения */}
          <div 
            className={`w-full h-full ${product.color || 'bg-gray-200'} flex items-center justify-center`}
          >
            <span className="text-3xl font-bold text-white">{product.name.charAt(0)}</span>
          </div>
          
          {/* New and Best Seller Tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-eco-leaf text-white text-xs font-medium rounded-md">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-1 bg-solar-yellow text-ink-blue text-xs font-medium rounded-md">
                Best Seller
              </span>
            )}
          </div>
          
          {/* Quick Action Buttons */}
          <div 
            className={`absolute bottom-2 right-2 flex gap-2 transform ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } transition-all duration-300`}
          >
            {/* Quick Add to Cart */}
            <button 
              onClick={addToCart}
              className="p-2 bg-white dark:bg-ink-blue hover:bg-eco-leaf dark:hover:bg-eco-leaf text-gray-600 hover:text-white dark:text-gray-300 dark:hover:text-white rounded-full shadow-md"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
            
            {/* Quick Add to Wishlist */}
            <button 
              onClick={addToWishlist}
              className="p-2 bg-white dark:bg-ink-blue hover:bg-pink-500 dark:hover:bg-pink-500 text-gray-600 hover:text-white dark:text-gray-300 dark:hover:text-white rounded-full shadow-md"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Product Content */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{product.name}</h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-ink-blue dark:text-eco-leaf">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center">
              <Star className="h-4 w-4 text-solar-yellow fill-solar-yellow mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {product.rating} <span className="text-gray-400 dark:text-gray-500">({product.reviews})</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard; 