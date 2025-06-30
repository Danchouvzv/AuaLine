import { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import EcoImpact from "@/components/impact/EcoImpact";
import PollutionAlert from "@/components/sections/PollutionAlert";
import ShopPreview from "@/components/shop/ShopPreview";
import Swatches from "@/components/sections/Swatches";
import BlogPreview from "@/components/blog/BlogPreview";
import Testimonials from "@/components/sections/Testimonials";
import AboutPreview from "@/components/sections/AboutPreview";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "AuaLine - Air-to-Ink Marketplace",
  description:
    "Transforming air pollution into eco-friendly ink products. Breathe innovation, print sustainably.",
};

// This would come from Firestore in a real implementation
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AuaLine",
  url: "https://aualine.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://aualine.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <Hero />
      
      {/* What We Do Section */}
      <WhatWeDo />
      
      {/* Pollution Alert Section */}
      <PollutionAlert />
      
      {/* Eco Impact Calculator Preview */}
      <EcoImpact />
      
      {/* Shop Preview */}
      <ShopPreview />
      
      {/* Color Swatches */}
      <Swatches />
      
      {/* Blog Preview */}
      <BlogPreview />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* About Us Preview */}
      <AboutPreview />
      
      {/* CTA Banner */}
      <CtaBanner />
    </>
  );
}
