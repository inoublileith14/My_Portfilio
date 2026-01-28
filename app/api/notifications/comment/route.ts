import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage, formatCommentNotification } from '@/lib/notifications/telegram'

/**
 * POST /api/notifications/comment
 * Send notification when a new comment is posted
 * 
 * This should be called from your comment creation action
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { authorName, authorEmail, content, postSlug, postTitle } = body

    if (!authorName || !authorEmail || !content || !postSlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const message = formatCommentNotification({
      authorName,
      authorEmail,
      content,
      postSlug,
      postTitle,
    })

    const sent = await sendTelegramMessage(message)

    if (!sent) {
      // Don't fail the request if notification fails
      console.warn('[Comment Notification] Failed to send Telegram message')
      return NextResponse.json({
        success: false,
        warning: 'Comment created but notification failed',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
    })
  } catch (error) {
    console.error('[Comment Notification] Error:', error)
    // Don't fail the request if notification fails
    return NextResponse.json({
      success: false,
      error: 'Failed to send notification',
    })
  }
}
