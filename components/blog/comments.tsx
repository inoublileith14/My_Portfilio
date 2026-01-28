"use client"

import { useState, useEffect, useTransition } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Send, Reply, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createComment, getComments, type Comment } from "@/app/actions/comments"
import { useToast } from "@/hooks/use-toast"

interface CommentsProps {
  postSlug: string
}

export function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadComments()
  }, [postSlug])

  const loadComments = async () => {
    setIsLoading(true)
    const data = await getComments(postSlug)
    setComments(data)
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent, parentId?: string | null) => {
    e.preventDefault()

    if (!formData.authorName.trim() || !formData.authorEmail.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append("postSlug", postSlug)
      formDataToSubmit.append("authorName", formData.authorName)
      formDataToSubmit.append("authorEmail", formData.authorEmail)
      formDataToSubmit.append("content", formData.content)
      if (parentId) {
        formDataToSubmit.append("parentId", parentId)
      }

      const result = await createComment(formDataToSubmit)

      if (result.success) {
        toast({
          title: "Success",
          description: "Your comment has been posted!",
        })
        setFormData({ authorName: "", authorEmail: "", content: "" })
        setReplyingTo(null)
        loadComments()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to post comment",
          variant: "destructive",
        })
      }
    })
  }

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [replyFormData, setReplyFormData] = useState({
      authorName: "",
      authorEmail: "",
      content: "",
    })

    const handleReplySubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!replyFormData.authorName.trim() || !replyFormData.authorEmail.trim() || !replyFormData.content.trim()) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        })
        return
      }

      startTransition(async () => {
        const formDataToSubmit = new FormData()
        formDataToSubmit.append("postSlug", postSlug)
        formDataToSubmit.append("authorName", replyFormData.authorName)
        formDataToSubmit.append("authorEmail", replyFormData.authorEmail)
        formDataToSubmit.append("content", replyFormData.content)
        formDataToSubmit.append("parentId", comment.id)

        const result = await createComment(formDataToSubmit)

        if (result.success) {
          toast({
            title: "Success",
            description: "Your reply has been posted!",
          })
          setReplyFormData({ authorName: "", authorEmail: "", content: "" })
          setShowReplyForm(false)
          loadComments()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to post reply",
            variant: "destructive",
          })
        }
      })
    }

    return (
      <div className={`${depth > 0 ? "ml-8 mt-4 border-l-2 border-border pl-4" : ""}`}>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-cyan/20 text-neon-cyan font-semibold text-sm">
                {comment.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-foreground">{comment.author_name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
          <p className="text-foreground whitespace-pre-wrap mb-3">{comment.content}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10"
          >
            <Reply className="w-4 h-4 mr-1" />
            Reply
          </Button>

          {showReplyForm && (
            <form onSubmit={handleReplySubmit} className="mt-4 space-y-3 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`reply-name-${comment.id}`} className="text-xs text-muted-foreground">
                    Name
                  </Label>
                  <Input
                    id={`reply-name-${comment.id}`}
                    value={replyFormData.authorName}
                    onChange={(e) => setReplyFormData({ ...replyFormData, authorName: e.target.value })}
                    placeholder="Your name"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`reply-email-${comment.id}`} className="text-xs text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id={`reply-email-${comment.id}`}
                    type="email"
                    value={replyFormData.authorEmail}
                    onChange={(e) => setReplyFormData({ ...replyFormData, authorEmail: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`reply-content-${comment.id}`} className="text-xs text-muted-foreground">
                  Reply
                </Label>
                <Textarea
                  id={`reply-content-${comment.id}`}
                  value={replyFormData.content}
                  onChange={(e) => setReplyFormData({ ...replyFormData, content: e.target.value })}
                  placeholder="Write a reply..."
                  className="mt-1 min-h-[100px]"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-neon-cyan text-background hover:bg-neon-cyan/90"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post Reply
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowReplyForm(false)
                    setReplyFormData({ authorName: "", authorEmail: "", content: "" })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-8 text-foreground">
        <span className="text-neon-cyan">{"<"}</span>
        Comments
        <span className="text-neon-cyan">{" />"}</span>
      </h2>

      {/* Comment Form */}
      <form onSubmit={(e) => handleSubmit(e)} className="mb-8 space-y-4 p-6 rounded-lg border border-border bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="authorName" className="text-sm text-muted-foreground">
              Name
            </Label>
            <Input
              id="authorName"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              placeholder="Your name"
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="authorEmail" className="text-sm text-muted-foreground">
              Email
            </Label>
            <Input
              id="authorEmail"
              type="email"
              value={formData.authorEmail}
              onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
              placeholder="your@email.com"
              className="mt-1"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="content" className="text-sm text-muted-foreground">
            Comment
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write a comment..."
            className="mt-1 min-h-[120px]"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-neon-cyan text-background hover:bg-neon-cyan/90"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Comment
            </>
          )}
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-neon-cyan" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">{comments.length} {comments.length === 1 ? "comment" : "comments"}</span>
            </div>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </section>
  )
}
