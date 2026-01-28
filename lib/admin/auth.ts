/**
 * Admin authentication utilities
 */

/**
 * Check if user is authenticated (server-side)
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/auth`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    })

    if (response.ok) {
      const data = await response.json()
      return data.authenticated === true
    }

    return false
  } catch {
    return false
  }
}

/**
 * Check if user is authenticated (client-side)
 */
export async function checkAdminAuth(): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'GET',
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      return data.authenticated === true
    }

    return false
  } catch {
    return false
  }
}

/**
 * Login (client-side)
 */
export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true }
    }

    return { success: false, error: data.error || 'Login failed' }
  } catch (error) {
    return { success: false, error: 'Network error' }
  }
}

/**
 * Logout (client-side)
 */
export async function adminLogout(): Promise<void> {
  try {
    await fetch('/api/admin/auth', {
      method: 'DELETE',
      credentials: 'include',
    })
  } catch (error) {
    console.error('[Admin] Logout error:', error)
  }
}
