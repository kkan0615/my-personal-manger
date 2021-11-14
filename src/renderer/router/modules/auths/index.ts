import { RouteRecordRaw } from 'vue-router'
import BaseAuthLayout from '@/layouts/auths/Base/index.vue'

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'BaseAuthLayout',
    component: BaseAuthLayout,
    children: [
      {
        path: 'register',
        name: 'RegisterAuth',
        component: () => import('@/views/auths/Register/index.vue'),
      },
    ]
  },
]
