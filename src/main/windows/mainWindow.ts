import { BrowserWindow, screen } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

/* Main */
export let mainWindow: BrowserWindow | undefined

export const createMainWindow = () => {
  const displayScreen = screen.getPrimaryDisplay()
  const dimensions = displayScreen.workAreaSize

  mainWindow = new BrowserWindow({
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

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../dist/index.html')}`)

  mainWindow.webContents.on('did-frame-finish-load', () => {
    if (mainWindow) {
      mainWindow.webContents.send('move-home')
    }
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined
  })
}
