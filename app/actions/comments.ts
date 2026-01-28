'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const commentSchema = z.object({
  postSlug: z.string().min(1),
  authorName: z.string().min(1).max(100),
  authorEmail: z.string().email().max(255),
  content: z.string().min(1).max(5000),
  parentId: z.string().uuid().optional().nullable(),
})

export type Comment = {
  id: string
  post_slug: string
  author_name: string
  author_email: string
  content: string
  parent_id: string | null
  created_at: string
  updated_at: string
  replies?: Comment[]
}

export async function createComment(formData: FormData) {
  try {
    const supabase = await createClient()

    const rawData = {
      postSlug: formData.get('postSlug') as string,
      authorName: formData.get('authorName') as string,
      authorEmail: formData.get('authorEmail') as string,
      content: formData.get('content') as string,
      parentId: formData.get('parentId') as string | null,
    }

    const validated = commentSchema.parse(rawData)

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_slug: validated.postSlug,
        author_name: validated.authorName,
        author_email: validated.authorEmail,
        content: validated.content,
        parent_id: validated.parentId || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating comment:', error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/blog/${validated.postSlug}`)
    
    // Send Telegram notification (non-blocking)
    try {
      // Get blog post title if available
      const { getBlogPost } = await import('@/lib/blog')
      const post = getBlogPost(validated.postSlug)
      
      // Send notification in background (don't wait for it)
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/notifications/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: validated.authorName,
          authorEmail: validated.authorEmail,
          content: validated.content,
          postSlug: validated.postSlug,
          postTitle: post?.title,
        }),
      }).catch((err) => {
        console.error('[Comment Notification] Failed to send:', err)
        // Don't fail the comment creation if notification fails
      })
    } catch (error) {
      // Silently fail - notification is optional
      console.error('[Comment Notification] Error:', error)
    }
    
    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    console.error('Error creating comment:', error)
    return { success: false, error: 'Failed to create comment' }
  }
}

export async function getComments(postSlug: string): Promise<Comment[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_slug', postSlug)
      .is('parent_id', null)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comments:', error)
      return []
    }

    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(
      (data || []).map(async (comment) => {
        const { data: replies } = await supabase
          .from('comments')
          .select('*')
          .eq('parent_id', comment.id)
          .order('created_at', { ascending: true })

        return {
          ...comment,
          replies: replies || [],
        }
      })
    )

    return commentsWithReplies as Comment[]
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}
