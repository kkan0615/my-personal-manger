import { ManagerScript, ManagerScriptForm } from '@/types/managers/script'

export const DEFAULT_MANAGER_MESSAGE_TIMEOUT = 2500

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

export interface ManagerInfo extends Manager {
  main: File
}

export type ManagerCreateForm = Omit<Manager, 'id' | 'mainImg'> & {
  mainImg: File | ArrayBuffer
  mainImgName: string
  birthdayScript: ManagerScriptForm
  helloScriptList: ManagerScriptForm[]
  scheduleScriptList: ManagerScriptForm[]
  clickScriptList: ManagerScriptForm[]
}

export type ManagerUpdateForm = Manager & {
  birthdayScript: ManagerScriptForm
  helloScriptList: ManagerScriptForm[]
  scheduleScriptList: ManagerScriptForm[]
  clickScriptList: ManagerScriptForm[]
}
