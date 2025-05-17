"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/contexts/CartContext';
import { ShoppingBag, Plus, Minus, X, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartContent() {
  const { cart, loading, error, removeItem, updateItemQuantity, applyCoupon, removeCoupon } = useCartContext();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    updateItemQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setCouponLoading(true);
    setCouponError(null);

    try {
      await applyCoupon(couponCode.trim());
    } catch (err: any) {
      setCouponError(err.message || 'Invalid coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setCouponLoading(true);
    
    try {
      await removeCoupon();
      setCouponCode('');
      setCouponError(null);
    } catch (err) {
      // Handle error if needed
    } finally {
      setCouponLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
          <span className="ml-4 text-xl text-gray-600">Loading your cart...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading your cart: {error}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center py-8">
          <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items to your cart to see them here.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="hidden md:grid md:grid-cols-12 p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
              <div className="md:col-span-6">Product</div>
              <div className="md:col-span-2 text-center">Price</div>
              <div className="md:col-span-2 text-center">Quantity</div>
              <div className="md:col-span-2 text-right">Total</div>
            </div>
            
            {cart.items.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <div className="md:grid md:grid-cols-12 p-4 gap-4 items-center">
                  {/* Mobile remove button (shown only on mobile) */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 md:hidden"
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>
                  
                  {/* Product column */}
                  <div className="md:col-span-6 flex items-center">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <ShoppingBag size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.variantId && <span className="mr-2">Variant: {item.variantId}</span>}
                      </p>
                      
                      {/* Mobile price (shown only on mobile) */}
                      <p className="text-sm font-medium text-gray-900 mt-1 md:hidden">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Price column */}
                  <div className="md:col-span-2 text-center hidden md:block">
                    <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity column */}
                  <div className="md:col-span-2 flex justify-center mt-4 md:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-500 hover:text-gray-700"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-500 hover:text-gray-700"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total column */}
                  <div className="md:col-span-2 text-right flex justify-between items-center mt-4 md:mt-0">
                    <span className="font-medium text-gray-900 md:hidden">Total:</span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    {/* Desktop remove button (hidden on mobile) */}
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 ml-4 hidden md:block"
                      aria-label="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Continue shopping button */}
          <div className="mb-8">
            <Link 
              href="/products" 
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Cart summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-20">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>
            
            {/* Coupon code section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              {cart.couponCode ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Applied: {cart.couponCode}
                    </p>
                    <p className="text-xs text-green-700">
                      Discount: ${cart.discount.toFixed(2)}
                    </p>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-green-700 hover:text-green-800"
                    aria-label="Remove coupon"
                    disabled={couponLoading}
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-r-md px-4 py-2 text-sm transition-colors"
                      disabled={couponLoading}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-600 text-xs mt-1">{couponError}</p>
                  )}
                </>
              )}
            </div>
            
            {/* Order details */}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -${cart.discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {cart.shipping === 0 ? 'Free' : `$${cart.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${cart.tax.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="flex justify-between items-center py-4">
              <span className="text-lg font-medium text-gray-800">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ${cart.total.toFixed(2)}
              </span>
            </div>
            
            {/* Checkout button */}
            <Link
              href="/checkout"
              className="w-full mt-4 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Proceed to Checkout
              <ArrowRight size={16} className="ml-2" />
            </Link>
            
            {/* Secure checkout message */}
            <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 