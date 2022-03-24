import { app, BrowserWindow, ipcMain } from 'electron'
import { createAppWindow, destroyAppWindow, openAppWindow } from './windows/app'
import { createManagerWindow, destroyManagerWindow, openManagerWindow } from './windows/manager'
import {
  createManager, deleteManager,
  finaManagerAll,
  findManagerById,
  getCurrentManager,
  getCurrentManagerConfig,
  getManagerImages, initManager,
  setCurrentManagerConfig, updateCurrentManager, updateManager
} from './services/manager'
import { electronStore } from './store'
import isDev from 'electron-is-dev'
import {
  createSchedule,
  deleteSchedule, deleteSchedulePermanently,
  initSchedule,
  loadScheduleList,
  testSchedule,
  updateSchedule
} from './services/scehdule'
import { destroyScheduleWindow, openScheduleWindow } from './windows/schedule'
import { createTray } from './windows/tray'
import { initMasterConfig, loadMasterConfig, updateMasterConfig } from './services/master'

app.whenReady()
  .then(async () => {
    await initManager()
    initMasterConfig()
    if (!electronStore.get('currentManagerId')) {
      electronStore.set('currentManagerId', 'default')
    }
    if (isDev) {
      testSchedule()
      openAppWindow()
    }
    /* Init all schedules */
    initSchedule()
    /* Open manager window */
    createManagerWindow()
    createTray()
  })

/* When app is ready to open */
app.on('ready', () => {
  ipcMain.handle('get-app-setting', () => {
    return {
      savedManagerPath: `${app.getPath('documents')}/${app.getName()}`
    }
  })
  ipcMain.handle('get-current-manager', getCurrentManager)
  ipcMain.handle('get-manager-images', getManagerImages)
  ipcMain.handle('get-current-manager-config', getCurrentManagerConfig)
  ipcMain.handle('set-current-manager-config', setCurrentManagerConfig)
  ipcMain.handle('find-manager-by-id', findManagerById)
  ipcMain.handle('find-manager-all', finaManagerAll)
  ipcMain.handle('update-current-manager', updateCurrentManager)
  ipcMain.handle('create-manager', createManager)
  ipcMain.handle('update-manager', updateManager)
  ipcMain.handle('delete-manager', deleteManager)
  ipcMain.handle('load-schedule-list', loadScheduleList)
  ipcMain.handle('create-schedule', createSchedule)
  ipcMain.handle('update-schedule', updateSchedule)
  ipcMain.handle('delete-schedule', deleteSchedule)
  ipcMain.handle('delete-schedule-permanently', deleteSchedulePermanently)
  ipcMain.handle('load-master-config', loadMasterConfig)
  ipcMain.handle('update-master-config', updateMasterConfig)
  ipcMain.on('open-app-window', openAppWindow)
  ipcMain.on('destroy-app-window', destroyAppWindow)
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

/* When all windows are closed */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
