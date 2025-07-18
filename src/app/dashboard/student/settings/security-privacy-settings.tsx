/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Shield, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function SecurityPrivacySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Security & Privacy</CardTitle>
          </div>
          <CardDescription>Manage your security preferences and privacy settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input id="new-password" type={showNewPassword ? "text" : "password"} placeholder="••••••••" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Password Requirements:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Contains at least one uppercase letter</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa" className="text-base">
                  Enable 2FA
                </Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch id="2fa" />
            </div>
            <Button variant="outline" className="w-full">
              Set Up Two-Factor Authentication
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <h3 className="text-lg font-medium">Privacy Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Who can see your profile</Label>
                <Select defaultValue="everyone">
                  <SelectTrigger id="profile-visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="classmates">Classmates Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="learning-visibility">Who can see your learning activity</Label>
                <Select defaultValue="connections">
                  <SelectTrigger id="learning-visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="classmates">Classmates Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics" className="text-base">
                    Usage Analytics
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect anonymous usage data to improve our services
                  </p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="personalization" className="text-base">
                    Personalized Learning
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to personalize your learning experience based on your activity
                  </p>
                </div>
                <Switch id="personalization" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing" className="text-base">
                    Marketing Communications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new courses, features, and promotions
                  </p>
                </div>
                <Switch id="marketing" />
              </div>
            </div>
          </div>

          <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Data Export</h4>
                <p className="text-sm text-amber-700 mt-1">
                  You can request a copy of all your personal data. This process may take up to 48 hours.
                </p>
                <Button variant="outline" size="sm" className="mt-2 bg-white">
                  Request Data Export
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

