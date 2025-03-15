import { type NextRequest, NextResponse } from "next/server"
import { processQuery, processScanQuery } from "@/lib/nlp-model"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, scanResults } = body

    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 })
    }

    let response

    // If scan results are provided, use the context-aware query processor
    if (scanResults) {
      response = await processScanQuery(query, scanResults)
    } else {
      // Otherwise, use the general query processor
      response = await processQuery(query)
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing query:", error)
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}

