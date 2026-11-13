import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null, // registered in main.ts
      manifest: {
        id: '/xfin',
        name: 'XFin',
        short_name: 'XFin',
        description: 'Record Expense and Income entries in ERPNext',
        start_url: '/xfin',
        scope: '/xfin',
        display: 'standalone',
        theme_color: '#1f6feb',
        background_color: '#ffffff',
        icons: [
          { src: '/assets/xfin_pwa/manifest/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/assets/xfin_pwa/manifest/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/assets/xfin_pwa/manifest/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // cache the built JS/CSS only; the page and /api always come from the server
        globPatterns: ['**/*.{js,css,woff2,svg,png}'],
        navigateFallback: null
      }
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  build: {
    outDir: '../xfin_pwa/public/frontend',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500
  },
  server: {
    port: 8080,
    host: true,
    proxy: {
      '^/(app|desk|login|api|assets|files|private)': {
        target: `http://127.0.0.1:${getWebserverPort()}`,
        ws: true,
        // keep the Host header so Frappe picks the right site (e.g. dj.com:8080 → dj.com)
        router: (req) => `http://${String(req.headers.host).split(':')[0]}:${getWebserverPort()}`
      }
    }
  }
})

/** Read webserver_port from the bench's common_site_config.json (default 8000). */
function getWebserverPort(): number {
  let dir = path.resolve('.')
  while (dir !== path.dirname(dir)) {
    const config = path.join(dir, 'sites', 'common_site_config.json')
    if (fs.existsSync(config)) {
      return JSON.parse(fs.readFileSync(config, 'utf8')).webserver_port ?? 8000
    }
    dir = path.dirname(dir)
  }
  return 8000
}
