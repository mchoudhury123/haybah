import { Suspense } from 'react'
import { getFeaturedProducts, getRevalidateTime } from './lib/sanity.server'
import { urlForProduct } from '../lib/sanity.image'

import Hero from '../components/Hero'
import JustLanded from '../components/JustLanded'
import Collections from '../components/Collections'
import ProductGrid from '../components/ProductGrid'
import Reviews from '../components/Reviews'
import Footer from '../components/Footer'

// ISR: Revalidate every 10 seconds for testing
export const revalidate = 10

// Generate metadata
export async function generateMetadata() {
  return {
    title: 'Haybah Collections - Luxury Abayas & Islamic Fashion',
    description: 'Discover our exclusive collection of premium Abayas, crafted with elegance and sophistication. From classic designs to modern fashion statements.',
    keywords: 'Abaya, Islamic Fashion, Modest Fashion, Luxury Abayas, Haybah Collections',
  }
}

// Server-side data fetching
async function getHomePageData() {
  try {
    const featuredProducts = await getFeaturedProducts()

    return {
      featuredProducts
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return {
      featuredProducts: []
    }
  }
}

// Loading component for Suspense
function ProductGridSkeleton() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="h-12 bg-gray-200 rounded animate-pulse mx-auto w-64 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  const { featuredProducts } = await getHomePageData()

  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Delivery Notice Banner */}
      <div className="bg-brand-gold/10 border-y border-brand-gold/30 py-3 text-center">
        <div className="container mx-auto px-4">
          <p className="text-brand-maroon font-medium">
            <span className="font-semibold">NOTICE:</span> Due to high demand and limited stock availability, delivery times have been extended to 2-3 weeks. We appreciate your patience and understanding.
          </p>
        </div>
      </div>
      
      <JustLanded />
      <Collections />
      
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid 
          products={featuredProducts}
          title="FEATURED ABAYAS"
          subtitle="Discover our most beloved pieces, crafted with premium materials and timeless elegance."
          showCartButton={false}
        />
      </Suspense>
      
      <Reviews />
      
      <Footer />
    </main>
  )
} 