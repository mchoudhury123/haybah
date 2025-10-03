'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, CreditCard, Lock, CheckCircle, AlertCircle, User, Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore, CartItem } from '../../lib/cart'
import emailjs from '@emailjs/browser'
import EmailJSTest from './EmailJSTest'
// Remove StripeCheckout import since we're not using it anymore
// import StripeCheckout from '@/components/StripeCheckout'

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

export default function CheckoutClient() {
  const router = useRouter()
  const { items: cartItems, remove, updateQty, clear, getTotal } = useCartStore()
  const cartTotal = getTotal()
  const [isHydrated, setIsHydrated] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    postcode: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  
  // Ensure hydration is complete before rendering cart state
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Remove the EmailJS order confirmation function since Stripe handles this automatically
  // const sendOrderConfirmationEmail = async (orderData: {
  //   orderId: string
  //   customerInfo: CustomerInfo
  //   items: CartItem[]
  //   total: number
  // }) => {
  //   // ... function body removed
  // }

  // Promotion code validation
  const validatePromoCode = (code: string) => {
    const upperCode = code.toUpperCase().trim()
    if (upperCode === 'DELFREETRIAL') {
      setPromoApplied(true)
      setPromoError('')
      return true
    } else {
      setPromoApplied(false)
      setPromoError('Invalid promotion code')
      return false
    }
  }

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value
    setPromoCode(code)
    if (promoApplied) {
      setPromoApplied(false)
    }
    if (promoError) {
      setPromoError('')
    }
  }

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      validatePromoCode(promoCode)
    }
  }

  // Debug logging
  useEffect(() => {
    console.log('CheckoutClient mounted. Cart items:', cartItems)
    console.log('Cart total:', cartTotal)
  }, [cartItems, cartTotal])

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const shipping = promoApplied ? 0 : 4.99 // Free shipping with promo code
  const discount = promoApplied ? (subtotal + 4.99 - 1) : 0 // Apply discount to make total £1
  const total = promoApplied ? 1 : (subtotal + shipping)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty')
      return
    }
    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.addressLine1 || !customerInfo.city || !customerInfo.postcode) {
      setError('Please fill in all required customer information fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          customerInfo,
          promoCode: promoApplied ? promoCode : null,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }
      const result = await response.json()
      console.log('Checkout session created, result:', result)
      
      if (result.url) {
        // Clear the cart before redirecting to Stripe
        clear()
        console.log('Cart cleared before redirecting to Stripe')
        
        // Redirect to Stripe Checkout
        window.location.href = result.url
      } else {
        throw new Error('Failed to get checkout session URL')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = (orderId: string) => {
    setOrderSuccess(true)
    clear()
    // Redirect to thank you page after 3 seconds
    setTimeout(() => {
      router.push(`/thank-you?order_id=${orderId}`)
    }, 3000)
  }

  const handlePaymentError = (error: string) => {
    setError(error)
    // setShowPayment(false) // This state variable was removed
  }

  const removeItem = (index: number) => {
    const item = cartItems[index]
    if (item) {
      remove(item.productId, item.variantId)
    }
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const item = cartItems[index]
    if (item) {
      updateQty(item.productId, item.variantId, newQuantity)
    }
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-brand-maroon mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600 mb-4">Your order has been received and is being processed.</p>
          <p className="text-sm text-gray-500 mb-6">Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{orderId}</span></p>
          <p className="text-gray-600">Redirecting to confirmation page...</p>
        </div>
      </div>
    )
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-brand-maroon mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-brand-maroon mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-brand-maroon mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some beautiful Abayas to your cart to continue shopping.</p>
          <Button onClick={() => router.push('/shop')} className="bg-brand-maroon hover:bg-brand-maroon/90">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-serif text-brand-maroon mb-4">
            Complete Your Order
          </h1>
          <p className="text-xl text-brand-dark max-w-2xl mx-auto">
            Fill in your details and place your order
          </p>
        </motion.div>
        

        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side: Customer Information + Promotion Code */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Customer Information Form */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h2 className="text-2xl font-serif text-brand-maroon mb-6 flex items-center gap-3">
                <User className="w-6 h-6" />
                Customer Information
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                    required
                  />
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={customerInfo.addressLine1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                    required
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={customerInfo.addressLine2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                  />
                </div>

                {/* Address Line 3 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 3</label>
                  <input
                    type="text"
                    name="addressLine3"
                    value={customerInfo.addressLine3}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postcode *</label>
                    <input
                      type="text"
                      name="postcode"
                      value={customerInfo.postcode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Promotion Code Section - Compact */}
            <div className="bg-white rounded-2xl shadow-elegant p-4">
              <h3 className="text-lg font-serif text-brand-maroon mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Promotion Code
              </h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promotion code"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-maroon focus:border-transparent text-sm"
                />
                <Button
                  onClick={handleApplyPromo}
                  disabled={!promoCode.trim()}
                  className="bg-brand-maroon hover:bg-brand-maroon/90 text-white text-sm px-4"
                >
                  Apply
                </Button>
              </div>
              
              {promoError && (
                <p className="mt-2 text-sm text-red-600">{promoError}</p>
              )}
              
              {promoApplied && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-800 font-medium">
                    ✅ Promotion code applied! Your order total is now £1.00 with free shipping.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side: Order Summary & Payment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h2 className="text-2xl font-serif text-brand-maroon mb-6 flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                Order Summary
              </h2>
              
              <div className="space-y-4">
                {isHydrated && cartItems.map((item, index) => (
                  <div key={`${item.productId}-${item.variantId}-${index}`} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-brand-dark">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.color} • Size {item.size}
                      </p>
                      <p className="text-brand-maroon font-medium">£{item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        Delivery in 2-3 weeks
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(index, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.qty}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(index, item.qty + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h2 className="text-2xl font-serif text-brand-maroon mb-6 flex items-center gap-3">
                <CreditCard className="w-6 h-6" />
                Payment
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({isHydrated ? cartItems.length : 0} items)</span>
                  <span>£{isHydrated ? subtotal.toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (UK)</span>
                  <span>£{shipping.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promotion Code Discount</span>
                    <span>-£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-brand-maroon">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              <Button
                onClick={handleCheckout}
                disabled={loading || !isHydrated || cartItems.length === 0}
                className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-lg py-3"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Continue to Payment
                  </div>
                )}
              </Button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" />
                  Secure payment processing by Stripe
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}