'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import Link from 'next/link'
import { urlForProduct } from '../lib/sanity.image'
import { SanityProductWithVariants } from '../app/lib/sanity.server'
import { useCartStore } from '../lib/cart'

interface ProductGridProps {
  products: SanityProductWithVariants[]
  title?: string
  subtitle?: string
}

export default function ProductGrid({ 
  products, 
  title = "FEATURED COLLECTION",
  subtitle = "Discover our most beloved pieces, crafted with premium materials and timeless elegance."
}: ProductGridProps) {
  const { add, isInCart } = useCartStore()

  if (!products || products.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-4">
              NO PRODUCTS YET
            </h2>
            <p className="text-lg text-brand-dark max-w-2xl mx-auto mb-8">
              Head to your Sanity Studio to add your first products!
            </p>
            <a 
              href="/studio" 
              className="btn-primary inline-block"
            >
              Go to Studio
            </a>
          </div>
        </div>
      </section>
    )
  }

  const handleAddToCart = (product: SanityProductWithVariants) => {
    // Get first available variant
    const firstVariant = product.variants?.find(v => v.stock > 0 && v.isActive)
    if (!firstVariant) return

    add({
      productId: product._id,
      variantId: firstVariant._id,
      name: product.name,
      price: firstVariant.priceOverride || product.price,
      qty: 1,
      image: product.images?.[0] ? urlForProduct(product.images[0]) : '',
      slug: product.slug.current,
      size: firstVariant.size,
      color: firstVariant.color,
      sku: firstVariant.sku
    })
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-4">
            {title}
          </h2>
          <p className="text-lg text-brand-dark max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Product image and info - clickable */}
              <Link href={`/product/${product.slug.current}`}>
                {/* Product image */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-brand-peach to-brand-cream rounded-lg shadow-elegant overflow-hidden mb-4">
                  {/* Status badges */}
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
                  
                  {/* Product image or placeholder */}
                  {product.images && product.images.length > 0 ? (
                    <div 
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{ 
                        backgroundImage: `url(${urlForProduct(product.images[0])})` 
                      }}
                    />
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

                {/* Product info */}
                <div className="text-center">
                  <h3 className="font-medium text-brand-dark mb-2 group-hover:text-brand-maroon transition-colors">
                    {product.name}
                  </h3>
                  
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

                  {/* Collection info */}
                  {product.collections && product.collections.length > 0 && (
                    <p className="text-xs text-gray-500 mb-3">
                      {product.collections[0].title}
                    </p>
                  )}

                  {/* Variant info */}
                  {product.variants && product.variants.length > 0 && (
                    <p className="text-xs text-gray-400 mb-3">
                      {product.variants.length} variants available
                    </p>
                  )}
                </div>
              </Link>

              {/* Action buttons */}
              <div className="space-y-2">
                {/* Check if any variant is in cart */}
                {(() => {
                  const hasVariantInCart = product.variants?.some(v => 
                    isInCart(product._id, v._id)
                  )
                  
                  if (hasVariantInCart) {
                    return (
                      <button 
                        disabled
                        className="w-full py-2 px-4 bg-green-600 text-white rounded flex items-center justify-center gap-2 cursor-not-allowed"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Check size={16} />
                        In Cart
                      </button>
                    )
                  }
                  
                  // Check if any variant has stock
                  const hasStock = product.variants?.some(v => v.stock > 0 && v.isActive)
                  
                  if (!hasStock) {
                    return (
                      <button 
                        disabled
                        className="w-full py-2 px-4 bg-gray-400 text-white rounded flex items-center justify-center gap-2 cursor-not-allowed"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Out of Stock
                      </button>
                    )
                  }
                  
                  return (
                    <button 
                      className="w-full py-2 px-4 bg-brand-maroon text-white hover:bg-brand-burgundy transition-colors rounded flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  )
                })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 