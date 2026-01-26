import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPost, getAllPosts } from "@/lib/blog"
import { BlogPostClient } from "./blog-post-client"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Post Not Found | Leith Inoubli",
    }
  }

  return {
    title: `${post.title} | Leith Inoubli`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
