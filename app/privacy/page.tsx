'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react'

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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

        {/* Information We Collect */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <Eye className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">Information We Collect</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Personal Information</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Name and contact details (email, phone, address)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Payment information (processed securely by Stripe)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Order history and preferences
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Communication preferences
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Technical Information</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Device information and IP address
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Browser type and version
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Pages visited and time spent
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Cookies and similar technologies
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* How We Use Information */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <Database className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">How We Use Your Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Order Processing</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Process and fulfill your orders</li>
                <li>• Send order confirmations and updates</li>
                <li>• Handle returns and customer service</li>
                <li>• Process payments securely</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Communication</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Respond to your inquiries</li>
                <li>• Send important service updates</li>
                <li>• Provide customer support</li>
                <li>• Send marketing communications (with consent)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Data Protection */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <Lock className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">How We Protect Your Data</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Security Measures</h3>
              <p className="text-gray-600">
                We implement industry-standard security measures including SSL encryption, secure payment processing, 
                and regular security audits to protect your personal information.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Data Retention</h3>
              <p className="text-gray-600">
                We retain your personal information only for as long as necessary to provide our services, 
                comply with legal obligations, and resolve disputes.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">Third-Party Services</h3>
              <p className="text-gray-600">
                We use trusted third-party services like Stripe for payments and Sanity for content management. 
                These services have their own privacy policies and security measures.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Your Rights */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">Your Rights</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Access & Control</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Access your personal information</li>
                <li>• Update or correct your data</li>
                <li>• Request deletion of your data</li>
                <li>• Opt-out of marketing communications</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Contact Us</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or want to exercise your rights, 
                please contact us:
              </p>
              <div className="bg-brand-cream/30 p-4 rounded-lg">
                <p className="text-sm text-brand-maroon font-medium">
                  📧 Email: privacy@haybahcollections.co.uk
                </p>
                <p className="text-sm text-brand-maroon font-medium mt-2">
                  📍 Address: [Your Business Address]
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center p-8 bg-brand-maroon text-white rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-serif mb-4">Questions About Privacy?</h3>
          <p className="mb-6">
            We're committed to transparency and protecting your privacy. 
            Contact us if you need any clarification.
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
