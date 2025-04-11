import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  Clock,
  Download,
  Filter,
  Music,
  Radio,
  Search,
  User,
  Play,
  Mic,
  Calendar,
  BarChart2,
  Users,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { LineChart } from "@/components/ui/chart"

export const metadata: Metadata = {
  title: "Histórico | Rádio Online",
  description: "Histórico de transmissões e reproduções da sua rádio",
}

export default function HistoryPage() {
  // Dados simulados para o histórico de reprodução
  const playbackHistory = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Sunshine",
      album: "Summer Hits 2023",
      duration: "3:42",
      playedAt: "Hoje, 10:15",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 2,
      title: "Night Groove",
      artist: "Midnight Express",
      album: "Night Sessions",
      duration: "4:15",
      playedAt: "Hoje, 10:11",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 3,
      title: "Vinheta - Abertura",
      artist: "RadioHub",
      album: "Vinhetas 2025",
      duration: "0:15",
      playedAt: "Hoje, 10:07",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 4,
      title: "Chill Wave",
      artist: "Ocean Sounds",
      album: "Relaxation",
      duration: "3:28",
      playedAt: "Hoje, 10:03",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 5,
      title: "Dance Floor",
      artist: "Club Kings",
      album: "Party Time",
      duration: "5:12",
      playedAt: "Hoje, 09:58",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 6,
      title: "Comercial - Supermercado Economia",
      artist: "RadioHub",
      album: "Comerciais 2025",
      duration: "0:30",
      playedAt: "Hoje, 09:57",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 7,
      title: "Sunset Dreams",
      artist: "Horizon",
      album: "Chill Out",
      duration: "4:05",
      playedAt: "Hoje, 09:53",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 8,
      title: "Urban Beats",
      artist: "City Pulse",
      album: "Downtown",
      duration: "3:55",
      playedAt: "Hoje, 09:49",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 9,
      title: "Vinheta - Hora Certa",
      artist: "RadioHub",
      album: "Vinhetas 2025",
      duration: "0:10",
      playedAt: "Hoje, 09:45",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
    {
      id: 10,
      title: "Smooth Jazz",
      artist: "Night Owls",
      album: "Midnight Jazz",
      duration: "6:22",
      playedAt: "Hoje, 09:39",
      program: "Manhã Animada",
      host: "Carlos Silva",
    },
  ]

  // Dados simulados para o histórico de transmissões
  const broadcastHistory = [
    {
      id: 1,
      program: "Manhã Animada",
      host: "Carlos Silva",
      date: "20/03/2025",
      startTime: "06:00",
      endTime: "09:00",
      duration: "3h 00min",
      listeners: 320,
      status: "Concluído",
    },
    {
      id: 2,
      program: "Notícias da Manhã",
      host: "Ana Oliveira",
      date: "20/03/2025",
      startTime: "09:00",
      endTime: "12:00",
      duration: "3h 00min",
      listeners: 280,
      status: "Concluído",
    },
    {
      id: 3,
      program: "Pausa para o Almoço",
      host: "Roberto Santos",
      date: "20/03/2025",
      startTime: "12:00",
      endTime: "14:00",
      duration: "2h 00min",
      listeners: 250,
      status: "Concluído",
    },
    {
      id: 4,
      program: "Tarde Especial",
      host: "Juliana Costa",
      date: "20/03/2025",
      startTime: "14:00",
      endTime: "17:00",
      duration: "3h 00min",
      listeners: 290,
      status: "Concluído",
    },
    {
      id: 5,
      program: "Rush Hour",
      host: "Marcos Pereira",
      date: "20/03/2025",
      startTime: "17:00",
      endTime: "19:00",
      duration: "2h 00min",
      listeners: 350,
      status: "Concluído",
    },
    {
      id: 6,
      program: "Noite de Flashback",
      host: "Patrícia Lima",
      date: "20/03/2025",
      startTime: "19:00",
      endTime: "22:00",
      duration: "3h 00min",
      listeners: 310,
      status: "Concluído",
    },
    {
      id: 7,
      program: "Manhã Animada",
      host: "Carlos Silva",
      date: "19/03/2025",
      startTime: "06:00",
      endTime: "09:00",
      duration: "3h 00min",
      listeners: 305,
      status: "Concluído",
    },
    {
      id: 8,
      program: "Notícias da Manhã",
      host: "Ana Oliveira",
      date: "19/03/2025",
      startTime: "09:00",
      endTime: "12:00",
      duration: "3h 00min",
      listeners: 275,
      status: "Concluído",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Histórico" text="Histórico de transmissões e reproduções da sua rádio.">
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Music className="mr-2 h-4 w-4 text-muted-foreground" />
              Músicas Reproduzidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-500">+8%</span> em relação à semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Radio className="mr-2 h-4 w-4 text-muted-foreground" />
              Programas Transmitidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Tempo Total no Ar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">168h</div>
            <p className="text-sm text-muted-foreground">100% de cobertura semanal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              Média de Ouvintes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-500">+15%</span> em relação à semana anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Audiência ao Longo do Tempo</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <LineChart
            data={{
              labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
              datasets: [
                {
                  label: "Ouvintes",
                  data: [120, 90, 180, 270, 220, 190, 350, 280],
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
                    text: "Hora do Dia",
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="playback" className="space-y-4">
        <TabsList>
          <TabsTrigger value="playback">
            <Music className="mr-2 h-4 w-4" />
            Histórico de Reprodução
          </TabsTrigger>
          <TabsTrigger value="broadcasts">
            <Radio className="mr-2 h-4 w-4" />
            Histórico de Transmissões
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="mr-2 h-4 w-4" />
            Análises
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playback" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold">Histórico de Reprodução</h2>
              <Badge variant="outline">Últimas 24 horas</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar música ou artista..." className="w-[250px] pl-8" />
              </div>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-[1fr_1fr_120px_120px_150px] font-medium p-3 border-b">
                <div>Título / Artista</div>
                <div>Álbum</div>
                <div>Duração</div>
                <div>Reproduzido</div>
                <div>Programa</div>
              </div>
              <ScrollArea className="h-[500px]">
                {playbackHistory.map((track) => (
                  <div
                    key={track.id}
                    className="grid grid-cols-[1fr_1fr_120px_120px_150px] p-3 border-b hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                      <div>
                        <div className="font-medium">{track.title}</div>
                        <div className="text-sm text-muted-foreground">{track.artist}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm">{track.album}</div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        {track.duration}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm">{track.playedAt}</div>
                    </div>

                    <div className="flex items-center">
                      <Badge variant="outline" className="flex items-center">
                        <Mic className="mr-1 h-3 w-3" />
                        {track.program}
                      </Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcasts" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold">Histórico de Transmissões</h2>
              <Badge variant="outline">Últimos 7 dias</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Selecionar Data
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-[1fr_150px_120px_120px_120px_120px_100px] font-medium p-3 border-b">
                <div>Programa</div>
                <div>Apresentador</div>
                <div>Data</div>
                <div>Horário</div>
                <div>Duração</div>
                <div>Ouvintes</div>
                <div>Status</div>
              </div>
              <ScrollArea className="h-[500px]">
                {broadcastHistory.map((broadcast) => (
                  <div
                    key={broadcast.id}
                    className="grid grid-cols-[1fr_150px_120px_120px_120px_120px_100px] p-3 border-b hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Radio className="h-4 w-4 text-primary" />
                      <div className="font-medium">{broadcast.program}</div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm flex items-center">
                        <User className="mr-1 h-3 w-3 text-muted-foreground" />
                        {broadcast.host}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                        {broadcast.date}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm">
                        {broadcast.startTime} - {broadcast.endTime}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm">{broadcast.duration}</div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-sm flex items-center">
                        <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                        {broadcast.listeners}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Badge variant={broadcast.status === "Concluído" ? "outline" : "default"}>
                        {broadcast.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Histórico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Músicas Mais Tocadas</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Summer Vibes", artist: "DJ Sunshine", count: 42 },
                      { title: "Night Groove", artist: "Midnight Express", count: 38 },
                      { title: "Chill Wave", artist: "Ocean Sounds", count: 35 },
                      { title: "Dance Floor", artist: "Club Kings", count: 30 },
                      { title: "Sunset Dreams", artist: "Horizon", count: 28 },
                    ].map((song, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{song.title}</div>
                          <div className="text-sm text-muted-foreground">{song.artist}</div>
                        </div>
                        <Badge variant="outline">{song.count} vezes</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Programas Mais Populares</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Manhã Animada", host: "Carlos Silva", listeners: 320 },
                      { name: "Noite de Flashback", host: "Patrícia Lima", listeners: 310 },
                      { name: "Rush Hour", host: "Marcos Pereira", listeners: 350 },
                      { name: "Tarde Especial", host: "Juliana Costa", listeners: 290 },
                      { name: "Notícias da Manhã", host: "Ana Oliveira", listeners: 280 },
                    ].map((program, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{program.name}</div>
                          <div className="text-sm text-muted-foreground">{program.host}</div>
                        </div>
                        <Badge variant="outline">{program.listeners} ouvintes</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Horários de Maior Audiência</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { day: "Segunda a Sexta", time: "08:00 - 10:00", listeners: 320 },
                    { day: "Segunda a Sexta", time: "17:00 - 19:00", listeners: 350 },
                    { day: "Fim de Semana", time: "10:00 - 12:00", listeners: 280 },
                  ].map((peak, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="font-medium">{peak.time}</div>
                        <div className="text-sm text-muted-foreground">{peak.day}</div>
                        <div className="mt-2 flex items-center">
                          <Users className="h-4 w-4 text-primary mr-2" />
                          <span>{peak.listeners} ouvintes em média</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

