export interface Schedule {
  name: string
  isLoop: boolean
  loopStr: string
  hours: number
  minutes: number
  seconds: number
  day: number
  date: Date
  content: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type ScheduleCreateForm = Omit<Schedule, 'name' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type ScheduleUpdateForm = Omit<Schedule, 'createdAt' | 'updatedAt' | 'deletedAt'>
