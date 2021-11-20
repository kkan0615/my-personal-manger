import { MutationTree } from 'vuex'
import { ManagerState } from './state'
import { Manager, ManagerWithConfig } from '@/types/models/Manager'
import { ManagerConfig } from '@/types/models/Manager/config'

export enum ManagerMutationTypes {
  SET_MANAGER_LIST = 'manager/SET_MANAGER_LIST',
  SET_MANAGER = 'manager/SET_MANAGER',
  SET_MANAGER_CONFIG = 'manager/SET_MANAGER_CONFIG',
  SET_MESSAGE = 'manager/SET_MESSAGE',
  SET_MESSAGE_TIMER = 'manager/SET_MESSAGE_TIMER',
}
export type ManagerMutations<S = ManagerState> = {
  [ManagerMutationTypes.SET_MANAGER_LIST](state: S, payload: Array<ManagerWithConfig>): void
  [ManagerMutationTypes.SET_MANAGER](state: S, payload: Manager): void
  [ManagerMutationTypes.SET_MANAGER_CONFIG](state: S, payload: ManagerConfig): void
  [ManagerMutationTypes.SET_MESSAGE](state: S, payload: string): void
  [ManagerMutationTypes.SET_MESSAGE_TIMER](state: S, payload: NodeJS.Timeout | null): void
}

export const managerMutations: MutationTree<ManagerState> & ManagerMutations = {
  [ManagerMutationTypes.SET_MANAGER_LIST] (state, payload) {
    state.managerList = payload
  },
  [ManagerMutationTypes.SET_MANAGER] (state, payload) {
    state.manager = payload
  },
  [ManagerMutationTypes.SET_MANAGER_CONFIG] (state, payload) {
    state.config = payload
  },
  [ManagerMutationTypes.SET_MESSAGE] (state, payload) {
    state.message = payload
  },
  [ManagerMutationTypes.SET_MESSAGE_TIMER] (state, payload) {
    if (!payload && state.messageTimer) {
      clearTimeout(state.messageTimer)
    }
    state.messageTimer = payload
  },
}
