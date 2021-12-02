import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { scheduleState, ScheduleState } from './state'
import { scheduleGetters, ScheduleGetters } from './getters'
import { scheduleMutations, PrototypeMutations } from './mutations'
import { scheduleActions, ScheduleActions } from './actions'

export type ScheduleStore<S = ScheduleState> = Omit<
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
    [K in keyof ScheduleGetters]: ReturnType<ScheduleGetters[K]>;
  }
} & {
  dispatch<K extends keyof ScheduleActions>(
    key: K,
    payload?: Parameters<ScheduleActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ScheduleActions[K]>
}

export const scheduleModule: Module<ScheduleState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: scheduleState,
  getters: scheduleGetters,
  mutations: scheduleMutations,
  actions: scheduleActions,
}
