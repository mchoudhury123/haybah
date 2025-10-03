'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'
import { Button } from '@/components/ui/button' // Added Button import

const sanityClient = createClient({
  projectId: 'gnppn7qx', // Hardcoded for now
  dataset: 'production',
  apiVersion: '2024-07-01',
  token: 'skzWsjcPZ6bouozWpiRdUEnOhlCD4xyXy0nqUPaj3ga83uK8TInGYDpu3bHLHoR2DoAxxzdpELy8CU1P2qMzICr2N2MuyNsyoGNiGMYBliutJcfP6M61s2qHhY4ML01Nzl2A9amEiF0MWZah2pLpyDRkzo5nWQMz5292pHff0HKYYkHiI8F5', // Your write token
  useCdn: false,
})

interface Order {
  _id: string
  orderId: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  items: Array<{
    name: string
    color: string
    size: string
    qty: number
    price: number
  }>
  pricing: {
    total: number
  }
  status: string
  priority: string
  createdAt: string
  notes?: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'new' | 'processing' | 'completed'>('new')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [error, setError] = useState<string | null>(null)
  const [cleanupResult, setCleanupResult] = useState<any>(null)
  const [cleanupLoading, setCleanupLoading] = useState(false)
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Add immediate debug logging
  console.log('AdminOrders component rendering')
  console.log('Using hardcoded Sanity configuration')

  // Start fetching orders immediately since we have hardcoded values
  useEffect(() => {
    fetchOrders()
    cleanupOldCompletedOrders() // Clean up old completed orders
  }, [])

  const cleanupOldCompletedOrders = async () => {
    try {
      console.log('Checking for old completed orders to clean up...')
      
      // Find completed orders older than 2 weeks
      const twoWeeksAgo = new Date()
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
      
      const cleanupQuery = `*[_type == "order" && status == "completed" && createdAt < "${twoWeeksAgo.toISOString()}"] {
        _id,
        orderId,
        createdAt
      }`
      
      const oldOrders = await sanityClient.fetch(cleanupQuery)
      console.log(`Found ${oldOrders.length} old completed orders to clean up`)
      
      if (oldOrders.length > 0) {
        // Delete each old order
        for (const order of oldOrders) {
          try {
            await sanityClient.delete(order._id)
            console.log(`Deleted old order: ${order.orderId} (${order.createdAt})`)
          } catch (deleteError) {
            console.error(`Failed to delete order ${order.orderId}:`, deleteError)
          }
        }
        
        // Refresh the orders list after cleanup
        fetchOrders()
      }
    } catch (error) {
      console.error('Error during cleanup:', error)
      // Don't show cleanup errors to user, just log them
    }
  }

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...')
      console.log('Using hardcoded Sanity config')
      
      const query = `*[_type == "order"] | order(createdAt desc) {
        _id,
        orderId,
        customerInfo,
        items,
        pricing,
        status,
        priority,
        createdAt,
        notes
      }`
      
