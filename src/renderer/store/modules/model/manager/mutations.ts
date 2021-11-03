import { MutationTree } from 'vuex'
import { ManagerState } from './state'
import { Manager } from '@/types/models/Manager'

export enum ManagerMutationTypes {
  SET_MANAGER = 'manager/SET_MANAGER',
  SET_MESSAGE = 'manager/SET_MESSAGE',
  SET_MESSAGE_TIMER = 'manager/SET_MESSAGE_TIMER',
}
export type ManagerMutations<S = ManagerState> = {
  [ManagerMutationTypes.SET_MANAGER](state: S, payload: Manager): void
  [ManagerMutationTypes.SET_MESSAGE](state: S, payload: string): void
  [ManagerMutationTypes.SET_MESSAGE_TIMER](state: S, payload: NodeJS.Timeout | null): void
}

export const managerMutations: MutationTree<ManagerState> & ManagerMutations = {
  [ManagerMutationTypes.SET_MANAGER] (state, payload) {
    state.manager = payload
  },
  [ManagerMutationTypes.SET_MESSAGE] (state, payload) {
    state.message = payload
  },
  [ManagerMutationTypes.SET_MESSAGE_TIMER] (state, payload) {
    state.messageTimer = payload
  },
}
