import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Radio, Settings, Bell, Shield, Headphones, Mic, Volume2, Save, Music } from "lucide-react"

export const metadata: Metadata = {
  title: "Configurações | Rádio Online",
  description: "Gerencie as configurações da sua rádio online",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Configurações" text="Gerencie as configurações da sua rádio online." />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="stream">
            <Radio className="mr-2 h-4 w-4" />
            Transmissão
          </TabsTrigger>
          <TabsTrigger value="audio">
            <Headphones className="mr-2 h-4 w-4" />
            Áudio
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Rádio</CardTitle>
              <CardDescription>Informações básicas sobre sua estação de rádio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="station-name">Nome da Estação</Label>
                <Input id="station-name" defaultValue="RadioHub FM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="station-slogan">Slogan</Label>
                <Input id="station-slogan" defaultValue="A melhor música, o dia todo!" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="station-frequency">Frequência</Label>
                <Input id="station-frequency" defaultValue="98.7 FM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="station-website">Website</Label>
                <Input id="station-website" defaultValue="https://radiohub.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="station-email">Email de Contato</Label>
                <Input id="station-email" defaultValue="contato@radiohub.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="stream">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Transmissão</CardTitle>
              <CardDescription>Configure os parâmetros da sua transmissão online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stream-url">URL do Servidor</Label>
                <Input id="stream-url" defaultValue="rtmp://streaming.radiohub.com/live" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stream-key">Chave de Transmissão</Label>
                <Input id="stream-key" type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stream-quality">Qualidade</Label>
                  <Select defaultValue="high">
                    <SelectTrigger id="stream-quality">
                      <SelectValue placeholder="Selecione a qualidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa (64 kbps)</SelectItem>
                      <SelectItem value="medium">Média (128 kbps)</SelectItem>
                      <SelectItem value="high">Alta (256 kbps)</SelectItem>
                      <SelectItem value="ultra">Ultra (320 kbps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stream-format">Formato</Label>
                  <Select defaultValue="mp3">
                    <SelectTrigger id="stream-format">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="aac">AAC</SelectItem>
                      <SelectItem value="ogg">OGG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-restart">Reinício Automático</Label>
                  <Switch id="auto-restart" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Reinicia automaticamente a transmissão em caso de queda</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="record-stream">Gravar Transmissão</Label>
                  <Switch id="record-stream" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Grava automaticamente todas as transmissões para arquivo
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="audio">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Áudio</CardTitle>
              <CardDescription>Configure os parâmetros de áudio do estúdio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audio-device">Dispositivo de Entrada</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="audio-device">
                    <SelectValue placeholder="Selecione o dispositivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Dispositivo Padrão</SelectItem>
                    <SelectItem value="mic1">Microfone USB</SelectItem>
                    <SelectItem value="mic2">Interface de Áudio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Mic className="mr-2 h-4 w-4" />
                  Volume do Microfone
                </Label>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Input type="range" className="w-full" defaultValue="75" />
                  <span className="w-12 text-right text-sm">75%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Music className="mr-2 h-4 w-4" />
                  Volume da Música
                </Label>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Input type="range" className="w-full" defaultValue="65" />
                  <span className="w-12 text-right text-sm">65%</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="noise-reduction">Redução de Ruído</Label>
                  <Switch id="noise-reduction" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Aplica redução de ruído ao microfone</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-gain">Ganho Automático</Label>
                  <Switch id="auto-gain" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Ajusta automaticamente o ganho do microfone</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie como e quando você recebe notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-listeners">Notificações de Ouvintes</Label>
                  <Switch id="notify-listeners" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Receba notificações sobre picos de audiência</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-schedule">Notificações de Agenda</Label>
                  <Switch id="notify-schedule" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Receba lembretes sobre programas agendados</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-messages">Notificações de Mensagens</Label>
                  <Switch id="notify-messages" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Receba notificações sobre mensagens de ouvintes</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-system">Notificações do Sistema</Label>
                  <Switch id="notify-system" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Receba alertas sobre o status do sistema</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="notification-method">Método de Notificação</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="notification-method">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os métodos</SelectItem>
                    <SelectItem value="email">Apenas email</SelectItem>
                    <SelectItem value="push">Apenas notificações push</SelectItem>
                    <SelectItem value="none">Desativar todas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Gerencie as configurações de segurança da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Autenticação em Dois Fatores</Label>
                  <Switch id="two-factor" />
                </div>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="session-timeout">Timeout de Sessão</Label>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Encerra automaticamente sessões inativas após 30 minutos
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

