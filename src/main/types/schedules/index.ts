import { Job } from 'node-schedule'

export interface Schedule {
  name: string
  isLoop: boolean
  date: string
  content: string
}

export type ScheduleCreateForm = Pick<Schedule, 'isLoop' | 'date' | 'content'>
export type ScheduleUpdateForm = Pick<Schedule, 'isLoop' | 'date' | 'content' | 'name'>
