import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!,
  token: process.env.SANITY_TOKEN!, // You'll need to create a token with write access
  useCdn: false,
})

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

    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order document in Sanity
    const orderDoc = {
      _type: 'order',
      orderId,
      customerInfo,
      items,
      pricing: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
      },
      status: 'new',
      paymentStatus: 'pending',
      priority: 'normal',
      emailSent: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save order to Sanity
    const createdOrder = await sanityClient.create(orderDoc)
    console.log('Order created in Sanity:', createdOrder._id)

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe expects amount in pence
      currency: 'gbp',
      metadata: {
        orderId,
        sanityOrderId: createdOrder._id,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      sanityOrderId: createdOrder._id,
    })

  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
