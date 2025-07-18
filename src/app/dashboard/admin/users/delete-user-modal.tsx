import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { User } from "./page"

interface DeleteUserModalProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: (id: string) => Promise<void>
}

export function DeleteUserModal({ user, open, onOpenChange, onDelete }: DeleteUserModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!user) return

    setIsDeleting(true)
    try {
      await onDelete(user._id)
      onOpenChange(false)
    } catch (error) {
      console.error("Error deleting user:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    if (!isDeleting) {
      onOpenChange(false)
    }
  }
//vai funcionar ou sim ou sim
    useEffect(() => {
       if (open) {
         document.body.style.pointerEvents = "auto"; // Desabilita interação com o conteúdo atrás do modal
       } else {
         document.body.style.pointerEvents = "auto"; // Restaura a interação com a página quando o modal fecha
       }
     }, [open])


  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {user && (
          <div className="space-y-4">
            <p>Are you sure you want to delete the user {user.name || user.email}?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
