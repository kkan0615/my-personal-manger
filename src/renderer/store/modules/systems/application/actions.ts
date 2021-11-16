import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ApplicationMutations, ApplicationMutationTypes } from './mutations'
import { ApplicationState } from './state'

export enum ApplicationActionTypes {
  OPEN_IS_GENERAL_SIDEBAR_OPEN = 'application/OPEN_IS_GENERAL_SIDEBAR_OPEN',
  CLOSE_IS_GENERAL_SIDEBAR_OPEN = 'application/CLOSE_IS_GENERAL_SIDEBAR_OPEN',
}

export type AugmentedActionContext = {
  commit<K extends keyof ApplicationMutations>(
    key: K,
    payload: Parameters<ApplicationMutations[K]>[1]
  ): ReturnType<ApplicationMutations[K]>
} & Omit<ActionContext<ApplicationState, RootState>, 'commit'>

export interface ApplicationActions {
  [ApplicationActionTypes.OPEN_IS_GENERAL_SIDEBAR_OPEN](
    { commit }: AugmentedActionContext,
  ): void
  [ApplicationActionTypes.CLOSE_IS_GENERAL_SIDEBAR_OPEN](
    { commit }: AugmentedActionContext,
  ): void
}

export const applicationActions: ActionTree<ApplicationState, RootState> & ApplicationActions = {
  [ApplicationActionTypes.OPEN_IS_GENERAL_SIDEBAR_OPEN] ({ commit }) {
    commit(ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN, false)
  },
  [ApplicationActionTypes.CLOSE_IS_GENERAL_SIDEBAR_OPEN] ({ commit }) {
    commit(ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN, false)
  },
}
