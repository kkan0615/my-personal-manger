import { User } from '@/types/models/User'
import { Manager } from '@/types/models/Manager'

export interface CurrentState {
  user: User
  manager: Manager
}

export const currentState: CurrentState = {
  user: {} as User,
  manager: {} as Manager
}
