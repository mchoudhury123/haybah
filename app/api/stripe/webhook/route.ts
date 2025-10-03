import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@sanity/client'
import { headers } from 'next/headers'

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!,
  token: process.env.SANITY_TOKEN!,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event: any

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        
        console.log('=== CHECKOUT SESSION COMPLETED ===')
        console.log('Session ID:', session.id)
        console.log('Customer Email:', session.customer_email)
        console.log('Amount Total:', session.amount_total)
        console.log('Payment Status:', session.payment_status)
        console.log('Metadata:', session.metadata)
        
        // Update order status in Sanity
        const orderId = session.metadata.orderId
        const sanityOrderId = session.metadata.sanityOrderId
        const customerName = session.metadata.customerName
        const customerEmail = session.metadata.customerEmail
        const promoCode = session.metadata.promoCode
        
        console.log('Order ID:', orderId)
        console.log('Sanity Order ID:', sanityOrderId)
        console.log('Customer Name:', customerName)
        console.log('Customer Email:', customerEmail)
        console.log('Promo Code:', promoCode)
        
        if (orderId && sanityOrderId) {
          // Update order status
          await sanityClient
            .patch(sanityOrderId)
            .set({
              status: 'processing',
              paymentStatus: 'succeeded',
              stripeSessionId: session.id,
              stripeCustomerId: session.customer,
              customerName: customerName,
              customerEmail: customerEmail,
              promoCode: promoCode,
              updatedAt: new Date().toISOString(),
            })
            .commit()

          console.log(`Order ${orderId} marked as successful in Sanity`)
          console.log('=== END CHECKOUT SESSION COMPLETED ===')
          
          // Note: Stripe automatically sends receipt email to customer
          // Cart clearing is handled on the client side when customer returns
          // to thank you page or receipt page
        }
        break

      case 'checkout.session.expired':
        const expiredSession = event.data.object
        const expiredOrderId = expiredSession.metadata.sanityOrderId
        
        if (expiredOrderId) {
          await sanityClient
            .patch(expiredOrderId)
            .set({
              status: 'expired',
              paymentStatus: 'failed',
              updatedAt: new Date().toISOString(),
            })
            .commit()
          
          console.log(`Order ${expiredOrderId} marked as expired`)
        }
        break

      case 'payment_intent.succeeded':
        // Keep this for backward compatibility if needed
        console.log('Payment intent succeeded (legacy event)')
        break

      case 'payment_intent.payment_failed':
        // Keep this for backward compatibility if needed
        console.log('Payment intent failed (legacy event)')
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
