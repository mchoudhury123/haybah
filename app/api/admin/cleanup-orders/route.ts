import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: 'gnppn7qx', // Hardcoded for now
  dataset: 'production',
  apiVersion: '2024-07-01',
  token: 'skzWsjcPZ6bouozWpiRdUEnOhlCD4xyXy0nqUPaj3ga83uK8TInGYDpu3bHLHoR2DoAxxzdpELy8CU1P2qMzICr2N2MuyNsyoGNiGMYBliutJcfP6M61s2qHhY4ML01Nzl2A9amEiF0MWZah2pLpyDRkzo5nWQMz5292pHff0HKYYkHiI8F5', // Your write token
  useCdn: false,
})

export async function POST(request: NextRequest) {
  try {
    // Verify admin access (you can add more security here)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    if (token !== 'haybah2024') { // Hardcoded admin password
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    console.log('Starting scheduled cleanup of old completed orders...')
    
    // Find completed orders older than 2 weeks
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    
    const cleanupQuery = `*[_type == "order" && status == "completed" && createdAt < "${twoWeeksAgo.toISOString()}"] {
      _id,
      orderId,
      createdAt,
      customerInfo,
      pricing
    }`
    
    const oldOrders = await sanityClient.fetch(cleanupQuery)
    console.log(`Found ${oldOrders.length} old completed orders to clean up`)
    
    let deletedCount = 0
    let errors = []
    
    if (oldOrders.length > 0) {
      // Delete each old order
      for (const order of oldOrders) {
        try {
          await sanityClient.delete(order._id)
          deletedCount++
          console.log(`Deleted old order: ${order.orderId} (${order.createdAt})`)
        } catch (deleteError) {
          const errorMsg = `Failed to delete order ${order.orderId}: ${deleteError}`
          console.error(errorMsg)
          errors.push(errorMsg)
        }
      }
    }
    
    const result = {
      message: `Cleanup completed. Deleted ${deletedCount} orders.`,
      deletedCount,
      totalFound: oldOrders.length,
      errors: errors.length > 0 ? errors : undefined,
      cleanupDate: new Date().toISOString(),
      cutoffDate: twoWeeksAgo.toISOString()
    }
    
    console.log('Cleanup result:', result)
    
    return NextResponse.json(result)
    
  } catch (error: any) {
    console.error('Error during scheduled cleanup:', error)
    return NextResponse.json(
      { error: 'Cleanup failed', details: error.message },
      { status: 500 }
    )
  }
}

// Also allow GET for manual triggering (with proper auth)
export async function GET(request: NextRequest) {
  return POST(request)
}
