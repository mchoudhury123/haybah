import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct, getProductsByCollection, getProducts } from '@/app/lib/sanity.server'
import ProductClient from './ProductClient'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.slug)
    
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.'
      }
    }

    return {
      title: `${product.name} - Habyah Collections`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images?.map((img: any) => img.asset?.url || img) || [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Product - Habyah Collections',
      description: 'Product details'
    }
  }
}

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((product) => ({
      slug: product.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export const revalidate = 60

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    console.log('=== PRODUCT PAGE DEBUG ===')
    console.log('Loading product with slug:', params.slug)
    
    // Test the query directly
    const product = await getProduct(params.slug)
    
    console.log('Raw product data:', product)
    console.log('Product type:', typeof product)
    console.log('Product keys:', product ? Object.keys(product) : 'No product')
    
    if (!product) {
      console.log('Product not found, redirecting to not-found')
      notFound()
    }

    console.log('Product loaded successfully:', {
      name: product.name,
      variants: product.variants?.length || 0,
      images: product.images?.length || 0,
      price: product.price,
      isActive: product.isActive
    })

    // Ensure variants exist and are properly loaded
    if (!product.variants || product.variants.length === 0) {
      console.warn(`Product ${product.name} has no variants loaded`)
    }

    // Get related products from the same collection
    let relatedProducts: any[] = []
    try {
      relatedProducts = await getProductsByCollection(
        product.collections?.[0]?.slug?.current || '',
        3,
        product._id
      )
      console.log('Related products loaded:', relatedProducts.length)
    } catch (error: any) {
      console.warn('Failed to load related products:', error)
    }

    // Calculate discount percentage
    const discountPercentage = product.compareAtPrice && product.price 
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0

    console.log('Rendering ProductClient with:', {
      productName: product.name,
      variantsCount: product.variants?.length || 0,
      relatedProductsCount: relatedProducts.length,
      discountPercentage
    })

    return (
      <ProductClient 
        product={product}
        relatedProducts={relatedProducts}
        discountPercentage={discountPercentage}
      />
    )
  } catch (error: any) {
    console.error('=== CRITICAL ERROR IN PRODUCT PAGE ===')
    console.error('Error loading product:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      params: params
    })
    
    // Return a simple error page instead of notFound() to see what's happening
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <h1 className="text-4xl text-brand-maroon">Error Loading Product</h1>
          <p className="text-gray-600">
            There was an error loading the product: {params.slug}
          </p>
          <p className="text-sm text-red-500">
            Check the browser console for details
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
}
