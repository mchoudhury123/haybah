'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCartStore, CartItem } from '../lib/cart'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const router = useRouter()
  const { items, remove, getTotal } = useCartStore()
  const total = getTotal()

  const handleCheckout = () => {
    console.log('Checkout clicked! Cart items:', items)
    console.log('Cart total:', total)
    onClose()
    router.push('/checkout')
  }

  const handleRemoveItem = (productId: string, variantId: string) => {
    remove(productId, variantId)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Cart panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-brand-dark">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${item.variantId}-${index}`}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {/* Product image placeholder */}
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-peach to-brand-cream rounded-lg flex items-center justify-center">
                        <span className="text-brand-maroon text-xl">👗</span>
                      </div>
                      
                      {/* Product info */}
                      <div className="flex-1">
                        <h3 className="font-medium text-brand-dark">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.color || 'N/A'} • Size {item.size || 'N/A'}</p>
                        <p className="text-brand-maroon font-semibold">£{item.price.toFixed(2)} × {item.qty}</p>
                      </div>
                      
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveItem(item.productId, item.variantId)}
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
            {items.length > 0 && (
              <motion.div
                className="border-t border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-brand-dark">Total:</span>
                  <span className="text-2xl font-bold text-brand-maroon">${total.toFixed(2)}</span>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={handleCheckout}
                    className="w-full btn-primary"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full btn-secondary"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 