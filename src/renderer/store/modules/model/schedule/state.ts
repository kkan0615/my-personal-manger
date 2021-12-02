import { Schedule } from '@/types/models/Schedule'

export interface ScheduleState {
  scheduleList: Array<Schedule>
  schedule: Schedule
}

export const scheduleState: ScheduleState = {
  scheduleList: [],
  schedule: {} as Schedule
}
