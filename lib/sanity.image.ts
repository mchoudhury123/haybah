import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function urlForImage(source: any, width: number = 400, height: number = 600) {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .url()
}

export function urlForThumbnail(source: any) {
  return urlForImage(source, 300, 400)
}

export function urlForProduct(source: any) {
  return urlForImage(source, 500, 700)
}

