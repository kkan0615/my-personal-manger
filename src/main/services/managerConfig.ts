import { ManagerConfig, ManagerConfigUpdateForm } from '../types/models/Manager/config'
import { electronStore } from '../store'
import { StoreKeyEnum } from '../types/store'
import { IpcMainEvent } from 'electron'

/**
 * Get manager config stored in electron-store
 */
export const getManagerConfig = () => {
  return electronStore.get(StoreKeyEnum.MANAGER_CONFIG)
}

export const clearManagerConfig = () => {
  electronStore.delete(StoreKeyEnum.MANAGER_CONFIG)
}

/**
 * Update manager config <br>
 * If no stored config, just store the config
 * @param event
 * @param args
 */
export const updateManagerConfig = async (event: IpcMainEvent, args: ManagerConfigUpdateForm) => {
  const config = <ManagerConfig>electronStore.get(StoreKeyEnum.MANAGER_CONFIG)
  if (config) {
    config.isAlwaysTop = args.isAlwaysTop
    config.display = args.display
    config.displayStyle = args.displayStyle
    config.isOnSound = args.isOnSound
    electronStore.set(StoreKeyEnum.MANAGER_CONFIG, config)
  } else {
    electronStore.set(StoreKeyEnum.MANAGER_CONFIG, args)
  }
}
