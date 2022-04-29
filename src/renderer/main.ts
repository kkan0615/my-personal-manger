import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import '@/router/beforeRoute'
/* Styles */
import '@/styles/index.scss'
/* quasar */
import 'quasar/src/css/index.sass'
/* Animate css  */
// @ref: https://animate.style/
import 'animate.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'

/* Font awesome v6 */
import '@/utils/libs/fontAwesomeIcon'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* Dayjs */
import { initDayjsPlugins } from '@/utils/libs/dayjs'
initDayjsPlugins()

const app = createApp(App)
app
  .use(Quasar, {
    plugins: {
      Notify
    }
  })
  .use(createPinia())
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')

