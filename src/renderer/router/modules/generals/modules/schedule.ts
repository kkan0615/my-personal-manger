import { RouteRecordRaw } from 'vue-router'

export const generalScheduleRoutes: Array<RouteRecordRaw> = [
  {
    path: 'schedule',
    name: 'ScheduleGeneralLayout',
    component: () => import('@/layouts/generals/Schedule/index.vue'),
    redirect: { name: 'BaseManager' },
    children: [
      {
        path: '',
        name: 'BaseSchedule',
        component: () => import('@/views/generals/schedules/Base/index.vue'),
      },
      {
        path: 'form',
        name: 'FormSchedule',
        component: () => import('@/views/generals/schedules/Form/index.vue'),
      },
      {
        path: 'form/edit/id/:id',
        name: 'FormSchedule',
        component: () => import('@/views/generals/schedules/Form/index.vue'),
      },
    ]
  },
]
