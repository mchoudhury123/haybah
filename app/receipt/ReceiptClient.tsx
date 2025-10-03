'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  Home, 
  Download, 
  Printer, 
  MapPin, 
  Calendar,
  Package,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart'

interface OrderItem {
  name: string
  color: string
  size: string
  price: number
  qty: number
  image: string
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  city: string
  postcode: string
}

interface OrderData {
  orderId: string
  customerInfo: CustomerInfo
  items: OrderItem[]
  pricing: {
    subtotal: number
    shipping: number
    discount: number
    total: number
    originalTotal: number
  }
  promoCode?: string
  status: string
  paymentStatus: string
  createdAt: string
  stripeSessionId?: string
}

export default function ReceiptClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const sessionId = searchParams.get('session_id')
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { clear } = useCartStore()

  useEffect(() => {
    if (orderId) {
      fetchOrderData(orderId)
    }
    // Clear the cart when the receipt page loads
    clear()
    console.log('Cart cleared on receipt page')
  }, [orderId, clear])

  const fetchOrderData = async (id: string) => {
    try {
      setLoading(true)
      // Fetch real order data from the API
      const response = await fetch(`/api/orders/${id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch order data')
      }
      
      const orderData = await response.json()
      setOrderData(orderData)
    } catch (err) {
      setError('Failed to load order details')
      console.error('Error fetching order:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Create a printable version of the receipt
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt - ${orderData?.orderId}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .order-details { margin-bottom: 20px; }
              .items { margin-bottom: 20px; }
              .total { border-top: 2px solid #000; padding-top: 10px; }
              .item { display: flex; justify-content: space-between; margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Haybah Collections</h1>
              <h2>Order Receipt</h2>
            </div>
            <div class="order-details">
              <p><strong>Order ID:</strong> ${orderData?.orderId}</p>
              <p><strong>Date:</strong> ${orderData ? formatDate(orderData.createdAt) : ''}</p>
              <p><strong>Customer:</strong> ${orderData?.customerInfo.name}</p>
            </div>
            <div class="items">
              ${orderData?.items.map(item => `
                <div class="item">
                  <span>${item.name} - ${item.color} - Size ${item.size} x${item.qty}</span>
                  <span>£${item.price.toFixed(2)}</span>
                </div>
              `).join('')}
            </div>
            <div class="total">
              <div class="item"><span>Subtotal:</span> <span>£${orderData?.pricing.subtotal.toFixed(2)}</span></div>
              <div class="item"><span>Shipping:</span> <span>£${orderData?.pricing.shipping.toFixed(2)}</span></div>
              ${orderData?.promoCode ? `<div class="item"><span>Promotion Code (${orderData.promoCode}):</span> <span>-£${orderData.pricing.discount.toFixed(2)}</span></div>` : ''}
              <div class="item"><strong>Total:</strong> <strong>£${orderData?.pricing.total.toFixed(2)}</strong></div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-maroon">Loading your receipt...</p>
        </div>
      </div>
    )
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Order not found'}</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-maroon mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-gray-600">
            Your order has been confirmed and is being processed
          </p>
        </motion.div>

        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Receipt Header */}
          <div className="bg-brand-maroon text-white p-6 text-center">
            <h2 className="text-2xl font-serif font-bold mb-2">Haybah Collections</h2>
            <p className="text-brand-cream">Order Receipt</p>
          </div>

          {/* Receipt Content */}
          <div className="p-6 space-y-6">
            {/* Order Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Package className="w-4 h-4" />
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                    {orderData.orderId}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Order Date:</span>
                  <span>{formatDate(orderData.createdAt)}</span>
                </div>
                {orderData.stripeSessionId && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Payment ID:</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                      {orderData.stripeSessionId}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Shipping Address:</span>
                </div>
                <div className="text-sm text-gray-600 ml-6">
                  <p>{orderData.customerInfo.name}</p>
                  <p>{orderData.customerInfo.addressLine1}</p>
                  {orderData.customerInfo.addressLine2 && (
                    <p>{orderData.customerInfo.addressLine2}</p>
                  )}
                  {orderData.customerInfo.addressLine3 && (
                    <p>{orderData.customerInfo.addressLine3}</p>
                  )}
                  <p>{orderData.customerInfo.city}, {orderData.customerInfo.postcode}</p>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div>
              <h3 className="text-lg font-semibold text-brand-maroon mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Items Ordered
              </h3>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-brand-dark">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.color} • Size {item.size} • Qty: {item.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-brand-maroon">£{(item.price * item.qty).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">£{item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-brand-maroon mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({orderData.items.length} items)</span>
                  <span>£{orderData.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>£{orderData.pricing.shipping.toFixed(2)}</span>
                </div>
                {orderData.promoCode && (
                  <div className="flex justify-between text-green-600">
                    <span>Promotion Code ({orderData.promoCode})</span>
                    <span>-£{orderData.pricing.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between text-xl font-bold text-brand-maroon">
                    <span>Total</span>
                    <span>£{orderData.pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-brand-maroon mb-2">Order Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Order Status:</span>
                  <span className="ml-2 font-medium capitalize">{orderData.status}</span>
                </div>
                <div>
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="ml-2 font-medium capitalize text-green-600">{orderData.paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Footer */}
          <div className="bg-gray-50 p-6 border-t">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-600 text-center sm:text-left">
                <p>Thank you for choosing Haybah Collections!</p>
                <p>You will receive a confirmation email shortly.</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Receipt
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            asChild
            className="bg-brand-maroon hover:bg-brand-maroon/90 text-white text-lg py-3 px-8"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white text-lg py-3 px-8"
          >
            <Link href="/shop">
              <ShoppingBag className="mr-2 h-5 w-5" />
              View Shop
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
