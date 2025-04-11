import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, BarChart, PieChart } from "@/components/ui/chart"
import {
  Download,
  Users,
  Clock,
  Radio,
  Globe,
  MapPin,
  MessageSquare,
  Heart,
  UserPlus,
  UserMinus,
  Filter,
  Search,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Ouvintes | Rádio Online",
  description: "Gerencie e analise seus ouvintes",
}

export default function AudiencePage() {
  // Dados simulados para ouvintes ativos
  const activeListeners = [
    { id: 1, name: "Maria Silva", location: "São Paulo, SP", time: "1h 23min", device: "Web", avatar: "MS" },
    { id: 2, name: "João Santos", location: "Rio de Janeiro, RJ", time: "45min", device: "iOS", avatar: "JS" },
    { id: 3, name: "Ana Oliveira", location: "Belo Horizonte, MG", time: "2h 05min", device: "Android", avatar: "AO" },
    { id: 4, name: "Carlos Pereira", location: "Brasília, DF", time: "32min", device: "Web", avatar: "CP" },
    { id: 5, name: "Juliana Costa", location: "Salvador, BA", time: "1h 10min", device: "iOS", avatar: "JC" },
    { id: 6, name: "Roberto Lima", location: "Recife, PE", time: "28min", device: "Android", avatar: "RL" },
    { id: 7, name: "Fernanda Souza", location: "Porto Alegre, RS", time: "1h 45min", device: "Web", avatar: "FS" },
    { id: 8, name: "Marcelo Santos", location: "Fortaleza, CE", time: "55min", device: "iOS", avatar: "MS" },
    { id: 9, name: "Patrícia Alves", location: "Curitiba, PR", time: "1h 15min", device: "Android", avatar: "PA" },
    { id: 10, name: "Lucas Ferreira", location: "Manaus, AM", time: "40min", device: "Web", avatar: "LF" },
  ]

  // Dados simulados para interações
  const interactions = [
    { id: 1, name: "Maria Silva", message: "Adoro essa música! 💖", time: "2 min atrás", avatar: "MS" },
    { id: 2, name: "João Santos", message: "Pode tocar Lady Gaga na próxima?", time: "5 min atrás", avatar: "JS" },
    {
      id: 3,
      name: "Ana Oliveira",
      message: "Bom dia, pessoal! Ouvindo do trabalho.",
      time: "10 min atrás",
      avatar: "AO",
    },
    { id: 4, name: "Carlos Pereira", message: "Parabéns pelo programa!", time: "15 min atrás", avatar: "CP" },
    { id: 5, name: "Juliana Costa", message: "Aumenta o volume! 🔊", time: "20 min atrás", avatar: "JC" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Ouvintes" text="Gerencie e analise seus ouvintes em tempo real.">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="active">Ouvintes Ativos</TabsTrigger>
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
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
                <CardDescription>Novos Ouvintes</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <UserPlus className="mr-2 h-5 w-5 text-primary" />
                  56
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Hoje</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Taxa de Retenção</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Radio className="mr-2 h-5 w-5" />
                  Dispositivos
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={{
                    labels: ["Web", "Android", "iOS", "Smart Speaker", "Outros"],
                    datasets: [
                      {
                        data: [35, 30, 25, 8, 2],
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
                    },
                  }}
                />
              </CardContent>
            </Card>

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
          </div>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Ouvintes Ativos</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar ouvinte..." className="w-[250px] pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-[1fr_1fr_120px_100px_80px] font-medium p-3 border-b">
                  <div>Nome</div>
                  <div>Localização</div>
                  <div>Tempo de Escuta</div>
                  <div>Dispositivo</div>
                  <div>Ações</div>
                </div>
                <ScrollArea className="h-[500px]">
                  {activeListeners.map((listener) => (
                    <div
                      key={listener.id}
                      className="grid grid-cols-[1fr_1fr_120px_100px_80px] p-3 border-b hover:bg-muted/50"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${listener.avatar}`}
                            alt={listener.name}
                          />
                          <AvatarFallback>{listener.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{listener.name}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        {listener.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {listener.time}
                      </div>
                      <div>
                        <Badge variant="outline">{listener.device}</Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Faixa Etária</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={{
                    labels: ["<18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
                    datasets: [
                      {
                        label: "Ouvintes",
                        data: [5, 15, 30, 25, 15, 7, 3],
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
                          text: "Porcentagem (%)",
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Faixa Etária",
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gênero</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={{
                    labels: ["Feminino", "Masculino", "Não Informado"],
                    datasets: [
                      {
                        data: [48, 45, 7],
                        backgroundColor: [
                          "hsl(var(--primary))",
                          "hsl(var(--primary) / 0.6)",
                          "hsl(var(--primary) / 0.3)",
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

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Interesses</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={{
                    labels: [
                      "Pop",
                      "Rock",
                      "Eletrônica",
                      "Hip Hop",
                      "Jazz",
                      "Clássica",
                      "Sertanejo",
                      "MPB",
                      "Notícias",
                      "Esportes",
                    ],
                    datasets: [
                      {
                        label: "Interesse (%)",
                        data: [75, 68, 62, 58, 45, 40, 72, 65, 52, 48],
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
                        max: 100,
                        title: {
                          display: true,
                          text: "Porcentagem (%)",
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Engajamento ao Longo do Tempo</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={{
                    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                      {
                        label: "Mensagens",
                        data: [120, 150, 180, 220, 250, 280, 310, 350, 320, 290, 330, 380],
                        borderColor: "hsl(var(--primary))",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.2,
                        fill: true,
                      },
                      {
                        label: "Reações",
                        data: [220, 250, 280, 320, 350, 380, 410, 450, 420, 390, 430, 480],
                        borderColor: "hsl(var(--primary) / 0.6)",
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
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
                        title: {
                          display: true,
                          text: "Quantidade",
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Mês",
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {interactions.map((interaction) => (
                      <div key={interaction.id} className="flex space-x-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${interaction.avatar}`}
                            alt={interaction.name}
                          />
                          <AvatarFallback>{interaction.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{interaction.name}</div>
                            <div className="text-xs text-muted-foreground">{interaction.time}</div>
                          </div>
                          <p className="text-sm mt-1">{interaction.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Programas Mais Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Manhã Animada", engagement: 85, listeners: 320 },
                    { name: "Tarde Especial", engagement: 78, listeners: 280 },
                    { name: "Noite de Flashback", engagement: 92, listeners: 350 },
                    { name: "Jazz & Blues", engagement: 65, listeners: 180 },
                    { name: "Notícias da Manhã", engagement: 72, listeners: 240 },
                  ].map((program, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{program.name}</div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{program.listeners} ouvintes</Badge>
                          <span className="text-sm text-muted-foreground">{program.engagement}% engajamento</span>
                        </div>
                      </div>
                      <Progress value={program.engagement} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Músicas Mais Comentadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Summer Vibes", artist: "DJ Sunshine", comments: 42 },
                    { name: "Night Groove", artist: "Midnight Express", comments: 38 },
                    { name: "Chill Wave", artist: "Ocean Sounds", comments: 35 },
                    { name: "Dance Floor", artist: "Club Kings", comments: 30 },
                    { name: "Sunset Dreams", artist: "Horizon", comments: 28 },
                  ].map((song, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium">{song.name}</div>
                        <div className="text-sm text-muted-foreground">{song.artist}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>{song.comments}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

