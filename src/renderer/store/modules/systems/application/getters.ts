import { GetterTree } from 'vuex'
import { ApplicationState } from './state'
import { RootState } from '@/store'

export type ApplicationGetters<S = ApplicationState> = {
  isGeneralSidebarOpen(state: S): boolean
}

export const applicationGetters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  isGeneralSidebarOpen: (state) => state.isGeneralSidebarOpen,
}
