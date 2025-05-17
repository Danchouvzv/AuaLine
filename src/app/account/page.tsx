"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, ShoppingBag, Heart, 
  Edit, Camera, ArrowRight, 
  Award, TrendingUp, Check, Sparkles,
  Droplet, Leaf, CloudSun
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Extended user type with additional profile fields
interface ExtendedUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  bio?: string;
  location?: string;
}

// Form event types
interface FormInputEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}
interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [ecoScore, setEcoScore] = useState(78);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    location: ''
  });
  
  // Sample user data - in a real app, this would come from your backend
  const userStats = {
    ordersCount: 7,
    wishlistCount: 12,
    totalSaved: 28.5, // kg of CO2
    memberSince: 'April 2023',
    ecoAchievements: [
      { id: 1, name: 'First Purchase', description: 'Made your first eco-friendly purchase', completed: true, icon: Droplet },
      { id: 2, name: 'Eco Pioneer', description: 'Saved 10kg of CO2 through your purchases', completed: true, icon: Leaf },
      { id: 3, name: 'Community Supporter', description: 'Referred 3 friends to join AuaLine', completed: false, icon: CloudSun },
      { id: 4, name: 'Collection Explorer', description: 'Purchased items from all product categories', completed: false, icon: Sparkles },
    ]
  };

  // Mock recent activity
  const recentActivity = [
    { id: 1, type: 'purchase', description: 'You purchased Eco-Leaf Green ink', date: '2 days ago', image: '/images/products/eco-leaf.png' },
    { id: 2, type: 'saved', description: 'You saved 2.4kg of CO2 emissions', date: '1 week ago', image: null },
    { id: 3, type: 'wishlist', description: 'Added Bamboo Drawing Pen to wishlist', date: '2 weeks ago', image: '/images/products/pen.png' },
  ];

  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      // Get extended user data from backend/localStorage or use defaults
      const extendedUser: ExtendedUser = {
        ...user,
        bio: localStorage.getItem(`user_${user.uid}_bio`) || 'Eco-enthusiast and artist passionate about sustainable art supplies.',
        location: localStorage.getItem(`user_${user.uid}_location`) || 'Almaty, Kazakhstan'
      };
      
      setFormData({
        displayName: extendedUser.displayName || '',
        bio: extendedUser.bio || '',
        location: extendedUser.location || ''
      });
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  // If still loading or no user, show loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-eco-leaf animate-spin"></div>
      </div>
    );
  }

  // Handle form input changes
  const handleInputChange = (e: FormInputEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    // In a real app, you would update the user profile in your backend
    console.log('Profile update:', formData);
    
    // Save to localStorage for demo purposes
    if (user.uid) {
      localStorage.setItem(`user_${user.uid}_bio`, formData.bio);
      localStorage.setItem(`user_${user.uid}_location`, formData.location);
    }
    
    setShowEditForm(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white dark:bg-carbon-black">
      <div className="container mx-auto px-4">
        {/* Profile header with background pattern */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          {/* Wavy pattern background */}
          <div className="h-48 bg-gradient-to-r from-eco-leaf via-sky-blue to-eco-leaf relative">
            <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 C240,110 480,0 720,50 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="white" className="dark:fill-carbon-black"/>
            </svg>
            
            {/* Animated ink splashes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, 10, -5, 0],
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 px-6 py-4 -mt-16 md:-mt-12 relative z-10">
            {/* Profile image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-carbon-black overflow-hidden bg-gray-200 dark:bg-gray-800">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "User profile"}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-eco-leaf/20 text-eco-leaf text-4xl font-bold">
                    {formData.displayName ? formData.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U"}
                  </div>
                )}
                
                {/* Camera icon overlay */}
                <button className="absolute bottom-0 right-0 bg-eco-leaf text-white rounded-full p-2 shadow-md hover:bg-eco-leaf/90 transition">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formData.displayName || user.email?.split('@')[0] || "Eco Artist"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{formData.location}</p>
                </div>
                
                <button 
                  onClick={() => setShowEditForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-eco-leaf text-white rounded-md hover:bg-eco-leaf/90 transition"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
              
              <p className="mt-2 text-gray-700 dark:text-gray-300">{formData.bio}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="bg-eco-leaf/10 text-eco-leaf px-3 py-1 rounded-full text-sm">
                  Member since {userStats.memberSince}
                </div>
                <div className="bg-solar-yellow/10 text-solar-yellow px-3 py-1 rounded-full text-sm">
                  Eco Enthusiast
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit profile modal */}
        <AnimatePresence>
          {showEditForm && (
            <motion.div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white dark:bg-ink-blue/95 rounded-xl max-w-md w-full p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Edit Profile</h2>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowEditForm(false)}
                  >
                    <Leaf className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Display Name</label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-ink-blue/50"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-ink-blue/50"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-ink-blue/50"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowEditForm(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-eco-leaf text-white rounded-md hover:bg-eco-leaf/90"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Content tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-800">
            <nav className="flex overflow-x-auto hide-scrollbar">
              {["overview", "orders", "wishlist", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "border-eco-leaf text-eco-leaf"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area - changes based on active tab */}
          <div className="md:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Eco impact stats */}
                <section className="bg-white dark:bg-ink-blue/30 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Your Eco Impact</h2>
                  
                  <div className="flex items-center mb-6">
                    <div className="relative h-40 w-40 flex items-center justify-center">
                      {/* Circular progress background */}
                      <div className="absolute h-full w-full rounded-full border-8 border-gray-100 dark:border-gray-800"></div>
                      
                      {/* Circular progress fill */}
                      <svg className="absolute h-full w-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeDasharray={`${ecoScore * 2.89} 289`}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#28A745" />
                            <stop offset="100%" stopColor="#4DA8DA" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Center text */}
                      <div className="text-center z-10">
                        <span className="text-3xl font-bold">{ecoScore}</span>
                        <span className="text-sm block">Eco Score</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 ml-8">
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total CO₂ Saved</div>
                        <div className="text-2xl font-bold">{userStats.totalSaved}<span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">kg</span></div>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 h-1 mb-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-eco-leaf to-sky-blue rounded-full" 
                          style={{ width: `${Math.min(userStats.totalSaved * 2, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Next milestone: 50kg CO₂ saved
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-3">Eco Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userStats.ecoAchievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`flex items-start p-3 rounded-lg ${
                          achievement.completed 
                            ? 'bg-eco-leaf/10 border border-eco-leaf/20' 
                            : 'bg-gray-100 dark:bg-gray-800/50 border border-transparent'
                        }`}
                      >
                        <div className={`p-2 rounded-full mr-3 ${
                          achievement.completed 
                            ? 'bg-eco-leaf/20 text-eco-leaf' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}>
                          <achievement.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium flex items-center">
                            {achievement.name}
                            {achievement.completed && (
                              <Check className="h-4 w-4 text-eco-leaf ml-1" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Recent activity */}
                <section className="bg-white dark:bg-ink-blue/30 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                        <div className="w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                          {activity.image ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={activity.image}
                                alt={activity.description}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          ) : (
                            <Leaf className="h-6 w-6 text-eco-leaf" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-gray-100">{activity.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="text-sm text-eco-leaf hover:underline">View All Activity</button>
                  </div>
                </section>
              </>
            )}
            
            {activeTab === 'orders' && (
              <section className="bg-white dark:bg-ink-blue/30 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Your Orders</h2>
                {/* Orders content would go here */}
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your order history will appear here</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Explore our products and make your first eco-friendly purchase!</p>
                  <Link 
                    href="/shop" 
                    className="inline-flex items-center px-4 py-2 bg-eco-leaf text-white rounded-md hover:bg-eco-leaf/90 transition"
                  >
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}
            
            {activeTab === 'wishlist' && (
              <section className="bg-white dark:bg-ink-blue/30 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
                {/* Wishlist content would go here */}
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Save your favorite items to purchase later!</p>
                  <Link 
                    href="/shop" 
                    className="inline-flex items-center px-4 py-2 bg-eco-leaf text-white rounded-md hover:bg-eco-leaf/90 transition"
                  >
                    Discover Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}
            
            {activeTab === 'settings' && (
              <section className="bg-white dark:bg-ink-blue/30 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                {/* Settings content would go here */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Email Address</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">{user.email}</p>
                    <button className="text-sm text-eco-leaf hover:underline">Change Email</button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Password</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">••••••••••</p>
                    <button className="text-sm text-eco-leaf hover:underline">Change Password</button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded" defaultChecked />
                        <span>Email notifications about new products</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 h-4 w-4 text-eco-leaf focus:ring-eco-leaf border-gray-300 rounded" defaultChecked />
                        <span>Order status updates</span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="bg-white dark:bg-ink-blue/30 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link 
                  href="/shop" 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Shop Now</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/account/orders" 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>View Orders</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/account/wishlist" 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Wishlist</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/account/settings" 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Settings</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Recommendation */}
            <div className="bg-gradient-to-br from-eco-leaf/90 via-eco-leaf/80 to-sky-blue/90 text-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-3">Recommended for You</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="mb-3 aspect-square bg-white/20 rounded-md flex items-center justify-center">
                  <Image
                    src="/images/products/eco-leaf.png"
                    alt="Eco-Leaf Green"
                    width={120}
                    height={120}
                    className="mix-blend-darken"
                  />
                </div>
                <h4 className="font-medium">Eco-Leaf Green</h4>
                <p className="text-sm text-white/80 mb-2">Perfect match for your art style</p>
                <div className="text-lg font-bold mb-3">$24.99</div>
                <button className="w-full py-2 bg-white text-eco-leaf font-medium rounded-md hover:bg-white/90 transition-colors">
                  Add to Cart
                </button>
              </div>
              <div className="text-center">
                <Link href="/shop" className="text-sm hover:underline">View More Recommendations</Link>
              </div>
            </div>
            
            {/* Recent blog posts */}
            <div className="bg-white dark:bg-ink-blue/30 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">From Our Blog</h3>
              <div className="space-y-4">
                <Link 
                  href="/blog/air-pollution-solutions"
                  className="block group"
                >
                  <div className="text-sm font-medium group-hover:text-eco-leaf transition-colors mb-1">
                    Air Pollution Solutions in Almaty
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3 days ago</div>
                </Link>
                <Link 
                  href="/blog/sustainable-art-practices"
                  className="block group"
                >
                  <div className="text-sm font-medium group-hover:text-eco-leaf transition-colors mb-1">
                    Sustainable Art Practices for Beginners
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">1 week ago</div>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/blog" 
                  className="text-sm text-eco-leaf hover:underline"
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 