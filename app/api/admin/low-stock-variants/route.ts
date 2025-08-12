import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    // Fetch variants with stock <= 5 and their associated product information
    const lowStockVariants = await client.fetch(`
      *[_type == "variant" && stock <= 5 && isActive == true] {
        _id,
        sku,
        size,
        color,
        stock,
        product->{
          _id,
          name
        }
      } | order(stock asc)
    `)

    return NextResponse.json(lowStockVariants)
  } catch (error) {
    console.error('Error fetching low stock variants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch low stock variants' },
      { status: 500 }
    )
  }
}
