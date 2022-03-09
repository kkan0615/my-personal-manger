import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import { appRoutes } from './modules/apps/'
import { managerRoutes } from '@/router/modules/managers'
import { scheduleRoutes } from '@/router/modules/schdules'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppIndex',
    component: () => import('@/views/index.vue'),
  },
  managerRoutes,
  appRoutes,
  scheduleRoutes,
]

export const router = createRouter({
  history: process.env.IS_DEV === 'true' ? createWebHistory('') : createWebHashHistory('/'),
  routes,
})
