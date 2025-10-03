'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04 0z"/>
  </svg>
)

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
                <a 
                  href="https://www.instagram.com/haybahcollections" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-maroon rounded-full flex items-center justify-center hover:bg-brand-gold transition-all duration-300 group transform hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:text-brand-dark transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.tiktok.com/@haybahcollections" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-brand-maroon rounded-full flex items-center justify-center hover:bg-brand-gold transition-all duration-300 group transform hover:scale-110"
                  aria-label="Follow us on TikTok"
                >
                  <TikTokIcon className="w-5 h-5 text-white group-hover:text-brand-dark transition-colors duration-300" />
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
              <li><a href="/shop" className="text-gray-300 hover:text-brand-gold transition-colors">Shop All</a></li>
              <li><a href="/shop?collections=new-arrivals" className="text-gray-300 hover:text-brand-gold transition-colors">New Arrivals</a></li>
              <li><a href="/shop?collections=best-sellers" className="text-gray-300 hover:text-brand-gold transition-colors">Best Sellers</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-brand-gold transition-colors">About</a></li>
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
              <li><a href="/contact" className="text-gray-300 hover:text-brand-gold transition-colors">Contact Us</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-brand-gold transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-brand-gold transition-colors">Returns</a></li>
              <li><a href="/size-guide" className="text-gray-300 hover:text-brand-gold transition-colors">Size Guide</a></li>
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
              <a href="/privacy" className="text-gray-400 hover:text-brand-gold transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-brand-gold transition-colors">Terms of Service</a>
              <a href="/admin" className="text-gray-400 hover:text-brand-gold transition-colors opacity-0 hover:opacity-100" title="Admin Access">.</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 