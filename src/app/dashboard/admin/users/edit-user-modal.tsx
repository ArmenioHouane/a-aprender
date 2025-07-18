"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { User } from "./page"

interface EditUserModalProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (id: string, updatedData: Partial<User>) => Promise<void>
}

export function EditUserModal({ user, open, onOpenChange, onUpdate }: EditUserModalProps) {
  const [editedUser, setEditedUser] = useState<User | null>(user)
  const [isUpdating, setIsUpdating] = useState(false)

  // Sincroniza o estado de editedUser com a prop user
  useEffect(() => {
    setEditedUser(user)
  }, [user])

  useEffect(() => {
    if (open) {
      document.body.style.pointerEvents = "auto" // Desabilita interação com o conteúdo atrás do modal
    } else {
      document.body.style.pointerEvents = "auto" // Restaura a interação com a página quando o modal fecha
    }
  }, [open]) // Executa sempre que o estado 'open' mudar (modal abrir/fechar)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editedUser) return

    setIsUpdating(true)
    try {
      await onUpdate(editedUser._id, editedUser)
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating user:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleClose = () => {
    if (!isUpdating) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        {editedUser && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedUser.name || ""}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={editedUser.country || ""}
                onChange={(e) => setEditedUser({ ...editedUser, country: e.target.value })}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={editedUser.phoneNumber || ""}
                onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
              />
            </div>

            {/* New subscription field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subscription">Subscription</Label>
              <Select
                value={editedUser.subscription || "Free"}
                onValueChange={(value) =>
                  setEditedUser({ ...editedUser, subscription: value as "Free" | "Paid" | "Creator" })
                }
              >
                <SelectTrigger id="subscription">
                  <SelectValue placeholder="Select subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Creator">Creator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* New accessLevel field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="accessLevel">Access Level</Label>
              <Select
                value={editedUser.accessLevel || "Basic"}
                onValueChange={(value) =>
                  setEditedUser({ ...editedUser, accessLevel: value as "Basic" | "Limited" | "Full" })
                }
              >
                <SelectTrigger id="accessLevel">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Limited">Limited</SelectItem>
                  <SelectItem value="Full">Full</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* New role field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="role">Role</Label>
              <Select
                value={editedUser.role || "user"}
                onValueChange={(value) => setEditedUser({ ...editedUser, role: value as "admin"|"instructor" | "student" | "guest" })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="flex justify-between items-center pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isUpdating}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update User"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

