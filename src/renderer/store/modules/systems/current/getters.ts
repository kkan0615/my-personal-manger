import { GetterTree } from 'vuex'
import { CurrentState } from './state'
import { RootState } from '@/store'
import { User } from '@/types/models/User'

export type CurrentGetters<S = CurrentState> = {
  currentUser(state: S): User
}

export const currentGetters: GetterTree<CurrentState, RootState> & CurrentGetters = {
  currentUser: (state) => state.user,
}
