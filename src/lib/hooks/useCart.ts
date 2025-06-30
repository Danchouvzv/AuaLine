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
          if (!db) {
            console.warn('Firestore is not initialized');
            const savedCart = loadCartFromLocalStorage();
            setCart(savedCart || defaultCart);
            setLoading(false);
            return;
          }
          
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
      if (user && db) {
        const cartDocRef = doc(db, 'carts', user.uid);
        await setDoc(cartDocRef, {
          ...cartToSave,
          updatedAt: serverTimestamp(),
        });
      } else if (user && !db) {
        console.warn('Firestore is not initialized, cart saved only to localStorage');
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
      if (user && db) {
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
      if (user && db) {
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
      if (user && db) {
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
      // Update state with empty cart
      setCart(defaultCart);
      
      // Save to storage/database
      saveCartToLocalStorage(defaultCart);
      if (user && db) {
        await saveCartToFirestore(defaultCart);
      }
      
      return defaultCart;
    } catch (err: any) {
      console.error('Error clearing cart:', err);
      setError(err.message || 'Failed to clear cart');
      throw err;
    }
  };

  // Apply coupon code
  const applyCoupon = async (code: string) => {
    try {
      // In a real app, you would validate the coupon code here
      // For this demo, we'll just hard-code a few valid coupon codes
      
      // Validate coupon by checking a "coupons" collection in Firestore
      let discountAmount = 0;
      let isValid = false;
      
      if (db) {
        // Attempt to check coupon in Firestore
        try {
          const couponDocRef = doc(db, 'coupons', code.toUpperCase());
          const couponDoc = await getDoc(couponDocRef);
          
          if (couponDoc.exists()) {
            const couponData = couponDoc.data();
            isValid = couponData.isActive && 
                     (!couponData.expiresAt || couponData.expiresAt.toDate() > new Date()) &&
                     (!couponData.usageLimit || couponData.usageCount < couponData.usageLimit);
            
            if (isValid) {
              if (couponData.type === 'percentage') {
                discountAmount = (cart.subtotal * couponData.value) / 100;
              } else {
                discountAmount = couponData.value;
              }
              
              // Ensure discount doesn't exceed subtotal
              discountAmount = Math.min(discountAmount, cart.subtotal);
            }
          }
        } catch (err) {
          console.error('Error validating coupon in Firestore:', err);
          // Fall back to demo coupons
        }
      }
      
      // If Firestore validation didn't work, use hard-coded demo coupons
      if (!isValid) {
        switch (code.toUpperCase()) {
          case 'ECO10':
            discountAmount = cart.subtotal * 0.1; // 10% off
            isValid = true;
            break;
          case 'FREESHIP':
            discountAmount = cart.shipping;
            isValid = true;
            break;
          case 'ECO20':
            discountAmount = cart.subtotal * 0.2; // 20% off
            isValid = true;
            break;
          default:
            throw new Error('Invalid coupon code');
        }
      }
      
      if (!isValid) {
        throw new Error('Invalid coupon code');
      }
      
      // Apply discount
      const updatedCart: Cart = {
        ...cart,
        couponCode: code.toUpperCase(),
        discount: discountAmount,
        total: cart.subtotal + cart.tax + cart.shipping - discountAmount
      };
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user && db) {
        await saveCartToFirestore(updatedCart);
      }
      
      return updatedCart;
    } catch (err: any) {
      console.error('Error applying coupon:', err);
      setError(err.message || 'Failed to apply coupon');
      throw err;
    }
  };

  // Remove coupon
  const removeCoupon = async () => {
    try {
      const updatedCart: Cart = {
        ...cart,
        couponCode: undefined,
        discount: 0,
        total: cart.subtotal + cart.tax + cart.shipping
      };
      
      // Update state
      setCart(updatedCart);
      
      // Save to storage/database
      saveCartToLocalStorage(updatedCart);
      if (user && db) {
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