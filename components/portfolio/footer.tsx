"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative py-8">
      {/* Neon accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-red to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo/Name */}
          <div className="flex items-center gap-2">
            <span className="text-neon-red font-mono">{"<"}</span>
            <span className="font-semibold text-foreground">Leith Inoubli</span>
            <span className="text-neon-red font-mono">{"/>"}</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} All rights reserved.
          </p>

          {/* Tech badge */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="text-neon-cyan">Next.js</span>
            <span>&</span>
            <span className="text-neon-magenta">Tailwind</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
