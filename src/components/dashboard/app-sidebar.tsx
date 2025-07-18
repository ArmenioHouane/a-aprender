"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Home, GraduationCap, MessageSquare, Settings } from "lucide-react"
import { GalleryVerticalEnd, Command } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentPath?: string
}

// This is sample data.
const data = {
  
  teams: [
    {
      name: "A-aprender",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Aprender Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard/student/home",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/dashboard/student/courses",
      icon: GraduationCap,
      items: [
        {
          title: "Lessons",
          url: "/dashboard/student/courses/lessons",
        },
        {
          title: "Learning Progress",
          url: "/dashboard/student/courses/progress",
        },
        {
          title: "Assignments",
          url: "/dashboard/student/courses/assignments",
        },
      ],
    },
    {
      title: "Discussions",
      url: "/dashboard/student/discussions",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      url: "/dashboard/student/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: AppSidebarProps) {
 

  const pathname = usePathname()

  const navItems = React.useMemo(() => {
    return data.navMain.map((item) => {
      // Ensure we have valid URLs to compare
      const itemUrl = item.url || ""

      // Simple check if current path matches or starts with the item URL
      const isItemActive = pathname === itemUrl || (itemUrl !== "#" && pathname.startsWith(itemUrl))

      // Check if any subitem is active
      const hasActiveSubItem =
        item.items?.some((subItem) => {
          const subItemUrl = subItem.url || ""
          return pathname === subItemUrl || (subItemUrl !== "#" && pathname.startsWith(subItemUrl))
        }) || false

      return {
        ...item,
        isActive: isItemActive || hasActiveSubItem,
        items: item.items?.map((subItem) => {
          const subItemUrl = subItem.url || ""
          const isSubItemActive = pathname === subItemUrl || (subItemUrl !== "#" && pathname.startsWith(subItemUrl))

          return {
            ...subItem,
            isActive: isSubItemActive,
          }
        }),
      }
    })
  }, [pathname])

  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader >
        <TeamSwitcher teams={data.teams} dashboardType="Student" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

