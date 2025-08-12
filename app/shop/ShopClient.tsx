'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ShoppingCart, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { useCartStore } from '@/lib/cart'
import QuickAddButton from '@/components/QuickAddButton'

interface ShopClientProps {
  initialCollections: any[]
  initialSizes: string[]
  initialColors: string[]
}

interface FilterState {
  collections: string[]
  sizes: string[]
  colors: string[]
  priceRange: [number, number]
  inStock: boolean
  search: string
}

export default function ShopClient({ initialCollections, initialSizes, initialColors }: ShopClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { add, isInCart } = useCartStore()

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    collections: searchParams.get('collections')?.split(',').filter(Boolean) || [],
    sizes: searchParams.get('sizes')?.split(',').filter(Boolean) || [],
    colors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
    priceRange: [
      parseInt(searchParams.get('minPrice') || '0'),
      parseInt(searchParams.get('maxPrice') || '1000')
    ],
    inStock: searchParams.get('inStock') === 'true',
    search: searchParams.get('search') || ''
  })

  const [products, setProducts] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search)
    }, 500)

    return () => clearTimeout(timer)
  }, [filters.search])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (filters.collections.length > 0) params.set('collections', filters.collections.join(','))
    if (filters.sizes.length > 0) params.set('sizes', filters.sizes.join(','))
    if (filters.colors.length > 0) params.set('colors', filters.colors.join(','))
    if (filters.priceRange[0] > 0) params.set('minPrice', filters.priceRange[0].toString())
    if (filters.priceRange[1] < 1000) params.set('maxPrice', filters.priceRange[1].toString())
    if (filters.inStock) params.set('inStock', 'true')
    if (filters.search) params.set('search', filters.search)

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.push(newUrl)
  }, [filters, pathname, router])

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts()
  }, [debouncedSearch, filters.collections, filters.sizes, filters.colors, filters.priceRange, filters.inStock])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      // Build GROQ query with filters
      let query = `*[_type == "product" && defined(slug.current)`
      
      // Search filter
      if (debouncedSearch) {
        query += ` && (name match "*${debouncedSearch}*" || description match "*${debouncedSearch}*")`
      }
      
      // Collection filter
      if (filters.collections.length > 0) {
        query += ` && references(*[_type == "collection" && slug.current in $collections]._id)`
      }
      
      // Price filter
      query += ` && price >= $minPrice && price <= $maxPrice`
      
      // Stock filter
      if (filters.inStock) {
        query += ` && count(variants[stock > 0 && isActive == true]) > 0`
      }
      
      query += `] | order(name asc) {
        _id,
        name,
        slug,
        price,
        compareAtPrice,
        images,
        badges,
        collections[]->{ title },
        variants[]{
          _id,
          size,
          color,
          stock,
          isActive,
          priceOverride
        }
      }`
      
      // Count query
      const countQuery = query.replace('| order(name asc) {', '| count')
      
      const [productsData, count] = await Promise.all([
        fetch('/api/products?' + new URLSearchParams({
          query,
          collections: filters.collections.join(','),
          minPrice: filters.priceRange[0].toString(),
          maxPrice: filters.priceRange[1].toString()
        })).then(res => res.json()),
        fetch('/api/products?' + new URLSearchParams({
          query: countQuery,
          collections: filters.collections.join(','),
          minPrice: filters.priceRange[0].toString(),
          maxPrice: filters.priceRange[1].toString()
        })).then(res => res.json())
      ])

      // Apply size and color filters client-side for better performance
      let filteredProducts = productsData
      
      if (filters.sizes.length > 0) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.variants?.some((v: any) => filters.sizes.includes(v.size))
        )
      }
      
      if (filters.colors.length > 0) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.variants?.some((v: any) => filters.colors.includes(v.color))
        )
      }

      setProducts(filteredProducts)
      setTotalCount(count)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev[key]) && prev[key].includes(value)
        ? (prev[key] as string[]).filter((v: string) => v !== value)
        : [...(Array.isArray(prev[key]) ? prev[key] : []), value]
    }))
  }

  const clearFilters = () => {
    setFilters({
      collections: [],
      sizes: [],
      colors: [],
      priceRange: [0, 1000],
      inStock: false,
      search: ''
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : Boolean(value)
  )

  return (
    <div className="space-y-8">
      {/* Search and Filter Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white"
          >
            <Filter size={16} className="mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge className="ml-2 bg-brand-maroon text-white">
                {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : Boolean(v)).length}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline" className="border-gray-300">
              <X size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Collections */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Collections</h3>
                <div className="space-y-2">
                  {initialCollections.map((collection) => (
                    <label key={collection._id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.collections.includes(collection.slug.current)}
                        onChange={() => toggleFilter('collections', collection.slug.current)}
                        className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                      />
                      <span className="ml-2 text-sm text-gray-700">{collection.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sizes</h3>
                <div className="space-y-2">
                  {initialSizes.map((size) => (
                    <label key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={() => toggleFilter('sizes', size)}
                        className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                      />
                      <span className="ml-2 text-sm text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Colors</h3>
                <div className="space-y-2">
                  {initialColors.map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color)}
                        onChange={() => toggleFilter('colors', color)}
                        className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range & Stock */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>£{filters.priceRange[0]}</span>
                      <span>£{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => updateFilter('inStock', e.target.checked)}
                      className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {loading ? 'Loading...' : `${totalCount} product${totalCount !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-brand-maroon/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-brand-maroon text-4xl">🔍</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <Button onClick={clearFilters} className="bg-brand-maroon hover:bg-brand-maroon/90 text-white">
            Clear All Filters
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
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
                        src={urlForImage(product.images[0])}
                        alt={`${product.name} - ${product.collections?.[0]?.title || 'Abaya'}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={index < 4}
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

                {/* Collection */}
                {product.collections && product.collections.length > 0 && (
                  <p className="text-xs text-gray-500 mb-3">
                    {product.collections[0].title}
                  </p>
                )}

                {/* Variant Info */}
                {product.variants && product.variants.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {product.variants.slice(0, 3).map((variant: any) => (
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
  )
}

