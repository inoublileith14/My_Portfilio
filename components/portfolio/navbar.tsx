"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  href: string
  isPage?: boolean
}

const navItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Blog", href: "/blog", isPage: true },
  { name: "Contact", href: "#contact" }
]

function scrollToSection(href: string) {
  const element = document.querySelector(href)
  element?.scrollIntoView({ behavior: "smooth" })
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (item: NavItem) => {
    if (item.isPage) {
      return // Let the Link handle navigation
    }
    
    // If we're on the homepage, scroll to the section
    if (isHomePage) {
      scrollToSection(item.href)
    } else {
      // If we're on another page, navigate to homepage with hash
      router.push(`/${item.href}`)
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.svg"
              alt="Leith Inoubli Logo"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.isPage ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground 
                    transition-colors relative group"
                >
                  {item.name}
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                      bg-neon-red group-hover:w-full transition-all duration-300"
                  />
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground 
                    transition-colors relative group"
                >
                  {item.name}
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                      bg-neon-red group-hover:w-full transition-all duration-300"
                  />
                </button>
              )
            )}
          </div>

          {/* Resume Button */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:flex border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 bg-transparent"
          >
            <Link href="/resume">
              Resume
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 md:hidden"
          >
            <nav className="flex flex-col items-center gap-4 p-8">
              {navItems.map((item, index) =>
                item.isPage ? (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-xl text-muted-foreground hover:text-neon-red transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item)}
                    className="text-xl text-muted-foreground hover:text-neon-red transition-colors"
                  >
                    {item.name}
                  </motion.button>
                )
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 bg-transparent"
                >
                  <Link href="/resume">
                    Resume
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
