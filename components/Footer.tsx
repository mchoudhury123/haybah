'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h3 className="text-3xl font-serif text-brand-gold mb-2">
                Haybah
              </h3>
              <p className="text-brand-peach text-sm">Collections</p>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Discover the finest collection of elegant Abayas and modest fashion. 
              Luxury comfort made for the modern woman who values both style and tradition.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-brand-gold font-medium">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-brand-maroon rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <span className="text-white">📱</span>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-maroon rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <span className="text-white">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-maroon rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <span className="text-white">🐦</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-brand-gold">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#shop" className="text-gray-300 hover:text-brand-gold transition-colors">Shop All</a></li>
              <li><a href="#new-arrivals" className="text-gray-300 hover:text-brand-gold transition-colors">New Arrivals</a></li>
              <li><a href="#best-sellers" className="text-gray-300 hover:text-brand-gold transition-colors">Best Sellers</a></li>
              <li><a href="#sale" className="text-gray-300 hover:text-brand-gold transition-colors">Sale</a></li>
            </ul>
          </motion.div>

          {/* Customer service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-brand-gold">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-gray-300 hover:text-brand-gold transition-colors">Contact Us</a></li>
              <li><a href="#shipping" className="text-gray-300 hover:text-brand-gold transition-colors">Shipping Info</a></li>
              <li><a href="#returns" className="text-gray-300 hover:text-brand-gold transition-colors">Returns</a></li>
              <li><a href="#size-guide" className="text-gray-300 hover:text-brand-gold transition-colors">Size Guide</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="border-t border-gray-700 pt-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Haybah Collections. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-brand-gold transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-brand-gold transition-colors">Terms of Service</a>
              <a href="/admin" className="text-gray-400 hover:text-brand-gold transition-colors opacity-0 hover:opacity-100" title="Admin Access">.</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 