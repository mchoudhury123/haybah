import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // This is just a simple endpoint that returns a timestamp
    // The main purpose is to provide a way to manually clear cache
    
    const timestamp = new Date().toISOString()
    
    // Create response with cache control headers
    const response = NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp
    })
    
    // Set cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    
    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}
