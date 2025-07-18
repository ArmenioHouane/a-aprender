"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Users, DollarSign, Mail, Calendar, Award } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  role: string
  coursesCreated?: number
  avatar?: string
  students?: number
  revenue?: number
  status?: string
  createdAt?: string
  bio?: string
}

interface InstructorViewDrawerProps {
  instructor: User | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function InstructorViewDrawer({ instructor, isOpen, onOpenChange }: InstructorViewDrawerProps) {
  // Format date to a readable string
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  if (!instructor) return null

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />
              <AvatarFallback className="text-2xl">
                {instructor.name ? instructor.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <DrawerTitle className="text-2xl">{instructor.name}</DrawerTitle>
          <div className="flex items-center justify-center mt-1">
            <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
            <DrawerDescription>{instructor.email}</DrawerDescription>
          </div>
          <div className="mt-2">
            <Badge
              variant="outline"
              className={
                instructor.status === "Active"
                  ? "bg-green-500 text-green-700"
                  : instructor.status === "Inactive"
                    ? "bg-gray-500 text-gray-700"
                    : "bg-red-500 text-red-700"
              }
            >
              {instructor.status || "Active"}
            </Badge>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center pt-0">
                <BookOpen className="h-4 w-4 mr-2 text-primary" />
                <span className="text-2xl font-bold">{instructor.coursesCreated || 0}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center pt-0">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="text-2xl font-bold">{instructor.students || 0}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center pt-0">
                <DollarSign className="h-4 w-4 mr-2 text-primary" />
                <span className="text-2xl font-bold">${instructor.revenue || 0}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Joined</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center pt-0">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span className="text-lg font-medium">{formatDate(instructor.createdAt) || "N/A"}</span>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {instructor.bio || "No biography available for this instructor."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">Top Instructor {new Date().getFullYear()}</span>
              </div>
              {instructor.coursesCreated && instructor.coursesCreated > 5 && (
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">Course Creator (5+ courses)</span>
                </div>
              )}
              {instructor.students && instructor.students > 100 && (
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Reaching 100+ students</span>
                </div>
              )}
              {(!instructor.coursesCreated || instructor.coursesCreated <= 5) &&
                (!instructor.students || instructor.students <= 100) && (
                  <p className="text-sm text-muted-foreground">No achievements yet.</p>
                )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        <DrawerFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

