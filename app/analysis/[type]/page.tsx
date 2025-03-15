import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ScanUploader } from "@/components/scan-uploader"
import { ScanAnalysisResults } from "@/components/scan-analysis-results"

interface AnalysisPageProps {
  params: {
    type: string
  }
}

export function generateMetadata({ params }: AnalysisPageProps): Metadata {
  const scanType = getScanType(params.type)
  if (!scanType) return { title: "Not Found" }

  return {
    title: `${scanType.title} Analysis`,
    description: `Upload and analyze ${scanType.title.toLowerCase()} scans using AI`,
  }
}

function getScanType(type: string) {
  const scanTypes = {
    mri: {
      title: "MRI",
      description: "Magnetic Resonance Imaging scan analysis",
      icon: "brain",
    },
    ct: {
      title: "CT Scan",
      description: "Computed Tomography scan analysis",
      icon: "lungs",
    },
    xray: {
      title: "X-Ray",
      description: "X-Ray image analysis",
      icon: "xray",
    },
  }

  return scanTypes[type as keyof typeof scanTypes]
}

export default function AnalysisPage({ params }: AnalysisPageProps) {
  const scanType = getScanType(params.type)

  if (!scanType) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{scanType.title} Analysis</h1>
        <p className="text-muted-foreground max-w-[700px]">{scanType.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScanUploader scanType={params.type} />
        <ScanAnalysisResults scanType={params.type} />
      </div>
    </div>
  )
}

