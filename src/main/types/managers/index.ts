import { ManagerScript } from './script'

export interface Manager {
  id: string
  mainImg: string
  name: string
  color?: string
  gender: 'male' | 'female' | 'unknown'
  age?: number
  birthdayScript: ManagerScript
  helloScriptList: ManagerScript[]
  scheduleScriptList: ManagerScript[]
  clickScriptList: ManagerScript[]
}

export interface ManagerInfo extends Manager{
  main: Blob
}
