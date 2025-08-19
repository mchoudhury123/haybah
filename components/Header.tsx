'use client'

import { motion } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '../lib/cart'
import CartPanel from './CartPanel'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items, getItemCount } = useCartStore()
  const itemCount = getItemCount()

  return (
    <header className="bg-white shadow-elegant sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="/" className="flex items-center">
              <div className="hidden sm:block">
                <h1 className="text-xl font-serif text-brand-maroon">Haybah Collections</h1>
                <p className="text-xs text-brand-dark">Luxury Abayas & Islamic Fashion</p>
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <motion.a
              href="/"
              className="text-brand-dark hover:text-brand-maroon transition-colors font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Home
            </motion.a>

            <motion.a
              href="/shop"
              className="text-brand-dark hover:text-brand-maroon transition-colors font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Shop
            </motion.a>
            <motion.a
              href="/about"
              className="text-brand-dark hover:text-brand-maroon transition-colors font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              About
            </motion.a>
            <motion.a
              href="/contact"
              className="text-brand-dark hover:text-brand-maroon transition-colors font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contact
            </motion.a>
          </nav>

          {/* Right side actions */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-brand-dark hover:text-brand-maroon transition-colors"
            >
              <ShoppingBag size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>


            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-brand-dark hover:text-brand-maroon transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="py-4 space-y-3">
              <a
                href="/"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>

              <a
                href="/shop"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </a>
              <a
                href="/about"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="block py-2 text-brand-dark hover:text-brand-maroon transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>

            </nav>
          </motion.div>
        )}

        {/* Cart Slide-in Panel */}
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <CartPanel onClose={() => setIsCartOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </header>
  )
} 