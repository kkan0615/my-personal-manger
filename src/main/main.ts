import { app, BrowserWindow } from 'electron'
import { createAppWindow } from './windows/app'

app.whenReady()
  .then(() => {
    createAppWindow()

    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createAppWindow()
      }
    })
  })

/* When app is ready to open */
app.on('ready', () => {
  console.log('test')
})

/* When all windows are closed */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
