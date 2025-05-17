"use client";

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Cart, CartItem, Product, ProductVariant } from '@/types';

// Default empty cart
const defaultCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  discount: 0,
};

export function useCart() {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Check if running in browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart from localStorage or Firestore (if user is logged in)
  useEffect(() => {
    // Skip effects during SSR
    if (!isClient) return;
    
    let unsubscribe: (() => void) | undefined;
    
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          // User is logged in, load cart from Firestore
          const cartDocRef = doc(db, 'carts', user.uid);
          
          // Real-time listener for cart updates
          unsubscribe = onSnapshot(cartDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const cartData = docSnap.data() as Cart;
              setCart(cartData);
            } else {
              // No cart exists yet for this user
              const savedCart = loadCartFromLocalStorage();
              if (savedCart && savedCart.items.length > 0) {
                // If there's a cart in localStorage, save it to Firestore
                saveCartToFirestore(savedCart);
                setCart(savedCart);
              } else {
                setCart(defaultCart);
              }
            }
            setLoading(false);
          });
        } else {
          // User is not logged in, load cart from localStorage
          const savedCart = loadCartFromLocalStorage();
          setCart(savedCart || defaultCart);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading cart:', err);
        setError(err.message || 'Failed to load cart');
        setLoading(false);
      }
    };
    
    loadCart();
    
    // Cleanup function to unsubscribe from Firestore listener
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, isClient]);

  // Load cart from localStorage (only on client)
  const loadCartFromLocalStorage = (): Cart | null => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : null;
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return null;
      }
    }
    return null;
  };

  // Save cart to localStorage
  const saveCartToLocalStorage = (cartToSave: Cart) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartToSave));
    }
  };

  // Save cart to Firestore
  const saveCartToFirestore = async (cartToSave: Cart) => {
    try {
      if (user) {
        const cartDocRef = doc(db, 'carts', user.uid);
        await setDoc(cartDocRef, {
          ...cartToSave,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Error saving cart to Firestore:', err);
    }
  };

  // Calculate cart totals
  const calculateTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Tax calculation (e.g., 8%)
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    
    // Shipping calculation (simplified)
    const shipping = subtotal > 50 ? 0 : 5.99;
    
    // Apply any discount
    const discount = cart.couponCode ? (cart.discount || 0) : 0;
    
    // Calculate total
    const total = subtotal + tax + shipping - discount;
    
    return {
      items,
      subtotal,
      tax,
      shipping,
      total,
      couponCode: cart.couponCode,
      discount,
    };
  };

  // Add item to cart
  const addItem = async (
    product: Product,
    quantity: number = 1,
    variant?: ProductVariant
  ) => {
    try {
      const newItems = [...cart.items];
      
      // Determine the correct price
      const price = variant ? variant.price : product.price;
      
      // Check if item already exists in cart
      const existingItemIndex = newItems.findIndex(item => 
        item.productId === product.id && 
        (variant ? item.variantId === variant.id : !item.variantId)
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}${variant ? `-${variant.id}` : ''}`,
          productId: product.id,
          variantId: variant?.id,
          name: product.name + (variant ? ` - ${variant.name}` : ''),
          price,
          quantity,
          image: product.images[0],
        };
        newItems.push(newItem);
      }
      
      // Calculate updated totals
      const updatedCart = calculateTotals(newItems);
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user) {
        await saveCartToFirestore(updatedCart);
      }
      
      return updatedCart;
    } catch (err: any) {
      console.error('Error adding item to cart:', err);
      setError(err.message || 'Failed to add item to cart');
      throw err;
    }
  };

  // Update item quantity
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        return removeItem(itemId);
      }
      
      const newItems = [...cart.items].map(item => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      // Calculate updated totals
      const updatedCart = calculateTotals(newItems);
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user) {
        await saveCartToFirestore(updatedCart);
      }
      
      return updatedCart;
    } catch (err: any) {
      console.error('Error updating item quantity:', err);
      setError(err.message || 'Failed to update item quantity');
      throw err;
    }
  };

  // Remove item from cart
  const removeItem = async (itemId: string) => {
    try {
      const newItems = cart.items.filter(item => item.id !== itemId);
      
      // Calculate updated totals
      const updatedCart = calculateTotals(newItems);
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user) {
        await saveCartToFirestore(updatedCart);
      }
      
      return updatedCart;
    } catch (err: any) {
      console.error('Error removing item from cart:', err);
      setError(err.message || 'Failed to remove item from cart');
      throw err;
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const updatedCart = defaultCart;
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user) {
        await saveCartToFirestore(updatedCart);
      }
      
      return updatedCart;
    } catch (err: any) {
      console.error('Error clearing cart:', err);
      setError(err.message || 'Failed to clear cart');
      throw err;
    }
  };

  // Apply coupon code
  const applyCoupon = async (code: string) => {
    try {
      // In a real implementation, you would validate the coupon code with Firebase
      // Here we'll simulate a simple discount
      
      // Example: Check if coupon exists and is valid
      const couponRef = doc(db, 'coupons', code.toUpperCase());
      const couponDoc = await getDoc(couponRef);
      
      if (!couponDoc.exists()) {
        throw new Error('Invalid coupon code');
      }
      
      const couponData = couponDoc.data();
      
      if (!couponData.isActive || (couponData.expiresAt && couponData.expiresAt.toDate() < new Date())) {
        throw new Error('Coupon has expired');
      }
      
      if (couponData.usageLimit && couponData.usageCount >= couponData.usageLimit) {
        throw new Error('Coupon usage limit reached');
      }
      
      // Calculate discount
      let discount = 0;
      if (couponData.type === 'percentage') {
        discount = (cart.subtotal * couponData.value) / 100;
      } else {
        discount = couponData.value;
      }
      
      // Apply minimum order value check if applicable
      if (couponData.minOrderValue && cart.subtotal < couponData.minOrderValue) {
        throw new Error(`Order must be at least $${couponData.minOrderValue} to use this coupon`);
      }
      
      // Update cart with coupon code and discount
      const updatedCart: Cart = {
        ...cart,
        couponCode: code,
        discount,
        total: cart.subtotal + cart.tax + cart.shipping - discount,
      };
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user) {
        await saveCartToFirestore(updatedCart);
      }
      
      return updatedCart;
    } catch (err: any) {
      console.error('Error applying coupon:', err);
      setError(err.message || 'Failed to apply coupon');
      throw err;
    }
  };

  // Remove coupon code
  const removeCoupon = async () => {
    try {
      const updatedCart: Cart = {
        ...cart,
        couponCode: undefined,
        discount: 0,
        total: cart.subtotal + cart.tax + cart.shipping,
      };
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user) {
        await saveCartToFirestore(updatedCart);
      }
      
      return updatedCart;
    } catch (err: any) {
      console.error('Error removing coupon:', err);
      setError(err.message || 'Failed to remove coupon');
      throw err;
    }
  };

  return {
    cart,
    loading,
    error,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
  };
} 