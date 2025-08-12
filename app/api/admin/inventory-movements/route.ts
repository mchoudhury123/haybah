import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    // Fetch recent inventory movements (last 50)
    const inventoryMovements = await client.fetch(`
      *[_type == "inventory_movement"] | order(at desc)[0...50] {
        _id,
        productName,
        variantInfo,
        sku,
        qty,
        reason,
        at,
        previousStock,
        newStock,
        orderId,
        processedBy,
        notes
      }
    `)

    return NextResponse.json(inventoryMovements)
  } catch (error) {
    console.error('Error fetching inventory movements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory movements' },
      { status: 500 }
    )
  }
}
