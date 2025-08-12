export default {
  name: 'inventory_movement',
  title: 'Inventory Movement',
  type: 'document',
  fields: [
    {
      name: 'variantRef',
      title: 'Variant Reference',
      type: 'reference',
      to: [{ type: 'variant' }],
      description: 'Reference to the product variant',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'qty',
      title: 'Quantity',
      type: 'number',
      description: 'Quantity moved (positive for additions, negative for sales)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'reason',
      title: 'Reason',
      type: 'string',
      description: 'Reason for the inventory movement',
      options: {
        list: [
          { title: 'Sale', value: 'sale' },
          { title: 'Purchase', value: 'purchase' },
          { title: 'Return', value: 'return' },
          { title: 'Adjustment', value: 'adjustment' },
          { title: 'Damage', value: 'damage' },
          { title: 'Transfer', value: 'transfer' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      description: 'Stripe order ID or internal order reference',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'at',
      title: 'Timestamp',
      type: 'datetime',
      description: 'When the movement occurred',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'previousStock',
      title: 'Previous Stock',
      type: 'number',
      description: 'Stock level before the movement',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'newStock',
      title: 'New Stock',
      type: 'number',
      description: 'Stock level after the movement',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      description: 'Product name for easy reference',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'variantInfo',
      title: 'Variant Information',
      type: 'string',
      description: 'Size and color information',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock keeping unit for the variant',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional notes about the movement'
    },
    {
      name: 'processedBy',
      title: 'Processed By',
      type: 'string',
      description: 'Who or what processed this movement (e.g., "stripe_webhook", "admin")',
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'productName',
      subtitle: 'variantInfo',
      reason: 'reason',
      qty: 'qty',
      at: 'at'
    },
    prepare(selection: any) {
      const { title, subtitle, reason, qty, at } = selection
      const date = new Date(at).toLocaleDateString()
      const qtyText = qty > 0 ? `+${qty}` : qty
      
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `${reason.toUpperCase()}: ${qtyText} | ${date}`,
        media: reason === 'sale' ? '🛒' : reason === 'purchase' ? '📦' : '📊'
      }
    }
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'at', direction: 'desc' }]
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{ field: 'at', direction: 'asc' }]
    }
  ]
}

