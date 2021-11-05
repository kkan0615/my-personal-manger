import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/manger',
    name: 'OverlayManager',
    component: () => import('@/views/overlays/Manager/index.vue'),
  },
]

console.log(process.env.IS_DEV === 'true')
export const router = createRouter({
  history: process.env.IS_DEV === 'true' ? createWebHistory() : createWebHashHistory(),
  routes,
})
