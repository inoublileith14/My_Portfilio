/**
 * IP Geolocation Service
 * 
 * Uses free IP geolocation APIs to get location data from IP addresses
 * Options:
 * 1. ipapi.co (free tier: 1,000 requests/day)
 * 2. ip-api.com (free tier: 45 requests/minute)
 * 3. ipgeolocation.io (free tier: 1,000 requests/month)
 */

interface GeolocationData {
  country: string
  countryCode: string
  city: string
  region: string
  latitude: number
  longitude: number
  timezone: string
  isp?: string
}

/**
 * Get geolocation data from IP address
 * Uses ip-api.com (free, no API key required for basic usage)
 */
export async function getIPGeolocation(ip: string): Promise<GeolocationData | null> {
  // Skip localhost and private IPs
  if (
    !ip ||
    ip === 'unknown' ||
    ip.startsWith('127.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.')
  ) {
    return null
  }

  try {
    // Use ip-api.com (free, no API key needed)
    // Format: http://ip-api.com/json/{ip}?fields=status,message,country,countryCode,city,region,lat,lon,timezone,isp
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,city,region,lat,lon,timezone,isp`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.warn(`[Geolocation] Failed to fetch for IP ${ip}: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.status === 'fail') {
      console.warn(`[Geolocation] API error for IP ${ip}: ${data.message}`)
      return null
    }

    return {
      country: data.country || 'Unknown',
      countryCode: data.countryCode || 'XX',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      latitude: data.lat || 0,
      longitude: data.lon || 0,
      timezone: data.timezone || 'UTC',
      isp: data.isp,
    }
  } catch (error) {
    console.error(`[Geolocation] Error fetching location for IP ${ip}:`, error)
    return null
  }
}

/**
 * Get geolocation from anonymized IP (first 2 octets)
 * This is less accurate but privacy-friendly
 */
export async function getIPPrefixGeolocation(ipPrefix: string): Promise<GeolocationData | null> {
  // For anonymized IPs like "192.168.x.x", we can't get exact location
  // But we can try to get country-level data if available
  // For now, return null for anonymized IPs
  return null
}
