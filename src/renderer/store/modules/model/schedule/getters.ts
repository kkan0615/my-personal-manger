import { GetterTree } from 'vuex'
import { ScheduleState } from './state'
import { RootState } from '@/store'
import { Schedule } from '@/types/models/Schedule'

export type ScheduleGetters<S = ScheduleState> = {
  ScheduleList(state: S): Array<Schedule>
}

export const scheduleGetters: GetterTree<ScheduleState, RootState> & ScheduleGetters = {
  ScheduleList: (state) => state.scheduleList,
}
