import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { prototypeState, PrototypeState } from './state'
import { prototypeGetters, PrototypeGetters } from './getters'
import { prototypeMutations, PrototypeMutations } from './mutations'
import { prototypeActions, PrototypeActions } from './actions'

export type PrototypeStore<S = PrototypeState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof PrototypeMutations, P extends Parameters<PrototypeMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<PrototypeMutations[K]>
} & {
  getters: {
    [K in keyof PrototypeGetters]: ReturnType<PrototypeGetters[K]>;
  }
} & {
  dispatch<K extends keyof PrototypeActions>(
    key: K,
    payload?: Parameters<PrototypeActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<PrototypeActions[K]>
}

export const prototypeModule: Module<PrototypeState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: prototypeState,
  getters: prototypeGetters,
  mutations: prototypeMutations,
  actions: prototypeActions,
}
