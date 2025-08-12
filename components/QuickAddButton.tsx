'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/lib/cart'
import { urlForImage } from '@/lib/sanity.image'

interface QuickAddButtonProps {
  product: any
}

export default function QuickAddButton({ product }: QuickAddButtonProps) {
  const { add, isInCart } = useCartStore()

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
  }

  // Check if any variant is in cart
  const hasVariantInCart = product.variants?.some((v: any) =>
    isInCart(product._id, v._id)
  )

  // Check if any variant has stock
  const hasStock = product.variants?.some((v: any) => v.stock > 0 && v.isActive)

  if (hasVariantInCart) {
    return (
      <Button disabled className="w-full py-2 px-4 bg-green-600 text-white rounded flex items-center justify-center gap-2 cursor-not-allowed">
        <Check size={16} />
        In Cart
      </Button>
    )
  }

  if (!hasStock) {
    return (
      <Button disabled className="w-full py-2 px-4 bg-gray-400 text-white rounded flex items-center justify-center gap-2 cursor-not-allowed">
        Out of Stock
      </Button>
    )
  }

  return (
    <Button
      onClick={handleQuickAdd}
      className="w-full py-2 px-4 bg-brand-maroon text-white hover:bg-brand-burgundy transition-colors rounded flex items-center justify-center gap-2"
    >
      <ShoppingCart size={16} />
      Quick Add
    </Button>
  )
}

