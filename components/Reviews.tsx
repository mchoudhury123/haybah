'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Review {
  id: number
  name: string
  rating: number
  review: string
  product: string
  date: string
  verified: boolean
}

interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
}

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(0)
  const [products, setProducts] = useState<SanityProduct[]>([])
  const reviewsPerPage = 3
  const totalPages = 2 // We have 6 reviews, so 2 pages

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    
    fetchProducts()
  }, [])

  // Create reviews with actual product names
  const reviews: Review[] = [
    {
      id: 1,
      name: "Fabiha",
      rating: 5,
      review: "Absolutely stunning! The embroidery is beautiful and the fabric feels so luxurious. Perfect fit and incredibly comfortable.",
      product: products[0]?.name || "",
      date: "2 weeks ago",
      verified: true
    },
    {
      id: 2,
      name: "Suha",
      rating: 5,
      review: "Love this abaya! The fabric is so soft and the cut is incredibly flattering. Perfect for everyday wear.",
      product: products[1]?.name || "",
      date: "1 month ago",
      verified: true
    },
    {
      id: 3,
      name: "Rumaisa",
      rating: 5,
      review: "Gorgeous design! The modern cut is perfect and the quality is outstanding. I feel so confident wearing it.",
      product: products[2]?.name || "",
      date: "3 weeks ago",
      verified: true
    },
    {
      id: 4,
      name: "Nilli",
      rating: 5,
      review: "Obsessed with this abaya! The fabric is divine and the beading is so delicate. Perfect for special occasions.",
      product: products[3]?.name || "",
      date: "1 week ago",
      verified: true
    },
    {
      id: 5,
      name: "Eshi",
      rating: 5,
      review: "Perfect for daily wear! So comfortable and breathable, yet still looks elegant. Great for the mosque and errands.",
      product: products[4]?.name || "",
      date: "2 months ago",
      verified: true
    },
    {
      id: 6,
      name: "Majeeda",
      rating: 5,
      review: "Exceptional craftsmanship! The attention to detail is remarkable. This has become my signature piece.",
      product: products[5]?.name || "",
      date: "3 weeks ago",
      verified: true
    }
  ]

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  )

  return (
    <section className="section-padding bg-gradient-to-br from-brand-cream to-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-mobile-responsive font-serif text-brand-dark mb-3 sm:mb-4">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-mobile-responsive text-gray-600 max-w-2xl mx-auto">
            Real experiences from women who have discovered the perfect blend of elegance, comfort, and modesty in our abaya collections.
          </p>
        </motion.div>

        {/* Reviews Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all duration-300 group"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all duration-300 group"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8">
            <AnimatePresence mode="wait">
              {currentReviews.map((review, index) => (
                <motion.div
                  key={`${currentPage}-${review.id}`}
                  className="bg-white rounded-lg shadow-elegant p-4 sm:p-6 h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Quote icon */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold opacity-60" />
                    {review.verified && (
                      <span className="text-xs bg-brand-gold text-white px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold fill-current" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow text-sm sm:text-base">
                    "{review.review}"
                  </p>

                  {/* Product name */}
                  <p className="text-xs sm:text-sm font-medium text-brand-maroon mb-2 sm:mb-3">
                    {review.product}
                  </p>

                  {/* Customer info */}
                  <div className="mt-auto">
                    <p className="font-semibold text-brand-dark text-sm sm:text-base">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center items-center space-x-2 mt-6 sm:mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-brand-gold scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-mobile-responsive text-gray-600 mb-4 sm:mb-6">
            Join thousands of satisfied customers who have found their perfect abaya
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold fill-current" />
                ))}
              </div>
              <span className="text-brand-dark font-medium text-sm sm:text-base">4.9/5</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-brand-dark font-medium text-sm sm:text-base">500+ Happy Customers</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
