import { client } from '../../lib/sanity'
import { 
  allFeaturedProducts, 
  productBySlug, 
  collectionsWithCounts,
  productsByCollection,
  allProducts
} from './queries'

// Types for server-side data
export interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  description: string
  images: Array<{
    _key: string
    asset: {
      _ref: string
      _type: 'reference'
    }
    metadata?: {
      blurHash?: string
      dimensions?: {
        width: number
        height: number
      }
    }
  }>
  collections: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
  price: number
  compareAtPrice?: number
  badges: string[]
  isActive: boolean
  featured: boolean
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface SanityProductWithVariants extends SanityProduct {
  variants: Array<{
    _id: string
    sku: string
    size: string
    color: string
    stock: number
    priceOverride?: number
    image?: any
    isActive: boolean
  }>
}

export interface SanityCollection {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  heroImage?: any
  isActive: boolean
  sortOrder: number
  productCount: number
}

// Server-side data fetching functions with ISR support

export async function getFeaturedProducts(): Promise<SanityProductWithVariants[]> {
  try {
    return await client.fetch(allFeaturedProducts)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export async function getProduct(slug: string): Promise<SanityProductWithVariants | null> {
  try {
    const result = await client.fetch(productBySlug, { slug })
    console.log('getProduct result:', result)
    return result
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error)
    return null
  }
}

export async function getProductBySlugWithReviews(slug: string): Promise<any> {
  try {
    return await client.fetch(`
      *[_type == "product" && slug.current == $slug && isActive == true] {
        _id,
        name,
        slug,
        description,
        images,
        collections[]->{
          _id,
          title,
          slug
        },
        price,
        compareAtPrice,
        badges,
        isActive,
        featured,
        tags,
        createdAt,
        updatedAt,
        "variants": *[_type == "variant" && references(^._id) && isActive == true] {
          _id,
          sku,
          size,
          "color": color->name,
          "colorSlug": color->slug.current,
          "hexCode": color->hexCode,
          stock,
          priceOverride,
          image,
          isActive
        },
        "reviews": *[_type == "review" && productRef == ^._id && isApproved == true] | order(createdAt desc) {
          _id,
          name,
          rating,
          comment,
          createdAt
        },
        "averageRating": 0,
        "reviewCount": count(*[_type == "review" && productRef == ^._id && isApproved == true])
      }
    `, { slug })
  } catch (error) {
    console.error(`Error fetching product with reviews ${slug}:`, error)
    return null
  }
}

export async function getProducts(): Promise<SanityProduct[]> {
  try {
    return await client.fetch(allProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getCollections(): Promise<SanityCollection[]> {
  try {
    return await client.fetch(collectionsWithCounts)
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export async function getProductsByCollection(
  collectionSlug: string, 
  limit?: number, 
  excludeId?: string
): Promise<SanityProduct[]> {
  try {
    let query = productsByCollection
    let params: any = { collectionSlug }
    
    if (limit) {
      params.limit = limit
    }
    
    if (excludeId) {
      params.excludeId = excludeId
    }
    
    return await client.fetch(query, params)
  } catch (error) {
    console.error(`Error fetching products for collection ${collectionSlug}:`, error)
    return []
  }
}

// ISR revalidation helpers
export function getRevalidateTime(type: 'product' | 'collection' | 'list' = 'list'): number {
  switch (type) {
    case 'product':
      return 60 // 60 seconds for product detail pages
    case 'collection':
      return 60 // 60 seconds for collection pages
    default:
      return 60 // 60 seconds for product list pages
  }
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  try {
    const products = await getProducts()
    const collections = await getCollections()
    
    const productParams = products.map((product) => ({
      slug: product.slug.current,
    }))
    
    const collectionParams = collections.map((collection) => ({
      slug: collection.slug.current,
    }))
    
    return {
      products: productParams,
      collections: collectionParams,
    }
  } catch (error) {
    console.error('Error generating static params:', error)
    return { products: [], collections: [] }
  }
}
