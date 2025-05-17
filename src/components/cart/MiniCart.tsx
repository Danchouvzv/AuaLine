"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/contexts/CartContext';
import { ShoppingBag, Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, loading, removeItem, updateItemQuantity } = useCartContext();
  const miniCartRef = useRef<HTMLDivElement>(null);

  // Close mini cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [miniCartRef]);

  // Handle overlay escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const toggleMiniCart = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateItemQuantity(itemId, quantity);
  };
  
  return (
    <div className="relative" ref={miniCartRef}>
      <button 
        onClick={toggleMiniCart}
        className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
        aria-label="Shopping cart"
      >
        <ShoppingBag size={24} />
        {cart.items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mini cart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">Your Cart ({cart.items.length})</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>
              
              {loading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Loading your cart...</p>
                </div>
              ) : cart.items.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCart size={32} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Your cart is empty</p>
                  <Link 
                    href="/products" 
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <>
                  <div className="max-h-80 overflow-y-auto p-4 space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex gap-3 py-2 border-b border-gray-100">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <ShoppingBag size={20} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex flex-col justify-between items-end">
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                          
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-500 hover:text-gray-700"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-500 hover:text-gray-700"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
                      </div>
                      {cart.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-medium text-green-600">-${cart.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium">
                          {cart.shipping === 0 ? 'Free' : `$${cart.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax:</span>
                        <span className="font-medium">${cart.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t border-gray-100">
                        <span>Total:</span>
                        <span>${cart.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Link 
                        href="/cart" 
                        className="block text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-md text-sm font-medium w-full transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        View Cart
                      </Link>
                      <Link 
                        href="/checkout" 
                        className="block text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 