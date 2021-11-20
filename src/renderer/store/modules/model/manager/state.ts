import { Manager, ManagerWithConfig } from '@/types/models/Manager'
import { ManagerConfig } from '@/types/models/Manager/config'

export interface ManagerState {
  managerList: Array<ManagerWithConfig>
  manager: Manager
  config: ManagerConfig
  message: string
  messageTimer: NodeJS.Timeout | null
}

export const managerState: ManagerState = {
  managerList: [],
  manager: {} as Manager,
  config: {} as ManagerConfig,
  message: '',
  messageTimer: null
}
