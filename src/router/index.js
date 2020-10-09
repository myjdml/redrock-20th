import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/loading',
    name: 'Loading',
    component: () => import('../views/Loading')
  },
  {
    path: '/qr-code',
    name: 'QRCode',
    component: () => import('../views/QRCode')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game')
  },
  {
    path: '/text',
    name: 'Text',
    component: () => import('../components/Text')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
