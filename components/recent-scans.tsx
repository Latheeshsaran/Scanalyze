import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function RecentScans() {
  const recentScans = [
    {
      id: "scan-1",
      name: "Brain MRI",
      date: "2023-03-15",
      type: "mri",
      status: "Completed",
    },
    {
      id: "scan-2",
      name: "Chest CT",
      date: "2023-03-10",
      type: "ct",
      status: "Completed",
    },
    {
      id: "scan-3",
      name: "Chest X-Ray",
      date: "2023-03-05",
      type: "xray",
      status: "Completed",
    },
    {
      id: "scan-4",
      name: "Abdominal CT",
      date: "2023-02-28",
      type: "ct",
      status: "Completed",
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
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>Your most recently analyzed scans</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentScans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  {getIcon(scan.type)}
                </div>
                <div>
                  <p className="text-sm font-medium">{scan.name}</p>
                  <p className="text-xs text-muted-foreground">{scan.date}</p>
                </div>
              </div>
              <Link href={`/analysis/${scan.type}?id=${scan.id}`}>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/history">
            <Button variant="outline" size="sm">
              View All Scans
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

