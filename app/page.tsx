import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Medical Scan Analysis Platform</h1>
        <p className="text-muted-foreground max-w-[700px]">
          Advanced AI-powered analysis for MRI, CT, and X-ray scans with natural language query capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>MRI Analysis</CardTitle>
            <CardDescription>Upload and analyze magnetic resonance imaging scans</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/analysis/mri">
              <Button>
                <Icons.brain className="mr-2 h-4 w-4" />
                Analyze MRI Scans
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CT Scan Analysis</CardTitle>
            <CardDescription>Upload and analyze computed tomography scans</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/analysis/ct">
              <Button>
                <Icons.lungs className="mr-2 h-4 w-4" />
                Analyze CT Scans
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>X-Ray Analysis</CardTitle>
            <CardDescription>Upload and analyze X-ray images</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/analysis/xray">
              <Button>
                <Icons.xray className="mr-2 h-4 w-4" />
                Analyze X-Ray Images
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Query Assistant</CardTitle>
            <CardDescription>Ask questions about medical scans and get AI-powered answers</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/query">
              <Button>
                <Icons.messageSquare className="mr-2 h-4 w-4" />
                Ask Medical Questions
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>View your analysis history and saved results</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/dashboard">
              <Button>
                <Icons.layoutDashboard className="mr-2 h-4 w-4" />
                View Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Settings</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/settings">
              <Button>
                <Icons.settings className="mr-2 h-4 w-4" />
                Manage Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

