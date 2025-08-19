import type { Metadata } from 'next'
import './globals.css'
import { playfair, inter, notoNaskh, fontVariables } from './fonts'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'Habyah Collections - Luxury Abaya Designs',
  description: 'Discover our premium collection of elegant, sophisticated Abayas. Luxury modest fashion for the modern woman.',
  keywords: ['Abaya', 'Modest Fashion', 'Islamic Clothing', 'Luxury Abaya'],
  authors: [{ name: 'Habyah Collections' }],
  creator: 'Habyah Collections',
  publisher: 'Habyah Collections',
  metadataBase: new URL('https://habyahcollections.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://habyahcollections.com',
    title: 'Habyah Collections - Luxury Abaya Designs',
    description: 'Discover our premium collection of elegant, sophisticated Abayas.',
    siteName: 'Habyah Collections',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Habyah Collections - Luxury Abaya Designs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habyah Collections - Luxury Abaya Designs',
    description: 'Discover our premium collection of elegant, sophisticated Abayas.',
    images: ['/twitter-image.jpg'],
    creator: '@habyahcollections',
    site: '@habyahcollections',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
} 