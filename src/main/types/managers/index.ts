import { ManagerScript } from './script'

export interface Manager {
  mainImg: string
  name: string
  color?: string
  gender: 'male' | 'female' | 'unknown'
  age?: number
  randScheduleScriptList: ManagerScript[]
  randClickScriptList: ManagerScript[]
}
