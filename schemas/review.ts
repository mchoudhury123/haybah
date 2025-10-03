export default {
  name: 'review',
  title: 'Product Review',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'The product this review is for',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'productId',
      title: 'Product ID',
      type: 'string',
      description: 'The ID of the product this review is for',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'productSlug',
      title: 'Product Slug',
      type: 'string',
      description: 'The slug of the product for easy querying',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(100)
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5).integer()
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(10).max(500)
    },
    {
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending Approval', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'}
        ]
      },
      initialValue: 'pending',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes for admin use (not visible to customers)',
      validation: (Rule: any) => Rule.max(500)
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'approvedAt',
      title: 'Approved At',
      type: 'datetime',
      description: 'When the review was approved by admin'
    },
    {
      name: 'approvedBy',
      title: 'Approved By',
      type: 'string',
      description: 'Admin who approved the review'
    }
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'productSlug',
      status: 'status',
      rating: 'rating'
    },
    prepare(selection: any) {
      const {title, subtitle, status, rating} = selection
      
      // Handle potential undefined values
      const customerName = title || 'Unknown Customer'
      const productSlug = subtitle || 'Unknown Product'
      const reviewStatus = status || 'pending'
      const reviewRating = rating || 0
      
      return {
        title: `${customerName} - ${productSlug}`,
        subtitle: `Rating: ${reviewRating}/5 | Status: ${reviewStatus}`,
        media: reviewStatus === 'approved' ? '✅' : reviewStatus === 'rejected' ? '❌' : '⏳'
      }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{field: 'createdAt', direction: 'desc'}]
    },
    {
      title: 'Oldest First', 
      name: 'oldestFirst',
      by: [{field: 'createdAt', direction: 'asc'}]
    },
    {
      title: 'Status',
      name: 'statusOrder',
      by: [{field: 'status', direction: 'asc'}]
    }
  ]
}
