"use client"

import { useEffect } from "react"

export function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      '%c🚀 Built with Next.js & TypeScript',
      'color: #00ffff; font-size: 16px; font-weight: bold;'
    )
    console.log(
      '%cSystem Architect? Let\'s talk logic: inoublileith6@gmail.com',
      'color: #a855f7; font-size: 14px;'
    )
    console.log(
      '%c👉 https://leithdev.com',
      'color: #ec4899; font-size: 12px;'
    )
  }, [])

  return null
}
