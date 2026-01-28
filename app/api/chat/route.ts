import { streamText, convertToModelMessages, UIMessage } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createAnthropic } from '@ai-sdk/anthropic'
import { openrouter } from '@openrouter/ai-sdk-provider'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'

// Maximum execution duration for streaming responses
export const maxDuration = 30

// Support multiple AI providers with priority order (FREE options first):
// 1. Groq (FREE - very fast, generous free tier, no credit card needed)
// 2. OpenRouter (FREE - access to 300+ models including free ones)
// 3. Anthropic Claude (FREE - $5 free credit, no credit card needed)
// 4. OpenAI (if you have a paid account)
// 5. AI Gateway (if available)
// 6. Google Gemini (fallback - free tier but has model issues)
let modelConfig: any

if (process.env.GROQ_API_KEY) {
  // Groq - FREE, very fast, generous free tier (30 requests/minute, 14,400/day)
  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
  })
  modelConfig = groq('llama-3.1-8b-instant') // Fast and free - commonly available model
} else if (process.env.OPENROUTER_API_KEY) {
  // OpenRouter - FREE tier, access to 300+ models including free ones
  modelConfig = openrouter('meta-llama/llama-3.1-70b-instruct:free') // Free model
} else if (process.env.ANTHROPIC_API_KEY) {
  // Anthropic Claude - FREE $5 credit, no credit card needed
  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
  modelConfig = anthropic('claude-3-haiku-20240307') // Fast and affordable
} else if (process.env.OPENAI_API_KEY) {
  // OpenAI - if you have a paid account
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  modelConfig = openai('gpt-4o-mini')
} else if (process.env.AI_GATEWAY_API_KEY) {
  // AI Gateway - if available
  modelConfig = 'openai/gpt-4o-mini'
} else if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  // Google Gemini - fallback (has model name issues)
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  })
  modelConfig = google('gemini-1.5-flash-latest')
} else {
  throw new Error(
    'No AI provider API key found. Please set one of the following FREE options in your .env.local file:\n' +
    'FREE OPTIONS (Recommended):\n' +
    '- GROQ_API_KEY (BEST - very fast, generous free tier, no credit card)\n' +
    '- OPENROUTER_API_KEY (access to 300+ free models)\n' +
    '- ANTHROPIC_API_KEY ($5 free credit, no credit card)\n' +
    'PAID OPTIONS:\n' +
    '- OPENAI_API_KEY (if you have a paid account)\n' +
    '- AI_GATEWAY_API_KEY\n' +
    '- GOOGLE_GENERATIVE_AI_API_KEY\n' +
    'See AI_SETUP_GUIDE.md for setup instructions.'
  )
}

/**
 * Portfolio-specific system prompt that provides context about the owner's
 * skills, projects, and experience to help recruiters and visitors.
 * 
 * This approach keeps the chatbot focused and on-brand rather than being
 * a generic AI assistant.
 */
const PORTFOLIO_SYSTEM_PROMPT = `You are an AI assistant for Leith Inoubli's portfolio website. Your job is to help recruiters and visitors understand his skills, projects, and experience clearly and concisely.

## About Leith
- **Name:** Leith Inoubli
- **Role:** Full-Stack Engineer specializing in IoT & Scalable Systems
- **Location:** Barcelona, Spain
- **Email:** inoublileith6@gmail.com

## Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Flutter
- **Backend:** NestJS, Node.js, Microservices Architecture
- **Infrastructure:** Docker, Nginx, GCP, OVH Cloud, CI/CD
- **Databases:** PostgreSQL, MongoDB, Firebase, Supabase, TimescaleDB
- **Real-time:** WebSockets, WebRTC, HLS.js, RTSP Streaming
- **IoT/Embedded:** BLE protocols, OTA firmware updates, binary protocols

## Key Projects

### 1. YUP Mobility Dashboard
- Multi-tenant fleet management platform tracking 5,000+ vehicles
- Real-time location tracking with <100ms latency and 99.9% uptime
- Tech: Next.js, TypeScript, Firebase, Google Maps, Docker, GCP
- Features: Multi-tenant isolation, marker clustering, SWR caching

### 2. HIT - Horse Monitoring System
- Mission-critical IoT platform for 24/7 animal welfare surveillance
- 100+ concurrent camera feeds with 98% detection accuracy
- Tech: Next.js, NestJS, HLS.js, PostgreSQL, Docker, Nginx
- Features: Low-latency video streaming, JWT rotation, ML-powered alerts

### 3. OTA BLE Firmware Update System
- Production-grade firmware updates for 50K+ IoT devices
- 99.5% success rate with robust error recovery
- Tech: Flutter, Supabase, BLE, Binary Protocols
- Features: Resumable updates, version rollback, batch processing

### 4. Clinic & Hospital Management
- HIPAA-compliant platform for 12 clinics managing 15K+ patients
- 200+ daily appointments with real-time coordination
- Tech: React, NestJS, MongoDB, WebRTC
- Features: EHR management, video consultations, encrypted PHI

## Experience
- **2023-Present:** Full-Stack Developer at Bega Software (Next.js, NestJS, Flutter, IoT)
- **2022-2023:** Frontend Developer at Bega Software (React, TypeScript)
- **2022:** Software Engineering Intern at FIRESHIP
- **2021:** Development Intern at INFOESPRIT

## Technical Philosophy
- Type Safety: TypeScript-first approach
- DRY Principles: Reusable patterns that scale
- User-Centric Design: Code serves the end-user experience
- Performance First: Optimized bundles, lazy loading, edge delivery

## Response Guidelines
1. Be concise and recruiter-friendly in your responses
2. When discussing projects, highlight metrics and impact (e.g., "5,000+ vehicles", "99.9% uptime")
3. Suggest viewing relevant portfolio sections when appropriate
4. If asked about hiring or contact, direct them to email inoublileith6@gmail.com
5. Focus on technical depth when asked about architecture or implementation details
6. Keep responses professional but approachable
7. If you don't know something specific, acknowledge it and redirect to contact

Remember: You represent Leith's professional brand. Be helpful, accurate, and showcase his expertise in building scalable, production-ready systems.`

/**
 * POST handler for the chat API route.
 * 
 * Architecture decisions:
 * - Stateless by design: No database storage, conversation held client-side only
 * - System prompt injection: Every request includes portfolio context
 * - Streaming responses: Better UX with incremental text display
 * - Secure: API key accessed only server-side via environment variables
 */
export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json()
    const { messages }: { messages: UIMessage[] } = body

    // Validate that messages exist and is an array
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Stream the response using the AI SDK
    // The system prompt provides portfolio context for every conversation
    const result = streamText({
      model: modelConfig, // Uses Groq (free), OpenRouter (free), Claude (free), OpenAI, or others based on env vars
      system: PORTFOLIO_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
      // Temperature slightly lower for more consistent, professional responses
      temperature: 0.7,
      maxOutputTokens: 250, // Keep responses concise and readable
    })

    // Return streaming response for real-time UI updates
    return result.toUIMessageStreamResponse()
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('[Chat API Error]:', error)
    
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
