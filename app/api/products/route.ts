import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const collections = searchParams.get('collections')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // Prepare parameters for GROQ query
    const params: any = {}
    
    if (collections) {
      params.collections = collections.split(',').filter(Boolean)
    }
    
    if (minPrice) {
      params.minPrice = parseFloat(minPrice)
    }
    
    if (maxPrice) {
      params.maxPrice = parseFloat(maxPrice)
    }

    // Execute the GROQ query
    const result = await client.fetch(query, params)

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

