import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/track/test-insert
 * Test endpoint to verify INSERT operations work
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Test inserting a page view
    const { data: pageViewData, error: pageViewError } = await supabase
      .from('page_views')
      .insert({
        path: '/test',
        referrer: null,
        user_agent: 'test-agent',
      })
      .select()

    // Test inserting a click event
    const { data: clickData, error: clickError } = await supabase
      .from('click_events')
      .insert({
        path: '/test',
        element: 'BUTTON',
        x: 100,
        y: 200,
      })
      .select()

    return NextResponse.json({
      success: true,
      page_view: {
        success: !pageViewError,
        data: pageViewData?.[0],
        error: pageViewError ? {
          message: pageViewError.message,
          code: pageViewError.code,
          details: pageViewError.details,
          hint: pageViewError.hint,
        } : null,
      },
      click_event: {
        success: !clickError,
        data: clickData?.[0],
        error: clickError ? {
          message: clickError.message,
          code: clickError.code,
          details: clickError.details,
          hint: clickError.hint,
        } : null,
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
}
