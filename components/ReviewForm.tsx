'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'


interface ReviewFormProps {
  productId: string
  productName: string
}

export default function ReviewForm({ productId, productName }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setMessage({ type: 'error', text: 'Please select a rating' })
      return
    }

    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name' })
      return
    }

    if (!comment.trim()) {
      setMessage({ type: 'error', text: 'Please enter a comment' })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          name: name.trim(),
          rating,
          comment: comment.trim()
        })
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ type: 'success', text: 'Review submitted successfully! It will be visible after approval.' })
        setRating(0)
        setName('')
        setComment('')
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit review' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({ value, onChange, readonly = false }: { value: number; onChange?: (rating: number) => void; readonly?: boolean }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className={`text-2xl transition-colors ${
            star <= value
              ? 'text-brand-gold'
              : 'text-gray-300 hover:text-brand-gold/50'
          } ${!readonly ? 'cursor-pointer' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  )

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-brand-maroon/20">
      <CardHeader>
        <CardTitle className="text-brand-maroon font-playfair text-xl">
          Write a Review
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Share your thoughts about {productName}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Rating *</label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Your Name *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-brand-maroon focus:ring-offset-2"
              placeholder="Enter your name"
              maxLength={100}
              required
            />
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium text-gray-700">
              Comment *
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-brand-maroon focus:ring-offset-2 resize-none"
              placeholder="Share your experience with this product (10-500 characters)"
              maxLength={500}
              required
            />
            <div className="text-xs text-gray-500 text-right">
              {comment.length}/500 characters
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-md text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0 || !name.trim() || !comment.trim()}
            className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Reviews are moderated and will be visible after approval
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
