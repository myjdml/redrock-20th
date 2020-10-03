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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
