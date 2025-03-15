"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"

export function DashboardHeader() {
  const { toast } = useToast()

  const handleNewScan = () => {
    // In a real app, this would navigate to the scan upload page
    toast({
      title: "New Scan",
      description: "Navigate to the scan upload page",
    })
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">View your analysis history and saved results</p>
      </div>
      <Button onClick={handleNewScan}>
        <Icons.upload className="mr-2 h-4 w-4" />
        New Scan Analysis
      </Button>
    </div>
  )
}

