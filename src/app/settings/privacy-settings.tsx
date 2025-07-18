"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState("")
  const [courseVisibility, setCourseVisibility] = useState("")
  const [messagingOption, setMessagingOption] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      // Handle successful save
      console.log("Privacy settings saved")
      toast({
        title: "Settings Saved",
        description: "Your privacy settings have been updated successfully.",
        variant: "success"
      })
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="profile-visibility">Profile Visibility</Label>
          <Select value={profileVisibility} onValueChange={setProfileVisibility}>
            <SelectTrigger id="profile-visibility">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="enrolled">Only for Enrolled Courses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="course-visibility">Who Can View My Courses?</Label>
          <Select value={courseVisibility} onValueChange={setCourseVisibility}>
            <SelectTrigger id="course-visibility">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="friends">Only Friends</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="messaging">Who Can Message Me?</Label>
          <Select value={messagingOption} onValueChange={setMessagingOption}>
            <SelectTrigger id="messaging">
              <SelectValue placeholder="Select messaging option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">Everyone</SelectItem>
              <SelectItem value="instructors">Only Instructors</SelectItem>
              <SelectItem value="none">No One</SelectItem>
            </SelectContent>
          </Select>
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

