"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Plus, Loader2, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the User type based on your application's user model
interface User {
  _id: string
  name: string
  email: string
  role: string
  // Add other user properties as needed
}

interface UsersResponse {
  users: User[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export default function UserManagementSheet({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch users function
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `/api/users?page=${page}&pageSize=10${roleFilter !== "all" ? `&role=${roleFilter}` : ""}`,
      )
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      const data: UsersResponse = await response.json()

      setUsers(data.users || [])
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
      // Ensure users is reset to empty array on error
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  // Update user function
  const updateUser = async (id: string, updatedData: Partial<User>) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedData }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update user")
      }

      return await response.json()
    } catch (err) {
      console.error("Update error:", err)
      throw err
    }
  }

  // Update multiple users to instructor role
  const updateSelectedUsersToInstructor = async () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "Warning",
        description: "Please select at least one user to update.",
        variant: "default",
      })
      return
    }

    setIsUpdating(true)
    let successCount = 0
    let errorCount = 0

    try {
      // Process updates sequentially
      for (const userId of selectedUsers) {
        try {
          await updateUser(userId, { role: "instructor" })
          successCount++
        } catch (error) {
          errorCount++
          console.error(`Failed to update user ${userId}:`, error)
        }
      }

      // Refresh the user list
      await fetchUsers()

      // Clear selections after updates
      setSelectedUsers([])

      if (successCount > 0) {
        toast({
          title: "Success",
          description: `${successCount} user(s) updated to instructor role.`,
          variant: "default",
        })
      }

      if (errorCount > 0) {
        toast({
          title: "Warning",
          description: `${errorCount} user(s) failed to update.`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Batch update error:", error)
      toast({
        title: "Error",
        description: "Failed to update users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Toggle user selection
  const toggleUserSelection = (userId: string, checked: boolean) => {
    setSelectedUsers((prev) => {
      if (checked) {
        return [...prev, userId]
      }
      return prev.filter((id) => id !== userId)
    })
  }

  // Select all users
  const toggleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? users.map((user) => user._id) : [])
  }

  // Handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value)
    setPage(1) // Reset to first page when filter changes
  }

  // Load users when component mounts or dependencies change
  useEffect(() => {
    if (isOpen) {
      fetchUsers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, page, roleFilter])

  // Reset selections when users change
  useEffect(() => {
    setSelectedUsers([])
  }, [users])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <SheetHeader>
          <SheetTitle>Manage Users</SheetTitle>
          <SheetDescription>Select users to update their role to instructor.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onCheckedChange={(checked) => toggleSelectAll(checked as boolean)}
                  disabled={loading || users.length === 0}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All
                </label>
              </div>

              <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="instructor">Instructors</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={fetchUsers} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                <span className="sr-only">Refresh</span>
              </Button>

              <Button onClick={updateSelectedUsersToInstructor} disabled={selectedUsers.length === 0 || isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Make Instructor{selectedUsers.length > 0 ? ` (${selectedUsers.length})` : ""}
                  </>
                )}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              {error}
              <Button variant="outline" className="mt-2" onClick={fetchUsers}>
                Retry
              </Button>
            </div>
          ) : users.length > 0 ? (
            <div className="max-h-[60vh] overflow-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Current Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Checkbox
                          id={`user-${user._id}`}
                          checked={selectedUsers.includes(user._id)}
                          onCheckedChange={(checked) => toggleUserSelection(user._id, checked as boolean)}
                          disabled={isUpdating || user.role === "instructor"}
                        />
                      </TableCell>
                      <TableCell>{user.name || `User ${user._id.substring(0, 4)}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={user.role === "instructor" ? "text-primary font-medium" : ""}>
                          {user.role}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No users found.</div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

