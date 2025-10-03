'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, AlertCircle, Check } from 'lucide-react'
import { useCartStore } from '@/lib/cart'
import { urlForProduct } from '@/lib/sanity.image'

interface VariantSelectorProps {
  product: any
}

export default function VariantSelector({ product }: VariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const { add, openCartPanel } = useCartStore()

  // Get unique sizes and colors from variants
  const sizes = Array.from(new Set(product.variants.map((v: any) => v.size)))
    .sort((a, b) => {
      // Sort sizes in ascending order (XS, S, M, L, XL, XXL)
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      const aIndex = sizeOrder.indexOf(a as string)
      const bIndex = sizeOrder.indexOf(b as string)
      if (aIndex === -1 && bIndex === -1) return (a as string).localeCompare(b as string)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    }) as string[]
  const colors = Array.from(new Set(product.variants.map((v: any) => v.color))).sort() as string[]

  // Find available variants based on selection
  const availableVariants = product.variants.filter((v: any) => {
    if (selectedSize && v.size !== selectedSize) return false
    if (selectedColor && v.color !== selectedColor) return false
    return v.isActive && v.stock > 0
  })

  // Find the specific variant when both size and color are selected
  const specificVariant = product.variants.find((v: any) => 
    v.size === selectedSize && v.color === selectedColor && v.isActive
  )

  // Update selected variant when size/color changes
  useEffect(() => {
    if (selectedSize && selectedColor) {
      setSelectedVariant(specificVariant)
    } else {
      setSelectedVariant(null)
    }
  }, [selectedSize, selectedColor, specificVariant])

  // Auto-select first available size/color if none selected
  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0])
    }
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0])
    }
  }, [sizes, colors, selectedSize, selectedColor])

  const handleAddToCart = () => {
    if (!selectedVariant) return
    
    // Check if stock is available
    if (selectedVariant.stock <= 0) return
    
    // Add to cart
    add({
      productId: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price: selectedVariant.priceOverride || product.price,
      qty: quantity,
      image: product.images?.[0] ? urlForProduct(product.images[0]) : '',
      slug: product.slug.current,
      size: selectedVariant.size,
      color: selectedVariant.color,
      sku: selectedVariant.sku
    })

    // Open cart panel and show "Added to cart" message for 2 seconds
    openCartPanel()
    setShowAddedMessage(true)
    setTimeout(() => {
      setShowAddedMessage(false)
    }, 2000)
  }

  const isOutOfStock = selectedVariant && selectedVariant.stock === 0
  const isLowStock = selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isAvailable = product.variants.some((v: any) => 
                v.size === size && v.isActive && v.stock > 0
              )
              const isSelected = selectedSize === size
              
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium ${
                    isSelected
                      ? 'border-brand-gold bg-brand-gold text-white'
                      : isAvailable
                      ? 'border-gray-300 hover:border-brand-maroon hover:bg-brand-maroon/5'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const isAvailable = product.variants.some((v: any) => 
                v.color === color && v.isActive && v.stock > 0
              )
              const isSelected = selectedColor === color
              
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium capitalize ${
                    isSelected
                      ? 'border-brand-gold bg-brand-gold text-white'
                      : isAvailable
                      ? 'border-gray-300 hover:border-brand-maroon hover:bg-brand-maroon/5'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {color}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Stock Status */}
      {selectedVariant && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Availability</span>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Available
            </Badge>
          </div>
          
          <div className="text-sm text-gray-600">
            SKU: {selectedVariant.sku}
          </div>
          <div className="text-sm text-gray-600">
            Delivery time: 2-3 weeks
          </div>
        </motion.div>
      )}

      {/* Quantity & Add to Cart */}
      {selectedVariant && !isOutOfStock && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity >= selectedVariant.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          {showAddedMessage ? (
            <Button
              disabled
              className="w-full bg-green-600 text-white py-3 text-lg font-medium"
              size="lg"
            >
              <Check className="mr-2 h-5 w-5" />
              Added to Cart!
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white py-3 text-lg font-medium transition-all duration-200 hover:scale-[1.02]"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - £{selectedVariant.priceOverride || product.price}
            </Button>
          )}
        </motion.div>
      )}

      {/* Add to Cart for Out of Stock Items */}
      {isOutOfStock && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <p className="text-gray-500 mb-3">This variant is available to order</p>
          <p className="text-sm text-brand-maroon mb-3">Delivery time: 2-3 weeks</p>
          <Button
            onClick={() => {
              if (!selectedVariant) return;
              
              // Add to cart
              add({
                productId: product._id,
                variantId: selectedVariant._id,
                name: product.name,
                price: selectedVariant.priceOverride || product.price,
                qty: 1,
                image: product.images?.[0] ? urlForProduct(product.images[0]) : '',
                slug: product.slug.current,
                size: selectedVariant.size,
                color: selectedVariant.color,
                sku: selectedVariant.sku
              });
              
              // Open cart panel
              openCartPanel();
            }}
            className="bg-brand-maroon hover:bg-brand-maroon/90 text-white"
          >
            Add to Cart
          </Button>
        </motion.div>
      )}
    </div>
  )
}
