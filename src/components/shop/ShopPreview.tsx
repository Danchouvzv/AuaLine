"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import ProductCard from "./ProductCard";

// Mock data - would come from Firebase in real implementation
const products = [
  {
    id: "eco-leaf-green",
    name: "Eco-Leaf Green",
    description: "A rich, vibrant green made from filtered carbon particles",
    price: 24.99,
    image: "/public/images/products/Eco-LeafGreen.jpg",
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
    image: "/public/images/products/sky-blue.jpg",
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
    image: "/public/images/products/colar-black.jpg",
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
    image: "/public/images/products/colar-black.jpg",
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
    image: "/public/images/products/ocean-blue.png",
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
    image: "/public/images/products/eco-pen.png",
    rating: 4.9,
    reviews: 76,
    isNew: true,
    isBestSeller: true,
    category: "accessories",
    color: "bg-eco-leaf/20",
  },
];

const ShopPreview = () => {
  const [filter, setFilter] = useState<"all" | "new" | "best">("all");
  
  // Filter products based on selected filter
  const filteredProducts = products.filter((product) => {
    if (filter === "new") return product.isNew;
    if (filter === "best") return product.isBestSeller;
    return true;
  });

  return (
    <section id="shop-preview" className="section-space bg-white dark:bg-carbon-black">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
              Shop Our Collection
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Sustainable inks and accessories for conscious creators
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 mt-6 md:mt-0">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-ink-blue text-white dark:bg-solar-yellow dark:text-ink-blue"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ink-blue/20"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter("new")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "new"
                  ? "bg-ink-blue text-white dark:bg-solar-yellow dark:text-ink-blue"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ink-blue/20"
              }`}
            >
              New
            </button>
            <button
              onClick={() => setFilter("best")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "best"
                  ? "bg-ink-blue text-white dark:bg-solar-yellow dark:text-ink-blue"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-ink-blue/20"
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center text-lg font-medium text-ink-blue dark:text-solar-yellow hover:underline"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopPreview; 