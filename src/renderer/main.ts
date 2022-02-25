import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
/* Styles */
import '@/styles/index.scss'
/* quasar */
import 'quasar/src/css/index.sass'


const app = createApp(App)
app
  .use(Quasar, {
    plugins: {}
  })
  .use(router)
  .use(createPinia())
  .mount('#app')

