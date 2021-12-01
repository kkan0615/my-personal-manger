import { RouteRecordRaw } from 'vue-router'

export const generalScheduleRoutes: Array<RouteRecordRaw> = [
  {
    path: 'schedule',
    name: 'ScheduleGeneralLayout',
    component: () => import('@/layouts/generals/schedules/Base/index.vue'),
    redirect: { name: 'BaseSchedule' },
    children: [
      {
        path: 'list',
        name: 'BaseSchedule',
        component: () => import('@/views/generals/schedules/Base/index.vue'),
      },
      {
        path: 'id/:id',
        name: 'DetailSchedule',
        component: () => import('@/views/generals/schedules/Base/index.vue'),
      },
      {
        path: 'form',
        name: 'FormSchedule',
        component: () => import('@/views/generals/schedules/Form/index.vue'),
      },
      {
        path: 'form/edit/id/:id',
        name: 'FormEditSchedule',
        component: () => import('@/views/generals/schedules/Form/index.vue'),
      },
    ]
  },
]
