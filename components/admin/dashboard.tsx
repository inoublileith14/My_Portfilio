"use client"

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogout } from '@/lib/admin/auth'
import { useRealtimeAnalytics } from '@/hooks/use-realtime-analytics'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { LogOut, TrendingUp, MousePointerClick, Eye, FileText, Radio, Wifi, WifiOff, Users } from 'lucide-react'

interface AnalyticsData {
  totalPageViews: number
  uniqueVisitors: number
  pageViewsPerPage: Array<{ path: string; count: number }>
  recentClicks: Array<{
    id: string
    path: string
    element: string
    x: number
    y: number
    created_at: string
  }>
  mostClickedElements: Array<{ element: string; count: number }>
  topIPPrefixes: Array<{ prefix: string; count: number }>
  chartData: Array<{ date: string; views: number }>
}

export function AdminDashboard() {
  const router = useRouter()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Real-time update handlers
  const handleNewPageView = useCallback((newPageView: any) => {
    setData((prev) => {
      if (!prev) return prev
      
      // Update total
      const newTotal = prev.totalPageViews + 1
      
      // Update page views per page
      const pageViewsMap = new Map(prev.pageViewsPerPage.map(p => [p.path, p.count]))
      const currentCount = pageViewsMap.get(newPageView.path) || 0
      pageViewsMap.set(newPageView.path, currentCount + 1)
      const updatedPageViews = Array.from(pageViewsMap.entries())
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
      
      // Update chart data (today's count)
      const today = new Date().toISOString().split('T')[0]
      let updatedChartData = prev.chartData.map((item) => {
        if (item.date === today) {
          return { ...item, views: item.views + 1 }
        }
        return item
      })
      
      // If today's date is not in chart data, add it
      if (!updatedChartData.find(item => item.date === today)) {
        updatedChartData = [...updatedChartData, { date: today, views: 1 }]
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(-7) // Keep last 7 days
      }
      
      return {
        ...prev,
        totalPageViews: newTotal,
        pageViewsPerPage: updatedPageViews,
        chartData: updatedChartData,
      }
    })
  }, [])

  const handleNewClick = useCallback((newClick: any) => {
    setData((prev) => {
      if (!prev) return prev
      
      // Add to recent clicks (prepend)
      const updatedRecentClicks = [
        {
          id: newClick.id,
          path: newClick.path,
          element: newClick.element,
          x: newClick.x,
          y: newClick.y,
          created_at: newClick.created_at,
        },
        ...prev.recentClicks.slice(0, 99), // Keep last 100
      ]
      
      // Update most clicked elements
      const elementMap = new Map(prev.mostClickedElements.map(e => [e.element, e.count]))
      const currentCount = elementMap.get(newClick.element) || 0
      elementMap.set(newClick.element, currentCount + 1)
      const updatedElements = Array.from(elementMap.entries())
        .map(([element, count]) => ({ element, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
      
      return {
        ...prev,
        recentClicks: updatedRecentClicks,
        mostClickedElements: updatedElements,
      }
    })
  }, [])

  // Real-time analytics hook
  const { isConnected, newPageViews, newClicks, resetCounters } = useRealtimeAnalytics(
    handleNewPageView,
    handleNewClick
  )

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/analytics', {
        credentials: 'include',
      })

      if (response.status === 401) {
        router.push('/admin')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const analyticsData = await response.json()
      setData(analyticsData)
      // Reset real-time counters after full refresh
      resetCounters()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
    // Refresh every 60 seconds (reduced frequency since we have real-time)
    const interval = setInterval(fetchAnalytics, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    await adminLogout()
    router.push('/admin')
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-destructive">{error}</div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              {/* Live Indicator */}
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-500">Live</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-500/10 border border-gray-500/20">
                    <WifiOff className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-500">Offline</span>
                  </div>
                )}
                {(newPageViews > 0 || newClicks > 0) && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {newPageViews > 0 && <span>+{newPageViews} views</span>}
                    {newClicks > 0 && <span>+{newClicks} clicks</span>}
                  </div>
                )}
              </div>
            </div>
            <p className="text-muted-foreground mt-1">Custom analytics for your portfolio</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Page Views</p>
                <p className="text-2xl font-bold">
                  {data.totalPageViews.toLocaleString()}
                  {newPageViews > 0 && (
                    <span className="ml-2 text-sm text-green-500">+{newPageViews}</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold">{(data.uniqueVisitors || 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">By IP hash (privacy-safe)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <MousePointerClick className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-bold">{data.recentClicks.length}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tracked Pages</p>
                <p className="text-2xl font-bold">{data.pageViewsPerPage.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">Page Views (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Page Views Per Page */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Page Views by Path</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {data.pageViewsPerPage.length === 0 ? (
                <p className="text-muted-foreground text-sm">No page views yet</p>
              ) : (
                data.pageViewsPerPage.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <span className="text-sm font-mono truncate flex-1">{item.path}</span>
                    <span className="text-sm font-semibold ml-4">{item.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Most Clicked Elements */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Most Clicked Elements</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {data.mostClickedElements.length === 0 ? (
                <p className="text-muted-foreground text-sm">No clicks tracked yet</p>
              ) : (
                data.mostClickedElements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <span className="text-sm truncate flex-1">{item.element}</span>
                    <span className="text-sm font-semibold ml-4">{item.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top IP Prefixes (Privacy-Safe) */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Top IP Ranges</h2>
            <p className="text-xs text-muted-foreground mb-3">
              Anonymized (first 2 octets only) for privacy
            </p>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {(!data.topIPPrefixes || data.topIPPrefixes.length === 0) ? (
                <p className="text-muted-foreground text-sm">No IP data yet</p>
              ) : (
                data.topIPPrefixes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <span className="text-sm font-mono truncate flex-1">{item.prefix}</span>
                    <span className="text-sm font-semibold ml-4">{item.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Clicks */}
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">Recent Clicks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2">Path</th>
                  <th className="text-left p-2">Element</th>
                  <th className="text-left p-2">Position</th>
                  <th className="text-left p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentClicks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-muted-foreground">
                      No clicks tracked yet
                    </td>
                  </tr>
                ) : (
                  data.recentClicks.slice(0, 20).map((click) => (
                    <tr key={click.id} className="border-b border-border/50">
                      <td className="p-2 font-mono text-xs">{click.path}</td>
                      <td className="p-2 text-xs">{click.element.slice(0, 30)}</td>
                      <td className="p-2 text-xs text-muted-foreground">
                        ({click.x}, {click.y})
                      </td>
                      <td className="p-2 text-xs text-muted-foreground">
                        {new Date(click.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
