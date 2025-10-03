'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-md mx-auto px-4"
      >
        <div className="space-y-4">
          <h1 className="text-6xl text-brand-maroon">404</h1>
          <h2 className="text-2xl font-playfair font-bold text-brand-maroon">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            Sorry, the product you're looking for doesn't exist or has been removed.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full bg-brand-maroon hover:bg-brand-maroon/90">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white">
            <Link href="/shop">
              Browse All Products
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

