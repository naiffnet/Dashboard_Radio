"use client"

import { useState, useEffect } from "react"
import { WifiOff, Database, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useOfflineMode } from "@/hooks/use-offline-mode"
import { forceSync } from "@/lib/sync-manager"
import { getCacheSize } from "@/lib/media-storage"

export function OfflineIndicator() {
  const { isOffline, syncPending } = useOfflineMode()
  const [cacheSize, setCacheSize] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [syncAttempting, setSyncAttempting] = useState(false)

  useEffect(() => {
    const updateCacheSize = async () => {
      try {
        const size = await getCacheSize()
        setCacheSize(size)
      } catch (error) {
        console.error("Erro ao obter tamanho do cache:", error)
        setCacheSize(0)
      }
    }

    updateCacheSize()

    // Atualizar tamanho do cache periodicamente
    const interval = setInterval(updateCacheSize, 60000) // a cada minuto

    return () => clearInterval(interval)
  }, [])

  const handleSync = async () => {
    setSyncAttempting(true)
    try {
      await forceSync()
    } catch (error) {
      console.error("Erro ao forçar sincronização:", error)
    } finally {
      setSyncAttempting(false)
    }
  }

  if (!isOffline && !syncPending && !showDetails) return null

  return (
    <Alert
      variant={isOffline ? "destructive" : "default"}
      className="fixed bottom-4 left-4 z-50 max-w-md transition-all duration-300 shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {isOffline ? (
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>Você está offline</AlertTitle>
            </div>
          ) : syncPending ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <AlertTitle>Sincronizando dados...</AlertTitle>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <AlertTitle>Modo Offline Disponível</AlertTitle>
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="h-7 w-7 p-0">
            {showDetails ? "-" : "+"}
          </Button>
        </div>

        <AlertDescription>
          {isOffline
            ? "Continuando com funcionalidades offline. Seus dados serão sincronizados quando a conexão for restabelecida."
            : syncPending
              ? "Sincronizando alterações feitas enquanto você estava offline."
              : "Dados disponíveis para uso offline."}
        </AlertDescription>

        {showDetails && (
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Armazenamento local:</span>
              <span>{cacheSize.toFixed(2)} MB</span>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Uso de cache:</span>
                <span>{Math.min(Math.round((cacheSize / 500) * 100), 100)}%</span>
              </div>
              <Progress value={Math.min((cacheSize / 500) * 100, 100)} className="h-1" />
            </div>

            {isOffline && (
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => window.location.reload()}>
                Verificar conexão
              </Button>
            )}

            {!isOffline && !syncPending && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={handleSync}
                disabled={syncAttempting}
              >
                {syncAttempting ? (
                  <>
                    <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Sincronizar agora
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </Alert>
  )
}

