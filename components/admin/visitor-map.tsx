"use client"

import { useEffect, useRef } from 'react'

interface VisitorLocation {
  country: string
  country_code: string
  city: string
  latitude: number
  longitude: number
  count: number
}

interface VisitorMapProps {
  locations: VisitorLocation[]
}

/**
 * Simple map visualization using Leaflet
 * Shows visitor locations on a world map
 */
export function VisitorMap({ locations }: VisitorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) {
      console.log('[VisitorMap] No map container or locations')
      return
    }

    // Check if Leaflet is already loaded
    // @ts-ignore
    if (window.L && mapInstanceRef.current) {
      // Map already initialized, just update markers
      const L = window.L
      // Clear existing markers and add new ones
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer)
        }
      })
      
      locations.forEach((location) => {
        if (location.latitude && location.longitude) {
          const marker = L.marker([location.latitude, location.longitude]).addTo(mapInstanceRef.current)
          marker.bindPopup(
            `<b>${location.city}, ${location.country}</b><br/>${location.country_code}<br/>${location.count} visitor${location.count > 1 ? 's' : ''}`
          )
        }
      })
      return
    }

    // Dynamically load Leaflet only when component mounts
    const loadMap = async () => {
      try {
        console.log('[VisitorMap] Loading Leaflet...')
        
        // Check if CSS is already loaded
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoSR5mXZytftTQ='
          link.crossOrigin = ''
          document.head.appendChild(link)
        }

        // Check if script is already loaded
        // @ts-ignore
        if (window.L) {
          console.log('[VisitorMap] Leaflet already loaded')
          initializeMap()
          return
        }

        // Load Leaflet JS
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
        script.crossOrigin = ''
        
        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('[VisitorMap] Leaflet script loaded')
            resolve(true)
          }
          script.onerror = (err) => {
            console.error('[VisitorMap] Failed to load Leaflet script:', err)
            reject(err)
          }
          document.head.appendChild(script)
        })

        initializeMap()
      } catch (error) {
        console.error('[VisitorMap] Failed to load map:', error)
      }
    }

    const initializeMap = () => {
      try {
        // @ts-ignore - Leaflet is loaded dynamically
        const L = window.L

        if (!L) {
          console.error('[VisitorMap] Leaflet not available')
          return
        }

        console.log('[VisitorMap] Initializing map with', locations.length, 'locations')

        // Initialize map
        const map = L.map(mapRef.current!, {
          zoomControl: true,
        }).setView([20, 0], 2)

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        // Add markers for each location
        let markerCount = 0
        locations.forEach((location) => {
          if (location.latitude && location.longitude && 
              !isNaN(location.latitude) && !isNaN(location.longitude)) {
            const marker = L.marker([location.latitude, location.longitude]).addTo(map)
            marker.bindPopup(
              `<b>${location.city}, ${location.country}</b><br/>${location.country_code}<br/>${location.count} visitor${location.count > 1 ? 's' : ''}`
            )
            markerCount++
          }
        })

        console.log('[VisitorMap] Added', markerCount, 'markers to map')
        mapInstanceRef.current = map
      } catch (error) {
        console.error('[VisitorMap] Error initializing map:', error)
      }
    }

    loadMap()

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
        } catch (e) {
          // Ignore cleanup errors
        }
        mapInstanceRef.current = null
      }
    }
  }, [locations])

  if (locations.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center border border-border rounded-lg bg-secondary/50">
        <p className="text-muted-foreground">No location data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div ref={mapRef} className="h-96 w-full rounded-lg border border-border" />
      <div className="text-sm text-muted-foreground">
        Showing {locations.length} unique locations
      </div>
    </div>
  )
}
