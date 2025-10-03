export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string'
    },
    {
      name: 'customerInfo',
      title: 'Customer Information',
      type: 'object',
      fields: [
        { name: 'name', title: 'Full Name', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'addressLine1', title: 'Address Line 1', type: 'string' },
        { name: 'addressLine2', title: 'Address Line 2', type: 'string' },
        { name: 'addressLine3', title: 'Address Line 3', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'postcode', title: 'Postcode', type: 'string' }
      ]
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', title: 'Product ID', type: 'string' },
            { name: 'variantId', title: 'Variant ID', type: 'string' },
            { name: 'name', title: 'Product Name', type: 'string' },
            { name: 'color', title: 'Color', type: 'string' },
            { name: 'size', title: 'Size', type: 'string' },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'qty', title: 'Quantity', type: 'number' },
            { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    },
    {
      name: 'pricing',
      title: 'Pricing Details',
      type: 'object',
      fields: [
        { name: 'subtotal', title: 'Subtotal', type: 'number' },
        { name: 'shipping', title: 'Shipping Cost', type: 'number' },
        { name: 'total', title: 'Total Amount', type: 'number' }
      ]
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: '🆕 New Order', value: 'new' },
          { title: '📦 Processing', value: 'processing' },
          { title: '✅ Completed', value: 'completed' },
          { title: '❌ Cancelled', value: 'cancelled' },
          { title: '💳 Failed', value: 'failed' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: 'new'
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Succeeded', value: 'succeeded' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Normal', value: 'normal' },
          { title: '🟡 Medium', value: 'medium' },
          { title: '🔴 High', value: 'high' },
          { title: '⚡ Rush', value: 'rush' }
        ]
      },
      initialValue: 'normal'
    },
    {
      name: 'notes',
      title: 'Order Notes',
      type: 'text',
      description: 'Internal notes for order processing'
    },
    {
      name: 'emailSent',
      title: 'Confirmation Email Sent',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'orderId',
      customer: 'customerInfo.name',
      status: 'status',
      total: 'pricing.total',
      date: 'createdAt',
      priority: 'priority',
      items: 'items'
    },
    prepare(selection: any) {
      const { title, customer, status, total, date, priority, items } = selection
      
      // Format date
      const orderDate = new Date(date)
      const today = new Date()
      const isToday = orderDate.toDateString() === today.toDateString()
      const isYesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString() === orderDate.toDateString()
      
      let dateLabel = ''
      if (isToday) {
        dateLabel = '🕐 Today'
      } else if (isYesterday) {
        dateLabel = '📅 Yesterday'
      } else {
        dateLabel = `📅 ${orderDate.toLocaleDateString('en-GB')}`
      }
      
      // Get first item details for quick reference
      const firstItem = items && items[0]
      const itemInfo = firstItem ? ` | ${firstItem.name} (${firstItem.color}, ${firstItem.size})` : ''
      
      return {
        title: `${priority === 'rush' ? '⚡ ' : ''}${title}`,
        subtitle: `${customer} | £${total} | ${status} | ${dateLabel}${itemInfo}`,
        media: firstItem?.image || undefined
      }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'createdAt', direction: 'desc' }]
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: 'createdAt', direction: 'asc' }]
    },
    {
      title: 'Priority (High to Low)',
      name: 'priorityHighToLow',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: 'createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Status (New to Completed)',
      name: 'statusOrder',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'createdAt', direction: 'desc' }
      ]
    }
  ]
}
