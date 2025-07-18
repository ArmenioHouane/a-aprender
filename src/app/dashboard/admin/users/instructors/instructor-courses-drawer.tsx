"use client"

import { useState, useEffect } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, BookOpen, Users, DollarSign, Calendar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Course {
  _id: string
  title: string
  description?: string
  price?: number
  enrolledStudents?: number
  createdAt?: string
  status?: string
  thumbnail?: string
}

interface User {
  _id: string
  name: string
  email: string
}

interface InstructorCoursesDrawerProps {
  instructor: User | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function InstructorCoursesDrawer({ instructor, isOpen, onOpenChange }: InstructorCoursesDrawerProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      if (!instructor?._id || !isOpen) return

      setLoading(true)
      setError(null)

      try {
        // Assuming you have an API endpoint to fetch courses by instructor ID
        const response = await fetch(`/api/courses?instructorId=${instructor._id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const data = await response.json()
        setCourses(data.courses || [])
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError(err instanceof Error ? err.message : "Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [instructor, isOpen])

  // Format date to a readable string
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>{instructor?.name ? `${instructor.name}'s Courses` : "Instructor Courses"}</DrawerTitle>
          <DrawerDescription>{instructor?.email || ""}</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[60vh] px-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              {error}
              <Button variant="outline" className="mt-2" onClick={() => onOpenChange(true)}>
                Retry
              </Button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No courses found for this instructor.</div>
          ) : (
            <div className="grid gap-4 pb-6">
              {courses.map((course) => (
                <Card key={course._id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant={course.status === "Published" ? "default" : "outline"}>
                        {course.status || "Draft"}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {course.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />${course.price || 0}
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        {course.enrolledStudents || 0} students
                      </div>
                      <div className="flex items-center text-sm">
                        <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                        {/* Assuming you have a lessons count, otherwise use a placeholder */}
                        {Math.floor(Math.random() * 20) + 1} lessons
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        {formatDate(course.createdAt)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View Course
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>

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

