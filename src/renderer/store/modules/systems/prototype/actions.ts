import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { PrototypeMutations, PrototypeMutationTypes } from './mutations'
import { PrototypeState } from './state'

export enum PrototypeActionTypes {
  LOAD_TEST = 'prototype/LOAD_TEST',
  RESET_TEST = 'prototype/RESET_TEST',
}

export type AugmentedActionContext = {
  commit<K extends keyof PrototypeMutations>(
    key: K,
    payload: Parameters<PrototypeMutations[K]>[1]
  ): ReturnType<PrototypeMutations[K]>
} & Omit<ActionContext<PrototypeState, RootState>, 'commit'>

export interface PrototypeActions {
  [PrototypeActionTypes.LOAD_TEST](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
  [PrototypeActionTypes.RESET_TEST](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
}

export const prototypeActions: ActionTree<PrototypeState, RootState> & PrototypeActions = {
  [PrototypeActionTypes.LOAD_TEST] ({ commit }, payload) {
    commit(PrototypeMutationTypes.SET_TEST, payload)
  },
  [PrototypeActionTypes.RESET_TEST] ({ commit }, payload) {
    commit(PrototypeMutationTypes.SET_TEST, {})
  },
}
