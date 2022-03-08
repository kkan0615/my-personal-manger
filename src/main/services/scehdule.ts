import { IpcMainInvokeEvent } from 'electron'
import { managerWindow, } from '../windows/manager'
import { scheduleJob, Job } from 'node-schedule'
import dayjs from 'dayjs'
import { electronStore } from '../store'
import { Schedule, ScheduleCreateForm, ScheduleUpdateForm } from '../types/schedules'

export const createSchedule = (event: IpcMainInvokeEvent, payload: ScheduleCreateForm) => {
  const scheduledJobs = electronStore.get('scheduledJobs') as Schedule[]
  const job = scheduleJob(payload.isLoop ? payload.date : dayjs(payload.date).toDate(), () => {
    if (managerWindow) {
      managerWindow.webContents.send('setting-schedule', payload.content)
      deleteSchedule(event, job.name)
    }
  })

  const scheduledJob = {
    ...payload,
    ...job,
  } as Schedule

  scheduledJobs.push(scheduledJob)
  electronStore.set('scheduledJobs', scheduledJobs)
  return scheduledJob
}

export const updateSchedule = (event: IpcMainInvokeEvent, payload: ScheduleUpdateForm) => {
  if (deleteSchedule(event, payload.name)) {
    const scheduledJobs = electronStore.get('scheduledJobs') as Schedule[]
    const job = scheduleJob(payload.isLoop ? payload.date : dayjs(payload.date).toDate(), () => {
      if (managerWindow) {
        managerWindow.webContents.send('setting-schedule', payload.content)
      }
    })

    const scheduledJob = {
      ...payload,
      ...job,
    } as Schedule

    scheduledJobs.push(scheduledJob)
    electronStore.set('scheduledJobs', scheduledJobs)
    return scheduledJob
  }

  return undefined
}

export const deleteSchedule = (event: IpcMainInvokeEvent, payload: string) => {
  const scheduledJobs = electronStore.get('scheduledJobs') as Schedule[]
  const foundJob = scheduledJobs.find(scheduledJob => scheduledJob.name === payload)
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
