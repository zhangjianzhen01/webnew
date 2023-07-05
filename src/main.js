// main.js
import { createApp } from 'vue'
import App from './App.vue'
import SerialNumberList from './assets/SerialNumberList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const routes = [
    {
        path: '/search',
        component: SerialNumberList
    },
    {
        path: '/',
        component: App
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
