'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check if environment variables are loaded
  useEffect(() => {
    console.log('Admin page loaded. Environment check:', {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
      SANITY_DATASET: process.env.SANITY_DATASET,
      NODE_ENV: process.env.NODE_ENV
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Simple password check - you can change this to whatever you want
      if (password === 'haybah2024') {
        console.log('Password correct, showing dashboard...')
        setIsAuthenticated(true)
      } else {
        setError('Incorrect password')
        setPassword('')
      }
    } catch (err) {
      console.error('Error accessing admin:', err)
      setError('Failed to access admin. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your store and content</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/studio" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🎨 Content Studio</h3>
              <p className="text-gray-600">Manage products, collections, and content</p>
            </Link>
            
            <Link href="/admin/orders" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📦 Order Management</h3>
              <p className="text-gray-600">View and manage customer orders</p>
            </Link>
            
            <Link href="/admin/reviews" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">⭐ Review Management</h3>
              <p className="text-gray-600">Approve and manage customer reviews</p>
            </Link>
            
            <Link href="/admin/reports" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Reports</h3>
              <p className="text-gray-600">View inventory reports and analytics</p>
            </Link>
            
            <Link href="/admin/debug" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🔧 Debug</h3>
              <p className="text-gray-600">Check system configuration and status</p>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Access</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter password to access admin dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-maroon focus:border-brand-maroon focus:z-10 sm:text-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-maroon hover:bg-brand-maroon/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-maroon disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Accessing...' : 'Access Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
