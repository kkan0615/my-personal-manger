import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ManagerMutations, ManagerMutationTypes } from './mutations'
import { ManagerState } from './state'
import { Manager } from '@/types/models/Manager'
import { ManagerConfig } from '@/types/models/Manager/config'

export enum ManagerActionTypes {
  SET_MANAGER = 'manager/SET_MANAGER',
  RESET_MANAGER = 'manager/RESET_MANAGER',
  SET_MANAGER_CONFIG = 'manager/SET_MANAGER_CONFIG',
  RESET_MANAGER_CONFIG = 'manager/RESET_MANAGER_CONFIG',
  SET_MESSAGE = 'manger/SET_MESSAGE',
  HELLO_MANAGER = 'manger/HELLO_MANAGER',
}

export type AugmentedActionContext = {
  commit<K extends keyof ManagerMutations>(
    key: K,
    payload: Parameters<ManagerMutations[K]>[1]
  ): ReturnType<ManagerMutations[K]>
} & Omit<ActionContext<ManagerState, RootState>, 'commit'>

export interface ManagerActions {
  [ManagerActionTypes.SET_MANAGER](
    { commit }: AugmentedActionContext,
    payload: Manager
  ): void
  [ManagerActionTypes.RESET_MANAGER](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.SET_MANAGER_CONFIG](
    { commit }: AugmentedActionContext,
    payload: ManagerConfig
  ): void
  [ManagerActionTypes.RESET_MANAGER_CONFIG](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.SET_MESSAGE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [ManagerActionTypes.HELLO_MANAGER](
    { commit }: AugmentedActionContext,
  ): void
}

export const managerActions: ActionTree<ManagerState, RootState> & ManagerActions = {
  [ManagerActionTypes.SET_MANAGER] ({ commit }, payload) {
    commit(ManagerMutationTypes.SET_MANAGER, payload)
  },
  [ManagerActionTypes.RESET_MANAGER] ({ commit }) {
    commit(ManagerMutationTypes.SET_MANAGER, {} as Manager)
  },
  [ManagerActionTypes.SET_MANAGER_CONFIG] ({ commit }, payload) {
    commit(ManagerMutationTypes.SET_MANAGER_CONFIG, payload)
  },
  [ManagerActionTypes.RESET_MANAGER_CONFIG] ({ commit }) {
    commit(ManagerMutationTypes.SET_MANAGER_CONFIG, {} as ManagerConfig)
  },
  [ManagerActionTypes.SET_MESSAGE] ({ commit }, payload) {
    // @TODO: 여러 곳에서 써야하기때문에 Action 혹은 Mutations 화 시켜두기
    commit(ManagerMutationTypes.SET_MESSAGE_TIMER, setTimeout(() => {
      commit(ManagerMutationTypes.SET_MESSAGE, '')
      commit(ManagerMutationTypes.SET_MESSAGE_TIMER, null)
    }, 2500))
    commit(ManagerMutationTypes.SET_MESSAGE, payload)
  },
  [ManagerActionTypes.HELLO_MANAGER] ({ commit, state }) {
    // @TODO: 여러 곳에서 써야하기때문에 Action 혹은 Mutations 화 시켜두기
    commit(ManagerMutationTypes.SET_MESSAGE_TIMER, setTimeout(() => {
      commit(ManagerMutationTypes.SET_MESSAGE, '')
      commit(ManagerMutationTypes.SET_MESSAGE_TIMER, null)
    }, 2500))
    commit(ManagerMutationTypes.SET_MESSAGE, `I am ${state.manager.name} Hello {{ name }} master!`)
  },
}
