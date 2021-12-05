import { CustomDateType } from '../../systems/Date'
import { Attribute } from '../attributes'

export interface Schedule extends Attribute {
  title: string
  content?: string
  date?: CustomDateType // if isRepeat field is false, it's required
  isRepeat?: boolean
  repeatTime?: CustomDateType // if isRepeat field is true
  repeatDays?: Array<number> // if isRepeat field is true, 0 is sunday and 6 is saturday
}

export interface ScheduleInfo extends Schedule {
  jobName?: string
}

export type ScheduleCreateForm = Omit<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type ScheduleUpdateForm = Omit<Schedule, 'createdAt' | 'updatedAt' | 'deletedAt'>
