import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ApplicationMutations, ApplicationMutationTypes } from './mutations'
import { ApplicationState } from './state'
import { Snackbar } from '@/types/applications/Snackbar'
import { v4 } from 'uuid'

export enum ApplicationActionTypes {
  OPEN_IS_GENERAL_SIDEBAR_OPEN = 'application/OPEN_IS_GENERAL_SIDEBAR_OPEN',
  CLOSE_IS_GENERAL_SIDEBAR_OPEN = 'application/CLOSE_IS_GENERAL_SIDEBAR_OPEN',
  ADD_SNACKBAR_TO_LIST = 'application/ADD_SNACKBAR_TO_LIST',
  REMOVE_SNACKBAR_FROM_LIST = 'application/REMOVE_SNACKBAR_FROM_LIST',
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
  [ApplicationActionTypes.ADD_SNACKBAR_TO_LIST](
    { commit, state }: AugmentedActionContext,
    payload: Snackbar
  ): void
  [ApplicationActionTypes.REMOVE_SNACKBAR_FROM_LIST](
    { commit, state }: AugmentedActionContext,
    payload: string
  ): void
}

export const applicationActions: ActionTree<ApplicationState, RootState> & ApplicationActions = {
  [ApplicationActionTypes.OPEN_IS_GENERAL_SIDEBAR_OPEN] ({ commit }) {
    commit(ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN, false)
  },
  [ApplicationActionTypes.CLOSE_IS_GENERAL_SIDEBAR_OPEN] ({ commit }) {
    commit(ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN, false)
  },
  [ApplicationActionTypes.ADD_SNACKBAR_TO_LIST] ({ commit, state }, payload) {
    // Set the id
    payload.id = v4()
    commit(ApplicationMutationTypes.SET_SNACKBAR_LIST, state.snackbarList.concat([payload]))
  },
  [ApplicationActionTypes.REMOVE_SNACKBAR_FROM_LIST] ({ commit, state }, payload) {
    commit(ApplicationMutationTypes.SET_SNACKBAR_LIST, state.snackbarList.filter(snackbar => snackbar.id !== payload))
  },
}
