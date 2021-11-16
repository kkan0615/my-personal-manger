import { MutationTree } from 'vuex'
import { ApplicationState } from './state'

export enum ApplicationMutationTypes {
  SET_IS_GENERAL_SIDEBAR_OPEN = 'application/SET_IS_GENERAL_SIDEBAR_OPEN',
}
export type ApplicationMutations<S = ApplicationState> = {
  [ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN](state: S, payload: boolean): void
}

export const applicationMutations: MutationTree<ApplicationState> & ApplicationMutations = {
  [ApplicationMutationTypes.SET_IS_GENERAL_SIDEBAR_OPEN] (state, payload) {
    state.isGeneralSidebarOpen = payload
  },
}
