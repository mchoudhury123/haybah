import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = items.reduce((sum: any, item: any) => sum + (item.price * item.qty), 0)
    const shipping = 4.99 // UK shipping
    const total = subtotal + shipping

    // Generate a simple order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // In a real application, you would:
    // 1. Save the order to a database
    // 2. Send confirmation emails
    // 3. Update inventory
    // 4. Process payment (when you add Stripe later)

    // For now, we'll simulate a successful order
    const order = {
      orderId,
      items,
      customerInfo,
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Log the order (in production, save to database)
    console.log('New Order Created:', order)

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true,
      orderId,
      order,
      message: 'Order created successfully! You will receive a confirmation email shortly.'
    })

  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}

