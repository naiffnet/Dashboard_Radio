/**
 * Banco de dados IndexedDB para armazenamento local
 * Este módulo gerencia o armazenamento de dados offline do RadioHub
 */

const DB_NAME = "radiohub-db"
const DB_VERSION = 1

// Definição de tabelas
const STORES = {
  SONGS: "songs",
  PLAYLISTS: "playlists",
  EFFECTS: "effects",
  BROADCASTS: "broadcasts",
  SCHEDULE: "schedule",
  MESSAGES: "messages",
  SETTINGS: "settings",
  SYNC_QUEUE: "syncQueue",
}

// Interface para entidades que precisam de sincronização
interface SyncableEntity {
  id: string | number
  syncStatus?: "synced" | "pending" | "error"
  lastModified?: number
}

// Inicializa o banco de dados
export async function initDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      console.error("Seu navegador não suporta IndexedDB")
      reject(new Error("IndexedDB não suportado"))
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      console.error("Erro ao abrir o banco de dados:", event)
      reject(new Error("Falha ao abrir o banco de dados"))
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      console.log("Banco de dados inicializado com sucesso")
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Criar as tabelas (object stores)
      if (!db.objectStoreNames.contains(STORES.SONGS)) {
        const songsStore = db.createObjectStore(STORES.SONGS, { keyPath: "id" })
        songsStore.createIndex("title", "title", { unique: false })
        songsStore.createIndex("artist", "artist", { unique: false })
        songsStore.createIndex("syncStatus", "syncStatus", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.PLAYLISTS)) {
        const playlistsStore = db.createObjectStore(STORES.PLAYLISTS, { keyPath: "id" })
        playlistsStore.createIndex("name", "name", { unique: false })
        playlistsStore.createIndex("syncStatus", "syncStatus", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.EFFECTS)) {
        const effectsStore = db.createObjectStore(STORES.EFFECTS, { keyPath: "id" })
        effectsStore.createIndex("name", "name", { unique: false })
        effectsStore.createIndex("category", "category", { unique: false })
        effectsStore.createIndex("syncStatus", "syncStatus", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.BROADCASTS)) {
        const broadcastsStore = db.createObjectStore(STORES.BROADCASTS, { keyPath: "id" })
        broadcastsStore.createIndex("date", "date", { unique: false })
        broadcastsStore.createIndex("program", "program", { unique: false })
        broadcastsStore.createIndex("syncStatus", "syncStatus", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.SCHEDULE)) {
        const scheduleStore = db.createObjectStore(STORES.SCHEDULE, { keyPath: "id" })
        scheduleStore.createIndex("day", "day", { unique: false })
        scheduleStore.createIndex("time", "time", { unique: false })
        scheduleStore.createIndex("program", "program", { unique: false })
        scheduleStore.createIndex("syncStatus", "syncStatus", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.MESSAGES)) {
        const messagesStore = db.createObjectStore(STORES.MESSAGES, { keyPath: "id" })
        messagesStore.createIndex("sender", "sender", { unique: false })
        messagesStore.createIndex("time", "time", { unique: false })
        messagesStore.createIndex("syncStatus", "syncStatus", { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: "id" })
      }

      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        const syncQueueStore = db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: "id", autoIncrement: true })
        syncQueueStore.createIndex("entity", "entity", { unique: false })
        syncQueueStore.createIndex("operation", "operation", { unique: false })
        syncQueueStore.createIndex("timestamp", "timestamp", { unique: false })
      }
    }
  })
}

// Funções genéricas para manipulação do banco de dados
export async function add<T extends SyncableEntity>(storeName: string, item: T): Promise<T> {
  const db = await getDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)

    // Marcar como pendente de sincronização
    const itemWithSync = {
      ...item,
      syncStatus: "pending",
      lastModified: Date.now(),
    }

    const request = store.add(itemWithSync)

    request.onsuccess = () => {
      // Adicionar à fila de sincronização
      addToSyncQueue(storeName, "add", itemWithSync)
      resolve(itemWithSync)
    }

    request.onerror = () => {
      reject(new Error(`Falha ao adicionar item à tabela ${storeName}`))
    }
  })
}

