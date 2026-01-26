"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a0a1a]" />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250, 30, 78, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250, 30, 78, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-red/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse delay-500" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-secondary/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-sm text-neon-cyan">Available for opportunities</span>
          </div>

          {/* Value-driven headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-neon-magenta to-neon-purple">Architecting </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-neon-magenta to-neon-purple">
              Scalable Digital Experiences
            </span>
          </h1>

          {/* Sub-headline with value proposition */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed text-pretty">
            Full-stack developer specializing in{" "}
            <span className="text-neon-cyan font-semibold">Next.js</span>,{" "}
            <span className="text-neon-magenta font-semibold">NestJS</span> &{" "}
            <span className="text-neon-purple font-semibold">Flutter</span>.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            I turn complex business requirements into{" "}
            <span className="text-foreground font-medium">high-performance, maintainable code</span>{" "}
            for healthcare, mobility, and IoT industries.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="relative group bg-neon-red hover:bg-neon-red/90 text-primary-foreground px-8 py-6 text-lg transition-all duration-300"
              style={{
                boxShadow: '0 0 20px rgba(250, 30, 78, 0.4)'
              }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-neon-red/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="relative group border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 px-8 py-6 text-lg transition-all duration-300 bg-transparent"
              style={{
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
              }}
              asChild
            >
              <a href="#contact">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Book a Consultation</span>
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1, duration: 0.5 },
            y: { delay: 1.5, duration: 1.5, repeat: Infinity }
          }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
}
