import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import { generalRoutes } from '@/router/modules/generals'
import { managerRoutes } from '@/router/modules/managers'

export const routes: Array<RouteRecordRaw> = [
  ...generalRoutes,
  ...managerRoutes,
]

export const router = createRouter({
  history: process.env.IS_DEV === 'true' ? createWebHistory('/') : createWebHashHistory('/'),
  routes,
})
