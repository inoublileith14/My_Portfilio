"use client"

import { motion } from "framer-motion"
import { GraduationCap, Languages } from "lucide-react"

const education = [
  {
    degree: "Software Engineering",
    institution: "ESPRIT",
    period: "2019 - 2024",
    description: "Comprehensive education in software engineering, computer science fundamentals, and modern development practices."
  }
]

const languages = [
  { name: "Arabic", level: "Native", percentage: 100 },
  { name: "French", level: "Fluent", percentage: 90 },
  { name: "English", level: "Professional", percentage: 85 },
  { name: "Spanish", level: "Basic", percentage: 30 }
]

export function EducationSection() {
  return (
    <section id="education" className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-cyan">{"const"}</span>
            {" education "}
            <span className="text-neon-cyan">{"="}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-red to-neon-magenta mx-auto mb-8 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                  }}
                >
                  <GraduationCap className="w-6 h-6 text-neon-purple" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Education</h3>
              </div>

              {education.map((edu) => (
                <div key={edu.degree} className="mb-4 last:mb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                      <p className="text-muted-foreground text-sm">{edu.institution}</p>
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-mono bg-neon-purple/20 text-neon-purple"
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                  }}
                >
                  <Languages className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Languages</h3>
              </div>

              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium">{lang.name}</span>
                      <span className="text-muted-foreground text-sm">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                          background: `linear-gradient(90deg, #fa1e4e, #00ffff)`,
                          boxShadow: '0 0 10px rgba(250, 30, 78, 0.5)'
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
