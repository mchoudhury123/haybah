import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source).quality(90).auto('format')
}

export function urlForImage(source: any, width: number = 400, height: number = 600) {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit('crop')
    .quality(90)
    .auto('format')
    .url()
}

export function urlForThumbnail(source: any) {
  return urlForImage(source, 300, 400)
}

export function urlForProduct(source: any) {
  return urlForImage(source, 800, 1200)
}

// High-quality image for detailed views (e.g., product pages, galleries)
export function urlForHighQuality(source: any, width: number = 1200, height: number = 1600) {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit('crop')
    .quality(95)
    .auto('format')
    .url()
}

