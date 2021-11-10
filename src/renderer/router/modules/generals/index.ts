import { RouteRecordRaw } from 'vue-router'
import BaseGeneralLayout from '@/layouts/generals/Base/index.vue'
import { generalManagerRoutes } from '@/router/modules/generals/modules/manager'

export const generalRoutes: Array<RouteRecordRaw> = [
  {
    path: '/general',
    name: 'BaseGeneralLayout',
    component: BaseGeneralLayout,
    // redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/generals/Home/index.vue'),
      },
      ...generalManagerRoutes,
    ]
  },
]
