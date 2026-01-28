import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Hard-coded admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@leithdev.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'supersecurepassword'
const ADMIN_SESSION_COOKIE = 'admin_session'
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'change-this-in-production'

/**
 * Simple session token generation (use proper JWT in production)
 */
function generateSessionToken(): string {
  return Buffer.from(`${ADMIN_SESSION_SECRET}-${Date.now()}`).toString('base64')
}

function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    return decoded.startsWith(`${ADMIN_SESSION_SECRET}-`)
  } catch {
    return false
  }
}

/**
 * POST /api/admin/auth
 * Login endpoint
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate session token
      const sessionToken = generateSessionToken()
      
      // Set cookie (httpOnly, secure in production)
      const cookieStore = await cookies()
      cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('[Admin Auth] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/auth
 * Check if user is authenticated
 */
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

    if (sessionToken && validateSessionToken(sessionToken)) {
      return NextResponse.json({ authenticated: true })
    }

    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

/**
 * DELETE /api/admin/auth
 * Logout endpoint
 */
export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(ADMIN_SESSION_COOKIE)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
