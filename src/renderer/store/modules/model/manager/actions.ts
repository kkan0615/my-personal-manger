import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ManagerMutations, ManagerMutationTypes } from './mutations'
import { ManagerState } from './state'
import { Manager } from '@/types/models/Manager'

export enum ManagerActionTypes {
  SET_MANAGER = 'manager/SET_MANAGER',
  RESET_MANAGER = 'manager/RESET_MANAGER',
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
  [ManagerActionTypes.HELLO_MANAGER] ({ commit }) {
    // @TODO: 여러 곳에서 써야하기때문에 Action 혹은 Mutations 화 시켜두기
    commit(ManagerMutationTypes.SET_MESSAGE_TIMER, setTimeout(() => {
      commit(ManagerMutationTypes.SET_MESSAGE, '')
      commit(ManagerMutationTypes.SET_MESSAGE_TIMER, null)
    }, 2500))
    commit(ManagerMutationTypes.SET_MESSAGE, 'Hello {{ name }} master!')
  },
}
