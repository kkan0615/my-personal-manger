import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { PrototypeState } from '@/store/modules/systems/prototype/state'
import { prototypeModule, PrototypeStore } from '@/store/modules/systems/prototype'

// define your typings for the store state
export interface RootState {
  prototype: PrototypeState
}

export type RootStore =
  PrototypeStore<Pick<RootState, 'prototype'>>
  // ApplicationStore<Pick<RootState, 'application'>> &
  // CurrentStore<Pick<RootState, 'current'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

/* Plugins */
const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    prototype: prototypeModule,
  }
})

/**
 * Hooks
 */
export default function useStore (): RootStore {
  return store as RootStore
}
