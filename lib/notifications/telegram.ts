/**
 * Telegram Bot Notification Service
 * 
 * Setup:
 * 1. Create a bot: https://t.me/BotFather
 * 2. Send /newbot and follow instructions
 * 3. Get your bot token
 * 4. Get your chat ID: https://t.me/userinfobot (send /start)
 * 5. Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to .env.local
 */

interface TelegramMessage {
  text: string
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2'
  disable_web_page_preview?: boolean
}

/**
 * Send a message to Telegram
 */
export async function sendTelegramMessage(
  message: string,
  options?: { parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2'; disablePreview?: boolean }
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn('[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return false
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    
    const payload: TelegramMessage = {
      text: message,
      parse_mode: options?.parseMode || 'HTML',
      disable_web_page_preview: options?.disablePreview || false,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        ...payload,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('[Telegram] Failed to send message:', error)
      return false
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Telegram] Message sent successfully')
    }

    return true
  } catch (error) {
    console.error('[Telegram] Error sending message:', error)
    return false
  }
}

/**
 * Format analytics report for Telegram
 */
export function formatDailyReport(data: {
  totalPageViews: number
  uniqueVisitors: number
  totalClicks: number
  topPages: Array<{ path: string; count: number }>
  date: string
}): string {
  const { totalPageViews, uniqueVisitors, totalClicks, topPages, date } = data

  // Format date nicely (e.g., "January 28, 2024")
  const dateObj = new Date(date + 'T00:00:00')
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  let message = `📊 <b>Daily Analytics Report</b>\n`
  message += `📅 ${formattedDate}\n\n`
  
  message += `👁️ <b>Page Views:</b> ${totalPageViews.toLocaleString()}\n`
  message += `👥 <b>Unique Visitors:</b> ${uniqueVisitors.toLocaleString()}\n`
  message += `🖱️ <b>Total Clicks:</b> ${totalClicks.toLocaleString()}\n\n`

  if (topPages.length > 0) {
    message += `<b>Top Pages:</b>\n`
    topPages.slice(0, 5).forEach((page, index) => {
      message += `${index + 1}. ${page.path}: ${page.count} views\n`
    })
  }

  return message
}

/**
 * Format comment notification for Telegram
 */
export function formatCommentNotification(data: {
  authorName: string
  authorEmail: string
  content: string
  postSlug: string
  postTitle?: string
}): string {
  const { authorName, authorEmail, content, postSlug, postTitle } = data

  let message = `💬 <b>New Comment Received</b>\n\n`
  message += `👤 <b>Author:</b> ${authorName}\n`
  message += `📧 <b>Email:</b> ${authorEmail}\n`
  message += `📝 <b>Post:</b> ${postTitle || postSlug}\n\n`
  message += `<b>Comment:</b>\n`
  message += `${content.slice(0, 200)}${content.length > 200 ? '...' : ''}\n\n`
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  message += `🔗 <a href="${siteUrl}/blog/${postSlug}">View Comment</a>`

  return message
}

/**
 * Format email notification (if you add email monitoring later)
 */
export function formatEmailNotification(data: {
  from: string
  subject: string
  preview: string
}): string {
  const { from, subject, preview } = data

  let message = `📧 <b>New Email Received</b>\n\n`
  message += `👤 <b>From:</b> ${from}\n`
  message += `📌 <b>Subject:</b> ${subject}\n\n`
  message += `<b>Preview:</b>\n`
  message += `${preview.slice(0, 200)}${preview.length > 200 ? '...' : ''}\n\n`
  message += `📬 Check your inbox for the full message.`

  return message
}
