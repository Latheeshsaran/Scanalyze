import { type NextRequest, NextResponse } from "next/server"
import { analyzeScan } from "@/lib/scan-analysis"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const scanType = formData.get("scanType") as string
    const patientId = formData.get("patientId") as string
    const patientName = formData.get("patientName") as string
    const patientAge = formData.get("patientAge") as string
    const patientGender = formData.get("patientGender") as string
    const scanDate = formData.get("scanDate") as string
    const clinicalHistory = formData.get("clinicalHistory") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!scanType || !["mri", "ct", "xray"].includes(scanType)) {
      return NextResponse.json({ error: "Invalid scan type" }, { status: 400 })
    }

    if (!patientId) {
      return NextResponse.json({ error: "Patient ID is required" }, { status: 400 })
    }

    // Collect patient info
    const patientInfo = {
      patientId,
      patientName,
      patientAge,
      patientGender,
      scanDate,
      clinicalHistory,
    }

    // Process the scan
    const results = await analyzeScan(file, scanType, patientInfo)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error processing scan:", error)
    return NextResponse.json({ error: "Failed to process scan" }, { status: 500 })
  }
}

