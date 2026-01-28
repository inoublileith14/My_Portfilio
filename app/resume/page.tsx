import type { Metadata } from "next"
import { Mail, Phone, MapPin, Linkedin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/portfolio/navbar"
import { Footer } from "@/components/portfolio/footer"
import { DownloadResumeButton } from "@/components/resume/download-button"

export const metadata: Metadata = {
  title: "Resume | Leith Inoubli",
  description: "Front-End / Full-Stack Developer with 4+ years of experience in React, TypeScript, and modern web technologies.",
}

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        {/* Header */}
        <div className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a0a1a]" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 md:p-12 shadow-2xl">
              {/* Header Section */}
              <div className="text-center mb-8 pb-8 border-b border-border">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-red via-neon-magenta to-neon-purple bg-clip-text text-transparent">
                  Leith Inoubli
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Front-End / Full-Stack Developer
                </p>
                <p className="text-lg text-foreground mb-6">
                  React, TypeScript, Electron
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <a
                    href="tel:+34612226593"
                    className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +34 612 226 593
                  </a>
                  <a
                    href="mailto:inoublileith6@gmail.com"
                    className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    inoublileith6@gmail.com
                  </a>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Barcelona, Spain
                  </div>
                  <a
                    href="https://linkedin.com/in/leith-inoubli-352b05275"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>

                {/* Download Button */}
                <div className="mt-6">
                  <DownloadResumeButton />
                </div>
              </div>

              {/* Professional Summary */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <span className="text-neon-cyan">{"<"}</span>
                  Professional Summary
                  <span className="text-neon-cyan">{" />"}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Front-End / Full-Stack Developer with 4+ years of experience designing, developing, and maintaining interactive and efficient web applications using TypeScript, HTML, CSS, and React. Strong focus on user experience (UX), usability, and code quality. Experienced in integrating frontend interfaces with backend business logic, working with APIs, and contributing to scalable, secure, and high-performance applications. Comfortable collaborating in multidisciplinary teams within industrial and technology-driven environments.
                </p>
              </section>

              {/* Core Skills */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <span className="text-neon-cyan">{"<"}</span>
                  Core Skills
                  <span className="text-neon-cyan">{" />"}</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Front-End & Full-Stack Web Development",
                    "TypeScript, HTML5, CSS3",
                    "React.js & Component-Based Architecture",
                    "Electron Application Development",
                    "UX/UI & Usability-Focused Design",
                    "REST API Integration",
                    "Performance, Scalability & Security Optimization",
                    "Software Design Patterns & OOP",
                    "Version Control & Collaborative Development (Git)",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-neon-cyan/50 text-foreground hover:bg-neon-cyan/10"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Technical Skills */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <span className="text-neon-cyan">{"<"}</span>
                  Technical Skills
                  <span className="text-neon-cyan">{" />"}</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neon-red mb-2">Frontend</h3>
                    <p className="text-muted-foreground">
                      TypeScript, JavaScript (ES6+), React.js, Electron, HTML5, CSS3
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neon-magenta mb-2">Styling</h3>
                    <p className="text-muted-foreground">
                      SCSS, Tailwind CSS, Responsive Layouts
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neon-purple mb-2">Backend & APIs</h3>
                    <p className="text-muted-foreground">
                      RESTful APIs, Business Logic Integration
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neon-cyan mb-2">Systems & Tools</h3>
                    <p className="text-muted-foreground">
                      Git, Linux, Windows, Figma, Jira
                    </p>
                  </div>
                </div>
              </section>

              {/* Professional Experience */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <span className="text-neon-cyan">{"<"}</span>
                  Professional Experience
                  <span className="text-neon-cyan">{" />"}</span>
                </h2>
                <div className="space-y-8">
                  {/* Bega Software */}
                  <div className="border-l-4 border-neon-red pl-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        Front-End / Full-Stack Developer
                      </h3>
                      <span className="text-sm text-muted-foreground">June 2024 – March 2025</span>
                    </div>
                    <p className="text-neon-red font-semibold mb-4">Bega Software – Barcelona, Spain</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Designed and developed interactive web applications using React, TypeScript, HTML, and CSS.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Implemented user interfaces focused on usability and user experience (UX).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Integrated frontend applications with backend business logic and external APIs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Collaborated closely with designers, backend developers, and technical stakeholders.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Ensured code quality through best practices, code reviews, and testing.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Optimized application performance, scalability, and security.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Web & Industrial Digital Projects */}
                  <div className="border-l-4 border-neon-magenta pl-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        Front-End / Full-Stack Developer
                      </h3>
                      <span className="text-sm text-muted-foreground">2022 – 2024</span>
                    </div>
                    <p className="text-neon-magenta font-semibold mb-4">Web & Industrial Digital Projects – Barcelona, Spain</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Developed and maintained web applications aligned with industrial and enterprise requirements.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Participated in technical and functional requirement analysis.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Improved and maintained existing applications following industry standards.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Worked across Linux and Windows environments using Git for version control.</span>
                      </li>
                    </ul>
                  </div>

                  {/* FIRESHIP */}
                  <div className="border-l-4 border-neon-purple pl-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        Software Developer Intern
                      </h3>
                      <span className="text-sm text-muted-foreground">2022</span>
                    </div>
                    <p className="text-neon-purple font-semibold mb-4">FIRESHIP – Spain</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Supported development of web interfaces using HTML, CSS, and JavaScript.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Assisted in application maintenance, bug fixing, and API integration.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <span>Gained experience working in collaborative, technically demanding environments.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <span className="text-neon-cyan">{"<"}</span>
                  Education
                  <span className="text-neon-cyan">{" />"}</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Master in Web Development</h3>
                    <p className="text-muted-foreground">University HTL – Tunisia</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Bachelor of Computer Science and Networks</h3>
                    <p className="text-muted-foreground">University of Jendouba – Tunisia</p>
                  </div>
                </div>
              </section>

              {/* Languages */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <span className="text-neon-cyan">{"<"}</span>
                  Languages
                  <span className="text-neon-cyan">{" />"}</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["Spanish: Advanced", "English: Advanced", "French: Advanced"].map((lang) => (
                    <Badge
                      key={lang}
                      variant="outline"
                      className="border-neon-purple/50 text-foreground"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Additional Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <span className="text-neon-cyan">{"<"}</span>
                  Additional Information
                  <span className="text-neon-cyan">{" />"}</span>
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-neon-cyan mt-1">▹</span>
                    <span>Strong communication skills and ability to work in multidisciplinary teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-cyan mt-1">▹</span>
                    <span>Experience in industrial, technology-driven projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-cyan mt-1">▹</span>
                    <span>Proactive mindset with focus on quality and continuous improvement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-cyan mt-1">▹</span>
                    <span>Interested in long-term growth within global and innovative companies</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
