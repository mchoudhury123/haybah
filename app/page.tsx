import { Suspense } from 'react'
import { getFeaturedProducts, getCollections, getRevalidateTime } from './lib/sanity.server'
import { urlForProduct } from '../lib/sanity.image'
import Header from '../components/Header'
import Hero from '../components/Hero'
import JustLanded from '../components/JustLanded'
import Collections from '../components/Collections'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

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
    const [featuredProducts, collections] = await Promise.all([
      getFeaturedProducts(),
      getCollections()
    ])

    return {
      featuredProducts,
      collections
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return {
      featuredProducts: [],
      collections: []
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
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
  const { featuredProducts, collections } = await getHomePageData()

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <JustLanded />
      <Collections collections={collections} />
      
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid 
          products={featuredProducts}
          title="FEATURED COLLECTION"
          subtitle="Discover our most beloved pieces, crafted with premium materials and timeless elegance."
        />
      </Suspense>
      
      <Footer />
    </main>
  )
} 