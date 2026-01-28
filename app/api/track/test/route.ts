import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/track/test
 * Test endpoint to verify database connection and table access
 */
export async function GET(req: NextRequest) {
  try {
    // Check environment variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!hasUrl || !hasKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        env: {
          hasUrl,
          hasKey,
        },
      }, { status: 500 })
    }

    // Test Supabase connection
    const supabase = await createClient()
    
    // Test page_views table
    const { count: pageViewsCount, error: pageViewsError } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })

    // Test click_events table
    const { count: clicksCount, error: clicksError } = await supabase
      .from('click_events')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      env: {
        hasUrl,
        hasKey,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      },
      tables: {
        page_views: {
          exists: !pageViewsError,
          count: pageViewsCount ?? 0,
          error: pageViewsError ? {
            message: pageViewsError.message,
            code: pageViewsError.code,
            hint: pageViewsError.hint,
          } : null,
        },
        click_events: {
          exists: !clicksError,
          count: clicksCount ?? 0,
          error: clicksError ? {
            message: clicksError.message,
            code: clicksError.code,
            hint: clicksError.hint,
          } : null,
        },
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
}
