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
    // Keep optimized for production
    unoptimized: false,
  },
  
  // Production configuration
  trailingSlash: true,
  
  // Redirect non-www to www version
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'haybahcollections.co.uk',
          },
        ],
        destination: 'https://www.haybahcollections.co.uk/:path*',
        permanent: true,
      },
    ]
  },
  
  // Remove deprecated experimental feature
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
}

module.exports = nextConfig 