import { Manager } from '@/types/models/Manager'

export interface ManagerState {
  manager: Manager
  message: string
  messageTimer: NodeJS.Timeout | null
}

export const managerState: ManagerState = {
  manager: {} as Manager,
  message: '',
  messageTimer: null
}
