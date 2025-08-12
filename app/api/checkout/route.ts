import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'
import { client } from '@/lib/sanity'

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51RuxjH2RuKq5R3NINZ8FuzbCkeaKUFRVKnWuzD9sXMDaCwmq0oh9i7wUSXBRUYDSEcsyuSjtuqOPYUqpW6gyVOOc00S74qaRJm', {
  apiVersion: '2025-07-30.basil',
})

// Validation schema for checkout request
const checkoutSchema = z.object({
  items: z.array(z.object({
    variantId: z.string(),
    qty: z.number().min(1),
  })),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const { items } = checkoutSchema.parse(body)

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Fetch variants from Sanity and validate stock
    const variantIds = items.map(item => item.variantId)
    const variantsQuery = `*[_type == "variant" && _id in $variantIds] {
      _id,
      size,
      color,
      stock,
      priceOverride,
      sku,
      isActive,
      product->{
        _id,
        name,
        price,
        slug,
        images
      }
    }`

    const variants = await client.fetch(variantsQuery, { variantIds })

    if (variants.length !== items.length) {
      return NextResponse.json(
        { error: 'Some variants not found' },
        { status: 400 }
      )
    }

    // Validate stock and build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    let totalAmount = 0

    for (const item of items) {
      const variant = variants.find((v: any) => v._id === item.variantId)
      
      if (!variant) {
        return NextResponse.json(
          { error: `Variant ${item.variantId} not found` },
          { status: 400 }
        )
      }

      if (!variant.isActive) {
        return NextResponse.json(
          { error: `Variant ${variant.sku} is not available` },
          { status: 400 }
        )
      }

      if (variant.stock < item.qty) {
        return NextResponse.json(
          { error: `Insufficient stock for ${variant.product.name} - ${variant.size} ${variant.color}` },
          { status: 400 }
        )
      }

      const price = variant.priceOverride || variant.product.price
      const amount = Math.round(price * 100) // Convert to cents for Stripe

      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `${variant.product.name} - ${variant.size} ${variant.color}`,
            images: variant.product.images ? [variant.product.images[0]] : [],
            metadata: {
              productId: variant.product._id,
              variantId: variant._id,
              size: variant.size,
              color: variant.color,
              sku: variant.sku,
            },
          },
          unit_amount: amount,
        },
        quantity: item.qty,
      })

      totalAmount += amount * item.qty
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${request.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      metadata: {
        totalAmount: totalAmount.toString(),
        itemCount: items.length.toString(),
      },
      customer_email: request.headers.get('x-customer-email') || undefined,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'GR', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU', 'IS', 'LI', 'MC', 'SM', 'VA', 'AD', 'MT', 'CY', 'LU', 'IS', 'LI', 'MC', 'SM', 'VA', 'AD'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500, // £5.00
              currency: 'gbp',
            },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500, // £15.00
              currency: 'gbp',
            },
            display_name: 'Express shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ],
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Checkout error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.format() },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

