"use client"

import { motion } from "framer-motion"
import { Code2, Smartphone, Cloud, Zap } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building end-to-end solutions with modern frameworks",
    color: "neon-red"
  },
  {
    icon: Smartphone,
    title: "Mobile Expertise",
    description: "Cross-platform apps with Flutter & React Native",
    color: "neon-cyan"
  },
  {
    icon: Zap,
    title: "Real-Time Systems",
    description: "WebSockets, WebRTC, and streaming solutions",
    color: "neon-magenta"
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scalable deployments with Docker & Google Cloud",
    color: "neon-purple"
  }
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I&apos;m a passionate <span className="text-foreground font-semibold">Full-Stack Engineer</span> with 
              expertise in building high-quality, scalable web and mobile applications. My experience spans 
              across various industries including healthcare, mobility, and IoT solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I specialize in creating <span className="text-neon-cyan">real-time applications</span> using 
              WebSockets and WebRTC, developing <span className="text-neon-magenta">interactive maps</span> with 
              Mapbox and Google Maps API, and building <span className="text-neon-purple">BLE-connected IoT</span> solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My commitment to clean code and best practices ensures that every project I work on is 
              maintainable, performant, and built to scale.
            </p>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm 
                  hover:border-${item.color}/50 transition-all duration-300`}
                style={{
                  boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05)'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`} />
                <item.icon className={`w-8 h-8 mb-4 text-${item.color}`} />
                <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
