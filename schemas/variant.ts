export default {
  name: 'variant',
  title: 'Product Variant',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(50)
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: '52', value: '52'},
          {title: '54', value: '54'},
          {title: '56', value: '56'},
          {title: '58', value: '58'},
          {title: '60', value: '60'},
          {title: '62', value: '62'},
          {title: '64', value: '64'},
          {title: '66', value: '66'},
          {title: '68', value: '68'},
          {title: '70', value: '70'}
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: [{type: 'color'}],
      validation: (Rule: any) => Rule.required(),
      description: 'Select an existing color or create a new one'
    },
    {
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      initialValue: 0,
      validation: (Rule: any) => Rule.required().min(0).integer()
    },
    {
      name: 'priceOverride',
      title: 'Price Override (GBP)',
      type: 'number',
      description: 'Optional price override for this variant. Leave empty to use product base price.',
      validation: (Rule: any) => Rule.min(0).precision(2)
    },
    {
      name: 'image',
      title: 'Variant Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Optional specific image for this variant'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this variant is available for purchase'
    }
  ],
  preview: {
    select: {
      title: 'sku',
      product: 'product.name',
      size: 'size',
      color: 'color.name',
      stock: 'stock'
    },
    prepare(selection: any) {
      const {title, product, size, color, stock} = selection
      return {
        title: `${product} - ${size} (${color})`,
        subtitle: `SKU: ${title} | Stock: ${stock}`,
        media: selection.image
      }
    }
  }
}

