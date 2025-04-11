import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Users,
  Radio,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Trash2,
  CheckCheck,
  Clock,
  BarChart2,
  MessageSquare,
  Music,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Notificações | Rádio Online",
  description: "Gerencie suas notificações e alertas",
}

export default function NotificationsPage() {
  // Dados simulados para notificações
  const notifications = [
    {
      id: 1,
      title: "Pico de audiência detectado",
      message: "Sua transmissão atingiu 350 ouvintes simultâneos às 18:30.",
      time: "Hoje, 18:45",
      type: "audience",
      read: false,
      priority: "medium",
    },
    {
      id: 2,
      title: "Programa agendado em 15 minutos",
      message: "O programa 'Tarde Especial' começará em 15 minutos.",
      time: "Hoje, 13:45",
      type: "schedule",
      read: false,
      priority: "high",
    },
    {
      id: 3,
      title: "Nova mensagem de ouvinte",
      message: "Maria Silva enviou uma mensagem: 'Adoro essa música! Podem tocar mais desse artista?'",
      time: "Hoje, 12:30",
      type: "message",
      read: true,
      priority: "medium",
    },
    {
      id: 4,
      title: "Alerta de sistema",
      message: "Detectamos uma queda momentânea na qualidade da transmissão. O problema foi resolvido automaticamente.",
      time: "Hoje, 11:15",
      type: "system",
      read: true,
      priority: "high",
    },
    {
      id: 5,
      title: "Música mais pedida",
      message: "'Summer Vibes' de DJ Sunshine foi a música mais pedida hoje.",
      time: "Hoje, 10:00",
      type: "content",
      read: true,
      priority: "low",
    },
    {
      id: 6,
      title: "Transmissão concluída",
      message: "O programa 'Manhã Animada' foi concluído com sucesso. Duração: 3h 00min.",
      time: "Hoje, 09:00",
      type: "broadcast",
      read: true,
      priority: "medium",
    },
    {
      id: 7,
      title: "Novo ouvinte registrado",
      message: "João Santos se registrou como ouvinte da sua rádio.",
      time: "Ontem, 15:20",
      type: "audience",
      read: true,
      priority: "low",
    },
    {
      id: 8,
      title: "Atualização de sistema disponível",
      message:
        "Uma nova atualização do sistema está disponível. Recomendamos instalar para obter as últimas melhorias.",
      time: "Ontem, 14:00",
      type: "system",
      read: true,
      priority: "medium",
    },
    {
      id: 9,
      title: "Relatório semanal gerado",
      message: "O relatório semanal de audiência está disponível para visualização.",
      time: "Ontem, 09:00",
      type: "analytics",
      read: true,
      priority: "medium",
    },
    {
      id: 10,
      title: "Problema de conexão resolvido",
      message: "O problema de conexão com o servidor de streaming foi resolvido.",
      time: "15/03/2025, 16:30",
      type: "system",
      read: true,
      priority: "high",
    },
  ]

  // Função para renderizar o ícone baseado no tipo de notificação
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "audience":
        return <Users className="h-5 w-5 text-blue-500" />
      case "schedule":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "system":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "content":
        return <Music className="h-5 w-5 text-yellow-500" />
      case "broadcast":
        return <Radio className="h-5 w-5 text-indigo-500" />
      case "analytics":
        return <BarChart2 className="h-5 w-5 text-cyan-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  // Função para renderizar o badge de prioridade
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge variant="default">Média</Badge>
      case "low":
        return <Badge variant="outline">Baixa</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Notificações" text="Gerencie suas notificações e alertas.">
        <Button variant="outline">
          <CheckCheck className="mr-2 h-4 w-4" />
          Marcar Todas como Lidas
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            <Bell className="mr-2 h-4 w-4" />
            Todas
          </TabsTrigger>
          <TabsTrigger value="unread">
            <Info className="mr-2 h-4 w-4" />
            Não Lidas
          </TabsTrigger>
          <TabsTrigger value="system">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="audience">
            <Users className="mr-2 h-4 w-4" />
            Audiência
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Todas as Notificações</CardTitle>
                <Badge variant="outline">{notifications.filter((n) => !n.read).length} não lidas</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-muted/50 ${!notification.read ? "bg-muted/30" : ""}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{notification.title}</div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                            {getPriorityBadge(notification.priority)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {notification.time}
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Marcar como lida
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive">
                              <Trash2 className="mr-1 h-3 w-3" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações Não Lidas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {notifications.filter((n) => !n.read).length > 0 ? (
                  notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div key={notification.id} className="p-4 border-b hover:bg-muted/50 bg-muted/30">
                        <div className="flex items-start space-x-4">
                          <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="font-medium">{notification.title}</div>
                              <div className="flex items-center space-x-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {notification.time}
                              </div>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Marcar como lida
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive">
                                  <Trash2 className="mr-1 h-3 w-3" />
                                  Excluir
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <CheckCheck className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhuma notificação não lida</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Você está em dia com todas as suas notificações.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {notifications
                  .filter((n) => n.type === "system")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-muted/50 ${!notification.read ? "bg-muted/30" : ""}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{notification.title}</div>
                            <div className="flex items-center space-x-2">
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                              {getPriorityBadge(notification.priority)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {notification.time}
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Marcar como lida
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive">
                                <Trash2 className="mr-1 h-3 w-3" />
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações de Audiência</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {notifications
                  .filter((n) => n.type === "audience")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-muted/50 ${!notification.read ? "bg-muted/30" : ""}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{notification.title}</div>
                            <div className="flex items-center space-x-2">
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                              {getPriorityBadge(notification.priority)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {notification.time}
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Marcar como lida
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive">
                                <Trash2 className="mr-1 h-3 w-3" />
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Tipos de Notificações</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <div>
                          <Label htmlFor="notify-audience">Notificações de Audiência</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba alertas sobre picos de audiência e novos ouvintes
                          </p>
                        </div>
                      </div>
                      <Switch id="notify-audience" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-green-500" />
                        <div>
                          <Label htmlFor="notify-schedule">Notificações de Agenda</Label>
                          <p className="text-sm text-muted-foreground">Receba lembretes sobre programas agendados</p>
                        </div>
                      </div>
                      <Switch id="notify-schedule" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-purple-500" />
                        <div>
                          <Label htmlFor="notify-messages">Notificações de Mensagens</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba alertas sobre novas mensagens de ouvintes
                          </p>
                        </div>
                      </div>
                      <Switch id="notify-messages" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <Label htmlFor="notify-system">Notificações do Sistema</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba alertas sobre o status do sistema e problemas técnicos
                          </p>
                        </div>
                      </div>
                      <Switch id="notify-system" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Music className="h-5 w-5 text-yellow-500" />
                        <div>
                          <Label htmlFor="notify-content">Notificações de Conteúdo</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba informações sobre músicas populares e conteúdo
                          </p>
                        </div>
                      </div>
                      <Switch id="notify-content" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Radio className="h-5 w-5 text-indigo-500" />
                        <div>
                          <Label htmlFor="notify-broadcast">Notificações de Transmissão</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba alertas sobre o início e fim de transmissões
                          </p>
                        </div>
                      </div>
                      <Switch id="notify-broadcast" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart2 className="h-5 w-5 text-cyan-500" />
                        <div>
                          <Label htmlFor="notify-analytics">Notificações de Análises</Label>
                          <p className="text-sm text-muted-foreground">Receba relatórios e estatísticas periódicas</p>
                        </div>
                      </div>
                      <Switch id="notify-analytics" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Preferências de Entrega</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-app">Notificações no Aplicativo</Label>
                        <p className="text-sm text-muted-foreground">Receba notificações dentro do dashboard</p>
                      </div>
                      <Switch id="notify-app" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-email">Notificações por Email</Label>
                        <p className="text-sm text-muted-foreground">Receba notificações importantes por email</p>
                      </div>
                      <Switch id="notify-email" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-push">Notificações Push</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações push no seu dispositivo móvel
                        </p>
                      </div>
                      <Switch id="notify-push" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Configurações Avançadas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-priority">Apenas Notificações Prioritárias</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba apenas notificações marcadas como alta prioridade
                        </p>
                      </div>
                      <Switch id="notify-priority" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-quiet">Modo Silencioso</Label>
                        <p className="text-sm text-muted-foreground">Desative sons e vibrações para notificações</p>
                      </div>
                      <Switch id="notify-quiet" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-summary">Resumo Diário</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba um resumo diário de todas as notificações
                        </p>
                      </div>
                      <Switch id="notify-summary" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Salvar Configurações</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

