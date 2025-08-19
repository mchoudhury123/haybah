import { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us - Haybah Collections | Modest Fashion & Islamic Values',
  description: 'Discover the story behind Haybah Collections, a growing Abaya business dedicated to promoting modesty, Islamic values, and elegant fashion for Muslim women.',
  keywords: 'about haybah, abaya business, modest fashion, islamic values, muslim women fashion',
  openGraph: {
    title: 'About Us - Haybah Collections',
    description: 'Discover the story behind Haybah Collections, a growing Abaya business dedicated to promoting modesty, Islamic values, and elegant fashion for Muslim women.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutClient />
}
