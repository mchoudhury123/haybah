import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!, // You'll need to create this token
  useCdn: false
})

const initialColors = [
  { name: 'Black', hexCode: '#000000', category: 'dark', sortOrder: 1 },
  { name: 'Navy Blue', hexCode: '#1a365d', category: 'dark', sortOrder: 2 },
  { name: 'Burgundy', hexCode: '#8b0000', category: 'warm', sortOrder: 3 },
  { name: 'Brown', hexCode: '#8b4513', category: 'warm', sortOrder: 4 },
  { name: 'Gray', hexCode: '#808080', category: 'neutral', sortOrder: 5 },
  { name: 'Beige', hexCode: '#f5f5dc', category: 'light', sortOrder: 6 },
  { name: 'White', hexCode: '#ffffff', category: 'light', sortOrder: 7 },
  { name: 'Cream', hexCode: '#fffdd0', category: 'light', sortOrder: 8 },
  { name: 'Charcoal', hexCode: '#36454f', category: 'dark', sortOrder: 9 },
  { name: 'Olive', hexCode: '#808000', category: 'neutral', sortOrder: 10 },
  { name: 'Taupe', hexCode: '#483c32', category: 'neutral', sortOrder: 11 },
  { name: 'Blush', hexCode: '#ffb3ba', category: 'warm', sortOrder: 12 },
  { name: 'Sage', hexCode: '#9ca984', category: 'cool', sortOrder: 13 },
  { name: 'Terracotta', hexCode: '#e2725b', category: 'warm', sortOrder: 14 },
  { name: 'Slate', hexCode: '#708090', category: 'cool', sortOrder: 15 }
]

async function seedColors() {
  console.log('🌱 Seeding colors...')
  
  for (const colorData of initialColors) {
    try {
      // Check if color already exists
      const existingColor = await client.fetch(
        `*[_type == "color" && name == $name][0]`,
        { name: colorData.name }
      )
      
      if (existingColor) {
        console.log(`✅ Color "${colorData.name}" already exists`)
        continue
      }
      
      // Create new color
      const color = await client.create({
        _type: 'color',
        ...colorData,
        slug: {
          _type: 'slug',
          current: colorData.name.toLowerCase().replace(/\s+/g, '-')
        }
      })
      
      console.log(`✅ Created color: ${colorData.name}`)
    } catch (error) {
      console.error(`❌ Error creating color "${colorData.name}":`, error)
    }
  }
  
  console.log('🎨 Color seeding complete!')
}

// Run the seeding function
seedColors().catch(console.error)
