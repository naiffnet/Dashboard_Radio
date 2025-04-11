"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadForOffline } from "@/components/download-for-offline"
import { Database, WifiOff, Trash2, RefreshCw, HardDrive } from "lucide-react"
import { clearAllMediaCache, clearMediaCacheByType, getMediaCacheStatsByType } from "@/lib/media-storage"
import { useToast } from "@/hooks/use-toast"
import React from "react"

export default function OfflineManagerPageClient() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gerenciador Offline"
        text="Configure quais recursos da sua rádio estarão disponíveis quando você estiver sem internet."
      />

      <Tabs defaultValue="download" className="space-y-4">
        <TabsList>
          <TabsTrigger value="download">
            <Database className="mr-2 h-4 w-4" />
            Baixar Conteúdo
          </TabsTrigger>
          <TabsTrigger value="manage">
            <HardDrive className="mr-2 h-4 w-4" />
            Gerenciar Armazenamento
          </TabsTrigger>
          <TabsTrigger value="sync">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sincronização
          </TabsTrigger>
        </TabsList>

        <TabsContent value="download">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recursos Offline</CardTitle>
                  <CardDescription>
                    Selecione os recursos que você deseja disponibilizar para uso offline.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    O RadioHub permite que você continue trabalhando mesmo sem acesso à internet. Baixe músicas, efeitos
                    sonoros, e outros recursos para uso offline.
                  </p>

                  <h3 className="text-lg font-medium mt-6">Como funciona:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Os arquivos de áudio ficam disponíveis no seu aparelho</li>
                    <li>Seus dados e configurações são sincronizados automaticamente quando você voltar online</li>
                    <li>Todas as edições feitas offline serão preservadas</li>
                    <li>Monitore o uso de armazenamento na aba "Gerenciar Armazenamento"</li>
                  </ul>

                  <div className="flex items-center bg-muted p-4 rounded-md mt-4">
                    <WifiOff className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium">Dica para transmissões</p>
                      <p className="text-muted-foreground">
                        Baixe o conteúdo necessário antes do seu programa para evitar interrupções durante transmissões
                        ao vivo.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <DownloadForOffline />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="manage">
          <StorageManager />
        </TabsContent>

        <TabsContent value="sync">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Status de Sincronização</CardTitle>
                <CardDescription>Gerencie a sincronização de dados entre seu dispositivo e a nuvem.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Sincronização ativa</p>
                      <p className="text-sm text-muted-foreground">Última sincronização: Hoje, 15:42</p>
                    </div>
                  </div>
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Itens sincronizados</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Playlists</span>
                      <span className="text-sm text-muted-foreground">8 itens</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Programação</span>
                      <span className="text-sm text-muted-foreground">24 itens</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Configurações</span>
                      <span className="text-sm text-muted-foreground">12 itens</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Histórico</span>
                      <span className="text-sm text-muted-foreground">150 itens</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Configurações de sincronização</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Sincronização automática</p>
                        <p className="text-sm text-muted-foreground">Sincronizar quando conectado a Wi-Fi</p>
                      </div>
                      <div className="flex h-5 items-center space-x-2">
                        <Button variant="link" size="sm" className="h-5 p-0">
                          Ativado
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Sincronização em segundo plano</p>
                        <p className="text-sm text-muted-foreground">Sincronizar mesmo quando o app estiver fechado</p>
                      </div>
                      <div className="flex h-5 items-center space-x-2">
                        <Button variant="link" size="sm" className="h-5 p-0">
                          Ativado
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Log de Sincronização</CardTitle>
                <CardDescription>Histórico de atividades de sincronização.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1 p-2 border-l-2 border-green-500">
                    <p className="text-sm font-medium">Sincronização concluída</p>
                    <p className="text-xs text-muted-foreground">Hoje, 15:42 - 24 itens sincronizados</p>
                  </div>
                  <div className="space-y-1 p-2 border-l-2 border-green-500">
                    <p className="text-sm font-medium">Sincronização concluída</p>
                    <p className="text-xs text-muted-foreground">Hoje, 12:15 - 8 itens sincronizados</p>
                  </div>
                  <div className="space-y-1 p-2 border-l-2 border-yellow-500">
                    <p className="text-sm font-medium">Sincronização parcial</p>
                    <p className="text-xs text-muted-foreground">Hoje, 09:30 - 5 de 8 itens sincronizados</p>
                  </div>
                  <div className="space-y-1 p-2 border-l-2 border-red-500">
                    <p className="text-sm font-medium">Sincronização falhou</p>
                    <p className="text-xs text-muted-foreground">Ontem, 18:22 - Erro de conexão</p>
                  </div>
                  <div className="space-y-1 p-2 border-l-2 border-green-500">
                    <p className="text-sm font-medium">Sincronização concluída</p>
                    <p className="text-xs text-muted-foreground">Ontem, 14:55 - 12 itens sincronizados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

