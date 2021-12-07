import { Schedule, ScheduleInfo } from '@/types/models/Schedule'

export interface ScheduleState {
  scheduleList: Array<ScheduleInfo>
  schedule: ScheduleInfo
}

export const scheduleState: ScheduleState = {
  scheduleList: [],
  schedule: {} as ScheduleInfo
}
