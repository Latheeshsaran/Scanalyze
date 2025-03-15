"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { processScanQuery } from "@/lib/nlp-model"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ScanQueryInterfaceProps {
  scanResults: any
}

export function ScanQueryInterface({ scanResults }: ScanQueryInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "You can ask me specific questions about this scan. For example: 'What abnormalities were found?' or 'Is this scan normal?'",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    try {
      // Process the query using our NLP model with the scan results context
      const response = await processScanQuery(input, scanResults)

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error processing query:", error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your query. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4 h-[250px] overflow-y-auto p-4 rounded-lg border">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 rounded-lg p-3",
              message.role === "assistant" ? "bg-muted/50" : "bg-primary/5",
            )}
          >
            {message.role === "assistant" ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{message.role === "assistant" ? "Assistant" : "You"}</p>
                <p className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</p>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Ask a question about this scan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isProcessing || !input.trim()}>
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <Icons.messageSquare className="mr-2 h-4 w-4" />
                Send Question
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

