/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, MessageSquare, Calendar } from "lucide-react"
import { useState } from "react"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)

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
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Control how and when you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Push Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="push-all" className="text-base">
                      All Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive all push notifications</p>
                  </div>
                </div>
                <Switch id="push-all" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="push-messages" className="text-base">
                      Messages
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                  </div>
                </div>
                <Switch id="push-messages" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="push-reminders" className="text-base">
                      Course Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for upcoming classes and deadlines
                    </p>
                  </div>
                </div>
                <Switch id="push-reminders" defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email-all" className="text-base">
                      All Emails
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive all email notifications</p>
                  </div>
                </div>
                <Switch id="email-all" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email-messages" className="text-base">
                      Messages
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for new messages</p>
                  </div>
                </div>
                <Switch id="email-messages" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email-reminders" className="text-base">
                      Course Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email reminders for upcoming classes and deadlines
                    </p>
                  </div>
                </div>
                <Switch id="email-reminders" defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Frequency</h3>
            <div className="space-y-2">
              <Label htmlFor="digest">Email Digest</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="digest">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Choose how often you want to receive email summaries.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quiet-hours">Quiet Hours</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quiet-start" className="text-xs">
                    Start
                  </Label>
                  <Select defaultValue="22">
                    <SelectTrigger id="quiet-start">
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quiet-end" className="text-xs">
                    End
                  </Label>
                  <Select defaultValue="7">
                    <SelectTrigger id="quiet-end">
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">We won&apos;t send notifications during these hours.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Reset to Default</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

