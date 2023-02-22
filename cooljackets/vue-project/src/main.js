import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import axios from 'axios'
import {createPinia} from 'pinia'
axios.defaults.baseURL = 'http://127.0.0.1:8000'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router,axios)

app.mount('#app')
