// Recovery worker for the former incomplete, cache-first installation.
// Keep this URL available so existing installations can remove the old cache.
// No fetch interception: each new visit receives the current deployment.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys()
    await Promise.all(names.filter(name => name === 'pulso-sos-v1').map(name => caches.delete(name)))
    await self.clients.claim()
    await self.registration.unregister()
  })())
})
