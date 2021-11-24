import { MutationTree } from 'vuex'
import { ApplicationState } from './state'
import { Snackbar } from '@/types/applications/Snackbar'

export enum ApplicationMutationTypes {
  SET_IS_GENERAL_SIDEBAR_OPEN = 'application/SET_IS_GENERAL_SIDEBAR_OPEN',
  SET_SNACKBAR_LIST = 'application/SET_SNACKBAR_LIST',
}
export type ApplicationMutations<S = ApplicationState> = {
  [ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN](state: S, payload: boolean): void
  [ApplicationMutationTypes.SET_SNACKBAR_LIST](state: S, payload: Array<Snackbar>): void
}

export const applicationMutations: MutationTree<ApplicationState> & ApplicationMutations = {
  [ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN] (state, payload) {
    state.isGeneralSidebarOpen = payload
  },
  [ApplicationMutationTypes.SET_SNACKBAR_LIST] (state, payload) {
    state.snackbarList = payload
  },
}
