// GROQ queries for server-side data fetching

export const allFeaturedProducts = `
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
    "variants": *[_type == "variant" && references(^._id) && isActive == true] {
      _id,
      sku,
      size,
      "color": color->name,
      "colorSlug": color->slug.current,
      "hexCode": color->hexCode,
      stock,
      priceOverride,
      image,
      isActive
    }
  }
`

export const productBySlug = `
  *[_type == "product" && slug.current == $slug && isActive == true] {
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
    "variants": *[_type == "variant" && references(^._id) && isActive == true] {
      _id,
      sku,
      size,
      "color": color->name,
      "colorSlug": color->slug.current,
      "hexCode": color->hexCode,
      stock,
      priceOverride,
      image,
      isActive
    }
  }[0]
`

export const collectionsWithCounts = `
  *[_type == "collection" && isActive == true] | order(sortOrder asc, title asc) {
    _id,
    title,
    slug,
    description,
    heroImage,
    isActive,
    sortOrder,
    "productCount": count(*[_type == "product" && isActive == true && references(^._id)])
  }
`

export const productsByCollection = `
  *[_type == "product" && isActive == true && $collectionSlug in collections[]->slug.current && (_id != $excludeId || !defined($excludeId))] | order(createdAt desc) [0...$limit] {
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
    updatedAt
  }
`

export const allProducts = `
  *[_type == "product" && isActive == true] | order(createdAt desc) {
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
    updatedAt
  }
`
