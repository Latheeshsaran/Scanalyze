import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentScans } from "@/components/recent-scans"
import { SavedReports } from "@/components/saved-reports"

export const metadata: Metadata = {
  title: "Dashboard | Medical Scan Analysis",
  description: "View your analysis history and saved results",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <div className="grid gap-6 mt-6">
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentScans />
          <SavedReports />
        </div>
      </div>
    </div>
  )
}

