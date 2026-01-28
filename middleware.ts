import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'change-this-in-production'

/**
 * Validate admin session token
 */
function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    return decoded.startsWith(`${ADMIN_SESSION_SECRET}-`)
  } catch {
    return false
  }
}

/**
 * Middleware to protect admin routes
 * Allows /admin (login page) but protects other admin routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow /admin (login page) and /api/admin/auth (auth endpoints)
  if (pathname === '/admin' || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next()
  }

  // Protect other admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session')
    
    // If no session cookie or invalid, redirect to /admin (login page)
    if (!sessionCookie || !validateSessionToken(sessionCookie.value)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
