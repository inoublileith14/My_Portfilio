import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { anonymizeIP, hashIP } from '@/lib/utils'
import { getIPGeolocation } from '@/lib/analytics/geolocation'

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 10 // Max 10 requests per minute per IP

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
 * POST /api/track/page-view
 * Track page views
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
    const { path, referrer, userAgent } = body

    // Validate required fields
    if (!path || typeof path !== 'string') {
      return NextResponse.json(
        { error: 'Invalid path' },
        { status: 400 }
      )
    }

    // Don't track admin pages
    if (path.startsWith('/admin')) {
      return NextResponse.json({ success: true, skipped: true })
    }

    // Don't track bots
    if (isBot(userAgent)) {
      return NextResponse.json({ success: true, skipped: true })
    }

    // Validate Supabase environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('[Analytics] Missing NEXT_PUBLIC_SUPABASE_URL')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[Analytics] Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Insert into database
    try {
      const supabase = await createClient()
      
      // Verify table exists by attempting a count query first
      const { count, error: countError } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
      
      if (countError) {
        console.error('[Analytics] Table access error:', {
          error: countError.message,
          code: countError.code,
          details: countError.details,
          hint: countError.hint,
        })
        
        // Check if it's a table not found error
        if (countError.code === '42P01' || countError.message.includes('does not exist')) {
          return NextResponse.json(
            { 
              error: 'Analytics table not found. Please run the database schema.',
              details: process.env.NODE_ENV === 'development' ? countError.message : undefined
            },
            { status: 500 }
          )
        }
        
        // Check if it's an RLS policy error
        if (countError.code === '42501' || countError.message.includes('permission denied')) {
          return NextResponse.json(
            { 
              error: 'Permission denied. Check RLS policies.',
              details: process.env.NODE_ENV === 'development' ? countError.message : undefined
            },
            { status: 500 }
          )
        }
      }

      // Anonymize and hash IP for privacy compliance
      const anonymizedIP = anonymizeIP(ip)
      const hashedIP = hashIP(ip)

      // Check for recent duplicate (same IP + path within last 2 seconds)
      // This prevents double tracking from client-side issues
      const twoSecondsAgo = new Date(Date.now() - 2000).toISOString()
      const { data: recentViews } = await supabase
        .from('page_views')
        .select('id')
        .eq('ip_hash', hashedIP)
        .eq('path', path)
        .gte('created_at', twoSecondsAgo)
        .limit(1)

      if (recentViews && recentViews.length > 0) {
        // Duplicate detected - return success but don't insert
        if (process.env.NODE_ENV === 'development') {
          console.log('[Analytics] Duplicate page view detected, skipping:', { path, ip_hash: hashedIP })
        }
        return NextResponse.json({ success: true, skipped: true, reason: 'duplicate' })
      }

      // Get geolocation data (non-blocking - don't fail if it doesn't work)
      let geolocation = null
      try {
        // Only get geolocation for non-anonymized IPs (before anonymization)
        // For anonymized IPs, we can't get accurate location
        if (ip && ip !== 'unknown' && !ip.startsWith('192.168.') && !ip.startsWith('127.')) {
          geolocation = await getIPGeolocation(ip)
        }
      } catch (geoError) {
        // Silently fail - geolocation is optional
        console.warn('[Analytics] Geolocation failed:', geoError)
      }

      const { data, error } = await supabase
        .from('page_views')
        .insert({
          path,
          referrer: referrer || null,
          user_agent: userAgent || null,
          ip_address: anonymizedIP,
          ip_hash: hashedIP,
          country: geolocation?.country || null,
          country_code: geolocation?.countryCode || null,
          city: geolocation?.city || null,
          latitude: geolocation?.latitude || null,
          longitude: geolocation?.longitude || null,
        })
        .select()

      if (error) {
        console.error('[Analytics] Failed to insert page view:', {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          path,
        })
        
        // Provide helpful error messages based on error code
        let errorMessage = 'Failed to track page view'
        if (error.code === '42P01') {
          errorMessage = 'Table does not exist. Run the database schema.'
        } else if (error.code === '42501') {
          errorMessage = 'Permission denied. Check RLS policies allow inserts.'
        } else if (error.code === '23505') {
          errorMessage = 'Duplicate entry (this should not happen)'
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
        console.log('[Analytics] Page view inserted:', { id: data?.[0]?.id, path })
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
  } catch (error) {
    console.error('[Analytics] Error tracking page view:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
