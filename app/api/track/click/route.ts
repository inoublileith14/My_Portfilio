import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { anonymizeIP, hashIP } from '@/lib/utils'

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 50 // Max 50 clicks per minute per IP

/**
 * Simple rate limiter
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip)
    }
  }
}, RATE_LIMIT_WINDOW)

/**
 * Bot detection patterns
 */
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /sogou/i,
  /exabot/i,
  /facebot/i,
  /ia_archiver/i,
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent))
}

/**
 * POST /api/track/click
 * Track click events
 */
export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               'unknown'

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await req.json()
    const { path, element, x, y } = body

    // Validate required fields
    if (!path || typeof path !== 'string') {
      return NextResponse.json(
        { error: 'Invalid path' },
        { status: 400 }
      )
    }

    if (!element || typeof element !== 'string') {
      return NextResponse.json(
        { error: 'Invalid element' },
        { status: 400 }
      )
    }

    if (typeof x !== 'number' || typeof y !== 'number') {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      )
    }

    // Don't track admin pages
    if (path.startsWith('/admin')) {
      return NextResponse.json({ success: true, skipped: true })
    }

    // Get user agent from headers
    const userAgent = req.headers.get('user-agent')
    if (isBot(userAgent)) {
      return NextResponse.json({ success: true, skipped: true })
    }

    // Validate Supabase environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[Analytics] Missing Supabase configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Insert into database
    try {
      const supabase = await createClient()
      
      // Anonymize and hash IP for privacy compliance
      const anonymizedIP = anonymizeIP(ip)
      const hashedIP = hashIP(ip)

      const { data, error } = await supabase
        .from('click_events')
        .insert({
          path,
          element: element.slice(0, 255), // Limit element length
          x,
          y,
          ip_address: anonymizedIP,
          ip_hash: hashedIP,
        })
        .select()

      if (error) {
        console.error('[Analytics] Failed to insert click event:', {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          path,
          element,
        })
        
        let errorMessage = 'Failed to track click'
        if (error.code === '42P01') {
          errorMessage = 'Table does not exist. Run the database schema.'
        } else if (error.code === '42501') {
          errorMessage = 'Permission denied. Check RLS policies allow inserts.'
        }
        
        return NextResponse.json(
          { 
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? {
              message: error.message,
              code: error.code,
              hint: error.hint,
            } : undefined
          },
          { status: 500 }
        )
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] Click event inserted:', { id: data?.[0]?.id, path, element })
      }

      return NextResponse.json({ success: true, id: data?.[0]?.id })
    } catch (dbError) {
      console.error('[Analytics] Database connection error:', dbError)
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: process.env.NODE_ENV === 'development' 
            ? (dbError instanceof Error ? dbError.message : String(dbError))
            : undefined
        },
        { status: 500 }
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Click event inserted:', { id: data?.[0]?.id, path, element })
    }

    return NextResponse.json({ success: true, id: data?.[0]?.id })
  } catch (error) {
    console.error('[Analytics] Error tracking click:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
