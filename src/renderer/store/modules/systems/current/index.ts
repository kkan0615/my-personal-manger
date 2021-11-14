import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { currentState, CurrentState } from './state'
import { currentGetters, CurrentGetters } from './getters'
import { currentMutations, CurrentMutations } from './mutations'
import { currentActions, CurrentActions } from './actions'

export type CurrentStore<S = CurrentState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof CurrentMutations, P extends Parameters<CurrentMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<CurrentMutations[K]>
} & {
  getters: {
    [K in keyof CurrentGetters]: ReturnType<CurrentGetters[K]>;
  }
} & {
  dispatch<K extends keyof CurrentActions>(
    key: K,
    payload?: Parameters<CurrentActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<CurrentActions[K]>
}

export const currentModule: Module<CurrentState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: currentState,
  getters: currentGetters,
  mutations: currentMutations,
  actions: currentActions,
}
