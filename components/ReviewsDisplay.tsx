'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SanityReview } from '@/lib/sanity.queries'

interface ReviewsDisplayProps {
  reviews: SanityReview[]
  averageRating: number
  reviewCount: number
}

export default function ReviewsDisplay({ reviews, averageRating, reviewCount }: ReviewsDisplayProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= rating ? 'text-brand-gold' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )

  if (reviewCount === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-brand-maroon/20">
        <CardHeader>
          <CardTitle className="text-brand-maroon font-playfair text-xl">
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-brand-maroon/20">
      <CardHeader>
        <CardTitle className="text-brand-maroon font-playfair text-xl">
          Customer Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Average Rating Summary */}
        <div className="text-center py-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold text-brand-maroon">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-500">/ 5</span>
          </div>
          <StarRating rating={Math.round(averageRating)} />
          <p className="text-gray-600 mt-2">
            Based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Recent Reviews */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Recent Reviews</h3>
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-l-4 border-brand-gold/30 pl-4 py-2"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-500">
                    by {review.name}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>

        {reviewCount > 3 && (
          <p className="text-center text-sm text-gray-500 pt-2">
            Showing 3 of {reviewCount} reviews
          </p>
        )}
      </CardContent>
    </Card>
  )
}
