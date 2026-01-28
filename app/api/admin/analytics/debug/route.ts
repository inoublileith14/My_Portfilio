import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * GET /api/admin/analytics/debug
 * Debug endpoint to check geolocation data
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient()

    // Check if geolocation columns exist
    const { data: sampleData, error: sampleError } = await supabase
      .from('page_views')
      .select('country, country_code, city, latitude, longitude')
      .limit(5)

    // Count total page views
    const { count: totalViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })

    // Count page views with geolocation
    const { count: viewsWithGeo } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .not('latitude', 'is', null)

    return NextResponse.json({
      success: true,
      debug: {
        totalPageViews: totalViews || 0,
        pageViewsWithGeolocation: viewsWithGeo || 0,
        sampleData: sampleData || [],
        hasGeolocationColumns: sampleError?.code !== '42703', // 42703 = column doesn't exist
        error: sampleError ? {
          message: sampleError.message,
          code: sampleError.code,
          hint: sampleError.hint,
        } : null,
      },
      instructions: {
        ifNoColumns: 'Run supabase/add-geolocation.sql in Supabase SQL Editor',
        ifNoData: 'Visit your website to generate page views with geolocation',
        ifColumnsExist: 'Geolocation is working! Check the admin dashboard map.',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    )
  }
}