export async function update<T extends SyncableEntity>(storeName: string, item: T): Promise<T> {
  const db = await getDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)

    // Marcar como pendente de sincronização
    const itemWithSync = {
      ...item,
      syncStatus: "pending",
      lastModified: Date.now(),
    }

    const request = store.put(itemWithSync)

    request.onsuccess = () => {
      // Adicionar à fila de sincronização
      addToSyncQueue(storeName, "update", itemWithSync)
      resolve(itemWithSync)
    }

    request.onerror = () => {
      reject(new Error(`Falha ao atualizar item na tabela ${storeName}`))
    }
  })
}

export async function remove(storeName: string, id: string | number): Promise<void> {
  const db = await getDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)

    const request = store.delete(id)

    request.onsuccess = () => {
      // Adicionar à fila de sincronização
      addToSyncQueue(storeName, "delete", { id })
      resolve()
    }

    request.onerror = () => {
      reject(new Error(`Falha ao excluir item da tabela ${storeName}`))
    }
  })
}

export async function get<T>(storeName: string, id: string | number): Promise<T | null> {
  const db = await getDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)

    const request = store.get(id)

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    request.onerror = () => {
      reject(new Error(`Falha ao buscar item da tabela ${storeName}`))
    }
  })
}

export async function getAll<T>(storeName: string): Promise<T[]> {
  const db = await getDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)

    const request = store.getAll()

    request.onsuccess = () => {
      resolve(request.result || [])
    }

    request.onerror = () => {
      reject(new Error(`Falha ao buscar itens da tabela ${storeName}`))
    }
  })
}

export async function query<T>(storeName: string, indexName: string, value: any): Promise<T[]> {
  const db = await getDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly")
    const store = transaction.objectStore(storeName)
    const index = store.index(indexName)

    const request = index.getAll(value)

    request.onsuccess = () => {
      resolve(request.result || [])
    }

    request.onerror = () => {
      reject(new Error(`Falha ao realizar consulta na tabela ${storeName}`))
    }
  })
}

// Fila de sincronização
async function addToSyncQueue(entity: string, operation: "add" | "update" | "delete", data: any): Promise<void> {
  const db = await getDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.SYNC_QUEUE, "readwrite")
    const store = transaction.objectStore(STORES.SYNC_QUEUE)

    const syncItem = {
      entity,
      operation,
      data,
      timestamp: Date.now(),
      attempts: 0,
    }

    const request = store.add(syncItem)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = () => {
      console.error("Erro ao adicionar item à fila de sincronização")
      reject()
    }
  })
}

// Cache de conexão com o banco de dados
let dbInstance: IDBDatabase | null = null

export async function getDatabase(): Promise<IDBDatabase> {
  if (dbInstance) {
    return dbInstance
  }

  try {
    dbInstance = await initDatabase()
    return dbInstance
  } catch (error) {
    console.error("Erro ao obter instância do banco de dados:", error)
    throw error
  }
}

// Limpar todo o banco de dados
export async function clearDatabase(): Promise<void> {
  const db = await getDatabase()
  const storeNames = Object.values(STORES)

  const promises = storeNames.map((storeName) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite")
      const store = transaction.objectStore(storeName)

      const request = store.clear()

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`Falha ao limpar a tabela ${storeName}`))
      }
    })
  })

  await Promise.all(promises)
  console.log("Banco de dados limpo com sucesso")
}

// Obter estatísticas do banco de dados
export async function getDatabaseStats(): Promise<{ [store: string]: number }> {
  const db = await getDatabase()
  const storeNames = Object.values(STORES)
  const stats: { [store: string]: number } = {}

  const promises = storeNames.map((storeName) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly")
      const store = transaction.objectStore(storeName)

      const countRequest = store.count()

      countRequest.onsuccess = () => {
        stats[storeName] = countRequest.result
        resolve()
      }

      countRequest.onerror = () => {
        reject(new Error(`Falha ao contar itens na tabela ${storeName}`))
      }
    })
  })

  await Promise.all(promises)
  return stats
}

// Exportar constantes e tipos
export { STORES }
export type { SyncableEntity }

