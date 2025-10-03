import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Create a Sanity client with cache disabled
const sanityClient = createClient({
  projectId: 'gnppn7qx',
  dataset: 'production',
  apiVersion: '2024-07-01',
  token: 'skzWsjcPZ6bouozWpiRdUEnOhlCD4xyXy0nqUPaj3ga83uK8TInGYDpu3bHLHoR2DoAxxzdpELy8CU1P2qMzICr2N2MuyNsyoGNiGMYBliutJcfP6M61s2qHhY4ML01Nzl2A9amEiF0MWZah2pLpyDRkzo5nWQMz5292pHff0HKYYkHiI8F5',
  useCdn: false, // Disable CDN caching
})

// Add cache control headers to prevent caching
export async function GET(
  request: NextRequest,
  { params }: { params: { productSlug: string } }
) {
  try {
    const { productSlug } = params

    // Fetch approved reviews for this product - using case-insensitive matching
    const query = `*[_type == "review" && (productSlug == $productSlug || productSlug match $productSlugMatch) && status == "approved"] | order(createdAt desc) {
      _id,
      customerName,
      rating,
      comment,
      createdAt,
      approvedAt
    }`
    
    // Fetch the specific reviews for this product
    const reviews = await sanityClient.fetch(query, { 
      productSlug,
      productSlugMatch: `*${productSlug}*`
    })

    // Create response with cache control headers
    const response = NextResponse.json({
      success: true,
      reviews,
      count: reviews.length
    })
    
    // Set cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    
    return response

  } catch (error: any) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
