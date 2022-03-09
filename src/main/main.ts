import { app, BrowserWindow, ipcMain } from 'electron'
import { createAppWindow } from './windows/app'
import { createManagerWindow, destroyManagerWindow, openManagerWindow } from './windows/manager'
import fs from 'fs/promises'
import {
  getCurrentManager,
  getCurrentManagerConfig,
  getManagerImages,
  setCurrentManagerConfig
} from './services/manager'
import { electronStore } from './store'
import isDev from 'electron-is-dev'
import { testSchedule } from './services/scehdule'
import { destroyScheduleWindow, openScheduleWindow } from './windows/schedule'

const checkMangerDir = async () => {
  try {
    const path = `${app.getPath('documents')}/${app.getName()}`
    await fs.mkdir(path)
  } catch (e:any) {
    if (e.code !== 'EEXIST')
      console.error(e)
  }
}

app.whenReady()
  .then(async () => {
    await checkMangerDir()
    if (!electronStore.get('currentManagerId')) {
      electronStore.set('currentManagerId', 'default')
    }
    if (isDev) {
      testSchedule()
    } else {
      createAppWindow()
    }
    createManagerWindow()

    ipcMain.handle('get-app-setting', () => {
      return {
        savedManagerPath: `${app.getPath('documents')}/${app.getName()}`
      }
    })
    ipcMain.handle('get-current-manager', getCurrentManager)
    ipcMain.handle('get-manager-images', getManagerImages)
    ipcMain.handle('get-current-manager-config', getCurrentManagerConfig)
    ipcMain.handle('set-current-manager-config', setCurrentManagerConfig)
    ipcMain.on('open-manager-window', openManagerWindow)
    ipcMain.on('destroy-manager-window', destroyManagerWindow)
    ipcMain.on('open-schedule-window', openScheduleWindow)
    ipcMain.on('destroy-schedule-window', destroyScheduleWindow)
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createAppWindow()
      }
    })
  })

/* When app is ready to open */
app.on('ready', () => {
  //
})

/* When all windows are closed */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
