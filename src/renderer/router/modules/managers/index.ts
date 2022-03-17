import { RouteRecordRaw } from 'vue-router'
import ManagerLayout from '@/views/managers/index.vue'

export const managerRoutes: RouteRecordRaw = {
  path: '/manager',
  name: 'ManagerLayout',
  component: ManagerLayout,
  redirect: { name: 'ManagerMain' },
  children: [
    {
      path: 'main',
      name: 'ManagerMain',
      component: () => import('@/views/managers/Main/index.vue'),
    },
  ],
}
