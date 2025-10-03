import { Metadata } from 'next'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Checkout - Haybah Collections | Secure Payment',
  description: 'Complete your purchase securely with Haybah Collections. Choose your preferred payment method and complete your order.',
  keywords: 'checkout, payment, secure, haybah collections, abaya purchase',
  openGraph: {
    title: 'Checkout - Haybah Collections',
    description: 'Complete your purchase securely with Haybah Collections.',
    type: 'website',
  },
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
