import { electronStore } from '../store'
import { StoreKeyEnum } from '../types/store'
import { IpcMainInvokeEvent } from 'electron'
import dayjs from 'dayjs'

export const getSavedScheduleList = () => {
  return electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
}

export const getDoneScheduleList = () => {
  return electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST)
}

export const getSchedule = (event: any, args: string) => {
  const savedScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.SAVED_SCHEDULE_LIST)
  const doneScheduleList = <Array<any>>electronStore.get(StoreKeyEnum.DONE_SCHEDULE_LIST)
  return savedScheduleList.find(schedule => schedule.id === args) ||
    doneScheduleList.find(schedule => schedule.id === args)
}

export const createSchedule = (event: IpcMainInvokeEvent, args: any) => {
  // const date = dayjs(args)
}

export const updateSchedule = (event: IpcMainInvokeEvent, args: any) => {
  // const date = dayjs(args)
}

export const deleteSchedule = (event: IpcMainInvokeEvent, args: string) => {
  // const date = dayjs(args)
}

