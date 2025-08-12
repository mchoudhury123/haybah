import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

import { writeClient } from '../lib/sanity'

// Sample data for collections
const collections = [
  {
    title: 'Prestige Collection',
    description: 'Our most luxurious and elegant Abayas, crafted with premium materials and exquisite detailing.',
    sortOrder: 1
  },
  {
    title: 'Dignity Collection',
    description: 'Timeless designs that embody grace and sophistication for the modern woman.',
    sortOrder: 2
  },
  {
    title: 'Fashion Collection',
    description: 'Contemporary styles that blend tradition with modern fashion trends.',
    sortOrder: 3
  },
  {
    title: 'Classic Collection',
    description: 'Traditional Abayas with perfect fit and comfort for everyday wear.',
    sortOrder: 4
  },
  {
    title: 'Evening Collection',
    description: 'Stunning Abayas designed for special occasions and evening events.',
    sortOrder: 5
  }
]

// Sample data for products
const products = [
  {
    name: 'Prestige Royal Abaya',
    description: 'A masterpiece of luxury craftsmanship featuring intricate embroidery, premium silk blend fabric, and a sophisticated silhouette that commands attention. Perfect for special occasions and formal events.',
    price: 299.99,
    compareAtPrice: 399.99,
    badges: ['featured', 'limited-edition'],
    featured: true,
    tags: ['luxury', 'embroidery', 'silk', 'formal']
  },
  {
    name: 'Dignity Grace Abaya',
    description: 'Elegant simplicity meets modern comfort in this beautifully tailored Abaya. Made from high-quality crepe fabric with a flattering cut that enhances your natural grace.',
    price: 189.99,
    compareAtPrice: 249.99,
    badges: ['best-seller', 'trending'],
    featured: true,
    tags: ['elegant', 'comfortable', 'crepe', 'everyday']
  },
  {
    name: 'Fashion Forward Abaya',
    description: 'Contemporary design with a modern twist, featuring asymmetrical cuts, statement sleeves, and a bold silhouette that sets you apart. Perfect for the fashion-forward woman.',
    price: 159.99,
    badges: ['new-arrival', 'trending'],
    featured: true,
    tags: ['modern', 'asymmetrical', 'statement', 'contemporary']
  },
  {
    name: 'Classic Comfort Abaya',
    description: 'Timeless design with exceptional comfort. Made from breathable cotton blend fabric, this Abaya features a relaxed fit perfect for daily wear while maintaining elegance.',
    price: 129.99,
    badges: ['best-seller'],
    featured: false,
    tags: ['comfortable', 'breathable', 'cotton', 'daily']
  },
  {
    name: 'Evening Elegance Abaya',
    description: 'Stunning evening wear featuring luxurious satin fabric, delicate beading, and a dramatic silhouette. Designed to make you shine at any special occasion.',
    price: 349.99,
    compareAtPrice: 449.99,
    badges: ['featured', 'limited-edition'],
    featured: true,
    tags: ['evening', 'satin', 'beading', 'dramatic']
  },
  {
    name: 'Prestige Heritage Abaya',
    description: 'A tribute to traditional craftsmanship with modern luxury. Features hand-stitched details, premium wool blend, and a classic silhouette that never goes out of style.',
    price: 279.99,
    badges: ['featured'],
    featured: true,
    tags: ['traditional', 'handcrafted', 'wool', 'heritage']
  },
  {
    name: 'Dignity Serenity Abaya',
    description: 'Peaceful elegance in every detail. This Abaya features a flowing design, soft drape, and gentle pleating that creates a serene and sophisticated look.',
    price: 169.99,
    badges: ['trending'],
    featured: false,
    tags: ['flowing', 'soft', 'pleated', 'serene']
  },
  {
    name: 'Fashion Edge Abaya',
    description: 'Bold and contemporary with cutting-edge design elements. Features geometric patterns, modern cuts, and a confident silhouette for the woman who leads with style.',
    price: 199.99,
    badges: ['new-arrival'],
    featured: false,
    tags: ['bold', 'geometric', 'modern', 'confident']
  },
  {
    name: 'Classic Heritage Abaya',
    description: 'Timeless beauty with traditional elements. Made from premium cotton blend with subtle embroidery details and a perfect fit that honors classic Abaya design.',
    price: 149.99,
    badges: ['best-seller'],
    featured: false,
    tags: ['traditional', 'subtle', 'classic', 'heritage']
  },
  {
    name: 'Evening Star Abaya',
    description: 'Shine like a star in this breathtaking evening Abaya. Features metallic accents, flowing chiffon, and a glamorous design that ensures all eyes are on you.',
    price: 399.99,
    compareAtPrice: 499.99,
    badges: ['featured', 'limited-edition'],
    featured: true,
    tags: ['glamorous', 'metallic', 'chiffon', 'star']
  }
]

