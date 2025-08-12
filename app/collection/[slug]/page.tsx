import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import CollectionClient from './CollectionClient'

interface CollectionPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const collection = await client.fetch(
    `*[_type == "collection" && slug.current == $slug][0] {
      title,
      description,
      heroImage
    }`,
    { slug: params.slug }
  )

  if (!collection) {
    return {
      title: 'Collection Not Found',
      description: 'The requested collection could not be found.'
    }
  }

  return {
    title: `${collection.title} - Haybah Collections`,
    description: collection.description || `Explore our ${collection.title} collection of premium Abayas.`
  }
}

export async function generateStaticParams() {
  const collections = await client.fetch(
    `*[_type == "collection"] {
      slug
    }`
  )

  return collections.map((collection: any) => ({
    slug: collection.slug.current,
  }))
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = await client.fetch(
    `*[_type == "collection" && slug.current == $slug][0] {
      _id,
      title,
      description,
      heroImage,
      products[]->{
        _id,
        name,
        slug,
        price,
        compareAtPrice,
        images,
        badges,
        variants[]{
          _id,
          size,
          color,
          stock,
          isActive
        }
      }
    }`,
    { slug: params.slug }
  )

  if (!collection) {
    notFound()
  }

  const products = collection.products || []

  return <CollectionClient collection={collection} products={products} />
}
