/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" />

declare const self: ServiceWorkerGlobalScope
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// Take control immediately
self.skipWaiting()
clientsClaim()

// Clean up old caches
cleanupOutdatedCaches()

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST)

// Cache external resources like fonts
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || 
               url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)
