"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeSwitcher } from "@/components/theme-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Radio,
  LayoutDashboard,
  Calendar,
  BarChart2,
  Settings,
  Users,
  MessageSquare,
  Mic,
  Library,
  Clock,
  Bell,
  HelpCircle,
  LogOut,
  Database,
} from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="sidebar colorful:border-r-0">
      <SidebarHeader className="border-b colorful:border-sidebar-accent/30">
        <div className="flex items-center space-x-2 px-4 py-2">
          <Radio className="h-6 w-6 text-primary colorful:text-accent" />
          <span className="font-bold text-xl colorful:bg-gradient-to-r colorful:from-primary colorful:to-accent colorful:bg-clip-text colorful:text-transparent">
            RadioHub
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"}>
                <Link href="/">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/studio/live"}>
                <Link href="/studio/live">
                  <Mic className="h-4 w-4" />
                  <span>Estúdio ao Vivo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/schedule")}>
                <Link href="/schedule">
                  <Calendar className="h-4 w-4" />
                  <span>Agenda</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/schedule/agenda"}>
                    <Link href="/schedule/agenda">Programação</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/schedule/advertising"}>
                    <Link href="/schedule/advertising">Inserções Publicitárias</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/schedule/calendar"}>
                    <Link href="/schedule/calendar">Calendário</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/library")}>
                <Link href="/library">
                  <Library className="h-4 w-4" />
                  <span>Biblioteca</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/library/music"}>
                    <Link href="/library/music">Músicas</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/library/playlists"}>
                    <Link href="/library/playlists">Playlists</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/library/effects"}>
                    <Link href="/library/effects">Efeitos Sonoros</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/analytics")}>
                <Link href="/analytics">
                  <BarChart2 className="h-4 w-4" />
                  <span>Análises</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/analytics/audience"}>
                    <Link href="/analytics/audience">Audiência</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/analytics/content"}>
                    <Link href="/analytics/content">Conteúdo</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/analytics/performance"}>
                    <Link href="/analytics/performance">Desempenho</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/audience"}>
                <Link href="/audience">
                  <Users className="h-4 w-4" />
                  <span>Ouvintes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/messages"}>
                <Link href="/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span>Mensagens</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/history"}>
                <Link href="/history">
                  <Clock className="h-4 w-4" />
                  <span>Histórico</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/notifications"}>
                <Link href="/notifications">
                  <Bell className="h-4 w-4" />
                  <span>Notificações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Novo item para o Gerenciador Offline */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/offline-manager"}>
                <Link href="/offline-manager">
                  <Database className="h-4 w-4" />
                  <span>Modo Offline</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/settings")}>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 colorful:border-sidebar-accent/30">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between mb-2">
            <Button variant="outline" size="sm" className="justify-start colorful:border-sidebar-accent/30">
              <HelpCircle className="mr-2 h-4 w-4" />
              Ajuda e Suporte
            </Button>
            <ThemeSwitcher />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-muted-foreground colorful:text-sidebar-foreground/80 colorful:hover:text-sidebar-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