// Componente para gerenciar armazenamento
function StorageManager() {
  const { toast } = useToast()
  const [stats, setStats] = React.useState({
    audio: { count: 42, size: 150 },
    image: { count: 25, size: 5 },
  })
  const [isClearing, setIsClearing] = React.useState(false)

  // Carregar estatísticas ao montar o componente
  React.useEffect(() => {
    loadStats()
  }, [])

  // Função para carregar estatísticas
  async function loadStats() {
    try {
      const cacheStats = await getMediaCacheStatsByType()
      setStats(cacheStats)
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error)
      // Usar dados simulados em caso de erro
      setStats({
        audio: { count: 42, size: 150 },
        image: { count: 25, size: 5 },
      })
    }
  }

  // Limpar cache de áudio
  async function handleClearAudioCache() {
    setIsClearing(true)
    try {
      const success = await clearMediaCacheByType("audio")
      if (success) {
        toast({
          title: "Cache de áudio limpo",
          description: "Todos os arquivos de áudio foram removidos do cache.",
        })
        await loadStats()
      } else {
        toast({
          title: "Erro ao limpar cache",
          description: "Não foi possível limpar o cache de áudio.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao limpar cache de áudio:", error)
      toast({
        title: "Erro ao limpar cache",
        description: "Ocorreu um erro ao limpar o cache de áudio.",
        variant: "destructive",
      })
    } finally {
      setIsClearing(false)
    }
  }

  // Limpar cache de imagens
  async function handleClearImageCache() {
    setIsClearing(true)
    try {
      const success = await clearMediaCacheByType("image")
      if (success) {
        toast({
          title: "Cache de imagens limpo",
          description: "Todas as imagens foram removidas do cache.",
        })
        await loadStats()
      } else {
        toast({
          title: "Erro ao limpar cache",
          description: "Não foi possível limpar o cache de imagens.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao limpar cache de imagens:", error)
      toast({
        title: "Erro ao limpar cache",
        description: "Ocorreu um erro ao limpar o cache de imagens.",
        variant: "destructive",
      })
    } finally {
      setIsClearing(false)
    }
  }

  // Limpar todo o cache
  async function handleClearAllCache() {
    setIsClearing(true)
    try {
      const success = await clearAllMediaCache()
      if (success) {
        toast({
          title: "Cache limpo",
          description: "Todo o conteúdo armazenado foi removido do cache.",
        })
        await loadStats()
      } else {
        toast({
          title: "Erro ao limpar cache",
          description: "Não foi possível limpar o cache.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao limpar todo o cache:", error)
      toast({
        title: "Erro ao limpar cache",
        description: "Ocorreu um erro ao limpar o cache.",
        variant: "destructive",
      })
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo Armazenado</CardTitle>
          <CardDescription>Gerencie os recursos que estão armazenados no seu dispositivo.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Esta página exibe o conteúdo que está atualmente armazenado no seu dispositivo para uso offline.
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">Músicas</p>
                <p className="text-sm text-muted-foreground">
                  {stats.audio.count} arquivos ({stats.audio.size.toFixed(2)}MB)
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleClearAudioCache} disabled={isClearing}>
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">Imagens</p>
                <p className="text-sm text-muted-foreground">
                  {stats.image.count} arquivos ({stats.image.size.toFixed(2)}MB)
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleClearImageCache} disabled={isClearing}>
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="destructive" className="w-full" onClick={handleClearAllCache} disabled={isClearing}>
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Todo o Armazenamento
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uso de Armazenamento</CardTitle>
          <CardDescription>Veja quanto espaço está sendo usado no seu dispositivo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Espaço utilizado</span>
                <span className="text-sm font-medium">
                  {(stats.audio.size + stats.image.size).toFixed(2)} MB / 500 MB
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${Math.min(((stats.audio.size + stats.image.size) / 500) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Distribuição de armazenamento</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-2xl font-bold text-primary">{stats.audio.size.toFixed(2)}</p>
                    <p className="text-sm">MB de músicas</p>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-2xl font-bold text-primary">{stats.image.size.toFixed(2)}</p>
                    <p className="text-sm">MB de imagens</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md text-sm">
                <p className="font-medium">Limites de armazenamento</p>
                <p className="text-muted-foreground">
                  O limite padrão é de 500MB. O sistema automaticamente remove os arquivos mais antigos quando o limite
                  é atingido.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

