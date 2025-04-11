import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BarChart, PieChart } from "@/components/ui/chart"
import { Download, Music, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Análise de Conteúdo | Rádio Online",
  description: "Estatísticas detalhadas sobre seu conteúdo",
}

export default function ContentAnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Análise de Conteúdo" text="Estatísticas detalhadas sobre o conteúdo da sua rádio.">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="music" className="space-y-4">
        <TabsList>
          <TabsTrigger value="music">Músicas</TabsTrigger>
          <TabsTrigger value="programs">Programas</TabsTrigger>
          <TabsTrigger value="ads">Publicidade</TabsTrigger>
        </TabsList>

        <TabsContent value="music" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Músicas Tocadas</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Music className="mr-2 h-5 w-5 text-primary" />
                  1,248
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">+8%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Gêneros Mais Tocados</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Music className="mr-2 h-5 w-5 text-primary" />
                  Pop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">32% do total de reproduções</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Artista Mais Tocado</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Music className="mr-2 h-5 w-5 text-primary" />
                  DJ Sunshine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">42 reproduções este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Música Mais Tocada</CardDescription>
                <CardTitle className="text-xl flex items-center">
                  <Music className="mr-2 h-5 w-5 text-primary" />
                  Summer Vibes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">28 reproduções este mês</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Music className="mr-2 h-5 w-5" />
                    Distribuição por Gênero
                  </CardTitle>
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mês</SelectItem>
                      <SelectItem value="year">Este ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={{
                    labels: ["Pop", "Rock", "Eletrônica", "Hip Hop", "Jazz", "Outros"],
                    datasets: [
                      {
                        data: [32, 25, 18, 12, 8, 5],
                        backgroundColor: [
                          "hsl(var(--primary))",
                          "hsl(var(--primary) / 0.8)",
                          "hsl(var(--primary) / 0.6)",
                          "hsl(var(--primary) / 0.4)",
                          "hsl(var(--primary) / 0.3)",
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
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Músicas Mais Tocadas
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={{
                    labels: ["Summer Vibes", "Night Groove", "Chill Wave", "Dance Floor", "Sunset Dreams"],
                    datasets: [
                      {
                        label: "Reproduções",
                        data: [28, 24, 20, 18, 15],
                        backgroundColor: "hsl(var(--primary))",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Número de Reproduções",
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Programas</CardTitle>
              <CardDescription>Estatísticas detalhadas sobre os programas da sua rádio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80 text-muted-foreground">
                Dados de programas serão exibidos aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Publicidade</CardTitle>
              <CardDescription>Estatísticas detalhadas sobre as inserções publicitárias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80 text-muted-foreground">
                Dados de publicidade serão exibidos aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

