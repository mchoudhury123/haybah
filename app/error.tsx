'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-red-500 text-4xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-playfair font-bold text-brand-maroon mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Please try again or contact support if the problem persists.
        </p>
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white"
          >
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white"
          >
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
