'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Ruler, Info, Users } from 'lucide-react'

export default function SizeGuidePage() {
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
            Size Guide
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive sizing guide for Haybah Collections abayas
          </p>
        </motion.div>

        {/* Size Chart */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <Ruler className="w-8 h-8 text-brand-gold mr-3" />
            <h2 className="text-2xl font-serif text-brand-dark">Abaya Size Chart</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-brand-gold">
                  <th className="text-left py-3 px-4 font-semibold text-brand-dark">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-dark">UK Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-dark">Height</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-dark">Bust (inches)</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-dark">Length (inches)</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-dark">Sleeve (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-brand-cream/20">
                  <td className="py-3 px-4 font-medium text-brand-maroon">50</td>
                  <td className="py-3 px-4">6-8</td>
                  <td className="py-3 px-4 font-medium text-brand-gold">5'0"</td>
                  <td className="py-3 px-4">34-36</td>
                  <td className="py-3 px-4">54</td>
                  <td className="py-3 px-4">24</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-brand-cream/20">
                  <td className="py-3 px-4 font-medium text-brand-maroon">52</td>
                  <td className="py-3 px-4">10-12</td>
                  <td className="py-3 px-4 font-medium text-brand-gold">5'2"</td>
                  <td className="py-3 px-4">38-40</td>
                  <td className="py-3 px-4">55</td>
                  <td className="py-3 px-4">24.5</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-brand-cream/20">
                  <td className="py-3 px-4 font-medium text-brand-maroon">54</td>
                  <td className="py-3 px-4">14-16</td>
                  <td className="py-3 px-4 font-medium text-brand-gold">5'4"</td>
                  <td className="py-3 px-4">42-44</td>
                  <td className="py-3 px-4">56</td>
                  <td className="py-3 px-4">25</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-brand-cream/20">
                  <td className="py-3 px-4 font-medium text-brand-maroon">56</td>
                  <td className="py-3 px-4">18-20</td>
                  <td className="py-3 px-4 font-medium text-brand-gold">5'6"</td>
                  <td className="py-3 px-4">46-48</td>
                  <td className="py-3 px-4">57</td>
                  <td className="py-3 px-4">25.5</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-brand-cream/20">
                  <td className="py-3 px-4 font-medium text-brand-maroon">58</td>
                  <td className="py-3 px-4">22-24</td>
                  <td className="py-3 px-4 font-medium text-brand-gold">5'8"</td>
                  <td className="py-3 px-4">50-52</td>
                  <td className="py-3 px-4">58</td>
                  <td className="py-3 px-4">26</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-brand-cream/20">
                  <td className="py-3 px-4 font-medium text-brand-maroon">60</td>
                  <td className="py-3 px-4">26-28</td>
                  <td className="py-3 px-4 font-medium text-brand-gold">6'0"</td>
                  <td className="py-3 px-4">54-56</td>
                  <td className="py-3 px-4">59</td>
                  <td className="py-3 px-4">26.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* How to Measure */}
        <motion.div
          className="bg-white rounded-lg shadow-elegant p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <Info className="w-8 h-8 text-brand-gold mr-3" />
            <h3 className="text-2xl font-serif text-brand-dark">How to Measure</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-brand-dark mb-3">Bust Measurement</h4>
              <p className="text-gray-600 mb-4">
                Measure around the fullest part of your bust, keeping the tape measure parallel to the floor.
              </p>
              <div className="bg-brand-cream/30 p-4 rounded-lg">
                <p className="text-sm text-brand-maroon font-medium">
                  💡 Tip: Wear a well-fitted bra when measuring
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-brand-dark mb-3">Length Preference</h4>
              <p className="text-gray-600 mb-4">
                Our abayas are designed to fall to ankle length. Consider your height when choosing a size.
              </p>
              <div className="bg-brand-cream/30 p-4 rounded-lg">
                <p className="text-sm text-brand-maroon font-medium">
                  💡 Tip: Most customers prefer 2-3 inches above the floor
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-brand-dark mb-3">Fit Preference</h4>
              <p className="text-gray-600 mb-4">
                Abayas are designed for a modest, comfortable fit with room for movement.
              </p>
              <div className="bg-brand-cream/30 p-4 rounded-lg">
                <p className="text-sm text-brand-maroon font-medium">
                  💡 Tip: When in doubt, size up for comfort
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fit Guide */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-brand-gold mr-3" />
              <h3 className="text-xl font-serif text-brand-dark">Different Body Types</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-brand-dark">Petite (5'0" - 5'2")</h5>
                <p className="text-gray-600 text-sm">Sizes 50-52 for proportional length</p>
              </div>
              <div>
                <h5 className="font-medium text-brand-dark">Average (5'4" - 5'6")</h5>
                <p className="text-gray-600 text-sm">Sizes 54-56 work perfectly</p>
              </div>
              <div>
                <h5 className="font-medium text-brand-dark">Tall (5'8" - 6'0")</h5>
                <p className="text-gray-600 text-sm">Sizes 58-60 provide optimal length</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-elegant p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-serif text-brand-dark mb-6">Fabric Considerations</h3>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-brand-dark">Chiffon & Lightweight</h5>
                <p className="text-gray-600 text-sm">Flows beautifully - true to size recommended</p>
              </div>
              <div>
                <h5 className="font-medium text-brand-dark">Silk & Structured</h5>
                <p className="text-gray-600 text-sm">More fitted - consider sizing up if between sizes</p>
              </div>
              <div>
                <h5 className="font-medium text-brand-dark">Jersey & Stretch</h5>
                <p className="text-gray-600 text-sm">Comfortable fit - true to size works well</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Still Unsure Section */}
        <motion.div
          className="text-center p-8 bg-brand-maroon text-white rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-serif mb-4">Still Unsure About Sizing?</h3>
          <p className="mb-6">
            Our customer service team is here to help you find the perfect fit. 
            Send us your measurements and we'll recommend the best size for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-brand-gold text-brand-dark px-8 py-3 rounded-full font-medium hover:bg-white transition-colors"
            >
              Get Sizing Help
            </Link>
            <Link
              href="/returns"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-brand-maroon transition-colors"
            >
              View Return Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
