'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/lib/cart'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface StripeCheckoutProps {
  clientSecret: string
  orderId: string
  onSuccess: (orderId: string) => void
  onError: (error: string) => void
}

function CheckoutForm({ clientSecret, orderId, onSuccess, onError }: StripeCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
      },
      redirect: 'if_required',
    })

    if (error) {
      setMessage(error.message || 'An error occurred')
      onError(error.message || 'Payment failed')
      setIsProcessing(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!')
      
      // Debug logging
      console.log('Payment intent succeeded:', paymentIntent)
      console.log('Payment intent metadata:', (paymentIntent as any).metadata)
      
      // Use the orderId passed from the checkout client
      console.log('Using orderId from props:', orderId)
      
      onSuccess(orderId)
      setIsProcessing(false)
    } else {
      setMessage('Unexpected state')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {message && (
        <div className={`p-3 rounded ${
          message.includes('successful') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}

export default function StripeCheckout({ clientSecret, orderId, onSuccess, onError }: StripeCheckoutProps) {
  const [stripePromise, setStripePromise] = useState<any>(null)

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!))
  }, [])

  if (!stripePromise) {
    return <div>Loading payment form...</div>
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm 
        clientSecret={clientSecret}
        orderId={orderId}
        onSuccess={onSuccess} 
        onError={onError} 
      />
    </Elements>
  )
}
