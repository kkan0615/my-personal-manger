import { ManagerConfig } from './config'

export interface ManagerMessage {
  sound?: string
  message: string
}

export interface Manager {
  id: string
  name: string
  img: string
  circleImg: string
  morningMessages: Array<ManagerMessage>
  lunchMessages: Array<ManagerMessage>
  eveningsMessages: Array<ManagerMessage>
  randClickMessages: Array<ManagerMessage>
}

export interface ManagerWithConfig {
  manager: Manager
  config: ManagerConfig
}

export interface ManagerCreateForm {
  manager: Manager
  config: ManagerConfig
  mainImg: File
  circleImg: File
}
