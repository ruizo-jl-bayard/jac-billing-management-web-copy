"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { CreditCard, GalleryVerticalEnd, Users } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

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
  const { user } = useAuthenticator((context) => [context.user])
  
  const userData = user ? {
    name: user.signInDetails?.loginId || "User",
    email: user.signInDetails?.loginId || "",
    avatar: "/avatars/admin.jpg",
  } : data.user

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
