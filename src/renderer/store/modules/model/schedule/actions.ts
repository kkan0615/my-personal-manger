import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { PrototypeMutations, ScheduleMutationTypes } from './mutations'
import { ScheduleState } from './state'
import { Schedule } from '@/types/models/Schedule'

const electron = window.require('electron')

export enum ScheduleActionTypes {
  LOAD_SCHEDULE_LIST = 'schedule/LOAD_SCHEDULE_LIST',
  RESET_SCHEDULE_LIST = 'schedule/RESET_SCHEDULE_LIST',
  LOAD_SCHEDULE = 'schedule/LOAD_SCHEDULE',
  RESET_SCHEDULE = 'schedule/RESET_SCHEDULE',
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
}

export const scheduleActions: ActionTree<ScheduleState, RootState> & ScheduleActions = {
  [ScheduleActionTypes.LOAD_SCHEDULE_LIST] ({ commit }) {
    commit(ScheduleMutationTypes.SET_SCHEDULE_LIST, [])
  },
  [ScheduleActionTypes.RESET_SCHEDULE_LIST] ({ commit },) {
    commit(ScheduleMutationTypes.SET_SCHEDULE_LIST, [])
  },
  async [ScheduleActionTypes.LOAD_SCHEDULE] ({ commit }, payload) {
    const scheduleRes: Schedule = await electron.ipcRenderer.invoke('get-schedule', payload)
    commit(ScheduleMutationTypes.SET_SCHEDULE, scheduleRes)
  },
  [ScheduleActionTypes.RESET_SCHEDULE] ({ commit },) {
    commit(ScheduleMutationTypes.SET_SCHEDULE, {} as Schedule)
  },
}
