import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPlguinPersistedstate from 'pinia-plugin-persistedstate'

import './styles/common.scss'
import App from './App.vue'
import router from './router'
import componentPlugin from './plugins/componentPlugin'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPlguinPersistedstate)

app.use(pinia)
app.use(router)
app.use(componentPlugin)

app.mount('#app')
