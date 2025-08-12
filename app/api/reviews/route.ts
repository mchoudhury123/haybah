import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

interface ReviewData {
  productId: string
  name: string
  rating: number
  comment: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ReviewData = await request.json()
    
    // Basic validation
    if (!data.productId || !data.name || !data.rating || !data.comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic spam protection: Check comment length and content
    if (data.comment.length < 10 || data.comment.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Comment must be between 10 and 500 characters' },
        { status: 400 }
      )
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
        return NextResponse.json(
          { success: false, error: 'Comment contains suspicious content' },
          { status: 400 }
        )
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

    return NextResponse.json({ 
      success: true, 
      reviewId: review._id 
    })

  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit review. Please try again.' },
      { status: 500 }
    )
  }
}
