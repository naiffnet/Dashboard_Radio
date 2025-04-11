import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Search, Filter, Play, MoreHorizontal, Clock, Folder, Volume2, Zap } from "lucide-react"
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
  title: "Efeitos Sonoros | Rádio Online",
  description: "Gerencie sua biblioteca de efeitos sonoros",
}

export default function SoundEffectsPage() {
  // Dados simulados para efeitos sonoros
  const effects = [
    {
      id: "1",
      name: "Aplausos",
      category: "Público",
      duration: "0:08",
      format: "MP3",
      size: "120 KB",
      path: "/Efeitos/Público/Aplausos.mp3",
    },
    {
      id: "2",
      name: "Risadas",
      category: "Público",
      duration: "0:05",
      format: "MP3",
      size: "80 KB",
      path: "/Efeitos/Público/Risadas.mp3",
    },
    {
      id: "3",
      name: "Sirene",
      category: "Alertas",
      duration: "0:03",
      format: "MP3",
      size: "50 KB",
      path: "/Efeitos/Alertas/Sirene.mp3",
    },
    {
      id: "4",
      name: "Telefone",
      category: "Comunicação",
      duration: "0:04",
      format: "MP3",
      size: "65 KB",
      path: "/Efeitos/Comunicação/Telefone.mp3",
    },
    {
      id: "5",
      name: "Trovão",
      category: "Clima",
      duration: "0:06",
      format: "MP3",
      size: "110 KB",
      path: "/Efeitos/Clima/Trovão.mp3",
    },
    {
      id: "6",
      name: "Campainha",
      category: "Casa",
      duration: "0:02",
      format: "MP3",
      size: "40 KB",
      path: "/Efeitos/Casa/Campainha.mp3",
    },
    {
      id: "7",
      name: "Buzina",
      category: "Veículos",
      duration: "0:01",
      format: "MP3",
      size: "30 KB",
      path: "/Efeitos/Veículos/Buzina.mp3",
    },
    {
      id: "8",
      name: "Explosão",
      category: "Ação",
      duration: "0:04",
      format: "MP3",
      size: "85 KB",
      path: "/Efeitos/Ação/Explosão.mp3",
    },
    {
      id: "9",
      name: "Moedas",
      category: "Dinheiro",
      duration: "0:03",
      format: "MP3",
      size: "55 KB",
      path: "/Efeitos/Dinheiro/Moedas.mp3",
    },
    {
      id: "10",
      name: "Pássaros",
      category: "Natureza",
      duration: "0:10",
      format: "MP3",
      size: "150 KB",
      path: "/Efeitos/Natureza/Pássaros.mp3",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Efeitos Sonoros" text="Gerencie sua biblioteca de efeitos sonoros.">
        <div className="flex space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Efeitos
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="cartridge">Cartucheira</TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar efeito..." className="w-[250px] pl-8" />
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-[1fr_150px_100px_100px_100px_80px] font-medium p-3 border-b">
            <div>Nome</div>
            <div>Categoria</div>
            <div>Duração</div>
            <div>Formato</div>
            <div>Tamanho</div>
            <div>Ações</div>
          </div>

          <ScrollArea className="h-[600px]">
            {effects.map((effect) => (
              <div
                key={effect.id}
                className="grid grid-cols-[1fr_150px_100px_100px_100px_80px] p-3 border-b hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">{effect.name}</div>
                </div>

                <div className="flex items-center">
                  <Badge variant="outline" className="flex items-center">
                    <Folder className="mr-1 h-3 w-3" />
                    {effect.category}
                  </Badge>
                </div>

                <div className="flex items-center">
                  <div className="text-sm flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    {effect.duration}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="text-sm">{effect.format}</div>
                </div>

                <div className="flex items-center">
                  <div className="text-sm">{effect.size}</div>
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
                        <Zap className="mr-2 h-4 w-4" />
                        <span>Adicionar à Cartucheira</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Volume2 className="mr-2 h-4 w-4" />
                        <span>Ajustar Volume</span>
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

