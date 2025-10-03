'use client'

import { motion } from 'framer-motion'
import { X, Trash2, Minus, Plus, Loader2 } from 'lucide-react'
import { useCartStore } from '../lib/cart'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface CartPanelProps {
  onClose: () => void
}

export default function CartPanel({ onClose }: CartPanelProps) {
  const { items, remove, updateQty, getTotal, clear } = useCartStore()
  const total = getTotal()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Ensure hydration is complete before rendering cart state
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleUpdateQty = (productId: string, variantId: string, newQty: number) => {
    if (newQty <= 0) {
      remove(productId, variantId)
    } else {
      updateQty(productId, variantId, newQty)
    }
  }

  const handleCheckout = async () => {
    if (items.length === 0) return

    console.log('Checkout clicked! Cart items:', items)
    console.log('Cart total:', total)

    setIsCheckingOut(true)
    
    try {
      // Redirect to checkout page instead of calling API directly
      onClose()
      console.log('Redirecting to /checkout')
      window.location.href = '/checkout'
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Checkout failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-playfair font-bold text-brand-maroon">Shopping Cart</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-brand-maroon transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {!isHydrated ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-brand-maroon" />
            <p className="text-gray-500">Loading cart...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-brand-maroon/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-brand-maroon text-3xl">🛍️</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some beautiful Abayas to get started!</p>
            <Button
              onClick={onClose}
              className="bg-brand-maroon hover:bg-brand-maroon/90 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.variantId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                {/* Item Image */}
                <div className="relative w-16 h-20 bg-white rounded overflow-hidden flex-shrink-0">
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

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.size && (
                      <Badge variant="outline" className="text-xs">
                        Size: {item.size}
                      </Badge>
                    )}
                    {item.color && (
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.color}
                      </Badge>
                    )}
                  </div>
                  <p className="text-brand-maroon font-semibold mt-1">
                    £{item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQty(item.productId, item.variantId, item.qty - 1)}
                    className="p-1 text-gray-500 hover:text-brand-maroon transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                  <button
                    onClick={() => handleUpdateQty(item.productId, item.variantId, item.qty + 1)}
                    className="p-1 text-gray-500 hover:text-brand-maroon transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => remove(item.productId, item.variantId)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {isHydrated && items.length > 0 && (
        <div className="border-t border-gray-200 p-6 space-y-4">
          {/* Total */}
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-brand-maroon">£{total.toFixed(2)}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onClose}
              className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white"
            >
              Continue Shopping
            </Button>
            
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              variant="outline"
              className="w-full border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>

            <Button
              onClick={clear}
              variant="outline"
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
