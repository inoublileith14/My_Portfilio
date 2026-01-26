"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { Comments } from "@/components/blog/comments"
import { Navbar } from "@/components/portfolio/navbar"
import { Footer } from "@/components/portfolio/footer"

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        {/* Header */}
        <div className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a0a1a]" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <Badge
              variant="outline"
              className="mb-4 border-neon-cyan/50 text-neon-cyan"
            >
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground text-balance">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <button
                type="button"
                className="flex items-center gap-1 text-muted-foreground hover:text-neon-magenta transition-colors cursor-pointer"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {post.image && (
          <div className="max-w-4xl mx-auto px-4 -mt-8 mb-12 relative z-20">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 shadow-2xl shadow-neon-cyan/10">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 pb-16">
          <BlogPostContent slug={post.slug} />
          <Comments postSlug={post.slug} />
        </article>

        {/* Back to Blog */}
        <div className="max-w-3xl mx-auto px-4 pb-24">
          <Button
            asChild
            variant="outline"
            className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 bg-transparent"
          >
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
