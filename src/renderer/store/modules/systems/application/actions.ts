import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ApplicationMutations, ApplicationMutationTypes } from './mutations'
import { ApplicationState } from './state'

export enum ApplicationActionTypes {
  ADD_TEST = 'application/ADD_TOAST',
  REMOVE_TEST = 'application/REMOVE_TOAST',
}

export type AugmentedActionContext = {
  commit<K extends keyof ApplicationMutations>(
    key: K,
    payload: Parameters<ApplicationMutations[K]>[1]
  ): ReturnType<ApplicationMutations[K]>
} & Omit<ActionContext<ApplicationState, RootState>, 'commit'>

export interface ApplicationActions {
  [ApplicationActionTypes.ADD_TEST](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
  [ApplicationActionTypes.REMOVE_TEST](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
}

export const applicationActions: ActionTree<ApplicationState, RootState> & ApplicationActions = {
  [ApplicationActionTypes.ADD_TEST] ({ commit }, payload) {
    commit(ApplicationMutationTypes.SET_TEST, payload)
  },
  [ApplicationActionTypes.REMOVE_TEST] ({ commit }, payload) {
    commit(ApplicationMutationTypes.SET_TEST, {})
  },
}
