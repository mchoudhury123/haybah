'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'
import { Button } from '@/components/ui/button'

const sanityClient = createClient({
  projectId: 'gnppn7qx',
  dataset: 'production',
  apiVersion: '2024-07-01',
  token: 'skzWsjcPZ6bouozWpiRdUEnOhlCD4xyXy0nqUPaj3ga83uK8TInGYDpu3bHLHoR2DoAxxzdpELy8CU1P2qMzICr2N2MuyNsyoGNiGMYBliutJcfP6M61s2qHhY4ML01Nzl2A9amEiF0MWZah2pLpyDRkzo5nWQMz5292pHff0HKYYkHiI8F5',
  useCdn: false,
})

interface Review {
  _id: string
  productId: string
  productSlug: string
  productName?: string
  customerName: string
  rating: number
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  adminNotes?: string
  approvedAt?: string
  approvedBy?: string
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [updatingReview, setUpdatingReview] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const query = `*[_type == "review"] | order(createdAt desc) {
        _id,
        productId,
        productSlug,
        "productName": product->name,
        customerName,
        rating,
        comment,
        status,
        createdAt,
        adminNotes,
        approvedAt,
        approvedBy
      }`
      
      const result = await sanityClient.fetch(query)
      setReviews(result)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReviewStatus = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    try {
      setUpdatingReview(reviewId)
      
      const updateData: any = {
        status: newStatus
      }

      if (newStatus === 'approved') {
        updateData.approvedAt = new Date().toISOString()
        updateData.approvedBy = 'Admin'
      }

      if (adminNotes[reviewId]) {
        updateData.adminNotes = adminNotes[reviewId]
      }

      await sanityClient
        .patch(reviewId)
        .set(updateData)
        .commit()

      setSuccessMessage(`Review ${newStatus} successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
      
      // Clear admin notes for this review
      setAdminNotes(prev => {
        const newNotes = { ...prev }
        delete newNotes[reviewId]
        return newNotes
      })
      
      await fetchReviews()
    } catch (error) {
      console.error('Error updating review status:', error)
      alert(`Failed to update review: ${error}`)
    } finally {
      setUpdatingReview(null)
    }
  }
  
  const deleteReview = async (reviewId: string) => {
    try {
      // Confirm deletion
      if (!confirm('Are you sure you want to permanently delete this review? This action cannot be undone.')) {
        return
      }
      
      setUpdatingReview(reviewId)
      
      // Delete the review document from Sanity
      await sanityClient.delete(reviewId)
      
      setSuccessMessage('Review deleted successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
      
      // Refresh the reviews list
      await fetchReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
      alert(`Failed to delete review: ${error}`)
    } finally {
      setUpdatingReview(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'approved': return '✅'
      case 'rejected': return '❌'
      default: return '❓'
    }
  }

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const filteredReviews = reviews.filter(review => review.status === activeTab)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600 mt-2">Approve, reject, and manage customer reviews</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
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
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ⏳ Pending Reviews ({reviews.filter(r => r.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'approved'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ✅ Approved Reviews ({reviews.filter(r => r.status === 'approved').length})
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rejected'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ❌ Rejected Reviews ({reviews.filter(r => r.status === 'rejected').length})
              </button>
            </nav>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{review.customerName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                      {getStatusIcon(review.status)} {review.status}
                    </span>
                    <span className="text-sm text-gray-600">{renderStars(review.rating)}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Product</p>
                      <p className="text-gray-900">{review.productName || review.productSlug}</p>
                      <p className="text-sm text-gray-600">ID: {review.productId}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Review Details</p>
                      <p className="text-sm text-gray-600">
                        {new Date(review.createdAt).toLocaleDateString('en-GB')}
                      </p>
                      {review.approvedAt && (
                        <p className="text-sm text-gray-600">
                          Approved: {new Date(review.approvedAt).toLocaleDateString('en-GB')}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Comment</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{review.comment}</p>
                  </div>

                  {review.adminNotes && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Admin Notes</p>
                      <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{review.adminNotes}</p>
                    </div>
                  )}
                </div>
                
                <div className="ml-6">
                  {review.status === 'pending' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Admin Notes (Optional)
                        </label>
                        <textarea
                          value={adminNotes[review._id] || ''}
                          onChange={(e) => setAdminNotes(prev => ({
                            ...prev,
                            [review._id]: e.target.value
                          }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          placeholder="Add internal notes..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => updateReviewStatus(review._id, 'approved')}
                          disabled={updatingReview === review._id}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm"
                        >
                          {updatingReview === review._id ? 'Approving...' : '✅ Approve'}
                        </Button>
                        
                        <Button
                          onClick={() => updateReviewStatus(review._id, 'rejected')}
                          disabled={updatingReview === review._id}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm"
                        >
                          {updatingReview === review._id ? 'Rejecting...' : '❌ Reject'}
                        </Button>
                      </div>
                      
                      <div className="mt-3">
                        <Button
                          onClick={() => deleteReview(review._id)}
                          disabled={updatingReview === review._id}
                          className="bg-gray-600 hover:bg-gray-700 text-white text-sm w-full"
                        >
                          {updatingReview === review._id ? 'Deleting...' : '🗑️ Delete Review'}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {review.status !== 'pending' && (
                    <div className="space-y-3">
                      <div className="text-sm text-gray-500">
                        <p>Status: {review.status}</p>
                        <p>Updated: {new Date(review.createdAt).toLocaleDateString('en-GB')}</p>
                      </div>
                      
                      <Button
                        onClick={() => deleteReview(review._id)}
                        disabled={updatingReview === review._id}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm"
                      >
                        {updatingReview === review._id ? 'Deleting...' : '🗑️ Delete Review'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === 'pending' 
                ? 'No pending reviews found.' 
                : activeTab === 'approved'
                ? 'No approved reviews found.'
                : 'No rejected reviews found.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
