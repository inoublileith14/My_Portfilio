"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

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
  onNewLocation?: (location: VisitorLocation) => void
}

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

const MarkerClusterGroup = dynamic(
  () => import('react-leaflet-cluster').then((mod) => mod.default),
  { ssr: false }
)

/**
 * Professional Leaflet map with marker clustering
 * Shows individual visitor markers that cluster when close together
 */
export function VisitorMap({ locations: initialLocations, onNewLocation }: VisitorMapProps) {
  const [mounted, setMounted] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [locations, setLocations] = useState<VisitorLocation[]>(initialLocations)

  // Update locations when prop changes
  useEffect(() => {
    setLocations(initialLocations)
  }, [initialLocations])

  // Load Leaflet CSS, MarkerCluster CSS, and fix default icon
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)

      // Import Leaflet CSS
      // @ts-expect-error - CSS imports don't have type declarations
      import('leaflet/dist/leaflet.css')
      
      // Import MarkerCluster CSS
      // @ts-expect-error - CSS imports don't have type declarations
      import('leaflet.markercluster/dist/MarkerCluster.css')
      // @ts-expect-error - CSS imports don't have type declarations
      import('leaflet.markercluster/dist/MarkerCluster.Default.css')

      // Fix Leaflet default icon issue in Next.js
      import('leaflet').then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })
        setLeafletLoaded(true)
      })
    }
  }, [])

  // Handle new location updates from realtime
  useEffect(() => {
    if (onNewLocation) {
      // This will be called from parent when realtime update comes in
      // The parent will update initialLocations, which triggers the useEffect above
    }
  }, [onNewLocation])

  // Filter valid locations
  const validLocations = locations.filter(
    loc => loc.latitude && loc.longitude && 
           !isNaN(loc.latitude) && !isNaN(loc.longitude) &&
           loc.latitude >= -90 && loc.latitude <= 90 &&
           loc.longitude >= -180 && loc.longitude <= 180
  )

  // Expand locations into individual markers (one per visitor)
  // Add slight random offset to prevent exact overlap
  const individualMarkers = validLocations.flatMap((location) => {
    const markers = []
    const offsetRange = 0.001 // ~100 meters
    
    for (let i = 0; i < location.count; i++) {
      const randomOffsetLat = (Math.random() - 0.5) * offsetRange
      const randomOffsetLng = (Math.random() - 0.5) * offsetRange
      
      markers.push({
        id: `${location.latitude}-${location.longitude}-${i}`,
        latitude: location.latitude + randomOffsetLat,
        longitude: location.longitude + randomOffsetLng,
        country: location.country,
        country_code: location.country_code,
        city: location.city,
        originalLocation: location,
      })
    }
    return markers
  })

  // Calculate map center and zoom
  const getMapCenter = () => {
    if (validLocations.length === 0) {
      return [20, 0] as [number, number]
    }
    const avgLat = validLocations.reduce((sum, loc) => sum + loc.latitude, 0) / validLocations.length
    const avgLng = validLocations.reduce((sum, loc) => sum + loc.longitude, 0) / validLocations.length
    return [avgLat, avgLng] as [number, number]
  }

  const getMapZoom = () => {
    if (validLocations.length === 0) return 2
    if (validLocations.length === 1) return 4
    return 2
  }

  // Create custom icon for individual markers
  const createCustomIcon = () => {
    if (typeof window === 'undefined' || !leafletLoaded) {
      return undefined
    }

    try {
      const L = (window as any).L
      if (!L || !L.divIcon) {
        return undefined
      }

      const size = 24
      return L.divIcon({
        className: 'custom-visitor-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            border: 2px solid #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
            cursor: pointer;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })
    } catch (error) {
      console.error('[VisitorMap] Error creating custom icon:', error)
      return undefined
    }
  }

  if (!mounted) {
    return (
      <div className="h-96 flex items-center justify-center border border-border rounded-lg bg-card">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div 
        className="w-full rounded-lg border border-border bg-card relative overflow-hidden"
        style={{ height: '384px', minHeight: '384px' }}
      >
        <style jsx global>{`
          .leaflet-container {
            height: 100% !important;
            width: 100% !important;
            background: hsl(var(--card)) !important;
            font-family: inherit;
          }
          .leaflet-tile-container img {
            max-width: none !important;
            max-height: none !important;
          }
          .custom-visitor-marker {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-popup-content-wrapper {
            background: hsl(var(--popover)) !important;
            color: hsl(var(--popover-foreground)) !important;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          .leaflet-popup-content {
            margin: 12px 16px;
            font-size: 14px;
          }
          .leaflet-popup-tip {
            background: hsl(var(--popover)) !important;
          }
          .leaflet-control-zoom {
            border: 1px solid hsl(var(--border)) !important;
            border-radius: 4px;
            overflow: hidden;
          }
          .leaflet-control-zoom a {
            background-color: hsl(var(--card)) !important;
            color: hsl(var(--foreground)) !important;
            border-bottom: 1px solid hsl(var(--border)) !important;
          }
          .leaflet-control-zoom a:hover {
            background-color: hsl(var(--accent)) !important;
          }
          /* Marker Cluster Styles */
          .marker-cluster-small,
          .marker-cluster-medium,
          .marker-cluster-large {
            background: transparent !important;
          }
          .marker-cluster div {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
            color: white !important;
            border: 3px solid white !important;
            border-radius: 50% !important;
            font-weight: bold !important;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
            width: 40px !important;
            height: 40px !important;
            margin-left: -20px !important;
            margin-top: -20px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 14px !important;
          }
          .marker-cluster-small div {
            width: 35px !important;
            height: 35px !important;
            margin-left: -17.5px !important;
            margin-top: -17.5px !important;
            font-size: 12px !important;
          }
          .marker-cluster-large div {
            width: 50px !important;
            height: 50px !important;
            margin-left: -25px !important;
            margin-top: -25px !important;
            font-size: 16px !important;
          }
        `}</style>
        
        {leafletLoaded && (
          <MapContainer
            center={getMapCenter()}
            zoom={getMapZoom()}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            key="visitor-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
              minZoom={2}
            />
            
            <MarkerClusterGroup
              chunkedLoading
              maxClusterRadius={50}
              spiderfyOnMaxZoom={true}
              showCoverageOnHover={true}
              zoomToBoundsOnClick={true}
            >
              {individualMarkers.map((marker) => {
                const icon = createCustomIcon()
                
                return (
                  <Marker
                    key={marker.id}
                    position={[marker.latitude, marker.longitude]}
                    icon={icon || undefined}
                  >
                    <Popup>
                      <div className="space-y-2 min-w-[200px]">
                        <div>
                          <p className="font-semibold text-base">
                            {marker.city || 'Unknown'}, {marker.country}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {marker.country_code}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <p className="text-sm font-medium text-primary">
                            Visitor Location
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {marker.latitude.toFixed(4)}°, {marker.longitude.toFixed(4)}°
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MarkerClusterGroup>
          </MapContainer>
        )}
        
        {!leafletLoaded && (
          <div className="h-full flex items-center justify-center">
            <div className="text-muted-foreground">Loading map...</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <span>
          {individualMarkers.length > 0 
            ? `Showing ${individualMarkers.length} visitor marker${individualMarkers.length > 1 ? 's' : ''} from ${validLocations.length} location${validLocations.length > 1 ? 's' : ''}`
            : 'No location data yet. Visit your site to generate location data.'}
        </span>
        {individualMarkers.length > 0 && (
          <span className="text-xs">Markers cluster when close • Click to zoom in</span>
        )}
      </div>
    </div>
  )
}
