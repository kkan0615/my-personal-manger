import { RouteRecordRaw } from 'vue-router'
import { generalManagerRoutes } from '@/router/modules/generals/modules/manager'
import BaseGeneralLayout from '@/layouts/generals/Base/index.vue'

export const generalRoutes: Array<RouteRecordRaw> = [
  {
    path: '/general',
    name: 'BaseGeneralLayout',
    component: BaseGeneralLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/generals/Home/index.vue'),
      },
      ...generalManagerRoutes, // Manager Module
      ...generalManagerRoutes, // Schedule Module
    ]
  },
]
