import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a0a1a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px]" />

      <div className="relative z-10 text-center px-4">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-neon-magenta to-neon-purple">
              404
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-neon-red to-neon-magenta rounded-full" />
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been moved. 
          Let me help you find your way back.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-neon-red hover:bg-neon-red/90 text-primary-foreground"
            style={{
              boxShadow: "0 0 20px rgba(250, 30, 78, 0.4)",
            }}
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 bg-transparent"
          >
            <Link href="/blog">
              <ArrowLeft className="w-5 h-5 mr-2" />
              View Blog
            </Link>
          </Button>
        </div>

        {/* Code snippet decoration */}
        <div className="mt-16 font-mono text-sm text-muted-foreground/50">
          <span className="text-neon-red">{"<"}</span>
          <span className="text-neon-cyan">Error</span>
          <span className="text-neon-red">{" />"}</span>
          <span className="ml-2">{"// Page not found in filesystem"}</span>
        </div>
      </div>
    </main>
  )
}
