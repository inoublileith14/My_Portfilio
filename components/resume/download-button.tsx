"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function DownloadResumeButton() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch("/resume.pdf")
      if (!response.ok) {
        throw new Error("Resume PDF not found")
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "Leith-Inoubli-Resume.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading resume:", error)
      // Fallback: open in new tab
      window.open("/resume.pdf", "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className="bg-gradient-to-r from-neon-red to-neon-purple hover:opacity-90 text-white"
    >
      <Download className="w-4 h-4 mr-2" />
      {isDownloading ? "Downloading..." : "Download PDF"}
    </Button>
  )
}
