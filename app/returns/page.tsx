'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white">
      <div className="container-custom py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center text-brand-maroon hover:text-brand-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We want you to love your Haybah Collections pieces. Here's our hassle-free returns policy.
          </p>
        </motion.div>

        {/* Return Policy Overview */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <RotateCcw className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">30-Day Return Policy</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            We offer a <strong>30-day return policy</strong> from the date of delivery. 
            Items must be in their original condition with tags attached and in original packaging.
          </p>
        </motion.div>

        {/* What Can/Cannot Be Returned */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-serif text-brand-dark">Returnable Items</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Unworn abayas with original tags
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Items in original packaging
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Accessories (scarves, belts) in new condition
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Items purchased within the last 30 days
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <XCircle className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-xl font-serif text-brand-dark">Non-Returnable Items</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Worn or altered items
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Items without original tags
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Custom or personalized items
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Items purchased over 30 days ago
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Return Process */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-serif text-brand-dark mb-6">How to Return an Item</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-brand-dark mb-2">Contact Us</h4>
              <p className="text-gray-600 text-sm">
                Email us with your order number and reason for return
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-brand-dark mb-2">Package Item</h4>
              <p className="text-gray-600 text-sm">
                Pack the item in original packaging with tags attached
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-brand-dark mb-2">Send Back</h4>
              <p className="text-gray-600 text-sm">
                Use our prepaid return label and drop off at any post office
              </p>
            </div>
          </div>
        </motion.div>

        {/* Refund Information */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <AlertCircle className="w-8 h-8 text-brand-gold mr-3" />
            <h3 className="text-2xl font-serif text-brand-dark">Refund Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-brand-dark mb-3">Processing Time</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Refunds processed within 3-5 business days</li>
                <li>• Bank processing may take additional 3-7 days</li>
                <li>• Email confirmation sent when refund is processed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-dark mb-3">Refund Method</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Refunded to original payment method</li>
                <li>• Store credit available upon request</li>
                <li>• Original shipping costs not refunded (unless our error)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center p-8 bg-brand-maroon text-white rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3 className="text-2xl font-serif mb-4">Need to Start a Return?</h3>
          <p className="mb-6">
            Contact our customer service team to begin your return process.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-gold text-brand-dark px-8 py-3 rounded-full font-medium hover:bg-white transition-colors"
          >
            Contact Customer Service
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
