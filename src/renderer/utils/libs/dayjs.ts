import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'

export const installDayjsPlugins = () => {
  dayjs.extend(LocalizedFormat)
}
