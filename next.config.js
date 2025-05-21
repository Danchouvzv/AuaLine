/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'aualine.com',
      'sdmntprukwest.oaiusercontent.com',
      'sdmntprnortheu.oaiusercontent.com',
      'sdmntpritalynorth.oaiusercontent.com',
      'i.pinimg.com'
    ],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pinterest.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
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
