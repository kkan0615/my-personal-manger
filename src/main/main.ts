import { app, BrowserWindow, ipcMain } from 'electron'
import { createAppWindow } from './windows/app'
import { createManagerWindow, destroyManagerWindow, openManagerWindow } from './windows/manager'
import fs from 'fs/promises'
import { getCurrentManager, getManagerImages } from './services/manager'
import { electronStore } from './store'

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
    // createAppWindow()
    createManagerWindow()

    ipcMain.handle('get-app-setting', () => {
      return {
        savedManagerPath: `${app.getPath('documents')}/${app.getName()}`
      }
    })
    ipcMain.handle('get-current-manager', getCurrentManager)
    ipcMain.handle('get-manager-images', getManagerImages)
    ipcMain.on('open-manager-window', openManagerWindow)
    ipcMain.on('destroy-manager-window', destroyManagerWindow)

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
