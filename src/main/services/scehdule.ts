import { managerWindow } from '../windows/manager'
import { scheduleJob } from 'node-schedule'
import dayjs from 'dayjs'

export const testSchedule = () => {
  const job = scheduleJob(dayjs().add(10, 'second').toDate(), () => {
    if (managerWindow) {
      managerWindow.webContents.send('listen-schedule', 'test from schedule')
    }
  })
  // const job2 = scheduleJob(dayjs().add(15, 'second').toDate(), () => {
  //   if (managerWindow) {
  //     managerWindow.webContents.send('listen-schedule', 'test from schedule')
  //   }
  // })
  // const job3 = scheduleJob(dayjs().add(20, 'second').toDate(), () => {
  //   if (managerWindow) {
  //     managerWindow.webContents.send('listen-schedule', 'test from schedule')
  //   }
  // })
}
