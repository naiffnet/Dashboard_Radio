import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Star, Send, Trash2, Archive, Reply, Heart, ThumbsUp, Download, Radio } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Mensagens | Rádio Online",
  description: "Gerencie as mensagens dos seus ouvintes",
}

export default function MessagesPage() {
  // Dados simulados para mensagens
  const messages = [
    {
      id: 1,
      sender: "Maria Silva",
      avatar: "MS",
      message: "Adoro essa música! Podem tocar mais desse artista?",
      time: "Hoje, 10:15",
      read: true,
      starred: true,
      program: "Manhã Animada",
    },
    {
      id: 2,
      sender: "João Santos",
      avatar: "JS",
      message: "Bom dia! Estou ouvindo do trabalho. Podem mandar um alô para o pessoal da empresa ABC?",
      time: "Hoje, 09:45",
      read: true,
      starred: false,
      program: "Manhã Animada",
    },
    {
      id: 3,
      sender: "Ana Oliveira",
      avatar: "AO",
      message: "Parabéns pelo programa! Vocês fazem meu dia mais feliz.",
      time: "Hoje, 09:30",
      read: false,
      starred: false,
      program: "Manhã Animada",
    },
    {
      id: 4,
      sender: "Carlos Pereira",
      avatar: "CP",
      message: "Podem tocar 'Summer Vibes' do DJ Sunshine? É minha música favorita!",
      time: "Ontem, 15:20",
      read: true,
      starred: false,
      program: "Tarde Especial",
    },
    {
      id: 5,
      sender: "Juliana Costa",
      avatar: "JC",
      message: "Estou adorando a seleção musical de hoje! Continuem com o bom trabalho.",
      time: "Ontem, 14:55",
      read: true,
      starred: true,
      program: "Tarde Especial",
    },
    {
      id: 6,
      sender: "Roberto Lima",
      avatar: "RL",
      message: "Olá! Sou novo por aqui. Como faço para participar dos sorteios?",
      time: "Ontem, 14:30",
      read: false,
      starred: false,
      program: "Tarde Especial",
    },
    {
      id: 7,
      sender: "Fernanda Souza",
      avatar: "FS",
      message: "Vocês poderiam fazer uma playlist com as músicas mais pedidas da semana?",
      time: "15/03/2025, 20:10",
      read: true,
      starred: false,
      program: "Noite de Flashback",
    },
    {
      id: 8,
      sender: "Marcelo Santos",
      avatar: "MS",
      message: "Boa noite! Estou dirigindo e ouvindo vocês. Música perfeita para a estrada!",
      time: "15/03/2025, 19:45",
      read: true,
      starred: false,
      program: "Noite de Flashback",
    },
  ]

  // Mensagem selecionada para visualização
  const selectedMessage = messages[0]

  // Respostas rápidas predefinidas
  const quickReplies = [
    "Obrigado pela sua mensagem!",
    "Vamos tocar sua música em breve!",
    "Agradecemos seu feedback!",
    "Fique ligado para mais novidades!",
    "Seu pedido foi anotado!",
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Mensagens" text="Gerencie as mensagens dos seus ouvintes.">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Mensagens
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox">Caixa de Entrada</TabsTrigger>
          <TabsTrigger value="starred">Favoritas</TabsTrigger>
          <TabsTrigger value="sent">Enviadas</TabsTrigger>
          <TabsTrigger value="archived">Arquivadas</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-4">
          <Card className="md:h-[calc(100vh-220px)]">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mensagens</CardTitle>
                <Badge variant="outline">{messages.filter((m) => !m.read).length} não lidas</Badge>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar mensagens..." className="pl-8" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b hover:bg-muted/50 cursor-pointer ${
                      message.id === selectedMessage.id ? "bg-muted" : ""
                    } ${!message.read ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=${message.avatar}`}
                          alt={message.sender}
                        />
                        <AvatarFallback>{message.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate">{message.sender}</div>
                          <div className="flex items-center">
                            {message.starred && <Star className="h-4 w-4 text-yellow-500 mr-1" />}
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground truncate mt-1">{message.message}</div>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Radio className="h-3 w-3 mr-1" />
                            {message.program}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <TabsContent value="inbox" className="m-0">
            <Card className="md:h-[calc(100vh-220px)]">
              <CardHeader className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40&text=${selectedMessage.avatar}`}
                        alt={selectedMessage.sender}
                      />
                      <AvatarFallback>{selectedMessage.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedMessage.sender}</div>
                      <div className="text-sm text-muted-foreground">{selectedMessage.time}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        <Radio className="h-3 w-3 mr-1" />
                        {selectedMessage.program}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Reply className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Star className={`h-4 w-4 ${selectedMessage.starred ? "text-yellow-500 fill-yellow-500" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex flex-col h-[calc(100vh-350px)]">
                <div className="flex-1 overflow-auto mb-4">
                  <p className="text-base">{selectedMessage.message}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Responder</div>
                    <Select defaultValue="default">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Resposta rápida" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Escolha uma resposta rápida</SelectItem>
                        {quickReplies.map((reply, index) => (
                          <SelectItem key={index} value={`reply-${index}`}>
                            {reply}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Textarea placeholder="Digite sua resposta..." className="flex-1" />
                    <Button className="self-end">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar
                    </Button>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Curtir
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Agradecer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="starred" className="m-0">
            <Card className="md:h-[calc(100vh-220px)]">
              <CardHeader>
                <CardTitle>Mensagens Favoritas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[calc(100vh-350px)] text-muted-foreground">
                  Selecione uma mensagem favorita para visualizar
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sent" className="m-0">
            <Card className="md:h-[calc(100vh-220px)]">
              <CardHeader>
                <CardTitle>Mensagens Enviadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[calc(100vh-350px)] text-muted-foreground">
                  Selecione uma mensagem enviada para visualizar
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived" className="m-0">
            <Card className="md:h-[calc(100vh-220px)]">
              <CardHeader>
                <CardTitle>Mensagens Arquivadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[calc(100vh-350px)] text-muted-foreground">
                  Selecione uma mensagem arquivada para visualizar
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </DashboardShell>
  )
}

