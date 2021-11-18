import { CustomDateType } from '../../systems/Date'
import { Attribute } from '../../models/attributes'

export interface Schedule extends Attribute {
  title?: string
  content: string
  date?: CustomDateType // if isRepeat field is false, it's required
  isRepeat?: boolean
  repeatTime?: CustomDateType // if isRepeat field is true
  repeatDays?: Array<number> // if isRepeat field is true, 0 is sunday and 6 is saturday
}
