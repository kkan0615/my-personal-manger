import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ManagerMutations, ManagerMutationTypes } from './mutations'
import { ManagerState } from './state'
import { Manager, ManagerCreateForm, ManagerMessage, ManagerUpdateForm } from '@/types/models/Manager'
import { defaultManagerConfig, ManagerConfig } from '@/types/models/Manager/config'
import { getRandomInArr, getRandomInt } from '@/utils/commons/random'
import { getCurrentTimesInDay } from '@/utils/commons/time'

const electron = window.require('electron')

export enum ManagerActionTypes {
  LOAD_MANAGER_LIST = 'manager/LOAD_MANAGER_LIST',
  RESET_MANAGER_LIST = 'manager/RESET_MANAGER_LIST',
  LOAD_MANAGER = 'manager/LOAD_MANAGER',
  SET_MANAGER = 'manager/SET_MANAGER',
  RESET_MANAGER = 'manager/RESET_MANAGER',
  SET_MANAGER_ID = 'manager/SET_MANAGER_ID',
  CLEAR_MANAGER_ID = 'manager/CLEAR_MANAGER_ID',
  CREATE_MANAGER = 'manager/CREATE_MANAGER',
  UPDATE_MANAGER = 'manager/UPDATE_MANAGER',
  DELETE_MANAGER = 'manager/DELETE_MANAGER',
  LOAD_MANAGER_CONFIG = 'manager/LOAD_MANAGER_CONFIG',
  SET_MANAGER_CONFIG = 'manager/SET_MANAGER_CONFIG',
  RESET_MANAGER_CONFIG = 'manager/RESET_MANAGER_CONFIG',
  SET_MESSAGE = 'manger/SET_MESSAGE',
  HELLO_MANAGER = 'manger/HELLO_MANAGER',
  CLICK_MANAGER = 'manger/CLICK_MANAGER',
  HAPPY_BIRTHDAY = 'manager/HAPPY_BIRTHDAY',
  ON_MASSAGE_TIMER = 'manger/ON_MASSAGE_TIMER',
  OFF_MESSAGE_TIMER = 'manager/OFF_MESSAGE_TIMER'
}

export type AugmentedActionContext = {
  commit<K extends keyof ManagerMutations>(
    key: K,
    payload: Parameters<ManagerMutations[K]>[1]
  ): ReturnType<ManagerMutations[K]>
} & Omit<ActionContext<ManagerState, RootState>, 'commit'>

