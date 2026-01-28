import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTelegramMessage, formatDailyReport } from '@/lib/notifications/telegram'

/**
 * POST /api/notifications/daily-report
 * Generate and send daily analytics report to Telegram
 * 
 * This endpoint can be called:
 * - Manually via API
 * - Via cron job (Vercel Cron, GitHub Actions, etc.)
 * - Via scheduled task
 */
export async function POST(req: NextRequest) {
  try {
    // Optional: Add authentication to prevent unauthorized access
    // Only enforce if CRON_SECRET is set (allows testing without it)
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret) {
      // CRON_SECRET is set, so require authentication
      if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { 
            error: 'Unauthorized',
            hint: 'CRON_SECRET is set. Include Authorization header: Bearer <CRON_SECRET>'
          },
          { status: 401 }
        )
      }
    }
    // If CRON_SECRET is not set, allow access (for development/testing)

    const supabase = createAdminClient()
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    // Get today's data (for current day report)
    // If you want yesterday's data, change startDate to yesterday
    const startDate = todayStr
    const endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Tomorrow (exclusive)

    // Get page views for the period
    const { count: totalPageViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate)
      .lt('created_at', endDate)

    // Get unique visitors
    const { data: uniqueIPs } = await supabase
      .from('page_views')
      .select('ip_hash')
      .not('ip_hash', 'is', null)
      .gte('created_at', startDate)
      .lt('created_at', endDate)

    const uniqueVisitors = new Set(uniqueIPs?.map(pv => pv.ip_hash) || []).size

    // Get clicks
    const { count: totalClicks } = await supabase
      .from('click_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate)
      .lt('created_at', endDate)

    // Get top pages
    const { data: pageViews } = await supabase
      .from('page_views')
      .select('path')
      .gte('created_at', startDate)
      .lt('created_at', endDate)

    const pageMap = new Map<string, number>()
    pageViews?.forEach((pv) => {
      pageMap.set(pv.path, (pageMap.get(pv.path) || 0) + 1)
    })

    const topPages = Array.from(pageMap.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Format and send report (show today's date in the report)
    const report = formatDailyReport({
      totalPageViews: totalPageViews || 0,
      uniqueVisitors,
      totalClicks: totalClicks || 0,
      topPages,
      date: todayStr, // Show today's date in the report
    })

    const sent = await sendTelegramMessage(report)

    // Return success even if Telegram fails (for testing/debugging)
    // In production, you might want to fail if notification is critical
    return NextResponse.json({
      success: true,
      message: sent 
        ? 'Daily report sent successfully to Telegram' 
        : 'Report generated but Telegram notification failed (check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID)',
      telegramSent: sent,
      data: {
        totalPageViews: totalPageViews || 0,
        uniqueVisitors,
        totalClicks: totalClicks || 0,
        topPages,
      },
    })
  } catch (error) {
    console.error('[Daily Report] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
