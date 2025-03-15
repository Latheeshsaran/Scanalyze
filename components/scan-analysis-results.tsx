"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useScanAnalysisStore } from "@/lib/scan-analysis-store"
import { Badge } from "@/components/ui/badge"
import { ScanQueryInterface } from "@/components/scan-query-interface"

interface ScanAnalysisResultsProps {
  scanType: string
}

export function ScanAnalysisResults({ scanType }: ScanAnalysisResultsProps) {
  const { toast } = useToast()
  const { results, isAnalyzing } = useScanAnalysisStore()
  const [activeTab, setActiveTab] = useState("overview")

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF report
    toast({
      title: "Report downloaded",
      description: "The analysis report has been downloaded successfully.",
    })
  }

  const getScanTypeTitle = () => {
    switch (scanType) {
      case "mri":
        return "MRI"
      case "ct":
        return "CT Scan"
      case "xray":
        return "X-Ray"
      default:
        return "Medical Scan"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500"
    if (confidence >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  if (!results && !isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Upload a scan to see the analysis results</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <Icons.search className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            No analysis results available yet. Upload a {getScanTypeTitle().toLowerCase()} to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Analyzing {getScanTypeTitle()}</CardTitle>
          <CardDescription>Please wait while we process your scan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-muted h-16 w-16 mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <p className="text-muted-foreground mt-4">
            Our AI models are analyzing your {getScanTypeTitle().toLowerCase()}...
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI-powered analysis of your {getScanTypeTitle().toLowerCase()}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={results.findings.normal ? "outline" : "destructive"}>
              {results.findings.normal ? "Normal" : "Abnormal"}
            </Badge>
            <Badge className={cn("text-white", getConfidenceColor(results.confidence * 100))}>
              {Math.round(results.confidence * 100)}% Confidence
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="query">Ask AI</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="min-h-[250px]">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Patient ID</h4>
                  <p className="text-lg font-semibold">{results.patientInfo.patientId}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Scan Type</h4>
                  <p className="text-lg font-semibold">{getScanTypeTitle()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Scan Date</h4>
                  <p className="text-lg font-semibold">{new Date(results.patientInfo.scanDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Detected Condition</h4>
                  <p className="text-lg font-semibold">
                    {results.findings.detectedCondition || "No significant findings"}
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">AI Analysis</h4>
                <p className="text-sm">{results.aiAnalysis}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Recommendation</h4>
                <p className="text-sm">{results.recommendation}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="findings" className="min-h-[250px]">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Primary Findings</h4>
                {results.findings.abnormalities && results.findings.abnormalities.length > 0 ? (
                  <ul className="list-disc list-inside text-sm space-y-2">
                    {results.findings.abnormalities.map((abnormality: string, index: number) => (
                      <li key={index}>{abnormality}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">No significant abnormalities detected.</p>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Regions Analyzed</h4>
                <ul className="list-disc list-inside text-sm space-y-2">
                  {results.findings.regions.map((region: any, index: number) => (
                    <li key={index}>
                      {region.name}: {region.normal ? "Normal" : "Abnormal"}
                      {region.confidence && ` (${Math.round(region.confidence * 100)}% confidence)`}
                    </li>
                  ))}
                </ul>
              </div>

              {results.findings.differentialDiagnosis && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Differential Diagnosis</h4>
                  <p className="text-sm">{results.findings.differentialDiagnosis}</p>
                </div>
              )}

              {results.findings.additionalNotes && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Additional Notes</h4>
                  <p className="text-sm">{results.findings.additionalNotes}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="min-h-[250px]">
            <div className="flex flex-col items-center justify-center h-[250px] bg-muted/50 rounded-lg">
              <p className="text-muted-foreground mb-4">Interactive visualization would appear here</p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Original Scan</span>
                </div>
                <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Segmentation</span>
                </div>
                <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Heatmap</span>
                </div>
                <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">3D View</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="query" className="min-h-[250px]">
            <ScanQueryInterface scanResults={results} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleDownloadReport}>
            <Icons.download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

