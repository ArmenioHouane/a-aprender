"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Home, GraduationCap, MessageSquare, Settings, Users, ClipboardList, BookOpen } from 'lucide-react'
import { GalleryVerticalEnd, Command } from 'lucide-react'
import { BarChart, DollarSign, Wallet } from 'lucide-react'

import { InstructorNavMain } from "./instructor-nav-main"
import { InstructorNavUser } from "./instructor-nav-user"
import { InstructorTeamSwitcher } from "./instructor-team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

interface InstructorAppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentPath?: string
}

// This is sample data for the instructor dashboard
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
      url: "/dashboard/instructor/home",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/dashboard/instructor/courses",
      icon: GraduationCap,
      items: [
        {
          title: "Manage Courses",
          url: "/dashboard/instructor/courses/manage",
        },
        {
          title: "Create Course",
          url: "/dashboard/instructor/courses/create",
        },
        {
          title: "Course Analytics",
          url: "/dashboard/instructor/courses/analytics",
        },
      ],
    },
    {
      title: "Students",
      url: "/dashboard/instructor/students",
      icon: Users,
      items: [
        {
          title: "Student List",
          url: "/dashboard/instructor/students/list",
        },
        {
          title: "Student Progress",
          url: "/dashboard/instructor/students/progress",
        },
        {
          title: "Enrollment Management",
          url: "/dashboard/instructor/students/enrollment",
        },
      ],
    },
    {
      title: "Lessons",
      url: "/dashboard/instructor/lessons",
      icon: BookOpen,
      items: [
        {
          title: "Create Lesson",
          url: "/dashboard/instructor/lessons/create",
        },
        {
          title: "Manage Lessons",
          url: "/dashboard/instructor/lessons/manage",
        },
      ],
    },
    {
      title: "Assignments",
      url: "/dashboard/instructor/assignments",
      icon: ClipboardList,
      items: [
        {
          title: "Create Assignment",
          url: "/dashboard/instructor/assignments/create",
        },
        {
          title: "Grade Assignments",
          url: "/dashboard/instructor/assignments/grade",
        },
        {
          title: "Assignment Analytics",
          url: "/dashboard/instructor/assignments/analytics",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/instructor/analytics",
      icon: BarChart,
      items: [
        {
          title: "Overview",
          url: "/dashboard/instructor/analytics/overview",
        },
        {
          title: "Student Engagement",
          url: "/dashboard/instructor/analytics/engagement",
        },
        {
          title: "Course Performance",
          url: "/dashboard/instructor/analytics/performance",
        },
      ],
    },
    {
      title: "Revenue",
      url: "/dashboard/instructor/revenue",
      icon: DollarSign,
      items: [
        {
          title: "Sales Overview",
          url: "/dashboard/instructor/revenue/overview",
        },
        {
          title: "Transactions",
          url: "/dashboard/instructor/revenue/transactions",
        },
        {
          title: "Payouts",
          url: "/dashboard/instructor/revenue/payouts",
        },
      ],
    },
    {
      title: "Finances",
      url: "/dashboard/instructor/finances",
      icon: Wallet,
      items: [
        {
          title: "Billing",
          url: "/dashboard/instructor/finances/billing",
        },
        {
          title: "Payment Methods",
          url: "/dashboard/instructor/finances/payment-methods",
        },
        {
          title: "Tax Information",
          url: "/dashboard/instructor/finances/tax-info",
        },
      ],
    },
    {
      title: "Discussions",
      url: "/dashboard/instructor/discussions",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      url: "/dashboard/instructor/settings",
      icon: Settings,
    },
  ],
}

export function InstructorAppSidebar({ ...props }: InstructorAppSidebarProps) {
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <InstructorTeamSwitcher teams={data.teams} dashboardType="Instructor" />
      </SidebarHeader>
      <SidebarContent>
        <InstructorNavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <InstructorNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
