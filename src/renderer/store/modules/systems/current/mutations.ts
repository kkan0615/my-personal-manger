import { MutationTree } from 'vuex'
import { CurrentState } from './state'
import { User } from '@/types/models/User'
import { Manager } from '@/types/models/Manager'

export enum CurrentMutationTypes {
  SET_USER = 'current/SET_USER',
  SET_MANAGER = 'current/SET_MANAGER',
}
export type CurrentMutations<S = CurrentState> = {
  [CurrentMutationTypes.SET_USER](state: S, payload: User): void
  [CurrentMutationTypes.SET_MANAGER](state: S, payload: Manager): void
}

export const currentMutations: MutationTree<CurrentState> & CurrentMutations = {
  [CurrentMutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [CurrentMutationTypes.SET_MANAGER] (state, payload) {
    state.manager = payload
  },
}
