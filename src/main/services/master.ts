import { electronStore } from '../store'
import { IpcMainInvokeEvent } from 'electron'
import os from 'os'
import { UpdateCountResult } from '../types/server'
import { MasterConfig, MasterConfigUpdateForm } from '../types/masters'

export const initMasterConfig = () => {
  const masterConfig = electronStore.get('master-config')
  if (!masterConfig) {
    electronStore.set('master-config', {
      name: os.userInfo().username,
    } as MasterConfig)
  }
}

export const loadMasterConfig = async () => {
  let masterConfig = electronStore.get('master-config')
  if (!masterConfig) {
    initMasterConfig()
    masterConfig = electronStore.get('master-config')
  }

  return masterConfig
}

export const updateMasterConfig = async (event: IpcMainInvokeEvent, payload: MasterConfigUpdateForm) => {
  electronStore.set('master-config', {
    name: payload.name,
    birthday: payload.birthday
  } as MasterConfig)

  return {
    updatedCount: 1,
  } as UpdateCountResult
}
