import { MutationTree } from 'vuex'
import { ScheduleState } from './state'
import { Schedule, ScheduleInfo } from '@/types/models/Schedule'

export enum ScheduleMutationTypes {
  SET_SCHEDULE_LIST = 'schedule/SET_SCHEDULE_LIST',
  SET_SCHEDULE = 'schedule/SET_SCHEDULE',
}
export type PrototypeMutations<S = ScheduleState> = {
  [ScheduleMutationTypes.SET_SCHEDULE_LIST](state: S, payload: Array<ScheduleInfo>): void
  [ScheduleMutationTypes.SET_SCHEDULE](state: S, payload: ScheduleInfo): void
}

export const scheduleMutations: MutationTree<ScheduleState> & PrototypeMutations = {
  [ScheduleMutationTypes.SET_SCHEDULE_LIST] (state, payload) {
    state.scheduleList = payload
  },
  [ScheduleMutationTypes.SET_SCHEDULE] (state, payload) {
    state.schedule = payload
  },
}
