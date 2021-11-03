import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { managerState, ManagerState } from './state'
import { managerGetters, ManagerGetters } from './getters'
import { managerMutations, ManagerMutations } from './mutations'
import { managerActions, ManagerActions } from './actions'

export type ManagerStore<S = ManagerState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof ManagerMutations, P extends Parameters<ManagerMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<ManagerMutations[K]>
} & {
  getters: {
    [K in keyof ManagerGetters]: ReturnType<ManagerGetters[K]>;
  }
} & {
  dispatch<K extends keyof ManagerActions>(
    key: K,
    payload?: Parameters<ManagerActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ManagerActions[K]>
}

export const managerModule: Module<ManagerState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: managerState,
  getters: managerGetters,
  mutations: managerMutations,
  actions: managerActions,
}
