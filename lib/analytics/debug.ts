/**
 * Analytics Debug Utilities
 * Use these in development to debug tracking issues
 */

const DEBUG = process.env.NODE_ENV === 'development'

/**
 * Log analytics event (development only)
 */
export function logAnalyticsEvent(type: 'page_view' | 'click', data: any) {
  if (!DEBUG) return
  
  console.group(`[Analytics] ${type.toUpperCase()}`)
  console.log('Data:', data)
  console.log('Timestamp:', new Date().toISOString())
  console.groupEnd()
}

/**
 * Test tracking endpoint
 */
export async function testTrackingEndpoint(
  endpoint: '/api/track/page-view' | '/api/track/click',
  data: any
) {
  try {
    console.log(`[Analytics Debug] Testing ${endpoint}...`)
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log(`[Analytics Debug] ✅ Success:`, result)
    } else {
      console.error(`[Analytics Debug] ❌ Error (${response.status}):`, result)
    }

    return { success: response.ok, data: result }
  } catch (error) {
    console.error(`[Analytics Debug] ❌ Network error:`, error)
    return { success: false, error }
  }
}

/**
 * Verify Supabase connection
 */
export async function verifySupabaseConnection() {
  if (typeof window === 'undefined') {
    console.warn('[Analytics Debug] Can only run in browser')
    return
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.group('[Analytics Debug] Supabase Connection')
  console.log('URL:', url ? '✅ Set' : '❌ Missing')
  console.log('Anon Key:', key ? '✅ Set' : '❌ Missing')
  
  if (url && key) {
    try {
      const response = await fetch(`${url}/rest/v1/`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
        },
      })
      console.log('Connection:', response.ok ? '✅ Connected' : '❌ Failed')
    } catch (error) {
      console.error('Connection Error:', error)
    }
  }
  
  console.groupEnd()
}
