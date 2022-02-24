import { app, BrowserWindow, ipcMain } from 'electron'
import { createAppWindow } from './windows/app'
import { createManagerWindow, destroyManagerWindow, openManagerWindow } from './windows/manager'

app.whenReady()
  .then(() => {
    createAppWindow()
    createManagerWindow()

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
