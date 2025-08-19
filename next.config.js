/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is automatically enabled in Next.js 14
  
  // Configure image domains for Sanity
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    // Enable unoptimized images for local development
    unoptimized: true,
  },
  
  // Remove export output for local development
  // trailingSlash: false,
  // output: 'export',
  // distDir: 'out',
}

module.exports = nextConfig 