/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'aualine.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    dirs: ['src']
  },
  transpilePackages: ['undici', 'firebase'],
  webpack: (config) => {
    // Fix for undici syntax error
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': false,
    };
    return config;
  },
};

module.exports = nextConfig; 