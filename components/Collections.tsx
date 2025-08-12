'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SanityCollection } from '../app/lib/sanity.server'
import { urlForImage } from '../lib/sanity.image'

interface CollectionsProps {
  collections: SanityCollection[]
}

export default function Collections({ collections }: CollectionsProps) {
  if (!collections || collections.length === 0) {
    return null
  }



  // Get the first two collections for display
  const displayCollections = collections.slice(0, 2)

  return (
    <section className="section-padding bg-gradient-to-br from-brand-cream to-brand-peach">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-4">
            EXPLORE COLLECTIONS
          </h2>
          <p className="text-lg text-brand-dark max-w-2xl mx-auto">
            Discover our curated collections, each designed with a unique vision and purpose.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayCollections.map((collection, index) => (
            <motion.div
              key={collection._id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="relative aspect-[16/9] bg-white rounded-lg shadow-elegant overflow-hidden">
                {/* Collection image or placeholder */}
                {collection.heroImage && collection.heroImage.asset ? (
                  <>
                    <div className="relative w-full h-full">
                      <Image
                        src={urlForImage(collection.heroImage, 800, 450)}
                        alt={`${collection.title} collection`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}

                      />
                    </div>
                  </>
                ) : collection.heroImage ? (
                  <>
                    <div className="relative w-full h-full">
                      <Image
                        src={urlForImage(collection.heroImage, 800, 450)}
                        alt={`${collection.title} collection`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}

                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-maroon/10 to-brand-burgundy/10">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-brand-maroon/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-brand-maroon text-4xl">👗</span>
                      </div>
                      <p className="text-brand-maroon font-medium text-lg">{collection.title}</p>
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl lg:text-3xl font-serif mb-2 group-hover:text-brand-peach transition-colors">
                    {collection.title}
                  </h3>
                  {collection.description && (
                    <p className="text-sm lg:text-base mb-3 opacity-90">
                      {collection.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-75">
                      {collection.productCount} products
                    </span>
                    <span className="text-brand-peach font-medium group-hover:text-white transition-colors">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Collections Button */}
        {collections.length > 2 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a 
              href="/collections" 
              className="btn-primary inline-block"
            >
              View All Collections
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
} 