import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: 'gnppn7qx',
  dataset: 'production',
  apiVersion: '2024-07-01',
  token: 'skzWsjcPZ6bouozWpiRdUEnOhlCD4xyXy0nqUPaj3ga83uK8TInGYDpu3bHLHoR2DoAxxzdpELy8CU1P2qMzICr2N2MuyNsyoGNiGMYBliutJcfP6M61s2qHhY4ML01Nzl2A9amEiF0MWZah2pLpyDRkzo5nWQMz5292pHff0HKYYkHiI8F5',
  useCdn: false,
})

export async function POST(request: NextRequest) {
  try {
    const { productId, productSlug, customerName, rating, comment } = await request.json()

    // Validate required fields
    if (!productId || !productSlug || !customerName || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'Rating must be a whole number between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate comment length
    if (comment.length < 10 || comment.length > 500) {
      return NextResponse.json(
        { error: 'Comment must be between 10 and 500 characters' },
        { status: 400 }
      )
    }

    // Create review document in Sanity
    const reviewDoc = await sanityClient.create({
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId
      },
      productId,
      productSlug,
      customerName: customerName.trim(),
      rating,
      comment: comment.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    })

    console.log('Review submitted successfully:', reviewDoc._id)

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully! It will be visible after admin approval.',
      reviewId: reviewDoc._id
    })

  } catch (error: any) {
    console.error('Error submitting review:', error)
    return NextResponse.json(
      { error: 'Failed to submit review. Please try again.' },
      { status: 500 }
    )
  }
}
