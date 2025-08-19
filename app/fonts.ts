import { Playfair_Display, Inter, Noto_Naskh_Arabic } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
  fallback: ['serif'],
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  preload: true,
  fallback: ['serif'],
  weight: ['400', '500', '600', '700'],
})

export const fontVariables = `${playfair.variable} ${inter.variable} ${notoNaskh.variable}`
