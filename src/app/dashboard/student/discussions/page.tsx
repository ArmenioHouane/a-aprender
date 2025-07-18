"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAccountData } from "@/hooks/useAccountData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AccountPage() {
  const { userData, loading, error, updateUser } = useAccountData()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    country: "",
    phoneNumber: "",
    privacySettings: "",
    messagePermissions: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        username: userData.username || "",
        country: userData.country || "",
        phoneNumber: userData.phoneNumber || "",
        privacySettings: userData.privacySettings,
        messagePermissions: userData.messagePermissions,
      })
    }
  }, [userData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const success = await updateUser(formData)

    if (success) {
      setIsEditing(false)
    }

    setIsSaving(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error loading account: {error}</p>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="text-center p-8">
        <p>Please log in to view your account</p>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
          <CardDescription>View and manage your personal information</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isEditing ? (
              // Edit mode
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacySettings">Privacy Settings</Label>
                  <Select
                    value={formData.privacySettings}
                    onValueChange={(value) => handleSelectChange("privacySettings", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select privacy setting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Everyone can see my profile">Everyone can see my profile</SelectItem>
                      <SelectItem value="Only followers can see my profile">
                        Only followers can see my profile
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="messagePermissions">Message Permissions</Label>
                  <Select
                    value={formData.messagePermissions}
                    onValueChange={(value) => handleSelectChange("messagePermissions", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select message permissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Everyone">Everyone</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Nobody">Nobody</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              // View mode
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{userData.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                    <p>{userData.name || "Not set"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                    <p>{userData.username || "Not set"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Country</h3>
                    <p>{userData.country || "Not set"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                    <p>{userData.phoneNumber || "Not set"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Account Status</h3>
                    <p>{userData.status}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Privacy Settings</h3>
                    <p>{userData.privacySettings}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Message Permissions</h3>
                    <p>{userData.messagePermissions}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {isEditing ? (
              <>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit Account
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

