// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import głównego pliku CSS
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
