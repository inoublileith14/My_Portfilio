import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ConsoleEasterEgg } from '@/components/console-easter-egg'
import { TrackingProvider } from '@/components/analytics/tracking-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Leith Inoubli | Full-Stack Engineer | IoT & Scalable Systems',
  description: ' Full-Stack Engineer specializing in high-availability IoT dashboards, multi-tenant architectures, and mission-critical systems. Expert in Next.js, NestJS, real-time streaming, and scalable infrastructure.',
  keywords: [
    'Full-Stack Engineer',
    'Software Engineer',
    'IoT Architecture',
    'Scalable Systems',
    'Multi-tenant Architecture',
    'High-Availability Systems',
    'Real-time Streaming',
    'System Design',
    'Next.js',
    'NestJS',
    'TypeScript',
    'Docker',
    'Nginx',
    'Microservices',
    'Technical Leadership'
  ],
  authors: [{ name: 'Leith Inoubli' }],
  creator: 'Leith Inoubli',
  generator: 'v0.app',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leithdev.com',
    siteName: 'Leith Inoubli',
    title: 'Leith Inoubli | Full-Stack Engineer | IoT & Scalable Systems',
    description: 'Full-Stack Engineer specializing in high-availability IoT dashboards, multi-tenant architectures, and mission-critical systems. Expert in scalable infrastructure and real-time streaming.',
    images: [
      {
        url: '/logo.svg',
        width: 512,
        height: 512,
        alt: 'Leith Inoubli Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leith Inoubli | Full-Stack Engineer | IoT & Scalable Systems',
    description: 'Full-Stack Engineer specializing in high-availability IoT dashboards, multi-tenant architectures, and mission-critical systems.',
    images: ['/logo.svg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TrackingProvider />
          {children}
          <Analytics />
          <ConsoleEasterEgg />
        </ThemeProvider>
      </body>
    </html>
  )
}
