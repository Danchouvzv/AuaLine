"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MegaMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const menuItems = [
    {
      name: "Shop",
      path: "/shop",
      submenu: [
        {
          title: "Categories",
          items: [
            { name: "Air Inks", path: "/shop?category=inks" },
            { name: "Accessories", path: "/shop?category=accessories" },
            { name: "Eco Paper", path: "/shop?category=paper" },
          ],
        },
        {
          title: "Collections",
          items: [
            { name: "New Arrivals", path: "/shop?collection=new" },
            { name: "Best Sellers", path: "/shop?collection=best-sellers" },
            { name: "Limited Edition", path: "/shop?collection=limited" },
          ],
        },
        {
          title: "Colors",
          items: [
            { name: "Eco-Leaf", path: "/colors#eco-leaf" },
            { name: "Carbon-Black", path: "/colors#carbon-black" },
            { name: "Sky-Blue", path: "/colors#sky-blue" },
            { name: "Coral-Red", path: "/colors#coral-red" },
            { name: "Solar-Yellow", path: "/colors#solar-yellow" },
          ],
        },
      ],
    },
    {
      name: "Blog",
      path: "/blog",
      submenu: [
        {
          title: "Topics",
          items: [
            { name: "Eco Innovation", path: "/blog?topic=eco-innovation" },
            { name: "Design Tips", path: "/blog?topic=design-tips" },
            { name: "Artist Spotlights", path: "/blog?topic=artists" },
            { name: "Environmental News", path: "/blog?topic=news" },
          ],
        },
      ],
    },
    {
      name: "About",
      path: "/marketing/about",
      submenu: null,
    },
    {
      name: "Impact",
      path: "/impact",
      submenu: null,
    },
  ];

  return (
    <div className="flex items-center space-x-8">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.path}
            className="flex items-center py-2 text-base font-medium hover:text-sky-blue dark:hover:text-solar-yellow transition-colors"
          >
            {item.name}
            {item.submenu && (
              <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 ease-in-out" />
            )}
          </Link>

          {/* Dropdown */}
          {item.submenu && (
            <AnimatePresence>
              {activeMenu === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 z-10 mt-2 w-screen max-w-md bg-white dark:bg-carbon-black shadow-lg rounded-md overflow-hidden"
                  style={{ width: "max-content", minWidth: "320px" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                    {item.submenu.map((submenu) => (
                      <div key={submenu.title}>
                        <h3 className="text-sm font-semibold text-ink-blue dark:text-solar-yellow mb-2">
                          {submenu.title}
                        </h3>
                        <ul className="space-y-2">
                          {submenu.items.map((subitem) => (
                            <li key={subitem.name}>
                              <Link
                                href={subitem.path}
                                className="text-sm hover:text-sky-blue dark:hover:text-solar-yellow transition-colors"
                              >
                                {subitem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </div>
  );
};

export default MegaMenu; 