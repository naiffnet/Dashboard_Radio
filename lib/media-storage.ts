// Constantes para nomes de cache
const AUDIO_CACHE_NAME = "radiohub-audio-cache"
const IMAGE_CACHE_NAME = "radiohub-image-cache"
const METADATA_CACHE_NAME = "radiohub-metadata-cache"

// Interface para metadados de mídia
interface MediaMetadata {
  url: string
  type: "audio" | "image"
  size: number // em bytes
  timestamp: number
  title?: string
  artist?: string
}

/**
 * Verifica se a API Cache está disponível no navegador
 */
function isCacheAvailable(): boolean {
  return typeof caches !== "undefined"
}

/**
 * Armazena um arquivo de áudio para uso offline
 * @param url URL do arquivo de áudio
 * @param metadata Metadados opcionais do áudio
 * @returns Promise<boolean> Indica se o armazenamento foi bem-sucedido
 */
export async function storeAudio(url: string, metadata?: { title?: string; artist?: string }): Promise<boolean> {
  if (!isCacheAvailable()) {
    console.warn("Cache API não disponível neste navegador")
    return false
  }

  try {
    // Busca o arquivo
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Falha ao buscar áudio: ${response.statusText}`)
    }

    // Clona a resposta para armazenar no cache
    const responseClone = response.clone()

    // Armazena no cache de áudio
    const audioCache = await caches.open(AUDIO_CACHE_NAME)
    await audioCache.put(url, responseClone)

    // Armazena metadados
    const contentLength = Number.parseInt(response.headers.get("content-length") || "0", 10)
    const size = contentLength || (await response.blob()).size

    await storeMediaMetadata({
      url,
      type: "audio",
      size,
      timestamp: Date.now(),
      title: metadata?.title,
      artist: metadata?.artist,
    })

    return true
  } catch (error) {
    console.error("Erro ao armazenar áudio:", error)
    return false
  }
}

/**
 * Armazena uma imagem para uso offline
 * @param url URL da imagem
 * @returns Promise<boolean> Indica se o armazenamento foi bem-sucedido
 */
export async function storeImage(url: string): Promise<boolean> {
  if (!isCacheAvailable()) {
    console.warn("Cache API não disponível neste navegador")
    return false
  }

  try {
    // Busca a imagem
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Falha ao buscar imagem: ${response.statusText}`)
    }

    // Clona a resposta para armazenar no cache
    const responseClone = response.clone()

    // Armazena no cache de imagens
    const imageCache = await caches.open(IMAGE_CACHE_NAME)
    await imageCache.put(url, responseClone)

    // Armazena metadados
    const contentLength = Number.parseInt(response.headers.get("content-length") || "0", 10)
    const size = contentLength || (await response.blob()).size

    await storeMediaMetadata({
      url,
      type: "image",
      size,
      timestamp: Date.now(),
    })

    return true
  } catch (error) {
    console.error("Erro ao armazenar imagem:", error)
    return false
  }
}

/**
 * Armazena metadados de mídia no cache
 * @param metadata Metadados da mídia
 */
async function storeMediaMetadata(metadata: MediaMetadata): Promise<void> {
  if (!isCacheAvailable()) return

  try {
    // Obtém o cache de metadados
    const metadataCache = await caches.open(METADATA_CACHE_NAME)

    // Cria uma chave única para os metadados
    const metadataKey = `metadata-${metadata.url}`

    // Armazena os metadados como JSON
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" })
    const metadataResponse = new Response(metadataBlob)

    await metadataCache.put(metadataKey, metadataResponse)
  } catch (error) {
    console.error("Erro ao armazenar metadados:", error)
  }
}

/**
 * Obtém todos os metadados de mídia armazenados
 * @returns Promise<MediaMetadata[]> Lista de metadados
 */
async function getAllMediaMetadata(): Promise<MediaMetadata[]> {
  if (!isCacheAvailable()) {
    return []
  }

  try {
    const metadataCache = await caches.open(METADATA_CACHE_NAME)
    const requests = await metadataCache.keys()
    const metadataList: MediaMetadata[] = []

    for (const request of requests) {
      const response = await metadataCache.match(request)
      if (response) {
        try {
          const metadata = await response.json()
          metadataList.push(metadata)
        } catch (e) {
          console.error("Erro ao processar metadados:", e)
        }
      }
    }

    return metadataList
  } catch (error) {
    console.error("Erro ao obter metadados:", error)
    return []
  }
}

