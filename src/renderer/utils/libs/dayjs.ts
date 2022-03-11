import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

export const initDayjsPlugins = () => {
  dayjs.extend(relativeTime)
  dayjs.extend(LocalizedFormat)
}
