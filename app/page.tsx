import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mic, Radio, Users, BarChart2, Calendar, Clock, Music, Play, Settings } from "lucide-react"
import Link from "next/link"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { OfflineIndicator } from "@/components/offline-indicator"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Bem-vindo ao seu painel de controle da rádio online.">
        <div className="flex space-x-2">
          <Button asChild>
            <Link href="/studio/live">
              <Mic className="mr-2 h-4 w-4" />
              Iniciar Transmissão
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ouvintes Atuais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Nenhuma transmissão ativa</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programas Hoje</CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Próximo: <span className="font-medium">Manhã Animada</span> às 06:00
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Músicas na Biblioteca</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+12 adicionadas esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inserções Publicitárias</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">8 programadas para hoje</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 mt-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="schedule">Agenda</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Programas</CardTitle>
                <CardDescription>Programas agendados para hoje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { time: "06:00", title: "Manhã Animada", host: "Carlos Silva", duration: "3h" },
                  { time: "09:00", title: "Notícias da Manhã", host: "Ana Oliveira", duration: "3h" },
                  { time: "12:00", title: "Pausa para o Almoço", host: "Roberto Santos", duration: "2h" },
                  { time: "14:00", title: "Tarde Especial", host: "Juliana Costa", duration: "3h" },
                ].map((program, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {program.time}
                      </Badge>
                      <div>
                        <div className="font-medium">{program.title}</div>
                        <div className="text-sm text-muted-foreground">{program.host}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary">{program.duration}</Badge>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas atividades na sua rádio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { time: "Hoje, 10:15", action: "Transmissão encerrada", details: "Duração: 2h 15min", icon: Radio },
                  {
                    time: "Hoje, 09:30",
                    action: "Música adicionada",
                    details: "Summer Vibes - DJ Sunshine",
                    icon: Music,
                  },
                  {
                    time: "Hoje, 08:45",
                    action: "Programa agendado",
                    details: "Especial de Domingo - 18:00",
                    icon: Calendar,
                  },
                  {
                    time: "Ontem, 16:20",
                    action: "Configurações atualizadas",
                    details: "Qualidade de transmissão alterada",
                    icon: Settings,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 border-b pb-2 last:border-0 last:pb-0">
                    <div className="mt-0.5">
                      <activity.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.details}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agenda Semanal</CardTitle>
              <CardDescription>Visão geral da programação desta semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Visualize sua agenda completa</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Acesse a página de agenda para ver todos os detalhes da programação
                </p>
                <Button asChild>
                  <Link href="/schedule/agenda">Ver Agenda Completa</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises de Audiência</CardTitle>
              <CardDescription>Estatísticas de audiência da sua rádio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <BarChart2 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Visualize estatísticas detalhadas</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Acesse a página de análises para ver estatísticas completas
                </p>
                <Button asChild>
                  <Link href="/analytics/audience">Ver Análises Completas</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PWAInstallPrompt />
      <OfflineIndicator />
    </DashboardShell>
  )
}

