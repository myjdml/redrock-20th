import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Loading',
    component: () => import('../views/Loading')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home')
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

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   next()
// })

export default router
