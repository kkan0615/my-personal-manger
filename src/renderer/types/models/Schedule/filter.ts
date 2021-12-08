import { CustomDateType } from '@/types/systems/Date'

export interface ScheduleSelectListQuery {
  includeSave: boolean
  includeDone: boolean
  startDate?: CustomDateType
  endDate?: CustomDateType
}
