'use client'

import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<any>({})
  const [sanityConfig, setSanityConfig] = useState<any>(null)

  useEffect(() => {
    // Log environment variables
    const env = {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
      SANITY_DATASET: process.env.SANITY_DATASET,
      SANITY_API_VERSION: process.env.SANITY_API_VERSION,
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID
    }
    
    setEnvVars(env)
    console.log('Environment variables:', env)

    // Try to import and check Sanity config
    try {
             import('../../../sanity.config').then((config) => {
        console.log('Sanity config imported:', config)
        setSanityConfig(config.default)
      }).catch((err) => {
        console.error('Failed to import Sanity config:', err)
        setSanityConfig({ error: err.message })
      })
    } catch (err) {
      console.error('Error importing Sanity config:', err)
      setSanityConfig({ error: 'Import failed' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Information</h1>
        
        <div className="grid gap-6">
          {/* Environment Variables */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-mono text-sm">{key}:</span>
                  <span className={`font-mono text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                                         {String(value) || '❌ Not set'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sanity Config */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sanity Configuration</h2>
            {sanityConfig ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-sm">Project ID:</span>
                  <span className="font-mono text-sm">{sanityConfig.projectId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm">Dataset:</span>
                  <span className="font-mono text-sm">{sanityConfig.dataset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm">Base Path:</span>
                  <span className="font-mono text-sm">{sanityConfig.basePath}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Loading Sanity config...</div>
            )}
          </div>

          {/* Browser Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>User Agent:</span>
                <span className="text-sm text-gray-600">{navigator.userAgent}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform:</span>
                <span className="text-sm text-gray-600">{navigator.platform}</span>
              </div>
            </div>
          </div>

          {/* Console Log */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Console Log</h2>
            <p className="text-gray-600 mb-2">Check your browser's developer console for detailed logs.</p>
            <button 
              onClick={() => {
                console.log('Manual console test from debug page')
                alert('Check console for test message')
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Console Log
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
