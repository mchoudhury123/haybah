'use client'

import { useState, useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if Sanity config is properly loaded
    console.log('Studio page loading. Config check:', {
      config: config
    })

    // Simulate loading time and check for errors
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-maroon mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading Sanity Studio...</h2>
          <p className="text-gray-600">Please wait while we initialize the content management system.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Studio Loading Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-brand-maroon text-white rounded hover:bg-brand-maroon/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  try {
    return <NextStudio config={config} />
  } catch (err: any) {
    console.error('Studio error:', err)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Studio Failed to Load</h2>
          <p className="text-gray-600 mb-4">There was an error initializing Sanity Studio.</p>
          <div className="text-sm text-gray-500 mb-4">
            Error: {err?.message || 'Unknown error'}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-brand-maroon text-white rounded hover:bg-brand-maroon/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
}

