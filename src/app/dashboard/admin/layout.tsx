"use client"

import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/dashboard/admin-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode
}) {

  // Check permissions before rendering
 // Prevent flickering while loading user data

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <AdminSidebar />
        <SidebarInset className="flex flex-1 flex-col min-w-0">
          <header className="z-10 fixed  h-16 w-full border-b bg-white dark:bg-[#0A0A0A] px-4 md:px-6">
            <div className="flex items-center  h-full">
              <SidebarTrigger />
            </div>
          </header>

          {/* Scrollable area */}
          <div className="flex-1  overflow-auto">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
