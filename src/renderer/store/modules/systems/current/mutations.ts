import { MutationTree } from 'vuex'
import { CurrentState } from './state'
import { User } from '@/types/models/User'

export enum CurrentMutationTypes {
  SET_USER = 'current/SET_USER',
}
export type CurrentMutations<S = CurrentState> = {
  [CurrentMutationTypes.SET_USER](state: S, payload: User): void
}

export const currentMutations: MutationTree<CurrentState> & CurrentMutations = {
  [CurrentMutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
}
