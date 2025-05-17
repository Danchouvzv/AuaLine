"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import BlogCard from "./BlogCard";

// Mock data - would come from Firebase in real implementation
const blogPosts = [
  {
    id: "turning-pollution-into-ink",
    title: "Turning Air Pollution into Premium Ink: Our Process",
    excerpt: "A deep dive into our proprietary technology that captures air pollutants and transforms them into vibrant, eco-friendly inks.",
    image: "/images/blog/process.jpg", // Placeholder
    date: "2023-11-15",
    readTime: 8,
    author: {
      name: "Dr. Emma Chen",
      avatar: "/images/team/emma.jpg",
    },
    tags: ["Innovation", "Process", "Sustainability"],
  },
  {
    id: "artist-spotlight-maria",
    title: "Artist Spotlight: Maria's Urban Landscapes with Air Ink",
    excerpt: "Featuring the work of Maria Gonzalez, who creates stunning cityscapes using our Carbon Black and Sky Blue inks.",
    image: "/images/blog/maria.jpg", // Placeholder
    date: "2023-10-28",
    readTime: 6,
    author: {
      name: "Alex Thompson",
      avatar: "/images/team/alex.jpg",
    },
    tags: ["Artists", "Showcase", "Urban Art"],
  },
  {
    id: "environmental-impact-report",
    title: "2023 Environmental Impact Report: 5 Tons of CO₂ Captured",
    excerpt: "Our annual environmental impact report detailing how our ink production has helped reduce carbon emissions and air pollution.",
    image: "/images/blog/report.jpg", // Placeholder
    date: "2023-09-14",
    readTime: 12,
    author: {
      name: "Dr. James Wong",
      avatar: "/images/team/james.jpg",
    },
    tags: ["Report", "Eco Impact", "Data"],
  },
  {
    id: "sustainable-art-supplies",
    title: "The Complete Guide to Sustainable Art Supplies",
    excerpt: "A comprehensive guide to eco-friendly art supplies, including our air-to-ink products and other sustainable options.",
    image: "/images/blog/supplies.jpg", // Placeholder
    date: "2023-08-22",
    readTime: 10,
    author: {
      name: "Sophia Miller",
      avatar: "/images/team/sophia.jpg",
    },
    tags: ["Guide", "Eco Friendly", "Art Supplies"],
  },
];

// All available tags for filtering
const allTags = Array.from(
  new Set(blogPosts.flatMap((post) => post.tags))
).sort();

const BlogPreview = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Filter posts based on selected tag
  const filteredPosts = activeTag
    ? blogPosts.filter((post) => post.tags.includes(activeTag))
    : blogPosts;

  return (
    <section id="blog-preview" className="section-space bg-white dark:bg-carbon-black">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stories, tips, and insights from the world of eco-friendly art
            </p>
          </div>
          
          {/* Tag Filters */}
          <div className="mt-6 md:mt-0 overflow-x-auto flex items-center space-x-2 pb-2 max-w-full">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeTag === null
                  ? "bg-ink-blue text-white dark:bg-solar-yellow dark:text-ink-blue"
                  : "bg-gray-100 dark:bg-ink-blue/30 hover:bg-gray-200 dark:hover:bg-ink-blue/50"
              }`}
            >
              All
            </button>
            
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeTag === tag
                    ? "bg-ink-blue text-white dark:bg-solar-yellow dark:text-ink-blue"
                    : "bg-gray-100 dark:bg-ink-blue/30 hover:bg-gray-200 dark:hover:bg-ink-blue/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPosts.slice(0, 4).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-lg font-medium text-ink-blue dark:text-solar-yellow hover:underline"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview; 