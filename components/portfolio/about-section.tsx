"use client"

import { motion } from "framer-motion"
import { Shield, Layers, Users, Gamepad2 } from "lucide-react"

const philosophyPillars = [
  {
    icon: Shield,
    title: "Type Safety",
    description: "TypeScript-first approach for reliable, self-documenting code",
    color: "text-neon-red",
    hoverBorder: "hover:border-neon-red/50",
    hoverBg: "group-hover:from-neon-red/5",
  },
  {
    icon: Layers,
    title: "DRY Principles",
    description: "Reusable patterns and abstractions that scale",
    color: "text-neon-cyan",
    hoverBorder: "hover:border-neon-cyan/50",
    hoverBg: "group-hover:from-neon-cyan/5",
  },
  {
    icon: Users,
    title: "User-Centric Design",
    description: "Every line of code serves the end-user experience",
    color: "text-neon-magenta",
    hoverBorder: "hover:border-neon-magenta/50",
    hoverBg: "group-hover:from-neon-magenta/5",
  },
  {
    icon: Gamepad2,
    title: "Performance First",
    description: "Optimized bundles, lazy loading, and edge delivery",
    color: "text-neon-purple",
    hoverBorder: "hover:border-neon-purple/50",
    hoverBg: "group-hover:from-neon-purple/5",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-red/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-cyan">{"<"}</span>
            About Me
            <span className="text-neon-cyan">{" />"}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-red to-neon-magenta mx-auto mb-8 rounded-full" />
        </motion.div>

        {/* Story-driven content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* The Hook & Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* The Hook */}
            <div className="relative">
              <p className="text-2xl md:text-3xl font-semibold text-foreground leading-snug text-pretty">
                I don&apos;t just write code; I build systems that live at the intersection of{" "}
                <span className="text-neon-cyan">human health</span> and{" "}
                <span className="text-neon-magenta">hardware</span>.
              </p>
            </div>

            {/* The Story */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a focus on <span className="text-neon-cyan font-medium">Healthcare</span>,{" "}
              <span className="text-neon-magenta font-medium">Mobility</span>, and{" "}
              <span className="text-neon-purple font-medium">IoT</span>, I specialize in bridging 
              the gap between complex business requirements and high-performance technical reality.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My philosophy is simple: code should be as{" "}
              <span className="text-foreground font-medium">scalable</span> as the businesses it supports 
              and as <span className="text-foreground font-medium">intuitive</span> as the people who use it.
            </p>

            {/* Personal Touch */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-muted-foreground italic">
                When I&apos;m not architecting in Next.js or NestJS, I&apos;m exploring the future 
                of connected devices and cross-platform performance in Flutter.
              </p>
            </div>
          </motion.div>

          {/* Technical Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="text-neon-red font-mono">{"//"}</span>
              Technical Philosophy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {philosophyPillars.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm 
                    ${item.hoverBorder} transition-all duration-300`}
                  style={{
                    boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.hoverBg} to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`}
                  />
                  <div className="relative">
                    <item.icon className={`w-7 h-7 mb-3 ${item.color}`} />
                    <h4 className="font-semibold mb-1 text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
