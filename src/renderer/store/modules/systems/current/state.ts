import { User } from '@/types/models/User'

export interface CurrentState {
  user: User
}

export const currentState: CurrentState = {
  user: {} as User,
}
