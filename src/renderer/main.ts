import { createApp } from 'vue'
import App from './App.vue'
/* Router */
import { router } from '@/router'
/* Store */
import { store } from '@/store'
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
/* Tailwind */
import '@/styles/tailwind.scss'
import '@/styles/index.scss'

const app = createApp(App)
app
  .use(router)
  .use(store)
  .mount('#app')
