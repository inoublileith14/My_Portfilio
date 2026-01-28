"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/inoublileith14",
    color: "#f5f5f5"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/inoubli-leith-352b05275/",
    color: "#00ffff"
  }
  /* ,
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    color: "#a855f7"
  } */
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-red/10 rounded-full blur-[128px]" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-magenta">{"("}</span>
            Get In Touch
            <span className="text-neon-magenta">{")"}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-red mx-auto mb-8 rounded-full" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            {"I'm"} always interested in hearing about new opportunities and exciting projects. 
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Email */}
            <a 
              href="mailto:inoublileith6@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 
                backdrop-blur-sm hover:border-neon-red/50 transition-all duration-300"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                  group-hover:scale-110"
                style={{
                  backgroundColor: 'rgba(250, 30, 78, 0.2)',
                  boxShadow: '0 0 20px rgba(250, 30, 78, 0.3)'
                }}
              >
                <Mail className="w-5 h-5 text-neon-red" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium group-hover:text-neon-red transition-colors">
                  inoublileith6@gmail.com
                </p>
              </div>
            </a>

            {/* Location */}
            <div 
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 backdrop-blur-sm"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(0, 255, 255, 0.2)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                }}
              >
                <MapPin className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground font-medium">Barcelona, Spain</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 rounded-xl border border-border bg-card/30 
                    backdrop-blur-sm flex items-center justify-center transition-all duration-300
                    hover:border-opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  aria-label={`Visit ${social.name} profile`}
                  style={{
                    boxShadow: `0 0 0 1px ${social.color}10`
                  }}
                >
                  <social.icon 
                    className="w-5 h-5 transition-colors" 
                    style={{ color: social.color }}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{social.name}</span>
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300"
                    style={{
                      boxShadow: `0 0 20px ${social.color}40`
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm 
              overflow-hidden flex flex-col justify-center"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-red/10 via-transparent to-neon-purple/10" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {"Let's"} Work Together
              </h3>
              <p className="text-muted-foreground mb-6">
                Have a project in mind? {"I'd"} love to hear about it and see how I can help bring your ideas to life.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-neon-red hover:bg-neon-red/90 text-primary-foreground px-8"
                style={{
                  boxShadow: '0 0 30px rgba(250, 30, 78, 0.4)'
                }}
              >
                <a href="mailto:inoublileith6@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Message
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
