import { Suspense } from 'react'
import ShopClient from './ShopClient'
import { client } from '@/lib/sanity'

// Revalidate every 60 seconds
export const revalidate = 60

export default async function ShopPage() {
  try {
    // Fetch initial data for filters
    const [collections, sizes, colors] = await Promise.all([
      client.fetch(`*[_type == "collection" && defined(slug.current) && slug.current != "abayas"] | order(title asc) { _id, title, slug }`),
      client.fetch(`*[_type == "variant" && defined(size)] | order(size asc) { size }`),
      client.fetch(`*[_type == "color" && defined(name)] | order(name asc) { _id, name, slug }`)
    ])

    // Get unique sizes and colors
    const uniqueSizes = Array.from(new Set(sizes.map((s: any) => s.size))).sort() as string[]
    const uniqueColors = colors.map((c: any) => c.name).sort() as string[]

    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-maroon to-brand-burgundy text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-5xl font-playfair font-bold mb-6">Shop All Products</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover our complete collection of premium Abayas, from classic designs to contemporary styles.
            </p>
          </div>
        </section>

        {/* Shop Content */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <Suspense fallback={<div>Loading shop...</div>}>
              <ShopClient 
                initialCollections={collections || []}
                initialSizes={uniqueSizes || []}
                initialColors={uniqueColors || []}
              />
            </Suspense>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error loading shop page:', error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-maroon mb-4">Error Loading Shop</h1>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    )
  }
}

