import { GetterTree } from 'vuex'
import { ApplicationState } from './state'
import { RootState } from '@/store'

export type ApplicationGetters<S = ApplicationState> = {
  testApplication(state: S): any
}

export const applicationGetters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  testApplication: (state) => state.test,
}
