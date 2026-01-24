"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ExternalLink, 
  MapPin, 
  Bluetooth, 
  Monitor, 
  Activity, 
  Github, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  ImageIcon,
  X,
  Layers,
  Server,
  Cloud,
  Truck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Project {
  title: string
  description: string
  fullDescription: string
  icon: typeof MapPin
  tech: string[]
  color: string
  gradient: string
  features: string[]
  role: string
  images: string[]
  liveUrl?: string
  githubUrl?: string
  highlights?: { label: string; value: string }[]
}

const projects: Project[] = [
  {
    title: "YUP Mobility Dashboard",
    description: "Full-stack fleet management and location tracking platform with real-time Google Maps integration, analytics dashboard, and role-based access control.",
    fullDescription: "A comprehensive fleet management platform built for YUP Mobility, featuring real-time vehicle tracking on Google Maps, advanced analytics dashboard, and sophisticated role-based access control. The platform handles thousands of vehicles with live location updates, trip history, and performance metrics. Deployed on Google Cloud Platform using Docker containers and Nginx reverse proxy for high availability.",
    icon: Truck,
    tech: ["Next.js", "TypeScript", "Firebase", "Google Maps", "Docker", "GCP", "Nginx"],
    color: "#00ffff",
    gradient: "from-cyan-500/20 to-blue-500/20",
    features: [
      "Real-time vehicle tracking with Google Maps API",
      "Role-based access control (Admin, Manager, Operator)",
      "Advanced analytics and reporting dashboard",
      "Trip history and route visualization",
      "Firebase real-time database integration",
      "Containerized deployment with Docker"
    ],
    role: "Lead Full-Stack Developer",
    images: [
      "/images/projects/yup-mobility-dashboard.jpg",
      "/images/projects/yup-mobility-analytics.jpg",
      "/images/projects/yup-mobility-vehicles.jpg",
      "/images/projects/yup-mobility-users.jpg"
    ],
    liveUrl: "https://dashboard.yup.bike",
    //githubUrl: "https://github.com/leithinoubli/yup-mobility-dashboard",
    highlights: [
      { label: "Vehicles Tracked", value: "5,000+" },
      { label: "Real-time Updates", value: "<100ms" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  {
    title: "Yup Bike Tracking App",
    description: "Real-time bike tracking application with GPS integration, Mapbox visualization, and BLE connectivity for smart lock features.",
    fullDescription: "A comprehensive mobile application designed for Yup mobility services, enabling users to locate, unlock, and track bikes in real-time. The app integrates advanced GPS tracking with Mapbox for precise location visualization and uses Bluetooth Low Energy (BLE) protocols for seamless smart lock connectivity.",
    icon: MapPin,
    tech: ["Flutter", "GPS", "Mapbox", "BLE"],
    color: "#22c55e",
    gradient: "from-green-500/20 to-emerald-500/20",
    features: [
      "Real-time GPS tracking with sub-meter accuracy",
      "Interactive Mapbox-based map interface",
      "BLE smart lock integration for keyless access",
      "Trip history and statistics dashboard",
      "Push notifications for ride updates"
    ],
    role: "Lead Mobile Developer",
    images: [
      "/images/projects/yup-login.png",
      "/images/projects/yup-map.jpg",
      "/images/projects/yup-ride.jpg",
      "/images/projects/yup-unlock.jpg"
    ],
    liveUrl: "https://yup.bike",
    //githubUrl: "https://github.com/leithinoubli/yup-bike-app",
    highlights: [
      { label: "Active Users", value: "10K+" },
      { label: "Daily Rides", value: "2,500+" },
      { label: "Cities", value: "3" }
    ]
  },
  {
    title: "HIT - Horse Monitoring System",
    description: "AI-powered horse health monitoring platform with real-time alerts, live camera feeds, and anomaly detection.",
    fullDescription: "An intelligent monitoring system for horse care facilities that uses AI to detect anomalies in horse behavior. The platform provides instant alerts to caregivers when unusual activity is detected, with live camera access for immediate situation assessment and emergency response.",
    icon: Monitor,
    tech: ["Next.js", "NestJS", "AI/ML", "WebRTC", "PostgreSQL"],
    color: "#a3a38c",
    gradient: "from-stone-500/20 to-amber-500/20",
    features: [
      "AI-powered anomaly detection",
      "Real-time live camera feeds",
      "Instant push notifications for alerts",
      "Historical behavior analysis",
      "Multi-language support (EN/FR)"
    ],
    role: "Full-Stack Developer",
    images: [
      "/images/projects/hit-login.png",
      "/images/projects/hit-dashboard.jpg",
      "/images/projects/hit-alerts.jpg",
      "/images/projects/hit-analytics.jpg"
    ],
    liveUrl: "https://hitsalerts.com",
    //githubUrl: "https://github.com/leithinoubli/hit-monitoring",
    highlights: [
      { label: "Detection Accuracy", value: "98%" },
      { label: "Response Time", value: "<30s" },
      { label: "Cameras", value: "100+" }
    ]
  },
  {
    title: "OTA BLE Firmware Update",
    description: "Over-the-air firmware update system for BLE devices with secure data transfer and progress tracking.",
    fullDescription: "A robust over-the-air firmware update solution for IoT devices using Bluetooth Low Energy. The system ensures secure, reliable firmware delivery with progress tracking, error recovery, and version management across multiple device types.",
    icon: Bluetooth,
    tech: ["React Native", "BLE", "Node.js", "Binary Protocols"],
    color: "#a855f7",
    gradient: "from-purple-500/20 to-violet-500/20",
    features: [
      "Secure DFU (Device Firmware Update) protocol",
      "Progress tracking with error recovery",
      "Multi-device batch updates",
      "Version control and rollback support",
      "Cross-platform mobile implementation"
    ],
    role: "Mobile & IoT Developer",
    images: [
      "/images/projects/ota-main.jpg",
      "/images/projects/ota-progress.jpg",
      "/images/projects/ota-scan.jpg",
      "/images/projects/ota-history.jpg"
    ],
    githubUrl: "https://github.com/leithinoubli/ota-ble-firmware",
    highlights: [
      { label: "Devices Updated", value: "50K+" },
      { label: "Success Rate", value: "99.5%" },
      { label: "Avg. Speed", value: "2KB/s" }
    ]
  },
  {
    title: "Clinic & Hospital Management",
    description: "Complete healthcare management system with appointment scheduling, patient records, and real-time notifications.",
    fullDescription: "A full-featured healthcare management platform designed to streamline clinic and hospital operations. The system handles patient records, appointment scheduling, video consultations, and integrates with various medical devices for a comprehensive healthcare solution.",
    icon: Activity,
    tech: ["React", "NestJS", "MongoDB", "WebRTC"],
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-500/20",
    features: [
      "Electronic health records (EHR) management",
      "Appointment scheduling with reminders",
      "Video consultation via WebRTC",
      "Prescription and billing management",
      "Real-time notification system"
    ],
    role: "Full-Stack Developer",
    images: [
      "/images/projects/clinic-dashboard.jpg",
      "/images/projects/clinic-patients.jpg",
      "/images/projects/clinic-appointments.jpg",
      "/images/projects/clinic-video.jpg"
    ],
    githubUrl: "https://github.com/inoublileith14/Kine-master",
    highlights: [
      { label: "Patients", value: "15K+" },
      { label: "Appointments/Day", value: "200+" },
      { label: "Clinics", value: "12" }
    ]
  }
]

function ImageGallery({ images, color, onClose }: { images: string[], color: string, onClose?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div 
        className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center gap-3 border border-dashed"
        style={{ borderColor: `${color}40`, backgroundColor: `${color}05` }}
      >
        <ImageIcon className="w-12 h-12" style={{ color: `${color}60` }} />
        <p className="text-sm text-muted-foreground">No images available</p>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      <div 
        className="relative w-full aspect-video rounded-2xl overflow-hidden"
        style={{ 
          boxShadow: `0 0 40px ${color}15, 0 0 80px ${color}10`
        }}
      >
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Project screenshot ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all hover:scale-110"
              style={{ boxShadow: `0 0 20px ${color}40` }}
              type="button"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all hover:scale-110"
              style={{ boxShadow: `0 0 20px ${color}40` }}
              type="button"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div 
          className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium bg-background/90 backdrop-blur-sm"
          style={{ color }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="relative w-16 h-10 rounded-lg overflow-hidden transition-all"
              style={{
                outline: index === currentIndex ? `2px solid ${color}` : '2px solid transparent',
                opacity: index === currentIndex ? 1 : 0.5
              }}
              type="button"
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectDetailModal({ project, onClose }: { project: Project, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card"
        style={{
          boxShadow: `0 0 100px ${project.color}20, 0 25px 50px -12px rgba(0, 0, 0, 0.5)`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center hover:bg-secondary transition-colors"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero section with image */}
        <div className="relative">
          <ImageGallery images={project.images} color={project.color} />
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${project.color}15`,
                  boxShadow: `0 0 40px ${project.color}30`
                }}
              >
                <project.icon className="w-8 h-8" style={{ color: project.color }} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {project.title}
                </h2>
                <p className="text-sm font-medium" style={{ color: project.color }}>
                  {project.role}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: project.color,
                    color: '#0d0d0d'
                  }}
                >
                  <Globe className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
                  style={{ 
                    borderColor: project.color,
                    color: project.color
                  }}
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>

          {/* Stats/Highlights */}
          {project.highlights && (
            <div className="grid grid-cols-3 gap-4">
              {project.highlights.map((stat, index) => (
                <div 
                  key={index}
                  className="relative rounded-2xl p-4 text-center border border-border overflow-hidden"
                  style={{ backgroundColor: `${project.color}08` }}
                >
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ 
                      background: `radial-gradient(circle at 50% 0%, ${project.color}30, transparent 70%)`
                    }}
                  />
                  <p className="text-2xl md:text-3xl font-bold relative" style={{ color: project.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 relative">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5" style={{ color: project.color }} />
              Overview
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Two column layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Server className="w-5 h-5" style={{ color: project.color }} />
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span 
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5" style={{ color: project.color }} />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium rounded-xl border transition-all hover:scale-105"
                    style={{
                      backgroundColor: `${project.color}10`,
                      borderColor: `${project.color}30`,
                      color: project.color
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24 relative">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-red">{"<"}</span>
            Projects
            <span className="text-neon-red">{" />"}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto mb-8 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Featured projects showcasing my expertise in building scalable solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glassmorphism card */}
              <div 
                className="relative rounded-2xl border border-border bg-card/30 backdrop-blur-md 
                  overflow-hidden transition-all duration-500 hover:border-opacity-50 h-full flex flex-col cursor-pointer"
                style={{
                  boxShadow: `0 0 0 1px ${project.color}10`
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project thumbnail */}
                {project.images.length > 0 && (
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span 
                        className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                        style={{ backgroundColor: project.color, color: '#0d0d0d' }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </span>
                    </div>
                  </div>
                )}

                {/* Background gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Neon border effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${project.color}60, 0 0 30px ${project.color}20`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 flex-1 flex flex-col">
                  {/* Icon and Links Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center 
                        transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${project.color}20`,
                        boxShadow: `0 0 20px ${project.color}30`
                      }}
                    >
                      <project.icon className="w-6 h-6" style={{ color: project.color }} />
                    </div>

                    {/* External links */}
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{ 
                            backgroundColor: `${project.color}20`,
                            color: project.color
                          }}
                          aria-label="View live site"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{ 
                            backgroundColor: `${project.color}20`,
                            color: project.color
                          }}
                          aria-label="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-secondary/80 text-secondary-foreground
                          border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded-md text-muted-foreground">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}
