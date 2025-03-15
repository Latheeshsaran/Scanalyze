import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ProfileSettings } from "@/components/profile-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { ApiSettings } from "@/components/api-settings"

export const metadata: Metadata = {
  title: "Settings | Medical Scan Analysis",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <ProfileSettings />
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <NotificationSettings />
          </Card>
        </TabsContent>
        <TabsContent value="api">
          <Card>
            <ApiSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

