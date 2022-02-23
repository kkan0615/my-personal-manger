import { BrowserWindow, screen } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

/* App */
export let appWindow: BrowserWindow | undefined

export const createAppWindow = () => {
  const displayScreen = screen.getPrimaryDisplay()
  const dimensions = displayScreen.workAreaSize

  appWindow = new BrowserWindow({
    width: parseInt((dimensions.width * 0.8).toString()),
    height: parseInt((dimensions.height * 0.8).toString()),
    autoHideMenuBar: true,
    minWidth: 1024,
    minHeight: 576,
    maximizable: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  appWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/../../../../../../../dist/index.html`)

  appWindow.webContents.on('did-frame-finish-load', () => {
    if (appWindow) {
      appWindow.webContents.send('move-home')
    }
  })

  // if (isDev) {
  appWindow.webContents.openDevTools()
  // }

  appWindow.on('closed', () => {
    appWindow = undefined
  })
}
