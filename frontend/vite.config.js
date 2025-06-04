import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true,              // ← Dockerから外部アクセス許可
    port: 5173,
    watch: {
      usePolling: true       // ← Docker内でのホットリロード対応
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://app:8000', // Laravelコンテナ名 + ポート
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // }
  }
})
