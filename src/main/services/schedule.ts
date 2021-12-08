import { electronStore } from '../store'
import { StoreKeyEnum } from '../types/store'
import { IpcMainInvokeEvent } from 'electron'
import { scheduledJobs, scheduleJob, cancelJob } from 'node-schedule'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import { managerWindow } from '../windows/manager'
import { Schedule, ScheduleCreateForm, ScheduleInfo, ScheduleUpdateForm } from '../types/models/Schedule'

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

export const createSchedule = (event: IpcMainInvokeEvent, args: ScheduleCreateForm) => {
  const newScheduleId = v4()
  /* Create job */
  const schedule = {
    id: newScheduleId,
    ...args,
  } as ScheduleInfo

  const job = scheduleJob(dayjs(args.date).toDate(), function (data: ScheduleInfo) {
    if (managerWindow) {
      /* Send the data to manager window */
      managerWindow.webContents.send('on-schedule-message', data)
    }
    /* Remove job form job list */
    const savedScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
    const foundSavedSchedule = savedScheduleList.find(schedule => schedule.id === data.id)
    foundSavedSchedule.jobName = undefined
    electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, savedScheduleList.filter(schedule => schedule.id !== foundSavedSchedule.id))

    /* Add to done job*/
    const doneScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST)
    doneScheduleList.push(foundSavedSchedule)
    electronStore.set(StoreKeyEnum.DONE_SCHEDULE_LIST, doneScheduleList)
  }.bind(null, schedule))
  /* Add job to saved */
  schedule.jobName = job.name
  const savedScheduleList = <Array<any>>(electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST) || [])
  savedScheduleList.push(schedule)
  electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, savedScheduleList)
}

export const updateSchedule = (event: IpcMainInvokeEvent, args: ScheduleUpdateForm) => {
  console.log(args)
  const savedScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
  const foundSavedSchedule = savedScheduleList.find(schedule => schedule.id === args.id)
  if (foundSavedSchedule) {
    const schedule = {
      ...foundSavedSchedule,
      ...args,
    }
    const job = scheduleJob(dayjs(args.date).toDate(), function (data: Schedule) {
      if (managerWindow) {
        /* Send the data to manager window */
        managerWindow.webContents.send('on-schedule-message', data)
      }
      /* Remove job form job list */
      const savedScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
      const foundSavedSchedule = savedScheduleList.find(schedule => schedule.id === data.id)
      foundSavedSchedule.jobName = undefined
      electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, savedScheduleList.filter(schedule => schedule.id !== foundSavedSchedule.id))

      /* Add to done job*/
      const doneScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST)
      doneScheduleList.push(foundSavedSchedule)
      electronStore.set(StoreKeyEnum.DONE_SCHEDULE_LIST, doneScheduleList)
    }.bind(null, schedule))
    /* Remove */
    savedScheduleList.splice(savedScheduleList.indexOf(foundSavedSchedule), 1)
    /* Add */
    schedule.jobName = job.name
    savedScheduleList.push(schedule)
    electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, savedScheduleList)
  } else {
    throw { code: 402, message: 'No found schedule' }
  }
}

export const deleteSchedule = (event: IpcMainInvokeEvent, args: string) => {
  /* Find specific job */
  const savedScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
  const doneScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST)
  const foundSavedSchedule = savedScheduleList.find(schedule => schedule.id === args)
  if (foundSavedSchedule) {
    cancelJob(foundSavedSchedule.jobName)
  }
  /* Remove from list */
  electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, savedScheduleList.filter(schedule => schedule.id !== args))
  electronStore.set(StoreKeyEnum.DONE_SCHEDULE_LIST, doneScheduleList.filter(schedule => schedule.id !== args))
}

export const initJobSchedules = () => {
  const savedScheduleList = <Array<ScheduleInfo>>(electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST) || [])
  const doneScheduleList = <Array<Schedule>>(electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST) || [])

  let planedScheduleList = savedScheduleList.filter(schedule =>
    dayjs(schedule.date).isSame(dayjs()) || dayjs(schedule.date).isAfter(dayjs()))
  const passedScheduleList = savedScheduleList.filter(schedule => dayjs(schedule.date).isBefore(dayjs()))

  planedScheduleList = planedScheduleList.map(schedule => {
    const job = scheduleJob(dayjs(schedule.date).toDate(), function (data: Schedule) {
      if (managerWindow) {
        /* Send the data to manager window */
        managerWindow.webContents.send('on-schedule-message', data)
      }
      /* Remove job form job list */
      const savedScheduleList = <Array<ScheduleInfo>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
      const foundSavedSchedule = savedScheduleList.find(schedule => schedule.id === data.id)
      if (foundSavedSchedule) {
        savedScheduleList.splice(savedScheduleList.indexOf(foundSavedSchedule), 1)
        foundSavedSchedule.jobName = undefined
        electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, savedScheduleList)

        /* Add to done job*/
        const doneScheduleList = <Array<Schedule>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
        doneScheduleList.push(foundSavedSchedule)
        electronStore.set(StoreKeyEnum.DONE_SCHEDULE_LIST, doneScheduleList)
      }
    }.bind(null, schedule))

    schedule.jobName = job.name

    return schedule
  })

  electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, planedScheduleList)
  electronStore.set(StoreKeyEnum.DONE_SCHEDULE_LIST, doneScheduleList.concat(passedScheduleList))
}

export const clearAllList = () => {
  electronStore.set(StoreKeyEnum.SAVED_SCHEDULE_LIST, [])
  electronStore.set(StoreKeyEnum.DONE_SCHEDULE_LIST, [])
  for (const job in scheduledJobs) cancelJob(job)
}

export const clearDoneScheduleList = () => {
  electronStore.set(StoreKeyEnum.DONE_SCHEDULE_LIST, [])
}

