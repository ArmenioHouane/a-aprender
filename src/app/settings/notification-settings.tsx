"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [courseUpdates, setCourseUpdates] = useState(false)
  const [communityMessages, setCommunityMessages] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      // Handle successful save
      console.log("Notification settings saved")
      toast({
        title: "Settings Saved",
        description: "Your notification settings have been updated successfully.",
        variant: "success"
      })
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="course-updates">Course Updates</Label>
          <Switch id="course-updates" checked={courseUpdates} onCheckedChange={setCourseUpdates} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="community-messages">Community & Messages</Label>
          <Switch id="community-messages" checked={communityMessages} onCheckedChange={setCommunityMessages} />
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

