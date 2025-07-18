/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { ArrowUpDown, Download, Filter, MoreHorizontal, Plus, Search, UserPlus } from 'lucide-react'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Sample data for students
const students = [
  {
    id: "STU-1001",
    name: "Alex Johnson",
    email: "alex@example.com",
    registrationDate: "2023-06-15",
    status: "active",
    enrolledCourses: 3,
    lastLogin: "2023-10-28",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94321",
    bio: "Computer science student interested in web development and AI.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU-1002",
    name: "Maria Garcia",
    email: "maria@example.com",
    registrationDate: "2023-07-22",
    status: "active",
    enrolledCourses: 2,
    lastLogin: "2023-10-30",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Somewhere, NY 10001",
    bio: "Marketing professional looking to expand digital skills.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU-1003",
    name: "James Smith",
    email: "james@example.com",
    registrationDate: "2023-05-10",
    status: "inactive",
    enrolledCourses: 0,
    lastLogin: "2023-08-15",
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, Elsewhere, TX 75001",
    bio: "Former software engineer transitioning to data science.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU-1004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    registrationDate: "2023-09-05",
    status: "active",
    enrolledCourses: 4,
    lastLogin: "2023-10-31",
    phone: "+1 (555) 456-7890",
    address: "101 Maple Dr, Nowhere, WA 98001",
    bio: "UX designer with 5 years of experience in the tech industry.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU-1005",
    name: "David Brown",
    email: "david@example.com",
    registrationDate: "2023-08-18",
    status: "active",
    enrolledCourses: 1,
    lastLogin: "2023-10-25",
    phone: "+1 (555) 567-8901",
    address: "202 Cedar Ln, Anywhere, FL 33101",
    bio: "Business analyst looking to improve technical skills.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU-1006",
    name: "Emma Wilson",
    email: "emma@example.com",
    registrationDate: "2023-04-30",
    status: "inactive",
    enrolledCourses: 2,
    lastLogin: "2023-07-20",
    phone: "+1 (555) 678-9012",
    address: "303 Birch Rd, Someplace, IL 60601",
    bio: "Graphic designer interested in UI/UX and front-end development.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU-1007",
    name: "Michael Taylor",
    email: "michael@example.com",
    registrationDate: "2023-10-01",
    status: "active",
    enrolledCourses: 2,
    lastLogin: "2023-10-29",
    phone: "+1 (555) 789-0123",
    address: "404 Elm St, Othertown, GA 30301",
    bio: "Recent graduate with a degree in computer engineering.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Sample data for enrolled courses
const enrolledCourses = [
  {
    id: "CRS-101",
    title: "Introduction to Web Development",
    progress: 75,
    enrollmentDate: "2023-07-10",
    status: "in-progress",
  },
  {
    id: "CRS-203",
    title: "Advanced JavaScript",
    progress: 45,
    enrollmentDate: "2023-08-15",
    status: "in-progress",
  },
  {
    id: "CRS-150",
    title: "UX/UI Design Fundamentals",
    progress: 100,
    enrollmentDate: "2023-06-20",
    status: "completed",
  },
  {
    id: "CRS-302",
    title: "Data Science Basics",
    progress: 30,
    enrollmentDate: "2023-09-05",
    status: "in-progress",
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" || 
      student.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCourseStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error()
      return dateString
    }
  }

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage student accounts and information.
          </p>
        </div>
        <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the details for the new student account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Full name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Email address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" type="tel" placeholder="Phone number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" placeholder="Address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea id="bio" placeholder="Student bio" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>
            View and manage all student accounts on your platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Registered
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>{formatDate(student.registrationDate)}</TableCell>
                      <TableCell>{student.enrolledCourses}</TableCell>
                      <TableCell>{formatDate(student.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewStudent(student)}
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-md">
                            <SheetHeader>
                              <SheetTitle>Student Details</SheetTitle>
                              <SheetDescription>
                                View and manage student information
                              </SheetDescription>
                            </SheetHeader>
                            {selectedStudent && (
                              <div className="py-6">
                                <div className="flex items-center gap-4 mb-6">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                                    <AvatarFallback className="text-lg">
                                      {selectedStudent.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                                    <div className="mt-1">{getStatusBadge(selectedStudent.status)}</div>
                                  </div>
                                </div>
                                
                                <Tabs defaultValue="details" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="courses">Courses</TabsTrigger>
                                    <TabsTrigger value="activity">Activity</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="details" className="space-y-4 mt-4">
                                    <div>
                                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Personal Information</h4>
                                      <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <div className="text-sm font-medium">ID:</div>
                                        <div className="text-sm">{selectedStudent.id}</div>
                                        
                                        <div className="text-sm font-medium">Phone:</div>
                                        <div className="text-sm">{selectedStudent.phone}</div>
                                        
                                        <div className="text-sm font-medium">Address:</div>
                                        <div className="text-sm">{selectedStudent.address}</div>
                                        
                                        <div className="text-sm font-medium">Registered:</div>
                                        <div className="text-sm">{formatDate(selectedStudent.registrationDate)}</div>
                                        
                                        <div className="text-sm font-medium">Last Login:</div>
                                        <div className="text-sm">{formatDate(selectedStudent.lastLogin)}</div>
                                      </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Bio</h4>
                                      <p className="text-sm">{selectedStudent.bio}</p>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-6">
                                      <Button variant="outline" size="sm">Edit Details</Button>
                                      {selectedStudent.status === "active" ? (
                                        <Button variant="outline" size="sm" className="text-destructive">
                                          Deactivate
                                        </Button>
                                      ) : (
                                        <Button variant="outline" size="sm" className="text-green-600">
                                          Activate
                                        </Button>
                                      )}
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="courses" className="mt-4">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Enrolled Courses</h4>
                                    {enrolledCourses.length === 0 ? (
                                      <p className="text-sm text-muted-foreground">No courses enrolled.</p>
                                    ) : (
                                      <div className="space-y-4">
                                        {enrolledCourses.map((course) => (
                                          <div key={course.id} className="border rounded-md p-3">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <h5 className="font-medium">{course.title}</h5>
                                                <div className="text-sm text-muted-foreground">
                                                  {course.id} • Enrolled on {formatDate(course.enrollmentDate)}
                                                </div>
                                              </div>
                                              <div>{getCourseStatusBadge(course.status)}</div>
                                            </div>
                                            <div className="mt-2">
                                              <div className="flex items-center gap-2">
                                                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                                  <div 
                                                    className="h-full bg-primary" 
                                                    style={{ width: `${course.progress}%` }}
                                                  />
                                                </div>
                                                <span className="text-xs">{course.progress}%</span>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <Button variant="outline" size="sm" className="mt-4">
                                      <Plus className="mr-2 h-4 w-4" />
                                      Enroll in Course
                                    </Button>
                                  </TabsContent>
                                  
                                  <TabsContent value="activity" className="mt-4">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Activity</h4>
                                    <div className="space-y-4">
                                      <div className="border-l-2 border-primary pl-4 py-1">
                                        <p className="text-sm font-medium">Completed quiz in Advanced JavaScript</p>
                                        <p className="text-xs text-muted-foreground">Oct 30, 2023 at 2:45 PM</p>
                                      </div>
                                      <div className="border-l-2 border-muted pl-4 py-1">
                                        <p className="text-sm font-medium">Submitted assignment in Web Development</p>
                                        <p className="text-xs text-muted-foreground">Oct 28, 2023 at 11:20 AM</p>
                                      </div>
                                      <div className="border-l-2 border-muted pl-4 py-1">
                                        <p className="text-sm font-medium">Started new course: Data Science Basics</p>
                                        <p className="text-xs text-muted-foreground">Oct 25, 2023 at 9:15 AM</p>
                                      </div>
                                      <div className="border-l-2 border-muted pl-4 py-1">
                                        <p className="text-sm font-medium">Updated profile information</p>
                                        <p className="text-xs text-muted-foreground">Oct 22, 2023 at 4:30 PM</p>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            )}
                            <SheetFooter>
                              <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
