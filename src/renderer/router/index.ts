import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import { generalRoutes } from '@/router/modules/generals'
import { managerRoutes } from '@/router/modules/managers'
import { authRoutes } from '@/router/modules/auths'

export const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...generalRoutes,
  ...managerRoutes,
]

export const router = createRouter({
  history: process.env.IS_DEV === 'true' ? createWebHistory('/') : createWebHashHistory('/'),
  routes,
})
