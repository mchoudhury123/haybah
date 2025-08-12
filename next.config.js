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
  },
  
  // Netlify compatibility
  trailingSlash: false,
  output: 'export',
  distDir: 'out',
  

}

module.exports = nextConfig 