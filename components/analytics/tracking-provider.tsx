"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, initClickTracking } from '@/lib/analytics/tracker'

/**
 * Analytics Tracking Provider
 * Automatically tracks page views and click events
 */
export function TrackingProvider() {
  const pathname = usePathname()
  const hasTrackedInitialLoad = useRef(false)

  useEffect(() => {
    // Track initial page load
    if (!hasTrackedInitialLoad.current && pathname && !pathname.startsWith('/admin')) {
      hasTrackedInitialLoad.current = true
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        trackPageView(pathname)
      }, 100)
    }
  }, [])

  useEffect(() => {
    // Track page view on route change (but not on initial mount)
    if (pathname && !pathname.startsWith('/admin') && hasTrackedInitialLoad.current) {
      trackPageView(pathname)
    }
  }, [pathname])

  useEffect(() => {
    // Initialize click tracking
    const cleanup = initClickTracking()
    return cleanup
  }, [])

  return null
}
