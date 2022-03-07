import { IpcMainInvokeEvent } from 'electron'
import { managerWindow, } from '../windows/manager'
import { scheduleJob, Job } from 'node-schedule'
import dayjs from 'dayjs'
import { electronStore } from '../store'

export const createSchedule = (event: IpcMainInvokeEvent, payload: any) => {
  const scheduledJobs = electronStore.get('scheduledJobs') as any[]
  const job = scheduleJob(payload.isLoop ? payload.date : dayjs(payload.date).toDate(), () => {
    if (managerWindow) {
      managerWindow.webContents.send('setting-schedule', 'test from schedule')
      deleteSchedule(event, job.name)
    }
  })

  const scheduledJob: Job  = {
    ...payload,
    ...job,
  }

  scheduledJobs.push(scheduledJob)
  electronStore.set('scheduledJobs', scheduledJobs)
  return scheduledJob
}

export const updateSchedule = (event: IpcMainInvokeEvent, payload: any) => {
  if (deleteSchedule(event, payload.name)) {
    const scheduledJobs = electronStore.get('scheduledJobs') as any[]
    const job = scheduleJob(payload.isLoop ? payload.date : dayjs(payload.date).toDate(), () => {
      if (managerWindow) {
        managerWindow.webContents.send('setting-schedule', 'test from schedule')
      }
    })

    const scheduledJob: Job  = {
      ...payload,
      ...job,
    }

    scheduledJobs.push(scheduledJob)
    electronStore.set('scheduledJobs', scheduledJobs)
    return scheduledJob
  }

  return undefined
}

export const deleteSchedule = (event: IpcMainInvokeEvent, payload: string) => {
  const scheduledJobs = electronStore.get('scheduledJobs') as any[]
  const foundJob: Job = scheduledJobs.find(scheduledJob => scheduledJob.name === payload)
  if (foundJob) {
    foundJob.cancel()
    scheduledJobs.splice(scheduledJobs.indexOf(foundJob), 1)
  }

  electronStore.set('scheduledJobs', scheduledJobs)
  return foundJob
}

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
