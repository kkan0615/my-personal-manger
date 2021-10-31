import { GetterTree } from 'vuex'
import { PrototypeState } from './state'
import { RootState } from '@/store'

export type PrototypeGetters<S = PrototypeState> = {
  test(state: S): any
}

export const prototypeGetters: GetterTree<PrototypeState, RootState> & PrototypeGetters = {
  test: (state) => state.test,
}
