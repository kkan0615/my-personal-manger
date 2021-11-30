import { User } from '@/types/models/User'
import { Manager } from '@/types/models/Manager'
import { ManagerConfig } from '@/types/models/Manager/config'

export interface CurrentState {
  user: User
  manager: Manager
  managerConfig: ManagerConfig
}

export const currentState: CurrentState = {
  user: {} as User,
  manager: {} as Manager,
  managerConfig: {} as ManagerConfig
}
