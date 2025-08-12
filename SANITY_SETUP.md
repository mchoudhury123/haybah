# Sanity CMS Setup Guide

## Overview
Your Haybah Collections project now includes a complete Sanity CMS setup with:
- **Collections**: Organize products into categories
- **Products**: Full product management with images, pricing, and badges
- **Variants**: Size, color, and stock management for each product
- **Seed Script**: Pre-populate your CMS with sample data

## File Structure

### Core Files
```
lib/
├── sanity.ts              # Sanity client configuration
├── sanity.queries.ts      # GROQ queries and TypeScript interfaces
└── sanity.image.ts        # Image URL generation utilities

schemas/
├── index.ts               # Schema exports
├── collection.ts          # Collection schema
├── product.ts             # Product schema
└── variant.ts             # Product variant schema

scripts/
└── seed-products.ts       # Seed script for sample data
```

### Configuration
```
sanity.config.ts           # Sanity Studio configuration
.env.local                 # Environment variables
```

## Schema Details

### Collection Schema
- **title**: Collection name (required)
- **slug**: URL-friendly identifier (auto-generated)
- **heroImage**: Featured image for the collection
- **description**: Collection description
- **isActive**: Whether collection is visible
- **sortOrder**: Display order

### Product Schema
- **name**: Product name (required)
- **slug**: URL-friendly identifier (auto-generated)
- **description**: Product description (required, min 10 chars)
- **images**: Array of product images (required, 1-10 images)
- **collections**: References to collection documents (required)
- **price**: Base price in GBP (required, min 0)
- **compareAtPrice**: Original price for discount display
- **badges**: Array of product badges (new-arrival, best-seller, etc.)
- **isActive**: Whether product is visible
- **featured**: Display prominently on homepage
- **tags**: Searchable product tags
- **createdAt/updatedAt**: Timestamps (auto-generated)

### Variant Schema
- **product**: Reference to parent product (required)
- **sku**: Stock keeping unit (required, max 50 chars)
- **size**: Product size (52-70, required)
- **color**: Product color (black, navy, burgundy, etc., required)
- **stock**: Available quantity (required, min 0)
- **priceOverride**: Optional price override for variant
- **image**: Optional variant-specific image
- **isActive**: Whether variant is available

## Available Badges
- `new-arrival`: Recently added products
- `best-seller`: Popular products
- `limited-edition`: Exclusive items
- `sale`: Discounted products
- `featured`: Homepage highlights
- `trending`: Currently popular

## Available Colors
- Black, Navy, Burgundy, Brown, Gray, Beige, White, Cream

## Available Sizes
- 52, 54, 56, 58, 60, 62, 64, 66, 68, 70

## GROQ Queries

### Featured Products with Variants
```groq
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
```

### Products by Collection
```groq
*[_type == "product" && isActive == true && $collectionSlug in collections[]->slug.current] | order(createdAt desc)
```

### Products by Badge
```groq
*[_type == "product" && isActive == true && $badge in badges] | order(createdAt desc)
```

## Seeding Your Database

### Prerequisites
1. Ensure `SANITY_WRITE_TOKEN` is set in `.env.local`
2. Your Sanity project is accessible
3. Development server is running

### Run Seed Script
```bash
npm run seed
```

### What Gets Created
- **5 Collections**: Prestige, Dignity, Fashion, Classic, Evening
- **10 Products**: Sample Abayas with realistic descriptions and pricing
- **600 Variants**: All size/color combinations with random stock levels

### Sample Products
1. **Prestige Royal Abaya** - £299.99 (Featured, Limited Edition)
2. **Dignity Grace Abaya** - £189.99 (Best Seller, Trending)
3. **Fashion Forward Abaya** - £159.99 (New Arrival, Trending)
4. **Classic Comfort Abaya** - £129.99 (Best Seller)
5. **Evening Elegance Abaya** - £349.99 (Featured, Limited Edition)
6. **Prestige Heritage Abaya** - £279.99 (Featured)
7. **Dignity Serenity Abaya** - £169.99 (Trending)
8. **Fashion Edge Abaya** - £199.99 (New Arrival)
9. **Classic Heritage Abaya** - £149.99 (Best Seller)
10. **Evening Star Abaya** - £399.99 (Featured, Limited Edition)

## Image Management

### Image Metadata
The schema includes support for:
- **Blur Hash**: For blur placeholders during loading
- **Dimensions**: Width and height for responsive images
- **Hotspot**: Focus points for image cropping

### Image URL Generation
```typescript
import { urlForProduct, urlForThumbnail } from '../lib/sanity.image'

// Product image (500x700)
const productImage = urlForProduct(product.images[0])

// Thumbnail (300x400)
const thumbnail = urlForThumbnail(product.images[0])
```

## Validation Rules

### Price Validation
- All prices must be positive numbers
- Precision limited to 2 decimal places
- Prices stored in GBP

### Stock Validation
- Stock quantities must be integers ≥ 0
- No negative stock allowed

### Required Fields
- Product: name, description, images, collections, price
- Variant: product reference, SKU, size, color, stock
- Collection: title

## Next Steps

### 1. Access Sanity Studio
Navigate to `http://localhost:3000/studio` to manage your content.

### 2. Upload Product Images
Replace placeholder images with actual product photos.

### 3. Customize Collections
Modify collection descriptions and add hero images.

### 4. Add Real Products
Use the seed data as a template for your actual inventory.

### 5. Integrate with Frontend
Use the provided queries to display products on your website.

## Troubleshooting

### Common Issues
1. **"Configuration must contain projectId"**: Check `.env.local` file
2. **Write permission denied**: Ensure `SANITY_WRITE_TOKEN` is set
3. **Build errors**: Run `npm run build` to check for TypeScript errors

### Environment Variables
Ensure these are set in `.env.local`:
```
SANITY_PROJECT_ID=gnppn7qx
SANITY_DATASET=production
SANITY_API_VERSION=2024-07-01
SANITY_READ_TOKEN=your_read_token
SANITY_WRITE_TOKEN=your_write_token
```

## Support
- **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **GROQ Query Language**: [sanity.io/docs/groq](https://sanity.io/docs/groq)
- **Image Assets**: [sanity.io/docs/image-assets](https://sanity.io/docs/image-assets)

