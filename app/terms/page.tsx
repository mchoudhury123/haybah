'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, FileText, ShoppingBag, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our website and services.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          className="bg-brand-maroon text-white text-center p-6 rounded-lg mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="text-lg">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Acceptance of Terms */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">Acceptance of Terms</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            By accessing and using Haybah Collections website, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </motion.div>

        {/* Products & Services */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <ShoppingBag className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">Products & Services</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Product Descriptions</h3>
              <p className="text-gray-600">
                We strive to provide accurate product descriptions and images. However, actual colors and details 
                may vary slightly due to monitor settings and lighting conditions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Availability</h3>
              <p className="text-gray-600">
                All products are subject to availability. We reserve the right to discontinue any product at any time. 
                If an item becomes unavailable after your order, we will notify you promptly.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Pricing</h3>
              <p className="text-gray-600">
                All prices are in British Pounds (GBP) and include VAT where applicable. 
                We reserve the right to modify prices at any time without prior notice.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Orders & Payment */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <CreditCard className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">Orders & Payment</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Order Process</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Orders are confirmed via email
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Payment is processed securely through Stripe
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Orders are processed within 1-2 business days
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Shipping confirmation sent upon dispatch
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Payment Methods</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Credit/Debit cards (Visa, Mastercard, American Express)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Apple Pay and Google Pay
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Secure payment processing via Stripe
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  All transactions are encrypted and secure
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* User Obligations */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <CheckCircle className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">User Obligations</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Account Information</h3>
              <p className="text-gray-600">
                You are responsible for maintaining the confidentiality of your account information and for all 
                activities that occur under your account. You must provide accurate and complete information.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Prohibited Activities</h3>
              <p className="text-gray-600">
                You agree not to use our services for any unlawful purpose or to solicit others to perform 
                unlawful acts. You must not violate any international, federal, or state regulations.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Intellectual Property</h3>
              <p className="text-gray-600">
                All content on this website, including text, graphics, logos, and images, is the property of 
                Haybah Collections and is protected by copyright laws.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Limitation of Liability */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">Limitation of Liability</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">General Disclaimer</h3>
              <p className="text-gray-600">
                Haybah Collections shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of our services.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Maximum Liability</h3>
              <p className="text-gray-600">
                Our total liability to you for any claims arising from the use of our services shall not exceed 
                the amount you paid for the specific product or service in question.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Force Majeure</h3>
              <p className="text-gray-600">
                We shall not be liable for any failure to perform due to circumstances beyond our reasonable 
                control, including but not limited to natural disasters, government actions, or technical failures.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-2xl font-serif text-brand-dark mb-6">Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
            posting on our website. Your continued use of our services after any changes constitutes acceptance 
            of the new terms.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center p-8 bg-brand-maroon text-white rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-serif mb-4">Questions About Terms?</h3>
          <p className="mb-6">
            If you have any questions about these Terms of Service, 
            please don't hesitate to contact us.
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
