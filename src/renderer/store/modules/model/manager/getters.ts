import { GetterTree } from 'vuex'
import { ManagerState } from './state'
import { RootState } from '@/store'
import { Manager } from '@/types/models/Manager'

export type ManagerGetters<S = ManagerState> = {
  manager(state: S): Manager
}

export const managerGetters: GetterTree<ManagerState, RootState> & ManagerGetters = {
  manager: (state) => state.manager,
}
