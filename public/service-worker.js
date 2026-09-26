// Service Worker para suporte offline do PULSO / SOS Primeiros Socorros
const CACHE_NAME = 'pulso-sos-v1'
const URLS_TO_CACHE = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE).catch(() => {
        // Ignora falhas pontuais no cacheamento inicial
      })
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(event.request).catch(() => {
        // Em caso de falha de rede para navegação HTML, retornar a raiz em cache
        if (event.request.mode === 'navigate') {
          return caches.match('/')
        }
      })
    }),
  )
})
