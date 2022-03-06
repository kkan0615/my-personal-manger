import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import '@/router/beforeRoute'
/* Styles */
import '@/styles/index.scss'
/* quasar */
import 'quasar/src/css/index.sass'
import 'animate.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'

/* Font awesome v6 */
import '@/utils/libs/fontAwesomeIcon'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app
  .use(Quasar, {
    plugins: {}
  })
  .use(createPinia())
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')

