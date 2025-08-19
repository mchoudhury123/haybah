'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import emailjs from '@emailjs/browser'

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY") // You'll replace this with your actual public key
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'haybahcollections@outlook.com'
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        'YOUR_SERVICE_ID', // You'll replace this with your actual service ID
        'YOUR_TEMPLATE_ID', // You'll replace this with your actual template ID
        templateParams
      )

      if (result.status === 200) {
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitStatus('success')
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us a message anytime',
      value: 'We\'ll get back to you within 24 hours'
    },
    {
      icon: Phone,
      title: 'Response Time',
      description: 'Quick and helpful support',
      value: 'Usually within 2-4 hours during business hours'
    },
    {
      icon: MapPin,
      title: 'Service Area',
      description: 'Serving customers in the UK',
      value: 'Currently shipping within the UK only'
    }
  ]

  const subjectOptions = [
    'General Inquiry',
    'Product Information',
    'Order Status',
    'Size & Fit Questions',
    'Custom Orders',
    'Wholesale Inquiry',
    'Customer Support',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-peach">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-serif text-brand-maroon mb-6">
              Contact Us
            </h1>
            <p className="text-xl lg:text-2xl text-brand-dark max-w-4xl mx-auto leading-relaxed">
              We'd love to hear from you! Get in touch with any questions about our collections, orders, or anything else.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif text-brand-maroon mb-8">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-dark mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again or contact us directly.</span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif text-brand-maroon mb-8">
                  Get in Touch
                </h2>
                <p className="text-lg text-brand-dark leading-relaxed mb-8">
                  We're here to help with any questions about our modest fashion collections, orders, or anything else you'd like to know about Haybah Collections.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-brand-maroon/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-brand-maroon" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-maroon mb-1">{info.title}</h3>
                      <p className="text-brand-dark mb-1">{info.description}</p>
                      <p className="text-sm text-gray-600">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-brand-peach to-brand-cream rounded-2xl p-6">
                <h3 className="text-xl font-serif text-brand-maroon mb-4">What to Expect</h3>
                <ul className="space-y-2 text-brand-dark">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-brand-maroon rounded-full mt-2 flex-shrink-0"></span>
                    <span>Quick response within 2-4 hours during business hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-brand-maroon rounded-full mt-2 flex-shrink-0"></span>
                    <span>Personalized assistance for all your inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-brand-maroon rounded-full mt-2 flex-shrink-0"></span>
                    <span>Expert advice on sizing, styling, and collections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-brand-maroon rounded-full mt-2 flex-shrink-0"></span>
                    <span>Support for both individual and wholesale customers</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-brand-cream to-brand-peach">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-brand-dark max-w-3xl mx-auto">
              Quick answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping typically takes 3-5 business days within the UK. We currently only ship to UK addresses."
              },
              {
                question: "Do you offer custom sizing?",
                answer: "We don't currently offer custom sizing, but we're working on expanding our size range. All our Abayas come in standard UK sizes."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unworn items in original condition."
              },
              {
                question: "Do you ship internationally?",
                answer: "Currently, we only ship within the UK. We're working on expanding our shipping options in the future."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-elegant"
              >
                <h3 className="text-lg font-semibold text-brand-maroon mb-3">{faq.question}</h3>
                <p className="text-brand-dark leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-6">
              We're Here to Help
            </h2>
            <p className="text-xl text-brand-dark max-w-3xl mx-auto mb-12 leading-relaxed">
              Can't find what you're looking for? Don't hesitate to reach out. Our team is dedicated to providing you with the best possible service and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                Browse Collections
              </a>
              <a
                href="/"
                className="btn-secondary text-lg px-8 py-4 inline-block"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
