"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export function ApiSettings() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••••••••")
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false)
  const [isApiKeyRevealed, setIsApiKeyRevealed] = useState(false)

  const handleGenerateApiKey = async () => {
    setIsGenerating(true)

    try {
      // In a real app, this would call an API to generate a new API key
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate a new API key
      const newApiKey = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      setApiKey(newApiKey)
      setIsApiKeyVisible(true)
      setIsApiKeyRevealed(true)

      toast({
        title: "API key generated",
        description: "Your new API key has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your API key. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleToggleApiKeyVisibility = () => {
    if (!isApiKeyRevealed) {
      toast({
        title: "Cannot reveal API key",
        description: "For security reasons, you cannot reveal an existing API key. Please generate a new one.",
        variant: "destructive",
      })
      return
    }

    setIsApiKeyVisible(!isApiKeyVisible)
  }

  const handleCopyApiKey = () => {
    if (!isApiKeyRevealed) {
      toast({
        title: "Cannot copy API key",
        description: "For security reasons, you cannot copy an existing API key. Please generate a new one.",
        variant: "destructive",
      })
      return
    }

    navigator.clipboard.writeText(apiKey)

    toast({
      title: "API key copied",
      description: "Your API key has been copied to the clipboard.",
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle>API Access</CardTitle>
        <CardDescription>Manage your API keys for programmatic access to the platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex">
              <Input
                id="api-key"
                value={isApiKeyVisible ? apiKey : "••••••••••••••••••••••••••••••"}
                readOnly
                className="font-mono"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleToggleApiKeyVisibility}
                className="ml-2"
                disabled={!isApiKeyRevealed}
              >
                {isApiKeyVisible ? <Icons.xray className="h-4 w-4" /> : <Icons.search className="h-4 w-4" />}
                <span className="sr-only">{isApiKeyVisible ? "Hide API key" : "Show API key"}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleCopyApiKey}
                className="ml-2"
                disabled={!isApiKeyRevealed}
              >
                <Icons.fileText className="h-4 w-4" />
                <span className="sr-only">Copy API key</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key grants full access to the API. Keep it secure and never share it publicly.
            </p>
          </div>

          <Button variant="outline" type="button" onClick={handleGenerateApiKey} disabled={isGenerating}>
            {isGenerating ? <>Generating...</> : <>Generate new API key</>}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">API Documentation</h3>
          <p className="text-sm text-muted-foreground">
            Learn how to use our API to integrate medical scan analysis into your applications.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <Icons.fileText className="mr-2 h-4 w-4" />
              API Documentation
            </Button>
            <Button variant="outline" className="justify-start">
              <Icons.fileText className="mr-2 h-4 w-4" />
              Code Examples
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <p className="text-sm text-muted-foreground">Need help with the API? Contact our developer support team.</p>
      </CardFooter>
    </>
  )
}

