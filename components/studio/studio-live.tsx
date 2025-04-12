"use client"

import { Select, SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { ThemeSwitcher } from "@/components/theme-switcher"
import {
  Mic,
  MicOff,
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Users,
  Radio,
  Settings,
  Plus,
  Volume2,
  Clock,
  Save,
  Trash2,
  ChevronRight,
  Disc,
  FileText,
  Edit,
  List,
  HelpCircle,
  MoreHorizontal,
  Thermometer,
  Droplets,
  X,
  ArrowRight,
  Folder,
  File,
  Square,
  PlayCircle,
  Copy,
  ClipboardPaste,
  Scissors,
  Undo,
  Redo,
  CheckSquare,
  Search,
  Shuffle,
  Repeat,
  BarChart2,
  Upload,
  Download,
  LogOut,
  Tag,
  Wand2,
  FolderOpen,
  Zap,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function StudioLive() {
  const [isLive, setIsLive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [listeners, setListeners] = useState(0)
  const [fullscreenMode, setFullscreenMode] = useState(false)
  const [showMixer, setShowMixer] = useState(true)
  const [activeTab, setActiveTab] = useState("events")
  const [currentDateTime, setCurrentDateTime] = useState<string>(() => new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }))

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [
      hours > 0 ? hours.toString().padStart(2, '0') : null,
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  };
  const [currentTrackProgress, setCurrentTrackProgress] = useState(0)
  const [nextTrackProgress, setNextTrackProgress] = useState(0)
  const [activeAuxPlayer, setActiveAuxPlayer] = useState<number | null>(null)
  const { theme } = useTheme()
  const { toast } = useToast()

  // Estado para cartucheira
  const [cartridgeCards, setCartridgeCards] = useState([
    { id: 1, name: "Vinheta Abertura", file: "vinheta_abertura.mp3", active: false },
    { id: 2, name: "Efeito Aplausos", file: "aplausos.mp3", active: false },
    { id: 3, name: "Transição", file: "transicao.mp3", active: false },
    { id: 4, name: "", file: "", active: false, empty: true },
    { id: 5, name: "", file: "", active: false, empty: true },
    { id: 6, name: "", file: "", active: false, empty: true },
    { id: 7, name: "", file: "", active: false, empty: true },
    { id: 8, name: "", file: "", active: false, empty: true },
  ])

  // Estado para explorador de arquivos
  const [folderStructure, setFolderStructure] = useState({
    currentPath: "/Músicas",
    folders: [
      { name: "Músicas", path: "/Músicas" },
      { name: "Efeitos", path: "/Efeitos" },
      { name: "Vinhetas", path: "/Vinhetas" },
      { name: "Programas", path: "/Programas" },
    ],
    files: [
      { name: "Summer Vibes.mp3", type: "audio", size: "8.5 MB", path: "/Músicas/Summer Vibes.mp3" },
      { name: "Night Groove.mp3", type: "audio", size: "9.7 MB", path: "/Músicas/Night Groove.mp3" },
      { name: "Chill Wave.mp3", type: "audio", size: "7.9 MB", path: "/Músicas/Chill Wave.mp3" },
      { name: "Dance Floor.mp3", type: "audio", size: "10.2 MB", path: "/Músicas/Dance Floor.mp3" },
      { name: "Sunset Dreams.mp3", type: "audio", size: "8.1 MB", path: "/Músicas/Sunset Dreams.mp3" },
    ],
  })

  const [volume, setVolume] = useState({
    master: 80,
    mic: 75,
    music: 65,
    effects: 50,
    guests: 70,
  })

  // Estado para players auxiliares
  const [auxPlayers, setAuxPlayers] = useState([
    { id: 1, name: "Auxiliar 1", file: "", playing: false, progress: 0, volume: 70 },
    { id: 2, name: "Auxiliar 2", file: "", playing: false, progress: 0, volume: 70 },
    { id: 3, name: "Auxiliar 3", file: "", playing: false, progress: 0, volume: 70 },
    { id: 4, name: "Auxiliar 4", file: "", playing: false, progress: 0, volume: 70 },
  ])

  const canvasRef = useRef<HTMLCanvasElement>(null)
const animationRef = useRef<number>(0)

  // Simulação de visualizador de áudio
  useEffect(() => {
    if (!canvasRef.current || !isLive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const drawVisualizer = () => {
      ctx.clearRect(0, 0, width, height)

      // Desenhar fundo personalizado para cada tema
      ctx.fillStyle =
        theme === "light"
          ? "rgba(0, 0, 0, 0.05)"
          : theme === "colorful"
            ? "rgba(33, 50, 75, 0.2)"
            : "rgba(255, 255, 255, 0.05)"
      ctx.fillRect(0, 0, width, height)

      // Desenhar ondas de áudio simuladas
      const barCount = 70
      const barWidth = width / barCount
      const barGap = 2

      // Definir cor das barras com base no tema
      ctx.fillStyle = "hsl(var(--studio-visualizer))" // Usar a variável CSS para cada tema

      for (let i = 0; i < barCount; i++) {
        // Gerar altura aleatória para simular ondas de áudio
        const barHeight = Math.random() * (height * 0.8) + height * 0.1
        ctx.fillRect(i * (barWidth + barGap), (height - barHeight) / 2, barWidth, barHeight)
      }

      animationRef.current = requestAnimationFrame(drawVisualizer)
    }

    drawVisualizer()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLive, canvasRef, theme])

  // Atualizar data e hora
  useEffect(() => {
    const updateTime = () => {
      setCurrentDateTime(new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval)
  }, [])

  // Simulação de tempo decorrido e ouvintes
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isLive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)

        // Simular flutuação de ouvintes
        if (Math.random() > 0.7) {
          setListeners((prev) => Math.max(0, prev + Math.floor(Math.random() * 10) - 3))
        }

        // Simular progresso da música atual
        setCurrentTrackProgress((prev) => {
          if (prev >= 100) return 0
          return prev + 0.5
        })

        // Simular progresso da próxima música
        if (currentTrackProgress > 80) {
          setNextTrackProgress((prev) => Math.min(prev + 2, 100))
        }

        // Simular progresso dos players auxiliares ativos
        setAuxPlayers((prev) =>
          prev.map((player) => {
            if (player.playing) {
              const newProgress = player.progress + 1
              if (newProgress >= 100) {
                return { ...player, playing: false, progress: 0 }
              }
              return { ...player, progress: newProgress }
            }
            return player
          }),
        )
      }, 1000)
    } else {
      setElapsedTime(0)
      setListeners(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLive, currentTrackProgress])

  const toggleLive = () => {
    if (!isLive) {
      // Iniciar transmissão
      setIsLive(true)
      setListeners(Math.floor(Math.random() * 100) + 150)
      setIsPlaying(true)
      toast({
        title: "Transmissão iniciada",
        description: "Você está no ar! Sua transmissão começou com sucesso.",
      })
    } else {
      // Confirmar antes de parar
      if (window.confirm("Tem certeza que deseja encerrar a transmissão?")) {
        setIsLive(false)
        setIsPlaying(false)
        toast({
          title: "Transmissão encerrada",
          description: "Sua transmissão foi encerrada com sucesso.",
        })
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "Microfone ativado" : "Microfone desativado",
      description: isMuted ? "Seu microfone foi ativado." : "Seu microfone foi silenciado.",
    })
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    toast({
      title: isPlaying ? "Reprodução pausada" : "Reprodução iniciada",
      description: isPlaying ? "A reprodução foi pausada." : "A reprodução foi iniciada.",
    })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentMessage.trim()) {
      // Lógica para enviar mensagem
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada para os ouvintes.",
      })
      setCurrentMessage("")
    }
  }

  // Atualizar data e hora
  useEffect(() => {
    const updateTime = () => {
      setCurrentDateTime(new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVolumeChange = (type: string, value: number[]) => {
    setVolume((prev) => ({ ...prev, [type]: value[0] }))
  }

  const toggleFullscreen = () => {
    setFullscreenMode(!fullscreenMode)
  }

  const toggleMixer = () => {
    setShowMixer(!showMixer)
  }

  const handleAuxPlayerAction = (id: number, action: "play" | "stop" | "pause") => {
    setAuxPlayers((prev) =>
      prev.map((player) => {
        if (player.id === id) {
          if (action === "play") {
            return { ...player, playing: true }
          } else if (action === "stop") {
            return { ...player, playing: false, progress: 0 }
          } else if (action === "pause") {
            return { ...player, playing: false }
          }
        }
        return player
      }),
    )

    if (action === "play") {
      setActiveAuxPlayer(id)
      toast({
        title: `Auxiliar ${id} ativado`,
        description: "Reprodução iniciada no player auxiliar.",
      })
    }
  }

  const toggleCartridgeCard = (id: number) => {
    setCartridgeCards((prev) =>
      prev.map((card) => {
        if (card.id === id) {
          if (card.empty) {
            // Abrir diálogo para selecionar efeito
            toast({
              title: "Adicionar efeito",
              description: "Selecione um efeito para adicionar à cartucheira.",
            })
            return card
          } else {
            return { ...card, active: !card.active }
          }
        }
        return card
      }),
    )
  }

  const navigateFolder = (path: string) => {
    // Simulação de navegação de pastas
    setFolderStructure((prev) => ({
      ...prev,
      currentPath: path,
      files:
        path === "/Efeitos"
          ? [
              { name: "Aplausos.mp3", type: "audio", size: "1.2 MB", path: "/Efeitos/Aplausos.mp3" },
              { name: "Risadas.mp3", type: "audio", size: "0.8 MB", path: "/Efeitos/Risadas.mp3" },
              { name: "Sirene.mp3", type: "audio", size: "0.5 MB", path: "/Efeitos/Sirene.mp3" },
              { name: "Telefone.mp3", type: "audio", size: "0.3 MB", path: "/Efeitos/Telefone.mp3" },
            ]
          : path === "/Vinhetas"
            ? [
                { name: "Abertura.mp3", type: "audio", size: "2.1 MB", path: "/Vinhetas/Abertura.mp3" },
                { name: "Encerramento.mp3", type: "audio", size: "1.8 MB", path: "/Vinhetas/Encerramento.mp3" },
                { name: "Comercial.mp3", type: "audio", size: "1.5 MB", path: "/Vinhetas/Comercial.mp3" },
              ]
            : prev.files,
    }))
  }

  // Dados simulados
  const currentTrack = {
    title: "Summer Vibes",
    artist: "DJ Sunshine",
    duration: "3:42",
    elapsed: "1:42",
    album: "Summer Hits 2023",
    genre: "Electronic",
    year: "2023",
  }

  const nextTrack = {
    title: "Night Groove",
    artist: "Midnight Express",
    duration: "4:15",
    album: "Night Sessions",
    genre: "Deep House",
    year: "2023",
  }

  const upcomingEvents = [
    { time: "11:00", title: "Notícias", duration: "5 min" },
    { time: "11:30", title: "Comercial - Supermercado Economia", duration: "30 seg" },
    { time: "12:00", title: "Boletim do Meio-dia", duration: "10 min" },
    { time: "12:15", title: "Comercial - Loja Fashion", duration: "20 seg" },
  ]

  const playlistTracks = [
    { id: "1", title: "Summer Vibes", artist: "DJ Sunshine", duration: "3:42", status: "playing" },
    { id: "2", title: "Night Groove", artist: "Midnight Express", duration: "4:15", status: "next" },
    { id: 3, title: "Chill Wave", artist: "Ocean Sounds", duration: "3:28", status: "queued" },
    { id: "4", title: "Dance Floor", artist: "Club Kings", duration: "5:12", status: "queued" },
    { id: "5", title: "Sunset Dreams", artist: "Horizon", duration: "4:05", status: "queued" },
    { id: "6", title: "Urban Beats", artist: "City Pulse", duration: "3:55", status: "queued" },
    { id: "7", title: "Smooth Jazz", artist: "Night Owls", duration: "6:22", status: "queued" },
    { id: "8", title: "Electro Pop", artist: "Synth Masters", duration: "3:18", status: "queued" },
    { id: "9", title: "Latin Rhythm", artist: "Salsa Kings", duration: "4:45", status: "queued" },
    { id: "10", title: "Rock Classics", artist: "Guitar Heroes", duration: "5:30", status: "queued" },
  ]

  const historyTracks = [
    { time: "10:32", title: "Rhythm of Life", artist: "Groove Masters", duration: "4:12" },
    { time: "10:28", title: "City Lights", artist: "Urban Sounds", duration: "3:45" },
    { time: "10:24", title: "Morning Energy", artist: "Wake Up Band", duration: "3:22" },
    { time: "10:20", title: "Coffee Break", artist: "Chill Vibes", duration: "2:55" },
    { time: "10:15", title: "News Update", artist: "Station News", duration: "5:00" },
  ]

  return (
    <div className={`flex flex-col h-screen ${fullscreenMode ? "fixed inset-0 z-50 bg-background" : ""}`}>
      {/* Barra de menu superior */}
      <div className="flex items-center justify-between bg-black text-white p-1 text-xs">
        <div className="flex space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded">
                <FileText className="h-3 w-3" />
                <span>Arquivo</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Novo</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Folder className="mr-2 h-4 w-4" />
                <span>Abrir</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Save className="mr-2 h-4 w-4" />
                <span>Salvar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                <span>Importar Playlist</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Exportar Playlist</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferências</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded">
                <Edit className="h-3 w-3" />
                <span>Editor</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Scissors className="mr-2 h-4 w-4" />
                <span>Cortar Áudio</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Volume2 className="mr-2 h-4 w-4" />
                <span>Normalizar Volume</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wand2 className="mr-2 h-4 w-4" />
                <span>Aplicar Efeitos</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>Editor de Tags</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Editor de Texto</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded">
                <List className="h-3 w-3" />
                <span>Editar</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copiar</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardPaste className="mr-2 h-4 w-4" />
                <span>Colar</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Scissors className="mr-2 h-4 w-4" />
                <span>Recortar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Undo className="mr-2 h-4 w-4" />
                <span>Desfazer</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Redo className="mr-2 h-4 w-4" />
                <span>Refazer</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CheckSquare className="mr-2 h-4 w-4" />
                <span>Selecionar Tudo</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Search className="mr-2 h-4 w-4" />
                <span>Buscar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded">
                <Music className="h-3 w-3" />
                <span>Playlist</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Nova Playlist</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Save className="mr-2 h-4 w-4" />
                <span>Salvar Playlist</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Folder className="mr-2 h-4 w-4" />
                <span>Abrir Playlist</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Shuffle className="mr-2 h-4 w-4" />
                <span>Modo Aleatório</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Repeat className="mr-2 h-4 w-4" />
                <span>Repetir</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                <span>Programar Playlist</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart2 className="mr-2 h-4 w-4" />
                <span>Estatísticas</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded">
            <Disc className="h-3 w-3" />
            <span>Mídia</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded">
            <Settings className="h-3 w-3" />
            <span>Ferramentas</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded">
            <HelpCircle className="h-3 w-3" />
            <span>Ajuda</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <div className="text-xs">{new Date().toLocaleDateString("pt-BR", { weekday: "long" })}</div>
            <div className="text-xs">
              {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className="text-xl font-bold">{currentDateTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4" />
            <span>0° C</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4" />
            <span>0%</span>
          </div>
          <div className="ml-2">
            <ThemeSwitcher compact={true} />
          </div>
        </div>
      </div>

      {/* Barra de ferramentas */}
      <div className="flex items-center bg-neutral-800 text-white p-1 text-xs">
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Folder className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <File className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Save className="h-3 w-3" />
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-600" />
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <X className="h-3 w-3" />
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-600" />
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <List className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-600" />
          <div className="flex items-center space-x-1 bg-neutral-700 rounded px-2 py-0.5">
            <Radio className="h-3 w-3 text-red-500" />
            <span className="text-xs">CARIMBOS OFF</span>
          </div>
          <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-600" />

          {/* Botões de players auxiliares */}
          <div className="flex space-x-1">
            {auxPlayers.map((player) => (
              <Button
                key={player.id}
                variant={activeAuxPlayer === player.id ? "default" : "ghost"}
                size="sm"
                className={`h-6 px-2 ${
                  activeAuxPlayer === player.id
                    ? theme === "colorful"
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary"
                    : ""
                }`}
                onClick={() => handleAuxPlayerAction(player.id, player.playing ? "stop" : "play")}
              >
                {player.id}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Painel esquerdo */}
        <div className="w-[300px] bg-neutral-900 text-white flex flex-col border-r border-neutral-800">
          {/* Logo e controles de volume */}
          <div className="p-2 flex items-center space-x-2 border-b border-neutral-800">
            <div className="bg-neutral-800 rounded-full h-16 w-16 flex items-center justify-center">
              <Radio className="h-8 w-8 text-primary" />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-bold uppercase tracking-wider">RadioHub</span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <span className="font-bold">L</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <span className="font-bold">R</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-xs text-center">00:00</div>
            </div>
            <div className="flex flex-col h-16 justify-center">
              <div className="w-4 h-full bg-neutral-800 relative">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-primary"
                  style={{ height: `${volume.master}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Abas */}
          <div className="flex border-b border-neutral-800">
            <Button
              variant={activeTab === "events" ? "default" : "ghost"}
              className="flex-1 rounded-none h-8 text-xs"
              onClick={() => setActiveTab("events")}
            >
              Eventos
            </Button>
            <Button
              variant={activeTab === "explorer" ? "default" : "ghost"}
              className="flex-1 rounded-none h-8 text-xs"
              onClick={() => setActiveTab("explorer")}
            >
              Explorador
            </Button>
            <Button
              variant={activeTab === "cartridge" ? "default" : "ghost"}
              className="flex-1 rounded-none h-8 text-xs"
              onClick={() => setActiveTab("cartridge")}
            >
              Cartucheira
            </Button>
          </div>

          {/* Conteúdo dinâmico baseado na aba selecionada */}
          {activeTab === "events" && (
            <div className="p-2 border-b border-neutral-800">
              <div className="text-xs font-medium mb-2">Próximos Eventos</div>
              <div className="bg-neutral-800 rounded">
                <div className="grid grid-cols-[60px_1fr] text-xs font-medium bg-neutral-700 p-1">
                  <div>Hora</div>
                  <div>Evento</div>
                </div>
                <ScrollArea className="h-[200px]">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="grid grid-cols-[60px_1fr] text-xs p-1 hover:bg-neutral-700">
                      <div>{event.time}</div>
                      <div className="truncate">
                        <span>{event.title}</span>
                        <span className="text-neutral-400 ml-1">({event.duration})</span>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          )}

          {activeTab === "explorer" && (
            <div className="p-2 border-b border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium">Explorador de Arquivos</div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <FolderOpen className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="bg-neutral-800 rounded mb-2">
                <div className="text-xs p-1 bg-neutral-700">
                  <span>Caminho: {folderStructure.currentPath}</span>
                </div>
                <div className="p-1">
                  {folderStructure.folders.map((folder, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 text-xs p-1 hover:bg-neutral-700 cursor-pointer"
                      onClick={() => navigateFolder(folder.path)}
                    >
                      <Folder className="h-3 w-3 text-accent" />
                      <span>{folder.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-neutral-800 rounded">
                <div className="grid grid-cols-[1fr_80px] text-xs font-medium bg-neutral-700 p-1">
                  <div>Nome</div>
                  <div>Tamanho</div>
                </div>
                <ScrollArea className="h-[200px]">
                  {folderStructure.files.map((file, index) => (
                    <div key={index} className="grid grid-cols-[1fr_80px] text-xs p-1 hover:bg-neutral-700">
                      <div className="flex items-center space-x-1">
                        <Music className="h-3 w-3 text-primary" />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <div>{file.size}</div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          )}

          {activeTab === "cartridge" && (
            <div className="p-2 border-b border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium">Cartucheira</div>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cartridgeCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => toggleCartridgeCard(card.id)}
                    className={`
                      h-16 p-2 rounded cursor-pointer flex flex-col justify-between
                      ${
                        card.empty
                          ? "border border-dashed border-neutral-600 colorful:border-accent"
                          : "bg-neutral-800 colorful:bg-[#1e293b]"
                      }
                      ${card.active ? (theme === "colorful" ? "ring-2 ring-accent" : "ring-2 ring-primary") : ""}
                    `}
                  >
                    {card.empty ? (
                      <div className="flex items-center justify-center h-full text-neutral-500 colorful:text-accent">
                        <Plus className="h-4 w-4 mr-1" />
                        <span className="text-xs">Adicionar</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-xs font-medium truncate">{card.name}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap
                              className={`h-3 w-3 ${
                                card.active
                                  ? theme === "colorful"
                                    ? "text-accent"
                                    : "text-primary"
                                  : "text-neutral-500 colorful:text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div className="text-[10px] text-neutral-400 colorful:text-muted-foreground">{card.file}</div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Histórico */}
          <div className="flex-1 p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium">Histórico</div>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
            <div className="bg-neutral-800 rounded">
              <div className="grid grid-cols-[60px_1fr_80px] text-xs font-medium bg-neutral-700 p-1">
                <div>Hora</div>
                <div>Arquivo</div>
                <div>Duração</div>
              </div>
              <ScrollArea className="h-[200px]">
                {historyTracks.map((track, index) => (
                  <div key={index} className="grid grid-cols-[60px_1fr_80px] text-xs p-1 hover:bg-neutral-700">
                    <div>{track.time}</div>
                    <div className="truncate">
                      <span>{track.title}</span>
                      <span className="text-neutral-400 ml-1">- {track.artist}</span>
                    </div>
                    <div>{track.duration}</div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Painel central */}
        <div className="flex-1 flex flex-col bg-neutral-900 text-white">
          {/* Status de transmissão */}
          <div className="bg-neutral-800 p-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/* Atualize a visualização "No Ar" */}
              <Badge
                variant={isLive ? "destructive" : "outline"}
                className={`uppercase font-bold ${theme === "colorful" && isLive ? "bg-[var(--studio-badge-noar-bg)] text-[var(--studio-badge-noar-text)]" : ""}`}
              >
                {isLive ? "NO AR" : "OFFLINE"}
              </Badge>

              {isLive && <div className="text-xs text-neutral-400">Tempo no ar: {formatTime(elapsedTime)}</div>}
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs text-neutral-400">PRÓXIMA</div>
              <div className="text-sm font-medium">
                {nextTrack.title} - {nextTrack.artist}
              </div>
              <div className="w-full h-1 bg-neutral-700 mt-1">
                <div className="h-full bg-accent" style={{ width: `${nextTrackProgress}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-xs text-neutral-400">Restante</div>
              <div className="text-sm font-medium">--:--</div>
              <div className="text-xs text-neutral-400">Término às --:--</div>
              <div className="text-xs text-neutral-400">--:--:--</div>
            </div>
          </div>

          {/* Visualizador de áudio */}
          <div className="flex-1 p-4 relative">
            {isLive ? (
              <div className="h-full flex flex-col">
                {/* Adicione um wrapper para melhorar a aparência do elemento canvas no modo colorido */}
                <div className={`flex-1 mb-2 ${theme === "colorful" ? "border-2 border-accent rounded" : ""}`}>
                  <canvas ref={canvasRef} className="w-full h-full rounded" />
                </div>
                {/* Atualize o player atual para o tema colorido */}
                <div className={`bg-neutral-800 p-2 rounded ${theme === "colorful" ? "border-2 border-accent" : ""}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Executando agora:</div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${theme === "colorful" ? "border-accent text-accent" : ""}`}
                    >
                      {currentTrack.elapsed} / {currentTrack.duration}
                    </Badge>


                  </div>
                  <div className="text-lg font-bold">{currentTrack.title}</div>
                  <div className="text-sm text-neutral-300">{currentTrack.artist}</div>
                  <div className="w-full h-1 bg-neutral-700 mt-2">
                    <div
                      className={`h-full ${theme === "colorful" ? "bg-primary" : "bg-primary"}`}
                      style={{ width: `${currentTrackProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Radio className="h-16 w-16 mx-auto mb-2 text-neutral-500" />
                  <p className="text-neutral-500 text-lg">Clique em "Iniciar Transmissão" para começar</p>
                </div>
              </div>
            )}
          </div>

          {/* Controles de reprodução */}
          <div className="bg-neutral-800 p-2 flex justify-between items-center">
            <div className="text-sm">00:00</div>

            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-400 hover:text-white"
                onClick={togglePlayback}
              >
                {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
                <Pause className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm">00:00</div>
          </div>

          {/* Playlist */}
          <div className="flex-1 flex flex-col">
            <div className="bg-neutral-700 p-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Music className="h-4 w-4" />
                <span className="text-sm font-medium">Playlist (00:00:00)</span>
              </div>

              <Select defaultValue="repeat">
                <SelectTrigger className="h-7 w-32 text-xs bg-neutral-800 border-neutral-600">
                  <SelectValue placeholder="Repetir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="repeat">Repetir</SelectItem>
                  <SelectItem value="shuffle">Aleatório</SelectItem>
                  <SelectItem value="once">Uma vez</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-[1fr_150px_80px] text-xs font-medium bg-neutral-800 p-1">
                <div>Arquivo</div>
                <div>Duração</div>
                <div></div>
              </div>
              <ScrollArea className="h-[calc(100%-24px)]">
                {playlistTracks.map((track) => (
                  <div
                    key={track.id}
                    className={`grid grid-cols-[1fr_150px_80px] text-xs p-1 hover:bg-neutral-700 ${
                      track.status === "playing" ? "bg-primary/30" : track.status === "next" ? "bg-accent/30" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {track.status === "playing" ? (
                        <PlayCircle className="h-3 w-3 text-primary" />
                      ) : track.status === "next" ? (
                        <ArrowRight className="h-3 w-3 text-accent" />
                      ) : (
                        <Music className="h-3 w-3 text-neutral-400" />
                      )}
                      <div className="truncate">
                        <span>{track.title}</span>
                        <span className="text-neutral-400 ml-1">- {track.artist}</span>
                      </div>
                    </div>
                    <div>{track.duration}</div>
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-4 w-4 text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>

          {/* Informações da faixa */}
          <div className="bg-neutral-800 p-2">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex">
                  <div className="w-20 text-neutral-400">Artista</div>
                  <div>{currentTrack.artist}</div>
                </div>
                <div className="flex">
                  <div className="w-20 text-neutral-400">Título</div>
                  <div>{currentTrack.title}</div>
                </div>
                <div className="flex">
                  <div className="w-20 text-neutral-400">Álbum</div>
                  <div>{currentTrack.album}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex">
                  <div className="w-20 text-neutral-400">Gênero</div>
                  <div>{currentTrack.genre}</div>
                </div>
                <div className="flex">
                  <div className="w-20 text-neutral-400">Ano</div>
                  <div>{currentTrack.year}</div>
                </div>
                <div className="flex">
                  <div className="w-20 text-neutral-400">Comentário</div>
                  <div>-</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Painel direito - Players Auxiliares */}
        <div className="w-[300px] bg-neutral-900 text-white flex flex-col border-l border-neutral-800">
          {/* Auxiliar */}
          <div className="bg-neutral-800 p-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {activeAuxPlayer ? `Auxiliar ${activeAuxPlayer}` : "Auxiliar 1"}
              </span>
              <Badge variant="outline" className="text-xs">
                <X className="h-3 w-3 mr-1" />
              </Badge>
            </div>

            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Folder className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Conteúdo auxiliar */}
          <div className="p-2 flex flex-col space-y-2">
            <div className="text-center text-sm">
              {activeAuxPlayer ? `Player Auxiliar ${activeAuxPlayer}` : "Sem Título"}
            </div>

            <div className="flex justify-between text-sm">
              <div>00:00</div>
              <div>00:00</div>
            </div>

            {activeAuxPlayer && (
              <div className="bg-neutral-800 rounded p-2 colorful:bg-[#1e293b] colorful:border colorful:border-accent">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-medium">
                    {auxPlayers[activeAuxPlayer - 1].playing ? "Reproduzindo" : "Parado"}
                  </div>
                  <Badge
                    variant={auxPlayers[activeAuxPlayer - 1].playing ? "default" : "outline"}
                    className={`text-xs ${theme === "colorful" && auxPlayers[activeAuxPlayer - 1].playing ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {auxPlayers[activeAuxPlayer - 1].playing ? "ATIVO" : "INATIVO"}
                  </Badge>
                </div>
                <div className="w-full h-2 bg-neutral-700 mb-2 colorful:bg-neutral-900">
                  <div
                    className={`h-full ${theme === "colorful" ? "bg-primary" : "bg-primary"}`}
                    style={{ width: `${auxPlayers[activeAuxPlayer - 1].progress}%` }}
                  />
                </div>
                <div className="flex justify-center space-x-2 mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 colorful:hover:bg-accent/20"
                    onClick={() => handleAuxPlayerAction(activeAuxPlayer, "play")}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 colorful:hover:bg-accent/20"
                    onClick={() => handleAuxPlayerAction(activeAuxPlayer, "stop")}
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 colorful:hover:bg-accent/20"
                    onClick={() => handleAuxPlayerAction(activeAuxPlayer, "pause")}
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-neutral-400 colorful:text-accent" />
                  <Slider
                    value={[auxPlayers[activeAuxPlayer - 1].volume]}
                    max={100}
                    step={1}
                    className={`flex-1 ${theme === "colorful" ? "[&>[data-orientation=horizontal]>.bg-primary]:bg-accent" : ""}`}
                    onValueChange={(value) => {
                      setAuxPlayers((prev) =>
                        prev.map((player) =>
                          player.id === activeAuxPlayer ? { ...player, volume: value[0] } : player,
                        ),
                      )
                    }}
                  />
                  <span className="text-xs w-8 text-right">{auxPlayers[activeAuxPlayer - 1].volume}%</span>
                </div>
              </div>
            )}

            <Select defaultValue="padrao">
              <SelectTrigger className="h-7 text-xs bg-neutral-800 border-neutral-600">
                <SelectValue placeholder="Padrão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="padrao">Padrão</SelectItem>
                <SelectItem value="alternativo">Alternativo</SelectItem>
                <SelectItem value="personalizado">Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-[1fr_80px] text-xs font-medium bg-neutral-800 p-1">
              <div>Arquivo</div>
              <div>Duração</div>
            </div>

            <ScrollArea className="flex-1 h-[400px]">
              <div className="text-center text-xs text-neutral-500 py-4">Nenhum arquivo carregado</div>
            </ScrollArea>
          </div>

          {/* Controles de reprodução auxiliar */}
          <div className="mt-auto p-2 flex justify-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
              <Square className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
              <Pause className="h-4 w-4" />
            </Button>
          </div>

          {/* Controles de volume auxiliar */}
          <div className="p-2 flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <span className="font-bold">L</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <span className="font-bold">R</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Volume2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Barra de status inferior */}
      <div className="bg-neutral-800 text-white p-1 flex justify-between items-center text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Radio className="h-3 w-3 text-green-500" />
            <span>Conectado</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{listeners} ouvintes</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div>v6.0.5</div>
          <ThemeSwitcher compact={true} />
        </div>
      </div>

      {/* Botões flutuantes */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <Button
          size="icon"
          variant={isLive ? "destructive" : "default"}
          className={`rounded-full h-12 w-12 shadow-lg ${
            theme === "colorful"
              ? isLive
                ? "bg-[var(--studio-badge-noar-bg)] text-[var(--studio-badge-noar-text)] hover:bg-[var(--studio-badge-noar-bg)]"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
              : ""
          }`}
          onClick={toggleLive}
        >
          {isLive ? <Square className="h-6 w-6" /> : <Radio className="h-6 w-6" />}
        </Button>

        <Button
          size="icon"
          variant={isMuted ? "destructive" : "outline"}
          className={`rounded-full h-10 w-10 shadow-lg ${
            theme === "colorful"
              ? isMuted
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-accent text-accent-foreground hover:bg-accent/90 border-accent"
              : ""
          }`}
          onClick={toggleMute}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}

