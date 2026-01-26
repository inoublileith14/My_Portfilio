"use client"

import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "Core Architecture",
    color: "#fa1e4e",
    description: "System design, patterns, and scalable architecture",
    skills: [
      "Next.js (App Router)",
      "TypeScript",
      "Advanced Design Patterns",
      "Microservices Architecture",
      "Multi-tenant Systems",
      "System Design"
    ]
  },
  {
    title: "Operations & DevOps",
    color: "#00ffff",
    description: "Infrastructure, deployment, and reliability engineering",
    skills: [
      "Docker",
      "Nginx",
      "CI/CD",
      "GCP",
      "OVH Cloud",
      "Infrastructure as Code"
    ]
  },
  {
    title: "Real-Time Systems",
    color: "#ec4899",
    description: "Low-latency streaming and event-driven architectures",
    skills: [
      "HLS.js",
      "WebSockets",
      "WebRTC",
      "Firebase Realtime DB",
      "RTSP Streaming",
      "Event-Driven Architecture"
    ]
  },
  {
    title: "Leadership & Engineering Excellence",
    color: "#a855f7",
    description: "Technical leadership, mentorship, and documentation",
    skills: [
      "Technical Documentation",
      "System Design",
      "Mentorship",
      "Code Reviews",
      "Architecture Decision Records",
      "Technical Strategy"
    ]
  }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(250, 30, 78, 0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-magenta">{"{"}</span>
            {" Skills "}
            <span className="text-neon-magenta">{"}"}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-8 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Engineering capabilities across architecture, infrastructure, and technical leadership
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${category.color}10 0%, transparent 70%)`
                }}
              />
              
              {/* Border glow */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `inset 0 0 0 1px ${category.color}40`
                }}
              />

              <h3 
                className="text-lg font-semibold mb-2 flex items-center gap-2"
                style={{ color: category.color }}
              >
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color, boxShadow: `0 0 10px ${category.color}` }}
                />
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-secondary/80 text-foreground border border-border
                      hover:border-opacity-50 transition-all duration-200 cursor-default"
                    style={{
                      borderColor: `${category.color}30`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
