import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Search, Filter, Music, Play, MoreHorizontal, Clock, Tag, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Biblioteca Musical | Rádio Online",
  description: "Gerencie sua biblioteca de músicas",
}

export default function MusicLibraryPage() {
  // Dados simulados para músicas
  const tracks = [
    {
      id: "1",
      title: "Summer Vibes",
      artist: "DJ Sunshine",
      album: "Summer Hits 2023",
      genre: "Electronic",
      duration: "3:42",
      bpm: 128,
      year: 2023,
      plays: 42,
    },
    {
      id: "2",
      title: "Night Groove",
      artist: "Midnight Express",
      album: "Night Sessions",
      genre: "Deep House",
      duration: "4:15",
      bpm: 124,
      year: 2023,
      plays: 35,
    },
    {
      id: "3",
      title: "Chill Wave",
      artist: "Ocean Sounds",
      album: "Relaxation",
      genre: "Ambient",
      duration: "3:28",
      bpm: 90,
      year: 2022,
      plays: 28,
    },
    {
      id: "4",
      title: "Dance Floor",
      artist: "Club Kings",
      album: "Party Time",
      genre: "House",
      duration: "5:12",
      bpm: 130,
      year: 2023,
      plays: 56,
    },
    {
      id: "5",
      title: "Sunset Dreams",
      artist: "Horizon",
      album: "Chill Out",
      genre: "Lounge",
      duration: "4:05",
      bpm: 100,
      year: 2022,
      plays: 31,
    },
    {
      id: "6",
      title: "Urban Beats",
      artist: "City Pulse",
      album: "Downtown",
      genre: "Hip Hop",
      duration: "3:55",
      bpm: 95,
      year: 2023,
      plays: 48,
    },
    {
      id: "7",
      title: "Smooth Jazz",
      artist: "Night Owls",
      album: "Midnight Jazz",
      genre: "Jazz",
      duration: "6:22",
      bpm: 85,
      year: 2021,
      plays: 22,
    },
    {
      id: "8",
      title: "Electro Pop",
      artist: "Synth Masters",
      album: "Digital Dreams",
      genre: "Pop",
      duration: "3:18",
      bpm: 118,
      year: 2023,
      plays: 39,
    },
    {
      id: "9",
      title: "Latin Rhythm",
      artist: "Salsa Kings",
      album: "Tropical Nights",
      genre: "Latin",
      duration: "4:45",
      bpm: 110,
      year: 2022,
      plays: 27,
    },
    {
      id: "10",
      title: "Rock Classics",
      artist: "Guitar Heroes",
      album: "Rock Legends",
      genre: "Rock",
      duration: "5:30",
      bpm: 120,
      year: 2020,
      plays: 63,
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Biblioteca Musical" text="Gerencie sua coleção de músicas.">
        <div className="flex space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Músicas
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
            <TabsTrigger value="popular">Populares</TabsTrigger>
            <TabsTrigger value="unplayed">Não Tocadas</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar música..." className="w-[250px] pl-8" />
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-[1fr_200px_150px_100px_100px_80px] font-medium p-3 border-b">
            <div>Título / Artista</div>
            <div>Álbum</div>
            <div>Gênero</div>
            <div>Duração</div>
            <div>BPM</div>
            <div>Ações</div>
          </div>

          <ScrollArea className="h-[600px]">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="grid grid-cols-[1fr_200px_150px_100px_100px_80px] p-3 border-b hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {track.artist}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="text-sm">{track.album}</div>
                </div>

                <div className="flex items-center">
                  <Badge variant="outline" className="flex items-center">
                    <Tag className="mr-1 h-3 w-3" />
                    {track.genre}
                  </Badge>
                </div>

                <div className="flex items-center">
                  <div className="text-sm flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    {track.duration}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="text-sm">{track.bpm}</div>
                </div>

                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        <span>Reproduzir</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Music className="mr-2 h-4 w-4" />
                        <span>Adicionar à Playlist</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Tag className="mr-2 h-4 w-4" />
                        <span>Editar Tags</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

