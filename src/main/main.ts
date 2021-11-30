import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, ipcMain } from 'electron'
import { electronStore } from './store'
import isDev from 'electron-is-dev'
import { StoreKeyEnum } from './types/store'
import {
  clearManagerId,
  createManager, deleteManager,
  getCurrentManager, getManager,
  getManagerCircleImage,
  getManagerImage,
  getManagerList, setManagerId, updateManager
} from './services/manager'
import { User } from './types/models/User'
import { authWindow, createAuthWindow } from './windows/auth'
import { createManagerWindow } from './windows/manager'
import { createMainWindow } from './windows/mainWindow'
import { getManagerConfig, updateManagerConfig } from './services/managerConfig'
import { createTray } from './windows/tray'

app.whenReady()
  .then(() => {
    /* If no data, set the data */
    if (!electronStore.get(StoreKeyEnum.MANAGER)) {
      const defaultManagerPath = isDev ? path.join(__dirname, 'default/defaultManager.json') : path.join(process.resourcesPath, 'default', 'defaultManager.json')
      fs.readFile(defaultManagerPath, 'utf-8', ((err, data) => {
        if (err) throw err
        electronStore.set('manager', JSON.parse(data))
      }))
    }

    if (electronStore.get(StoreKeyEnum.USER)) {
      /* Open Main window */
      createMainWindow()
      /* Open tray */
      createTray()
    } else {
      createAuthWindow()
    }
    ipcMain.emit('sync-manager', electronStore.get('manager'))
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createMainWindow()
      }
    })
  })

/* When app is ready to open */
app.on('ready', () => {
  // @TODO: For test
  electronStore.set(StoreKeyEnum.MANAGER_ID, '13a6e982-f7c9-4f8a-b838-558740be6d7a')
  // @TODO: For test
  // electronStore.delete(StoreKeyEnum.USER)

  /* Open manager */
  ipcMain.on('open-manager-window', () => {
    createManagerWindow()
  })

  ipcMain.handle('get-current-manager', getCurrentManager)

  ipcMain.handle('get-manager', getManager)

  ipcMain.handle('sync-manager-config', getManagerConfig)

  ipcMain.on('set-manager-id', setManagerId)

  ipcMain.on('clear-manager-id', clearManagerId)

  ipcMain.handle('get-user', () => {
    return electronStore.get(StoreKeyEnum.USER)
  })

  ipcMain.on('register-user', (event, args) => {
    electronStore.set(StoreKeyEnum.USER, args)
    createMainWindow()
    createTray()
    if (authWindow) {
      authWindow.destroy()
    }
  })

  ipcMain.on('set-user', (event, args: User) => {
    electronStore.set(StoreKeyEnum.USER, args)
  })

  /**
   * Get full size image
   */
  ipcMain.handle('get-manager-image', getManagerImage)

  /*  Get circle size image */
  ipcMain.handle('get-manager-circle-image', getManagerCircleImage)

  /* Create manager slot */
  ipcMain.handle('create-manager', createManager)
  ipcMain.handle('update-manager', updateManager)
  ipcMain.handle('delete-manager', deleteManager)

  ipcMain.handle('get-manager-list', getManagerList)

  ipcMain.on('update-manager-config', updateManagerConfig)
})

/* When all windows are closed */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
