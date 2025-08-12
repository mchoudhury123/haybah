import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authorization = request.headers.get('authorization')
    
    if (!authorization || !authorization.startsWith('Basic ')) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Access"',
          'Content-Type': 'text/plain',
        },
      })
    }
    
    const encoded = authorization.replace('Basic ', '')
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
    const [username, password] = decoded.split(':')
    
    const adminPass = process.env.ADMIN_PASS
    if (!adminPass) {
      console.error('ADMIN_PASS environment variable not set')
      return new NextResponse('Server configuration error', { status: 500 })
    }
    
    if (password !== adminPass) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Access"',
          'Content-Type': 'text/plain',
        },
      })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
