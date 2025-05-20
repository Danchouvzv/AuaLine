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
    image: "https://sdmntprukwest.oaiusercontent.com/files/00000000-c4b8-6243-94b9-b9a94edfb78c/raw?se=2025-05-20T18%3A13%3A44Z&sp=r&sv=2024-08-04&sr=b&scid=1fd8a9f5-078d-5c22-be6b-efecbc7e1e95&skoid=b32d65cd-c8f1-46fb-90df-c208671889d4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-19T23%3A56%3A20Z&ske=2025-05-20T23%3A56%3A20Z&sks=b&skv=2024-08-04&sig=B7cDP9NxciXOozDW5KX6e0thDdATfSRHui%2BvLjYT6TE%3D",
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
    image: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-4c40-61f4-8e8b-c6364808505c/raw?se=2025-05-20T18%3A19%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=fbd87f5c-e7cf-5262-b386-95386822d8a2&skoid=b32d65cd-c8f1-46fb-90df-c208671889d4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-20T04%3A54%3A28Z&ske=2025-05-21T04%3A54%3A28Z&sks=b&skv=2024-08-04&sig=Eah%2Bm3lQsCwQBPle8kx%2BggWf/7Yw6A2GJDKJFvb1Wfk%3D",
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
    image: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-e300-61f4-a9a9-46df387ff605/raw?se=2025-05-20T18%3A56%3A43Z&sp=r&sv=2024-08-04&sr=b&scid=ec33f4d8-0e9e-5736-9808-c94c4213bd7e&skoid=82a3371f-2f6c-4f81-8a78-2701b362559b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-20T18%3A38%3A22Z&ske=2025-05-21T18%3A38%3A22Z&sks=b&skv=2024-08-04&sig=%2Bg9%2Bk4CPgfwxmEKIRrQ4pak5E0HrezKl6h3b53F9jAc%3D",
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
    image: "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-1f08-6246-9f6d-cf3c5c9156ff/raw?se=2025-05-20T17%3A30%3A55Z&sp=r&sv=2024-08-04&sr=b&scid=8ab461f2-30c4-5290-abf7-3e16be55b4b8&skoid=b32d65cd-c8f1-46fb-90df-c208671889d4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-20T08%3A26%3A16Z&ske=2025-05-21T08%3A26%3A16Z&sks=b&skv=2024-08-04&sig=3g72DRlIeb9iz6hnK%2BLPFCBqLBBupXnw0ygZKI1E24k%3D",
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
    image: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-fd4c-61f4-83b2-64a16d629d05/raw?se=2025-05-20T18%3A41%3A59Z&sp=r&sv=2024-08-04&sr=b&scid=314a36ed-d8fb-529b-bdd3-cc1e6185b8cf&skoid=82a3371f-2f6c-4f81-8a78-2701b362559b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-20T04%3A08%3A15Z&ske=2025-05-21T04%3A08%3A15Z&sks=b&skv=2024-08-04&sig=nEmqIeV5LfbNpGk6%2Bezm4sxiHY5tx5yZePGTMc75CeI%3D",
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
    image: "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-22a0-6246-9307-57162e79d559/raw?se=2025-05-20T19%3A32%3A32Z&sp=r&sv=2024-08-04&sr=b&scid=90105bfc-ce4b-5ceb-bb3f-5dbef677a655&skoid=82a3371f-2f6c-4f81-8a78-2701b362559b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-20T00%3A30%3A21Z&ske=2025-05-21T00%3A30%3A21Z&sks=b&skv=2024-08-04&sig=aYz3lU9H6Wlzn8xTy3ticcrdFebACRfLgmV69y/EjXU%3D",
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