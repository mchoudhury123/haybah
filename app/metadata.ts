import { Metadata } from 'next'

export const siteConfig = {
  name: 'Habyah Collections',
  description: 'Luxury Abaya designs and modest fashion for the modern woman.',
  url: 'https://habyahcollections.com',
  ogImage: '/og-image.jpg',
  twitterImage: '/twitter-image.jpg',
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

export function constructMetadata({
  title,
  description,
  image,
  noIndex,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: title
      ? `${title} - ${siteConfig.name}`
      : siteConfig.name,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      ...siteConfig.openGraph,
      title: title
        ? `${title} - ${siteConfig.name}`
        : siteConfig.openGraph.title,
      description: description || siteConfig.openGraph.description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title || siteConfig.openGraph.title,
            },
          ]
        : siteConfig.openGraph.images,
    },
    twitter: {
      ...siteConfig.twitter,
      title: title
        ? `${title} - ${siteConfig.name}`
        : siteConfig.twitter.title,
      description: description || siteConfig.twitter.description,
      images: image ? [image] : siteConfig.twitter.images,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
