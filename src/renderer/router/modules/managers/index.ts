import { RouteRecordRaw } from 'vue-router'
import ManagerBaseLayout from '@/layouts/managers/Base/index.vue'

export const managerRoutes: Array<RouteRecordRaw> = [
  {
    path: '/manger',
    name: 'MangerBaseLayout',
    component: ManagerBaseLayout,
    children: [
      {
        path: '/full',
        name: 'FullManager',
        component: () => import('@/views/managers/Full/index.vue'),
      },
      {
        path: '/circle',
        name: 'CircleManager',
        component: () => import('@/views/managers/Circle/index.vue'),
      },
    ]
  },
]
