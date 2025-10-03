import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!,
  token: process.env.SANITY_TOKEN!,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo, promoCode } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = items.reduce((sum: any, item: any) => sum + (item.price * item.qty), 0)
    const shipping = 4.99 // UK shipping
    
    // Check if promotion code is applied
    const isPromoApplied = promoCode && promoCode.toUpperCase().trim() === 'DELFREETRIAL'
    const total = isPromoApplied ? 1 : (subtotal + shipping)
    const discount = isPromoApplied ? (subtotal + shipping - 1) : 0

    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order document in Sanity
    const orderDoc = {
      _type: 'order',
      orderId,
      customerInfo,
      items,
      promoCode: isPromoApplied ? promoCode : null,
      pricing: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        originalTotal: parseFloat((subtotal + shipping).toFixed(2)),
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

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: isPromoApplied ? [
        // When promo is applied, show the discounted total as a single line item
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Order with Promotion Code',
              description: `Promotion code: ${promoCode} applied - Original total: £${(subtotal + shipping).toFixed(2)}`,
            },
            unit_amount: 100, // £1.00 in pence
          },
          quantity: 1,
        }
      ] : items.map((item: any) => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            description: `${item.color || 'N/A'} - Size ${item.size || 'N/A'}`,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to pence
        },
        quantity: item.qty,
      })),
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'http://localhost:3000'}/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${request.headers.get('origin') || 'http://localhost:3000'}/checkout`,
      customer_email: customerInfo.email, // Stripe will automatically send receipt to this email
      metadata: {
        orderId,
        sanityOrderId: createdOrder._id,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        promoCode: isPromoApplied ? promoCode : null,
      },
      // Pre-fill customer information
      customer_creation: 'always',
      // Collect shipping address (will be pre-filled with customer email)
      shipping_address_collection: {
        allowed_countries: ['GB'], // UK only
      },
      // Pre-fill shipping address
      shipping_options: isPromoApplied ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0, // Free shipping with promotion code
              currency: 'gbp',
            },
            display_name: 'Free Shipping (Promotion Code Applied)',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 10,
              },
              maximum: {
                unit: 'business_day',
                value: 15,
              },
            },
          },
        },
      ] : [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 499, // £4.99 in pence
              currency: 'gbp',
            },
            display_name: 'Standard UK Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 10,
              },
              maximum: {
                unit: 'business_day',
                value: 15,
              },
            },
          },
        },
      ],
      // Set custom text
      custom_text: {
        submit: {
          message: 'Thank you for your order! Please note that all items will be delivered within 2-3 weeks.',
        },
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      orderId,
      sanityOrderId: createdOrder._id,
    })

  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
