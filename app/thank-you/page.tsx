import { Metadata } from 'next'
import ThankYouClient from './ThankYouClient'

export const metadata: Metadata = {
  title: 'Thank You - Haybah Collections | Order Confirmed',
  description: 'Thank you for your order! Your purchase has been confirmed and we\'ll be in touch soon.',
  keywords: 'thank you, order confirmed, haybah collections, purchase success',
  openGraph: {
    title: 'Thank You - Haybah Collections',
    description: 'Thank you for your order! Your purchase has been confirmed.',
    type: 'website',
  },
}

export default function ThankYouPage() {
  return <ThankYouClient />
}

