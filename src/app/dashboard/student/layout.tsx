import type React from "react"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white dark:bg-[#0A0A0A] px-4 md:px-6">
            <SidebarTrigger />
          </header>
          <main className="flex-1 w-full">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