export interface ManagerActions {
  [ManagerActionTypes.LOAD_MANAGER_LIST](
    { commit }: AugmentedActionContext,
  ): Promise<void>
  [ManagerActionTypes.RESET_MANAGER_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.LOAD_MANAGER](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<void>
  [ManagerActionTypes.SET_MANAGER](
    { commit }: AugmentedActionContext,
    payload: Manager
  ): void
  [ManagerActionTypes.RESET_MANAGER](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.SET_MANAGER_ID](
    { commit }: AugmentedActionContext,
    id: string
  ): void
  [ManagerActionTypes.CLEAR_MANAGER_ID](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.CREATE_MANAGER](
    { commit }: AugmentedActionContext,
    payload: ManagerCreateForm
  ): void
  [ManagerActionTypes.UPDATE_MANAGER](
    { commit }: AugmentedActionContext,
    payload: ManagerUpdateForm
  ): void
  [ManagerActionTypes.DELETE_MANAGER](
    { commit }: AugmentedActionContext,
    id: string
  ): void
  [ManagerActionTypes.LOAD_MANAGER_CONFIG](
    { commit }: AugmentedActionContext,
  ): Promise<void>
  [ManagerActionTypes.SET_MANAGER_CONFIG](
    { commit }: AugmentedActionContext,
    payload: ManagerConfig
  ): void
  [ManagerActionTypes.RESET_MANAGER_CONFIG](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.SET_MESSAGE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [ManagerActionTypes.HELLO_MANAGER](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.CLICK_MANAGER](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.HAPPY_BIRTHDAY](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.ON_MASSAGE_TIMER](
    { commit }: AugmentedActionContext,
  ): void
  [ManagerActionTypes.OFF_MESSAGE_TIMER](
    { commit }: AugmentedActionContext,
  ): void
}

export const managerActions: ActionTree<ManagerState, RootState> & ManagerActions = {
  async [ManagerActionTypes.LOAD_MANAGER_LIST] ({ commit }) {
    try {
      const managerListRes = await electron.ipcRenderer.invoke('get-manager-list')
      commit(ManagerMutationTypes.SET_MANAGER_LIST, managerListRes)
    } catch (e) {
      console.error(e)
      throw { code: 400, message: e }
    }
  },
  [ManagerActionTypes.RESET_MANAGER_LIST] ({ commit }) {
    commit(ManagerMutationTypes.SET_MANAGER_LIST, [])
  },
  async [ManagerActionTypes.LOAD_MANAGER] ({ commit }, payload) {
    const manager = await electron.ipcRenderer.invoke('get-manager', payload)
    commit(ManagerMutationTypes.SET_MANAGER, manager)
  },
  [ManagerActionTypes.SET_MANAGER] ({ commit }, payload) {
    commit(ManagerMutationTypes.SET_MANAGER, payload)
  },
  [ManagerActionTypes.RESET_MANAGER] ({ commit }) {
    commit(ManagerMutationTypes.SET_MANAGER, {} as Manager)
  },
  [ManagerActionTypes.SET_MANAGER_ID] (_, id) {
    electron.ipcRenderer.send('set-manager-id', id)
  },
  [ManagerActionTypes.CLEAR_MANAGER_ID] () {
    electron.ipcRenderer.send('clear-manager-id')
  },
  async [ManagerActionTypes.CREATE_MANAGER] (_, payload) {
    console.log(payload)
    const createRes = await electron.ipcRenderer.send('create-manager', {
      name: payload.name,
      displayStyle: payload.displayStyle,
      // mainImgFile: payload.mainImgFile,
      // circleImgFile: payload.circleImgFile,
      randClickMessages: JSON.parse(JSON.stringify(payload.randClickMessages)), // To handle Cloned object error
      morningMessages: JSON.parse(JSON.stringify(payload.morningMessages)), // To handle Cloned object error
      lunchMessages: JSON.parse(JSON.stringify(payload.lunchMessages)), // To handle Cloned object error
      eveningsMessages: JSON.parse(JSON.stringify(payload.eveningsMessages)), // To handle Cloned object error
      nightMessages: JSON.parse(JSON.stringify(payload.nightMessages)), // To handle Cloned object error
    } as ManagerCreateForm)
    console.log(createRes)
  },
  async [ManagerActionTypes.UPDATE_MANAGER] (_) {
    const updateRes = await electron.ipcRenderer.invoke('update-manager')
    console.log(updateRes)
  },
  async [ManagerActionTypes.DELETE_MANAGER] (_, id) {
    const deleteRes = await electron.ipcRenderer.invoke('delete-manager', id)
    console.log(deleteRes)
  },
  async [ManagerActionTypes.LOAD_MANAGER_CONFIG] ({ commit, rootState }) {
    const managerConfig: ManagerConfig = await electron.ipcRenderer.invoke('sync-manager-config')
    if (managerConfig && rootState.manager.manager.displayStyle && rootState.manager.manager.displayStyle !== 'ALL') {
      managerConfig.displayStyle = rootState.manager.manager.displayStyle
    }
    commit(ManagerMutationTypes.SET_MANAGER_CONFIG, managerConfig || defaultManagerConfig)
  },
  [ManagerActionTypes.SET_MANAGER_CONFIG] ({ commit }, payload) {
    commit(ManagerMutationTypes.SET_MANAGER_CONFIG, payload)
  },
  [ManagerActionTypes.RESET_MANAGER_CONFIG] ({ commit }) {
    commit(ManagerMutationTypes.SET_MANAGER_CONFIG, {} as ManagerConfig)
  },
  [ManagerActionTypes.SET_MESSAGE] ({ commit }, payload) {
    // @TODO: 여러 곳에서 써야하기때문에 Action 혹은 Mutations 화 시켜두기
    commit(ManagerMutationTypes.SET_MESSAGE_TIMER, setTimeout(() => {
      commit(ManagerMutationTypes.SET_MESSAGE, '')
      commit(ManagerMutationTypes.SET_MESSAGE_TIMER, null)
    }, 2500))
    commit(ManagerMutationTypes.SET_MESSAGE, payload)
  },
  [ManagerActionTypes.HELLO_MANAGER] ({ commit, rootState, dispatch }) {
    commit(ManagerMutationTypes.SET_MESSAGE, `I am ${rootState.current.manager.name} Hello ${rootState.current.user.name}  master!`)
    dispatch(ManagerActionTypes.ON_MASSAGE_TIMER)
  },
  [ManagerActionTypes.CLICK_MANAGER] ({ commit, state, rootState, dispatch }) {
    if (state.messageTimer) {
      commit(ManagerMutationTypes.SET_MESSAGE_TIMER, null)
    }

    let clickMessage: ManagerMessage | null = null
    if (getRandomInt() === 1) {
      const currentTimesInDay = getCurrentTimesInDay()
      switch (currentTimesInDay) {
        case 'MORNING':
          clickMessage = getRandomInArr(rootState.current.manager.morningMessages)
          break
        case 'AFTERNOON':
          clickMessage = getRandomInArr(rootState.current.manager.lunchMessages)
          break
        case 'EVENING':
          clickMessage = getRandomInArr(rootState.current.manager.eveningsMessages)
          break
        case 'NIGHT':
          clickMessage = getRandomInArr(rootState.current.manager.nightMessages)
          break
      }
    } else {
      clickMessage = getRandomInArr(rootState.current.manager.randClickMessages)
    }
    if (clickMessage) {
      commit(ManagerMutationTypes.SET_MESSAGE, clickMessage.message)
      dispatch(ManagerActionTypes.ON_MASSAGE_TIMER)
    }
  },
  [ManagerActionTypes.HAPPY_BIRTHDAY] ({ commit, state, dispatch }) {
    commit(ManagerMutationTypes.SET_MESSAGE, `I am ${state.manager.name} Hello {{ name }} master!`)
    dispatch(ManagerActionTypes.ON_MASSAGE_TIMER)
  },
  [ManagerActionTypes.ON_MASSAGE_TIMER] ({ commit }) {
    commit(ManagerMutationTypes.SET_MESSAGE_TIMER,
      setTimeout(() => {
        commit(ManagerMutationTypes.SET_MESSAGE, '')
        commit(ManagerMutationTypes.SET_MESSAGE_TIMER, null)
      }, 2500))
  },
  [ManagerActionTypes.OFF_MESSAGE_TIMER] ({ commit }) {
    commit(ManagerMutationTypes.SET_MESSAGE_TIMER, null)
  },
}
