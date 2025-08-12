const Stripe = require('stripe');

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = event.body;
    const signature = event.headers['stripe-signature'];

    if (!signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing stripe-signature header' }),
      };
    }

    let event_data;

    try {
      // Verify webhook signature
      event_data = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    // Handle the event
    switch (event_data.type) {
      case 'checkout.session.completed':
        console.log('Checkout completed:', event_data.data.object.id);
        break;
      
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event_data.data.object.id);
        break;
      
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event_data.data.object.id);
        break;
      
      default:
        console.log(`Unhandled event type: ${event_data.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook handler failed' }),
    };
  }
};
