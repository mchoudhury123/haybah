'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check, X } from 'lucide-react'
import { useCartStore } from '@/lib/cart'
import { urlForImage } from '@/lib/sanity.image'

interface QuickAddButtonProps {
  product: any
}

export default function QuickAddButton({ product }: QuickAddButtonProps) {
  const { add, openCartPanel, isInCart } = useCartStore()
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const [showSizeSelector, setShowSizeSelector] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>('')

  // Check if any variant is in cart
  const hasVariantInCart = product.variants?.some((v: any) => 
    isInCart(product._id, v._id)
  )

  const handleQuickAdd = () => {
    // Get first available variant
    const firstVariant = product.variants?.find((v: any) => v.stock > 0 && v.isActive)
    if (!firstVariant) return

    add({
      productId: product._id,
      variantId: firstVariant._id,
      name: product.name,
      price: firstVariant.priceOverride || product.price,
      qty: 1,
      image: product.images?.[0] ? urlForImage(product.images[0]) : '',
      slug: product.slug.current,
      size: firstVariant.size,
      color: firstVariant.color,
      sku: firstVariant.sku
    })

    // Show "Added to cart" message for 2 seconds, then open cart panel
    setShowAddedMessage(true)
    setTimeout(() => {
      setShowAddedMessage(false)
      openCartPanel()
    }, 2000)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    setShowSizeSelector(false)
    
    // Find the variant with the selected size
    const selectedVariant = product.variants?.find((v: any) => 
      v.size === size && v.stock > 0 && v.isActive
    )
    
    if (selectedVariant) {
      add({
        productId: product._id,
        variantId: selectedVariant._id,
        name: product.name,
        price: selectedVariant.priceOverride || product.price,
        qty: 1,
        image: product.images?.[0] ? urlForImage(product.images[0]) : '',
        slug: product.slug.current,
        size: selectedVariant.size,
        color: selectedVariant.color,
        sku: selectedVariant.sku
      })

      // Show "Added to cart" message for 2 seconds, then open cart panel
      setShowAddedMessage(true)
      setTimeout(() => {
        setShowAddedMessage(false)
        openCartPanel()
      }, 2000)
    }
  }

  // Get available sizes sorted in ascending order
  const availableSizes = product.variants
    ?.filter((v: any) => v.stock > 0 && v.isActive)
    .sort((a: any, b: any) => {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      const aIndex = sizeOrder.indexOf(a.size)
      const bIndex = sizeOrder.indexOf(b.size)
      if (aIndex === -1 && bIndex === -1) return a.size.localeCompare(b.size)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
    .map((v: any) => v.size) || []

  // Check if any variant has stock
  const hasStock = product.variants?.some((v: any) => v.stock > 0 && v.isActive)

  // If item is already in cart, show "In Cart" button
  if (hasVariantInCart) {
    return (
      <Button disabled className="w-full py-2 px-4 bg-green-600 text-white rounded flex items-center justify-center gap-2 cursor-not-allowed">
        <Check size={16} />
        In Cart
      </Button>
    )
  }

  // If showing "Added to Cart" message
  if (showAddedMessage) {
    return (
      <Button disabled className="w-full py-2 px-4 bg-green-600 text-white rounded flex items-center justify-center gap-2 cursor-not-allowed">
        <Check size={16} />
        Added to Cart!
      </Button>
    )
  }

  // If no stock available, still show Add to Cart button
  if (!hasStock) {
    const firstVariant = product.variants?.[0];
    if (!firstVariant) {
      return (
        <Button disabled className="w-full py-2 px-4 bg-gray-400 text-white rounded flex items-center justify-center gap-2 cursor-not-allowed">
          Unavailable
        </Button>
      );
    }
    
    return (
      <Button 
        onClick={() => {
          add({
            productId: product._id,
            variantId: firstVariant._id,
            name: product.name,
            price: firstVariant.priceOverride || product.price,
            qty: 1,
            image: product.images?.[0] ? urlForImage(product.images[0]) : '',
            slug: product.slug.current,
            size: firstVariant.size,
            color: firstVariant.color,
            sku: firstVariant.sku
          });
          
          // Show "Added to cart" message for 2 seconds, then open cart panel
          setShowAddedMessage(true);
          setTimeout(() => {
            setShowAddedMessage(false);
            openCartPanel();
          }, 2000);
        }}
        className="w-full py-2 px-4 bg-brand-maroon text-white hover:bg-brand-maroon/90 transition-colors rounded flex items-center justify-center gap-2"
      >
        Add to Cart
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowSizeSelector(true)}
        className="w-full py-2 px-4 bg-brand-maroon text-white hover:bg-brand-burgundy transition-colors rounded flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} />
        Quick Add
      </Button>

      {/* Size Selector Modal */}
      {showSizeSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSizeSelector(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
              <button
                onClick={() => setShowSizeSelector(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{product.name}</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {availableSizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className="px-4 py-3 border-2 border-gray-300 hover:border-brand-maroon hover:bg-brand-maroon/5 rounded-lg font-medium transition-all duration-200"
                >
                  {size}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setShowSizeSelector(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

