import { IpcMainInvokeEvent } from 'electron'
import { managerWindow, } from '../windows/manager'
import { scheduleJob, scheduledJobs as nodeScheduledJobs } from 'node-schedule'
import dayjs from 'dayjs'
import { electronStore } from '../store'
import { Schedule, ScheduleCreateForm, ScheduleUpdateForm } from '../types/schedules'

export const initSchedule = () => {
  for (const jobName in nodeScheduledJobs) {
    const scheduledJobs = electronStore.get('scheduledJobs') as Schedule[]
    const foundJob = scheduledJobs.find(scheduledJob => scheduledJob.name === nodeScheduledJobs[jobName].name)
    if (foundJob) {
      deleteSchedule(null, nodeScheduledJobs[jobName].name)
      createSchedule(null, foundJob)
    }
  }
}

export const loadScheduleList = () => {
  return  electronStore.get('scheduledJobs') as Schedule[] || [] as Schedule[]
}

export const createSchedule = (event: IpcMainInvokeEvent | null, payload: ScheduleCreateForm) => {
  const scheduledJobs = electronStore.get('scheduledJobs') as Schedule[] || [] as Schedule[]
  const job = scheduleJob(payload.isLoop ? payload.loopStr : dayjs(payload.date).toDate(), () => {
    if (managerWindow) {
      managerWindow.webContents.send('listen-schedule', payload.content)
      if (!payload.isLoop)
        deleteSchedule(event, job.name)
    }
  })
  if (!job) {
    throw 'fail to assign job'
  }

  const scheduledJob = {
    ...payload,
    name: job.name,
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  } as Schedule

  scheduledJobs.push(scheduledJob)
  electronStore.set('scheduledJobs', scheduledJobs)
  return scheduledJob
}

export const updateSchedule = (event: IpcMainInvokeEvent | null, payload: ScheduleUpdateForm) => {
  if (deleteSchedule(event, payload.name)) {
    return createSchedule(event, payload)
  }

  return undefined
}

export const deleteSchedule = (event: IpcMainInvokeEvent | null, payload: string) => {
  const scheduledJobs = electronStore.get('scheduledJobs') as Schedule[]
  const foundJob = scheduledJobs.find(scheduledJob => scheduledJob.name === payload)
  if (foundJob) {
    const foundByName = nodeScheduledJobs[foundJob.name]
    if (foundByName)
      foundByName.cancel()
    scheduledJobs.splice(scheduledJobs.indexOf(foundJob), 1)
    foundJob.updatedAt = dayjs().toISOString()
    foundJob.deletedAt = dayjs().toISOString()
    scheduledJobs.push(foundJob)
  }

  electronStore.set('scheduledJobs', scheduledJobs)
  return foundJob
}

export const deleteSchedulePermanently = (event: IpcMainInvokeEvent | null, payload: string) => {
  const scheduledJobs = electronStore.get('scheduledJobs') as Schedule[]
  const foundJob = scheduledJobs.find(scheduledJob => scheduledJob.name === payload)
  if (foundJob) {
    const foundByName = nodeScheduledJobs[foundJob.name]
    if (foundByName)
      foundByName.cancel()
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
