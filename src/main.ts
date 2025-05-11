import { createApp, provide } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { championService } from '@/services/championService'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.provide('championService', championService)

app.mount('#app')
