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
import { ArchitectureDiagram } from "@/components/portfolio/architecture-diagram"

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
  technicalChallenges?: string
  architecture?: string
  impact?: string[]
}

const projects: Project[] = [
  {
    title: "YUP Mobility Dashboard",
    description: "Engineered a scalable multi-tenant fleet management platform solving real-time location tracking challenges for 5,000+ vehicles, achieving <100ms latency and 99.9% uptime through optimized state management and microservices architecture.",
    fullDescription: "Architected and led development of a production-grade multi-tenant fleet management system addressing critical scalability challenges in real-time vehicle tracking. Designed multi-tenant data isolation using Next.js Middleware and Firebase, ensuring complete tenant separation at the application and database layers. Implemented Google Maps marker clustering and SWR caching to handle high-density asset tracking with minimal main-thread jank, processing 5,000+ concurrent vehicle updates. Engineered a custom WebSocket connection pooling system to handle concurrent vehicle updates, preventing connection exhaustion under peak loads of 10,000+ simultaneous users. Optimized data-fetching cycles to reduce cloud egress costs by 40% through intelligent batching and local state caching. Deployed on GCP with Docker containerization and Nginx load balancing, achieving zero-downtime deployments through blue-green deployment strategy.",
    icon: Truck,
    tech: ["Next.js", "TypeScript", "Firebase", "Google Maps", "Docker", "GCP", "Nginx", "SWR"],
    color: "#00ffff",
    gradient: "from-cyan-500/20 to-blue-500/20",
    features: [
      "Multi-tenant data isolation with Next.js Middleware",
      "Real-time vehicle tracking with Google Maps clustering",
      "SWR caching for high-density asset tracking",
      "Role-based access control (Admin, Manager, Operator)",
      "Advanced analytics and reporting dashboard",
      "Containerized deployment with Docker & Nginx"
    ],
    role: "Full-Stack Engineer & Technical Lead",
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
    ],
    architecture: "Designed a multi-tenant architecture with data isolation at multiple layers: Next.js Middleware intercepts requests to inject tenant context, Firebase Realtime Database uses tenant-scoped paths (tenants/{tenantId}/vehicles), and application-level filtering ensures zero cross-tenant data leakage. Implemented Google Maps marker clustering algorithm that dynamically groups markers based on zoom level and viewport bounds, reducing rendered markers from 5,000+ to <100 visible markers at any zoom level. SWR (stale-while-revalidate) caching strategy with 30-second TTL reduces API calls by 60% while maintaining data freshness. Server-Side Rendering (SSR) with Next.js App Router for initial page loads, reducing First Contentful Paint by 40%. Custom WebSocket connection manager with exponential backoff retry logic and connection pooling handles 5,000+ concurrent vehicle streams.",
    technicalChallenges: "Critical challenge: Multi-tenant data isolation at scale. Initial approach of application-level filtering was vulnerable to bugs causing data leaks. Solution: Implemented defense-in-depth with Next.js Middleware for request-level tenant injection, Firebase security rules for database-level isolation, and application-level validation. Trade-off: Added 15ms middleware overhead for bulletproof tenant isolation vs. faster but risky application-only filtering. Performance challenge: Google Maps API rate limiting and main-thread jank with 5,000+ markers. Solution: Implemented client-side marker clustering with viewport-based rendering and server-side geospatial indexing. Used requestAnimationFrame for smooth marker updates, reducing main-thread blocking by 80%. Trade-off: Slight complexity increase for 70% reduction in API calls and elimination of UI jank.",
    impact: [
      "Reduced cloud egress costs by 40% through optimized data-fetching cycles",
      "Eliminated main-thread jank with marker clustering (5,000+ → <100 visible markers)",
      "Achieved 100% multi-tenant data isolation with zero cross-tenant leaks",
      "Reduced API calls by 60% through SWR caching and intelligent batching",
      "Scaled from 500 to 5,000+ vehicles without infrastructure changes",
      "Improved Time to Interactive (TTI) by 45% via SSR optimization"
    ]
  },
 
  {
    title: "HIT - Horse Monitoring System",
    description: "Architected a mission-critical IoT monitoring platform solving 24/7 animal welfare surveillance through low-latency HLS.js video streaming, achieving 98% accuracy and <30s alert response time across 100+ camera feeds with zero-session-dropouts.",
    fullDescription: "Designed and implemented a mission-critical IoT monitoring platform addressing the challenge of 24/7 horse health surveillance across distributed facilities. Engineered a low-latency HLS.js video streaming pipeline for live animal surveillance, processing 100+ concurrent RTSP camera streams with adaptive bitrate streaming and sub-3-second latency. Built a custom Axios interceptor system for automatic JWT rotation and 55-minute token refresh cycles, ensuring zero-session-dropouts during extended monitoring sessions. Implemented a microservices architecture with NestJS backend handling ML inference pipelines and WebRTC signaling for camera feeds. Productionized the application using Docker containerization, Nginx reverse proxy for load balancing and SSL termination, and OVH Cloud CI/CD pipeline for automated deployments. Built a PostgreSQL database schema with time-series optimization using TimescaleDB extensions for efficient historical behavior pattern analysis. Implemented a real-time alerting system using WebSocket connections with priority queuing, ensuring critical alerts bypass normal traffic.",
    icon: Monitor,
    tech: ["Next.js", "NestJS", "HLS.js", "Docker", "Nginx", "OVH Cloud", "PostgreSQL", "JWT", "Axios"],
    color: "#a3a38c",
    gradient: "from-stone-500/20 to-amber-500/20",
    features: [
      "Low-latency HLS.js video streaming pipeline",
      "Automatic JWT rotation with 55-minute refresh cycles",
      "AI-powered anomaly detection (98% accuracy)",
      "Real-time live camera feeds (100+ concurrent streams)",
      "Zero-session-dropout authentication",
      "Docker + Nginx production deployment"
    ],
    role: "Full-Stack Engineer & Infrastructure Lead",
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
    ],
    architecture: "Designed a microservices architecture with NestJS API gateway handling authentication and business logic, dedicated ML inference service processing video streams, and HLS.js-based video streaming server for low-latency camera feeds. Authentication layer uses custom Axios interceptor that monitors JWT expiration (55-minute TTL) and automatically refreshes tokens 5 minutes before expiry, preventing session interruptions. Database schema uses PostgreSQL with TimescaleDB for time-series data, implementing hypertables for efficient partitioning of 6+ months of behavioral data. Frontend uses Next.js with React Server Components for initial render, transitioning to client-side HLS.js players for real-time video streaming. Production infrastructure: Docker containers orchestrated with docker-compose, Nginx reverse proxy handling SSL termination and load balancing, deployed on OVH Cloud with automated CI/CD pipeline. Implemented a priority-based message queue system ensuring critical alerts are processed within 30s SLA.",
    technicalChallenges: "Mission-critical challenge: Zero-session-dropouts during extended monitoring sessions (8+ hours). Initial JWT implementation caused session interruptions every 60 minutes. Solution: Built custom Axios interceptor system that tracks token expiration timestamps and proactively refreshes tokens 5 minutes before expiry. Interceptor intercepts all API requests, checks token age, and triggers refresh if needed—ensuring seamless user experience. Trade-off: Added 50ms interceptor overhead for 100% session continuity vs. user-facing authentication errors. Video streaming challenge: Processing 100+ concurrent RTSP streams with low latency. Initial FFmpeg transcoding consumed 80% CPU. Solution: Implemented HLS.js-based adaptive streaming with server-side HLS segment generation, offloading transcoding to optimized media servers. Used adaptive bitrate streaming to reduce bandwidth by 40% while maintaining quality. Trade-off: Slight complexity increase for 60% CPU reduction and sub-3-second latency.",
    impact: [
      "Achieved zero-session-dropouts through automatic JWT rotation system",
      "Reduced video streaming latency from 8s to <3s with HLS.js pipeline",
      "Achieved 98% anomaly detection accuracy through hybrid ML architecture",
      "Reduced alert response time from 2min to <30s via priority queuing",
      "Optimized server CPU usage by 60% through adaptive streaming",
      "Scaled from 10 to 100+ camera feeds with Docker + Nginx infrastructure",
      "Improved query performance by 75% using TimescaleDB hypertables"
    ]
  },
  {
    title: "OTA BLE Firmware Update",
    description: "Engineered a production-grade OTA firmware update system solving secure, reliable device updates for 50K+ IoT devices, achieving 99.5% success rate through custom binary protocol design and robust error recovery mechanisms.",
    fullDescription: "Architected a mission-critical over-the-air firmware update system addressing the challenge of securely updating IoT devices in production environments with unreliable network conditions. Designed a custom binary protocol layer on top of BLE GATT, implementing chunked data transfer with CRC32 checksums and automatic retry logic. Built a state machine-based update engine handling connection drops, battery failures, and partial writes—critical for field deployments. Implemented version management system with rollback capabilities, allowing devices to revert to previous firmware versions if new updates fail validation. The system processes batch updates for multiple devices simultaneously while maintaining individual progress tracking and error isolation. Cross-platform Flutter implementation ensures consistent behavior across iOS and Android, with platform-specific BLE stack optimizations. Backend infrastructure powered by Supabase provides real-time synchronization of update status, device metadata, and firmware version tracking across all connected devices.",
    icon: Bluetooth,
    tech: ["Flutter", "Supabase", "BLE", "Binary Protocols"],
    color: "#a855f7",
    gradient: "from-purple-500/20 to-violet-500/20",
    features: [
      "Secure DFU (Device Firmware Update) protocol",
      "Progress tracking with error recovery",
      "Multi-device batch updates",
      "Version control and rollback support",
      "Cross-platform Flutter implementation with Supabase backend"
    ],
    role: "Mobile & IoT Engineer",
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
    ],
    architecture: "Designed a layered architecture: Flutter UI layer with Dart-based state management (Riverpod/Bloc), BLE abstraction layer handling platform differences (CoreBluetooth vs. Android BLE), custom protocol layer implementing chunked transfer with 512-byte packets optimized for BLE MTU constraints, and state machine engine managing update lifecycle. Backend infrastructure built on Supabase (PostgreSQL) for real-time device status synchronization, firmware metadata storage, and update queue management. Implemented persistent state storage using Supabase local storage and Hive for offline-first capability, allowing updates to resume after app restarts. Version management uses semantic versioning with cryptographic signatures (ECDSA) for firmware authenticity verification, stored in Supabase with Row Level Security policies. Batch update system uses Supabase Realtime subscriptions for progress tracking and queue-based processing with concurrency limits to prevent BLE stack saturation.",
    technicalChallenges: "Critical challenge was handling BLE connection instability in real-world environments—devices frequently disconnected mid-update. Initial approach of restarting entire update failed 15% of the time. Solution: Implemented resumable chunk-based protocol with persistent state tracking using Supabase, allowing updates to resume from last successful chunk across app restarts. This required careful design of chunk sequence numbers and checksums to detect corruption, with state synchronized to Supabase for multi-device coordination. Trade-off: Added 20% protocol overhead (headers/checksums) for 99.5% reliability vs. 85% with simpler approach. Another challenge was iOS BLE background limitations—solved by implementing Flutter foreground service notifications and chunk size optimization to complete updates within iOS background execution windows. Supabase Realtime integration enabled real-time progress updates across multiple admin dashboards, but required careful connection pooling to handle 50K+ device subscriptions without overwhelming the database.",
    impact: [
      "Achieved 99.5% update success rate through robust error recovery",
      "Reduced failed updates from 15% to 0.5% via resumable protocol",
      "Scaled to 50K+ device updates with batch processing architecture",
      "Improved update reliability by 85% through state machine design",
      "Reduced support tickets by 90% through automatic error recovery"
    ]
  },
  {
    title: "Clinic & Hospital Management",
    description: "Architected a HIPAA-compliant healthcare management platform solving operational inefficiencies for 12 clinics managing 15K+ patients, processing 200+ daily appointments with real-time coordination and secure EHR management.",
    fullDescription: "Designed and developed a comprehensive healthcare management system addressing critical operational challenges in multi-clinic environments. Engineered a secure, HIPAA-compliant architecture using MongoDB with field-level encryption for Protected Health Information (PHI), ensuring data privacy while maintaining query performance. Built a sophisticated appointment scheduling system with conflict resolution algorithms, handling 200+ daily appointments across 12 clinics with real-time availability synchronization. Implemented WebRTC-based video consultation system with adaptive bitrate streaming and fallback mechanisms for low-bandwidth scenarios. The EHR system uses document-based schema design optimized for complex medical record relationships, with full-text search capabilities for rapid patient lookup. Real-time notification system integrates with multiple channels (SMS, email, push) with delivery tracking and retry logic.",
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
    ],
    architecture: "Designed a microservices architecture with NestJS backend services: appointment service handling scheduling logic with conflict detection, EHR service managing encrypted patient records, notification service with multi-channel delivery, and WebRTC signaling service for video consultations. MongoDB schema uses embedded documents for related data (appointments within patient records) while maintaining separate collections for scalability. Implemented Redis caching layer for frequently accessed appointment slots, reducing database load by 70%. Frontend uses React with Context API for global state (user session, clinic selection) and local state for component-specific data, optimizing re-render performance.",
    technicalChallenges: "Critical challenge was ensuring HIPAA compliance while maintaining system performance. Initial encryption approach (encrypting entire documents) made queries impossible. Solution: Implemented field-level encryption for PHI fields only, using MongoDB's Client-Side Field Level Encryption (CSFLE) with deterministic encryption for searchable fields (patient IDs) and random encryption for sensitive data (diagnoses). Trade-off: Accepted 15% query performance overhead for HIPAA compliance vs. unencrypted approach. Another major challenge was appointment conflict resolution across 12 clinics with different time zones and availability rules. Solved by implementing a rule engine with priority-based conflict resolution and real-time synchronization using WebSocket connections.",
    impact: [
      "Achieved HIPAA compliance with field-level encryption maintaining query performance",
      "Reduced appointment scheduling conflicts by 95% through intelligent conflict resolution",
      "Improved patient lookup time from 3s to <500ms via optimized MongoDB indexes",
      "Scaled from 1 to 12 clinics with multi-tenancy architecture",
      "Reduced database load by 70% through Redis caching layer"
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority={currentIndex === 0}
          quality={90}
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
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="sr-only">Previous image</span>
              <span className="sr-only">Previous image</span>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all hover:scale-110"
              style={{ boxShadow: `0 0 20px ${color}40` }}
              type="button"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="sr-only">Next image</span>
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
                sizes="64px"
                loading="lazy"
                quality={75}
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
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
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
                <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-foreground mb-1">
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
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span>View Live</span>
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
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>Source Code</span>
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

          {/* Architecture */}
          {project.architecture && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Server className="w-5 h-5" style={{ color: project.color }} />
                System Architecture
              </h3>
              {/* Architecture Diagram */}
              {(project.title === "HIT - Horse Monitoring System" || project.title === "YUP Mobility Dashboard") && (
                <div className="mb-4">
                  <ArchitectureDiagram
                    type={project.title === "HIT - Horse Monitoring System" ? "hit-alerts" : "yup-mobility"}
                    color={project.color}
                  />
                </div>
              )}
              <p className="text-muted-foreground leading-relaxed">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Technical Challenges */}
          {project.technicalChallenges && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Cloud className="w-5 h-5" style={{ color: project.color }} />
                Technical Challenges & Trade-offs
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.technicalChallenges}
              </p>
            </div>
          )}

          {/* Impact Metrics */}
          {project.impact && project.impact.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5" style={{ color: project.color }} />
                Quantified Impact
              </h3>
              <ul className="space-y-2">
                {project.impact.map((impact, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span 
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    {impact}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              whileHover={{ y: -4 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: index * 0.1 
              }}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProject(project)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                {/* Project thumbnail */}
                {project.images.length > 0 && (
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image
                      src={project.images[0] || "/placeholder.svg"}
                      alt={`${project.title} project thumbnail`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      loading={index < 2 ? "eager" : "lazy"}
                      quality={85}
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
