import { createApp } from 'vue'
import App from './app.vue'
import utils from './utils';
import router from './router/index.js'
import store from './store/index.js'
import './assets/scss/index.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(utils)
app.mount('#app')