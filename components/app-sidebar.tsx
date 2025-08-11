"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useAuthenticator } from "@aws-amplify/ui-react"
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
    },
    {
      title: "外国人就労者検索",
      url: "/foreign-worker",
      icon: Users,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user } = useAuthenticator()
  
  const userData = {
    name: user?.signInDetails?.loginId?.split('@')[0] || "User",
    email: user?.signInDetails?.loginId || "user@jac.com",
    avatar: "/avatars/admin.jpg",
  }
  
  const navMainWithActiveState = data.navMain.map(item => ({
    ...item,
    isActive: pathname === item.url
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActiveState} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
