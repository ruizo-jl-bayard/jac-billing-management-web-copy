"use client"

import * as React from "react"
import {
  CreditCard,
  GalleryVerticalEnd,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Admin User",
    email: "admin@jac.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "JAC",
      logo: GalleryVerticalEnd,
      plan: "建設技能人材機構",
    },
  ],
  navMain: [
    {
      title: "支払い状況検索",
      url: "/payment-status",
      icon: CreditCard,
      isActive: true,
    },
    {
      title: "外国人就労者検索",
      url: "/foreign-worker",
      icon: Users,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
