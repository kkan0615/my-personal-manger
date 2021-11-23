import { ManagerConfig } from '@/types/models/Manager/config'

export interface ManagerMessage {
  sound?: string
  message: string
}

export type ManagerDisplayStyle = 'FULL' | 'CIRCLE' | 'ALL'

export interface Manager {
  id: string
  name: string
  img: string
  circleImg: string
  morningMessages: Array<ManagerMessage>
  lunchMessages: Array<ManagerMessage>
  eveningsMessages: Array<ManagerMessage>
  nightMessages: Array<ManagerMessage>
  randClickMessages: Array<ManagerMessage>
  displayStyle: ManagerDisplayStyle
}

export interface ManagerCreateForm {
  manager: Manager
  config: ManagerConfig
  mainImg: File
  circleImg: File
}

export interface ManagerUpdateForm {
  manager: Manager
  config: ManagerConfig
  mainImg: File
  circleImg: File
}

export interface ManagerWithConfig {
  manager: Manager
  config: ManagerConfig
}
