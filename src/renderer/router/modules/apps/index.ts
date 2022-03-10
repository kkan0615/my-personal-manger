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
    {
      path: 'manager',
      name: 'AppManagerLayout',
      component: () => import('@/views/apps/managers/index.vue'),
      children: [
        {
          path: 'main',
          name: 'AppManagerMain',
          component: () => import('@/views/apps/managers/Main/index.vue'),
        },
      ]
    },
    {
      path: 'schedule',
      name: 'AppScheduleLayout',
      component: () => import('@/views/apps/schedules/index.vue'),
      children: [
        {
          path: 'main',
          name: 'AppScheduleMain',
          component: () => import('@/views/apps/schedules/Main/index.vue'),
        },
      ]
    },
    {
      path: 'setting',
      name: 'AppSettingLayout',
      component: () => import('@/views/apps/settings/index.vue'),
      children: [
        {
          path: 'main',
          name: 'AppSettingMain',
          component: () => import('@/views/apps/settings/Main/index.vue'),
        },
      ]
    },
  ],
}
