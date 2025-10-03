'use client'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'

export default function EmailJSTest() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  const testEmailJS = async () => {
    setLoading(true)
    setResult('')
    
    try {
      console.log('Testing EmailJS configuration...')
      console.log('Environment variables:', {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID
      })

      // Initialize EmailJS
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')
      console.log('EmailJS initialized')

      // Test parameters
      const templateParams = {
        to_email: 'test@example.com',
        to_name: 'Test User',
        order_id: 'TEST-123',
        customer_name: 'Test Customer',
        customer_email: 'test@example.com',
        customer_phone: '1234567890',
        address_line1: '123 Test Street',
        address_line2: 'Test Apartment',
        address_line3: 'Test Building',
        city: 'Test City',
        postcode: 'TE1 1ST',
        total_amount: '£29.99',
        items_list: 'Test Product - Red - Size M - Qty: 1 - £29.99',
        order_date: new Date().toLocaleDateString('en-GB')
      }

      console.log('Sending test email...')
      
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID || '',
        templateParams
      )

      console.log('Test email sent successfully:', response)
      setResult('✅ Test email sent successfully! Check console for details.')
      
    } catch (error: any) {
      console.error('Test email failed:', error)
      setResult(`❌ Test email failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">EmailJS Test</h2>
      
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Current Configuration:</h3>
        <div className="text-sm space-y-1">
          <div>Public Key: {process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '❌ Not set'}</div>
          <div>Service ID: {process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '❌ Not set'}</div>
          <div>Template ID: {process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID || '❌ Not set'}</div>
        </div>
      </div>

      <Button 
        onClick={testEmailJS} 
        disabled={loading}
        className="mb-4"
      >
        {loading ? 'Testing...' : 'Test EmailJS Configuration'}
      </Button>

      {result && (
        <div className={`p-3 rounded ${result.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>This will send a test email using your EmailJS configuration.</p>
        <p>Check the browser console for detailed logs.</p>
      </div>
    </div>
  )
}
