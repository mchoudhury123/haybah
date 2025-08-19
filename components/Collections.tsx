'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Collections() {
  const staticCollections = [
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      description: 'Discover the latest additions to our collection, featuring fresh designs and trending styles.',
      image: '/new-arrivals.png',
      productCount: 'Latest Styles',
      link: '/shop?collections=new-arrivals'
    },
    {
      id: 'best-sellers',
      title: 'Best Sellers',
      description: 'Our most popular pieces loved by customers worldwide, combining style and comfort.',
      image: '/best-sellers.png',
      productCount: 'Customer Favorites',
      link: '/shop?collections=best-sellers'
    }
  ]

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
            SHOP BY CATEGORY
          </h2>
          <p className="text-lg text-brand-dark max-w-2xl mx-auto">
            Explore our curated categories to find exactly what you're looking for.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {staticCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <a href={collection.link}>
                <div className="relative aspect-[16/9] bg-white rounded-lg shadow-elegant overflow-hidden">
                  {/* Collection image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={collection.image}
                      alt={`${collection.title} category`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl lg:text-3xl font-serif mb-2 group-hover:text-brand-peach transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-sm lg:text-base mb-3 opacity-90">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-75">
                        {collection.productCount}
                      </span>
                      <span className="text-brand-peach font-medium group-hover:text-white transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Shop All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a 
            href="/shop" 
            className="btn-primary inline-block"
          >
            Shop All Products
          </a>
        </motion.div>
      </div>
    </section>
  )
} 