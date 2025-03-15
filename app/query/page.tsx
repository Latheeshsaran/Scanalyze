import type { Metadata } from "next"
import { MedicalQueryAssistant } from "@/components/medical-query-assistant"

export const metadata: Metadata = {
  title: "Medical Query Assistant",
  description: "Ask questions about medical scans and get AI-powered answers",
}

export default function QueryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Medical Query Assistant</h1>
        <p className="text-muted-foreground max-w-[700px]">
          Ask questions about medical scans and get AI-powered answers from our NLP model
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <MedicalQueryAssistant />
      </div>
    </div>
  )
}