      console.log('Executing query:', query)
      const result = await sanityClient.fetch(query)
      console.log('Query result:', result)
      setOrders(result)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError(`Failed to fetch orders: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrder(orderId)
      const oldStatus = orders.find(o => o._id === orderId)?.status
      console.log(`Updating order ${orderId} from ${oldStatus} to ${newStatus}`)
      
      await sanityClient
        .patch(orderId)
        .set({ status: newStatus })
        .commit()
      
      console.log(`Successfully updated order ${orderId} to ${newStatus}`)
      
      // Show success message
      if (newStatus === 'processing') {
        setSuccessMessage('Order moved to Processing tab successfully!')
      } else if (newStatus === 'completed') {
        setSuccessMessage('Order marked as completed successfully!')
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000)
      
      // Refresh orders to show the updated status
      await fetchOrders()
      
    } catch (error) {
      console.error('Error updating order status:', error)
      alert(`Failed to update order status: ${error}`)
    } finally {
      setUpdatingOrder(null)
    }
  }

  const manualCleanup = async () => {
    try {
      setCleanupLoading(true)
      setCleanupResult(null)
      
      const response = await fetch('/api/admin/cleanup-orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASS || 'haybah2024'}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Cleanup failed: ${response.statusText}`)
      }
      
      const result = await response.json()
      setCleanupResult(result)
      
      // Refresh orders after cleanup
      fetchOrders()
      
    } catch (error) {
      console.error('Manual cleanup error:', error)
      setCleanupResult({ error: `Cleanup failed: ${error}` })
    } finally {
      setCleanupLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'failed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'rush': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'normal': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Separate orders into three categories
  const newOrders = orders.filter(order => order.status === 'new')
  const processingOrders = orders.filter(order => order.status === 'processing')
  const completedOrders = orders.filter(order => order.status === 'completed')
  
  // Get orders for the active tab
  const getTabOrders = () => {
    switch (activeTab) {
      case 'new': return newOrders
      case 'processing': return processingOrders
      case 'completed': return completedOrders
      default: return []
    }
  }

  // Filter orders based on active tab
  const getFilteredOrders = () => {
    let ordersToFilter = getTabOrders()
    
    if (filter === 'all') return ordersToFilter
    if (filter === 'today') {
      const today = new Date().toDateString()
      return ordersToFilter.filter(order => 
        new Date(order.createdAt).toDateString() === today
      )
    }
    if (filter === 'new') return ordersToFilter.filter(order => order.status === 'new')
    if (filter === 'processing') return ordersToFilter.filter(order => order.status === 'processing')
    if (filter === 'completed') return ordersToFilter.filter(order => order.status === 'completed')
    if (filter === 'cancelled') return ordersToFilter.filter(order => order.status === 'cancelled')
    if (filter === 'failed') return ordersToFilter.filter(order => order.status === 'failed')
    
    return ordersToFilter
  }

  const filteredOrders = getFilteredOrders()

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    if (sortBy === 'priority') {
      const priorityOrder = { rush: 4, high: 3, medium: 2, normal: 1 }
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
    }
    return 0
  })

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong className="font-bold">Configuration Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
            <p className="text-gray-600 mb-4">Please check your environment variables and restart the server.</p>
            <div className="bg-gray-100 p-4 rounded text-left text-sm">
              <p><strong>Required variables:</strong></p>
              <p>• SANITY_PROJECT_ID</p>
              <p>• SANITY_DATASET</p>
              <p>• SANITY_API_VERSION</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-t-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                {successMessage}
              </div>
            </div>
          )}
          
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('new')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'new'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🆕 New Orders ({newOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('processing')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'processing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📦 Processing Orders ({processingOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ✅ Completed Orders ({completedOrders.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="all">All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Orders</option>
                <option value="today">Today</option>
                {activeTab === 'new' && (
                  <>
                    <option value="new">🆕 New Orders</option>
                  </>
                )}
                {activeTab === 'processing' && (
                  <>
                    <option value="processing">📦 Processing Orders</option>
                  </>
                )}
                {activeTab === 'completed' && (
                  <>
                    <option value="completed">✅ Completed Orders</option>
                  </>
                )}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {filteredOrders.length} orders found
              </div>
              
              {activeTab === 'completed' && (
                <button
                  onClick={manualCleanup}
                  disabled={cleanupLoading}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Manually clean up completed orders older than 2 weeks"
                >
                  {cleanupLoading ? '🔄 Cleaning...' : '🗑️ Cleanup Old Orders'}
                </button>
              )}
            </div>
          </div>
          
          {/* Tab-specific info */}
          {activeTab === 'new' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-medium">New Orders:</span> Orders that have just been placed. Use the "Move to Processing" button to start working on them.
              </div>
            </div>
          )}
          
          {activeTab === 'processing' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Processing Orders:</span> Orders currently being prepared. Use the "Mark as Completed" button when ready to ship.
              </div>
            </div>
          )}
          
          {activeTab === 'completed' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Completed Orders:</span> Orders that have been shipped and delivered. These are automatically deleted after 2 weeks to save storage space.
              </div>
              
              {/* Cleanup Results */}
              {cleanupResult && (
                <div className={`mt-3 p-3 rounded-md text-sm ${
                  cleanupResult.error 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {cleanupResult.error ? (
                    <div>
                      <strong>Cleanup Error:</strong> {cleanupResult.error}
                    </div>
                  ) : (
                    <div>
                      <strong>Cleanup Completed:</strong> {cleanupResult.message}
                      <div className="mt-1 text-xs opacity-75">
                        Deleted: {cleanupResult.deletedCount} orders | 
                        Found: {cleanupResult.totalFound} orders | 
                        Date: {new Date(cleanupResult.cleanupDate).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{order.orderId}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Customer</p>
                      <p className="text-gray-900">{order.customerInfo.name}</p>
                      <p className="text-sm text-gray-600">{order.customerInfo.email}</p>
                      <p className="text-sm text-gray-600">{order.customerInfo.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Order Details</p>
                      <p className="text-gray-900">£{order.pricing.total}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Items</p>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-gray-900">
                          {item.name} - {item.color} ({item.size}) x{item.qty}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="ml-6">
                  {activeTab === 'new' && (
                    <div className="space-y-2">
                      <Button
                        onClick={() => updateOrderStatus(order._id, 'processing')}
                        disabled={updatingOrder === order._id}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50"
                      >
                        {updatingOrder === order._id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Moving...
                          </div>
                        ) : (
                          '📦 Move to Processing'
                        )}
                      </Button>
                    </div>
                  )}
                  
                  {activeTab === 'processing' && (
                    <div className="space-y-2">
                      <Button
                        onClick={() => updateOrderStatus(order._id, 'completed')}
                        disabled={updatingOrder === order._id}
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50"
                      >
                        {updatingOrder === order._id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Completing...
                          </div>
                        ) : (
                          '✅ Mark as Completed'
                        )}
                      </Button>
                    </div>
                  )}
                  
                  {activeTab === 'completed' && (
                    <div className="text-sm text-gray-500">
                      <p>Status: {order.status}</p>
                      <p>Completed: {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === 'new' 
                ? 'No new orders found with the current filters.' 
                : activeTab === 'processing'
                ? 'No processing orders found with the current filters.'
                : 'No completed orders found with the current filters.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

