'use client'

import { motion } from 'framer-motion'
import ProductGallery from '@/components/ProductGallery'
import VariantSelector from '@/components/VariantSelector'
import RelatedProducts from '@/components/RelatedProducts'
import ReviewsDisplay from '@/components/ReviewsDisplay'
import ReviewForm from '@/components/ReviewForm'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ProductClientProps {
  product: any
  relatedProducts: any[]
  discountPercentage: number
}

export default function ProductClient({ product, relatedProducts, discountPercentage }: ProductClientProps) {
  // Debug logging
  console.log('=== PRODUCT CLIENT DEBUG ===')
  console.log('Product data:', product)
  console.log('Product collections:', product?.collections)
  console.log('Product variants:', product?.variants)
  console.log('Product price:', product?.price)
  console.log('Product badges:', product?.badges)
  console.log('Related products:', relatedProducts)
  console.log('Discount percentage:', discountPercentage)
  
  // Validate required product data
  if (!product || !product.name || !product.price) {
    console.error('Invalid product data:', product)
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <h1 className="text-4xl text-brand-maroon">Product Data Error</h1>
          <p className="text-gray-600">
            This product is missing required information. Please check the product setup in Sanity Studio.
          </p>
          <a 
            href="/" 
            className="inline-block bg-brand-maroon text-white px-6 py-3 rounded-lg hover:bg-brand-burgundy transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images?.map((img: any) => img.asset?.url || img) || [],
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "GBP",
              "availability": product.variants?.some((v: any) => v.stock > 0) 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            },
            "brand": {
              "@type": "Brand",
              "name": "Habyah Collections"
            },
                         "category": product.collections?.[0]?.title || "Abaya"
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Product Gallery */}
            <div className="space-y-4">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
                             {/* Breadcrumb */}
               <nav className="text-sm text-gray-600">
                 <a href="/" className="hover:text-brand-maroon">Home</a>
                 <span className="mx-2">/</span>
                 <a href="/shop" className="hover:text-brand-maroon">Shop</a>
                 <span className="mx-2">/</span>
                 <span className="text-brand-maroon">{product.name}</span>
               </nav>

              {/* Product Title */}
              <h1 className="text-4xl font-playfair font-bold text-brand-maroon">
                {product.name}
              </h1>

                             {/* Price and Badges */}
               <div className="flex items-center gap-4">
                 <div className="flex items-baseline gap-3">
                   <span className="text-3xl font-bold text-brand-maroon">
                     £{product.price ? product.price.toFixed(2) : '0.00'}
                   </span>
                   {product.compareAtPrice && product.price && product.compareAtPrice > product.price && (
                     <span className="text-xl text-gray-500 line-through">
                       £{product.compareAtPrice.toFixed(2)}
                     </span>
                   )}
                 </div>
                
                {discountPercentage > 0 && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    {discountPercentage}% OFF
                  </Badge>
                )}
                
                                 {product.badges && product.badges.includes('new-arrival') && (
                   <Badge className="bg-brand-gold text-white text-sm px-3 py-1">
                     NEW
                   </Badge>
                 )}
              </div>

              {/* Product Description */}
              <div className="prose prose-brand-maroon max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating Summary */}
              {product.reviewCount && product.reviewCount > 0 && (
                <div className="flex items-center gap-3 py-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xl ${
                          star <= Math.round(product.averageRating || 0) ? 'text-brand-gold' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-lg font-medium text-brand-maroon">
                    {(product.averageRating || 0).toFixed(1)}
                  </span>
                  <span className="text-gray-600">
                    ({product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

                             {/* Variant Selector */}
               {product.variants && product.variants.length > 0 ? (
                 <VariantSelector product={product} />
               ) : (
                 <div className="p-4 bg-gray-50 rounded-lg border">
                   <p className="text-gray-600 text-center">Product variants will be available soon</p>
                 </div>
               )}

                             {/* Collection Info */}
               <div className="pt-4 border-t border-gray-200">
                 {product.collections?.[0]?.title && (
                   <p className="text-sm text-gray-600">
                     Collection: <span className="font-medium text-brand-maroon">
                       {product.collections[0].title}
                     </span>
                   </p>
                 )}
                 <p className="text-sm text-gray-600">
                   {product.variants && product.variants.length > 0 
                     ? `Available in ${product.variants.length} variants`
                     : 'Product variants coming soon'
                   }
                 </p>
               </div>
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16"
            >
              <RelatedProducts products={relatedProducts} />
            </motion.div>
          )}

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Reviews Display */}
              <ReviewsDisplay
                reviews={product.reviews || []}
                averageRating={product.averageRating || 0}
                reviewCount={product.reviewCount || 0}
              />
              
              {/* Review Form */}
              <ReviewForm
                productId={product._id}
                productName={product.name}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
