import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { PrototypeState } from '@/store/modules/systems/prototype/state'
import { prototypeModule, PrototypeStore } from '@/store/modules/systems/prototype'
import { ManagerState } from '@/store/modules/model/manager/state'
import { managerModule, ManagerStore } from '@/store/modules/model/manager'
import { ApplicationState } from '@/store/modules/systems/application/state'
import { applicationModule, ApplicationStore } from '@/store/modules/systems/application'
import { CurrentState } from '@/store/modules/systems/current/state'
import { currentModule, CurrentStore } from '@/store/modules/systems/current'
import { ScheduleState } from '@/store/modules/model/schedule/state'
import { scheduleModule, ScheduleStore } from '@/store/modules/model/schedule'

// define your typings for the store state
export interface RootState {
  prototype: PrototypeState
  application: ApplicationState
  current: CurrentState
  manager: ManagerState
  schedule: ScheduleState
}

export type RootStore =
  PrototypeStore<Pick<RootState, 'prototype'>> &
  ApplicationStore<Pick<RootState, 'application'>> &
  CurrentStore<Pick<RootState, 'current'>> &
  ManagerStore<Pick<RootState, 'manager'>> &
  ScheduleStore<Pick<RootState, 'schedule'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

/* Plugins */
const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    prototype: prototypeModule,
    application: applicationModule,
    current: currentModule,
    manager: managerModule,
    schedule: scheduleModule,
  }
})

/**
 * Hooks
 */
export default function useStore (): RootStore {
  return store as RootStore
}
