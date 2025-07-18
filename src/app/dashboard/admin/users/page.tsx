"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { EditUserModal } from "./edit-user-modal"
import { DeleteUserModal } from "./delete-user-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { jsPDF } from "jspdf"
import { autoTable } from "jspdf-autotable"

enum PrivacySettings {
  EVERYONE = "Everyone can see my profile",
  FOLLOWERS = "Only followers can see my profile",
}

enum MessagePermissions {
  EVERYONE = "Everyone",
  ADMIN = "Admin",
  NOBODY = "Nobody",
}

export interface User {
  _id: string
  firebaseId?: string
  name?: string
  country?: string
  username?: string
  email: string
  phoneNumber?: string
  privacySettings: PrivacySettings
  messagePermissions: MessagePermissions
  avatar?: string
  role: "admin" | "instructor" | "student" | "guest"
  status: "Active" | "Inactive"
  subscription: "Free" | "Paid" | "Creator"
  accessLevel: "Basic" | "Limited" | "Full"
}

interface UsersResponse {
  users: User[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/users")
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      const data: UsersResponse = await response.json()
      setUsers(data.users)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (id: string, updatedData: Partial<User>) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedData }),
      })
      if (!response.ok) {
        throw new Error("Failed to update user")
      }
      toast({
        title: "Success",
        description: "User updated successfully.",
        variant: "success",
      })
      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
      throw err
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users?id=${id}`, { method: "DELETE" })
      if (!response.ok) {
        throw new Error("Failed to delete user")
      }
      toast({
        title: "Success",
        description: "User deleted successfully.",
        variant: "success",
      })
      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
      throw err
    }
  }

  const navigateToUserDetails = (userId: string) => {
    router.push(`/users/${userId}`)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setDeleteModalOpen(true)
  }

  const handleToggleStatus = (user: User) => {
    updateUser(user._id, { status: user.status === "Active" ? "Inactive" : "Active" })
  }

  const exportToExcel = () => {
    if (users.length === 0) return

    const formattedData = users.map(({ name, email, role, status, subscription, accessLevel }) => ({
      Name: name,
      Email: email,
      Role: role,
      Status: status,
      Subscription: subscription,
      "Access Level": accessLevel,
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users")

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

    saveAs(blob, "users.xlsx")
  }

  const exportToPDF = () => {
    if (users.length === 0) return

    // Create a new jsPDF instance
    const doc = new jsPDF()
    doc.text("Lista de Usuarios", 14, 10)

    const tableColumn = ["Nome", "Email", "Papel", "Status", "Subscricao", "Nivel de Acesso"]
    const tableRows = users.map(({ name, email, role, status, subscription, accessLevel }) => [
      name || "", 
      email || "",
      role || "",
      status || "Ativo", 
      subscription || "",
      accessLevel || "",
    ])

   autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 102, 204] },
    })

    doc.save("users.pdf")
  }

  return (
    <div className="container mx-auto px-2 mt-16 sm:px-4 py-4 min-h-[calc(100vh-4rem)] ">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Users</h1>
      <div className="mt-3 mb-4 flex flex-wrap gap-2 ml-auto justify-end">
  <Button variant="outline" onClick={exportToExcel}>
    Exportar Excel
  </Button>

  <Button variant="outline" onClick={exportToPDF}>
    Exportar PDF
  </Button>
</div>


      {isLoading && users.length === 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              {["Avatar", "Name", "Email", "Role", "Status", "Actions"].map((header, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : error && users.length === 0 ? (
        <div className="p-4 text-center text-red-500">Error: {error}</div>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onStatusToggle={handleToggleStatus}
          onViewDetails={navigateToUserDetails}
        />
      )}

      {/* Separate modal components */}
      <EditUserModal user={selectedUser} open={editModalOpen} onOpenChange={setEditModalOpen} onUpdate={updateUser} />

      <DeleteUserModal
        user={selectedUser}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onDelete={deleteUser}
      />
    </div>
  )
}

