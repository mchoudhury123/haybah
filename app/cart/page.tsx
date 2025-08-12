'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart'
import CartPanel from '@/components/CartPanel'
import { useState } from 'react'

export default function CartPage() {
  const { items, getTotal } = useCartStore()
  const total = getTotal()
  const [isCartOpen, setIsCartOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-brand-maroon hover:text-brand-maroon/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-playfair font-bold text-brand-maroon">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Review your items and proceed to checkout
          </p>
        </motion.div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-brand-maroon/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-brand-maroon" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <div className="space-x-4">
              <Button
                asChild
                className="bg-brand-maroon hover:bg-brand-maroon/90 text-white"
              >
                <Link href="/">
                  Continue Shopping
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white"
              >
                <Link href="/collections">
                  View Collections
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Summary ({items.length} items)
                </h2>
                <span className="text-2xl font-bold text-brand-maroon">
                  £{total.toFixed(2)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Shipping and taxes will be calculated at checkout
              </p>
            </div>

            {/* Cart Items Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items in your cart</h3>
              <div className="space-y-4">
                {items.slice(0, 3).map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-peach to-brand-cream flex items-center justify-center">
                          <span className="text-brand-maroon text-lg">👗</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        {item.size && (
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            Size: {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded capitalize">
                            {item.color}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Qty: {item.qty} × £{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {items.length > 3 && (
                  <div className="text-center py-4 text-gray-500">
                    +{items.length - 3} more items
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                onClick={() => setIsCartOpen(true)}
                className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-8 py-3 text-lg"
              >
                Manage Cart
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white px-8 py-3 text-lg"
              >
                <Link href="/collections">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Cart Panel Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <CartPanel onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

