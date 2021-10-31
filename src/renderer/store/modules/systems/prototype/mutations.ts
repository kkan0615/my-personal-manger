import { MutationTree } from 'vuex'
import { PrototypeState } from './state'

export enum PrototypeMutationTypes {
  SET_TEST = 'prototype/SET_TOASTS',
}
export type PrototypeMutations<S = PrototypeState> = {
  [PrototypeMutationTypes.SET_TEST](state: S, payload: any): void
}

export const prototypeMutations: MutationTree<PrototypeState> & PrototypeMutations = {
  [PrototypeMutationTypes.SET_TEST] (state, payload) {
    state.test = payload
  },
}
