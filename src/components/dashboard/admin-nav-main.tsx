"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

export function AdminNavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    badge?: string | number
    items?: {
      title: string
      url: string
      isActive?: boolean
      badge?: string | number
    }[]
  }[]
}) {
  // Group items by category for better organization
  const mainItems = items.slice(0, 3) // Dashboard, User Management, Course Management
  const contentItems = items.slice(3, 6) // Content, Analytics, Discussions
  const systemItems = items.slice(6) // Security, Settings

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {mainItems.map((item) =>
            item.items ? (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                  <SidebarMenuButton
  tooltip={item.title}
  isActive={item.isActive}
  className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
>
  {item.icon && <item.icon />}
  <span>{item.title}</span>
  {item.badge && (
    <Badge
      variant="outline"
      className="ml-auto mr-1 bg-[#cfcfcf] dark:bg-[#000] px-1 py-0 text-xs animate-pulse"
    >
      {item.badge}
    </Badge>
  )}
  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
</SidebarMenuButton>

                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                            className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant="outline" className="ml-auto px-1 py-0 text-xs">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={item.isActive}
                  className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto px-1 py-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarMenu>
          {contentItems.map((item) =>
            item.items ? (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto mr-1 px-1 py-0 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                            className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant="outline" className="ml-auto px-1 py-0 text-xs">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={item.isActive}
                  className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto px-1 py-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarMenu>
          {systemItems.map((item) =>
            item.items ? (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto mr-1 px-1 py-0 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                            className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant="outline" className="ml-auto px-1 py-0 text-xs">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={item.isActive}
                  className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent"
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto px-1 py-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}

