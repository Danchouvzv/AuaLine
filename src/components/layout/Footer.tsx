"use client";

import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail,
  PhoneCall,
  MapPin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Air Inks", href: "/shop?category=inks" },
        { name: "Accessories", href: "/shop?category=accessories" },
        { name: "Eco Paper", href: "/shop?category=paper" },
        { name: "New Arrivals", href: "/shop?collection=new" },
        { name: "Best Sellers", href: "/shop?collection=best-sellers" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/marketing/about" },
        { name: "Our Mission", href: "/marketing/about#mission" },
        { name: "Impact Calculator", href: "/marketing/impact" },
        { name: "Careers", href: "/marketing/about#careers" },
        { name: "Contact", href: "/marketing/about#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "FAQs", href: "/marketing/about#faq" },
        { name: "Shipping", href: "/marketing/about#shipping" },
        { name: "Returns", href: "/marketing/about#returns" },
        { name: "Privacy Policy", href: "/legal/privacy" },
      ],
    },
  ];

  // Mini color palette
  const colorSwatches = [
    { name: "Eco-Leaf", color: "bg-eco-leaf" },
    { name: "Ink-Blue", color: "bg-ink-blue" },
    { name: "Solar-Yellow", color: "bg-solar-yellow" },
    { name: "Coral-Red", color: "bg-coral-red" },
    { name: "Sky-Blue", color: "bg-sky-blue" },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-ink-blue pt-12 pb-6">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-ink-blue dark:text-solar-yellow">AuaLine</h2>
              <p className="text-sm text-sky-blue dark:text-soft-lilac">Air-to-Ink Revolution</p>
            </Link>
            <p className="mt-4 text-sm max-w-md">
              Transforming air pollution into sustainable ink products. Every purchase helps clean our air and reduces environmental impact.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-eco-leaf" />
                <a href="mailto:hello@aualine.com" className="hover:text-sky-blue dark:hover:text-solar-yellow transition-colors">
                  hello@aualine.com
                </a>
              </div>
              <div className="flex items-center text-sm">
                <PhoneCall className="h-4 w-4 mr-2 text-eco-leaf" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-eco-leaf" />
                <span>123 Eco Street, Green City, Earth</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-sky-blue dark:hover:text-solar-yellow transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mini Color Palette */}
        <div className="mt-12 mb-8">
          <h3 className="text-sm font-semibold mb-4">Our Colors</h3>
          <div className="flex space-x-4">
            {colorSwatches.map((swatch) => (
              <div key={swatch.name} className="text-center">
                <div
                  className={`${swatch.color} h-8 w-8 rounded-full mx-auto shadow-sm`}
                  title={swatch.name}
                ></div>
                <span className="text-xs mt-1 block">{swatch.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-sky-blue dark:text-gray-400 dark:hover:text-solar-yellow transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-sky-blue dark:text-gray-400 dark:hover:text-solar-yellow transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-sky-blue dark:text-gray-400 dark:hover:text-solar-yellow transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-500 hover:text-sky-blue dark:text-gray-400 dark:hover:text-solar-yellow transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} AuaLine. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 