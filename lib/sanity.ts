import { createClient } from 'next-sanity'

// Temporary hardcoded configuration to bypass environment variable issues
const config = {
  projectId: 'gnppn7qx',
  dataset: 'production',
  apiVersion: '2024-07-01',
  readToken: 'sk4noDj00qit4s8TsvqMK9KXW34RF4y9IXNMvSgAU8dRnXxrkvygZaRxd8emZErT05uQInfiGv4kg8HSMEFRAjf49QRW3t7dpW25auIedGIlfTjABQWTeycGKEvuXKT3F5V7pAfrtjLp9WtIyjSmucrRoMeqHYD8wu19Pyb5pizQhjl5Zq1A',
  writeToken: 'sk4noDj00qit4s8TsvqMK9KXW34RF4y9IXNMvSgAU8dRnXxrkvygZaRxd8emZErT05uQInfiGv4kg8HSMEFRAjf49QRW3t7dpW25auIedGIlfTjABQWTeycGKEvuXKT3F5V7pAfrtjLp9WtIyjSmucrRoMeqHYD8wu19Pyb5pizQhjl5Zq1A'
}

// Read-only client for fetching data
export const client = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  token: config.readToken,
  useCdn: false, // Set to false for real-time data
  perspective: 'published'
})

// Write client for content management (requires write token)
export const writeClient = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  token: config.writeToken,
  useCdn: false,
  perspective: 'published'
})

// Check if write client is properly configured
export const hasWriteAccess = !!config.writeToken

// TODO: Replace with environment variables once .env.local is working
// if (!process.env.SANITY_PROJECT_ID) {
//   throw new Error('Missing SANITY_PROJECT_ID environment variable')
// }
// 
// if (!process.env.SANITY_DATASET) {
//   throw new Error('Missing SANITY_DATASET environment variable')
// }
// 
// if (!process.env.SANITY_API_VERSION) {
//   throw new Error('Missing SANITY_API_VERSION environment variable')
// }
