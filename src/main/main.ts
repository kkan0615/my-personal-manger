import { app, BrowserWindow, ipcMain } from 'electron'
import { createAppWindow } from './windows/app'
import { createManagerWindow, destroyManagerWindow, openManagerWindow } from './windows/manager'
import fs from 'fs/promises'

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
  .then(() => {
    checkMangerDir()
    // createAppWindow()
    createManagerWindow()

    ipcMain.handle('get-app-setting', () => {
      return {
        savedManagerPath: `${app.getPath('documents')}/${app.getName()}`
      }
    })
    ipcMain.handle('get-manager-images', async () => {
      return {
        main: await fs.readFile(`${app.getPath('documents')}/${app.getName()}/test2/main.png`)
      }
    })
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
  // console.log('test')
})

/* When all windows are closed */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
