import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle, Music, Search, Filter, Clock, Calendar, BarChart2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Playlists | Rádio Online",
  description: "Gerencie suas playlists e programações musicais",
}

export default function PlaylistsPage() {
  // Dados simulados para playlists
  const playlists = [
    {
      id: "1",
      name: "Manhã Animada",
      tracks: 42,
      duration: "2h 35min",
      lastPlayed: "Hoje, 08:15",
      category: "Programas",
      usage: 85,
    },
    {
      id: "2",
      name: "Pop Hits 2023",
      tracks: 28,
      duration: "1h 45min",
      lastPlayed: "Ontem, 14:30",
      category: "Música",
      usage: 62,
    },
    {
      id: "3",
      name: "Rock Clássico",
      tracks: 35,
      duration: "2h 10min",
      lastPlayed: "15/10/2023",
      category: "Música",
      usage: 48,
    },
    {
      id: "4",
      name: "Tarde Especial",
      tracks: 30,
      duration: "1h 50min",
      lastPlayed: "Hoje, 14:00",
      category: "Programas",
      usage: 75,
    },
    {
      id: "5",
      name: "Jazz & Blues",
      tracks: 22,
      duration: "1h 30min",
      lastPlayed: "12/10/2023",
      category: "Música",
      usage: 35,
    },
    {
      id: "6",
      name: "Noite de Flashback",
      tracks: 50,
      duration: "3h 15min",
      lastPlayed: "Ontem, 20:00",
      category: "Programas",
      usage: 90,
    },
  ]

  // Estatísticas simuladas
  const stats = {
    totalPlaylists: playlists.length,
    totalTracks: playlists.reduce((sum, playlist) => sum + playlist.tracks, 0),
    totalDuration: "12h 05min",
    mostPlayed: "Pop Hits 2023",
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Playlists" text="Gerencie suas playlists e programações musicais.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Playlist
        </Button>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Music className="mr-2 h-4 w-4 text-muted-foreground" />
              Total de Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlaylists}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart2 className="mr-2 h-4 w-4 text-muted-foreground" />
              Total de Faixas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTracks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Duração Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDuration}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              Mais Tocada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{stats.mostPlayed}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todas as Playlists</h2>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar playlist..." className="w-[250px] pl-8" />
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="grid grid-cols-[1fr_100px_120px_120px_120px] font-medium p-2">
            <div>Nome</div>
            <div>Faixas</div>
            <div>Duração</div>
            <div>Última Execução</div>
            <div>Categoria</div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {playlists.map((playlist, index) => (
              <div key={playlist.id}>
                <div className="grid grid-cols-[1fr_100px_120px_120px_120px] p-4 hover:bg-muted/50">
                  <div className="font-medium">{playlist.name}</div>
                  <div>{playlist.tracks}</div>
                  <div>{playlist.duration}</div>
                  <div>{playlist.lastPlayed}</div>
                  <div>
                    <Badge variant="outline">{playlist.category}</Badge>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Uso</span>
                    <span>{playlist.usage}%</span>
                  </div>
                  <Progress value={playlist.usage} className="h-1" />
                </div>
                {index < playlists.length - 1 && <Separator />}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

