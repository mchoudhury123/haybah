'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlForProduct } from '@/lib/sanity.image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface RelatedProductsProps {
  products: any[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-playfair font-bold text-brand-maroon mb-2">
          You May Also Like
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover more beautiful pieces from our collection that complement your style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Link href={`/product/${product.slug.current}`}>
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {product.images && product.images[0] ? (
                      <Image
                        src={urlForProduct(product.images[0])}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span>No image</span>
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.compareAtPrice && product.price < product.compareAtPrice && (
                        <Badge variant="destructive" className="text-xs">
                          SALE
                        </Badge>
                      )}
                      {product.badges.includes('new-arrival') && (
                        <Badge className="bg-brand-gold text-white text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    {/* Collection */}
                    {product.collections && product.collections[0] && (
                      <p className="text-xs text-brand-gold font-medium uppercase tracking-wide">
                        {product.collections[0].title}
                      </p>
                    )}

                    {/* Product Name */}
                    <h3 className="font-playfair font-semibold text-brand-maroon group-hover:text-brand-gold transition-colors duration-200 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-brand-maroon">
                        £{product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && product.price < product.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          £{product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Variants Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{product.variants?.length || 0} variants available</span>
                      <span className="text-brand-gold group-hover:text-brand-maroon transition-colors duration-200">
                        View Details →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {products.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all duration-200 hover:scale-105"
          >
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}

