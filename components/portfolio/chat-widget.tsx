"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, 
  X, 
  Send, 
  Info,
  Bot,
  User,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * ChatWidget - A floating AI assistant for the portfolio.
 * 
 * Design decisions:
 * - Floating button (bottom-right): Non-intrusive, follows common UX patterns
 * - Stateless: Conversation resets on page refresh (by design)
 * - Portfolio-specific: System prompt on backend ensures focused responses
 * - Accessible: Proper ARIA labels and keyboard navigation
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize chat with AI SDK
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to latest message - smart scrolling that doesn't interrupt reading
  useEffect(() => {
    if (!messagesEndRef.current) return
    
    const messagesContainer = messagesEndRef.current.parentElement
    if (!messagesContainer) return

    // Check if user is near the bottom (within 100px) - if so, auto-scroll
    const isNearBottom = 
      messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 100

    // Only auto-scroll if:
    // 1. User is already near the bottom (not manually scrolled up)
    // 2. OR it's a new message (not just streaming update)
    // 3. OR streaming just finished
    if (isNearBottom || status === "idle") {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
      }, 50)
    }
  }, [messages.length, status]) // Trigger on message count or status change

  // Scroll to bottom when streaming completes
  useEffect(() => {
    if (status === "idle" && messagesEndRef.current) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
      }, 200) // Slightly longer delay to ensure content is fully rendered
    }
  }, [status])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Add initial greeting when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Set an initial assistant message as a greeting
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Hi! I'm Leith's AI assistant. Want a quick tour of his work, or do you have specific questions about his projects and skills?",
            },
          ],
        },
      ])
    }
  }, [isOpen, messages.length, setMessages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  // Extract text from message parts (AI SDK 6 pattern)
  const getMessageText = (parts: typeof messages[0]["parts"]) => {
    if (!parts || !Array.isArray(parts)) return ""
    return parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
          "bg-neon-red hover:bg-neon-red/90 text-primary-foreground",
          "flex items-center justify-center shadow-lg",
          "transition-all duration-300",
          isOpen && "scale-0 opacity-0"
        )}
        style={{
          boxShadow: "0 0 30px rgba(250, 30, 78, 0.4)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed bottom-6 right-6 z-50",
              "w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[calc(100vh-6rem)]",
              "flex flex-col",
              "rounded-2xl border border-border bg-card/95 backdrop-blur-xl",
              "shadow-2xl overflow-hidden"
            )}
            style={{
              boxShadow: "0 0 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(250, 30, 78, 0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(250, 30, 78, 0.2)",
                    boxShadow: "0 0 20px rgba(250, 30, 78, 0.3)",
                  }}
                >
                  <Bot className="w-5 h-5 text-neon-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Portfolio Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask about my work</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInfo(!showInfo)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label="About this chatbot"
                >
                  <Info className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Info Panel (collapsible) */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-border"
                >
                  <div className="p-4 bg-secondary/30 text-sm">
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">About this chatbot:</span>{" "}
                      This AI assistant helps visitors quickly explore my projects and skills. 
                      It runs on a secure Next.js API route and uses a portfolio-specific prompt 
                      to answer questions about my work, without storing any user data.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
                      message.role === "user"
                        ? "bg-neon-cyan/20"
                        : "bg-neon-red/20"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-neon-cyan" />
                    ) : (
                      <Bot className="w-4 h-4 text-neon-red" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      message.role === "user"
                        ? "bg-neon-cyan/20 text-foreground rounded-tr-sm"
                        : "bg-secondary text-foreground rounded-tl-sm"
                    )}
                  >
                    {getMessageText(message.parts)}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-neon-red/20">
                    <Bot className="w-4 h-4 text-neon-red" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Loader2 className="w-4 h-4 animate-spin text-neon-red" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border bg-card"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects, skills..."
                  disabled={isLoading}
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-xl text-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-muted-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-neon-red/50 focus:border-neon-red/50",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-all duration-200"
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "px-4 rounded-xl",
                    "bg-neon-red hover:bg-neon-red/90 text-primary-foreground",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  style={{
                    boxShadow: input.trim() ? "0 0 20px rgba(250, 30, 78, 0.3)" : "none",
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
