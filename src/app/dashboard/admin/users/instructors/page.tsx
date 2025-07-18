"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, MoreHorizontal, Plus } from "lucide-react"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import UserManagementSheet from "./sheet"
import EditInstructorSheet from "./edit-instructor-sheet"
import InstructorCoursesDrawer from "./instructor-courses-drawer"
import InstructorViewDrawer from "./instructor-view-drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
}

interface UsersResponse {
  users: User[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}



export default function InstructorPage() {
  const [instructors, setInstructors] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInstructor, setSelectedInstructor] = useState<User | null>(null)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [isCoursesDrawerOpen, setIsCoursesDrawerOpen] = useState(false)
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false)



  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("/api/users?role=instructor")
        const data: UsersResponse = await response.json()
        setInstructors(data.users)
      } catch (error) {
        console.error("Error fetching instructors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInstructors()
  }, [])

  const exportToExcel = () => {
    if (instructors.length === 0) return

    const formattedData = instructors.map(({ name, email, coursesCreated, students, revenue, status }) => ({
      Nome: name,
      Email: email,
      "Cursos Criados": coursesCreated || 0,
      Alunos: students || 0,
      Receita: revenue ? `$${revenue}` : "$0",
      Status: status || "Ativo",
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Instructors")

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

    saveAs(blob, "instructors.xlsx")
  }

  const exportToPDF = () => {
    if (instructors.length === 0) return

    // Create a new jsPDF instance
    const doc = new jsPDF()
    doc.text("Lista de Instrutores", 14, 10)

    const tableColumn = ["Nome", "Email", "Cursos Criados", "Alunos", "Receita", "Status"]
    const tableRows = instructors.map(({ name, email, coursesCreated, students, revenue, status }) => [
      name,
      email,
      coursesCreated || 0,
      students || 0,
      revenue ? `$${revenue}` : "$0",
      status || "Ativo",
    ])

    // Make sure jspdf-autotable is properly imported
    // The autoTable method should be available on the doc object
 autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 102, 204] },
    })

    doc.save("instructors.pdf")
  }

  // Handler for opening the edit sheet
  const handleEditInstructor = (instructor: User) => {
    setSelectedInstructor(instructor)
    setIsEditSheetOpen(true)
  }

  // Handler for opening the courses drawer
  const handleViewCourses = (instructor: User) => {
    setSelectedInstructor(instructor)
    setIsCoursesDrawerOpen(true)
  }

  // Handler for opening the view drawer
  const handleViewInstructor = (instructor: User) => {
    setSelectedInstructor(instructor)
    setIsViewDrawerOpen(true)
  }
  useEffect(() => {
    if (isEditSheetOpen) {
      document.body.style.pointerEvents = "auto"
    } else {
      document.body.style.pointerEvents = "auto"
    }
  }, [isEditSheetOpen])

  // Also add similar useEffects for the other drawers
  useEffect(() => {
    if (isCoursesDrawerOpen) {
      document.body.style.pointerEvents = "auto"
    } else {
      document.body.style.pointerEvents = "auto"
    }
  }, [isCoursesDrawerOpen])

  useEffect(() => {
    if (isViewDrawerOpen) {
      document.body.style.pointerEvents = "auto"
    } else {
      document.body.style.pointerEvents = "auto"
    }
  }, [isViewDrawerOpen])




  return (
    <div className="flex min-h-screen mt-16 w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin/home">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Button>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight">Instructor Management</h1>

          <div className="ml-auto flex flex-wrap gap-2">
          <UserManagementSheet>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Instructor
        </Button>
      </UserManagementSheet>
            <Button variant="outline" onClick={exportToExcel}>
              Exportar Excel
            </Button>

            <Button variant="outline" onClick={exportToPDF}>
              Exportar PDF
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Courses Created</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))
              ) : instructors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No instructors found
                  </TableCell>
                </TableRow>
              ) : (
                instructors.map((instructor) => (
                  <TableRow key={instructor._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="mr-2">
                          <AvatarImage src={instructor.avatar} alt={instructor.name} />
                          <AvatarFallback>
                            {instructor.name ? instructor.name.charAt(0).toUpperCase() : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span>{instructor.name || `Instructor ${instructor._id.substring(0, 4)}`}</span>
                      </div>
                    </TableCell>
                    <TableCell>{instructor.email}</TableCell>
                    <TableCell>{instructor.coursesCreated || 0}</TableCell>
                    <TableCell>{instructor.students || 0}</TableCell>
                    <TableCell>${instructor.revenue || 0}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500 text-green-700 ">
                        {instructor.status || "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewInstructor(instructor)}>View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditInstructor(instructor)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewCourses(instructor)}>Courses</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      <EditInstructorSheet
        instructor={selectedInstructor}
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        onInstructorUpdated={() => setInstructors(prev => [...prev])} // Mantém o estado atual

      />

      {/* Instructor Courses Drawer */}
      <InstructorCoursesDrawer
        instructor={selectedInstructor}
        isOpen={isCoursesDrawerOpen}
        onOpenChange={setIsCoursesDrawerOpen}
      />

      {/* Instructor View Drawer */}
      <InstructorViewDrawer
        instructor={selectedInstructor}
        isOpen={isViewDrawerOpen}
        onOpenChange={setIsViewDrawerOpen}
      />
    </div>
  )
}

