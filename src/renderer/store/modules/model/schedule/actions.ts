import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { PrototypeMutations, ScheduleMutationTypes } from './mutations'
import { ScheduleState } from './state'
import { Schedule, ScheduleCreateForm, ScheduleInfo, ScheduleUpdateForm } from '@/types/models/Schedule'

const electron = window.require('electron')

export enum ScheduleActionTypes {
  LOAD_SCHEDULE_LIST = 'schedule/LOAD_SCHEDULE_LIST',
  RESET_SCHEDULE_LIST = 'schedule/RESET_SCHEDULE_LIST',
  LOAD_SCHEDULE = 'schedule/LOAD_SCHEDULE',
  RESET_SCHEDULE = 'schedule/RESET_SCHEDULE',
  CREATE_SCHEDULE = 'schedule/CREATE_SCHEDULE',
  UPDATE_SCHEDULE = 'schedule/UPDATE_SCHEDULE',
  DELETE_SCHEDULE = 'schedule/DELETE_SCHEDULE',
  CLEAR_DONE_SCHEDULE_LIST = 'schedule/CLEAR_DONE_SCHEDULE_LIST',
}

export type AugmentedActionContext = {
  commit<K extends keyof PrototypeMutations>(
    key: K,
    payload: Parameters<PrototypeMutations[K]>[1]
  ): ReturnType<PrototypeMutations[K]>
} & Omit<ActionContext<ScheduleState, RootState>, 'commit'>

export interface ScheduleActions {
  [ScheduleActionTypes.LOAD_SCHEDULE_LIST](
    { commit }: AugmentedActionContext,
    payload: { saved: true; done: false }
  ): void
  [ScheduleActionTypes.RESET_SCHEDULE_LIST](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Load Schedule
   * @param commit
   * @param payload - id of schedule
   */
  [ScheduleActionTypes.LOAD_SCHEDULE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [ScheduleActionTypes.RESET_SCHEDULE](
    { commit }: AugmentedActionContext,
  ): void
  [ScheduleActionTypes.CREATE_SCHEDULE](
    { commit }: AugmentedActionContext,
    payload: ScheduleCreateForm
  ): void
  [ScheduleActionTypes.UPDATE_SCHEDULE](
    { commit }: AugmentedActionContext,
    payload: ScheduleUpdateForm
  ): void
  [ScheduleActionTypes.DELETE_SCHEDULE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [ScheduleActionTypes.CLEAR_DONE_SCHEDULE_LIST](
    { commit }: AugmentedActionContext,
  ): void
}

export const scheduleActions: ActionTree<ScheduleState, RootState> & ScheduleActions = {
  async [ScheduleActionTypes.LOAD_SCHEDULE_LIST] ({ commit }, payload: { saved: boolean; done: boolean }) {
    if (!payload) {
      payload = {
        saved: true,
        done: false,
      }
    }
    let scheduleList: Array<ScheduleInfo> = []
    if (payload.saved) {
      const savedScheduleListRes: Array<ScheduleInfo> = await electron.ipcRenderer.invoke('get-saved-schedule-list')
      scheduleList = scheduleList.concat(savedScheduleListRes)
    }
    if (payload.done) {
      const doneScheduleListRes: Array<ScheduleInfo> = await electron.ipcRenderer.invoke('get-done-schedule-list')
      scheduleList = scheduleList.concat(doneScheduleListRes)
    }
    commit(ScheduleMutationTypes.SET_SCHEDULE_LIST, scheduleList)
  },
  [ScheduleActionTypes.RESET_SCHEDULE_LIST] ({ commit },) {
    commit(ScheduleMutationTypes.SET_SCHEDULE_LIST, [])
  },
  async [ScheduleActionTypes.LOAD_SCHEDULE] ({ commit }, payload) {
    const scheduleRes: ScheduleInfo = await electron.ipcRenderer.invoke('get-schedule', payload)
    commit(ScheduleMutationTypes.SET_SCHEDULE, scheduleRes)
  },
  [ScheduleActionTypes.RESET_SCHEDULE] ({ commit },) {
    commit(ScheduleMutationTypes.SET_SCHEDULE, {} as ScheduleInfo)
  },
  async [ScheduleActionTypes.CREATE_SCHEDULE] (_, payload) {
    return <string>(await electron.ipcRenderer.invoke('create-schedule', payload))
  },
  async [ScheduleActionTypes.UPDATE_SCHEDULE] (_, payload) {
    await electron.ipcRenderer.invoke('update-schedule', payload)
  },
  async [ScheduleActionTypes.DELETE_SCHEDULE] (_, payload) {
    await electron.ipcRenderer.invoke('delete-schedule', payload)
  },
  async [ScheduleActionTypes.CLEAR_DONE_SCHEDULE_LIST] (_) {
    await electron.ipcRenderer.invoke('CLEAR-DONE-LIST')
  },
}
