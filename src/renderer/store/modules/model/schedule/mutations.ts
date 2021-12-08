import { MutationTree } from 'vuex'
import { ScheduleState } from './state'
import { ScheduleInfo } from '@/types/models/Schedule'
import { ScheduleSelectListQuery } from '@/types/models/Schedule/filter'

export enum ScheduleMutationTypes {
  SET_SCHEDULE_LIST_OPTION = 'schedule/SET_SCHEDULE_LIST_OPTION',
  SET_SCHEDULE_LIST = 'schedule/SET_SCHEDULE_LIST',
  SET_SCHEDULE = 'schedule/SET_SCHEDULE',
}
export type PrototypeMutations<S = ScheduleState> = {
  [ScheduleMutationTypes.SET_SCHEDULE_LIST_OPTION](state: S, payload: ScheduleSelectListQuery): void
  [ScheduleMutationTypes.SET_SCHEDULE_LIST](state: S, payload: Array<ScheduleInfo>): void
  [ScheduleMutationTypes.SET_SCHEDULE](state: S, payload: ScheduleInfo): void
}

export const scheduleMutations: MutationTree<ScheduleState> & PrototypeMutations = {
  [ScheduleMutationTypes.SET_SCHEDULE_LIST_OPTION] (state, payload) {
    state.scheduleListOption = payload
  },
  [ScheduleMutationTypes.SET_SCHEDULE] (state, payload) {
    state.schedule = payload
  },
  [ScheduleMutationTypes.SET_SCHEDULE_LIST] (state, payload) {
    state.scheduleList = payload
  },
}
