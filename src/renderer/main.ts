import { createApp } from 'vue'
import App from './App.vue'
/* Router */
import { router } from '@/router'
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
/* Tailwind */
import '@/styles/tailwind.scss'

const app = createApp(App)
app
  .use(router)
  .mount('#app')
