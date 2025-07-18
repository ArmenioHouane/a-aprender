"use client"

import React from "react"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  BookOpen,
  BarChart2,
  FileText,
  Settings,
  MessageSquare,
  Shield,
  GalleryVerticalEnd,
  Command,
} from "lucide-react"
import useSWR from "swr"

import { AdminNavMain } from "./admin-nav-main"
import { AdminNavUser } from "./admin-nav-user"
import { AdminTeamSwitcher } from "./admin-team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentPath?: string
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// This is sample data for the admin dashboard
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
      title: "Dashboard",
      url: "/dashboard/admin/home",
      icon: Home,
    },
    {
      title: "User Management",
      url: "/dashboard/admin/users",
      icon: Users,
      badge: "loading...", // Will be replaced with actual data
      items: [
        {
          title: "All users",
          url: "/dashboard/admin/users",
        },
        {
          title: "Students",
          url: "/dashboard/admin/users/students",
        },
        {
          title: "Instructors",
          url: "/dashboard/admin/users/instructors",
        },
        {
          title: "Administrators",
          url: "/dashboard/admin/users/administrators",
        },
      ],
    },
    {
      title: "Course Management",
      url: "/dashboard/admin/courses",
      icon: BookOpen,
      items: [
        {
          title: "All Courses",
          url: "/dashboard/admin/courses/all",
        },
        {
          title: "Categories",
          url: "/dashboard/admin/courses/categories",
        },
        {
          title: "Enrollments",
          url: "/dashboard/admin/courses/enrollments",
          badge: "12",
        },
      ],
    },
    {
      title: "Content",
      url: "/dashboard/admin/content",
      icon: FileText,
      items: [
        {
          title: "All content",
          url: "/dashboard/admin/content/all",
        },
        {
          title: "Lessons",
          url: "/dashboard/admin/content/lessons",
        },
        {
          title: "Resources",
          url: "/dashboard/admin/content/resources",
        },
        {
          title: "Media Library",
          url: "/dashboard/admin/content/media",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/admin/analytics",
      icon: BarChart2,
      items: [
        {
          title: "User Activity",
          url: "/dashboard/admin/analytics/user-activity",
        },
        {
          title: "Course Performance",
          url: "/dashboard/admin/analytics/course-performance",
        },
        {
          title: "Revenue",
          url: "/dashboard/admin/analytics/revenue",
        },
      ],
    },
    {
      title: "Discussions",
      url: "/dashboard/admin/discussions",
      icon: MessageSquare,
      badge: "5",
    },
    {
      title: "Security",
      url: "/dashboard/admin/security",
      icon: Shield,
    },
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function AdminSidebar({ ...props }: AdminSidebarProps) {
  const pathname = usePathname()

  // Fetch user count using SWR
  const { data: userData, error } = useSWR("/api/users?page=1&pageSize=1", fetcher)

  // Create a copy of the navigation data to modify with the fetched user count
  const navMainWithUserCount = React.useMemo(() => {
    const navCopy = [...data.navMain]

    // Find the User Management item and update its badge
    const userManagementIndex = navCopy.findIndex((item) => item.title === "User Management")

    if (userManagementIndex !== -1) {
      if (error) {
        navCopy[userManagementIndex] = {
          ...navCopy[userManagementIndex],
          badge: "Error",
        }
      } else if (!userData) {
        navCopy[userManagementIndex] = {
          ...navCopy[userManagementIndex],
          badge: "...",
        }
      } else {
        // Assuming the API returns a total count in the response
        navCopy[userManagementIndex] = {
          ...navCopy[userManagementIndex],
          badge: userData.total?.toString() || userData.count?.toString() || "0",
        }
      }
    }

    return navCopy
  }, [userData, error])

  const navItems = React.useMemo(() => {
    return navMainWithUserCount.map((item) => {
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
  }, [pathname, navMainWithUserCount])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AdminTeamSwitcher teams={data.teams} dashboardType="Admin" />
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <AdminNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

