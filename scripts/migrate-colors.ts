import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!, // You'll need to create this token
  useCdn: false
})

async function migrateColors() {
  console.log('🔄 Starting color migration...')
  
  try {
    // First, create basic colors if they don't exist
    const basicColors = [
      { name: 'Black', hexCode: '#000000', category: 'dark', sortOrder: 1 },
      { name: 'Navy', hexCode: '#1a365d', category: 'dark', sortOrder: 2 },
      { name: 'Burgundy', hexCode: '#8b0000', category: 'warm', sortOrder: 3 },
      { name: 'Brown', hexCode: '#8b4513', category: 'warm', sortOrder: 4 },
      { name: 'Gray', hexCode: '#808080', category: 'neutral', sortOrder: 5 },
      { name: 'Beige', hexCode: '#f5f5dc', category: 'light', sortOrder: 6 },
      { name: 'White', hexCode: '#ffffff', category: 'light', sortOrder: 7 },
      { name: 'Cream', hexCode: '#fffdd0', category: 'light', sortOrder: 8 }
    ]
    
    const colorMap = new Map()
    
    for (const colorData of basicColors) {
      try {
        // Check if color already exists
        let existingColor = await client.fetch(
          `*[_type == "color" && name == $name][0]`,
          { name: colorData.name }
        )
        
        if (!existingColor) {
          // Create new color
          existingColor = await client.create({
            _type: 'color',
            ...colorData,
            slug: {
              _type: 'slug',
              current: colorData.name.toLowerCase().replace(/\s+/g, '-')
            }
          })
          console.log(`✅ Created color: ${colorData.name}`)
        } else {
          console.log(`ℹ️ Color already exists: ${colorData.name}`)
        }
        
        colorMap.set(colorData.name.toLowerCase(), existingColor._id)
      } catch (error) {
        console.error(`❌ Error with color "${colorData.name}":`, error)
      }
    }
    
    // Now find variants with string colors and update them
    const variantsWithStringColors = await client.fetch(`
      *[_type == "variant" && typeof(color) == "string"]
    `)
    
    console.log(`📦 Found ${variantsWithStringColors.length} variants with string colors`)
    
    for (const variant of variantsWithStringColors) {
      try {
        const colorName = variant.color
        const colorId = colorMap.get(colorName.toLowerCase())
        
        if (colorId) {
          // Update variant to use color reference
          await client.patch(variant._id)
            .set({
              color: {
                _type: 'reference',
                _ref: colorId
              }
            })
            .commit()
          
          console.log(`✅ Updated variant ${variant.sku} to use color reference: ${colorName}`)
        } else {
          console.log(`⚠️ No color found for: ${colorName} in variant ${variant.sku}`)
        }
      } catch (error) {
        console.error(`❌ Error updating variant ${variant.sku}:`, error)
      }
    }
    
    console.log('🎉 Color migration complete!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run the migration
migrateColors().catch(console.error)
