"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import { Cart, CartItem, Product, ProductVariant } from '@/types';

type CartContextType = {
  cart: Cart;
  loading: boolean;
  error: string | null;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => Promise<Cart>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<Cart>;
  removeItem: (itemId: string) => Promise<Cart>;
  clearCart: () => Promise<Cart>;
  applyCoupon: (code: string) => Promise<Cart>;
  removeCoupon: () => Promise<Cart>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartHook = useCart();
  
  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  
  return context;
}

// Default export for dynamic import
export default { CartProvider }; 