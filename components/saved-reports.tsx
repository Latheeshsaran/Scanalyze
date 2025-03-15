import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function SavedReports() {
  const savedReports = [
    {
      id: "report-1",
      name: "Brain MRI Analysis",
      date: "2023-03-15",
      type: "mri",
    },
    {
      id: "report-2",
      name: "Chest CT Analysis",
      date: "2023-03-10",
      type: "ct",
    },
    {
      id: "report-3",
      name: "Chest X-Ray Analysis",
      date: "2023-03-05",
      type: "xray",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "mri":
        return <Icons.brain className="h-4 w-4" />
      case "ct":
        return <Icons.lungs className="h-4 w-4" />
      case "xray":
        return <Icons.xray className="h-4 w-4" />
      default:
        return <Icons.fileText className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Reports</CardTitle>
        <CardDescription>Your saved analysis reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  {getIcon(report.type)}
                </div>
                <div>
                  <p className="text-sm font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icons.download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Link href={`/reports/${report.id}`}>
                  <Button variant="ghost" size="icon">
                    <Icons.fileText className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/reports">
            <Button variant="outline" size="sm">
              View All Reports
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

