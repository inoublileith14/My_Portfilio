import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Leith Inoubli | Full-Stack Engineer',
  description: 'Full-Stack Engineer specializing in React, Next.js, NestJS, Flutter, and React Native. Building high-quality web and mobile solutions.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'NestJS', 'Flutter', 'React Native', 'TypeScript', 'Software Engineer'],
  authors: [{ name: 'Leith Inoubli' }],
  creator: 'Leith Inoubli',
    generator: 'v0.app'
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
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
