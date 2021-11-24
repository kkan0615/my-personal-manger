import dayjs from 'dayjs'
import { TimesInDayType } from '@/types/systems/Date'

export const getCurrentTimesInDay = (): TimesInDayType | null => {
  const now = dayjs()
  const hour = now.hour()
  if (hour > 0 && hour <= 6) {
    return 'NIGHT'
  } else if (hour > 6 && hour < 12) {
    return 'MORNING'
  } else if (hour >= 12 && hour < 18) {
    return 'AFTERNOON'
  } else if (hour >= 18 && hour < 24) {
    return 'EVENING'
  }

  return null
}
