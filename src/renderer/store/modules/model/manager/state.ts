import { Manager } from '@/types/models/Manager'
import { ManagerConfig } from '@/types/models/Manager/config'

export interface ManagerState {
  manager: Manager
  config: ManagerConfig
  message: string
  messageTimer: NodeJS.Timeout | null
}

export const managerState: ManagerState = {
  manager: {} as Manager,
  config: {} as ManagerConfig,
  message: '',
  messageTimer: null
}
