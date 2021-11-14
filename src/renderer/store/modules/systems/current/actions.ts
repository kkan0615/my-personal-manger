import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { CurrentMutations, CurrentMutationTypes } from './mutations'
import { CurrentState } from './state'
import { User } from '@/types/models/User'

const electron = window.require('electron')

export enum CurrentActionTypes {
  LOAD_USER = 'current/LOAD_USER',
  RESET_USER = 'current/RESET_USER',
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
}

export const currentActions: ActionTree<CurrentState, RootState> & CurrentActions = {
  async [CurrentActionTypes.LOAD_USER] ({ commit }) {
    const user = await electron.ipcRenderer.invoke('get-user')
    console.log('user', user)
    commit(CurrentMutationTypes.SET_USER, user)
  },
  [CurrentActionTypes.RESET_USER] ({ commit }) {
    commit(CurrentMutationTypes.SET_USER, {} as User)
  },
}
