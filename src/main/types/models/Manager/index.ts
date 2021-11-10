import { ManagerConfig } from './config'

export interface ManagerMessage {
  sound?: string
  message: string
}

export interface Manager {
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

export const MANAGER_FILE_PREFIX = '_slot'
