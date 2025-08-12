import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-brand-maroon/20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-brand-maroon text-4xl">👗</span>
        </div>
        <h1 className="text-4xl font-playfair font-bold text-brand-maroon mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white">
            <Link href="/shop">Browse products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
