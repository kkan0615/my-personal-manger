import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { CurrentMutations, CurrentMutationTypes } from './mutations'
import { CurrentState } from './state'
import { User } from '@/types/models/User'
import { v4 } from 'uuid'
import { Manager } from '@/types/models/Manager'
import { defaultManagerConfig, ManagerConfig, MangerConfigUpdateForm } from '@/types/models/Manager/config'
import { ManagerMutationTypes } from '@/store/modules/model/manager/mutations'

const electron = window.require('electron')

export enum CurrentActionTypes {
  LOAD_USER = 'current/LOAD_USER',
  RESET_USER = 'current/RESET_USER',
  REGISTER_USER = 'current/RESET_USER',
  LOAD_MANAGER = 'current/LOAD_MANAGER',
  RESET_MANAGER = 'current/RESET_MANAGER',
  LOAD_MANAGER_CONFIG = 'current/LOAD_MANAGER_CONFIG',
  RESET_MANAGER_CONFIG = 'current/RESET_MANAGER_CONFIG',
  UPDATE_MANAGER_CONFIG = 'current/UPDATE_MANAGER_CONFIG',
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
  [CurrentActionTypes.LOAD_MANAGER](
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.RESET_MANAGER](
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.LOAD_MANAGER_CONFIG](
    { commit, rootState }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.RESET_MANAGER_CONFIG](
    { commit }: AugmentedActionContext,
  ): void
  [CurrentActionTypes.UPDATE_MANAGER_CONFIG](
    { commit }: AugmentedActionContext,
    payload: MangerConfigUpdateForm
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
  async [CurrentActionTypes.LOAD_MANAGER] ({ commit }) {
    const manager = await electron.ipcRenderer.invoke('get-current-manager')
    commit(CurrentMutationTypes.SET_MANAGER, manager)
  },
  [CurrentActionTypes.RESET_MANAGER] ({ commit }) {
    commit(CurrentMutationTypes.SET_MANAGER, {} as Manager)
  },
  async [CurrentActionTypes.LOAD_MANAGER_CONFIG] ({ commit, rootState }) {
    const managerConfig: ManagerConfig = await electron.ipcRenderer.invoke('sync-manager-config')
    if (managerConfig && rootState.manager.manager.displayStyle && rootState.manager.manager.displayStyle !== 'ALL') {
      managerConfig.displayStyle = rootState.manager.manager.displayStyle
    }
    commit(CurrentMutationTypes.SET_MANAGER_CONFIG, managerConfig || defaultManagerConfig)
  },
  [CurrentActionTypes.RESET_MANAGER_CONFIG] ({ commit }) {
    commit(CurrentMutationTypes.SET_MANAGER_CONFIG, {} as ManagerConfig)
  },
  async [CurrentActionTypes.UPDATE_MANAGER_CONFIG] ({ commit }, payload) {
    const mangerConfigUpdateForm: MangerConfigUpdateForm = {
      display: payload.display !== undefined ? payload.display : defaultManagerConfig.display,
      isAlwaysTop: payload.isAlwaysTop !== undefined ? payload.isAlwaysTop : defaultManagerConfig.isAlwaysTop,
      displayStyle: payload.displayStyle !== undefined ? payload.displayStyle : defaultManagerConfig.displayStyle,
      isOnSound: payload.isOnSound !== undefined ? payload.isOnSound : defaultManagerConfig.isOnSound,
    }

    await electron.ipcRenderer.invoke('update-manager-config', mangerConfigUpdateForm)
    commit(CurrentMutationTypes.SET_MANAGER_CONFIG, mangerConfigUpdateForm)
  },
}
