export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'productRef',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100)
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          {title: '1 Star', value: 1},
          {title: '2 Stars', value: 2},
          {title: '3 Stars', value: 3},
          {title: '4 Stars', value: 4},
          {title: '5 Stars', value: 5}
        ]
      },
      validation: (Rule: any) => Rule.required().min(1).max(5)
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required().min(10).max(500)
    },
    {
      name: 'isApproved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this review has been approved by admin'
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      product: 'productRef.name',
      rating: 'rating',
      approved: 'isApproved'
    },
    prepare(selection: any) {
      const {title, product, rating, approved} = selection
      const stars = '⭐'.repeat(rating)
      return {
        title: `${title} - ${stars}`,
        subtitle: `${product}${!approved ? ' (Pending)' : ''}`,
        media: '⭐'
      }
    }
  }
}
