import { CustomDateType } from '../../systems/Date'

export interface User {
  id: string
  name: string
  birthday: CustomDateType
}
