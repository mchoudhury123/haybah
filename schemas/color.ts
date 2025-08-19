export default {
  name: 'color',
  title: 'Color',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Color Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(50),
      description: 'Enter the color name (e.g., "Navy Blue", "Burgundy Red")'
    },
    {
      name: 'slug',
      title: 'Color Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Auto-generated from color name'
    },
    {
      name: 'hexCode',
      title: 'Hex Color Code',
      type: 'string',
      description: 'Optional hex color code (e.g., #1a365d)',
      validation: (Rule: any) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).warning('Please enter a valid 6-digit hex color code')
    },
    {
      name: 'category',
      title: 'Color Category',
      type: 'string',
      options: {
        list: [
          {title: 'Neutral', value: 'neutral'},
          {title: 'Warm', value: 'warm'},
          {title: 'Cool', value: 'cool'},
          {title: 'Bright', value: 'bright'},
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'}
        ]
      },
      description: 'Optional color category for organization'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this color is available for use'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which colors appear in lists'
    }
  ],
  preview: {
    select: {
      title: 'name',
      hexCode: 'hexCode',
      category: 'category'
    },
    prepare(selection: any) {
      const {title, hexCode, category} = selection
      return {
        title: title,
        subtitle: `${hexCode ? hexCode : 'No hex code'}${category ? ` • ${category}` : ''}`,
        media: hexCode ? {
          _type: 'color',
          color: hexCode
        } : undefined
      }
    }
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}]
    },
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}]
    }
  ]
}
