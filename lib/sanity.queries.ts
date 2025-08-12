import { client } from './sanity'

export interface SanityCollection {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  heroImage?: any
  isActive: boolean
  sortOrder: number
}

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
  collections: SanityCollection[]
  price: number
  compareAtPrice?: number
  badges: string[]
  isActive: boolean
  featured: boolean
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface SanityVariant {
  _id: string
  product: { _ref: string }
  sku: string
  size: string
  color: string
  stock: number
  priceOverride?: number
  image?: any
  isActive: boolean
}

export interface SanityReview {
  _id: string
  productRef: { _ref: string }
  name: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
}

export interface ProductWithVariants extends SanityProduct {
  variants: SanityVariant[]
}

export interface ProductWithReviews extends SanityProduct {
  variants: SanityVariant[]
  reviews: SanityReview[]
  averageRating: number
  reviewCount: number
}

// Fetch all collections
export async function getAllCollections(): Promise<SanityCollection[]> {
  return client.fetch(`
    *[_type == "collection" && isActive == true] | order(sortOrder asc, title asc) {
      _id,
      title,
      slug,
      description,
      heroImage,
      isActive,
      sortOrder
    }
  `)
}

// Fetch all products
export async function getAllProducts(): Promise<SanityProduct[]> {
  return client.fetch(`
    *[_type == "product" && isActive == true] | order(createdAt desc) {
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
      updatedAt
    }
  `)
}

// Fetch featured products with variants
export async function getFeaturedProducts(): Promise<ProductWithVariants[]> {
  return client.fetch(`
    *[_type == "product" && isActive == true && featured == true] | order(createdAt desc) {
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
      "variants": *[_type == "variant" && product == ^._id && isActive == true] {
        _id,
        sku,
        size,
        color,
        stock,
        priceOverride,
        image,
        isActive
      }
    }
  `)
}

// Fetch products by collection
export async function getProductsByCollection(collectionSlug: string): Promise<SanityProduct[]> {
  return client.fetch(`
    *[_type == "product" && isActive == true && $collectionSlug in collections[]->slug.current] | order(createdAt desc) {
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
      updatedAt
    }
  `, { collectionSlug })
}

// Fetch single product by slug with variants
export async function getProductBySlug(slug: string): Promise<ProductWithVariants | null> {
  const products = await client.fetch(`
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
      "variants": *[_type == "variant" && product == ^._id && isActive == true] {
        _id,
        sku,
        size,
        color,
        stock,
        priceOverride,
        image,
        isActive
      }
    }
  `, { slug })
  
  return products[0] || null
}

// Fetch products with badges
export async function getProductsByBadge(badge: string): Promise<SanityProduct[]> {
  return client.fetch(`
    *[_type == "product" && isActive == true && $badge in badges] | order(createdAt desc) {
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
      updatedAt
    }
  `, { badge })
}

// Fetch single product by slug with variants and reviews
export async function getProductBySlugWithReviews(slug: string): Promise<ProductWithReviews | null> {
  const products = await client.fetch(`
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
      "variants": *[_type == "variant" && product == ^._id && isActive == true] {
        _id,
        sku,
        size,
        color,
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
      "averageRating": avg(*[_type == "review" && productRef == ^._id && isApproved == true].rating),
      "reviewCount": count(*[_type == "review" && productRef == ^._id && isApproved == true])
    }
  `, { slug })
  
  return products[0] || null
}

// Fetch reviews for a product
export async function getProductReviews(productId: string): Promise<SanityReview[]> {
  return client.fetch(`
    *[_type == "review" && productRef == $productId && isApproved == true] | order(createdAt desc) {
      _id,
      name,
      rating,
      comment,
      createdAt
    }
  `, { productId })
}

// Fetch average rating for a product
export async function getProductRating(productId: string): Promise<{ averageRating: number; reviewCount: number }> {
  const result = await client.fetch(`
    {
      "averageRating": avg(*[_type == "review" && productRef == $productId && isApproved == true].rating),
      "reviewCount": count(*[_type == "review" && productRef == $productId && isApproved == true])
    }
  `, { productId })
  
  return {
    averageRating: result.averageRating || 0,
    reviewCount: result.reviewCount || 0
  }
}
