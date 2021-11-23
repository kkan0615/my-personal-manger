import { Manager } from '@/types/models/Manager'
import { defaultManagerConfig, ManagerConfig } from '@/types/models/Manager/config'

export interface ManagerState {
  managerList: Array<Manager>
  manager: Manager
  config: ManagerConfig
  message: string
  messageTimer: NodeJS.Timeout | null
}

export const managerState: ManagerState = {
  managerList: [],
  manager: {} as Manager,
  // config: {} as ManagerConfig,
  config: defaultManagerConfig,
  message: '',
  messageTimer: null
}
