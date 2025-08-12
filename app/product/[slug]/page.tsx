import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlugWithReviews, getProductsByCollection, getProducts } from '@/app/lib/sanity.server'
import ProductClient from './ProductClient'


interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlugWithReviews(params.slug)
  
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
      images: product.images.map((img: any) => img.asset?.url || img),
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug.current,
  }))
}

export const revalidate = 60

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlugWithReviews(params.slug)
  
  if (!product) {
    notFound()
  }

  // Get related products from the same collection
  const relatedProducts = await getProductsByCollection(
    product.collections[0]?.slug?.current || '',
    3,
    product._id
  )

  // Calculate discount percentage
  const discountPercentage = product.compareAtPrice && product.price 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <ProductClient 
      product={product}
      relatedProducts={relatedProducts}
      discountPercentage={discountPercentage}
    />
  )
}
