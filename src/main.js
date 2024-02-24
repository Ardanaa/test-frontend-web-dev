import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'

// globally import tailwind classes
import './assets/tailwind.css'

export const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)


app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount('#app')
