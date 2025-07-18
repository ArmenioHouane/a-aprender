"use client"

import { BadgeCheck, Bell, Moon, Laptop, CircleCheck, Sun, ChevronsUpDown, LogOut, Shield } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export function AdminNavUser() {
  const { isMobile } = useSidebar()
  const { user } = useAuth()
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const [apiTheme, setApiTheme] = useState<string | null>(null)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  useEffect(() => {
    if (user) {
      // Admin-specific user data loading could go here
    }
  }, [user])

  useEffect(() => {
    const fetchTheme = async () => {
      const response = await fetch("/api/theme?theme=" + resolvedTheme)
      const data = await response.json()
      setApiTheme(data.theme)
    }

    fetchTheme()
  }, [resolvedTheme])

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" })
    if (response.ok) {
      router.push("/") // Redirect to login page after logout
    }
  }

  useEffect(() => {
    if (isLogoutDialogOpen) {
      document.body.style.pointerEvents = "auto"
    } else {
      document.body.style.pointerEvents = "auto"
    }

    return () => {
      document.body.style.pointerEvents = "auto"
    }
  }, [isLogoutDialogOpen])

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar || "#"} alt={`${user?.name}'s avatar`} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <p className="text-sm font-medium leading-none">{user?.name || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || "#"} alt={`${user?.name}'s avatar`} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <p className="text-sm font-medium leading-none">{user?.name || "Admin"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || "admin@example.com"}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin/settings/account">
                    <BadgeCheck className="mr-2" />
                    Admin Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin/settings/security">
                    <Shield className="mr-2" />
                    Security Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin/settings/notifications">
                    <Bell className="mr-2" />
                    Notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Color Mode</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center cursor-pointer">
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                    {apiTheme === "system" && <CircleCheck className="ml-auto h-4 w-4 text-green-500" />}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="flex items-center cursor-pointer hover:bg-slate-800 hover:text-slate-100"
                  >
                    <Moon className="mr-2 h-4 w-4 text-gray-900" />
                    <span>Dark</span>
                    {apiTheme === "dark" && <CircleCheck className="ml-auto h-4 w-4 text-green-500" />}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="flex items-center cursor-pointer hover:bg-[#e2e1e1] dark:hover:bg-[#262626] dark:hover:text-black"
                  >
                    <Sun className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>Light</span>
                    {apiTheme === "light" && <CircleCheck className="ml-auto h-4 w-4 text-green-500" />}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setIsLogoutDialogOpen(true)}
                className="flex items-center text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog open={isLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of the admin dashboard? You will be redirected to the login page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

