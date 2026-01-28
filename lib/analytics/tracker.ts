/**
 * Client-side analytics tracker
 * Tracks page views and click events
 */

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /sogou/i,
  /exabot/i,
  /facebot/i,
  /ia_archiver/i,
];

/**
 * Check if user agent is a bot
 */
function isBot(userAgent: string): boolean {
  if (!userAgent) return true;
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
}

/**
 * Track a page view with deduplication
 */
export async function trackPageView(path: string, referrer?: string): Promise<void> {
  // Don't track admin pages
  if (path.startsWith('/admin')) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Skipping admin page:', path);
    }
    return;
  }
  
  // Don't track if bot
  if (typeof window !== 'undefined' && isBot(navigator.userAgent)) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Skipping bot:', navigator.userAgent);
    }
    return;
  }

  // Deduplication: prevent double tracking within 2 seconds
  if (typeof window !== 'undefined') {
    const storageKey = `analytics_track_${path}`
    const lastTracked = sessionStorage.getItem(storageKey)
    const now = Date.now()
    
    if (lastTracked) {
      const timeSinceLastTrack = now - parseInt(lastTracked, 10)
      if (timeSinceLastTrack < 2000) { // 2 seconds
        if (process.env.NODE_ENV === 'development') {
          console.log('[Analytics] Skipping duplicate page view:', path);
        }
        return;
      }
    }
    
    // Store timestamp
    sessionStorage.setItem(storageKey, now.toString())
    
    // Clean up old entries (older than 10 seconds)
    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach(key => {
        if (key.startsWith('analytics_track_')) {
          const timestamp = parseInt(sessionStorage.getItem(key) || '0', 10)
          if (now - timestamp > 10000) {
            sessionStorage.removeItem(key)
          }
        }
      })
    } catch (e) {
      // Ignore storage errors
    }
  }

  try {
    const response = await fetch('/api/track/page-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        referrer: referrer || (typeof window !== 'undefined' ? document.referrer : null) || null,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Analytics] Failed to track page view:', response.status, errorData);
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Page view tracked:', path);
    }
  } catch (error) {
    // Silently fail - analytics should not break the app
    console.error('[Analytics] Failed to track page view:', error);
  }
}

/**
 * Track a click event
 */
export async function trackClick(
  path: string,
  element: string,
  x: number,
  y: number
): Promise<void> {
  // Don't track admin pages
  if (path.startsWith('/admin')) return;
  
  // Don't track if bot
  if (typeof window !== 'undefined' && isBot(navigator.userAgent)) return;

  try {
    const response = await fetch('/api/track/click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        element,
        x,
        y,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Analytics] Failed to track click:', response.status, errorData);
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Click tracked:', { path, element });
    }
  } catch (error) {
    // Silently fail - analytics should not break the app
    console.error('[Analytics] Failed to track click:', error);
  }
}

/**
 * Initialize click tracking
 */
export function initClickTracking(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    // Don't track admin pages
    if (window.location.pathname.startsWith('/admin')) return;

    // Get element identifier (prefer tag name, fallback to text or class)
    let element = target.tagName || 'unknown';
    
    // If it's a button or link, include text content
    if (target.tagName === 'BUTTON' || target.tagName === 'A') {
      const text = target.textContent?.trim().slice(0, 30);
      if (text) {
        element = `${target.tagName}:${text}`;
      }
    }
    
    // Fallback to class name if available
    if (element === 'unknown' && target.className) {
      element = target.className.toString().split(' ')[0] || 'unknown';
    }
    
    // Get click coordinates
    const x = event.clientX;
    const y = event.clientY;

    // Track the click
    trackClick(window.location.pathname, element, x, y);
  };

  document.addEventListener('click', handleClick, true);

  // Return cleanup function
  return () => {
    document.removeEventListener('click', handleClick, true);
  };
}
