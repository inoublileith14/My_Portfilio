export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
  featured?: boolean
  image?: string
}

// Static blog posts data - in a real app, this would come from MDX files or a CMS
export const blogPosts: BlogPost[] = [
  {
    slug: "healthcare-iot-synergy",
    title: "The Synergy of AI and IoT in Modern Healthcare",
    description:
      "How edge computing is saving lives through real-time patient data and the shift from reactive to proactive healthcare.",
    date: "2026-01-20",
    category: "Healthcare",
    readTime: "8 min read",
    featured: true,
    image: "/images/blog/healthcare-iot.jpg",
  },
  {
    slug: "state-management-patterns",
    title: "State Management in 2026: Choosing Between Zustand and XState",
    description:
      "Why your choice of state management reflects your application's scale. A deep dive into Zustand vs XState for enterprise applications.",
    date: "2026-01-15",
    category: "Engineering",
    readTime: "6 min read",
    featured: false,
    image: "/images/blog/state-management.jpg",
  },
  {
    slug: "building-realtime-dashboards",
    title: "Building Real-Time Dashboards with WebSockets and Next.js",
    description:
      "A practical guide to implementing live data streaming, from Socket.io setup to optimistic UI updates in production environments.",
    date: "2026-01-10",
    category: "Engineering",
    readTime: "10 min read",
    featured: false,
    image: "/images/blog/realtime-data.jpg",
  },
  {
    slug: "nestjs-microservices-patterns",
    title: "NestJS Microservices: Patterns for Scalable Backend Architecture",
    description:
      "How to design resilient microservices with NestJS, including message queues, circuit breakers, and distributed tracing.",
    date: "2026-01-05",
    category: "Backend",
    readTime: "12 min read",
    featured: false,
    image: "/images/blog/nestjs-api.jpg",
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((post) => post.featured)
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
