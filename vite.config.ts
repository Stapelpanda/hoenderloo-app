import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      webp: {
        quality: 80,
        alphaQuality: 80,
        force: false
      }
    }),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Hoenderloo App',
        short_name: 'Hoenderloo',
        description: 'Hoenderloo App voor speurtochten en informatie',
        theme_color: '#2196f3',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp}',
          'manifest.webmanifest'
        ],
        globDirectory: 'dist',
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024 // 50MB to ensure all images are cached
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts'
    })
  ]
})
