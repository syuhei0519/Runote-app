// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router' // ← ルーターを import

const app = createApp(App)
app.use(router) // ← Router を Vue アプリに登録
app.mount('#app')