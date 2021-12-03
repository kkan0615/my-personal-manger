import { electronStore } from '../store'
import { StoreKeyEnum } from '../types/store'
import { IpcMainInvokeEvent } from 'electron'
import nodeSchedule from 'node-schedule'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import { managerWindow } from '../windows/manager'

export const getSavedScheduleList = () => {
  return electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST) || []
}

export const getDoneScheduleList = () => {
  return electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST) || []
}

export const getSchedule = (event: any, args: string) => {
  const savedScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
  const doneScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST)
  return savedScheduleList.find(schedule => schedule.id === args) ||
    doneScheduleList.find(schedule => schedule.id === args)
}

export const createSchedule = (event: IpcMainInvokeEvent, args: any) => {
  const newScheduleId = v4()
  /* Create job */
  const schedule = {
    id: newScheduleId,
    ...args,
  }
  const job = nodeSchedule.scheduleJob(dayjs(args.date).toString(), function (data: any) {
    if (managerWindow) {
      /* Send the data to manager window */
      managerWindow.webContents.send('on-schedule-message', data)
      /* Remove job form job list */
      const jobList = <Array<any>>electronStore.get(StoreKeyEnum.JOB_SCHEDULE_LIST)
      electronStore.set(StoreKeyEnum.JOB_SCHEDULE_LIST, jobList.filter(job => job.id !== data.id))
    }
  }.bind(null, schedule))
  /* Add job to electron store */
  const jobList = <Array<any>>electronStore.get(StoreKeyEnum.JOB_SCHEDULE_LIST)
  jobList.push({ id: newScheduleId, job })
  electronStore.set(StoreKeyEnum.JOB_SCHEDULE_LIST, jobList)
}

export const updateSchedule = (event: IpcMainInvokeEvent, args: any) => {
  // const date = dayjs(args)
}

export const deleteSchedule = (event: IpcMainInvokeEvent, args: string) => {
  /* Find specific job */
  const jobList = <Array<any>>electronStore.get(StoreKeyEnum.JOB_SCHEDULE_LIST)
  const foundJob = jobList.find(job => job.id === args)
  if (foundJob) {
    /* Cancel the job */
    foundJob.job.cancel()
    /* Remove from job list */
    electronStore.set(StoreKeyEnum.JOB_SCHEDULE_LIST, jobList.filter(job => job.id !== args))
  }
}

