import { create } from "zustand"

interface ScanAnalysisState {
  results: any | null
  isAnalyzing: boolean
  setResults: (results: any | null) => void
  setIsAnalyzing: (isAnalyzing: boolean) => void
  reset: () => void
}

export const useScanAnalysisStore = create<ScanAnalysisState>((set) => ({
  results: null,
  isAnalyzing: false,
  setResults: (results) => set({ results }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () => set({ results: null, isAnalyzing: false }),
}))

