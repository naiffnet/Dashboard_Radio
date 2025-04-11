/**
 * Gerenciador de sincronização
 * Responsável por sincronizar dados entre o IndexedDB local e o servidor
 */

import { STORES, getAll, update, remove } from "./db"

// Intervalo de sincronização em milissegundos (5 minutos)
const SYNC_INTERVAL = 5 * 60 * 1000

// Status de conexão
let isOnline = typeof navigator !== "undefined" ? navigator.onLine : true

// Status de sincronização
let isSyncing = false

// Interface para eventos de sincronização
type SyncEvent = "syncStart" | "syncComplete" | "syncError" | "onlineStatusChange"
type SyncEventCallback = (status: boolean) => void

// Mapa de callbacks de eventos
const eventListeners: { [key in SyncEvent]: SyncEventCallback[] } = {
  syncStart: [],
  syncComplete: [],
  syncError: [],
  onlineStatusChange: [],
}

// Inicializa o gerenciador de sincronização
export function initSyncManager() {
  // Adicionar event listeners para monitorar o status de conexão
  if (typeof window !== "undefined") {
    window.addEventListener("online", handleOnlineStatusChange)
    window.addEventListener("offline", handleOnlineStatusChange)

    // Iniciar sincronização periódica
    setInterval(attemptSync, SYNC_INTERVAL)

    // Tentar sincronizar imediatamente se estiver online
    if (isOnline) {
      attemptSync()
    }
  }
}

// Manipula mudanças no status de conexão
function handleOnlineStatusChange() {
  const wasOnline = isOnline
  isOnline = navigator.onLine

  if (wasOnline !== isOnline) {
    notifyListeners("onlineStatusChange", isOnline)

    // Se acabou de ficar online, tenta sincronizar
    if (isOnline) {
      attemptSync()
    }
  }
}

// Tenta sincronizar dados com o servidor
export async function attemptSync(): Promise<boolean> {
  if (!isOnline || isSyncing) {
    console.log("Sincronização adiada: " + (!isOnline ? "Offline" : "Já sincronizando"))
    return false
  }

  try {
    isSyncing = true
    notifyListeners("syncStart", true)

    // Buscar itens pendentes na fila de sincronização
    const syncQueue = await getAll(STORES.SYNC_QUEUE)

    if (syncQueue.length === 0) {
      console.log("Nada para sincronizar")
      notifyListeners("syncComplete", true)
      isSyncing = false
      return true
    }

    console.log(`Sincronizando ${syncQueue.length} itens`)

    // Aqui você implementaria a lógica para sincronizar com o servidor
    // Por exemplo, enviando os dados para uma API

    // Simulação de sincronização bem-sucedida
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Atualizar status de sincronização para os itens processados
    // Isso seria feito após a confirmação do servidor
    for (const item of syncQueue) {
      if (item.operation === "delete") {
        await remove(STORES.SYNC_QUEUE, item.id)
      } else {
        // Atualizar o status do item original para 'synced'
        const entity = item.data
        if (entity && entity.id) {
          try {
            const storeItem = await update(item.entity, {
              ...entity,
              syncStatus: "synced",
            })
            console.log(`Item ${entity.id} marcado como sincronizado`)
          } catch (error) {
            console.error(`Erro ao atualizar status do item ${entity.id}:`, error)
          }
        }

        // Remover da fila de sincronização
        await remove(STORES.SYNC_QUEUE, item.id)
      }
    }

    notifyListeners("syncComplete", true)
    isSyncing = false
    return true
  } catch (error) {
    console.error("Erro durante a sincronização:", error)
    notifyListeners("syncError", false)
    isSyncing = false
    return false
  }
}

// Força uma sincronização manualmente
export function forceSync(): Promise<boolean> {
  return attemptSync()
}

// Verifica se o dispositivo está online
export function getOnlineStatus(): boolean {
  return isOnline
}

// Verifica se está sincronizando
export function getSyncingStatus(): boolean {
  return isSyncing
}

// Obter estatísticas de sincronização
export async function getSyncStats(): Promise<{
  pendingItems: number
  lastSync: string | null
}> {
  try {
    const syncQueue = await getAll(STORES.SYNC_QUEUE)

    // Obter timestamp da última sincronização bem-sucedida
    // Aqui você poderia armazenar isso em localStorage ou no próprio IndexedDB
    const lastSyncTimestamp = localStorage.getItem("lastSuccessfulSync")

    return {
      pendingItems: syncQueue.length,
      lastSync: lastSyncTimestamp ? new Date(Number.parseInt(lastSyncTimestamp)).toLocaleString() : null,
    }
  } catch (error) {
    console.error("Erro ao obter estatísticas de sincronização:", error)
    return {
      pendingItems: 0,
      lastSync: null,
    }
  }
}

// Registrar sucesso de sincronização
export function registerSuccessfulSync(): void {
  localStorage.setItem("lastSuccessfulSync", Date.now().toString())
}

// Gerenciamento de event listeners
export function addEventListener(event: SyncEvent, callback: SyncEventCallback): void {
  if (eventListeners[event]) {
    eventListeners[event].push(callback)
  }
}

export function removeEventListener(event: SyncEvent, callback: SyncEventCallback): void {
  if (eventListeners[event]) {
    eventListeners[event] = eventListeners[event].filter((cb) => cb !== callback)
  }
}

function notifyListeners(event: SyncEvent, status: boolean): void {
  if (eventListeners[event]) {
    eventListeners[event].forEach((callback) => callback(status))
  }

  // Registrar sincronização bem-sucedida
  if (event === "syncComplete" && status) {
    registerSuccessfulSync()
  }
}

// Inicializar automaticamente se estiver no cliente
if (typeof window !== "undefined") {
  initSyncManager()
}

