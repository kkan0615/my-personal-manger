import { ScheduleInfo } from '@/types/models/Schedule'
import { ScheduleSelectListQuery } from '@/types/models/Schedule/filter'

export interface ScheduleState {
  scheduleListOption: ScheduleSelectListQuery
  scheduleList: Array<ScheduleInfo>
  schedule: ScheduleInfo
}

export const scheduleState: ScheduleState = {
  scheduleListOption: {
    includeSave: true,
    includeDone: false,
  } as ScheduleSelectListQuery,
  scheduleList: [],
  schedule: {} as ScheduleInfo
}
