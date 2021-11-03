import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})
