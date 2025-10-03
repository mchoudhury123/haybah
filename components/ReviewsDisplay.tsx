'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface Review {
  _id: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
  approvedAt?: string
}

interface ReviewsDisplayProps {
  productSlug: string
  onReviewSubmitted?: () => void
}

export default function ReviewsDisplay({ productSlug, onReviewSubmitted }: ReviewsDisplayProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [productSlug])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Add a cache-busting parameter to prevent caching
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/reviews/${productSlug}?t=${timestamp}`, {
        // Add cache control headers to the request
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setReviews(result.reviews)
      } else {
        setError(result.error || 'Failed to load reviews')
      }
    } catch (error) {
      setError('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = starValue <= rating
      
      return (
        <Star
          key={starValue}
          className={`w-4 h-4 ${
            isFilled 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      )
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-elegant p-6">
        <h3 className="text-xl font-serif text-brand-maroon mb-4">Customer Reviews</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-maroon mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-elegant p-6">
        <h3 className="text-xl font-serif text-brand-maroon mb-4">Customer Reviews</h3>
        <div className="text-center py-8">
          <p className="text-red-600">Error loading reviews: {error}</p>
          <button 
            onClick={fetchReviews}
            className="mt-2 text-brand-maroon hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6">
      <h3 className="text-xl font-serif text-brand-maroon mb-4">Customer Reviews</h3>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Rating */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex gap-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {averageRating.toFixed(1)} out of 5
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refresh Button - Always visible */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            // Force a hard refresh of reviews by clearing cache first
            fetch('/api/reviews/clear-cache').then(() => {
              fetchReviews();
            });
          }}
          className="text-sm text-brand-maroon hover:underline flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
          </svg>
          Refresh reviews
        </button>
      </div>
    </div>
  )
}
