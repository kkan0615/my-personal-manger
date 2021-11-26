import { GetterTree } from 'vuex'
import { ManagerState } from './state'
import { RootState } from '@/store'
import { Manager } from '@/types/models/Manager'

export type ManagerGetters<S = ManagerState> = {
  managerList(state: S): Array<Manager>
  manager(state: S): Manager
}

export const managerGetters: GetterTree<ManagerState, RootState> & ManagerGetters = {
  managerList: (state) => state.managerList,
  manager: (state) => state.manager,
}
