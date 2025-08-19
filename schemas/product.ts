export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required().min(10)
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required().min(1).max(10)
    },
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'collection'}]}],
      description: 'Optional: Add this product to one or more collections',
      validation: (Rule: any) => Rule.optional()
    },
    {
      name: 'price',
      title: 'Base Price (GBP)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0).precision(2)
    },
    {
      name: 'compareAtPrice',
      title: 'Compare At Price (GBP)',
      type: 'number',
      description: 'Original price for discount display',
      validation: (Rule: any) => Rule.min(0).precision(2)
    },
    {
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'New Arrival', value: 'new-arrival'},
          {title: 'Best Seller', value: 'best-seller'},
          {title: 'Limited Edition', value: 'limited-edition'},
          {title: 'Sale', value: 'sale'},
          {title: 'Featured', value: 'featured'},
          {title: 'Trending', value: 'trending'}
        ]
      }
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this product is visible on the website'
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Display prominently on homepage'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      readOnly: true
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      readOnly: true,
      description: 'Automatically updated by Sanity'
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      readOnly: false,
      description: 'Manually updated when you make changes'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      collections: 'collections.0.title',
      price: 'price',
      active: 'isActive'
    },
    prepare(selection: any) {
      const {title, media, collections, price, active} = selection
      return {
        title: `${title}${!active ? ' (Inactive)' : ''}`,
        subtitle: `${collections ? collections : 'No Collection'} • £${price?.toFixed(2) || '0.00'}`,
        media
      }
    }
  }
}
