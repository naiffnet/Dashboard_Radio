// Service Worker melhorado para suporte offline completo do RadioHub
const APP_CACHE_NAME = "radiohub-app-v1"
const DATA_CACHE_NAME = "radiohub-data-v1"
const AUDIO_CACHE_NAME = "radiohub-audio-v1"
const IMAGE_CACHE_NAME = "radiohub-image-v1"

// URLs para serem cacheadas inicialmente
const APP_SHELL_URLS = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  "/styles/offline.css",
]

// Instala o Service Worker
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install")

  event.waitUntil(
    Promise.all([
      // Cache do App Shell (arquivos essenciais da aplicação)
      caches
        .open(APP_CACHE_NAME)
        .then((cache) => {
          console.log("[ServiceWorker] Caching app shell")
          return cache.addAll(APP_SHELL_URLS)
        }),

      // Criar outros caches
      caches.open(DATA_CACHE_NAME),
      caches.open(AUDIO_CACHE_NAME),
      caches.open(IMAGE_CACHE_NAME),
    ]),
  )

  // Forçar ativação imediata
  self.skipWaiting()
})

// Ativa o Service Worker
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate")

  // Limpar caches antigos
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          // Se for um cache antigo, remover
          if (
            key !== APP_CACHE_NAME &&
            key !== DATA_CACHE_NAME &&
            key !== AUDIO_CACHE_NAME &&
            key !== IMAGE_CACHE_NAME
          ) {
            console.log("[ServiceWorker] Removing old cache", key)
            return caches.delete(key)
          }
        }),
      )
    }),
  )

  // Garantir que o Service Worker tome controle imediato
  return self.clients.claim()
})

// Intercepta requisições fetch
self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch", event.request.url)

  // Determinar o tipo de recurso sendo requisitado
  const url = new URL(event.request.url)

  // Estratégia para API (Network First)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetchFromNetworkThenCache(event.request, DATA_CACHE_NAME))
    return
  }

  // Estratégia para arquivos de áudio (Cache First)
  if (url.pathname.endsWith(".mp3") || url.pathname.endsWith(".wav") || url.pathname.endsWith(".ogg")) {
    event.respondWith(fetchFromCacheThenNetwork(event.request, AUDIO_CACHE_NAME))
    return
  }

  // Estratégia para imagens (Cache First)
  if (
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".gif") ||
    url.pathname.endsWith(".svg")
  ) {
    event.respondWith(fetchFromCacheThenNetwork(event.request, IMAGE_CACHE_NAME))
    return
  }

  // Estratégia padrão para app shell (Cache First com fallback)
  event.respondWith(
    fetchFromCacheThenNetwork(event.request, APP_CACHE_NAME).catch(() => {
      // Se a requisição falhar (sem conexão e não está em cache)
      // verificar se é uma requisição de navegação (HTML)
      if (event.request.mode === "navigate") {
        return caches.match("/offline.html")
      }

      // Para outros recursos, retornar erro
      return new Response("Recurso não disponível offline", {
        status: 503,
        statusText: "Service Unavailable",
        headers: new Headers({ "Content-Type": "text/plain" }),
      })
    }),
  )
})

// Estratégia: Primeiro tenta rede, depois guarda no cache
async function fetchFromNetworkThenCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request)

    // Clonar resposta para armazenar no cache
    const responseToCache = networkResponse.clone()

    // Armazenar no cache (assíncrono, não aguardar)
    caches.open(cacheName).then((cache) => {
      cache.put(request, responseToCache)
    })

    return networkResponse
  } catch (error) {
    // Se falhar na rede, tentar obter do cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Se não estiver no cache, propagar o erro
    throw error
  }
}

// Estratégia: Primeiro busca no cache, se não encontrar vai para rede
async function fetchFromCacheThenNetwork(request, cacheName) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  // Se não estiver no cache, buscar na rede
  const networkResponse = await fetch(request)

  // Armazenar no cache para uso futuro
  const responseToCache = networkResponse.clone()
  caches.open(cacheName).then((cache) => {
    cache.put(request, responseToCache)
  })

  return networkResponse
}

// Atualiza o cache de um recurso quando solicitado por mensagem
self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "updateCache") {
    const { url, cacheName } = event.data

    if (url && cacheName) {
      fetch(url)
        .then((response) => {
          caches.open(cacheName).then((cache) => {
            cache.put(url, response)
            console.log(`[ServiceWorker] Cache atualizado para ${url}`)
          })
        })
        .catch((error) => {
          console.error(`[ServiceWorker] Erro ao atualizar cache para ${url}:`, error)
        })
    }
  }
})

// Evento para limpar um cache específico
self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "clearCache") {
    const { cacheName } = event.data

    if (cacheName) {
      caches.open(cacheName).then((cache) => {
        cache.keys().then((keys) => {
          keys.forEach((request) => {
            cache.delete(request)
          })
          console.log(`[ServiceWorker] Cache ${cacheName} limpo`)
        })
      })
    }
  }
})

// Adiciona suporte para notificações push
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nova notificação do RadioHub',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'RadioHub', options)
    );
  }
});

// Adiciona suporte para clicar na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

