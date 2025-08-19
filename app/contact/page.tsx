import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us - Haybah Collections | Get in Touch',
  description: 'Get in touch with Haybah Collections. We\'re here to help with any questions about our modest fashion collections.',
  keywords: 'contact haybah, customer service, modest fashion support, abaya inquiries',
  openGraph: {
    title: 'Contact Us - Haybah Collections',
    description: 'Get in touch with Haybah Collections. We\'re here to help with any questions about our modest fashion collections.',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
