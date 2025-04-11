import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, BarChart, PieChart } from "@/components/ui/chart"
import { Download, Users, Clock, Radio, Globe, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Análise de Audiência | Rádio Online",
  description: "Estatísticas detalhadas sobre sua audiência",
}

export default function AudienceAnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Análise de Audiência" text="Estatísticas detalhadas sobre seus ouvintes e engajamento.">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="geography">Geografia</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Ouvintes Atuais</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  238
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">+12%</span> em relação à média
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pico de Audiência</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  482
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Hoje às 10:15</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tempo Médio de Escuta</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  42 min
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">+8%</span> em relação à semana passada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Taxa de Retenção</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Radio className="mr-2 h-5 w-5 text-primary" />
                  68%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">+5%</span> em relação à média
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Audiência ao Longo do Tempo
                  </CardTitle>
                  <Select defaultValue="week">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Hoje</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={{
                    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                    datasets: [
                      {
                        label: "Ouvintes",
                        data: [120, 190, 230, 180, 250, 320, 280],
                        borderColor: "hsl(var(--primary))",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.2,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                      tooltip: {
                        mode: "index",
                        intersect: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Número de Ouvintes",
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Dia da Semana",
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Radio className="mr-2 h-5 w-5" />
                  Audiência por Programa
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={{
                    labels: ["Manhã Animada", "Tarde Especial", "Noite de Flashback", "Jazz & Blues", "Outros"],
                    datasets: [
                      {
                        data: [32, 25, 18, 15, 10],
                        backgroundColor: [
                          "hsl(var(--primary))",
                          "hsl(var(--primary) / 0.8)",
                          "hsl(var(--primary) / 0.6)",
                          "hsl(var(--primary) / 0.4)",
                          "hsl(var(--primary) / 0.2)",
                        ],
                        borderWidth: 1,
                        borderColor: "hsl(var(--background))",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const dataset = context.dataset
                            const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0)
                            const value = dataset.data[context.dataIndex] as number
                            const percentage = ((value / total) * 100).toFixed(1)
                            return `${context.label}: ${percentage}%`
                          },
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Horários de Pico
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={{
                    labels: ["6h", "8h", "10h", "12h", "14h", "16h", "18h", "20h", "22h", "0h"],
                    datasets: [
                      {
                        label: "Ouvintes",
                        data: [120, 250, 320, 280, 220, 190, 210, 310, 240, 150],
                        backgroundColor: "hsl(var(--primary))",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Número de Ouvintes",
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Hora do Dia",
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Distribuição Geográfica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { city: "São Paulo, SP", listeners: 420, percent: 35 },
                    { city: "Rio de Janeiro, RJ", listeners: 280, percent: 23 },
                    { city: "Belo Horizonte, MG", listeners: 150, percent: 12 },
                    { city: "Brasília, DF", listeners: 120, percent: 10 },
                    { city: "Outros", listeners: 240, percent: 20 },
                  ].map((location, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{location.city}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{location.listeners}</Badge>
                          <span className="text-sm text-muted-foreground">{location.percent}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${location.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Demografia dos Ouvintes</CardTitle>
              <CardDescription>Informações detalhadas sobre a demografia da sua audiência</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80 text-muted-foreground">
                Dados demográficos serão exibidos aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engajamento da Audiência</CardTitle>
              <CardDescription>Métricas de engajamento e interação com sua rádio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80 text-muted-foreground">
                Dados de engajamento serão exibidos aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição Geográfica</CardTitle>
              <CardDescription>Mapa detalhado da distribuição geográfica dos seus ouvintes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80 text-muted-foreground">
                Mapa de distribuição geográfica será exibido aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

