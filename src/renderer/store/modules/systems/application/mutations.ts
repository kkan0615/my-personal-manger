import { MutationTree } from 'vuex'
import { ApplicationState } from './state'

export enum ApplicationMutationTypes {
  SET_TEST = 'application/SET_TOASTS',
}
export type ApplicationMutations<S = ApplicationState> = {
  [ApplicationMutationTypes.SET_TEST](state: S, payload: any): void
}

export const applicationMutations: MutationTree<ApplicationState> & ApplicationMutations = {
  [ApplicationMutationTypes.SET_TEST] (state, payload) {
    state.test = payload
  },
}
