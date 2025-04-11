"use client"

import { useState, useEffect } from "react"
import { getOnlineStatus, addEventListener, removeEventListener } from "@/lib/sync-manager"
import { initDatabase } from "@/lib/db"

export function useOfflineMode() {
  const [isOffline, setIsOffline] = useState(false)
  const [isDBInitialized, setIsDBInitialized] = useState(false)
  const [syncPending, setSyncPending] = useState(false)

  // Inicializar banco de dados
  useEffect(() => {
    const initDB = async () => {
      try {
        await initDatabase()
        setIsDBInitialized(true)
      } catch (error) {
        console.error("Erro ao inicializar banco de dados:", error)
      }
    }

    initDB()
  }, [])

  // Monitorar status de conexão
  useEffect(() => {
    const handleOnlineStatusChange = (online: boolean) => {
      setIsOffline(!online)
    }

    // Verificar status inicial
    setIsOffline(!getOnlineStatus())

    // Adicionar event listeners
    addEventListener("onlineStatusChange", handleOnlineStatusChange)
    addEventListener("syncStart", () => setSyncPending(true))
    addEventListener("syncComplete", () => setSyncPending(false))
    addEventListener("syncError", () => setSyncPending(false))

    return () => {
      removeEventListener("onlineStatusChange", handleOnlineStatusChange)
      removeEventListener("syncStart", () => {})
      removeEventListener("syncComplete", () => {})
      removeEventListener("syncError", () => {})
    }
  }, [])

  return {
    isOffline,
    isDBInitialized,
    syncPending,
  }
}

