'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import QuickAddButton from '@/components/QuickAddButton'
import { urlForImage } from '@/lib/sanity.image'

interface CollectionClientProps {
  collection: any
  products: any[]
}

export default function CollectionClient({ collection, products }: CollectionClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-brand-maroon to-brand-burgundy">
        {collection.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={urlForImage(collection.heroImage, 1200, 600)}
              alt={`${collection.title} collection hero image`}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
              priority
            />
          </div>
        )}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-playfair font-bold mb-4"
            >
              {collection.title}
            </motion.h1>
            {collection.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {collection.description}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-brand-maroon mb-2">
                {collection.title}
              </h2>
              <p className="text-gray-600">
                {products.length} product{products.length !== 1 ? 's' : ''} in this collection
              </p>
            </div>
            <Link
              href="/shop"
              className="text-brand-maroon hover:text-brand-burgundy transition-colors"
            >
              View All Products →
            </Link>
          </div>

          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-brand-maroon/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-brand-maroon text-4xl">👗</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                This collection is currently empty. Check back soon for new arrivals!
              </p>
              <Button asChild className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any, index: number) => (
                <motion.div
                  key={product._id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Product Image */}
                  <Link href={`/product/${product.slug.current}`}>
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-brand-peach to-brand-cream rounded-lg shadow-elegant overflow-hidden mb-4">
                      {/* Status Badges */}
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          SALE
                        </div>
                      )}
                      {product.badges && product.badges.includes('new-arrival') && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </div>
                      )}

                      {/* Product Image */}
                      {product.images && product.images.length > 0 ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlForImage(product.images[0], 500, 700)}
                            alt={`${product.name} - ${product.collections?.[0]?.title || 'Abaya'}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-brand-maroon/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                              <span className="text-brand-maroon text-3xl">👗</span>
                            </div>
                            <p className="text-brand-maroon font-medium text-sm">Abaya</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="text-center mb-4">
                    <Link href={`/product/${product.slug.current}`}>
                      <h3 className="font-medium text-brand-dark mb-2 group-hover:text-brand-maroon transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-gray-500 line-through text-sm">
                          £{product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-semibold text-brand-maroon">
                        £{product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Variant Info */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="flex items-center justify-center gap-2 mb-3">
                        {product.variants
                          .sort((a: any, b: any) => {
                            // Sort sizes in ascending order (XS, S, M, L, XL, XXL)
                            const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
                            const aIndex = sizeOrder.indexOf(a.size)
                            const bIndex = sizeOrder.indexOf(b.size)
                            if (aIndex === -1 && bIndex === -1) return a.size.localeCompare(b.size)
                            if (aIndex === -1) return 1
                            if (bIndex === -1) return -1
                            return aIndex - bIndex
                          })
                          .slice(0, 3)
                          .map((variant: any) => (
                            <Badge key={variant._id} variant="outline" className="text-xs">
                              {variant.size}
                            </Badge>
                          ))}
                        {product.variants.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.variants.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <QuickAddButton product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
