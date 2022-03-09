import { RouteRecordRaw } from 'vue-router'
import ScheduleLayout from '@/views/schedules/index.vue'

export const scheduleRoutes: RouteRecordRaw = {
  path: '/schedule',
  name: 'ScheduleLayout',
  component: ScheduleLayout,
  redirect: { name: 'ScheduleMain' },
  children: [
    {
      path: 'main',
      name: 'ScheduleMain',
      component: () => import('@/views/schedules/Main/index.vue'),
    },
    //
  ],
}
