'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function JustLanded() {
  const products = [
    {
      id: 1,
      name: 'Amina Abaya',
      image: '/placeholder-1.jpg',
      category: 'Classic Collection'
    },
    {
      id: 2,
      name: 'Fatima Robe',
      image: '/placeholder-2.jpg',
      category: 'Luxury Line'
    },
    {
      id: 3,
      name: 'Zahra Dress',
      image: '/placeholder-3.jpg',
      category: 'Evening Wear'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-6">
              JUST LANDED
            </h2>
            <p className="text-lg text-brand-dark mb-8 leading-relaxed">
              Discover the latest additions to our best-selling Abaya collection. 
              Get the most elegant and comfortable pieces for your special occasions 
              and everyday elegance.
            </p>
            <Link href="/shop">
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SHOP NOW
              </motion.button>
            </Link>
          </motion.div>

          {/* Right side - Product grid */}
          <div className="grid grid-cols-3 gap-4">
            {products.map((product, index) => (
              <Link key={product.id} href="/shop">
                <motion.div
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  {/* Product image */}
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-brand-peach to-brand-cream rounded-lg shadow-elegant overflow-hidden">
                    {product.id === 1 ? (
                      // First product uses prestige.png image
                      <Image
                        src="/prestige.png"
                        alt={`${product.name} - ${product.category}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 33vw, 25vw"
                      />
                    ) : product.id === 2 ? (
                      // Second product uses dignity.png image
                      <Image
                        src="/dignity.png"
                        alt={`${product.name} - ${product.category}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      // Third product uses Fashion.png image
                      <Image
                        src="/Fashion.png"
                        alt={`${product.name} - ${product.category}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 33vw, 25vw"
                      />
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 