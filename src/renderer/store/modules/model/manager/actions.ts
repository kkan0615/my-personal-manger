import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ManagerMutations, ManagerMutationTypes } from './mutations'
import { ManagerState } from './state'
import { Manager, ManagerMessage } from '@/types/models/Manager'
import { ManagerConfig } from '@/types/models/Manager/config'
import { getRandomInArr, getRandomInt } from '@/utils/random'
import { getCurrentTimesInDay } from '@/utils/time'

const electron = window.require('electron')

export enum ManagerActionTypes {
  LOAD_MANAGER = 'manager/LOAD_MANAGER',
  SET_MANAGER = 'manager/SET_MANAGER',
  RESET_MANAGER = 'manager/RESET_MANAGER',
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
  [ManagerActionTypes.LOAD_MANAGER](
    { commit }: AugmentedActionContext,
  ): Promise<void>
  [ManagerActionTypes.SET_MANAGER](
    { commit }: AugmentedActionContext,
    payload: Manager
  ): void
  [ManagerActionTypes.RESET_MANAGER](
    { commit }: AugmentedActionContext,
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
  async [ManagerActionTypes.LOAD_MANAGER] ({ commit }) {
    const manager = await electron.ipcRenderer.invoke('sync-manager')
    commit(ManagerMutationTypes.SET_MANAGER, manager)
  },
  [ManagerActionTypes.SET_MANAGER] ({ commit }, payload) {
    commit(ManagerMutationTypes.SET_MANAGER, payload)
  },
  [ManagerActionTypes.RESET_MANAGER] ({ commit }) {
    commit(ManagerMutationTypes.SET_MANAGER, {} as Manager)
  },
  async [ManagerActionTypes.LOAD_MANAGER_CONFIG] ({ commit }) {
    const managerConfig = await electron.ipcRenderer.invoke('sync-manager-config')
    commit(ManagerMutationTypes.SET_MANAGER_CONFIG, managerConfig)
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
  [ManagerActionTypes.HELLO_MANAGER] ({ commit, state, rootState, dispatch }) {
    commit(ManagerMutationTypes.SET_MESSAGE, `I am ${state.manager.name} Hello ${rootState.current.user.name}  master!`)
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
          clickMessage = getRandomInArr(state.manager.morningMessages)
          break
        case 'AFTERNOON':
          clickMessage = getRandomInArr(state.manager.lunchMessages)
          break
        case 'EVENING':
          clickMessage = getRandomInArr(state.manager.eveningsMessages)
          break
        case 'NIGHT':
          clickMessage = getRandomInArr(state.manager.nightMessages)
          break
      }
    } else {
      clickMessage = getRandomInArr(state.manager.randClickMessages)
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
