import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Log environment variables for debugging
console.log('Sanity config loading. Environment variables:', {
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  SANITY_DATASET: process.env.SANITY_DATASET,
  NODE_ENV: process.env.NODE_ENV
})

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
    types: schemaTypes as any,
  },
})
