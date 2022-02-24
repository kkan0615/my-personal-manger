import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import '@/styles/index.scss'

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .mount('#app')

