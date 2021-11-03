import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { PrototypeState } from '@/store/modules/systems/prototype/state'
import { prototypeModule, PrototypeStore } from '@/store/modules/systems/prototype'
import { ManagerState } from '@/store/modules/model/manager/state'
import { managerModule, ManagerStore } from '@/store/modules/model/manager'

// define your typings for the store state
export interface RootState {
  prototype: PrototypeState
  manager: ManagerState
}

export type RootStore =
  PrototypeStore<Pick<RootState, 'prototype'>> &
  ManagerStore<Pick<RootState, 'manager'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

/* Plugins */
const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    prototype: prototypeModule,
    manager: managerModule,
  }
})

/**
 * Hooks
 */
export default function useStore (): RootStore {
  return store as RootStore
}
