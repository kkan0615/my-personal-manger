import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { PrototypeMutations, PrototypeMutationTypes } from './mutations'
import { PrototypeState } from './state'

export enum PrototypeActionTypes {
  ADD_TEST = 'prototype/ADD_TOAST',
  REMOVE_TEST = 'prototype/REMOVE_TOAST',
}

export type AugmentedActionContext = {
  commit<K extends keyof PrototypeMutations>(
    key: K,
    payload: Parameters<PrototypeMutations[K]>[1]
  ): ReturnType<PrototypeMutations[K]>
} & Omit<ActionContext<PrototypeState, RootState>, 'commit'>

export interface PrototypeActions {
  [PrototypeActionTypes.ADD_TEST](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
  [PrototypeActionTypes.REMOVE_TEST](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
}

export const prototypeActions: ActionTree<PrototypeState, RootState> & PrototypeActions = {
  [PrototypeActionTypes.ADD_TEST] ({ commit }, payload) {
    commit(PrototypeMutationTypes.SET_TEST, payload)
  },
  [PrototypeActionTypes.REMOVE_TEST] ({ commit }, payload) {
    commit(PrototypeMutationTypes.SET_TEST, {})
  },
}