// Size options for variants
const sizes = ['52', '54', '56', '58', '60', '62', '64', '66', '68', '70']
const colors = ['black', 'navy', 'burgundy', 'brown', 'gray', 'beige']

async function seedCollections() {
  console.log('🌱 Seeding collections...')
  
  const createdCollections = []
  
  for (const collection of collections) {
    try {
      const doc = await writeClient.create({
        _type: 'collection',
        ...collection,
        slug: {
          _type: 'slug',
          current: collection.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }
      })
      
      createdCollections.push(doc)
      console.log(`✅ Created collection: ${collection.title}`)
    } catch (error) {
      console.error(`❌ Failed to create collection ${collection.title}:`, error)
    }
  }
  
  return createdCollections
}

async function seedProducts(collections: any[]) {
  console.log('🌱 Seeding products...')
  
  const createdProducts = []
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const collectionIndex = i % collections.length
    const collection = collections[collectionIndex]
    
    try {
      const productData: any = {
        _type: 'product',
        name: product.name,
        description: product.description,
        price: product.price,
        badges: product.badges,
        featured: product.featured,
        tags: product.tags,
        slug: {
          _type: 'slug',
          current: product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        },
        collections: [{ _type: 'reference', _ref: collection._id }],
        images: [
          {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-1' // Placeholder - you'll need to upload actual images
            }
          }
        ]
      }
      
      // Only add compareAtPrice if it exists
      if (product.compareAtPrice) {
        productData.compareAtPrice = product.compareAtPrice
      }
      
      const doc = await writeClient.create(productData)
      
      createdProducts.push(doc)
      console.log(`✅ Created product: ${product.name}`)
    } catch (error) {
      console.error(`❌ Failed to create product ${product.name}:`, error)
    }
  }
  
  return createdProducts
}

async function seedVariants(products: any[]) {
  console.log('🌱 Seeding variants...')
  
  let variantCount = 0
  
  for (const product of products) {
    for (const size of sizes) {
      for (const color of colors) {
        try {
          const sku = `${product.name.substring(0, 3).toUpperCase()}-${size}-${color.toUpperCase()}`
          const stock = Math.floor(Math.random() * 20) + 5 // Random stock between 5-25
          
          await writeClient.create({
            _type: 'variant',
            product: { _type: 'reference', _ref: product._id },
            sku,
            size,
            color,
            stock,
            isActive: true
          })
          
          variantCount++
          console.log(`✅ Created variant: ${sku}`)
        } catch (error) {
          console.error(`❌ Failed to create variant for ${product.name}:`, error)
        }
      }
    }
  }
  
  return variantCount
}

async function main() {
  try {
    console.log('🚀 Starting Sanity seed process...')
    
    // Seed collections first
    const collections = await seedCollections()
    console.log(`\n📊 Created ${collections.length} collections`)
    
    // Seed products
    const products = await seedProducts(collections)
    console.log(`📊 Created ${products.length} products`)
    
    // Seed variants
    const variantCount = await seedVariants(products)
    console.log(`📊 Created ${variantCount} variants`)
    
    console.log('\n🎉 Seed process completed successfully!')
    console.log(`📈 Total: ${collections.length} collections, ${products.length} products, ${variantCount} variants`)
    
  } catch (error) {
    console.error('💥 Seed process failed:', error)
    process.exit(1)
  }
}

// Run the seed process
if (require.main === module) {
  main()
}
