import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart } from "@/components/ui/chart"
import { Download, Server, Clock, Activity } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Análise de Desempenho | Rádio Online",
  description: "Estatísticas detalhadas sobre o desempenho do sistema",
}

export default function PerformanceAnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Análise de Desempenho" text="Estatísticas detalhadas sobre o desempenho do sistema.">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="system" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="network">Rede</TabsTrigger>
          <TabsTrigger value="stream">Transmissão</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Uso de CPU</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  24%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={24} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">Carga normal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Uso de Memória</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Server className="mr-2 h-5 w-5 text-primary" />
                  42%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={42} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">2.1 GB / 5 GB</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Uso de Disco</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Server className="mr-2 h-5 w-5 text-primary" />
                  68%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={68} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">34 GB / 50 GB</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tempo de Atividade</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  15d 8h
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Desde 05/03/2025 10:15</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Uso de CPU ao Longo do Tempo
                  </CardTitle>
                  <Select defaultValue="day">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hour">Última hora</SelectItem>
                      <SelectItem value="day">Último dia</SelectItem>
                      <SelectItem value="week">Última semana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={{
                    labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
                    datasets: [
                      {
                        label: "Uso de CPU (%)",
                        data: [15, 18, 22, 35, 28, 22, 20, 24],
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
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: "Uso de CPU (%)",
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
                  <Server className="mr-2 h-5 w-5" />
                  Uso de Memória ao Longo do Tempo
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={{
                    labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
                    datasets: [
                      {
                        label: "Uso de Memória (%)",
                        data: [30, 35, 38, 45, 50, 48, 42, 42],
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
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: "Uso de Memória (%)",
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
          </div>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Rede</CardTitle>
              <CardDescription>Estatísticas detalhadas sobre o desempenho da rede</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80 text-muted-foreground">
                Dados de rede serão exibidos aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stream">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Transmissão</CardTitle>
              <CardDescription>Estatísticas detalhadas sobre a qualidade da transmissão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80 text-muted-foreground">
                Dados de transmissão serão exibidos aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

