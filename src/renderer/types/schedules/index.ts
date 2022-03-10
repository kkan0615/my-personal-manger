import { Job } from 'node-schedule'

export interface Schedule extends Job {
  isLoop: boolean
  date: string | Date
  content: string
}

export type ScheduleCreateForm = Pick<Schedule, 'isLoop' | 'date' | 'content'>
export type ScheduleUpdateForm = Pick<Schedule, 'isLoop' | 'date' | 'content' | 'name'>