/**
 * Limpa todo o cache de mídia
 * @returns Promise<boolean> Indica se a limpeza foi bem-sucedida
 */
export async function clearAllMediaCache(): Promise<boolean> {
  if (!isCacheAvailable()) {
    console.warn("Cache API não disponível neste navegador")
    return false
  }

  try {
    // Limpa todos os caches
    await Promise.all([
      caches.delete(AUDIO_CACHE_NAME),
      caches.delete(IMAGE_CACHE_NAME),
      caches.delete(METADATA_CACHE_NAME),
    ])

    return true
  } catch (error) {
    console.error("Erro ao limpar cache:", error)
    return false
  }
}

/**
 * Limpa o cache de mídia por tipo
 * @param type Tipo de mídia ('audio' ou 'image')
 * @returns Promise<boolean> Indica se a limpeza foi bem-sucedida
 */
export async function clearMediaCacheByType(type: "audio" | "image"): Promise<boolean> {
  if (!isCacheAvailable()) {
    console.warn("Cache API não disponível neste navegador")
    return false
  }

  try {
    const cacheName = type === "audio" ? AUDIO_CACHE_NAME : IMAGE_CACHE_NAME

    // Obtém metadados para encontrar URLs a serem removidas
    const allMetadata = await getAllMediaMetadata()
    const metadataToRemove = allMetadata.filter((item) => item.type === type)

    // Limpa o cache específico
    await caches.delete(cacheName)

    // Remove metadados associados
    if (metadataToRemove.length > 0) {
      const metadataCache = await caches.open(METADATA_CACHE_NAME)

      for (const metadata of metadataToRemove) {
        const metadataKey = `metadata-${metadata.url}`
        await metadataCache.delete(metadataKey)
      }
    }

    return true
  } catch (error) {
    console.error(`Erro ao limpar cache de ${type}:`, error)
    return false
  }
}

/**
 * Obtém estatísticas de cache por tipo de mídia
 * @returns Promise<Record<string, { count: number, size: number }>> Estatísticas por tipo
 */
export async function getMediaCacheStatsByType(): Promise<Record<string, { count: number; size: number }>> {
  if (!isCacheAvailable()) {
    // Retorna dados simulados se o cache não estiver disponível
    return {
      audio: { count: 0, size: 0 },
      image: { count: 0, size: 0 },
    }
  }

  try {
    const allMetadata = await getAllMediaMetadata()

    // Agrupa por tipo e calcula estatísticas
    const stats = {
      audio: { count: 0, size: 0 },
      image: { count: 0, size: 0 },
    }

    for (const item of allMetadata) {
      if (item.type === "audio") {
        stats.audio.count++
        stats.audio.size += item.size / (1024 * 1024) // Converte bytes para MB
      } else if (item.type === "image") {
        stats.image.count++
        stats.image.size += item.size / (1024 * 1024) // Converte bytes para MB
      }
    }

    return stats
  } catch (error) {
    console.error("Erro ao obter estatísticas de cache:", error)
    // Retorna dados simulados em caso de erro
    return {
      audio: { count: 0, size: 0 },
      image: { count: 0, size: 0 },
    }
  }
}

/**
 * Obtém o tamanho total do cache em MB
 * @returns Promise<number> Tamanho do cache em MB
 */
export async function getCacheSize(): Promise<number> {
  if (!isCacheAvailable()) {
    // Retorna um valor simulado se o cache não estiver disponível
    return 0
  }

  try {
    const allMetadata = await getAllMediaMetadata()

    // Soma o tamanho de todos os itens
    const totalSizeBytes = allMetadata.reduce((total, item) => total + item.size, 0)

    // Converte bytes para MB
    const totalSizeMB = totalSizeBytes / (1024 * 1024)

    return totalSizeMB
  } catch (error) {
    console.error("Erro ao calcular tamanho do cache:", error)
    return 0
  }
}

