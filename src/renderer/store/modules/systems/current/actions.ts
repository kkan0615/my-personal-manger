import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { CurrentMutations, CurrentMutationTypes } from './mutations'
import { CurrentState } from './state'
import { User } from '@/types/models/User'
import { v4 } from 'uuid'

const electron = window.require('electron')

export enum CurrentActionTypes {
  LOAD_USER = 'current/LOAD_USER',
  RESET_USER = 'current/RESET_USER',
  REGISTER_USER = 'current/RESET_USER',
}

export type AugmentedActionContext = {
  commit<K extends keyof CurrentMutations>(
    key: K,
    payload: Parameters<CurrentMutations[K]>[1]
  ): ReturnType<CurrentMutations[K]>
} & Omit<ActionContext<CurrentState, RootState>, 'commit'>

export interface CurrentActions {
  [CurrentActionTypes.LOAD_USER](
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.RESET_USER](
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.REGISTER_USER](
    { commit }: AugmentedActionContext,
    payload: User
  ): void
}

export const currentActions: ActionTree<CurrentState, RootState> & CurrentActions = {
  async [CurrentActionTypes.LOAD_USER] ({ commit }) {
    const user = await electron.ipcRenderer.invoke('get-user')
    commit(CurrentMutationTypes.SET_USER, user)
  },
  [CurrentActionTypes.RESET_USER] ({ commit }) {
    commit(CurrentMutationTypes.SET_USER, {} as User)
  },
  [CurrentActionTypes.REGISTER_USER] ({ commit }, payload) {
    payload.id = v4()
    electron.ipcRenderer.send('register-user', payload)
    commit(CurrentMutationTypes.SET_USER, payload)
  },
}
