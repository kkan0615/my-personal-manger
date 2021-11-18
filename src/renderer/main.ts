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
/* Vue calendar */
import VCalendar from 'v-calendar'
/* I18n localization */
import i18n from '@/locales'

const app = createApp(App)
app
  .use(i18n)
  .use(VCalendar)
  .use(router)
  .use(store)
  .mount('#app')
