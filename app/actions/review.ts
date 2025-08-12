'use server'

import { client } from '@/lib/sanity'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

interface ReviewData {
  productId: string
  name: string
  rating: number
  comment: string
}

export async function submitReview(data: ReviewData) {
  try {
    // Rate limiting: Check if user has submitted a review in the last hour
    const cookieStore = cookies()
    const rateLimitKey = `review_rate_limit_${data.productId}`
    const lastReviewTime = cookieStore.get(rateLimitKey)?.value
    
    if (lastReviewTime) {
      const timeDiff = Date.now() - parseInt(lastReviewTime)
      if (timeDiff < 60 * 60 * 1000) { // 1 hour
        return { success: false, error: 'Please wait at least 1 hour between reviews' }
      }
    }

    // Basic spam protection: Check comment length and content
    if (data.comment.length < 10 || data.comment.length > 500) {
      return { success: false, error: 'Comment must be between 10 and 500 characters' }
    }

    // Check for suspicious patterns (basic spam detection)
    const suspiciousPatterns = [
      /http[s]?:\/\//i, // URLs
      /[A-Z]{10,}/, // Excessive caps
      /[!@#$%^&*]{5,}/, // Excessive special characters
      /(.)\1{5,}/, // Repeated characters
    ]

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(data.comment)) {
        return { success: false, error: 'Comment contains suspicious content' }
      }
    }

    // Create review in Sanity
    const review = await client.create({
      _type: 'review',
      productRef: {
        _type: 'reference',
        _ref: data.productId
      },
      name: data.name.trim(),
      rating: data.rating,
      comment: data.comment.trim(),
      isApproved: false, // Requires admin approval
      createdAt: new Date().toISOString()
    })

    // Set rate limit cookie (1 hour)
    cookieStore.set(rateLimitKey, Date.now().toString(), {
      maxAge: 60 * 60, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    // Revalidate the product page
    revalidatePath(`/product/${data.productId}`)

    return { success: true, reviewId: review._id }
  } catch (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: 'Failed to submit review. Please try again.' }
  }
}
