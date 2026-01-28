import { Navbar } from "@/components/portfolio/navbar"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { EducationSection } from "@/components/portfolio/education-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { ChatWidget } from "@/components/portfolio/chat-widget"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </main>
  )
}
