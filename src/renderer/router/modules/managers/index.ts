import { RouteRecordRaw } from 'vue-router'
import ManagerBaseLayout from '@/layouts/managers/Base/index.vue'

export const managerRoutes: Array<RouteRecordRaw> = [
  {
    path: '/manger',
    name: 'MangerBaseLayout',
    component: ManagerBaseLayout,
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
