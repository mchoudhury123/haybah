export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this collection is visible on the website'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which collections appear'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      active: 'isActive'
    },
    prepare(selection: any) {
      const {title, media, active} = selection
      return {
        title: `${title}${!active ? ' (Inactive)' : ''}`,
        subtitle: active ? 'Active Collection' : 'Inactive Collection',
        media
      }
    }
  }
}

