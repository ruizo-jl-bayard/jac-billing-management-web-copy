export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Team {
  id: string
  name: string
  logo: string
  plan: string
}

export interface NavigationItem {
  title: string
  url: string
  icon?: React.ComponentType
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export interface Project {
  id: string
  name: string
  url: string
  icon: React.ComponentType
}
