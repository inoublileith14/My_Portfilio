import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllPosts, getFeaturedPost } from "@/lib/blog"
import { Navbar } from "@/components/portfolio/navbar"
import { Footer } from "@/components/portfolio/footer"

export const metadata: Metadata = {
  title: "Blog | Leith Inoubli",
  description:
    "Thoughts on software engineering, healthcare tech, IoT, and building scalable systems.",
}

export default function BlogPage() {
  const featuredPost = getFeaturedPost()
  const allPosts = getAllPosts().filter((post) => !post.featured)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        {/* Header */}
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a0a1a]" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-neon-cyan">{"<"}</span>
              Blog
              <span className="text-neon-cyan">{" />"}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts on software engineering, healthcare tech, IoT, and building
              scalable systems.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-24">
          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-16">
              <h2 className="text-sm font-mono text-neon-magenta uppercase tracking-wider mb-6">
                Featured Post
              </h2>
              <Link href={`/blog/${featuredPost.slug}`}>
                <Card className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:border-neon-red/50 transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative aspect-video md:aspect-auto overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-red/20 to-neon-purple/20" />
                      {featuredPost.image ? (
                        <Image
                          src={featuredPost.image || "/placeholder.svg"}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full min-h-[250px] bg-gradient-to-br from-neon-red/10 to-neon-purple/10 flex items-center justify-center">
                          <span className="text-6xl font-bold text-neon-red/20">
                            {"{ }"}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                      <Badge
                        variant="outline"
                        className="w-fit mb-4 border-neon-cyan/50 text-neon-cyan"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {featuredPost.category}
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-neon-red transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        {featuredPost.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-fit text-neon-red hover:text-neon-red hover:bg-neon-red/10 p-0"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </section>
          )}

          {/* All Posts Grid */}
          <section>
            <h2 className="text-sm font-mono text-neon-magenta uppercase tracking-wider mb-6">
              All Posts
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {allPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="group h-full overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:border-neon-cyan/50 transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 flex items-center justify-center">
                          <span className="text-4xl font-bold text-neon-cyan/20">
                            {"{ }"}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <Badge
                        variant="outline"
                        className="w-fit mb-3 border-neon-magenta/50 text-neon-magenta"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-neon-cyan transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <Button
              asChild
              variant="outline"
              className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 bg-transparent"
            >
              <Link href="/">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
