// User-related types
export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin' | 'editor';
  ecoStats: EcoStats;
  createdAt: any; // Firestore Timestamp
  lastLogin: any; // Firestore Timestamp
}

export interface EcoStats {
  co2Saved: number; // kg
  airFiltered: number; // hours
  treesEquivalent: number; // equivalent trees planted
}

// Product-related types
export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: 'inks' | 'accessories' | 'paper';
  color?: string;
  colorHex?: string;
  tags: string[];
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  variants: ProductVariant[];
  specs: ProductSpec[];
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inStock: boolean;
  stockQuantity: number;
  volume?: string; // e.g., "30ml", "100ml"
}

export interface ProductSpec {
  name: string;
  value: string;
}

// Order-related types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled' | 'refunded';
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  stripePaymentId?: string;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Blog-related types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: Author;
  tags: string[];
  readingTime: number;
  published: boolean;
  publishedAt: any; // Firestore Timestamp
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
}

// Review-related types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  isVerifiedPurchase: boolean;
  createdAt: any; // Firestore Timestamp
}

// Coupon-related types
export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  minOrderValue?: number;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  expiresAt: any; // Firestore Timestamp
  createdAt: any; // Firestore Timestamp
}

// Cart-related types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  discount: number;
} 