"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Download, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import { storeAudio, storeImage, getCacheSize } from "@/lib/media-storage"
import { useToast } from "@/hooks/use-toast"

// Interfaces para download
interface DownloadCategory {
  id: string
  name: string
  description: string
  items: DownloadItem[]
  selected: boolean
}

interface DownloadItem {
  id: string
  name: string
  url: string
  type: "audio" | "image"
  size: number // em KB
  metadata?: {
    title?: string
    artist?: string
  }
}

// Dados de exemplo para download
const downloadCategories: DownloadCategory[] = [
  {
    id: "music",
    name: "Músicas Populares",
    description: "Músicas mais tocadas (150MB)",
    selected: true,
    items: [
      {
        id: "1",
        name: "Summer Vibes",
        url: "/musics/summer-vibes.mp3",
        type: "audio",
        size: 8500,
        metadata: { title: "Summer Vibes", artist: "DJ Sunshine" },
      },
      {
        id: "2",
        name: "Night Groove",
        url: "/musics/night-groove.mp3",
        type: "audio",
        size: 9700,
        metadata: { title: "Night Groove", artist: "Midnight Express" },
      },
      {
        id: "3",
        name: "Chill Wave",
        url: "/musics/chill-wave.mp3",
        type: "audio",
        size: 7900,
        metadata: { title: "Chill Wave", artist: "Ocean Sounds" },
      },
      // Mais músicas...
    ],
  },
  {
    id: "effects",
    name: "Efeitos Sonoros",
    description: "Efeitos essenciais (30MB)",
    selected: true,
    items: [
      {
        id: "1",
        name: "Aplausos",
        url: "/effects/applause.mp3",
        type: "audio",
        size: 1200,
        metadata: { title: "Aplausos", artist: "Efeitos RadioHub" },
      },
      {
        id: "2",
        name: "Risadas",
        url: "/effects/laughter.mp3",
        type: "audio",
        size: 800,
        metadata: { title: "Risadas", artist: "Efeitos RadioHub" },
      },
      {
        id: "3",
        name: "Sirene",
        url: "/effects/siren.mp3",
        type: "audio",
        size: 500,
        metadata: { title: "Sirene", artist: "Efeitos RadioHub" },
      },
      // Mais efeitos...
    ],
  },
  {
    id: "vinhetas",
    name: "Vinhetas",
    description: "Vinhetas da rádio (20MB)",
    selected: false,
    items: [
      {
        id: "1",
        name: "Abertura",
        url: "/jingles/opening.mp3",
        type: "audio",
        size: 2100,
        metadata: { title: "Vinheta Abertura", artist: "RadioHub" },
      },
      {
        id: "2",
        name: "Encerramento",
        url: "/jingles/closing.mp3",
        type: "audio",
        size: 1800,
        metadata: { title: "Vinheta Encerramento", artist: "RadioHub" },
      },
      // Mais vinhetas...
    ],
  },
  {
    id: "images",
    name: "Imagens e Logos",
    description: "Recursos visuais (5MB)",
    selected: true,
    items: [
      { id: "1", name: "Logo Principal", url: "/images/logo.png", type: "image", size: 150 },
      { id: "2", name: "Capas de Álbuns", url: "/images/album-covers.zip", type: "image", size: 4500 },
      // Mais imagens...
    ],
  },
]

export function DownloadForOffline() {
  const [categories, setCategories] = useState<DownloadCategory[]>(downloadCategories)
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "success" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [currentItem, setCurrentItem] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { toast } = useToast()

  // Calcula tamanho total selecionado (em KB)
  const totalSelected = categories
    .filter((category) => category.selected)
    .reduce((acc, category) => acc + category.items.reduce((total, item) => total + item.size, 0), 0)

  // Converte para MB
  const totalSelectedMB = (totalSelected / 1024).toFixed(2)

  // Calcula número de itens selecionados
  const totalItems = categories
    .filter((category) => category.selected)
    .reduce((acc, category) => acc + category.items.length, 0)

  // Toggle seleção de categoria
  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === categoryId ? { ...category, selected: !category.selected } : category)),
    )
  }

  // Inicia download
  const startDownload = async () => {
    if (downloadStatus === "downloading") return

    setDownloadStatus("downloading")
    setProgress(0)
    setCurrentItem("")
    setErrorMessage("")

    // Filtra categorias selecionadas
    const selectedCategories = categories.filter((category) => category.selected)
    const itemsToDownload = selectedCategories.flatMap((category) => category.items)
    let completedItems = 0

    // Processa cada item
    for (const item of itemsToDownload) {
      try {
        setCurrentItem(item.name)

        // Armazena para uso offline
        let success = false
        if (item.type === "audio") {
          success = await storeAudio(item.url, item.metadata)
        } else if (item.type === "image") {
          success = await storeImage(item.url)
        }

        if (!success) {
          throw new Error(`Falha ao baixar ${item.name}`)
        }

        // Atualiza progresso
        completedItems++
        setProgress(Math.round((completedItems / itemsToDownload.length) * 100))

        // Small delay to prevent UI freezing
        await new Promise((resolve) => setTimeout(resolve, 50))
      } catch (error) {
        console.error(`Erro ao baixar ${item.name}:`, error)
        setErrorMessage(`Falha ao baixar ${item.name}. Verifique sua conexão.`)
        setDownloadStatus("error")
        return
      }
    }

    // Download concluído
    setDownloadStatus("success")
    toast({
      title: "Download concluído",
      description: `${completedItems} itens baixados com sucesso.`,
    })

    // Atualizar tamanho do cache
    await getCacheSize()
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="mr-2 h-5 w-5 text-primary" />
          Baixar para Uso Offline
        </CardTitle>
        <CardDescription>Selecione os recursos que deseja disponibilizar offline</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status do download */}
        {downloadStatus !== "idle" && (
          <div className="mb-4 space-y-2">
            {downloadStatus === "downloading" && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                    Baixando: {currentItem}
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </>
            )}

            {downloadStatus === "success" && (
              <div className="flex items-center p-3 bg-primary/10 rounded-md text-sm">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                <span>Download concluído! Os recursos estão disponíveis offline.</span>
              </div>
            )}

            {downloadStatus === "error" && (
              <div className="flex items-center p-3 bg-destructive/10 rounded-md text-sm">
                <XCircle className="h-5 w-5 mr-2 text-destructive" />
                <span>{errorMessage || "Ocorreu um erro durante o download."}</span>
              </div>
            )}
          </div>
        )}

        {/* Lista de categorias */}
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-start space-x-2 p-2 border rounded-md hover:bg-muted/50">
              <Checkbox
                id={category.id}
                checked={category.selected}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <div className="flex-1">
                <label htmlFor={category.id} className="text-sm font-medium leading-none cursor-pointer">
                  {category.name}
                </label>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do download */}
        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {totalItems} itens selecionados ({totalSelectedMB} MB)
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={startDownload}
          className="w-full"
          disabled={downloadStatus === "downloading" || totalSelected === 0}
        >
          {downloadStatus === "downloading" ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Baixando...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Baixar para Uso Offline
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

