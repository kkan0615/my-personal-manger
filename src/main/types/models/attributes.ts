import { CustomDateType } from '../systems/Date'

export interface Attribute {
  id: string
  createdAt: CustomDateType
  updatedAt: CustomDateType
  deletedAt?: CustomDateType
}
