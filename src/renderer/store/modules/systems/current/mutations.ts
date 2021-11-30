import { MutationTree } from 'vuex'
import { CurrentState } from './state'
import { User } from '@/types/models/User'
import { Manager } from '@/types/models/Manager'
import { ManagerConfig } from '@/types/models/Manager/config'

export enum CurrentMutationTypes {
  SET_USER = 'current/SET_USER',
  SET_MANAGER = 'current/SET_MANAGER',
  SET_MANAGER_CONFIG = 'current/SET_MANAGER_CONFIG',
}
export type CurrentMutations<S = CurrentState> = {
  [CurrentMutationTypes.SET_USER](state: S, payload: User): void
  [CurrentMutationTypes.SET_MANAGER](state: S, payload: Manager): void
  [CurrentMutationTypes.SET_MANAGER_CONFIG](state: S, payload: ManagerConfig): void
}

export const currentMutations: MutationTree<CurrentState> & CurrentMutations = {
  [CurrentMutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [CurrentMutationTypes.SET_MANAGER] (state, payload) {
    state.manager = payload
  },
  [CurrentMutationTypes.SET_MANAGER_CONFIG] (state, payload) {
    state.managerConfig = payload
  },
}
