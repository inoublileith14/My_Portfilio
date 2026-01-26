"use client"

import { motion } from "framer-motion"
import { Building2, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Full-Stack Developer",
    company: "Bega Software",
    period: "2023 - Present",
    description: "Building scalable web and mobile applications using React, Next.js, NestJS, and Flutter. Implementing real-time features, map integrations, and IoT solutions.",
    highlights: ["React Native", "NestJS", "Flutter", "WebSockets"],
    color: "#fa1e4e"
  },
  {
    title: "Frontend Developer",
    company: "Bega Software",
    period: "2022 - 2023",
    description: "Developed responsive user interfaces and dashboards. Worked with React ecosystem and implemented complex data visualizations.",
    highlights: ["React", "TypeScript", "Tailwind CSS", "Data Viz"],
    color: "#00ffff"
  },
  {
    title: "Software Engineering Intern",
    company: "FIRESHIP",
    period: "2022",
    description: "Contributed to full-stack development projects. Gained hands-on experience with modern web technologies and agile methodologies.",
    highlights: ["Full-Stack", "Agile", "Git"],
    color: "#a855f7"
  },
  {
    title: "Development Intern",
    company: "INFOESPRIT",
    period: "2021",
    description: "Started journey in software development. Learned fundamentals of web development and database management.",
    highlights: ["Web Dev", "Databases", "Backend"],
    color: "#ec4899"
  }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-purple">{"["}</span>
            {" Experience "}
            <span className="text-neon-purple">{"]"}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-magenta to-neon-red mx-auto mb-8 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-red via-neon-cyan to-neon-purple" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div 
                className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full z-10"
                style={{
                  backgroundColor: exp.color,
                  boxShadow: `0 0 20px ${exp.color}, 0 0 40px ${exp.color}50`
                }}
              />

              {/* Content card */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              }`}>
                <div 
                  className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm 
                    hover:border-opacity-50 transition-all duration-300"
                  style={{
                    boxShadow: `0 0 0 1px ${exp.color}10`
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div 
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono"
                      style={{ 
                        backgroundColor: `${exp.color}20`,
                        color: exp.color
                      }}
                    >
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
