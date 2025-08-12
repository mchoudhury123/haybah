'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ShoppingBag, Home, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-playfair font-bold text-brand-maroon mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Your payment has been processed successfully and your order is being prepared.
            </p>
            {sessionId && (
              <p className="text-sm text-gray-500">
                Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{sessionId}</span>
              </p>
            )}
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-brand-maroon mb-4">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <Package className="w-8 h-8 text-brand-gold mb-2" />
                <span>Order Processing</span>
              </div>
              <div className="flex flex-col items-center">
                <ShoppingBag className="w-8 h-8 text-brand-gold mb-2" />
                <span>Quality Check</span>
              </div>
              <div className="flex flex-col items-center">
                <Package className="w-8 h-8 text-brand-gold mb-2" />
                <span>Shipping</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              className="bg-brand-maroon hover:bg-brand-maroon/90 text-white"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white"
            >
              <Link href="/collections">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Collections
              </Link>
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">
              You will receive an email confirmation shortly. If you have any questions, 
              please contact our customer support team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

