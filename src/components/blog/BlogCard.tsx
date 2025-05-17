"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils/formatDate";

interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
  author: Author;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  // This would be a real date formatter in implementation
  const formattedDate = formatDate(post.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.id}`} className="group block">
        <div className="bg-white dark:bg-ink-blue/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[5/3] overflow-hidden bg-gray-200 dark:bg-ink-blue/40">
            {/* Placeholder colored background */}
            <div className="absolute inset-0 bg-soft-lilac dark:bg-soft-lilac/50 flex items-center justify-center text-white/80 font-bold text-2xl">
              BLOG
            </div>
            
            {/* In a real implementation, we would use next/image */}
            {/* <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            /> */}
            
            {/* Read time */}
            <div className="absolute top-2 right-2 bg-white/90 dark:bg-ink-blue/90 px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime} min read
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 flex-grow flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-ink-blue/40 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-400">
                  +{post.tags.length - 2} more
                </span>
              )}
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold mb-2 group-hover:text-sky-blue dark:group-hover:text-solar-yellow transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
            
            {/* Author & Date */}
            <div className="flex items-center mt-auto">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                  {/* Author avatar placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                    {post.author.name.charAt(0)}
                  </div>
                  
                  {/* In a real implementation, we would use next/image */}
                  {/* <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  /> */}
                </div>
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium">{post.author.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard; 