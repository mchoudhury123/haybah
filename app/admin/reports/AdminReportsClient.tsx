'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, AlertTriangle, Package, TrendingUp } from 'lucide-react'

interface LowStockVariant {
  _id: string
  sku: string
  size: string
  color: string
  stock: number
  product: {
    _ref: string
    name: string
  }
}

interface InventoryMovement {
  _id: string
  productName: string
  variantInfo: string
  sku: string
  qty: number
  reason: string
  at: string
  previousStock: number
  newStock: number
  orderId: string
  processedBy: string
  notes?: string
}

export default function AdminReportsClient() {
  const [lowStockVariants, setLowStockVariants] = useState<LowStockVariant[]>([])
  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [variantsRes, movementsRes] = await Promise.all([
        fetch('/api/admin/low-stock-variants'),
        fetch('/api/admin/inventory-movements')
      ])
      
      if (variantsRes.ok) {
        const variants = await variantsRes.json()
        setLowStockVariants(variants)
      }
      
      if (movementsRes.ok) {
        const movements = await movementsRes.json()
        setInventoryMovements(movements)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const openInStudio = (documentId: string, documentType: string) => {
    const studioUrl = `${window.location.origin}/studio/desk/${documentType};${documentId}`
    window.open(studioUrl, '_blank')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'sale': return 'bg-red-100 text-red-800'
      case 'purchase': return 'bg-green-100 text-green-800'
      case 'return': return 'bg-blue-100 text-blue-800'
      case 'adjustment': return 'bg-yellow-100 text-yellow-800'
      case 'damage': return 'bg-gray-100 text-gray-800'
      case 'transfer': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Reports</h1>
          <p className="text-gray-600">Monitor inventory levels and track movements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Variants */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Low Stock Variants
              </CardTitle>
              <Badge variant="secondary">{lowStockVariants.length}</Badge>
            </CardHeader>
            <CardContent>
              {lowStockVariants.length === 0 ? (
                <p className="text-gray-500 text-center py-8">All variants have sufficient stock</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {lowStockVariants.map((variant) => (
                    <div key={variant._id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{variant.product.name}</div>
                        <div className="text-sm text-gray-600">
                          {variant.size} • {variant.color} • SKU: {variant.sku}
                        </div>
                        <div className="text-sm font-semibold text-orange-600">
                          Stock: {variant.stock}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openInStudio(variant._id, 'variant')}
                        className="ml-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Inventory Movements */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Recent Inventory Movements
              </CardTitle>
              <Badge variant="secondary">{inventoryMovements.length}</Badge>
            </CardHeader>
            <CardContent>
              {inventoryMovements.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No inventory movements found</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {inventoryMovements.map((movement) => (
                    <div key={movement._id} className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{movement.productName}</div>
                          <div className="text-sm text-gray-600">
                            {movement.variantInfo} • SKU: {movement.sku}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getReasonColor(movement.reason)}>
                              {movement.reason.toUpperCase()}
                            </Badge>
                            <span className={`text-sm font-medium ${movement.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {movement.qty > 0 ? '+' : ''}{movement.qty}
                            </span>
                            <span className="text-sm text-gray-500">
                              {movement.previousStock} → {movement.newStock}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDate(movement.at)} • Order: {movement.orderId} • By: {movement.processedBy}
                          </div>
                          {movement.notes && (
                            <div className="text-xs text-gray-600 mt-1 italic">"{movement.notes}"</div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openInStudio(movement._id, 'inventory_movement')}
                          className="ml-2"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => window.open('/studio', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Sanity Studio
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/studio/desk/variant', '_blank')}
              >
                <Package className="h-4 w-4 mr-2" />
                Manage Variants
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/studio/desk/inventory_movement', '_blank')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Movements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
