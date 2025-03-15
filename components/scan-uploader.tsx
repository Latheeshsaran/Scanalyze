"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { analyzeScan } from "@/lib/scan-analysis"
import { PatientInfoForm } from "@/components/patient-info-form"

interface ScanUploaderProps {
  scanType: string
}

export function ScanUploader({ scanType }: ScanUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [patientInfo, setPatientInfo] = useState({
    patientId: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    scanDate: new Date().toISOString().split("T")[0],
    clinicalHistory: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/dicom", "application/dicom"]
    if (!validTypes.includes(file.type) && !file.name.endsWith(".dcm")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a DICOM, PNG, or JPEG file.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)

    // Create preview for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      // For DICOM files, we'll just show a placeholder
      setPreviewUrl(null)
    }

    // Generate a random patient ID if not provided
    if (!patientInfo.patientId) {
      setPatientInfo((prev) => ({
        ...prev,
        patientId: `P${Math.floor(10000 + Math.random() * 90000)}`,
      }))
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handlePatientInfoChange = (info: Partial<typeof patientInfo>) => {
    setPatientInfo((prev) => ({ ...prev, ...info }))
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    // Validate patient info
    if (!patientInfo.patientId) {
      toast({
        title: "Missing information",
        description: "Please enter a patient ID.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 100)

    try {
      // Call the analysis function with patient info
      const result = await analyzeScan(selectedFile, scanType, patientInfo)

      // Complete the progress
      setUploadProgress(100)

      // Notify success
      toast({
        title: "Analysis complete",
        description: "Your scan has been successfully analyzed.",
      })

      // Reset the uploader after a delay
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        // We don't reset the file selection so the user can see their file
      }, 1000)
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your scan. Please try again.",
        variant: "destructive",
      })
      setIsUploading(false)
      setUploadProgress(0)
    } finally {
      clearInterval(interval)
    }
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload {getScanTypeTitle()}</CardTitle>
        <CardDescription>Drag and drop your scan file or click to browse</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            selectedFile && previewUrl ? "bg-muted/50" : "",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".dcm,image/dicom,image/jpeg,image/png"
            onChange={handleFileInputChange}
          />

          {selectedFile ? (
            previewUrl ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Scan preview"
                  className="max-h-[200px] max-w-full object-contain rounded-md"
                />
                <p className="text-sm text-muted-foreground">
                  {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 bg-muted rounded-md flex items-center justify-center">
                  <Icons.fileText className="h-16 w-16 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Icons.upload className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground text-center">
                Upload your {getScanTypeTitle()} file
                <br />
                <span className="text-xs">Supports DICOM, PNG, and JPEG formats</span>
              </p>
            </div>
          )}
        </div>

        {selectedFile && (
          <PatientInfoForm patientInfo={patientInfo} onChange={handlePatientInfoChange} scanType={scanType} />
        )}

        {isUploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {uploadProgress < 100 ? "Processing..." : "Analysis complete"}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!selectedFile || isUploading} onClick={handleAnalyze}>
          {isUploading ? (
            <>Processing...</>
          ) : (
            <>
              <Icons.zap className="mr-2 h-4 w-4" />
              Analyze {getScanTypeTitle()}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

