import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { _type, slug } = body

    if (!_type) {
      return NextResponse.json({ message: 'Missing _type' }, { status: 400 })
    }

    // Revalidate based on document type
    switch (_type) {
      case 'product':
        if (slug?.current) {
          // Revalidate product detail page
          revalidatePath(`/product/${slug.current}`)
          // Revalidate product list pages
          revalidatePath('/')
          revalidatePath('/products')
          revalidatePath('/collections')
          // Revalidate collection pages that contain this product
          revalidateTag('collection-products')
        }
        break

      case 'collection':
        if (slug?.current) {
          // Revalidate collection page
          revalidatePath(`/collection/${slug.current}`)
          // Revalidate collection list
          revalidatePath('/collections')
          // Revalidate home page if collection is featured
          revalidatePath('/')
        }
        break

      case 'variant':
        // Revalidate product pages when variants change
        revalidateTag('product-variants')
        break

      default:
        // Revalidate all pages for unknown types
        revalidatePath('/')
        revalidatePath('/products')
        revalidatePath('/collections')
    }

    return NextResponse.json({ 
      message: 'Revalidated successfully',
      revalidated: true,
      now: Date.now()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}

// Handle GET requests (useful for testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'Revalidation endpoint is working',
    timestamp: Date.now()
  })
}

