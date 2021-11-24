import { RouteRecordRaw } from 'vue-router'

export const generalManagerRoutes: Array<RouteRecordRaw> = [
  {
    path: 'manager',
    name: 'ManagerGeneralLayout',
    component: () => import('@/layouts/generals/Manager/index.vue'),
    redirect: { name: 'BaseManager' },
    children: [
      {
        path: '',
        name: 'BaseManager',
        component: () => import('@/views/generals/managers/Base/index.vue'),
      },
      {
        path: 'form',
        name: 'FormManager',
        component: () => import('@/views/generals/managers/Form/index.vue'),
      },
      {
        path: 'form/edit/id/:id',
        name: 'FormEditManager',
        component: () => import('@/views/generals/managers/Form/index.vue'),
      },
    ]
  },
]
