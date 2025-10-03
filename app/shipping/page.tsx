'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Truck, Clock, MapPin, Package } from 'lucide-react'

export default function ShippingPage() {
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
            Shipping Information
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our shipping policies and delivery options
          </p>
        </motion.div>

        {/* Shipping Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <Truck className="w-8 h-8 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-brand-dark">UK Delivery</h2>
            </div>
                          <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Standard UK Delivery (2-3 weeks)</span>
                  <span className="font-semibold text-brand-dark">£4.99</span>
                </div>
                <div className="p-3 bg-brand-cream rounded-lg">
                  <p className="text-sm text-brand-maroon">
                    <strong>Please note:</strong> All UK orders currently have a delivery time of 2-3 weeks due to high demand.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-gold font-medium">Free Delivery on orders over £75</span>
                    <span className="text-brand-gold font-semibold">FREE</span>
                  </div>
                </div>
              </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-brand-dark">International</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 font-medium mb-2">
                  We currently do not ship internationally
                </p>
                <p className="text-gray-600">
                  International shipping is planned for the future. We're working on expanding our delivery services to reach customers worldwide.
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  Sign up for our newsletter to be notified when international shipping becomes available.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Processing & Important Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <Clock className="w-8 h-8 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-brand-dark">Processing Time</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                All orders have an estimated delivery time of <strong>2-3 weeks</strong>.
              </p>
              <p className="text-gray-600">
                Orders placed after 2 PM on Friday will be processed on the following Monday.
              </p>
              <p className="text-gray-600">
                During peak seasons (Eid, Ramadan), processing may take additional time.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <Package className="w-8 h-8 text-brand-gold mr-3" />
              <h2 className="text-2xl font-serif text-brand-dark">Packaging</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                All items are carefully packaged in our signature Haybah Collections packaging.
              </p>
              <p className="text-gray-600">
                Delicate items like chiffon abayas are wrapped in tissue paper for extra protection.
              </p>
              <p className="text-gray-600">
                We use eco-friendly packaging materials wherever possible.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          className="text-center mt-12 p-8 bg-brand-maroon text-white rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-serif mb-4">Need Help with Your Order?</h3>
          <p className="mb-6">
            Our customer service team is here to help with any shipping questions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-gold text-brand-dark px-8 py-3 rounded-full font-medium hover:bg-white transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
