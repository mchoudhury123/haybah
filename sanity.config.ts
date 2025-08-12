import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Haybah Collections',
  projectId: process.env.SANITY_PROJECT_ID || 'gnppn7qx',
  dataset: process.env.SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})
