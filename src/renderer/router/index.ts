import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { appRoutes } from './modules/apps/'

export const routes: Array<RouteRecordRaw> = [
  appRoutes,
]

export const router = createRouter({
  history: createWebHistory(''),
  routes,
})
