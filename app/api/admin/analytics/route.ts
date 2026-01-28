import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

const ADMIN_SESSION_COOKIE = 'admin_session'
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'change-this-in-production'

/**
 * Validate admin session
 */
function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    return decoded.startsWith(`${ADMIN_SESSION_SECRET}-`)
  } catch {
    return false
  }
}

async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
    return sessionToken ? validateSessionToken(sessionToken) : false
  } catch {
    return false
  }
}

/**
 * GET /api/admin/analytics
 * Get analytics data (requires authentication)
 */
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createAdminClient()
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')

    // Get total page views
    const { count: totalPageViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })

    // Get page views per page
    const { data: pageViewsByPath } = await supabase
      .from('page_views')
      .select('path')
      .order('created_at', { ascending: false })

    // Group by path
    const pageViewsMap = new Map<string, number>()
    pageViewsByPath?.forEach((pv) => {
      pageViewsMap.set(pv.path, (pageViewsMap.get(pv.path) || 0) + 1)
    })

    const pageViewsPerPage = Array.from(pageViewsMap.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)

    // Get recent clicks
    const { data: recentClicks } = await supabase
      .from('click_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    // Get most clicked elements
    const { data: allClicks } = await supabase
      .from('click_events')
      .select('element')

    const elementMap = new Map<string, number>()
    allClicks?.forEach((click) => {
      elementMap.set(click.element, (elementMap.get(click.element) || 0) + 1)
    })

    const mostClickedElements = Array.from(elementMap.entries())
      .map(([element, count]) => ({ element, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Get unique visitors by IP hash (privacy-compliant)
    const { data: uniqueIPs } = await supabase
      .from('page_views')
      .select('ip_hash')
      .not('ip_hash', 'is', null)

    const uniqueVisitors = new Set(uniqueIPs?.map(pv => pv.ip_hash) || []).size

    // Get top countries/regions by anonymized IP (first 2 octets)
    const { data: ipData } = await supabase
      .from('page_views')
      .select('ip_address')
      .not('ip_address', 'is', null)

    const ipMap = new Map<string, number>()
    ipData?.forEach((pv) => {
      if (pv.ip_address && pv.ip_address !== 'unknown') {
        // Group by first 2 octets (e.g., 192.168.x.x)
        const prefix = pv.ip_address.split('.').slice(0, 2).join('.')
        ipMap.set(prefix, (ipMap.get(prefix) || 0) + 1)
      }
    })

    const topIPPrefixes = Array.from(ipMap.entries())
      .map(([prefix, count]) => ({ prefix: `${prefix}.x.x`, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Get page views for last 7 days (for chart)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentPageViews } = await supabase
      .from('page_views')
      .select('created_at')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: true })

    // Group by date
    const dailyViews = new Map<string, number>()
    recentPageViews?.forEach((pv) => {
      const date = new Date(pv.created_at).toISOString().split('T')[0]
      dailyViews.set(date, (dailyViews.get(date) || 0) + 1)
    })

    // Fill in missing days
    const chartData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      chartData.push({
        date: dateStr,
        views: dailyViews.get(dateStr) || 0,
      })
    }

    return NextResponse.json({
      totalPageViews: totalPageViews || 0,
      uniqueVisitors,
      pageViewsPerPage,
      recentClicks: recentClicks || [],
      mostClickedElements,
      topIPPrefixes,
      chartData,
    })
  } catch (error) {
    console.error('[Admin Analytics] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
