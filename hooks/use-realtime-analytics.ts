"use client"

import { useEffect, useState, useCallback } from 'react'
import { createRealtimeClient } from '@/lib/supabase/realtime'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface RealtimeAnalyticsState {
  isConnected: boolean
  newPageViews: number
  newClicks: number
  lastUpdate: Date | null
}

/**
 * Hook for real-time analytics updates
 * Subscribes to page_views and click_events tables
 */
export function useRealtimeAnalytics(
  onPageView?: (data: any) => void,
  onClick?: (data: any) => void
) {
  const [state, setState] = useState<RealtimeAnalyticsState>({
    isConnected: false,
    newPageViews: 0,
    newClicks: 0,
    lastUpdate: null,
  })

  const [channels, setChannels] = useState<RealtimeChannel[]>([])

  useEffect(() => {
    const supabase = createRealtimeClient()

    // Subscribe to page_views
    const pageViewsChannel = supabase
      .channel('page_views_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'page_views',
        },
        (payload) => {
          setState((prev) => ({
            ...prev,
            newPageViews: prev.newPageViews + 1,
            lastUpdate: new Date(),
          }))
          onPageView?.(payload.new)
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setState((prev) => ({ ...prev, isConnected: true }))
          if (process.env.NODE_ENV === 'development') {
            console.log('[Realtime] Connected to page_views channel')
          }
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setState((prev) => ({ ...prev, isConnected: false }))
          if (process.env.NODE_ENV === 'development') {
            console.warn('[Realtime] Disconnected from page_views channel:', status)
          }
        }
      })

    // Subscribe to click_events
    const clicksChannel = supabase
      .channel('click_events_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'click_events',
        },
        (payload) => {
          setState((prev) => ({
            ...prev,
            newClicks: prev.newClicks + 1,
            lastUpdate: new Date(),
          }))
          onClick?.(payload.new)
        }
      )
      .subscribe((status) => {
        if (process.env.NODE_ENV === 'development') {
          if (status === 'SUBSCRIBED') {
            console.log('[Realtime] Connected to click_events channel')
          } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
            console.warn('[Realtime] Disconnected from click_events channel:', status)
          }
        }
      })

    setChannels([pageViewsChannel, clicksChannel])

    // Cleanup on unmount
    return () => {
      pageViewsChannel.unsubscribe()
      clicksChannel.unsubscribe()
      setState((prev) => ({ ...prev, isConnected: false }))
    }
  }, [onPageView, onClick])

  const resetCounters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      newPageViews: 0,
      newClicks: 0,
    }))
  }, [])

  return {
    ...state,
    resetCounters,
  }
}
