'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface ReviewFormProps {
  productId: string
  productSlug: string
  productName: string
  onSubmitSuccess?: () => void
}

export default function ReviewForm({ productId, productSlug, productName, onSubmitSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [customerName, setCustomerName] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setMessage({ type: 'error', text: 'Please select a rating' })
      return
    }

    if (customerName.trim().length < 2) {
      setMessage({ type: 'error', text: 'Please enter your name (minimum 2 characters)' })
      return
    }

    if (comment.trim().length < 10) {
      setMessage({ type: 'error', text: 'Please enter a comment (minimum 10 characters)' })
      return
    }

    try {
      setIsSubmitting(true)
      setMessage(null)

      const response = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          productSlug,
          customerName: customerName.trim(),
          rating,
          comment: comment.trim(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: result.message })
        // Reset form
        setRating(0)
        setCustomerName('')
        setComment('')
        // Call success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess()
        }
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit review' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = starValue <= (hoverRating || rating)
      
      return (
        <button
          key={starValue}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:ring-offset-2 rounded"
        >
          <Star
            className={`w-8 h-8 ${
              isFilled 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        </button>
      )
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6">
      <h3 className="text-xl font-serif text-brand-maroon mb-4">Write a Review</h3>
      <p className="text-gray-600 mb-6">Share your thoughts about {productName}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rating *
          </label>
          <div className="flex gap-2">
            {renderStars()}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              You selected {rating} star{rating !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
            placeholder="Enter your name"
            required
            minLength={2}
            maxLength={100}
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Comment *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
            placeholder="Share your experience with this product (10-500 characters)"
            required
            minLength={10}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">
              {comment.length}/500 characters
            </p>
            {comment.length < 10 && comment.length > 0 && (
              <p className="text-sm text-red-500">
                Minimum 10 characters required
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0 || customerName.trim().length < 2 || comment.trim().length < 10}
          className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting Review...
            </div>
          ) : (
            'Submit Review'
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Your review will be visible after admin approval
        </p>
      </form>
    </div>
  )
}
