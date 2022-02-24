import { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/views/apps/index.vue'

export const appRoutes: RouteRecordRaw = {
  path: '/app',
  name: 'AppLayout',
  component: AppLayout,
  redirect: { name: 'AppHome' },
  children: [
    {
      path: 'home',
      name: 'AppHome',
      component: () => import('@/views/apps/Home/index.vue'),
    },
  //
  ],
}
