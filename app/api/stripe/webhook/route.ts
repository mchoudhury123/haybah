import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { writeClient } from '@/lib/sanity'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-07-30.basil',
})

// Webhook secret from environment variable
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    // Get raw body for webhook signature verification
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id)
        break
      
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing completed checkout session:', session.id)

    if (!session.line_items?.data) {
      console.error('No line items found in session')
      return
    }

    // Process each line item to update inventory
    for (const item of session.line_items.data) {
      if (item.price?.metadata?.variantId && item.quantity) {
        const variantId = item.price.metadata.variantId
        const quantity = item.quantity

        console.log(`Updating inventory for variant ${variantId}, quantity: ${quantity}`)

        // Update variant stock in Sanity
        await updateVariantStock(variantId, quantity, session.id)
      }
    }

    console.log('Successfully processed checkout session:', session.id)

  } catch (error) {
    console.error('Error handling checkout completed:', error)
    throw error
  }
}

async function updateVariantStock(variantId: string, soldQty: number, orderId: string) {
  try {
    // First, get current variant data
    const variantQuery = `*[_type == "variant" && _id == $variantId][0] {
      _id,
      stock,
      sku,
      size,
      color,
      product->{
        _id,
        name
      }
    }`

    const variant = await writeClient.fetch(variantQuery, { variantId })

    if (!variant) {
      console.error(`Variant ${variantId} not found`)
      return
    }

    const currentStock = variant.stock || 0
    const newStock = Math.max(currentStock - soldQty, 0)

    console.log(`Variant ${variant.sku} (${variant.size} ${variant.color}): ${currentStock} -> ${newStock}`)

    // Update variant stock
    await writeClient
      .patch(variantId)
      .set({ stock: newStock })
      .commit()

    // Create inventory movement record for audit
    const inventoryMovement = {
      _type: 'inventory_movement',
      variantRef: {
        _type: 'reference',
        _ref: variantId
      },
      qty: soldQty,
      reason: 'sale',
      orderId: orderId,
      at: new Date().toISOString(),
      previousStock: currentStock,
      newStock: newStock,
      productName: variant.product?.name,
      variantInfo: `${variant.size} ${variant.color}`,
      sku: variant.sku,
      processedBy: 'stripe_webhook'
    }

    await writeClient.create(inventoryMovement)

    console.log(`Successfully updated inventory for variant ${variantId}`)

  } catch (error) {
    console.error(`Error updating variant ${variantId} stock:`, error)
    throw error
  }
}

// Configure raw body parsing for webhooks
export const dynamic = 'force-dynamic'
