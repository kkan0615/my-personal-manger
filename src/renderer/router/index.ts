import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BaseGeneralLayout',
    component: () => import('@/layouts/generals/Base/index.vue'),
    // redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
      },
    ]
  },
  {
    path: '/manger',
    name: 'MangerBaseLayout',
    component: () => import('@/layouts/managers/Base/index.vue'),
    redirect: { name: 'OverlayManager' },
    children: [
      {
        path: '',
        name: 'OverlayManager',
        component: () => import('@/views/overlays/Manager/index.vue'),
      },
    ]
  },
]

export const router = createRouter({
  history: process.env.IS_DEV === 'true' ? createWebHistory('/') : createWebHashHistory('/'),
  routes,
})
